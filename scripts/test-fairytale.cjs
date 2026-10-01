const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
class Element {
 constructor(){this.children=[];this.hidden=false;this.disabled=false;this.value='1';this.style={setProperty(){}};this.classList={add(){}};this.attrs={};this.textContent='';this.innerHTML='';this.dataset={};}
 append(...x){this.children.push(...x)} replaceChildren(...x){this.children=x} setAttribute(k,v){this.attrs[k]=v} focus(){} remove(){} click(){if(!this.disabled)this.onclick?.()}
}
function setup(game,level){
 const els={},timers=new Map(),delays=[];let id=0;
 const doc={body:new Element(),activeElement:null,hidden:false,getElementById(k){return els[k]??=new Element()},createElement(){return new Element()},addEventListener(){}};
 const ctx={document:doc,location:{pathname:`/memory-${game}.html`,search:''},URLSearchParams,window:{addEventListener(){}},setTimeout(fn,delay){delays.push(delay);timers.set(++id,fn);return id},clearTimeout(k){timers.delete(k)},setInterval(){return 0},clearInterval(){},matchMedia:()=>({matches:true}),Math:Object.create(Math)};
 ctx.Math.random=()=>.01;vm.createContext(ctx);
 for(const file of ['adventure-data.js','fairytale-data.js','adventure-game.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
 els.level.value=String(level);els.level.onchange();
 return {els,ctx,delays,drain(){let guard=0;while(timers.size){assert.ok(++guard<100);const[k,fn]=timers.entries().next().value;timers.delete(k);fn()}}};
}
for(let level=1;level<=5;level++){
 const t=setup('train',level),e=t.els,n=[3,4,5,6,8][level-1];assert.equal(e.slots.children.length,n);t.drain();
 assert.ok(e.palette.children.every(b=>/shape-art|candy-art|vehicle-art/.test(b.innerHTML)));assert.equal(e.palette.children.length,8);assert.equal(e.check.disabled,true);
 for(let i=0;i<n;i++)e.palette.children[0].click();e.undo.click();assert.equal(e.check.disabled,true);e.palette.children[0].click();e.check.click();
 assert.equal(e.success.hidden,false);assert.equal(e.round.textContent,'第 1 關');e.next.click();assert.equal(e.round.textContent,'第 2 關');
 assert.ok(t.delays.includes([3000,2500,1500,750,500][level-1]));
 const d=setup('differences',level);d.drain();assert.equal(d.els.scenePicker.children.length,d.ctx.window.AdventureData.scenes.length);assert.equal(d.els.scenePicker.hidden,false);
 let box=d.els.pair.children[1].children[1];assert.equal(box.children[0].src,'assets/fairytale/park-changed.png');assert.ok(box.children.slice(1).every(b=>b.innerHTML===''));
 for(let j=0;j<6;j++){box=d.els.pair.children[1].children[1];box.children[j+1].click()}
 assert.equal(d.els.success.hidden,false);assert.equal(d.els.round.textContent,'第 1 關');d.els.next.click();assert.equal(d.els.scenePicker.value,1);
}
for(const game of ['candy','animals'])for(let level=1;level<=5;level++){
 const t=setup(game,level),e=t.els,n=[3,4,5,6,8][level-1];t.drain();
 assert.equal(e.slots.children.length,n);assert.equal(e.palette.children.length,8);
 assert.ok(e.palette.children.every(b=>b.innerHTML.includes(game==='candy'?'candy-art':'animal-art')&&!b.innerHTML.includes('<svg')));
 for(let i=0;i<n;i++){if(game==='candy')e.palette.children[0].click();else e.slots.children[i].click()}
 e.check.click();assert.equal(e.success.hidden,false);assert.equal(e.round.textContent,'第 1 關');e.next.click();assert.equal(e.round.textContent,'第 2 關');
}
for(const theme of ['shapes','candies','vehicles','mixed'])for(let level=1;level<=5;level++){
 const t=setup('train',level),e=t.els;e.tokenSet.value=theme;e.tokenSet.onchange();t.drain();
 assert.equal(e.palette.children.length,8);assert.equal(e.slots.children.length,[3,4,5,6,8][level-1]);
 if(theme!=='mixed')assert.ok(e.palette.children.every(b=>b.innerHTML.includes({shapes:'shape-art',candies:'candy-art',vehicles:'vehicle-art'}[theme])));
 else for(const art of ['shape-art','candy-art','vehicle-art'])assert.ok(e.palette.children.some(b=>b.innerHTML.includes(art)));
 for(const unused of e.slots.children)e.palette.children[0].click();e.check.click();assert.equal(e.success.hidden,false);e.next.click();assert.equal(e.round.textContent,'第 2 關');
}
const sceneCount=setup('differences',1).ctx.window.AdventureData.scenes.length;
for(let index=0;index<sceneCount;index++){
 const t=setup('differences',1);t.els.scenePicker.value=String(index);t.els.scenePicker.onchange();const scene=t.ctx.window.AdventureData.scenes[index];
 assert.notEqual(scene.image,scene.changedImage);assert.ok(fs.existsSync(scene.image)&&fs.existsSync(scene.changedImage));assert.equal(scene.items.length,6);
 for(const i of scene.items){assert.ok(i.x-i.w/2>=-0.001&&i.x+i.w/2<=100.001);assert.ok(i.y-i.h/2>=-0.001&&i.y+i.h/2<=100.001)}
 if(index>=4){
   assert.ok(new Set(scene.items.map(i=>i.kind)).size>=4);
   assert.ok(scene.items.every(i=>i.kind&&i.kind!=='color'&&!i.name.includes('顏色')));
   const meta=JSON.parse(fs.readFileSync(`assets/fairytale/scenes/scene-${String(index+1).padStart(2,'0')}.json`,'utf8'));
   assert.equal(meta.assetMetadata.boxOrigin,'centre');assert.equal(meta.items.length,6);
   for(let j=0;j<6;j++)for(const key of ['name','kind','x','y','w','h'])assert.equal(meta.items[j][key],scene.items[j][key]);
   for(const path of [scene.image,scene.changedImage]){const png=fs.readFileSync(path);assert.equal(png.readUInt32BE(16),1536);assert.equal(png.readUInt32BE(20),1024)}
   assert.ok(!fs.readFileSync(scene.image).equals(fs.readFileSync(scene.changedImage)));
 }
 for(let j=0;j<6;j++)t.els.pair.children[1].children[1].children[j+1].click();
 assert.equal(t.els.success.hidden,false);t.els.next.click();assert.equal(t.els.scenePicker.value,(index+1)%sceneCount);
}
const wrong=setup('train',5);wrong.drain();for(let i=0;i<8;i++)wrong.els.palette.children[1].click();wrong.els.check.click();assert.equal(wrong.els.success.hidden,true);assert.ok(wrong.els.slots.children.every(b=>b.className.includes('wrong')));wrong.els.retry.click();wrong.drain();assert.equal(wrong.els.check.hidden,false);
for(const file of ['train-backdrop.png','brand-sign.png','carriages-tall-atlas.png','shapes-atlas.png','park-original.png','park-changed.png','candy-backdrop.png','candies-atlas.png','animals-atlas.png','houses-atlas.png'])assert.ok(fs.statSync('assets/fairytale/'+file).size>1000);
console.log(`PASS: 5 difficulties × 4 games; 8 slots; raster artwork; undo, correct/incorrect feedback, retry and explicit next; ${sceneCount} real scene pairs, 6 intrinsic changes each, valid bounds and cyclic next.`);
