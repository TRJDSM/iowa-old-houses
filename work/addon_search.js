(function(){
var q=document.getElementById('q');if(!q||!window.HOUSES)return;
var HS=window.HOUSES;
/* ---------- text normalising (same rules as The Better Assessor) ---------- */
var AB={street:'st',str:'st',avenue:'ave',av:'ave',drive:'dr',court:'ct',place:'pl',road:'rd',lane:'ln',boulevard:'blvd',parkway:'pkwy',terrace:'ter',circle:'cir',highway:'hwy',north:'n',south:'s',east:'e',west:'w',northeast:'ne',northwest:'nw',southeast:'se',southwest:'sw',mount:'mt',saint:'st',
 first:'1st',second:'2nd',third:'3rd',fourth:'4th',fifth:'5th',sixth:'6th',seventh:'7th',eighth:'8th',ninth:'9th',tenth:'10th',eleventh:'11th',twelfth:'12th',thirteenth:'13th',fourteenth:'14th',fifteenth:'15th',sixteenth:'16th',seventeenth:'17th',eighteenth:'18th',nineteenth:'19th',twentieth:'20th',dsm:'des moines',wdm:'west des moines'};
function norm(s){return String(s||'').toLowerCase().replace(/[^a-z0-9 ]+/g,' ').replace(/\b[a-z]+\b/g,function(w){return AB[w]||w}).replace(/\s+/g,' ').trim()}
function onorm(s){return String(s||'').toLowerCase().replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim()}
function fh(s){s='oih1|'+s;var h=0x811c9dc5;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return (h>>>4).toString(36)}
function ownerHashes(o){var t=onorm(o).split(' ').filter(function(w){return w.length>=2});var s={};t.forEach(function(w){s[fh(w)]=1});return s}
/* per-row search text + owner hash set */
var OH=window.OWNH||null,VOC={};
HS.forEach(function(h,i){h._a=' '+norm(h[3]+' '+h[4]+' '+h[5]+' county')+' ';
 if(h[10])h._o=ownerHashes(h[10]);else if(OH&&OH[i]){var o={};String(OH[i]).split(' ').forEach(function(x){if(x)o[x]=1});h._o=o}else h._o=null;
 h._a.split(' ').forEach(function(w){if(w.length>3&&!/\d/.test(w))VOC[w]=(VOC[w]||0)+1})});
var STOP={'in':1,the:1,of:1,built:1,house:1,houses:1,home:1,homes:1,building:1,buildings:1,near:1,show:1,me:1,find:1,all:1,on:1,at:1,a:1,an:1,and:1,by:1,owned:1,owner:1,owners:1,property:1,properties:1,iowa:1,ia:1,'for':1,with:1,year:1,from:1};
var CACHE={k:null,p:null};
function parse(raw){var t=' '+String(raw).toLowerCase()+' ',P={w:[],neg:[],ph:[],ymin:0,ymax:0,yeq:[],own:false};
 t=t.replace(/"([^"]+)"/g,function(m,p){P.ph.push(norm(p));return ' '});
 if(/\b(owned by|owner|owners|owner:)\b/.test(t))P.own=true;
 t=t.replace(/\b(1[6-9]\d0)'?s\b/g,function(m,a){P.ymin=Math.max(P.ymin,+a);P.ymax=P.ymax?Math.min(P.ymax,+a+9):+a+9;return ' '});
 t=t.replace(/\b(1[6-9]\d\d)\s*(?:-|–|to|through|thru|and)\s*(1[6-9]\d\d)\b/g,function(m,a,b){P.ymin=+a;P.ymax=+b;return ' '});
 t=t.replace(/\b(?:before|pre|older than|earlier than|prior to)\s*-?\s*(1[6-9]\d\d)s?\b/g,function(m,a){P.ymax=+a-1;return ' '});
 t=t.replace(/\b(?:after|since|post|newer than|later than)\s*-?\s*(1[6-9]\d\d)s?\b/g,function(m,a){P.ymin=+a+1;return ' '});
 t=t.replace(/(?:^|\s)-(\S+)/g,function(m,w){w=norm(w);if(w)P.neg.push(w);return ' '});
 var TK=onorm(t).split(' ').filter(function(w){return w&&!STOP[w]});TK.forEach(function(w,ix){if(/^1[6-9]\d\d$/.test(w)&&(ix>0||TK.length===1)){P.yeq.push(+w);return}P.w.push({a:norm(w),o:w})});
 return P}
function wordHit(h,w){if(typeof w==='string')w={a:w,o:w};if(h._a.indexOf(' '+w.a+(/\d/.test(w.a)?' ':''))>=0)return 1;if(h._o&&h._o[fh(w.o)])return 2;return 0}
var STAT={own:0,addr:0};
function match(h,P){var y=h[2];if(P.ymin&&y<P.ymin)return false;if(P.ymax&&y>P.ymax)return false;if(P.yeq.length&&P.yeq.indexOf(y)<0)return false;
 for(var i=0;i<P.neg.length;i++)if(wordHit(h,P.neg[i]))return false;
 for(i=0;i<P.ph.length;i++)if(h._a.indexOf(' '+P.ph[i]+' ')<0)return false;
 var viaOwn=false;for(i=0;i<P.w.length;i++){var r=P.own?(h._o&&h._o[fh(P.w[i].o)]?2:0):wordHit(h,P.w[i]);if(!r)return false;if(r===2)viaOwn=true}
 if(viaOwn)STAT.own++;else STAT.addr++;return true}
function ed(a,b,k){if(Math.abs(a.length-b.length)>k)return k+1;var p=[],i,j;for(j=0;j<=b.length;j++)p.push(j);for(i=1;i<=a.length;i++){var c=[i],m=i;for(j=1;j<=b.length;j++){var v=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));c.push(v);if(v<m)m=v}if(m>k)return k+1;p=c}return p[b.length]}
function fix(P){var ch=false;var w=P.w.map(function(o){var x=o.a;if(x.length<4||/\d/.test(x)||VOC[x]||x.indexOf(' ')>=0)return o;var k=x.length>=8?2:1,best=null,bd=9,bc=0;for(var v in VOC){if(VOC[v]<3)continue;var d=ed(x,v,k);if(d<=k&&(d<bd||(d===bd&&VOC[v]>bc))){best=v;bd=d;bc=VOC[v]}}if(best){ch=true;return {a:best,o:best}}return o});return ch?w:null}
var NOTE='';
function getP(raw){if(CACHE.k===raw)return CACHE.p;var P=parse(raw);NOTE='';STAT={own:0,addr:0};
 var n=0;for(var i=0;i<HS.length&&!n;i++)if(match(HS[i],P))n++;
 if(!n&&P.w.length){var f=fix(P);if(f){var P2=JSON.parse(JSON.stringify(P));P2.w=f;for(i=0;i<HS.length;i++)if(match(HS[i],P2)){P=P2;NOTE=f.map(function(x){return x.a}).join(' ');break}}}
 var na=0,no=0;for(i=0;i<HS.length;i++)if(match(HS[i],P)){if(addrAll(HS[i],P))na++;else no++}P.na=na;P.no=no;
 P.mode=(P.ymin||P.ymax||P.yeq.length||P.neg.length||P.own)?'filter':na?'addr':no?'owner':'none';
 STAT={own:0,addr:0};CACHE={k:raw,p:P};return P}
function addrAll(h,P){for(var i=0;i<P.w.length;i++){var a=P.w[i].a;if(h._a.indexOf(' '+a+(/\d/.test(a)?' ':''))<0)return false}return true}
window.SQM=function(h,qv){var P=getP(q.value.trim());if(P.mode==='filter'||P.mode==='owner')return match(h,P);return true};
var HL=null;function hilite(v){var M=window.OV&&window.OV.M;if(!M)return;if(HL){M.removeLayer(HL);HL=null}if(!v)return;var P=getP(v);if(P.mode!=='addr')return;var pts=[];HS.forEach(function(h){if(match(h,P))pts.push([h[0],h[1]])});if(!pts.length)return;HL=L.layerGroup(pts.slice(0,400).map(function(p){return L.circleMarker(p,{radius:15,color:'#ff2d55',weight:3,fill:false,interactive:false})})).addTo(M);M.fitBounds(L.latLngBounds(pts),{padding:[60,60],maxZoom:18})}
var htm=null;
/* ---------- results panel (places, streets, owner note, 1901 text) ---------- */
var css=document.createElement('style');css.textContent=[
'#sqp{position:fixed;z-index:1900;background:#fff;border-radius:12px;box-shadow:0 4px 18px rgba(0,0,0,.28);max-height:60vh;overflow:auto;font:14px system-ui;color:#1c1c1c;display:none}',
'#sqp .h{padding:8px 12px 4px;color:#666;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.03em}',
'#sqp button.i{display:block;width:100%;text-align:left;border:0;background:none;padding:9px 12px;font:14px system-ui;color:#1c1c1c;cursor:pointer;line-height:1.3}',
'#sqp button.i:hover,#sqp button.i:focus{background:#eef3fc}#sqp small{display:block;color:#666;font-size:12px}',
'#sqp .note{padding:9px 12px;background:#fff8e1;border-bottom:1px solid #f0e2b0;font-size:13px}',
'#sqp .n1901{position:static!important;box-shadow:none!important;border-radius:0!important;width:auto!important;max-height:none!important;border-top:1px solid #eee}'
].join('');document.head.appendChild(css);
var pan=document.createElement('div');pan.id='sqp';document.body.appendChild(pan);
var top=document.createElement('div');pan.appendChild(top);
var mk=null;
function place(){var r=q.getBoundingClientRect();pan.style.left=r.left+'px';pan.style.top=(r.bottom+4)+'px';pan.style.width=Math.max(r.width,260)+'px'}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
/* adopt the existing "On the 1901 Sanborn map" box so the two lists don't overlap */
new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1&&n!==pan&&n.style&&/z-index:\s*2000/.test(n.getAttribute('style')||'')&&/max-height/.test(n.getAttribute('style')||'')){n.classList.add('n1901');pan.appendChild(n);var o=new MutationObserver(vis);o.observe(n,{attributes:true,attributeFilter:['style']});vis()}})})}).observe(document.body,{childList:true});
function vis(){var any=top.innerHTML.trim()!=='';var b=pan.querySelector('.n1901');if(b&&b.style.display!=='none'&&b.innerHTML.trim())any=true;pan.style.display=any&&document.activeElement===q?'block':(any&&pan.matches(':hover')?'block':(any&&pan._keep?'block':'none'));if(pan.style.display==='block')place()}
var STREETS=null;function streets(){if(STREETS)return STREETS;var m={};HS.forEach(function(h){var a=String(h[3]||'').replace(/^\d+\w?\s+/,'').trim();if(a.length>2&&!/^\d+$/.test(a)){var k=a.toUpperCase()+'|'+h[4];m[k]=(m[k]||0)+1}});STREETS=Object.keys(m).map(function(k){var p=k.split('|');return {n:p[0].toLowerCase().replace(/\b(n|s|e|w|ne|nw|se|sw)\b/g,function(x){return x.toUpperCase()}).replace(/\b([a-z])/g,function(c){return c.toUpperCase()}),t:p[1],c:m[k],k:norm(p[0])}});return STREETS}
var GEO='https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/',EXT='&searchExtent=-93.83,41.47,-93.33,41.87&location=-93.62,41.59';
var seq=0,PL=[];
function count(){var c=document.getElementById('cnt');return c?c.textContent:''}
function render(v,places){var h='';var P=getP(v);
 if(NOTE)h+='<div class="note">No exact match, showing <b>'+esc(NOTE)+'</b></div>';
 if(P.mode==='owner'||(P.own&&P.no)){var n=P.no;h+='<div class="note">Owner name match: <b>'+n+'</b> '+(n===1?'property':'properties')+' on the map. Names stay private, only the pins are shown.</div>'}
 if(places&&places.length){h+='<div class="h">Places today</div>'+places.map(function(p,i){var a=p.text.split(', ');return '<button class="i" data-p="'+i+'">'+esc(a[0])+'<small>'+esc(a.slice(1,3).join(', '))+'</small></button>'}).join('')}
 var nv=norm(v);if(nv.length>=2&&!/^\d+$/.test(nv)){var st=streets().filter(function(s){return s.k.indexOf(nv)===0||s.k.indexOf(' '+nv)>=0}).sort(function(a,b){return (b.k.indexOf(nv)===0)-(a.k.indexOf(nv)===0)||b.c-a.c}).slice(0,4);
  if(st.length&&!(st.length===1&&st[0].k===nv))h+='<div class="h">Streets with old buildings</div>'+st.map(function(s){return '<button class="i" data-s="'+esc(s.n)+'">'+esc(s.n)+'<small>'+esc(s.t)+' · '+s.c+' building'+(s.c>1?'s':'')+'</small></button>'}).join('')}
 top.innerHTML=h;vis()}
var tm=null;
function onInput(){var v=q.value.trim();clearTimeout(tm);clearTimeout(htm);if(!v)hilite('');else htm=setTimeout(function(){if(q.value.trim()===v)hilite(v)},900);if(v.length<2||/^(sheet|page|pg|p|s|#)\s*#?\s*\d{1,3}$/i.test(v)){top.innerHTML='';PL=[];vis();return}
 render(v,PL.length&&PL._v&&v.indexOf(PL._v)===0?PL:[]);
 tm=setTimeout(function(){var PP=getP(v);if(v.length<3||PP.ymin||PP.ymax||PP.yeq.length||PP.neg.length||PP.own){PL=[];render(v,[]);return}var my=++seq;
  fetch(GEO+'suggest?f=json&maxSuggestions=5'+EXT+'&text='+encodeURIComponent(v)).then(function(r){return r.json()}).then(function(j){if(my!==seq)return;PL=(j.suggestions||[]).filter(function(s){return /, IA\b|Iowa/.test(s.text)});PL._v=v;render(q.value.trim(),PL)}).catch(function(){})},350)}
q.addEventListener('input',onInput);q.addEventListener('focus',function(){if(q.value.trim().length>=2)onInput()});
q.addEventListener('blur',function(){setTimeout(vis,200)});
pan.addEventListener('mousedown',function(e){e.preventDefault()});
function goPlace(p){fetch(GEO+'findAddressCandidates?f=json&maxLocations=1&outFields=PlaceName,Type'+EXT+'&magicKey='+encodeURIComponent(p.magicKey)+'&SingleLine='+encodeURIComponent(p.text)).then(function(r){return r.json()}).then(function(j){var c=(j.candidates||[])[0];if(!c)return;var ll=[c.location.y,c.location.x];
 q.value='';q.dispatchEvent(new Event('input'));hilite('');top.innerHTML='';vis();q.blur();
 var M=window.OV&&window.OV.M;if(!M)return;var z=/park|cemetery|university|college|lake|golf/i.test(c.attributes.Type||'')?16:18;M.setView(ll,z);
 if(mk)M.removeLayer(mk);mk=L.marker(ll,{icon:L.divIcon({className:'',html:'<div style="transform:translate(-50%,-100%);background:#1f5fbf;color:#fff;font:600 13px system-ui;padding:5px 9px;border-radius:8px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.35)">'+esc(p.text.split(', ')[0])+'</div>',iconSize:[0,0]}),interactive:false,zIndexOffset:2000}).addTo(M);
 setTimeout(function(){M.once('movestart',function(){setTimeout(function(){if(mk){M.removeLayer(mk);mk=null}},15000)})},800)})}
pan.addEventListener('click',function(e){var b=e.target.closest('button.i');if(!b)return;
 if(b.dataset.p!=null){goPlace(PL[+b.dataset.p]);return}
 if(b.dataset.s){q.value=b.dataset.s;q.dispatchEvent(new Event('input'));q.blur();top.innerHTML='';vis()}});
q.addEventListener('keydown',function(e){if(e.key!=='Enter')return;var v=q.value.trim();if(/^(sheet|page|pg|p|s|#)\s*#?\s*\d{1,3}$/i.test(v))return;
 var P=getP(v),n=0;for(var i=0;i<HS.length&&!n;i++)if(match(HS[i],P))n++;
 if(!n&&PL.length){e.preventDefault();goPlace(PL[0])}else{clearTimeout(htm);hilite(v);top.innerHTML='';vis();q.blur()}});
window.addEventListener('resize',function(){if(pan.style.display==='block')place()});
})();