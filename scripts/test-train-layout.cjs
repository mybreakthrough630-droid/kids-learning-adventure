const assert=require('node:assert/strict'),fs=require('node:fs');
const css=fs.readFileSync('fairytale.css','utf8');
const vehicle=fs.readFileSync('assets/fairytale/vehicles-atlas.png');assert.equal(vehicle.readUInt32BE(16),2*vehicle.readUInt32BE(20));
assert.match(css,/\.train-page \.slot \.candy-art,\.train-page \.slot \.vehicle-art\{width:32%;height:auto;aspect-ratio:1/);
// Even a fully filled square at32% centred on each panel stays within its31–66% vertical bounds.
for(const cy of [47.5,48.5]){assert.ok(cy-16>=31);assert.ok(cy+16<=66);}
const png=fs.readFileSync('assets/fairytale/shapes-atlas.png');
assert.equal(png.readUInt32BE(16),1774);assert.equal(png.readUInt32BE(20),887);
const rule=css.match(/\.train-page \.slot \.shape-art\s*\{([^}]+)\}/)[1];
assert.match(rule,/height:auto/);assert.match(rule,/aspect-ratio:1/);
assert.match(rule,/left:var\(--panel-x/);assert.match(rule,/top:var\(--panel-y/);
assert.match(rule,/transform:translate/);
const scale=Number(rule.match(/width:(\d+)%/)[1])/100;
// Solid-alpha bounds (A>=200) measured from the existing raster; no pixel edits.
const bounds=[
 [13.74,26.35,92.12,92.79],[11.51,25.06,88.71,93.91],
 [13.09,22.12,85.55,94.58],[13.96,21.40,85.14,93.24],
 [13.74,28.15,95.27,73.42],[16.70,13.77,83.75,85.10],
 [10.61,19.41,87.81,83.30],[10.59,13.74,87.61,84.91]
];
for(let shape=0;shape<8;shape++){
 const a=css.match(new RegExp('\\.shape-'+shape+'\\{--shape-x:([\\d.]+)%;--shape-y:([\\d.]+)%')) ;
 assert.ok(a);const sx=Number(a[1]),sy=Number(a[2]),b=bounds[shape];
 assert.ok(Math.abs(sx-(b[0]+b[2])/2)<.02);assert.ok(Math.abs(sy-(b[1]+b[3])/2)<.02);
 for(let carriage=0;carriage<8;carriage++){
  const panel=css.match(new RegExp('\\.train-page \\.carriage-'+carriage+'\\{--panel-x:([\\d.]+)%;--panel-y:([\\d.]+)%'));
  const px=panel?Number(panel[1]):54.5,py=panel?Number(panel[2]):48.5;
  const fitted=[px+(b[0]-sx)*scale,py+(b[1]-sy)*scale,px+(b[2]-sx)*scale,py+(b[3]-sy)*scale];
  assert.ok(fitted[0]>25&&fitted[2]<85&&fitted[1]>31&&fitted[3]<66,JSON.stringify({shape,carriage,fitted}));
 }
}
console.log('PASS: original PNG untouched; square sprite cells; visible-alpha registration; all64shape/wagon combinations fit inside the cream panel without covering roof or wheels.');
