// 카테고리 번호
const BigCategoryData = [
  { 
    code: 100,
    name: '정치'
  }, 
  { 
    code: 101,
    name: '경제'
  },
  {
    code: 105, 
    name: 'IT/과학'
  }]

const SmallCategoryData = {
  100: [
    {
      code: 264,
      name: '대통령실'
    },
    { 
      code: 265,
      name: '국회/정당'
    },
    {
      code: 268,
      name: '북한'
    },
    {
      code: 266,
      name: '행정'
    },
    {
      code: 267,
      name: '국방/외교'
    },
    {
      code: 269, 
      name: '정치일반'
    },],
  101: [
    { 
      code: 259, 
      name: '금융'
    },
    { 
      code: 258, 
      name: '증권'
    },
    { 
      code: 261,
      name: '산업/재계'
    },
    { 
      code: 771, 
      name: '중기/벤처'
    },
    { 
      code: 260, 
      name: '부동산'
    },
    { 
      code: 262, 
      name: '글로벌 경제'
    },
    { 
      code: 310, 
      name: '생활경제'
    },
    { 
      code: 263, 
      name: '경제 일반'
    },],
  105: [
    { 
      code: 731, 
      name: '모바일'
    },
    { 
      code: 226, 
      name: '인터넷/SNS'
    },
    { 
      code: 227, 
      name: '통신/뉴미디어'
    },
    { 
      code: 230, 
      name: 'IT 일반'
    },
    { 
      code: 732, 
      name: '보안/해킹'
    },
    { 
      code: 283, 
      name: '컴퓨터'
    },
    { 
      code: 229, 
      name: '게임/리뷰'
    },
    { 
      code: 228, 
      name: '과학 일반'
    },]
  }

const BigCategory = 
  { 
    100: '정치', 
    101: '경제', 
    105: 'IT/과학'
  }

const SmallCategory = {
  264: '대통령실',
  265: '국회/정당',
  268: '북한',
  266: '행정',
  267: '국방/외교',
  269: '정치일반',
  
  259: '금융',
  258: '증권',
  261: '산업/재계',
  771: '중기/벤처',
  260: '부동산',
  262: '글로벌 경제',
  310: '생활경제',
  263: '경제 일반',
  
  731: '모바일',
  226: '인터넷/SNS',
  227: '통신/뉴미디어',
  230: 'IT 일반',
  732: '보안/해킹',
  283: '컴퓨터',
  229: '게임/리뷰',
  228: '과학 일반',
}


export { BigCategory, SmallCategory, BigCategoryData, SmallCategoryData }
