// PTE 템플릿 암기 트레이너 데이터 (구조 암기 / 토픽뱅크 / SWT 체크에서 공용으로 사용)
window.PTE_TEMPLATES = {
  order: ['di_basic','di_chart','rl','sgd','rts','sst','we'],
  structures: {
    di_basic: {
      id:'di_basic', cat:'DI', title:'DI · 기본 템플릿 (Picture / Diagram)', goalSec:40,
      lines: [
        {icon:'🎯', tag:'주제', text:'This image gives information about (subject).'},
        {icon:'⭐', tag:'핵심 2가지', text:'There are key aspects, such as (topic 1) and (topic 2).'},
        {icon:'🎓', tag:'교육적', text:'Furthermore, these factors are educational.'},
        {icon:'⬆️', tag:'위/아래', text:'The top shows (...), and the bottom shows (...).'},
        {icon:'⬅️', tag:'좌/우', text:'The left shows (...), and the right shows (...).'},
        {icon:'✅', tag:'주제 정리', text:'It is very useful for understanding (subject).'}
      ],
      tips:['괄호당 단어 2개씩 꼭 넣기','위/아래 → 좌/우 순서 꼭 지키기','마지막은 주제를 다시 언급하며 마무리']
    },
    di_chart: {
      id:'di_chart', cat:'DI', title:'DI · 숫자가 있는 경우 (Chart / Graph)', goalSec:40,
      lines: [
        {icon:'🎯', tag:'주제', text:'This image gives information about (subject).'},
        {icon:'⭐', tag:'핵심 2가지', text:'There are key aspects, such as (topic 1) and (topic 2).'},
        {icon:'🎓', tag:'교육적', text:'Furthermore, these factors are educational.'},
        {icon:'📊', tag:'최고/최저', text:'The highest value is (...) in (...), and the lowest value is (...) in (...).'},
        {icon:'⬅️', tag:'좌/우', text:'The left side shows (...), and the right side shows (...).'},
        {icon:'✅', tag:'주제 정리', text:'It is very useful for understanding (subject).'}
      ],
      tips:['괄호당 단어 2개씩 꼭 넣기','최고/최저값은 수치+단위+항목(연도/국가 등)까지','비교표현은 간단하게: highest / lowest','좌/우로 전체 흐름 한 번 더 설명']
    },
    rl: {
      id:'rl', cat:'RL', title:'RL · Repeat Lecture', goalSec:40,
      lines: [
        {icon:'🎯', tag:'주제', text:'This lecture gives information about (subject).'},
        {icon:'⭐', tag:'핵심 2가지', text:'There are key aspects, such as (topic 1) and (topic 2).'},
        {icon:'🎓', tag:'교육적', text:'Furthermore, these factors are educational.'},
        {icon:'💬', tag:'내용 1', text:'The speaker said that (...).'},
        {icon:'💬', tag:'내용 2', text:'Also, the speaker mentioned that (...).'},
        {icon:'💬', tag:'내용 3', text:'Lastly, the speaker explained that (...).'},
        {icon:'✅', tag:'주제 정리', text:'It is very useful for understanding (subject).'},
        {icon:'📌', tag:'안 들렸을 때 A', text:'(A) and (B) are very important.', optional:true, section:'못 들었을 경우 (단어 12개 정도 듣기)'},
        {icon:'📌', tag:'안 들렸을 때 B', text:'(C) and (D) are very necessary.', optional:true, section:'못 들었을 경우 (단어 12개 정도 듣기)'},
        {icon:'📌', tag:'안 들렸을 때 C', text:'(E) and (F) are very essential.', optional:true, section:'못 들었을 경우 (단어 12개 정도 듣기)'}
      ],
      tips:['들은 순서대로 2~3개 핵심 내용 전달','said / mentioned / explained로 자연스럽게 연결','못 들었을 경우 핵심 단어만 짧게 묶어 말하기','마지막은 주제를 다시 언급하며 마무리']
    },
    sgd: {
      id:'sgd', cat:'SGD', title:'SGD · Summarize Group Discussion', goalSecLabel:'1분 10초',
      lines: [
        {tag:'서론', section:'서론 (Introduction)', text:'The group talked about [main topic].'},
        {tag:'서론', section:'서론 (Introduction)', text:'Each person had a different idea, and they shared their thoughts during the discussion.'},
        {tag:'인물 1', section:'인물 1', text:'One person said (주제 문장).'},
        {tag:'인물 1', section:'인물 1', text:"He/She believed this was a good choice. He/She also said it could help them."},
        {tag:'선택 표현', section:'인물 1 · 추가 표현 (선택, 남은 단어 많을 때)', optional:true, text:'He/She mentioned (A) and (B).'},
        {tag:'선택 표현', section:'인물 1 · 추가 표현 (선택, 남은 단어 많을 때)', optional:true, text:'He/She focused (A) and (B).'},
        {tag:'선택 표현', section:'인물 1 · 추가 표현 (선택, 남은 단어 많을 때)', optional:true, text:'He/She insisted (A) and (B).'},
        {tag:'선택 표현', section:'인물 1 · 추가 표현 (선택, 남은 단어 많을 때)', optional:true, text:'He/She said (A) and (B).'},
        {tag:'인물 2', section:'인물 2', text:'Another person preferred a different path.'},
        {tag:'인물 2', section:'인물 2', text:"He/She talked about 명사, and said he/she enjoyed it because [reason or personal experience]."},
        {tag:'인물 2', section:'인물 2', text:"He/She didn't care much about 명사 and wanted to do something."},
        {tag:'인물 3', section:'인물 3', text:'A third person mentioned about 명사.'},
        {tag:'인물 3', section:'인물 3', text:"He/She said 명사 and felt it was understandable."},
        {tag:'인물 3', section:'인물 3', text:'However, the others gave some advice.'},
        {tag:'결론', section:'결론 (Conclusion)', text:"In the end, even though they had different ideas, the group agreed that it's important for them prepare for the future."},
        {tag:'결론', section:'결론 (Conclusion)', text:'To sum up, as far as I am concerned the most important aspects is that governments should try to improve the quality of 명사 by subsidizing it in order to make our lives better.'}
      ],
      tips:['SGD 시작 전 종이에 1,2,3번 적어두기 (한글/문장/구조 다 OK)','1번에 적어둔 단어들 중 주제 문장 하나만 고르기','명사는 메인 토픽과 연결','목표: 1분 10초 넘기지 않기']
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
    sst: {
      id:'sst', cat:'SST', title:'SST · Summarize Spoken Text', writingOnly:true, charRange:[50,70],
      lines: [
        {icon:'🎯', tag:'주제', text:'This lecture gives information about [주제].'},
        {icon:'⭐', tag:'핵심 단어', text:'There are key aspects such as [들린 단어 1, 2].'},
        {icon:'💬', tag:'내용 1', text:'The speaker said that [들린 문장 1].'},
        {icon:'💬', tag:'내용 2', text:'He/She mentioned that [들린 문장 2].'},
        {icon:'✅', tag:'마무리', text:'To sum up, it is very useful.'}
      ],
      tips:['RL과 같은 소스 문장을 쓰지만, 50~70자 내외 한 문장으로 압축','직접 타이핑해야 하는 라이팅 문제(스피킹 아님)']
    },
    we: {
      id:'we', cat:'WE', title:'WE · Write Essay', writingOnly:true,
      wordRange:[200,300], wordRecommended:[220,250], timeGoalLabel:'20분 목표', timeGoalDetail:'권장 작성 시간: 15분 작성 + 5분 검토',
      // 20문장 고정 스켈레톤 — 5단계(서론/장점 단락/단점 단락/특별 요구사항/결론). 이 배열이 "기본 템플릿"의 기본값이며,
      // 사용자가 앱에서 "템플릿 수정"으로 편집하면 localStorage(wfd_we_template_v1)에 오버라이드가 저장됩니다.
      sentences: [
        {n:1,  section:'intro',      text:'Nowadays, there are different opinions about [TOPIC].'},
        {n:2,  section:'intro',      text:'This issue is important in our society, and many people talk about it in daily life and in the news.'},
        {n:3,  section:'intro',      text:'It can be seen from different points of view.'},
        {n:4,  section:'intro',      text:'In my opinion, it has more advantages than disadvantages.'},
        {n:5,  section:'intro',      text:'For this reason, it is worth discussing this issue carefully.'},
        {n:6,  section:'benefit',    text:'To begin with, this issue can bring several benefits.'},
        {n:7,  section:'benefit',    text:'One important benefit is that [BENEFIT].'},
        {n:8,  section:'benefit',    text:"This can make people's lives better and bring positive changes to society."},
        {n:9,  section:'benefit',    text:'For example, [BENEFIT EXAMPLE].'},
        {n:10, section:'benefit',    text:'This example shows that the issue can be useful in real life.'},
        {n:11, section:'problem',    text:'However, there are also some disadvantages.'},
        {n:12, section:'problem',    text:'One possible problem is that [PROBLEM].'},
        {n:13, section:'problem',    text:'In some cases, this problem can become serious and affect many people.'},
        {n:14, section:'problem',    text:'For example, [PROBLEM EXAMPLE].'},
        {n:15, section:'problem',    text:'Therefore, people should understand both the positive and negative sides.'},
        {n:16, section:'special',    text:'[SPECIAL SLOT]', optional:true},
        {n:17, section:'conclusion', text:'In conclusion, I believe the advantages are greater than the disadvantages.'},
        {n:18, section:'conclusion', text:'Although this issue has both positive and negative sides, its benefits can be more important when it is managed carefully.'},
        {n:19, section:'conclusion', text:'People should think about both sides before making decisions.'},
        {n:20, section:'conclusion', text:'These decisions can affect both individuals and society as a whole.'}
      ],
      sections: [
        {key:'intro', num:'①', label:'서론'},
        {key:'benefit', num:'②', label:'장점 단락'},
        {key:'problem', num:'③', label:'단점 단락'},
        {key:'special', num:'④', label:'특별 요구사항', hint:'문제에서 요구할 때만 사용'},
        {key:'conclusion', num:'⑤', label:'결론'}
      ],
      placeholders: ['[TOPIC]','[BENEFIT]','[BENEFIT EXAMPLE]','[PROBLEM]','[PROBLEM EXAMPLE]'],
      specialSlotGuide: [
        {key:'experience', label:'share your own experience', sentence:'In my own experience, this issue has affected my daily life in a positive way.'},
        {key:'solution', label:'give a solution', sentence:'One possible solution is for governments and individuals to work together to solve this problem.'},
        {key:'government', label:'what should governments do?', sentence:'In my opinion, governments should create clear rules and provide proper support.'},
        {key:'minage', label:'minimum age / state which age', sentence:'Therefore, I believe 18 is a suitable minimum age for driving.', note:'숫자와 대상은 문제에 맞게 바꿔서 사용하세요.'},
        {key:'example', label:'give an example only', sentence:'', skip:true, note:'SPECIAL SLOT 추가 X — 이미 [BENEFIT EXAMPLE] / [PROBLEM EXAMPLE]에서 예시를 처리합니다.'}
      ],
      principles: [
        '기본 템플릿 5개 빈칸 + 필요 시 SPECIAL SLOT 1~2문장만 추가',
        '명사/명사구를 여러 번 바꿔 쓸 필요 없음',
        'TOPIC은 첫 문장에만 입력하고, 이후에는 this issue / it 등으로 연결',
        '기본 문장은 그대로 암기',
        '문제마다 5개 빈칸의 내용만 변경',
        'SPECIAL SLOT은 질문에서 요구할 때만 사용'
      ],
      steps: [
        'Question 입력 → 문제 지문을 읽고 TOPIC이 될 핵심 단어를 정합니다.',
        'TOPIC 작성 → 1번 문장의 [TOPIC]에 채워 넣습니다.',
        'BENEFIT 작성 → 7번 문장의 [BENEFIT]에 이 주제의 장점을 채웁니다.',
        'BENEFIT EXAMPLE 작성 → 9번 문장의 [BENEFIT EXAMPLE]에 구체적인 예시를 채웁니다.',
        'PROBLEM 작성 → 12번 문장의 [PROBLEM]에 이 주제의 단점을 채웁니다.',
        'PROBLEM EXAMPLE 작성 → 14번 문장의 [PROBLEM EXAMPLE]에 구체적인 예시를 채웁니다.',
        '특별 요구사항이 있는지 확인 → 문제 지문에 특별한 요구(경험/해결책/정부 역할/나이 등)가 있는지 확인합니다.',
        '필요하면 SPECIAL SLOT 추가 → 16번 자리에 유형에 맞는 문장을 1~2개 추가합니다 (없으면 비워둠).',
        '최종 Essay 확인 → 전체 문장을 처음부터 끝까지 읽으며 자연스러운지 확인합니다.',
        'Word Count 확인 → 200~300 단어(권장 220~250) 범위인지 확인합니다.'
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
