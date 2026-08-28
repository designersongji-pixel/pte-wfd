// ── WFD 그룹정리 ─────────────────────────────────────────────
// 주제별 분류 규칙 + 비슷한 문장(혼동 세트) 자동 묶기.
// 주차가 바뀌어도 규칙이 그대로 적용되므로 새 주차를 넣으면 자동으로 분류됩니다.
// 분류가 마음에 안 들면 아래 규칙의 단어만 고치면 됩니다. (숫자 = 가중치, 클수록 우선)

window.WFD_TOPICS = [
 {
  "id": "class",
  "label": "수업·강의",
  "emoji": "📚",
  "rules": [
   [
    3,
    "\\b(lecture|lectures|tutorial|tutorials|seminar|seminars|classroom)\\b"
   ],
   [
    2,
    "\\b(course|courses|coursework|class|classes|module|modules|curriculum|syllabus|elective|teach|teaching|taught|teacher|professor|lecturer|instructor)\\b"
   ],
   [
    2,
    "\\b(subjects?|attendance|homework)\\b"
   ],
   [
    1,
    "\\b(learn|learning|learners|study|studies|studying|attend|attending|term|semester|education|educational|reforms?)\\b"
   ]
  ]
 },
 {
  "id": "assign",
  "label": "과제·시험·평가",
  "emoji": "📝",
  "rules": [
   [
    3,
    "\\b(assignment|assignments|essay|essays|homework|exam|exams|test|assessment|assessments|grade|grades|grading|deadline|marks?)\\b"
   ],
   [
    2,
    "\\b(submit|submitted|submission|due|paper|papers|presentation|presentations|quiz|thesis|dissertation)\\b"
   ],
   [
    1,
    "\\b(argument|arguments|examples?|conclusion|references?)\\b"
   ]
  ]
 },
 {
  "id": "campus",
  "label": "대학생활·캠퍼스 안내",
  "emoji": "🏫",
  "rules": [
   [
    3,
    "\\b(campus|library|accommodation|residence|residences|dormitory|scholarship|enrol|enroll|register|registration|cafeteria|bookstore|pharmacy|car park|noticeboard|timetable|office hours)\\b"
   ],
   [
    2,
    "\\b(university|universities|college|faculty|student shop|stationery|canceled|cancelled|closed|printers?|website|conference|applications?|textbooks?|postgraduate|undergraduate)\\b"
   ],
   [
    2,
    "\\b(complaint|complex|application|voting|online|registration) forms?\\b"
   ],
   [
    2,
    "\\b(complaint|complex) form\\b"
   ],
   [
    1,
    "\\b(students?|graduates?|freshers?|departments?)\\b"
   ]
  ]
 },
 {
  "id": "research",
  "label": "과학·연구",
  "emoji": "🔬",
  "rules": [
   [
    3,
    "\\b(research|experiment|experiments|experimental|laboratory|lab|hypothesis|scientific|scientists?|chemistry|chemical|physics|biology|neuroscience|mathematics|statistics|statistical|astrophysicists|meteorologists)\\b"
   ],
   [
    2,
    "\\b(theory|theories|data|variables?|correlation|evidence|findings?|analysis|analyze|analysing|compound|molecule|atoms?|cells?|mechanics|deduction|principles?)\\b"
   ],
   [
    2,
    "\\b(published|publication|articles?|journals?)\\b"
   ],
   [
    1,
    "\\b(study|studies|method|methods|procedures?|results?)\\b"
   ]
  ]
 },
 {
  "id": "env",
  "label": "환경·기후·자연",
  "emoji": "🌍",
  "rules": [
   [
    3,
    "\\b(climate|pollution|environmental|environments?|global warming|sea level|sea temperatures?|greenhouse|sustainab\\w+|unsustainable|ecosystems?|habitats?|marine|underwater|polar)\\b"
   ],
   [
    2,
    "\\b(weather|forecast|earth|planet|planets|universe|species|wild|captivity|animals?|plants?|foliage|farming|farmers|agricultur\\w+|crops?)\\b"
   ],
   [
    1,
    "\\b(water|land|air|natural|nature)\\b"
   ]
  ]
 },
 {
  "id": "econ",
  "label": "경제·비즈니스",
  "emoji": "💰",
  "rules": [
   [
    3,
    "\\b(economy|economic|economics|inflation|taxes?|income|budget|investment|invested|finances?|financial|bank|banks|interest|profit|revenue|price|prices|unemployment)\\b"
   ],
   [
    2,
    "\\b(business|businesses|company|companies|firm|firms|marketing|market|sales|consumer|consumers|customers?|industry|industries|manufacturing|trade|commercial|organi[sz]ational|organi[sz]ation)\\b"
   ],
   [
    1,
    "\\b(funds?|funding)\\b"
   ],
   [
    1,
    "\\b(management|manager|productivity|efficiency|growth)\\b"
   ]
  ]
 },
 {
  "id": "media",
  "label": "미디어·기술",
  "emoji": "📱",
  "rules": [
   [
    3,
    "\\b(social media|internet|online|digital|computers?|laptops?|mobile phones?|smartphones?|technology|technologies|software|camera|photography)\\b"
   ],
   [
    2,
    "\\b(websites?)\\b"
   ],
   [
    2,
    "\\b(media|news|broadcast|film|printers?|machines?|devices?|network|networks|app|apps)\\b"
   ],
   [
    1,
    "\\b(information|communicat\\w+)\\b"
   ]
  ]
 },
 {
  "id": "society",
  "label": "사회·인간·심리",
  "emoji": "👥",
  "rules": [
   [
    3,
    "\\b(society|social|population|populations|culture|cultural|cultures|psychology|psychological|behaviou?rs?|human beings?|humans?|philosophy|community|communities|inequality|poverty|housing)\\b"
   ],
   [
    2,
    "\\b(people|persons?|children|parents?|families|relationships?|facial expressions?|language|languages|election|government|governments|policy|policies|public)\\b"
   ],
   [
    1,
    "\\b(life|lives|living|world)\\b"
   ]
  ]
 },
 {
  "id": "hist",
  "label": "역사·예술·건축",
  "emoji": "🏛️",
  "rules": [
   [
    4,
    "\\b(poetry|poems?|novel|orchestra|concert|gallery|museum|dance|sculpture)\\b"
   ],
   [
    3,
    "\\b(history|historical|Roman|Republic|revolution|ancient|century|museum|gallery|architecture|architectural|architect|art|arts|artists?|poetry|poems?|novel|dance|performances?|orchestra|concert|design|designers?)\\b"
   ],
   [
    2,
    "\\b(buildings|structure|structures|construction|style|classical|literature|exhibition|steam)\\b"
   ],
   [
    1,
    "\\b(traditional|modern|heritage)\\b"
   ]
  ]
 },
 {
  "id": "food",
  "label": "음식·건강",
  "emoji": "🍽️",
  "rules": [
   [
    3,
    "\\b(food|foods|nutrition|nutritional|calories|diet|sugar|honey|antibiotics|vitamins?|cafeteria|soup|salads?|sandwiches|chicken|fish|meals?)\\b"
   ],
   [
    2,
    "\\b(health|healthy|diseases?|medical|medicine|eradicated)\\b"
   ],
   [
    1,
    "\\b(muscles?|body)\\b"
   ],
   [
    1,
    "\\b(eat|eating|drink|protective clothing)\\b"
   ]
  ]
 },
 {
  "id": "career",
  "label": "취업·커리어",
  "emoji": "💼",
  "rules": [
   [
    3,
    "\\b(job|jobs|career|careers|interview|interviews|employers?|employees?|employment|professions?|professional|recruit\\w*|internship|workplace|cv|resume)\\b"
   ],
   [
    2,
    "\\b(work|working|workers?|skills?|labor|labour|qualified|qualifications?|degree|training|punctuality|team|teams|colleagues?)\\b"
   ],
   [
    1,
    "\\b(opportunit\\w+|experience)\\b"
   ]
  ]
 }
];

window.WFD_MISC = { id:'misc', label:'일반·기타 표현', emoji:'🔖' };

(function(){
  const TOPICS = window.WFD_TOPICS.map(t => ({
    ...t, rx: t.rules.map(r => [r[0], new RegExp(r[1], 'gi')])
  }));

  // 문장 하나를 주제 하나로 분류 (가장 점수 높은 주제, 동점이면 위에 정의된 순서)
  function classify(en){
    let best = null, bs = 0;
    for(const t of TOPICS){
      let sc = 0;
      for(const [w, rx] of t.rx){ rx.lastIndex = 0; const m = en.match(rx); if(m) sc += w * m.length; }
      if(sc > bs){ bs = sc; best = t.id; }
    }
    return best || 'misc';
  }

  // 주제별로 묶기 → [{id,label,emoji,items:[문장…]}, …]
  function byTopic(list){
    const map = {};
    for(const s of list){ const t = classify(s.en); (map[t] = map[t] || []).push(s); }
    const out = [];
    for(const t of TOPICS) if(map[t.id]) out.push({ id:t.id, label:t.label, emoji:t.emoji, items:map[t.id] });
    if(map.misc) out.push({ ...window.WFD_MISC, items: map.misc });
    return out;
  }

  // ── 비슷한 문장 묶기 ──
  const STOP = new Set('a an the is are was were be been being of to in on at for and or but with as by from that this these those it its their his her our your my you we they he she i not no than then so if there here'.split(' '));
  function contentWords(s){
    return (s.toLowerCase().match(/[a-z]+/g) || []).filter(w => !STOP.has(w));
  }
  function similarity(a, b){
    const A = new Set(contentWords(a)), B = new Set(contentWords(b));
    if(!A.size || !B.size) return 0;
    let inter = 0; A.forEach(w => { if(B.has(w)) inter++; });
    let j = inter / (A.size + B.size - inter);
    const wa = a.toLowerCase().split(/\s+/), wb = b.toLowerCase().split(/\s+/);
    let p = 0; while(p < wa.length && p < wb.length && wa[p] === wb[p]) p++;
    if(p >= 3) j += 0.08;
    if(p >= 5) j += 0.07;
    return j;
  }
  // 다른 문장과 어디가 다른지 표시용 — 상대 문장에 없는 단어 목록
  function diffWords(en, others){
    const mine = (en.match(/[A-Za-z']+/g) || []);
    const theirs = new Set();
    others.forEach(o => (o.toLowerCase().match(/[a-z']+/g) || []).forEach(w => theirs.add(w)));
    return new Set(mine.filter(w => !theirs.has(w.toLowerCase())).map(w => w.toLowerCase()));
  }
  // 유사도 th 이상으로 연결된 문장들을 한 덩어리로 (union-find)
  function similarGroups(list, th){
    th = th || 0.33;
    const n = list.length, par = Array.from({length:n}, (_, i) => i);
    const find = x => { while(par[x] !== x){ par[x] = par[par[x]]; x = par[x]; } return x; };
    let maxSim = {};
    for(let i = 0; i < n; i++) for(let j = i+1; j < n; j++){
      const s = similarity(list[i].en, list[j].en);
      if(s >= th){ par[find(i)] = find(j); const k = find(i); maxSim[k] = Math.max(maxSim[k]||0, s); }
    }
    const bucket = {};
    for(let i = 0; i < n; i++){ const r = find(i); (bucket[r] = bucket[r] || []).push(list[i]); }
    const out = [];
    for(const k in bucket){
      if(bucket[k].length < 2) continue;
      const items = bucket[k].sort((a,b) => a.n - b.n);
      const texts = items.map(x => x.en);
      out.push({
        items,
        sim: maxSim[k] || th,
        diffs: items.map((x, i) => diffWords(x.en, texts.filter((_, j) => j !== i)))
      });
    }
    return out.sort((a,b) => b.items.length - a.items.length || a.items[0].n - b.items[0].n);
  }

  window.WFD_GROUPS = { classify, byTopic, similarGroups, similarity };
})();
