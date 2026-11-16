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
'.bpop{position:fixed;right:62px;top:132px;z-index:1200;background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.3);padding:6px;display:none;min-width:200px;font:600 14px system-ui}',
'.bpop.on{display:block}.bpop button{display:block;width:100%;text-align:left;border:0;background:none;padding:10px 12px;border-radius:8px;font:600 14px system-ui;color:#1c1c1c}',
'.bpop button.on{background:#e8eefb;color:#1f3f8f}.bpop small{display:block;font-weight:500;color:#666;font-size:12px}',
'body.snapmode .leaflet-control-container,body.snapmode .tbx,body.snapmode .bpop,body.snapmode #bar,body.snapmode #loc{visibility:hidden!important}',
'.snapbar{position:fixed;left:50%;transform:translateX(-50%);top:12px;z-index:3000;background:#fff;border-radius:14px;box-shadow:0 3px 14px rgba(0,0,0,.35);padding:10px 12px;display:none;font:600 14px system-ui;color:#1c1c1c;max-width:94vw}',
'body.snapmode .snapbar{display:block}.snapbar .t{margin-bottom:8px;font-weight:500;color:#444}',
'.snapbar .b{display:flex;gap:6px;flex-wrap:wrap}.snapbar button{border:1px solid #1f5fbf;background:#fff;color:#1f5fbf;border-radius:10px;padding:9px 12px;font:600 14px system-ui}',
'.snapbar button.p{background:#1f5fbf;color:#fff}.snapbar .st{margin-top:6px;color:#666;font-size:12px;font-weight:500}',
'.yr{position:relative}.yr::before{content:"";position:absolute;left:-10px;right:-10px;top:-12px;bottom:-12px}'
].join('');
document.head.appendChild(css);
var bar=document.createElement('div');bar.className='obar';
bar.innerHTML='<div class="l l1"><button class="nm n1" title="Change map"></button><input type="range" class="s1" min="0" max="100"><button class="x x1" title="Turn off">×</button></div>'+
'<div class="l l2" style="display:none"><button class="nm n2" title="Change map"></button><input type="range" class="s2" min="0" max="100" value="60"><button class="x x2" title="Remove">×</button></div>'+
'<button class="add">+ Add a second map on top</button><div class="tip"></div><div class="pk"></div>';
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
 var pk=$q('.pk',bar);pk.innerHTML='<small>Maps marked ★ look best layered on top of another map.</small>'+keys.map(function(x){var g=GOOD.indexOf(x)>=0;return '<button data-k="'+x+'" class="'+(g?'g':'')+'">'+(g?'★ ':'')+NM[x]+'</button>'}).join('');}
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
var BASES=[
 {id:'leaf',n:'Photo – leaf-off',s:'2023–25, best for seeing houses',l:BB.hybrid},
 {id:'sum',n:'Photo – summer',s:'Recent summer aerial',l:BB.hybridS},
 {id:'street',n:'Street map',s:'OpenStreetMap',l:BB.street},
 {id:'topo',n:'Topographic',s:'Esri world topo',l:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{maxZoom:20,maxNativeZoom:19,attribution:'Esri'})},
 {id:'gray',n:'Light gray',s:'Plain background, best for old maps',l:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',{maxZoom:20,maxNativeZoom:16,attribution:'Esri'})},
 {id:'blank',n:'No background',s:'Old map only',l:L.layerGroup()}
];
function curBase(){for(var i=0;i<BASES.length;i++)if(BASES[i].l&&MP.hasLayer(BASES[i].l))return BASES[i].id;return ''}
function setBase(id){BASES.forEach(function(b){if(b.l&&MP.hasLayer(b.l))MP.removeLayer(b.l)});var b=BASES.filter(function(x){return x.id===id})[0];if(b&&b.l){b.l.addTo(MP);if(b.l.bringToBack)b.l.bringToBack()}try{localStorage.setItem('OIH_base',id)}catch(e){}drawB()}
var tbx=document.createElement('div');tbx.className='tbx';
tbx.innerHTML='<button class="tb-b" title="Background map" aria-label="Background map"><svg viewBox="0 0 24 24"><path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="m2 13 10 5 10-5"/><path d="m2 17.5 10 5 10-5"/></svg></button>'+
'<button class="tb-s" title="Take a picture of the map" aria-label="Take a picture of the map"><svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="4"/></svg></button>';
document.body.appendChild(tbx);function placeT(){var h=document.getElementById('bar');var t=h?Math.round(h.getBoundingClientRect().bottom)+10:132;tbx.style.top=t+'px';bp.style.top=t+'px'}window.addEventListener('resize',function(){setTimeout(placeT,50)});
var bp=document.createElement('div');bp.className='bpop';document.body.appendChild(bp);
function drawB(){var c=curBase();bp.innerHTML=BASES.map(function(b){return '<button data-b="'+b.id+'" class="'+(b.id===c?'on':'')+'">'+b.n+'<small>'+b.s+'</small></button>'}).join('')}
drawB();placeT();setTimeout(placeT,800);
$q('.tb-b',tbx).onclick=function(){drawB();bp.classList.toggle('on')};
bp.onclick=function(e){var b=e.target.closest('button[data-b]');if(b){setBase(b.dataset.b);bp.classList.remove('on')}};
MP.on('click',function(){bp.classList.remove('on')});
var lc=document.querySelector('.leaflet-control-layers');if(lc)lc.style.display='none';
try{var b0=localStorage.getItem('OIH_base');if(b0&&b0!==curBase())setBase(b0)}catch(e){}
var sb=document.createElement('div');sb.className='snapbar';
sb.innerHTML='<div class="t">Move the map to frame your picture, then choose:</div><div class="b"><button class="p" data-a="png">Save picture</button><button data-a="pdf">Save PDF</button><button data-a="share">Share</button><button data-a="x">Cancel</button></div><div class="st"></div>';
document.body.appendChild(sb);
function ld(src){return new Promise(function(res,rej){var s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s)})}
var LIBS=null;function libs(){if(!LIBS)LIBS=Promise.all([window.html2canvas?1:ld('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),window.jspdf?1:ld('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')]);return LIBS}
function stamp(){var c=MP.getCenter(),k=O.cur,t=[];if(k!=='none')t.push(NM[k]);if(k2!=='none')t.push(NM[k2]);return 'Old Iowa Houses Map · '+c.lat.toFixed(5)+', '+c.lng.toFixed(5)+(t.length?' · '+t.join(' + '):'')+' · '+new Date().toLocaleDateString()}
async function shot(){var st=$q('.st',sb);st.textContent='Making the picture…';await libs();
 var el=document.getElementById('map');
 var c=await window.html2canvas(el,{useCORS:true,backgroundColor:'#ffffff',logging:false,scale:Math.min(2,window.devicePixelRatio||1),ignoreElements:function(n){return n.classList&&(n.classList.contains('leaflet-control-container'))}});
 var pad=Math.round(c.width/40),fh=Math.round(c.width/45)+pad,o=document.createElement('canvas');o.width=c.width;o.height=c.height+fh;var x=o.getContext('2d');
 x.fillStyle='#fff';x.fillRect(0,0,o.width,o.height);x.drawImage(c,0,0);x.fillStyle='#333';x.font='600 '+Math.round(c.width/60)+'px system-ui';x.textBaseline='middle';x.fillText(stamp(),pad/2,c.height+fh/2);
 st.textContent='';return o}
function dl(blob,name){var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},2000)}
function fname(ext){var d=new Date();return 'old-iowa-map-'+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'.'+ext}
var SHF=null;sb.addEventListener('click',async function(e){var b=e.target.closest('button[data-a]');if(!b)return;var a=b.dataset.a,st=$q('.st',sb);
 if(a==='share2'){if(SHF)navigator.share({files:[SHF],title:'Old Iowa Houses Map'}).catch(function(){});return}
 if(a==='x'){document.body.classList.remove('snapmode');return}
 try{var c=await shot();
  if(a==='png'){c.toBlob(function(bl){dl(bl,fname('png'))},'image/png')}
  else if(a==='pdf'){var J=window.jspdf.jsPDF,land=c.width>c.height,doc=new J({orientation:land?'landscape':'portrait',unit:'pt',format:'letter'});var W=doc.internal.pageSize.getWidth()-48,H=doc.internal.pageSize.getHeight()-48,s=Math.min(W/c.width,H/c.height);doc.addImage(c.toDataURL('image/jpeg',0.92),'JPEG',24+(W-c.width*s)/2,24,c.width*s,c.height*s);doc.save(fname('pdf'))}
  else if(a==='share'){c.toBlob(function(bl){var f=new File([bl],fname('png'),{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]})){SHF=f;st.innerHTML='Picture ready. <button class="p" data-a="share2">Share now</button>'}else{dl(bl,fname('png'));st.textContent='Sharing isn’t supported here, so it was saved instead.'}},'image/png')}
 }catch(err){st.textContent='Could not make the picture: '+(err&&err.message||err)}});
$q('.tb-s',tbx).onclick=function(){bp.classList.remove('on');document.body.classList.add('snapmode');$q('.st',sb).textContent='';libs()};
})();