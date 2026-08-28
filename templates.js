// PTE 템플릿 암기 트레이너 데이터 (구조 암기 / 토픽뱅크 / SWT 체크에서 공용으로 사용)
window.PTE_TEMPLATES = {
  order: ['di_basic','di_chart','rl','sgd','rts','rts_min','sst','we'],
  structures: {
    di_basic: {
      id:'di_basic', cat:'DI', title:'DI · 기본 템플릿 (Picture / Diagram)', goalSec:40,
      lines: [
        {icon:'🎯', tag:'주제', text:'This image gives information about [topic].'},
        {icon:'👀', tag:'개요', text:'It shows [topic].'},
        {icon:'⬆️', tag:'위', text:'The top shows [word 1] and [word 2].'},
        {icon:'🔘', tag:'중간', text:'The middle shows [word 3] and [word 4].'},
        {icon:'⬅️', tag:'좌', text:'The left side shows [word 5] and [word 6].'},
        {icon:'➡️', tag:'우', text:'The right side shows [word 7] and [word 8].'},
        {icon:'🎓', tag:'교육적', text:'Furthermore, it is educational.'},
        {icon:'✅', tag:'주제 정리', text:'To sum up, it is useful for understanding [topic].'}
      ],
      tips:['[topic]에는 이미지의 핵심 주제를 넣기','위 → 중간 → 좌 → 우 순서로 [word 1]~[word 8]에 핵심 단어 2개씩 채우기','Furthermore, it is educational.은 설명을 다 한 뒤, 마무리 직전에 넣기','마지막은 주제를 다시 언급하며 마무리']
    },
    di_chart: {
      id:'di_chart', cat:'DI', title:'DI · 숫자가 있는 경우 (Chart / Graph)', goalSec:40,
      lines: [
        {icon:'🎯', tag:'주제', text:'This image gives information about [topic].'},
        {icon:'📊', tag:'그래프 소개', text:'This figure shows the highest value and the lowest value.'},
        {icon:'⬆️', tag:'최고값', text:'The highest value is [number] in [item].'},
        {icon:'⬇️', tag:'최저값', text:'The lowest value is [number] in [item].'},
        {icon:'⬅️', tag:'좌측', text:'On the left side, there is [word].'},
        {icon:'✅', tag:'주제 정리', text:'To sum up, it is useful for understanding [topic].'}
      ],
      tips:['[topic]에는 이미지의 핵심 주제를 넣기','최고값/최저값은 각각 수치([number])+항목([item], 연도·국가 등)으로 두 문장에 나눠 쓰기','왼쪽에 보이는 항목이나 수치를 [word]에 넣기','마지막은 주제를 다시 언급하며 마무리']
    },
    rl: {
      id:'rl', cat:'RL', title:'RL · Repeat Lecture', goalSec:40,
      lines: [
        {icon:'🎯', tag:'주제', text:'This lecture gives information about [subject].'},
        {icon:'⭐', tag:'핵심 2가지', text:'There are key aspects such as [word 1] and [word 2].'},
        {icon:'🎓', tag:'교육적', text:'Furthermore, it is educational.'},
        {icon:'💬', tag:'내용 1', text:'The speaker says that [word 3] and [word 4] are important.'},
        {icon:'💬', tag:'내용 2', text:'Also, the speaker mentions [word 5] and [word 6] in the lecture.'},
        {icon:'💬', tag:'내용 3', text:'Lastly, the speaker explains [word 7] and [word 8] in more detail.'},
        {icon:'✅', tag:'주제 정리', text:'To sum up, it is useful for understanding [subject].'},
        {icon:'📌', tag:'안 들렸을 때 A', text:'(A) and (B) are very important.', optional:true, section:'못 들었을 경우 (단어 12개 정도 듣기)'},
        {icon:'📌', tag:'안 들렸을 때 B', text:'(C) and (D) are very necessary.', optional:true, section:'못 들었을 경우 (단어 12개 정도 듣기)'},
        {icon:'📌', tag:'안 들렸을 때 C', text:'(E) and (F) are very essential.', optional:true, section:'못 들었을 경우 (단어 12개 정도 듣기)'}
      ],
      tips:['들은 순서대로 2~3개 핵심 내용 전달','says(~are important) / mentions(~in the lecture) / explains(~in more detail)로 문장마다 다른 마무리 사용','못 들었을 경우 핵심 단어만 짧게 묶어 말하기','마지막은 주제를 다시 언급하며 마무리']
    },
    sgd: {
      id:'sgd', cat:'SGD', title:'SGD · Summarize Group Discussion', goalSecLabel:'1분 5초 이상',
      lines: [
        {icon:'🎯', tag:'서론', section:'서론 · Main topic', text:'The group talks about [main topic], and the speakers share information about it.'},
        {icon:'🗣️', tag:'Speaker 1', section:'Speaker 1 · 첫 번째 화자', text:'The first speaker talks about [S1 - 들은 내용 1] and also mentions [S1 - 들은 내용 2].'},
        {icon:'🗣️', tag:'Speaker 1', section:'Speaker 1 · 첫 번째 화자', text:'This speaker also focuses on [S1 - 추가 단어 1] and [S1 - 추가 단어 2].'},
        {icon:'🗣️', tag:'Speaker 1', section:'Speaker 1 · 첫 번째 화자', text:'These points give more information about the main topic.'},
        {icon:'🗣️', tag:'Speaker 2', section:'Speaker 2 · 두 번째 화자', text:'The second speaker talks about [S2 - 들은 내용 1] and also mentions [S2 - 들은 내용 2].'},
        {icon:'🗣️', tag:'Speaker 2', section:'Speaker 2 · 두 번째 화자', text:'This speaker also focuses on [S2 - 추가 단어 1] and [S2 - 추가 단어 2].'},
        {icon:'🗣️', tag:'Speaker 2', section:'Speaker 2 · 두 번째 화자', text:'These points give more detail to the discussion.'},
        {icon:'🗣️', tag:'Speaker 3', section:'Speaker 3 · 세 번째 화자', text:'The third speaker talks about [S3 - 들은 내용 1] and also mentions [S3 - 들은 내용 2].'},
        {icon:'✅', tag:'결론', section:'결론 · 전체 정리', text:'The speakers focus on different parts of the topic.'},
        {icon:'✅', tag:'결론', section:'결론 · 전체 정리', text:'These points explain the main topic in more detail.'},
        {icon:'✅', tag:'결론', section:'결론 · 전체 정리', text:'To sum up, it is useful information about [main topic].'}
      ],
      tips:['3분 듣는 동안 main point/detail 구분하지 말고, 들은 내용을 그때그때 짧게 받아 적기','S1·S2는 들은 내용 2개 + 여유 있으면 추가 단어 2개까지, S3는 들은 내용 2개만 적어도 충분','못 들은 내용은 추측해서 만들지 않기 — 정확히 들은 짧은 내용이 더 안전','10초 준비 시간엔 새 문장 만들지 말고, 적어둔 내용 중 화자별로 골라 바로 시작','고정 템플릿 문장을 천천히 또박또박 말하며 1분 5초 이상 채우기']
    },
    rts: {
      id:'rts', cat:'RTS', title:'RTS · Respond to Situation', goalSec:40,
      lines: [
        {icon:'👋', tag:'인사', text:'Hi, how are you?'},
        {icon:'🗣️', tag:'상황 이해', text:'I understand that [간략한 상황설명], and it can be a bit difficult.'},
        {icon:'💡', tag:'제안', text:'But if I were you, I would [간단한 제안/해결책 제시],'},
        {icon:'💬', tag:'이유', text:'because it can help with [이유].'},
        {icon:'✅', tag:'마무리', text:"Don't worry too much. I'll just try my best and things will get better. I believe I can handle it."}
      ],
      tips:['유창성이 매우 중요함','문제가 화면에 떠 있으니 확인하며 읽어도 됨','늘 상대가 있으니 인사가 자연스러움','답변 시 지문의 She/He→you, you→I로 바꾸기','문제에서 말이 되는 문장을 그대로 가져올 것']
    },
    rts_min: {
      id:'rts_min', cat:'RTS', title:'RTS · 최소 방어 전략 (Backup)', goalSec:40,
      lines: [
        {icon:'👋', tag:'인사', text:'Hi, how are you?'},
        {icon:'🗣️', tag:'상황 요약', text:'I think this situation about [핵심내용 1] and [핵심내용 2] is very important, so I will talk to you about it.'},
        {icon:'✅', tag:'마무리', text:'I think we should work together to solve the problem because I want to help you.'}
      ],
      tips:['기본 RTS 템플릿이 항상 우선 — 이건 상황을 전혀 이해 못했을 때만 쓰는 최후의 안전 문장','[핵심내용 1]/[핵심내용 2] 자리에는 들린 단어를 최대한 그대로 넣기 — 완벽한 문장이 아니어도 됨','침묵보다 이 세 문장이라도 말하는 게 유창성 점수에 훨씬 유리함','시간이 남으면 마지막 문장 뒤에 아는 만큼 더 덧붙이기']
    },
    sst: {
      id:'sst', cat:'SST', title:'SST · Summarize Spoken Text', writingOnly:true, charRange:[50,70], goalSecLabel:'50-65 단어',
      lines: [
        {icon:'🎯', tag:'주제', text:'This lecture gives information about [subject].'},
        {icon:'⭐', tag:'핵심 2가지', text:'There are key aspects such as [word 1] and [word 2].'},
        {icon:'💬', tag:'내용 1', text:'Furthermore, it mentions [word 3] and [word 4].'},
        {icon:'💬', tag:'내용 2', text:'The speaker talks about [word 5] and [word 6].'},
        {icon:'💬', tag:'내용 3', text:'The speaker also mentions [word 7] and [word 8].'},
        {icon:'📝', tag:'내용 정리', text:'These points give more information about the main topic of the lecture.'},
        {icon:'✅', tag:'주제 정리', text:'To sum up, it is useful for understanding [subject].'},
        {icon:'📌', tag:'안 들렸을 때 A', text:'(A) and (B) are very important.', optional:true, section:'못 들었을 경우 (단어 12개 정도 듣기)'},
        {icon:'📌', tag:'안 들렸을 때 B', text:'(C) and (D) are very necessary.', optional:true, section:'못 들었을 경우 (단어 12개 정도 듣기)'},
        {icon:'📌', tag:'안 들렸을 때 C', text:'(E) and (F) are very essential.', optional:true, section:'못 들었을 경우 (단어 12개 정도 듣기)'}
      ],
      tips:['이 7문장은 듣기·암기용 연습 구조 — 실제 SST 답안은 이 내용을 압축해 "한 문장"으로 작성','예: 핵심 단어만 골라 that/and/while 등으로 이어 붙여 한 문장으로 압축','직접 타이핑해야 하는 라이팅 문제(스피킹 아님)','못 들었을 경우 핵심 단어만 짧게 묶어 말하기']
    },
    we: {
      id:'we', cat:'WE', title:'WE · Write Essay', writingOnly:true,
      wordRange:[200,300], wordRecommended:[220,250], timeGoalLabel:'20분 목표', timeGoalDetail:'권장 작성 시간: 15분 작성 + 5분 검토',
      // 21문장 고정 스켈레톤 — 5단계(서론/장점 단락/단점 단락/특별 요구사항/결론). 이 배열이 "기본 템플릿"의 기본값이며,
      // 사용자가 앱에서 "템플릿 수정"으로 편집하면 localStorage(wfd_we_template_v1)에 오버라이드가 저장됩니다.
      // 2026-08 개편: 21문장(장점/단점 각 +1문장) + 서론 4번 문장을 질문 유형별 [INTRO OPINION] 토큰으로 + A/B/C/D 내용 세트 + 제출 전 체크리스트.
      sentences: [
        {n:1,  section:'intro',      text:'Nowadays, there are different opinions about [TOPIC].'},
        {n:2,  section:'intro',      text:'This issue is important in our society, and people have different opinions about it.'},
        {n:3,  section:'intro',      text:'It can affect many people in different ways, so it is worth discussing carefully.'},
        {n:4,  section:'intro',      text:'[INTRO OPINION]'},
        {n:5,  section:'benefit',    text:'First of all, there are several benefits.'},
        {n:6,  section:'benefit',    text:'One important benefit is that [BENEFIT].'},
        {n:7,  section:'benefit',    text:"This can make people's lives better and bring positive changes to society."},
        {n:8,  section:'benefit',    text:'For example, [BENEFIT EXAMPLE].'},
        {n:9,  section:'benefit',    text:"This shows that this issue can have a positive effect on people's lives."},
        {n:10, section:'benefit',    text:'In many cases, this benefit can also influence both individuals and communities in useful ways.'},
        {n:11, section:'problem',    text:'However, there are also some disadvantages.'},
        {n:12, section:'problem',    text:'One possible problem is that [PROBLEM].'},
        {n:13, section:'problem',    text:'In some cases, this problem can become serious and affect many people.'},
        {n:14, section:'problem',    text:'For example, [PROBLEM EXAMPLE].'},
        {n:15, section:'problem',    text:'This shows that this issue can also have negative effects.'},
        {n:16, section:'problem',    text:'Therefore, it is important to understand the risks and think about how they can be reduced.'},
        {n:17, section:'special',    text:'[SPECIAL SLOT]', optional:true},
        {n:18, section:'conclusion', text:'In conclusion, I believe the advantages are greater than the disadvantages.'},
        {n:19, section:'conclusion', text:'Although there are some problems, the positive effects can be more important when the issue is managed carefully.'},
        {n:20, section:'conclusion', text:'People should consider both the positive and negative sides before making decisions.'},
        {n:21, section:'conclusion', text:'These decisions can affect both individuals and society as a whole.'}
      ],
      sections: [
        {key:'intro', num:'①', label:'서론'},
        {key:'benefit', num:'②', label:'장점 단락'},
        {key:'problem', num:'③', label:'단점 단락'},
        {key:'special', num:'④', label:'특별 요구사항', hint:'문제에서 요구할 때만 사용'},
        {key:'conclusion', num:'⑤', label:'결론'}
      ],
      placeholders: ['[TOPIC]','[INTRO OPINION]','[BENEFIT]','[BENEFIT EXAMPLE]','[PROBLEM]','[PROBLEM EXAMPLE]'],
      // 서론 4번 문장 — 질문 유형에 따라 교체 (SPECIAL SLOT과 같은 방식: 유형 선택 → 자동입력 → 직접 수정)
      introGuide: [
        {key:'advdis', label:'advantages / disadvantages', sentence:'In my opinion, it has more advantages than disadvantages.'},
        {key:'should', label:'Should A ...?', sentence:'In my opinion, A should ...', note:'A와 행동을 문제에 맞게 바꾸세요. 반대 의견이면 "A should not ..."으로 씁니다.'},
        {key:'agree', label:'Do you agree that X?', sentence:'', note:'지문의 핵심 표현을 평서문으로 바꿔 직접 답하세요. (예: In my opinion, ...)'},
        {key:'who', label:'Who should ...?', sentence:'In my opinion, ... should ...', note:'선택한 주체를 넣어 직접 답하세요.'}
      ],
      specialSlotGuide: [
        {key:'experience', label:'share your own experience', sentence:'In my own experience, this issue has affected my daily life in a positive way.'},
        {key:'solution', label:'give a solution', sentence:'One possible solution is for governments and individuals to work together to solve this problem.'},
        {key:'government', label:'what should governments do?', sentence:'In my opinion, governments should create clear rules and provide proper support.'},
        {key:'minage', label:'minimum age / state which age', sentence:'Therefore, I believe 18 is a suitable minimum age for driving.', note:'숫자와 대상은 문제에 맞게 바꿔서 사용하세요.'},
        {key:'example', label:'give an example only', sentence:'', skip:true, note:'SPECIAL SLOT 추가 X — 이미 [BENEFIT EXAMPLE] / [PROBLEM EXAMPLE]에서 예시를 처리합니다.'}
      ],
      // A/B/C/D 만능 내용 세트 — 새 템플릿이 아니라 BENEFIT/BENEFIT EXAMPLE/PROBLEM/PROBLEM EXAMPLE 4칸을 한번에 채우는 카테고리
      contentSets: [
        {key:'A', label:'A · 기술/인터넷/미디어/편리함', keywords:'시간 → 정보 → 집중',
          benefit:'it can save time and make life more convenient',
          bexample:'people can get information more easily and quickly',
          problem:'it can provide inaccurate information or distract people',
          pexample:'people may have difficulty focusing on their studies or work'},
        {key:'B', label:'B · 교육/직업/학습/기회', keywords:'학습 → 미래 → 어려움',
          benefit:'people can learn new things and gain useful experience',
          bexample:'people can develop their skills and improve their future',
          problem:'people may face difficulties or have fewer opportunities',
          pexample:'some people may fall behind in their studies or work'},
        {key:'C', label:'C · 건강/환경/지속가능성', keywords:'건강 → 깨끗함 → 오염',
          benefit:"it can improve people's health and protect the environment",
          bexample:'it can create a cleaner and healthier environment',
          problem:'it can cause health or environmental problems',
          pexample:"pollution can seriously affect people's daily lives"},
        {key:'D', label:'D · 사회/법/규칙/책임', keywords:'책임 → 관심 → 불공정',
          benefit:'it can encourage people to act more responsibly',
          bexample:"parents may pay more attention to their children's behavior",
          problem:'it can be unfair to people who cannot control every situation',
          pexample:"parents may be blamed even when they did not know about their children's actions"}
      ],
      categoryGuide: [
        {match:'technology / internet / social media / AI / online', cat:'A'},
        {match:'education / work / skills / jobs / learning', cat:'B'},
        {match:'health / environment / pollution / climate', cat:'C'},
        {match:'law / rules / responsibility / parents / government', cat:'D'}
      ],
      principles: [
        '가장 중요: 질문에 직접 답하기 — 새로운 영어를 만들기보다 지문의 핵심 표현을 최대한 그대로 재사용',
        '기본 순서: TOPIC → 장점 → 장점 예시 → 단점 → 단점 예시 → SPECIAL SLOT(필요할 때만) → 결론',
        '문제마다 기본적으로 바꾸는 것은 TOPIC / BENEFIT / BENEFIT EXAMPLE / PROBLEM / PROBLEM EXAMPLE 5개 + 서론 4번 문장',
        'A/B/C/D 카테고리에 억지로 끼우지 말고, 가장 가까운 것을 고르고 나머지는 SPECIAL SLOT으로 처리',
        '기본 문장은 그대로 암기',
        'SPECIAL SLOT은 질문에서 요구할 때만 사용'
      ],
      steps: [
        '문제에서 핵심 TOPIC 찾기',
        'Should / Do you agree / Who should라면 서론 4번 문장을 지문 표현으로 직접 답하기',
        'A / B / C / D 중 가장 가까운 카테고리 선택',
        'BENEFIT / BENEFIT EXAMPLE / PROBLEM / PROBLEM EXAMPLE 넣기',
        'own experience / solution / government action / minimum age 등 특별 요구 확인',
        '필요할 때만 SPECIAL SLOT 1~2문장 추가',
        'Word Count 220~250 확인 → 마지막 5분 검토'
      ],
      finalCheck: [
        '200~300 words 범위인가? (권장 220~250)',
        '[TOPIC] / [BENEFIT] 같은 빈칸이 남아 있지 않은가?',
        '서론 의견 문장이 질문에 직접 답하고 있는가?',
        '장점·단점·예시가 TOPIC과 관련 있는가?',
        '특별 요구사항을 놓치지 않았는가?',
        '철자 / 단수·복수 / 마침표를 빠르게 확인했는가?'
      ],
      verbTable: [
        {base:'save', wrong:'saved, saves, saving', mean:'절약하다 / 아끼다', ex:'people can save time'},
        {base:'improve', wrong:'improved, improves', mean:'향상시키다', ex:'people can improve physical health'},
        {base:'get', wrong:'got, gets, getting', mean:'얻다 / 취득하다', ex:'students can get better jobs'},
        {base:'learn', wrong:'learned, learns', mean:'배우다', ex:'people can learn new skills'}
      ],
      grammarNote:'동사원형(Base Form of Verb)이란 시제(과거/현재), 단복수, ing, ed 등 아무런 변형도 가해지지 않은 동사의 원래 기본 형태입니다. 조동사(can, will, should 등) 뒤에는 반드시 동사원형이 나와야 합니다.',
      expandTips:[
        {rule:'people 대신 구체적 대상 표현', before:'people (1단어)', after:'many people in society / many students in schools (+3단어)'},
        {rule:'this 대신 명사 확장', before:'this can help... (3단어)', after:'this kind of system can help... (+3단어)'}
      ]
    }
  },
  swt: {
    table: {passage:'최대 300 words', time:'10분', answer:'완전한 한 문장', words:'공식 5-75 / 목표 35-55', grading:'Content 4 · Form 1 · Grammar 2 · Vocabulary 2'},
    formRule: ['① 첫 글자는 대문자', '② 중간에는 온점(.) 금지', '③ 맨 마지막에만 온점(.) 1개'],
    findSteps: [
      {sec:15, text:'첫 2문단에서 2번 이상 보이는 핵심 명사 1-2개만 잡는다. 뜻을 몰라도 철자가 반복되면 후보.'},
      {sec:30, text:'지문을 눈으로 앞·중간·뒤 3구역으로 나누고, 각 구역에서 핵심 명사가 들어간 문장만 본다.'},
      {sec:30, text:'명확한 명사 주어 + 동사(is/are/has/have/can/cause/lead 등)가 있는 짧은 문장을 고른다.'},
      {sec:15, text:'숫자·연도·사람 이름·인용문·예시가 많은 문장은 버리고, 가장 일반적인 문장 2개를 먼저 확정한다.'}
    ],
    good: ['반복 핵심어가 들어 있다', 'This/It/They가 아닌 명사 주어로 시작한다', '주어 뒤에 is/are/has/have 등 동사가 보인다', '약 12-25단어의 일반적인 설명이다'],
    bad: ['연도·금액·퍼센트·고유명사가 많다', 'For example / such as / according to가 중심이다', '따옴표 속 발언 또는 사람 이름으로 끝난다', 'This / That / It만으로 시작해 앞문장이 필요하다'],
    selectRule: '앞=전체 주장, 중간=이유·중요성, 뒤=결과·행동을 찾되 예시뿐이면 건너뛴다. 먼저 2문장만 고르고, 합친 뒤 35단어 미만일 때만 세 번째 핵심 문장을 추가한다.',
    minEdit: ['전문용어·핵심 명사는 그대로 유지', 'This/That/It → 반복 핵심 명사', '확실한 쉬운 단어만 1-2개 변경', 'A; moreover, B. 또는 A, and B.'],
    phases: [
      {label:'찾기', desc:'반복 명사 → 3구역 훑기', from:0, to:90},
      {label:'선택', desc:'O/X 기준으로 핵심 2문장 확정', from:90, to:240},
      {label:'수정', desc:'출처·예시 삭제 → 중복 주어 정리 → 연결', from:240, to:450},
      {label:'검사', desc:'한 문장·35-55단어·주어+동사 확인', from:450, to:600}
    ],
    finalChecklist: ['첫 글자 대문자', '한 문장', '35-55 words', '온점은 맨 마지막에만 1개', '주어+동사', '확신 없는 단어 변경 없음']
  }
};
