const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
assert.equal((html.match(/<nav\b/g)||[]).length,1);
assert.ok(html.indexOf('id="lessonFrame"')<html.indexOf('<nav'));
assert.equal((html.match(/class="lesson-tab(?: active)?"/g)||[]).length,15);
assert.ok(html.includes('id="activityMenu"'));
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
for(const reduced of [false,true]){
 const els={},calls=[];const element=()=>({classList:{toggle(){},remove(){},add(){}},setAttribute(){},addEventListener(){},focus(x){calls.push(['focus',x])}});
 for(const id of ['lessonFrame','frameWrap','stageTitle','directLink'])els[id]=element();
 const tab={...element(),dataset:{src:'memory-train.html?v=20261001e',title:'形狀記憶列車'}};
 const stage={scrollIntoView(x){calls.push(['scroll',x])}};
 const ctx={document:{getElementById:k=>els[k],querySelectorAll:()=>[tab],querySelector:()=>stage},matchMedia:()=>({matches:reduced})};
 vm.createContext(ctx);vm.runInContext(script,ctx);ctx.openLesson(tab);
 assert.equal(els.lessonFrame.src,tab.dataset.src);assert.equal(els.stageTitle.textContent,tab.dataset.title);assert.equal(els.directLink.href,tab.dataset.src);
 assert.equal(calls[0][0],'focus');assert.equal(calls[0][1].preventScroll,true);assert.equal(calls[1][1].block,'start');assert.equal(calls[1][1].behavior,reduced?'auto':'smooth');
}
console.log('PASS: exactly one bottom navigation, all15activities retained, iframe/source/title/directlink synchronized, scroll/focus, reducedmotion.');
