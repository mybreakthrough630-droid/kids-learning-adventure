/* Shared native vector tokens complement the generated painted scenes. */
(() => {
const wrap=body=>`<svg viewBox="0 0 100 100" aria-hidden="true" stroke="#425772" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${body}</svg>`;
const shapeBodies=['<path d="M50 86 13 47C-3 21 29 5 50 28 71 5 103 21 87 47Z"/>','<path d="m10 32 20-20h40l20 20-40 57Z"/><path d="M10 32h80M30 12l8 20 12 57 12-57 8-20" fill="none" stroke="white"/>','<circle cx="50" cy="50" r="34"/>','<rect x="18" y="18" width="64" height="64" rx="3"/>','<rect x="8" y="27" width="84" height="46" rx="3"/>','<path d="m50 7 31 43-31 43-31-43Z"/>','<path d="m50 10 40 77H10Z"/>','<path d="m50 5 13 29 32 4-24 23 6 33-27-16-27 16 6-33L5 38l32-4Z"/>'];
const colors=['#ed87ab','#69c9ea','#ffce66','#8aceb3','#ab9be0','#f2ab77','#83b9e7','#ffd876'];
const shapes=['心心','鑽石','圓形','正方形','長方形','菱形','三角形','星星'].map((name,i)=>({name,art:wrap(`<g fill="${colors[i]}">${shapeBodies[i]}</g>`)}));
const candies=['棒棒糖','糖果','朱古力','軟糖','曲奇','雪糕','冬甩','杯子蛋糕'].map((name,i)=>({name,art:wrap([
'<path d="M50 54v39" stroke="#b78b6c" stroke-width="7"/><circle cx="50" cy="33" r="28" fill="#ec8da9"/><path d="M50 13c27 0 27 40 0 40-19 0-19-25 0-25 9 0 9 13 0 13" fill="none" stroke="white" stroke-width="6"/>',
'<path d="m8 30 21 10v20L8 70l5-20Z M92 30 71 40v20l21 10-5-20Z" fill="#73cdd7"/><rect x="25" y="29" width="50" height="42" rx="18" fill="#eaa6cd"/><path d="M42 30v40m16-40v40" stroke="white" stroke-width="8"/>',
'<rect x="22" y="9" width="56" height="82" rx="7" fill="#926254"/><path d="M24 36h52M24 62h52M50 11v78" stroke="#dca28a" stroke-width="5"/>',
'<circle cx="30" cy="24" r="12" fill="#ffb170"/><circle cx="70" cy="24" r="12" fill="#ffb170"/><ellipse cx="50" cy="45" rx="28" ry="25" fill="#ffb170"/><ellipse cx="50" cy="74" rx="25" ry="19" fill="#ffb170"/><circle cx="40" cy="41" r="3"/><circle cx="60" cy="41" r="3"/><path d="m45 54 5 4 5-4" fill="none"/>',
'<circle cx="50" cy="50" r="37" fill="#e8b774"/><g fill="#8d6050"><circle cx="37" cy="29" r="5"/><circle cx="63" cy="37" r="6"/><circle cx="36" cy="59" r="6"/><circle cx="60" cy="70" r="5"/></g>',
'<path d="m28 48 44 0-22 46Z" fill="#e6bd82"/><circle cx="50" cy="35" r="26" fill="#f5a1ba"/><path d="M34 63h31m-25 13h21" stroke="#c48e52"/>',
'<circle cx="50" cy="50" r="36" fill="#dfac70"/><circle cx="50" cy="50" r="30" fill="#ee8fad"/><circle cx="50" cy="50" r="12" fill="#fff4e6"/><path d="m27 31 7 5m30-8 3 8m-8 33 6 5m-36-16 3-7" stroke="#fff6ab" stroke-width="4"/>',
'<path d="m24 49 52 0-9 41H33Z" fill="#8bc7da"/><path d="M18 49c-9-12 6-25 16-23-2-22 30-28 36-7 20-1 23 22 12 30Z" fill="#f2a3c4"/><circle cx="52" cy="12" r="8" fill="#ef7272"/>'
][i])}));
const animals=['兔仔','貓咪','小熊','小狗','熊貓','狐狸','小豬','小雞'].map((name,i)=>({name,art:wrap(`<g fill="${['#fff1e6','#f8bf74','#c4987d','#d9bc95','#fff','#f0a66c','#f5b2c0','#ffdd75'][i]}">${i===0?'<ellipse cx="35" cy="23" rx="10" ry="23"/><ellipse cx="65" cy="23" rx="10" ry="23"/>':i===1||i===5?'<path d="m20 42-3-29 30 19M80 42l3-29-30 19Z"/>':'<circle cx="23" cy="29" r="13"/><circle cx="77" cy="29" r="13"/>'}<ellipse cx="50" cy="62" rx="36" ry="31"/></g>${i===4?'<ellipse cx="35" cy="55" rx="12" ry="15" fill="#425772"/><ellipse cx="65" cy="55" rx="12" ry="15" fill="#425772"/>':''}<circle cx="36" cy="55" r="3" fill="${i===4?'white':'#425772'}"/><circle cx="64" cy="55" r="3" fill="${i===4?'white':'#425772'}"/><path d="m45 66 5 5 5-5M50 71q-6 9-12 3m12-3q6 9 12 3" fill="none"/>`)}));
// Each overlay has a named, unique visual difference. Both panels share the same PNG.
const object=(type,color)=>wrap({
balloon:`<ellipse cx="50" cy="32" rx="25" ry="29" fill="${color}"/><path d="m50 61-4 7h8ZM50 68q-12 11 0 24" fill="none"/><path d="M37 17q-8 5-7 16" stroke="white" fill="none"/>`,
bus:`<rect x="7" y="25" width="86" height="50" rx="8" fill="${color}"/><path d="M15 33h57v20H15Z" fill="#bfe8f3"/><path d="M77 33h10v37H77Z" fill="#bfe8f3"/><circle cx="26" cy="77" r="10" fill="#425772"/><circle cx="77" cy="77" r="10" fill="#425772"/>`,
ball:`<circle cx="50" cy="50" r="34" fill="${color}"/><path d="M20 33q30 34 60 34M50 16q-24 34 0 68M20 67q30-34 60-34" fill="none" stroke="white"/>`,
bag:`<rect x="23" y="29" width="54" height="60" rx="10" fill="${color}"/><path d="M34 29V17q16-14 32 0v12" fill="none"/><rect x="33" y="59" width="34" height="20" rx="5" fill="#ffffff55"/>`,
flower:`<path d="M50 45v48M50 75q-29-19-29-2t29 9M50 67q29-19 29-2T50 77" stroke="#6aab7c" fill="#87cda0"/><g fill="${color}"><circle cx="35" cy="25" r="15"/><circle cx="65" cy="25" r="15"/><circle cx="27" cy="46" r="15"/><circle cx="73" cy="46" r="15"/><circle cx="50" cy="58" r="15"/></g><circle cx="50" cy="38" r="14" fill="#ffdf72"/>`,
bird:`<ellipse cx="49" cy="57" rx="29" ry="20" fill="${color}"/><circle cx="70" cy="40" r="18" fill="${color}"/><path d="m87 38 12 6-13 6" fill="#efb95c"/><path d="m21 54-18-10 6 26 16-6" fill="${color}"/><circle cx="75" cy="37" r="3"/><path d="M40 54q20-5 14 16M43 77v13m17-13v13" fill="none"/>`,
boat:`<path d="M8 65h84L77 89H25Z" fill="${color}"/><path d="M47 64V7L82 56H47" fill="#fff1c1"/><path d="M41 24 16 57h25Z" fill="${color}"/>`,
cone:`<path d="m50 9 31 70H19Z" fill="${color}"/><path d="M31 50h38" stroke="white" stroke-width="12"/><rect x="8" y="79" width="84" height="13" rx="4" fill="${color}"/>`,
cup:`<path d="M22 24h51v48q-25 23-51 0Z" fill="${color}"/><path d="M73 33h10q23 21-10 26" fill="none"/><path d="M33 7v8m16-8v8m16-8v8" stroke="#fff"/>`,
umbrella:`<path d="M8 48Q50-24 92 48Z" fill="${color}"/><path d="M50 47v37q0 15-15 8" fill="none"/><path d="M50 12Q29 27 28 48M50 12q21 15 22 36" fill="none" stroke="white"/>`,
apple:`<path d="M50 27C18 9 8 47 24 75q12 16 26 6 14 10 26-6C92 47 82 9 50 27Z" fill="${color}"/><path d="M50 27V10"/><path d="M51 20q9-19 25-8-8 16-25 8" fill="#73b786"/>`,
star: `<g fill="${color}">${shapeBodies[7]}</g>`
}[type]);
const titles=['公園野餐','巴士站','學校操場','溫馨客廳','海灘假日','動物農場','糖果小店','城市街市','圖書館','生日派對','花園種植','火車月台','機場大堂','水族館','動物園','雪地公園','家庭廚房','單車公園','消防局','遊樂場'];
const sets=[['balloon','bus','ball','bag','bird','apple'],['bus','cone','bag','umbrella','bird','ball'],['ball','bag','cone','flower','bird','balloon'],['cup','flower','bag','apple','ball','star'],['boat','umbrella','ball','bag','bird','cup'],['bird','flower','apple','bag','ball','cone'],['cup','star','balloon','bag','apple','flower'],['apple','bag','umbrella','cup','flower','bird'],['bag','cup','flower','star','apple','ball'],['balloon','star','cup','bag','flower','apple'],['flower','bird','apple','umbrella','cup','bag'],['bag','cone','cup','bird','balloon','ball'],['bag','bus','cone','cup','star','bird'],['boat','star','ball','cup','bag','flower'],['bird','flower','balloon','bag','apple','ball'],['umbrella','star','bag','cup','bird','ball'],['cup','apple','flower','bag','star','bird'],['cone','ball','bag','bird','flower','cup'],['cone','bus','bag','cup','ball','star'],['balloon','ball','bag','flower','bird','star']];
const labels={balloon:'氣球',bus:'巴士',ball:'皮球',bag:'背包',flower:'花朵',bird:'小鳥',boat:'帆船',cone:'雪糕筒路障',cup:'杯子',umbrella:'雨傘',apple:'蘋果',star:'星星'};
const positions=[[13,65],[78,65],[20,85],[49,85],[85,85],[51,65]];
const scenes=titles.map((title,i)=>({title,image:`assets/adventure/scene-${String(i+1).padStart(2,'0')}.png`,items:sets[i].map((type,j)=>({type,name:labels[type],x:positions[j][0],y:positions[j][1],a:colors[(i+j)%8],b:colors[(i+j+3)%8],change:j===4?'missing':'color'}))}));
window.AdventureData={shapes,candies,animals,scenes,object};
})();
