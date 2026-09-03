// ─────────────────────────────────────────────────────────────
// 파트별 단어 타이핑 모듈
//   SST  : 한글 뜻을 보고 영어 표현을 타이핑
//   LFIB : 토픽별 빈칸 정답 단어를 "발음만 듣고" 타이핑 (받아쓰기)
//
// 원칙: 파트끼리 절대 섞이지 않는다.
//  - 저장 키를 파트별로 완전히 분리 (sst_* / lfib_*)
//  - 한 번의 시험은 반드시 한 파트 안에서만 문제를 뽑는다
//  - WFD '내 단어장'(wfd_words_v2)과도 서로 건드리지 않는다
//
// 원본 데이터: sst.js(window.PTE_SST), lfib.js(window.PTE_LFIB)
// 앱에서 고친 내용은 localStorage에 '덮어쓰기 층'으로 쌓여 원본 갱신에도 살아남는다.
// ─────────────────────────────────────────────────────────────
(function(){
  const K={ sst:{edits:'sst_edits_v1',stats:'sst_stats_v1'},
            lfib:{edits:'lfib_edits_v1',stats:'lfib_stats_v1'} };
  const load=(k,d)=>{ try{ const v=JSON.parse(localStorage.getItem(k)); return v==null?d:v; }catch(e){ return d; } };
  const save=(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} };
  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const attr=s=>esc(s).replace(/'/g,'&#39;');
  const toast=m=>{ if(window.wfdToast) window.wfdToast(m); };
  const speak=t=>{ if(window.sayText) window.sayText(t); };
  const stopSpeak=()=>{ try{ if(window.speechSynthesis) speechSynthesis.cancel(); }catch(e){} };

  // ── 데이터 (원본 + 내 수정본) ────────────────────────────────
  // 두 파트 모두 {no,title,items:[{en,ko,kr}]} 형태로 통일해서 다룬다
  function dataOf(p){
    const raw = p==='sst' ? (window.PTE_SST||[]) : (window.PTE_LFIB||[]);
    const base = raw.map(t=>({
      no:t.no, title:t.title, sub: p==='sst' ? (t.subject||'') : (t.diff||''),
      items:(p==='sst'?t.items:t.words||[]).map(i=>({en:i.en,ko:i.ko||'',kr:i.kr||''}))
    }));
    const ed=load(K[p].edits,{});
    base.forEach(t=>{ const e=ed[t.no]; if(e&&Array.isArray(e.items)) t.items=e.items.map(i=>({en:i.en,ko:i.ko||'',kr:i.kr||''})); });
    return base;
  }

  // ── 상태 ─────────────────────────────────────────────────────
  let part='sst', view='list', scope='all', quiz=null;
  let order=load('pt_order_v1','seq');   // 'seq' = 번호순(기본), 'rand' = 랜덤
  const statsOf=p=>load(K[p].stats,{});
  function record(p,key,ok){
    const st=statsOf(p); const r=st[key]||{r:0,w:0};
    ok?r.r++:r.w++; r.at=Date.now(); st[key]=r; save(K[p].stats,st);
  }

  // ── 글자 단위 채점 ───────────────────────────────────────────
  function charDiff(typed,ans){
    const A=ans,T=typed,m=A.length,n=T.length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let i=m-1;i>=0;i--)for(let j=n-1;j>=0;j--)
      dp[i][j]=A[i].toLowerCase()===T[j].toLowerCase()?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
    const out=[];let i=0,j=0;
    while(i<m&&j<n){
      if(A[i].toLowerCase()===T[j].toLowerCase()){out.push({c:A[i],k:'ok'});i++;j++;}
      else if(dp[i+1][j]>=dp[i][j+1]){out.push({c:A[i],k:'miss'});i++;}
      else{out.push({c:T[j],k:'bad'});j++;}
    }
    while(i<m){out.push({c:A[i],k:'miss'});i++;}
    while(j<n){out.push({c:T[j],k:'bad'});j++;}
    return out;
  }
  const diffHTML=d=>d.map(x=>`<span class="c-${x.k}">${esc(x.c)}</span>`).join('');

  // ── 문제 만들기 (반드시 선택한 한 파트 안에서만) ─────────────
  function buildQuestions(wrongOnly){
    const st=statsOf(part), out=[];
    dataOf(part).filter(t=>scope==='all'||String(t.no)===String(scope))
      .forEach(t=>t.items.forEach((it,i)=>{
        if(!it.en) return;
        const key=part+':'+t.no+':'+i;
        if(wrongOnly&&!(st[key]&&st[key].w>0)) return;
        out.push({key, ans:it.en, ko:it.ko, kr:it.kr, topic:'#'+t.no+' '+t.title});
      }));
    return out;
  }

  // ── 목록 화면 ────────────────────────────────────────────────
  function header(){
    const isS=part==='sst';
    const list=dataOf(part);
    const label=isS?'챕터':'토픽';
    const opts=[`<option value="all">전체 (${list.length} ${label} · ${list.reduce((a,t)=>a+t.items.length,0)}단어)</option>`]
      .concat(list.map(t=>`<option value="${t.no}" ${String(scope)===String(t.no)?'selected':''}>#${t.no} ${esc(t.title)} (${t.items.length})</option>`));
    const st=statsOf(part);
    const done=Object.keys(st).length, wrong=Object.values(st).filter(x=>x.w>0).length;
    return `<div class="bar">
      <span class="chip"><b>${isS?'SST 기출':'LFIB 단어'}</b></span>
      <label>${label} <select id="ptScope">${opts.join('')}</select></label>
      <label>순서 <select id="ptOrder">
        <option value="seq" ${order==='seq'?'selected':''}>번호순</option>
        <option value="rand" ${order==='rand'?'selected':''}>랜덤</option></select></label>
      <button class="btn primary sm" id="ptStart">${isS?'뜻 보고 타이핑 →':'발음 듣고 타이핑 →'}</button>
      ${wrong?'<button class="btn badb sm" id="ptWrong">틀린 것만</button>':''}
      <button class="btn ghost sm" id="ptEdit">단어 수정·추가</button>
      <span class="chip">푼 ${done} · 틀린 적 ${wrong}</span>
    </div>`;
  }
  function wireHeader(box){
    const q=s=>box.querySelector(s);
    if(q('#ptScope')) q('#ptScope').onchange=e=>{scope=e.target.value;render();};
    if(q('#ptOrder')) q('#ptOrder').onchange=e=>{order=e.target.value;save('pt_order_v1',order);};
    if(q('#ptStart')) q('#ptStart').onclick=()=>startQuiz(false);
    if(q('#ptWrong')) q('#ptWrong').onclick=()=>startQuiz(true);
    if(q('#ptEdit'))  q('#ptEdit').onclick=()=>{view='edit';render();};
  }
  function renderList(box){
    const body=dataOf(part).filter(t=>scope==='all'||String(t.no)===String(scope)).map(t=>`
      <div class="card" style="margin-bottom:10px">
        <div class="qnum"><span><b>#${t.no}</b> ${esc(t.title)}</span><span>${esc(t.sub)} · ${t.items.length}단어</span></div>
        <div class="wordgrid">${t.items.map(i=>`
          <div class="wcell" onclick="PTE_PARTS.say('${attr(i.en)}')" title="클릭하면 발음">
            <div class="wc-en">${esc(i.en)} <span class="wc-spk">🔊</span></div>
            <div class="wc-ko">${esc(i.ko)}</div>
            ${i.kr?`<div class="wc-kr">[${esc(i.kr)}]</div>`:''}
          </div>`).join('')}</div>
      </div>`).join('');
    box.innerHTML=header()+body;
    wireHeader(box);
  }

  // ── 시험 ─────────────────────────────────────────────────────
  function startQuiz(wrongOnly){
    const qs=buildQuestions(wrongOnly);
    if(!qs.length){ toast(wrongOnly?'틀린 단어가 없어요':'단어가 없어요'); return; }
    if(order==='rand') for(let i=qs.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[qs[i],qs[j]]=[qs[j],qs[i]];}
    quiz={list:qs,i:0,ok:0,done:0,wrong:[],ans:{}};   // ans: 이미 푼 문제의 결과 (앞뒤로 오가도 유지)
    view='quiz'; render();
  }
  function finishScreen(box){
    const rate=quiz.done?Math.round(quiz.ok/quiz.done*100):0;
    box.innerHTML=`<div class="card empty">시험 완료! ${quiz.done}개 중 ${quiz.ok}개 정답 (${rate}%)
      ${quiz.wrong.length?`<div style="margin-top:12px;font-size:14px">틀린 단어: <b>${quiz.wrong.map(esc).join(', ')}</b></div>`:''}
      <div class="btnrow" style="justify-content:center;margin-top:16px">
        ${quiz.wrong.length?'<button class="btn badb" id="ptRetry">틀린 것만 다시</button>':''}
        <button class="btn primary" id="ptAgain">다시 시작</button>
        <button class="btn ghost" id="ptBack">목록으로</button>
      </div></div>`;
    const q=s=>box.querySelector(s);
    if(q('#ptRetry')) q('#ptRetry').onclick=()=>startQuiz(true);
    q('#ptAgain').onclick=()=>startQuiz(false);
    q('#ptBack').onclick=()=>{view='list';render();};
  }

  function renderQuiz(box){
    const q=quiz.list[quiz.i];
    const listen = part==='lfib';          // LFIB = 단어를 감추고 발음만 들려준다
    const prev=quiz.ans[quiz.i];           // 이미 푼 문제면 결과를 그대로 다시 보여준다
    box.innerHTML=`<div class="quizcard">
      <div class="qnum" style="justify-content:space-between"><span>${quiz.i+1} / ${quiz.list.length}</span><span>${esc(q.topic)}</span></div>
      ${listen
        ? `<div class="qmean" style="color:var(--sub);font-size:16px">🎧 발음을 듣고 단어를 입력하세요</div>
           <div class="qpos">${q.ans.length}글자</div>`
        : `<div class="qmean">${esc(q.ko)}</div>
           <div class="qpos">${q.kr?'['+esc(q.kr)+'] · ':''}${q.ans.length}글자 · 단어 ${q.ans.split(/\s+/).length}개</div>`}
      <div class="audiorow" style="justify-content:center">
        <button class="playbtn" id="ptSay" title="발음 듣기">🔊</button>
        ${listen?'<span class="chip">눌러서 듣기 (여러 번 가능)</span>':''}
      </div>
      <input type="text" id="ptIn" placeholder="영어로 입력하세요" autocomplete="off" autocapitalize="off" spellcheck="false" value="${prev?esc(prev.typed):''}" ${prev?'disabled':''}>
      <div id="ptRes"></div>
      <div class="btnrow" style="justify-content:center">
        <button class="btn ghost" id="ptPrev" ${quiz.i===0?'disabled style="opacity:.4"':''}>← 이전</button>
        <button class="btn primary" id="ptSubmit">${prev?'다음 (Enter) →':'확인 (Enter)'}</button>
        <button class="btn ghost" id="ptSkip">${prev?'다시 풀기':'모르겠어요'}</button>
        <button class="btn ghost" id="ptNext" ${quiz.i>=quiz.list.length-1?'disabled style="opacity:.4"':''}>다음 →</button>
      </div></div>`;
    const inp=box.querySelector('#ptIn');
    if(!prev) inp.focus();
    box.querySelector('#ptSay').onclick=()=>speak(q.ans);
    let answered=!!prev;
    const next=()=>{ document.onkeydown=null; stopSpeak(); quiz.i++; render(); };
    if(prev){ showResult(prev.typed, prev.ok); }
    function showResult(typed, ok){
      box.querySelector('#ptRes').innerHTML=
        `<div class="qfeed">${diffHTML(charDiff(typed,q.ans))}</div>
         <div class="qanswer">${ok?'✅ 정답!':'정답: <b>'+esc(q.ans)+'</b>'}
           ${q.ko?'<div style="margin-top:6px;font-size:14px;color:var(--sub)">'+esc(q.ko)+(q.kr?' ['+esc(q.kr)+']':'')+'</div>':''}</div>`;
    }
    function submit(giveUp){
      if(answered) return; answered=true;
      const typed=inp.value.trim();
      const ok=!giveUp&&typed.toLowerCase()===q.ans.toLowerCase();
      record(part,q.key,ok); quiz.done++; ok?quiz.ok++:quiz.wrong.push(q.ans);
      quiz.ans[quiz.i]={typed,ok};
      showResult(typed,ok);
      inp.disabled=true;
      const sb=box.querySelector('#ptSubmit'); sb.textContent='다음 (Enter) →'; sb.onclick=next;
      box.querySelector('#ptSkip').textContent='다시 풀기';
      box.querySelector('#ptSkip').onclick=redo;
      document.onkeydown=e=>{ if(e.key==='Enter'){e.preventDefault();next();} };
    }
    function redo(){ delete quiz.ans[quiz.i]; stopSpeak(); render(); }
    inp.onkeydown=e=>{ if(e.key==='Enter'){e.preventDefault(); answered?next():submit(false);} };
    box.querySelector('#ptSubmit').onclick=()=>answered?next():submit(false);
    box.querySelector('#ptSkip').onclick=()=>answered?redo():submit(true);
    box.querySelector('#ptPrev').onclick=()=>{ if(quiz.i>0){stopSpeak();quiz.i--;render();} };
    box.querySelector('#ptNext').onclick=()=>{ if(quiz.i<quiz.list.length-1){stopSpeak();quiz.i++;render();} };
    if(prev) document.onkeydown=e=>{ if(e.key==='Enter'){e.preventDefault();next();} };
  }

  // ── 단어 수정·추가 (두 파트 공통) ────────────────────────────
  function renderEdit(box){
    const list=dataOf(part);
    const cur=list.find(t=>String(t.no)===String(scope))||list[0];
    scope=String(cur.no);
    box.innerHTML=`<div class="bar">
        <label>${part==='sst'?'챕터':'토픽'} <select id="ptEScope">${list.map(t=>`<option value="${t.no}" ${String(t.no)===String(cur.no)?'selected':''}>#${t.no} ${esc(t.title)}</option>`).join('')}</select></label>
        <button class="btn ghost sm" id="ptEBack">← 목록으로</button>
        <button class="btn ghost sm" id="ptEReset">원본으로 되돌리기</button>
        <span class="chip">${cur.items.length}개</span>
      </div>
      <div class="card">
        <div class="qnum"><span><b>#${cur.no}</b> ${esc(cur.title)}</span><span>고치면 자동 저장돼요</span></div>
        <div id="ptRows">${cur.items.map((it,i)=>rowHTML(it,i)).join('')}</div>
        <div class="btnrow"><button class="btn primary sm" id="ptAdd">+ 단어 추가</button></div>
      </div>`;
    const q=s=>box.querySelector(s);
    q('#ptEScope').onchange=e=>{scope=e.target.value;render();};
    q('#ptEBack').onclick=()=>{view='list';render();};
    q('#ptEReset').onclick=()=>{ const ed=load(K[part].edits,{}); delete ed[cur.no]; save(K[part].edits,ed); toast('원본으로 되돌렸어요'); render(); };
    q('#ptAdd').onclick=()=>{ const items=readRows(box); items.push({en:'',ko:'',kr:''}); persist(cur,items); render(); };
    box.querySelectorAll('#ptRows input').forEach(el=>{ el.oninput=()=>persist(cur,readRows(box)); });
    box.querySelectorAll('.ptDel').forEach(b=>{ b.onclick=()=>{ const items=readRows(box); items.splice(Number(b.dataset.i),1); persist(cur,items); render(); }; });
  }
  const rowHTML=(it,i)=>`<div class="word-item" data-row="${i}">
      <input type="text" class="ptEn" value="${esc(it.en)}" placeholder="영어" style="flex:1.3;min-width:140px;padding:8px 10px;border:1px solid var(--line);border-radius:8px">
      <input type="text" class="ptKo" value="${esc(it.ko)}" placeholder="한글 뜻" style="flex:1.2;min-width:120px;padding:8px 10px;border:1px solid var(--line);border-radius:8px">
      <input type="text" class="ptKr" value="${esc(it.kr)}" placeholder="발음(선택)" style="flex:1;min-width:110px;padding:8px 10px;border:1px solid var(--line);border-radius:8px">
      <button class="wi-del ptDel" data-i="${i}" title="삭제">🗑</button></div>`;
  const readRows=box=>[...box.querySelectorAll('#ptRows [data-row]')].map(r=>({
      en:r.querySelector('.ptEn').value.trim(), ko:r.querySelector('.ptKo').value.trim(), kr:r.querySelector('.ptKr').value.trim() }));
  function persist(t,items){
    const ed=load(K[part].edits,{});
    ed[t.no]=Object.assign({},ed[t.no],{items,title:t.title});
    save(K[part].edits,ed);
  }

  // ── 진입점 ───────────────────────────────────────────────────
  function render(){
    const box=document.getElementById('stage');
    if(!box) return;
    if(view==='quiz'&&quiz){
      if(quiz.i>=quiz.list.length) return finishScreen(box);
      return renderQuiz(box);
    }
    if(view==='edit') return renderEdit(box);
    renderList(box);
  }
  window.PTE_PARTS={
    open(p){ if(part!==p){ part=p; scope='all'; quiz=null; } view='list'; stopSpeak(); render(); },
    render, say(t){ speak(t); },
    counts(){
      const s=window.PTE_SST||[], l=window.PTE_LFIB||[];
      return { sstCh:s.length, sstItems:s.reduce((a,c)=>a+c.items.length,0),
               lfibDoc:l.length, lfibBlanks:l.reduce((a,x)=>a+(x.words?x.words.length:0),0) };
    }
  };
})();
