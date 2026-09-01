// ─────────────────────────────────────────────────────────────
// 파트별 단어/표현 타이핑 모듈  (SST 기출 · LFIB 빈칸)
//
// 원칙: 파트끼리 절대 섞이지 않는다.
//  - 저장 키를 파트별로 완전히 분리한다 (sst_* / lfib_*)
//  - 한 번의 시험은 반드시 한 파트 안에서만 문제를 뽑는다
//  - WFD '내 단어장'(wfd_words_v2)과도 서로 건드리지 않는다
//
// 원본 데이터: sst.js(window.PTE_SST), lfib.js(window.PTE_LFIB)
// 사용자가 고친 내용은 localStorage에 '덮어쓰기 층'으로 따로 쌓여서
// 원본 파일을 새로 올려도 내 수정본이 살아남는다.
// ─────────────────────────────────────────────────────────────
(function(){
  const K = {
    sst:  { edits:'sst_edits_v1',  stats:'sst_stats_v1',  last:'sst_last_v1'  },
    lfib: { edits:'lfib_edits_v1', stats:'lfib_stats_v1', last:'lfib_last_v1' }
  };
  const load=(k,d)=>{ try{ return JSON.parse(localStorage.getItem(k)) ?? d; }catch(e){ return d; } };
  const save=(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} };
  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const toast=m=>{ if(window.wfdToast) window.wfdToast(m); };
  const speak=(t,r)=>{ if(window.sayText) window.sayText(t); };

  // ── 데이터 (원본 + 내 수정본) ────────────────────────────────
  function sstData(){
    const base=(window.PTE_SST||[]).map(c=>({no:c.no,title:c.title,subject:c.subject,
      items:c.items.map(i=>({en:i.en,kr:i.kr,ko:i.ko}))}));
    const ed=load(K.sst.edits,{});
    base.forEach(c=>{
      const e=ed[c.no];
      if(!e) return;
      if(Array.isArray(e.items)) c.items=e.items.map(i=>({en:i.en,kr:i.kr||'',ko:i.ko||''}));
    });
    // 사용자가 새로 만든 챕터
    Object.keys(ed).forEach(no=>{
      if(ed[no] && ed[no].custom && !base.some(c=>String(c.no)===String(no)))
        base.push({no:Number(no),title:ed[no].title||('내 챕터 '+no),subject:ed[no].subject||'',items:(ed[no].items||[])});
    });
    return base;
  }
  function lfibData(){ return (window.PTE_LFIB||[]).slice(); }

  // ── 시험 상태 (파트마다 독립) ────────────────────────────────
  let part='sst';                 // 'sst' | 'lfib'
  let view='list';                // 'list' | 'quiz' | 'edit'
  let scope='all';                // 'all' 또는 챕터/지문 번호
  let quiz=null;

  const statsOf=p=>load(K[p].stats,{});
  function record(p,key,ok){
    const st=statsOf(p); const r=st[key]||{r:0,w:0};
    if(ok) r.r++; else r.w++;
    r.at=Date.now(); st[key]=r; save(K[p].stats,st);
  }

  // ── 문제 만들기 (반드시 한 파트 안에서만) ────────────────────
  function buildQuestions(){
    if(part==='sst'){
      const chs=sstData().filter(c=>scope==='all'||String(c.no)===String(scope));
      const out=[];
      chs.forEach(c=>c.items.forEach((it,i)=>{
        if(!it.en) return;
        out.push({part:'sst', key:'sst:'+c.no+':'+i, ans:it.en,
                  hint:it.ko||it.subject||'', sub:(it.kr?'['+it.kr+'] ':'')+'#'+c.no+' '+c.title});
      }));
      return out;
    }
    const ps=lfibData().filter(p=>scope==='all'||String(p.no)===String(scope));
    const out=[];
    ps.forEach(p=>p.answers.forEach((a,i)=>{
      const m=p.text.match(new RegExp('([^.]*____'+(i+1)+'____[^.]*\\.)'));
      let ctx=m?m[1].trim():p.text;
      ctx=ctx.replace(/____(\d+)____/g,(x,n)=>Number(n)===i+1?'______':'…');
      out.push({part:'lfib', key:'lfib:'+p.no+':'+i, ans:a, hint:ctx,
                sub:'#'+p.no+' '+p.title+' · '+p.diff, speakText:ctx.replace('______','blank')});
    }));
    return out;
  }

  // ── 글자 단위 채점 ───────────────────────────────────────────
  function charDiff(typed,ans){
    const A=ans, T=typed, m=A.length, n=T.length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let i=m-1;i>=0;i--)for(let j=n-1;j>=0;j--)
      dp[i][j]=A[i].toLowerCase()===T[j].toLowerCase()?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
    const out=[]; let i=0,j=0;
    while(i<m&&j<n){
      if(A[i].toLowerCase()===T[j].toLowerCase()){out.push({c:A[i],k:'ok'});i++;j++;}
      else if(dp[i+1][j]>=dp[i][j+1]){out.push({c:A[i],k:'miss'});i++;}
      else {out.push({c:T[j],k:'bad'});j++;}
    }
    while(i<m){out.push({c:A[i],k:'miss'});i++;}
    while(j<n){out.push({c:T[j],k:'bad'});j++;}
    return out;
  }

  // ── 화면 ─────────────────────────────────────────────────────
  function header(){
    const isS=part==='sst';
    const list=isS?sstData():lfibData();
    const label=isS?'챕터':'지문';
    const opts=['<option value="all">전체 ('+list.length+' '+label+')</option>']
      .concat(list.map(c=>`<option value="${c.no}" ${String(scope)===String(c.no)?'selected':''}>#${c.no} ${esc(c.title)}${isS?'':' · '+c.diff}</option>`));
    const st=statsOf(part);
    const done=Object.keys(st).length, wrong=Object.values(st).filter(x=>x.w>0).length;
    return `<div class="bar">
      <span class="chip"><b>${isS?'SST 기출':'LFIB 빈칸'}</b></span>
      <label>${label} <select id="ptScope">${opts.join('')}</select></label>
      <button class="btn primary sm" id="ptStart">타이핑 시험 시작 →</button>
      ${isS?'<button class="btn ghost sm" id="ptEdit">표현 수정·추가</button>':''}
      <span class="chip">푼 문제 ${done} · 틀린 적 있는 것 ${wrong}</span>
    </div>`;
  }

  function renderList(box){
    const isS=part==='sst';
    let body='';
    if(isS){
      const chs=sstData().filter(c=>scope==='all'||String(c.no)===String(scope));
      body=chs.map(c=>`<div class="card" style="margin-bottom:10px">
        <div class="qnum"><span><b>#${c.no}</b> ${esc(c.title)}</span><span>${esc(c.subject)}</span></div>
        <div class="vocab">${c.items.map(i=>`<span class="vw" onclick="PTE_PARTS.say('${esc(i.en).replace(/'/g,"&#39;")}')" title="클릭하면 발음"><b>${esc(i.en)}</b> ${esc(i.ko)} 🔊</span>`).join('')}</div>
      </div>`).join('');
    } else {
      const ps=lfibData().filter(p=>scope==='all'||String(p.no)===String(scope));
      body=ps.map(p=>`<div class="card" style="margin-bottom:10px">
        <div class="qnum"><span><b>#${p.no}</b> ${esc(p.title)}</span><span>${p.diff} · 빈칸 ${p.answers.length}개</span></div>
        <div style="font-size:14.5px;line-height:1.75">${esc(p.text).replace(/____(\d+)____/g,(m,n)=>'<b style="color:var(--accent)">['+p.answers[n-1]+']</b>')}</div>
      </div>`).join('');
    }
    box.innerHTML=header()+body;
    wireHeader(box);
  }

  function wireHeader(box){
    const sc=box.querySelector('#ptScope');
    if(sc) sc.onchange=e=>{ scope=e.target.value; render(); };
    const st=box.querySelector('#ptStart');
    if(st) st.onclick=()=>startQuiz();
    const ed=box.querySelector('#ptEdit');
    if(ed) ed.onclick=()=>{ view='edit'; render(); };
  }

  function startQuiz(wrongOnly){
    let qs=buildQuestions();
    if(wrongOnly){ const st=statsOf(part); qs=qs.filter(q=>st[q.key]&&st[q.key].w>0); }
    if(!qs.length){ toast('문제가 없어요'); return; }
    for(let i=qs.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[qs[i],qs[j]]=[qs[j],qs[i]];}
    quiz={list:qs,i:0,ok:0,done:0,wrong:[]};
    view='quiz'; render();
  }

  function renderQuiz(box){
    if(quiz.i>=quiz.list.length){
      const rate=quiz.done?Math.round(quiz.ok/quiz.done*100):0;
      box.innerHTML=`<div class="card empty">시험 완료! ${quiz.done}문제 중 ${quiz.ok}개 정답 (${rate}%)
        ${quiz.wrong.length?`<div style="margin-top:12px;font-size:14px">틀린 표현: <b>${quiz.wrong.map(esc).join(', ')}</b></div>`:''}
        <div class="btnrow" style="justify-content:center;margin-top:16px">
          ${quiz.wrong.length?'<button class="btn badb" id="ptRetry">틀린 것만 다시</button>':''}
          <button class="btn primary" id="ptAgain">다시 시작</button>
          <button class="btn ghost" id="ptBack">목록으로</button>
        </div></div>`;
      const rt=box.querySelector('#ptRetry'); if(rt) rt.onclick=()=>startQuiz(true);
      box.querySelector('#ptAgain').onclick=()=>startQuiz(false);
      box.querySelector('#ptBack').onclick=()=>{ view='list'; render(); };
      return;
    }
    const q=quiz.list[quiz.i];
    box.innerHTML=`<div class="quizcard">
      <div class="qnum" style="justify-content:space-between"><span>${quiz.i+1} / ${quiz.list.length}</span><span>${esc(q.sub)}</span></div>
      <div class="qmean">${esc(q.hint)}</div>
      <div class="qpos">${q.ans.length}글자 · 단어 ${q.ans.split(/\s+/).length}개</div>
      <div class="audiorow" style="justify-content:center"><button class="playbtn" id="ptSay" title="발음 듣기">🔊</button></div>
      <input type="text" id="ptIn" placeholder="영어로 입력하세요" autocomplete="off" autocapitalize="off" spellcheck="false">
      <div id="ptRes"></div>
      <div class="btnrow" style="justify-content:center">
        <button class="btn ghost" id="ptPrev" ${quiz.i===0?'disabled style="opacity:.4"':''}>← 이전</button>
        <button class="btn primary" id="ptSubmit">확인 (Enter)</button>
        <button class="btn ghost" id="ptSkip">모르겠어요</button>
      </div></div>`;
    const inp=box.querySelector('#ptIn'); inp.focus();
    box.querySelector('#ptSay').onclick=()=>speak(q.ans);
    let answered=false;
    function submit(giveUp){
      if(answered) return; answered=true;
      const typed=inp.value.trim();
      const ok=!giveUp && typed.toLowerCase()===q.ans.toLowerCase();
      record(part,q.key,ok);
      quiz.done++; if(ok) quiz.ok++; else quiz.wrong.push(q.ans);
      const d=charDiff(typed,q.ans);
      box.querySelector('#ptRes').innerHTML=`<div class="qfeed">${d.map(x=>`<span class="c-${x.k}">${esc(x.c)}</span>`).join('')}</div>
        <div class="qanswer">${ok?'✅ 정답!':'정답: <b>'+esc(q.ans)+'</b>'}</div>`;
      inp.disabled=true;
      const sb=box.querySelector('#ptSubmit'); sb.textContent='다음 (Enter) →'; sb.onclick=next;
      speak(q.ans);
      document.onkeydown=e=>{ if(e.key==='Enter'){ e.preventDefault(); document.onkeydown=null; next(); } };
    }
    function next(){ document.onkeydown=null; quiz.i++; render(); }
    inp.onkeydown=e=>{ if(e.key==='Enter'){ e.preventDefault(); answered?next():submit(false); } };
    box.querySelector('#ptSubmit').onclick=()=>submit(false);
    box.querySelector('#ptSkip').onclick=()=>submit(true);
    box.querySelector('#ptPrev').onclick=()=>{ if(quiz.i>0){ quiz.i--; render(); } };
  }

  // ── 표현 수정·추가 (SST) ─────────────────────────────────────
  function renderEdit(box){
    const chs=sstData();
    const cur=chs.find(c=>String(c.no)===String(scope)) || chs[0];
    scope=String(cur.no);
    box.innerHTML=`<div class="bar">
        <label>챕터 <select id="ptEScope">${chs.map(c=>`<option value="${c.no}" ${String(c.no)===String(cur.no)?'selected':''}>#${c.no} ${esc(c.title)}</option>`).join('')}</select></label>
        <button class="btn ghost sm" id="ptEBack">← 목록으로</button>
        <button class="btn ghost sm" id="ptEReset">이 챕터 원본으로</button>
        <span class="chip">표현 ${cur.items.length}개</span>
      </div>
      <div class="card">
        <div class="qnum"><span><b>#${cur.no}</b> ${esc(cur.title)}</span><span>수정하면 자동 저장돼요</span></div>
        <div id="ptRows">${cur.items.map((it,i)=>rowHTML(it,i)).join('')}</div>
        <div class="btnrow"><button class="btn primary sm" id="ptAdd">+ 표현 추가</button></div>
      </div>`;
    box.querySelector('#ptEScope').onchange=e=>{ scope=e.target.value; render(); };
    box.querySelector('#ptEBack').onclick=()=>{ view='list'; render(); };
    box.querySelector('#ptEReset').onclick=()=>{
      const ed=load(K.sst.edits,{}); delete ed[cur.no]; save(K.sst.edits,ed);
      toast('원본으로 되돌렸어요'); render();
    };
    box.querySelector('#ptAdd').onclick=()=>{
      const items=readRows(box); items.push({en:'',kr:'',ko:''}); persist(cur,items); render();
    };
    box.querySelectorAll('#ptRows input').forEach(el=>{
      el.oninput=()=>persist(cur,readRows(box));
    });
    box.querySelectorAll('.ptDel').forEach(b=>{
      b.onclick=()=>{ const items=readRows(box); items.splice(Number(b.dataset.i),1); persist(cur,items); render(); };
    });
  }
  function rowHTML(it,i){
    return `<div class="word-item" data-row="${i}">
      <input type="text" class="ptEn" value="${esc(it.en)}" placeholder="영어 표현" style="flex:1.4;min-width:150px;padding:8px 10px;border:1px solid var(--line);border-radius:8px">
      <input type="text" class="ptKo" value="${esc(it.ko)}" placeholder="한글 뜻" style="flex:1.2;min-width:120px;padding:8px 10px;border:1px solid var(--line);border-radius:8px">
      <input type="text" class="ptKr" value="${esc(it.kr)}" placeholder="발음(선택)" style="flex:1;min-width:110px;padding:8px 10px;border:1px solid var(--line);border-radius:8px">
      <button class="wi-del ptDel" data-i="${i}" title="삭제">🗑</button>
    </div>`;
  }
  function readRows(box){
    return [...box.querySelectorAll('#ptRows [data-row]')].map(r=>({
      en:r.querySelector('.ptEn').value.trim(),
      ko:r.querySelector('.ptKo').value.trim(),
      kr:r.querySelector('.ptKr').value.trim()
    }));
  }
  function persist(ch,items){
    const ed=load(K.sst.edits,{});
    ed[ch.no]=Object.assign({},ed[ch.no],{items:items,title:ch.title,subject:ch.subject});
    save(K.sst.edits,ed);
  }

  // ── 진입점 ───────────────────────────────────────────────────
  function render(){
    const box=document.getElementById('stage');
    if(!box) return;
    if(view==='quiz'&&quiz) return renderQuiz(box);
    if(view==='edit'&&part==='sst') return renderEdit(box);
    renderList(box);
  }

  window.PTE_PARTS={
    open(p){ if(part!==p){ part=p; scope='all'; quiz=null; } view='list'; render(); },
    render, say(t){ speak(t); },
    counts(){
      const s=(window.PTE_SST||[]); const l=(window.PTE_LFIB||[]);
      return { sstCh:s.length, sstItems:s.reduce((a,c)=>a+c.items.length,0),
               lfibDoc:l.length, lfibBlanks:l.reduce((a,x)=>a+x.answers.length,0) };
    }
  };
})();
