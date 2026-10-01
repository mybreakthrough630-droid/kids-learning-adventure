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
  }];
})();
