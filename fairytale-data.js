/* Faithful raster artwork; transparent surrounds never imply a faded object. */
(() => {
  const data = window.AdventureData;
  data.shapes = data.shapes.map((shape, index) => ({
    name: shape.name,
    art: `<span class="shape-art shape-${index}" role="img" aria-label="${shape.name}"></span>`
  }));
  data.candies = ['彩虹棒棒糖','粉紅糖果','朱古力','軟糖熊','曲奇','雪糕','冬甩','杯子蛋糕'].map((name,index)=>({
    name, art: `<span class="candy-art sprite-${index}" role="img" aria-label="${name}"></span>`
  }));
  data.animals = ['兔仔','貓咪','小熊','小狗','熊貓','狐狸','小豬','小雞'].map((name,index)=>({
    name, art: `<span class="animal-art sprite-${index}" role="img" aria-label="${name}"></span>`
  }));
  data.vehicles = ['小汽車','巴士','火車','飛機','直升機','帆船','單車','消防車'].map((name,index)=>({
    name, art: `<span class="vehicle-art sprite-${index}" role="img" aria-label="${name}"></span>`
  }));
  data.trainTokens = theme => {
    const shuffle = list => { const a=[...list]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
    if(['shapes','candies','vehicles'].includes(theme))return data[theme];
    return shuffle([...shuffle(data.shapes).slice(0,3),...shuffle(data.candies).slice(0,3),...shuffle(data.vehicles).slice(0,2)]);
  };
  // Only complete, visually verified pairs. Coordinates are region centres.
  data.scenes = [{
    title: '童話公園・小狗與貓咪',
    image: 'assets/fairytale/park-original.png',
    changedImage: 'assets/fairytale/park-changed.png',
    intrinsic: true,
    items: [
      { name: '氣球顏色', x: 54.5, y: 12, w: 15, h: 23 },
      { name: '小狗頸巾顏色', x: 39, y: 60, w: 15, h: 16 },
      { name: '長凳坐墊顏色', x: 86, y: 54, w: 25, h: 12 },
      { name: '涼亭屋頂顏色', x: 16, y: 20, w: 22, h: 13 },
      { name: '池塘鴨仔數量', x: 23, y: 85, w: 20, h: 20 },
      { name: '花盆顏色', x: 89.5, y: 84, w: 18, h: 20 }
    ]
  }, {
    title:'巴士站', image:'assets/fairytale/scenes/scene-02-original.png',
    changedImage:'assets/fairytale/scenes/scene-02-changed.png', intrinsic:true,
    items:[
      {name:'雨傘顏色',x:23.25,y:12.25,w:46.5,h:24.5},
      {name:'巴士顏色',x:77.75,y:38.5,w:38.5,h:52},
      {name:'外套顏色',x:29,y:53.5,w:30,h:52},
      {name:'書包顏色',x:51.5,y:75,w:24,h:35},
      {name:'交通雪糕筒顏色',x:7,y:78.5,w:14,h:35},
      {name:'座墊顏色',x:90.5,y:85.5,w:19,h:13}
    ]
  }, {
    title:'學校操場', image:'assets/fairytale/scenes/scene-03-original.png',
    changedImage:'assets/fairytale/scenes/scene-03-changed.png', intrinsic:true,
    items:[
      {name:'皮球顏色',x:30.5,y:43.5,w:12,h:17},
      {name:'交通雪糕筒顏色',x:8.25,y:79,w:13.5,h:33},
      {name:'水樽顏色',x:49.75,y:82,w:8,h:21},
      {name:'書包顏色',x:83.25,y:77.75,w:20.5,h:31.5},
      {name:'旗幟顏色',x:93,y:10.25,w:9,h:11.5},
      {name:'長椅座位顏色',x:84.75,y:50.75,w:23.5,h:8}
    ]
  }, {
    title:'溫馨客廳', image:'assets/fairytale/scenes/scene-04-original.png',
    changedImage:'assets/fairytale/scenes/scene-04-changed.png', intrinsic:true,
    items:[
      {name:'梳化靠墊顏色',x:9.8,y:51.25,w:19.6,h:37.5},
      {name:'花瓶顏色',x:12.6,y:77.2,w:14.8,h:26},
      {name:'時鐘顏色',x:90.4,y:12.9,w:9.6,h:13.4},
      {name:'杯子顏色',x:38.35,y:78.8,w:15.3,h:19.6},
      {name:'書封顏色',x:61.45,y:82.6,w:26.1,h:15.2},
      {name:'蘋果數量',x:87.75,y:81.1,w:23.5,h:18.2}
    ]
  }, {
    title:'海灘親子遊・細心觀察', image:'assets/fairytale/scenes/scene-05-original.png',
    changedImage:'assets/fairytale/scenes/scene-05-changed.png', intrinsic:true,
    items:[
      {name:'帽子絲帶',kind:'part',x:43.5,y:25,w:21,h:16},
      {name:'沙灘球與泳圈',kind:'object',x:11.5,y:74,w:23,h:29},
      {name:'水桶提手',kind:'part',x:39.5,y:81.5,w:17,h:20},
      {name:'沙鏟方向',kind:'orientation',x:59.5,y:84,w:23,h:14},
      {name:'沙堡塔樓數量',kind:'count',x:55,y:70,w:9,h:14},
      {name:'船帆數量',kind:'count',x:86,y:33,w:8,h:16}
    ]
  }, {
    title:'動物農場・形狀與數量', image:'assets/fairytale/scenes/scene-06-original.png',
    changedImage:'assets/fairytale/scenes/scene-06-changed.png', intrinsic:true,
    items:[
      {name:'窗戶形狀',kind:'shape',x:21.5,y:13.5,w:12,h:14},
      {name:'水桶提手',kind:'part',x:12.8,y:76.5,w:23,h:28},
      {name:'頸巾圖案',kind:'pattern',x:39,y:52,w:20,h:22},
      {name:'兔仔手上食物',kind:'object',x:65,y:63,w:24,h:23},
      {name:'碗內物件',kind:'addition',x:86.5,y:80.5,w:23,h:19},
      {name:'蘋果數量',kind:'count',x:48.5,y:71,w:21,h:14}
    ]
  }, {
    title:'兔仔糖果店・圖案與細節', image:'assets/fairytale/scenes/scene-07-original.png',
    changedImage:'assets/fairytale/scenes/scene-07-changed.png', intrinsic:true,
    items:[
      {name:'兔仔帽子款式',kind:'object',x:44,y:24,w:29,h:33},
      {name:'糖果樽蝴蝶結',kind:'part',x:14.2,y:26.7,w:18,h:20},
      {name:'包裝糖果形狀',kind:'shape',x:16.1,y:78.5,w:28,h:20},
      {name:'棒棒糖螺旋方向',kind:'orientation',x:37.5,y:67.8,w:20,h:28},
      {name:'蛋糕彩糖裝飾',kind:'part',x:61,y:69,w:23,h:24},
      {name:'車厘子數量',kind:'count',x:86.5,y:77,w:21,h:21}
    ]
  }];
  // Seven additional close-up scenes; genuine object changes, never overlays.
  data.scenes.push(
    {
      title:"城市街市", image:'assets/fairytale/scenes/scene-08-original.png',
      changedImage:'assets/fairytale/scenes/scene-08-changed.png', intrinsic:true,
      items:[
        {"name":"吊掛水果種類","kind":"object","x":11,"y":17,"w":21,"h":30,"description":"香蕉變成葡萄。"},
        {"name":"籃內水果種類","kind":"object","x":12,"y":80,"w":18,"h":22,"description":"前方突出籃子的梨變成蘋果。"},
        {"name":"手袋圖案","kind":"pattern","x":19,"y":65,"w":27,"h":27,"description":"條紋手袋變成素色。"},
        {"name":"時鐘指針方向","kind":"orientation","x":90,"y":15,"w":18,"h":28,"description":"時鐘指針轉到三點。"},
        {"name":"展示牌形狀","kind":"shape","x":87,"y":70,"w":24,"h":42,"description":"長方形展示牌變成橢圓形。"},
        {"name":"蘋果數量","kind":"count","x":56,"y":87,"w":27,"h":23,"description":"兩個蘋果變成一個。"}
      ]
    },
    {
      title:"圖書館", image:'assets/fairytale/scenes/scene-09-original.png',
      changedImage:'assets/fairytale/scenes/scene-09-changed.png', intrinsic:true,
      items:[
        {"name":"眼鏡形狀","kind":"shape","x":42,"y":44,"w":20,"h":15,"description":"圓眼鏡變成長方形。"},
        {"name":"書籤","kind":"part","x":57,"y":86,"w":17,"h":13,"description":"書籤及流蘇消失。"},
        {"name":"燈罩形狀","kind":"shape","x":14,"y":22,"w":22,"h":34,"description":"錐形燈罩變成圓筒形。"},
        {"name":"書本數量","kind":"count","x":14,"y":80,"w":28,"h":29,"description":"上方綠色書本消失，只剩兩本。"},
        {"name":"時鐘指針方向","kind":"orientation","x":91,"y":14,"w":16,"h":26,"description":"時鐘轉到三點。"},
        {"name":"花盆形狀","kind":"shape","x":92,"y":80,"w":16,"h":30,"description":"方形花盆變成圓形。"}
      ]
    },
    {
      title:"生日派對", image:'assets/fairytale/scenes/scene-10-original.png',
      changedImage:'assets/fairytale/scenes/scene-10-changed.png', intrinsic:true,
      items:[
        {"name":"派對帽圖案","kind":"pattern","x":25,"y":14,"w":18,"h":28,"description":"條紋帽變成波點帽。"},
        {"name":"蠟燭數量","kind":"count","x":48,"y":64,"w":18,"h":20,"description":"三支蠟燭變成兩支。"},
        {"name":"禮物蝴蝶結","kind":"part","x":12,"y":70,"w":23,"h":18,"description":"禮物上方蝴蝶結消失。"},
        {"name":"吊飾形狀","kind":"shape","x":91,"y":13,"w":16,"h":21,"description":"星星吊飾變成心心。"},
        {"name":"士多啤梨數量","kind":"count","x":60,"y":69,"w":10,"h":12,"description":"右邊士多啤梨消失。"},
        {"name":"氣球形狀","kind":"shape","x":90,"y":40,"w":20,"h":33,"description":"心形氣球變成圓形。"}
      ]
    },
    {
      title:"花園種植", image:'assets/fairytale/scenes/scene-11-original.png',
      changedImage:'assets/fairytale/scenes/scene-11-changed.png', intrinsic:true,
      items:[
        {"name":"草帽絲帶","kind":"part","x":55,"y":15,"w":37,"h":26,"description":"草帽藍色絲帶及蝴蝶結消失。"},
        {"name":"灑水壺提手","kind":"part","x":13,"y":58,"w":20,"h":25,"description":"灑水壺的提手消失。"},
        {"name":"花朵數量","kind":"count","x":84,"y":58,"w":28,"h":35,"description":"三朵雛菊變成兩朵。"},
        {"name":"花園牌形狀","kind":"shape","x":89,"y":24,"w":22,"h":26,"description":"方牌變成橢圓形。"},
        {"name":"耙齒數量","kind":"count","x":51,"y":83,"w":17,"h":19,"description":"三個耙齒變成四個。"},
        {"name":"蔬菜種類","kind":"object","x":16,"y":41,"w":20,"h":18,"description":"紅蘿蔔變成紅色蘿蔔。"}
      ]
    },
    {
      title:"火車月台", image:'assets/fairytale/scenes/scene-12-original.png',
      changedImage:'assets/fairytale/scenes/scene-12-changed.png', intrinsic:true,
      items:[
        {"name":"帽徽形狀","kind":"shape","x":32,"y":16,"w":10,"h":10,"description":"圓徽章變成星星徽章。"},
        {"name":"旗幟形狀","kind":"shape","x":53,"y":36,"w":17,"h":17,"description":"三角旗變成長方旗。"},
        {"name":"車頭燈形狀","kind":"shape","x":87,"y":39,"w":13,"h":18,"description":"圓車頭燈變成方形。"},
        {"name":"行李數量","kind":"count","x":15,"y":76,"w":28,"h":27,"description":"上方紅行李消失，只剩啡色行李。"},
        {"name":"路障條紋","kind":"pattern","x":53,"y":78,"w":11,"h":27,"description":"路障少了一條白色條紋。"},
        {"name":"煙囪金圈","kind":"part","x":80,"y":5,"w":15,"h":10,"description":"煙囪頂部金圈消失。"}
      ]
    },
    {
      title:"機場出發", image:'assets/fairytale/scenes/scene-13-original.png',
      changedImage:'assets/fairytale/scenes/scene-13-changed.png', intrinsic:true,
      items:[
        {"name":"書包前袋","kind":"part","x":20,"y":64,"w":15,"h":19,"description":"書包前袋及拉鏈消失。"},
        {"name":"行李提手","kind":"part","x":9,"y":53,"w":16,"h":32,"description":"行李伸縮提手消失。"},
        {"name":"飲品數量","kind":"count","x":80,"y":83,"w":16,"h":26,"description":"右邊果汁杯消失。"},
        {"name":"機尾圖案","kind":"pattern","x":88,"y":23,"w":15,"h":24,"description":"條紋機尾變成波點。"},
        {"name":"時鐘指針方向","kind":"orientation","x":16,"y":12,"w":15,"h":23,"description":"時鐘轉到三點。"},
        {"name":"書籤","kind":"part","x":51,"y":55,"w":9,"h":18,"description":"書中粉紅書籤消失。"}
      ]
    },
    {
      title:"海底水族館", image:'assets/fairytale/scenes/scene-14-original.png',
      changedImage:'assets/fairytale/scenes/scene-14-changed.png', intrinsic:true,
      items:[
        {"name":"海星形狀","kind":"shape","x":12,"y":14,"w":19,"h":25,"description":"五臂海星變成四臂。"},
        {"name":"魚兒數量","kind":"count","x":83,"y":13,"w":24,"h":24,"description":"三條黃魚變成兩條。"},
        {"name":"舷窗形狀","kind":"shape","x":28,"y":35,"w":26,"h":34,"description":"圓形舷窗變成橢圓形。"},
        {"name":"寶箱開合","kind":"state","x":87,"y":69,"w":26,"h":32,"description":"打開的寶箱合上了。"},
        {"name":"貝殼數量","kind":"count","x":13,"y":64,"w":23,"h":18,"description":"兩個貝殼變成一個。"},
        {"name":"海龜方向","kind":"orientation","x":69,"y":37,"w":44,"h":33,"description":"海龜由向左變成向右。"}
      ]
    }
  );
})();
