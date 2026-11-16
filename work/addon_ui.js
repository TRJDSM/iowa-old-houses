(function(){
var O=window.OV;if(!O||!O.M)return;var MP=O.M,BB=O.B||{};
var LY=O.LY,D=O.D;
function $q(s,r){return (r||document).querySelector(s)}
var NM={none:'Today'};D.querySelectorAll('.bt button').forEach(function(b){NM[b.dataset.k]=b.textContent.trim()});
var PRI={rail:6,glo:5,road:4,s1901:3,s1884:3,a1875:2};function pr(k){return PRI[k]||1}
var GOOD=['s1901','s1884','rail','glo','road','a1875'];
MP.createPane('old2');var P1=O.P,P2=MP.getPane('old2');
var z1=parseInt(getComputedStyle(P1).zIndex,10);if(!(z1>0))z1=400;
var k2='none',L2=null;
var css=document.createElement('style');
css.textContent=[
'.omc .omx{display:none!important}',
'.obar{display:none;background:#fff;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,.3);padding:8px 10px;width:calc(100vw - 96px);max-width:470px;font:600 14px system-ui;color:#1c1c1c}',
'.omc.act .obar{display:block}.omc.act .row{display:none}',
'.obar .l{display:flex;align-items:center;gap:8px;margin:2px 0}',
'.obar .nm{flex:0 0 auto;max-width:34%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border:1px solid #ccd;background:#f3f5f9;border-radius:8px;padding:8px 10px;font:600 14px system-ui;color:#1c1c1c}',
'.obar input[type=range]{flex:1 1 auto;min-width:60px;height:30px}',
'.obar .x{flex:0 0 auto;width:34px;height:34px;border-radius:17px;border:1px solid #ccd;background:#fff;font:700 18px system-ui;color:#555;line-height:30px;padding:0}',
'.obar .add{border:0;background:none;color:#1f5fbf;font:600 14px system-ui;padding:6px 2px}',
'.obar .pk{display:none;flex-wrap:wrap;gap:6px;margin-top:6px}.obar.pick .pk{display:flex}',
'.obar .pk button{border:1px solid #ccd;background:#f7f8fb;border-radius:8px;padding:7px 9px;font:600 13px system-ui;color:#1c1c1c}',
'.obar .pk button.g{border-color:#1f5fbf}.obar .pk small{display:block;width:100%;color:#666;font-weight:500}',
'.obar .tip{color:#666;font-weight:500;font-size:12px;margin-top:2px}',
'.tbx{position:fixed;right:10px;top:132px;z-index:1200;display:flex;flex-direction:column;gap:8px}',
'.tbx button{width:44px;height:44px;border-radius:22px;border:0;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer}',
'.tbx svg{width:22px;height:22px;stroke:#1c1c1c;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
'.bpop{position:fixed;right:62px;top:132px;z-index:1200;background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.3);padding:6px;display:none;min-width:210px;font:600 14px system-ui}',
'.bpop.on{display:block}.bpop button{display:block;width:100%;text-align:left;border:0;background:none;padding:10px 12px;border-radius:8px;font:600 14px system-ui;color:#1c1c1c}',
'.bpop button.on{background:#e8eefb;color:#1f3f8f}.bpop small{display:block;font-weight:500;color:#666;font-size:12px}',
'body.snapmode .leaflet-control-container,body.snapmode .tbx,body.snapmode .bpop,body.snapmode #bar,body.snapmode #loc,body.snapmode #sqp{visibility:hidden!important}',
'.snapbar{position:fixed;left:50%;transform:translateX(-50%);bottom:18px;z-index:3000;background:rgba(255,255,255,.96);border-radius:24px;box-shadow:0 3px 14px rgba(0,0,0,.35);padding:6px;display:none;align-items:center;gap:6px;font:600 14px system-ui;color:#1c1c1c;white-space:nowrap}',
'body.snapmode .snapbar{display:flex}body.selecting .snapbar,body.shotopen .snapbar{display:none}',
'.snapbar .t{padding:0 6px;color:#444;font-weight:500;font-size:13px}',
'.snapbar{max-width:calc(100vw - 24px);box-sizing:border-box}.snapbar button{padding:7px 12px!important;font-size:14px!important}@media (max-width:520px){.snapbar .t{display:none}.snapbar button{padding:6px 10px!important;font-size:13px!important}}',
'.snapbar button,.rbox button,.rbox a.btn{border:1px solid #1f5fbf;background:#fff;color:#1f5fbf;border-radius:18px;padding:8px 13px;font:600 14px system-ui;text-decoration:none;cursor:pointer;display:inline-block}',
'.snapbar button.p,.rbox .p{background:#1f5fbf;color:#fff}.snapbar button.x{border-color:#ccd;color:#555;padding:8px 11px}',
'.selov{position:fixed;inset:0;z-index:2600;cursor:crosshair;touch-action:none;display:none;background:rgba(0,0,0,.08)}body.selecting .selov{display:block}',
'.selbox{position:absolute;border:2px dashed #fff;box-shadow:0 0 0 9999px rgba(0,0,0,.35);display:none;pointer-events:none}',
'.selhint{position:absolute;top:14px;left:50%;transform:translateX(-50%);background:#1f5fbf;color:#fff;padding:8px 14px;border-radius:18px;font:600 14px system-ui;pointer-events:none;white-space:nowrap}',
'.selx{position:absolute;bottom:18px;left:50%;transform:translateX(-50%);border:0;background:#fff;color:#333;border-radius:18px;padding:9px 16px;font:600 14px system-ui;box-shadow:0 2px 8px rgba(0,0,0,.3)}',
'.rwrap{position:fixed;inset:0;z-index:3100;background:rgba(0,0,0,.55);display:none;align-items:center;justify-content:center;padding:12px}body.shotopen .rwrap{display:flex}',
'.rbox{background:#fff;border-radius:14px;max-width:min(720px,96vw);width:100%;max-height:94vh;overflow:auto;padding:12px;font:14px system-ui;color:#1c1c1c;box-sizing:border-box}',
'.rbox .rh{display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:16px;margin-bottom:8px}',
'.rbox .rimg{display:block;max-width:100%;max-height:52vh;margin:0 auto 8px;border:1px solid #ddd;border-radius:6px}',
'.rbox input{width:100%;box-sizing:border-box;font:16px system-ui;padding:9px 10px;border:1px solid #ccd;border-radius:8px;margin-bottom:8px}',
'.rbox .opts{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 10px;font-size:13px;color:#333}.rbox .opts label{display:flex;align-items:center;gap:5px}',
'.rbox .rb{display:flex;flex-wrap:wrap;gap:8px}.rbox .rtip{color:#666;font-size:12px;margin-top:8px}.rbox .busy{color:#666;padding:20px;text-align:center}',
'.yr{position:relative}.yr::before{content:"";position:absolute;left:-10px;right:-10px;top:-12px;bottom:-12px}',
'#bar{z-index:1300!important}body:has(#mnd.open) .tbx,body:has(#mnd.open) .bpop{visibility:hidden}',
'.leaflet-control-attribution{cursor:pointer;border-radius:8px;margin:0 8px 8px 0!important;max-width:calc(100vw - 20px);font-size:11px!important;line-height:1.35!important;padding:4px 8px!important;box-shadow:0 1px 4px rgba(0,0,0,.25)}',
'.leaflet-control-attribution.cmin{width:26px;height:26px;border-radius:13px;overflow:hidden;padding:0!important;font-size:0!important;background:rgba(255,255,255,.9)!important}',
'.leaflet-control-attribution.cmin::before{content:"\u00a9";font:600 15px system-ui;display:block;text-align:center;line-height:26px;color:#333}',
'.leaflet-bottom{margin-bottom:env(safe-area-inset-bottom,0px)}'
].join('');
document.head.appendChild(css);
/* ---------------- overlay bar + second layer ---------------- */
var bar=document.createElement('div');bar.className='obar';
bar.innerHTML='<div class="l l1"><button class="nm n1" title="Change map"></button><input type="range" class="s1" min="0" max="100"><button class="x x1" title="Turn off">×</button></div>'+
'<div class="l l2" style="display:none"><button class="nm n2" title="Change map"></button><input type="range" class="s2" min="0" max="100" value="60"><button class="x x2" title="Remove">×</button></div>'+
'<button class="add">+ Add another layer</button><div class="tip"></div><div class="pk"></div>';
D.appendChild(bar);
L.DomEvent.disableClickPropagation(bar);L.DomEvent.disableScrollPropagation(bar);
var s1=$q('.s1',bar),s2=$q('.s2',bar);
function order(){P2.style.zIndex=(pr(k2)>=pr(O.cur))?(z1+1):(z1-1)}
function removeSecond(){if(L2){MP.removeLayer(L2);L2.options.pane='old'}L2=null;k2='none';try{localStorage.removeItem('OIH_ov2')}catch(e){}}
function addSecond(k){if(!LY[k]||k===O.cur)return;removeSecond();L2=LY[k];L2.options.pane='old2';L2.addTo(MP);k2=k;
 var both=GOOD.indexOf(k)<0&&GOOD.indexOf(O.cur)<0;s2.value=both?50:70;P2.style.opacity=s2.value/100;order();try{localStorage.setItem('OIH_ov2',k)}catch(e){}sync()}
function sync(){var k=O.cur;if(k2!=='none'&&(k==='none'||k===k2))removeSecond();
 var act=k!=='none';D.classList.toggle('act',act);if(!act){bar.classList.remove('pick');return}
 $q('.n1',bar).textContent=NM[k]||k;s1.value=O.f.value;
 var has2=k2!=='none';$q('.l2',bar).style.display=has2?'flex':'none';$q('.add',bar).style.display=has2?'none':'block';
 if(has2){$q('.n2',bar).textContent=NM[k2]||k2;order()}
 var tip='';if(has2){var top=pr(k2)>=pr(k)?k2:k;tip=(NM[top]||top)+' is drawn on top. Slide either bar to fade it.';if(GOOD.indexOf(k)<0&&GOOD.indexOf(k2)<0)tip='Both are full photos/maps, so the top one covers the other. Use its slider to blend them.'}
 $q('.tip',bar).textContent=tip}
function picker(){var k=O.cur,keys=Object.keys(NM).filter(function(x){return x!=='none'&&x!==k&&LY[x]});
 keys.sort(function(a,b){return (GOOD.indexOf(b)>=0)-(GOOD.indexOf(a)>=0)});
 var pk=$q('.pk',bar);pk.innerHTML='<small>Layers marked ★ are line drawings that show well on top of another map.</small>'+keys.map(function(x){var g=GOOD.indexOf(x)>=0;return '<button data-k="'+x+'" class="'+(g?'g':'')+'">'+(g?'★ ':'')+NM[x]+'</button>'}).join('');}
bar.addEventListener('click',function(e){var t=e.target;
 if(t.closest('.n1')||t.closest('.n2')){bar.classList.remove('pick');D.classList.add('open');return}
 if(t.closest('.x1')){var b=D.querySelector('.bt button[data-k="none"]');if(b)b.click();return}
 if(t.closest('.x2')){removeSecond();sync();return}
 if(t.closest('.add')){picker();bar.classList.toggle('pick');return}
 var pb=t.closest('.pk button');if(pb){bar.classList.remove('pick');addSecond(pb.dataset.k)}});
s1.addEventListener('input',function(){O.f.value=s1.value;O.f.dispatchEvent(new Event('input'))});
s2.addEventListener('input',function(){P2.style.opacity=s2.value/100});
O.f.addEventListener('input',function(){s1.value=O.f.value});
function after(){setTimeout(function(){if(O.cur!=='none')D.classList.remove('open');sync()},0)}
D.querySelector('.bt').addEventListener('click',function(e){if(e.target.closest('button'))after()});
var oms=D.querySelector('.oms');if(oms)oms.addEventListener('change',after);
setTimeout(function(){sync();try{var k=localStorage.getItem('OIH_ov2');if(k&&O.cur!=='none')addSecond(k)}catch(e){}if(O.cur!=='none')D.classList.remove('open')},600);
/* ---------------- background maps ---------------- */
var BASES=[
 {id:'sum',n:'Photo – summer',s:'Sharpest photo, green trees (default)',l:BB.hybridS},
 {id:'leaf',n:'Photo – leaf-off',s:'Iowa 2023–25, no leaves, see under trees',l:BB.hybrid},
 {id:'new',n:'Photo – newest',s:'April 2026, blurrier and buildings lean',l:L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:20,maxNativeZoom:19,attribution:'Imagery © Esri, Vantor'})},
 {id:'street',n:'Street map',s:'OpenStreetMap',l:BB.street},
 {id:'topo',n:'Topographic',s:'Esri world topo',l:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{maxZoom:20,maxNativeZoom:19,attribution:'Esri'})},
 {id:'blank',n:'No background',s:'Old map only',l:L.layerGroup()}
];
function curBase(){for(var i=0;i<BASES.length;i++)if(BASES[i].l&&MP.hasLayer(BASES[i].l))return BASES[i].id;return ''}
function setBase(id){BASES.forEach(function(b){if(b.l&&MP.hasLayer(b.l))MP.removeLayer(b.l)});var b=BASES.filter(function(x){return x.id===id})[0];if(b&&b.l){b.l.addTo(MP);if(b.l.bringToBack)b.l.bringToBack()}try{localStorage.setItem('OIH_base2',id)}catch(e){}drawB()}
var tbx=document.createElement('div');tbx.className='tbx';
tbx.innerHTML='<button class="tb-b" title="Background map" aria-label="Background map"><svg viewBox="0 0 24 24"><path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="m2 13 10 5 10-5"/><path d="m2 17.5 10 5 10-5"/></svg></button>'+
'<button class="tb-s" title="Take a picture of the map" aria-label="Take a picture of the map"><svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="4"/></svg></button>';
document.body.appendChild(tbx);
var bp=document.createElement('div');bp.className='bpop';document.body.appendChild(bp);
function placeT(){var h=document.getElementById('bar');var t=h?Math.round(h.getBoundingClientRect().bottom)+10:132;tbx.style.top=t+'px';bp.style.top=t+'px'}window.addEventListener('resize',function(){setTimeout(placeT,50)});
function drawB(){var c=curBase();bp.innerHTML=BASES.map(function(b){return '<button data-b="'+b.id+'" class="'+(b.id===c?'on':'')+'">'+b.n+'<small>'+b.s+'</small></button>'}).join('')}
drawB();placeT();setTimeout(placeT,800);
$q('.tb-b',tbx).onclick=function(){drawB();bp.classList.toggle('on')};
bp.onclick=function(e){var b=e.target.closest('button[data-b]');if(b){setBase(b.dataset.b);bp.classList.remove('on')}};
MP.on('click',function(){bp.classList.remove('on')});
var lc=document.querySelector('.leaflet-control-layers');if(lc)lc.style.display='none';
try{var b0=localStorage.getItem('OIH_base2')||'sum';if(!BASES.some(function(b){return b.id===b0}))b0='sum';if(b0!==curBase())setBase(b0)}catch(e){}
/* ---------------- map picture: select area, preview, save / share ---------------- */
var sb=document.createElement('div');sb.className='snapbar';
sb.innerHTML='<span class="t">Move the map, then</span><button class="p" data-a="sel">Select area</button><button data-a="all">Whole screen</button><button class="x" data-a="x" aria-label="Cancel">✕</button>';
document.body.appendChild(sb);
var ov=document.createElement('div');ov.className='selov';ov.innerHTML='<div class="selhint">Drag a box around what you want</div><div class="selbox"></div><button class="selx">Cancel</button>';document.body.appendChild(ov);
var rw=document.createElement('div');rw.className='rwrap';rw.innerHTML='<div class="rbox"></div>';document.body.appendChild(rw);var rbox=$q('.rbox',rw);
function ld(src){return new Promise(function(res,rej){var s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s)})}
var LIBS=null;function libs(){if(!LIBS)LIBS=Promise.all([window.html2canvas?1:ld('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),window.jspdf?1:ld('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')]);return LIBS}
function layersTxt(){var t=[];if(O.cur!=='none')t.push(NM[O.cur]+' map');if(k2!=='none')t.push(NM[k2]);return t.join(' + ')}
function fname(ext){var d=new Date();return 'old-iowa-map-'+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'.'+ext}
function exitSnap(){document.body.classList.remove('snapmode','selecting','shotopen');MP.dragging.enable()}
var SHOT=null,URLS=[];
async function capture(r){document.body.classList.remove('selecting');document.body.classList.add('shotopen');rbox.innerHTML='<div class="busy">Making the picture…</div>';
 try{await libs();var el=document.getElementById('map'),mr=el.getBoundingClientRect();var sc=Math.min(2,window.devicePixelRatio||1);
  var c=await window.html2canvas(el,{useCORS:true,backgroundColor:'#ffffff',logging:false,scale:sc,ignoreElements:function(n){return n.classList&&n.classList.contains('leaflet-control-container')}});
  var x=0,y=0,w=mr.width,h=mr.height;if(r){x=Math.max(0,r.x-mr.left);y=Math.max(0,r.y-mr.top);w=Math.min(r.w,mr.width-x);h=Math.min(r.h,mr.height-y)}
  var cr=document.createElement('canvas');cr.width=Math.round(w*sc);cr.height=Math.round(h*sc);cr.getContext('2d').drawImage(c,Math.round(x*sc),Math.round(y*sc),cr.width,cr.height,0,0,cr.width,cr.height);
  var cx=x+w/2,cy=y+h/2,a=MP.containerPointToLatLng([cx,cy]),b=MP.containerPointToLatLng([cx+100,cy]);
  SHOT={img:cr,sc:sc,ftpx:MP.distance(a,b)/100*3.28084,ll:a,lay:layersTxt()};showResult()}
 catch(err){rbox.innerHTML='<div class="busy">Could not make the picture: '+String(err&&err.message||err)+'</div><div class="rb"><button data-a="close">Close</button></div>'}}
function niceFt(max){var c=[25,50,100,200,250,500,1000,2000,2640,5280];var v=c[0];c.forEach(function(x){if(x<=max)v=x});return v}
function compose(title,opt){var im=SHOT.img,W=Math.max(im.width,900),k=W/im.width,IH=Math.round(im.height*k);var u=W/900;
 var th=title?Math.round(46*u):0,fh=Math.round(54*u);var c=document.createElement('canvas');c.width=W;c.height=th+IH+fh;var x=c.getContext('2d');
 x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);
 if(title){x.fillStyle='#111';x.font='700 '+Math.round(24*u)+'px system-ui, sans-serif';x.textBaseline='middle';x.fillText(title,Math.round(14*u),th/2)}
 x.drawImage(im,0,th,W,IH);
 if(opt.north){var nx=W-Math.round(34*u),ny=th+Math.round(40*u),r=Math.round(16*u);x.fillStyle='rgba(255,255,255,.88)';x.beginPath();x.arc(nx,ny,r+Math.round(8*u),0,7);x.fill();x.fillStyle='#111';x.beginPath();x.moveTo(nx,ny-r);x.lineTo(nx+r*0.55,ny+r*0.7);x.lineTo(nx,ny+r*0.35);x.lineTo(nx-r*0.55,ny+r*0.7);x.closePath();x.fill();x.font='700 '+Math.round(12*u)+'px system-ui';x.textAlign='center';x.fillText('N',nx,ny-r-Math.round(4*u));x.textAlign='left'}
 var fy=th+IH;x.fillStyle='#f4f4f4';x.fillRect(0,fy,W,fh);x.fillStyle='#333';x.textBaseline='middle';
 var ftPerPx=SHOT.ftpx/SHOT.sc/k;
 if(opt.scale){var maxFt=ftPerPx*W*0.28,ft=niceFt(maxFt),len=ft/ftPerPx,sx=W-Math.round(16*u)-len,sy=fy+fh*0.42;x.fillStyle='#111';x.fillRect(sx,sy,len,Math.max(3,Math.round(4*u)));x.fillRect(sx,sy-Math.round(6*u),Math.max(2,Math.round(2*u)),Math.round(14*u));x.fillRect(sx+len-Math.max(2,Math.round(2*u)),sy-Math.round(6*u),Math.max(2,Math.round(2*u)),Math.round(14*u));x.font='600 '+Math.round(13*u)+'px system-ui';x.textAlign='center';x.fillText(ft===5280?'1 mile':ft===2640?'½ mile':ft+' ft',sx+len/2,sy+Math.round(16*u));x.textAlign='left'}
 x.fillStyle='#333';x.font='600 '+Math.round(13*u)+'px system-ui';x.fillText('Old Iowa Houses Map'+(SHOT.lay?' · '+SHOT.lay:''),Math.round(12*u),fy+fh*0.33);
 x.font='400 '+Math.round(11*u)+'px system-ui';x.fillStyle='#555';x.fillText(SHOT.ll.lat.toFixed(5)+', '+SHOT.ll.lng.toFixed(5)+' · '+new Date().toLocaleDateString()+' · Sanborn maps: Library of Congress',Math.round(12*u),fy+fh*0.7);
 return c}
function showResult(){rbox.innerHTML='<div class="rh"><span>Your picture</span><button data-a="close" aria-label="Close">✕</button></div><img class="rimg" alt="Map picture"><input class="rt" type="text" placeholder="Add a title (optional)" maxlength="80"><div class="opts"><label><input type="checkbox" class="o-sc" checked style="width:auto;margin:0">Scale bar</label><label><input type="checkbox" class="o-n" checked style="width:auto;margin:0">North arrow</label></div><div class="rb"><button class="p sh" data-a="share">Share</button><a class="btn png" download>Save picture</a><a class="btn pdf" download>Save PDF</a><button data-a="again">Retake</button></div><div class="rtip"></div>';
 if(!(navigator.canShare&&navigator.share))$q('.sh',rbox).style.display='none';
 $q('.rtip',rbox).textContent=/iPhone|iPad/.test(navigator.userAgent)?'Save picture opens your phone menu: tap Save Image to put it in Photos. Save PDF: tap Save to Files, or Print.':'Save PDF makes a letter-size page you can print.';
 var t=null;$q('.rt',rbox).addEventListener('input',function(){clearTimeout(t);t=setTimeout(build,350)});
 $q('.o-sc',rbox).onchange=build;$q('.o-n',rbox).onchange=build;build()}
var SHF=null,SHP=null,IOS=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
function build(){URLS.forEach(function(u){URL.revokeObjectURL(u)});URLS=[];var title=($q('.rt',rbox)||{}).value||'';title=title.trim();
 var c=compose(title,{scale:$q('.o-sc',rbox).checked,north:$q('.o-n',rbox).checked});
 c.toBlob(function(bl){var u=URL.createObjectURL(bl);URLS.push(u);$q('.rimg',rbox).src=u;var a=$q('.png',rbox);a.href=u;a.download=fname('png');SHF=new File([bl],fname('png'),{type:'image/png'})},'image/png');
 try{var J=window.jspdf.jsPDF,land=c.width>c.height,doc=new J({orientation:land?'landscape':'portrait',unit:'pt',format:'letter'});var PW=doc.internal.pageSize.getWidth(),PH=doc.internal.pageSize.getHeight(),m=30,s=Math.min((PW-2*m)/c.width,(PH-2*m)/c.height);
  doc.addImage(c.toDataURL('image/jpeg',0.92),'JPEG',(PW-c.width*s)/2,m,c.width*s,c.height*s);var pb=doc.output('blob'),pu=URL.createObjectURL(pb);SHP=new File([pb],fname('pdf'),{type:'application/pdf'});URLS.push(pu);var ap=$q('.pdf',rbox);ap.href=pu;ap.download=fname('pdf')}catch(e){$q('.pdf',rbox).style.display='none'}}
rbox.addEventListener('click',function(e){var ln=e.target.closest('a.png,a.pdf');if(ln&&IOS&&navigator.share){var f=ln.classList.contains('pdf')?SHP:SHF;if(f&&(!navigator.canShare||navigator.canShare({files:[f]}))){e.preventDefault();navigator.share({files:[f]}).catch(function(){});return}}var b=e.target.closest('[data-a]');if(!b)return;var a=b.dataset.a;
 if(a==='close'){exitSnap();return}
 if(a==='again'){document.body.classList.remove('shotopen');return}
 if(a==='share'&&SHF){navigator.share({files:[SHF],title:'Old Iowa Houses Map'}).catch(function(){})}});
sb.addEventListener('click',function(e){var b=e.target.closest('button[data-a]');if(!b)return;var a=b.dataset.a;
 if(a==='x'){exitSnap();return}
 if(a==='all'){capture(null);return}
 if(a==='sel'){document.body.classList.add('selecting');MP.dragging.disable();box.style.display='none'}});
var box=$q('.selbox',ov),S0=null;
$q('.selx',ov).addEventListener('click',function(e){e.stopPropagation();document.body.classList.remove('selecting');MP.dragging.enable()});
ov.addEventListener('pointerdown',function(e){if(e.target.closest('.selx'))return;S0={x:e.clientX,y:e.clientY};box.style.display='block';box.style.left=S0.x+'px';box.style.top=S0.y+'px';box.style.width='0px';box.style.height='0px';try{ov.setPointerCapture(e.pointerId)}catch(x){}e.preventDefault()});
ov.addEventListener('pointermove',function(e){if(!S0)return;var x=Math.min(S0.x,e.clientX),y=Math.min(S0.y,e.clientY);box.style.left=x+'px';box.style.top=y+'px';box.style.width=Math.abs(e.clientX-S0.x)+'px';box.style.height=Math.abs(e.clientY-S0.y)+'px'});
ov.addEventListener('pointerup',function(e){if(!S0)return;var r={x:Math.min(S0.x,e.clientX),y:Math.min(S0.y,e.clientY),w:Math.abs(e.clientX-S0.x),h:Math.abs(e.clientY-S0.y)};S0=null;box.style.display='none';
 if(r.w<30||r.h<30)return;MP.dragging.enable();capture(r)});
(function(){var at=document.querySelector('.leaflet-control-attribution');if(!at)return;var lb=document.querySelector('.leaflet-bottom.leaflet-left');at.classList.add('cmin');function fit(){if(!lb)return;lb.style.marginBottom='';if(at.classList.contains('cmin'))return;var r=at.getBoundingClientRect(),l=lb.getBoundingClientRect();if(r.left<l.right+4)lb.style.marginBottom=(r.height+12)+'px'}at.addEventListener('click',function(e){if(e.target.closest('a'))return;at.classList.toggle('cmin');fit()});window.addEventListener('resize',fit)})();
$q('.tb-s',tbx).onclick=function(){bp.classList.remove('on');document.body.classList.add('snapmode');libs()};
})();