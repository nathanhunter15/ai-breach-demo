import{Q as je,U as Ge,e as H,L as He,aA as Xe,bM as ue,bN as te,bO as Ve,bP as se,P as We,A as Me,aF as Ye,ai as Ke}from"./Title-CQolkTDY.js";const Q={level:0,low:0,mid:0,high:0,hit:0,swell:0,raw:0},Ze=["level","low","mid","high","hit","swell"],Je={level:"how loud, right now, in its own recent range",hit:"an onset. Jumps on the transient and decays",swell:"how loud this PASSAGE is. Too slow to see a kick — use it for the slow half of a look"},oe=1024,Qe=[[20,180],[180,2e3],[2e3,12e3]],et=.87,P=.015,tt=.86,st=.02,ot=.02,rt=4.5,at=.985,nt=.99;function it(e,t){return t>=.999?e:t<=.001?Q:{level:e.level*t,low:e.low*t,mid:e.mid*t,high:e.high*t,hit:e.hit*t,swell:e.swell*t,raw:e.raw*t}}function lt(e,t,o,s){return e+(t-e)*(1-Math.pow(.001,s/o))}function X(e,t,o,s){if(t>=e||o<=0)return t;const r=Math.pow(.001,s/o);return t+(e-t)*r}function B(e,t,o){return Math.max(0,Math.min(1,(e-t)/Math.max(o-t,st)))}function V(e,t,o){return Math.max(P,t>e?t:e*Math.pow(et,o))}function W(e,t,o){return t<e?t:t+(e-t)*Math.pow(tt,o)}class Fr{ctx;chans=new Map;constructor(t){this.ctx=t}get names(){return[...this.chans.keys()]}tap(t,o){if(this.chans.has(t))return;const s=this.ctx.createAnalyser();s.fftSize=oe,s.smoothingTimeConstant=0,o.connect(s);const r=this.ctx.sampleRate/2,n=oe/2,c=Qe.map(([u,b])=>{const w=Math.max(1,Math.floor(u/r*n)),m=Math.min(n-1,Math.ceil(b/r*n));return[w,Math.max(w+1,m)]});this.chans.set(t,{analyser:s,freq:new Uint8Array(n),time:new Uint8Array(oe),bins:c,last:new Float32Array(n),ceil:{level:P,low:P,mid:P,high:P,flux:.02},base:{level:0,low:0,mid:0,high:0},smoothed:{level:0,low:0,mid:0,high:0},hit:0,swell:{now:0,ceil:P,floor:0,out:0},trim:1,reading:Q})}has(t){return this.chans.has(t)}read(t){return this.chans.get(t)?.reading??Q}trim(t,o){const s=this.chans.get(t);s!==void 0&&(s.trim=Math.max(0,o))}all(){const t=new Map;for(const[o,s]of this.chans)t.set(o,it(s.reading,s.trim));return t}update(t){const o=Math.min(Math.max(t,.004166666666666667),.1);for(const s of this.chans.values())this.one(s,o)}one(t,o){const{analyser:s,freq:r,time:n,bins:c,last:u}=t;s.getByteFrequencyData(r),s.getByteTimeDomainData(n);let b=0;for(let T=0;T<n.length;T++){const y=((n[T]??128)-128)/128;b+=y*y}const w=Math.sqrt(b/n.length),m=T=>{if(T===void 0)return 0;const[y,k]=T;let I=0;for(let S=y;S<k;S++)I+=r[S]??0;return I/((k-y)*255)},i=m(c[0]),l=m(c[1]),d=m(c[2]);let v=0;for(let T=1;T<r.length;T++){const y=(r[T]??0)/255,k=y-(u[T]??0);k>0&&(v+=k),u[T]=y}v/=r.length;const g=t.ceil,p=t.base;g.level=V(g.level,w,o),g.low=V(g.low,i,o),g.mid=V(g.mid,l,o),g.high=V(g.high,d,o),g.flux=Math.max(.004,v>g.flux?v:g.flux*Math.pow(.9,o)),p.level=W(p.level,w,o),p.low=W(p.low,i,o),p.mid=W(p.mid,l,o),p.high=W(p.high,d,o);const h=t.smoothed;h.level=X(h.level,B(w,p.level,g.level),.16,o),h.low=X(h.low,B(i,p.low,g.low),.1,o),h.mid=X(h.mid,B(l,p.mid,g.mid),.12,o),h.high=X(h.high,B(d,p.high,g.high),.08,o);const _=Math.min(1,Math.max(0,(v/g.flux-.55)/.45)),A=t.hit*Math.pow(ot,o);t.hit=Math.max(A,_);const x=t.swell;x.now=lt(x.now,w,rt,o),x.ceil=Math.max(P,x.now>x.ceil?x.now:x.ceil*Math.pow(at,o)),x.floor=x.now<x.floor?x.now:x.floor+(x.now-x.floor)*(1-Math.pow(nt,o)),x.out=B(x.now,x.floor,x.ceil),t.reading={level:h.level,low:h.low,mid:h.mid,high:h.high,hit:t.hit,swell:x.out,raw:w}}dispose(){for(const t of this.chans.values())t.analyser.disconnect();this.chans.clear()}}const R=(e,t,o,s,r,n,c=.001,u)=>({key:e,label:t,channel:o,min:s,max:r,def:n,step:c,hint:u}),fe=[R("x","across","translate",-80,80,0,.1),R("y","up","translate",-80,80,0,.1),R("turn","turn","rotate",-.25,.25,0),R("scale","size","scale",.7,1.3,1),R("blur","blur","filter",0,14,0,.05),R("bright","brightness","filter",.4,1.8,1),R("sat","saturation","filter",0,2.5,1),R("hue","hue turn","filter",-.5,.5,0),R("contrast","contrast","filter",.4,1.8,1),R("glow","glow","filter",0,30,0,.1,"a drop shadow with no offset, so it reads as light"),R("fade","fade","opacity",0,1,1)],ge=new Map(fe.map(e=>[e.key,e])),ct=[{id:"board",name:"the whole board",selector:".stage > *",blurb:"Every layer at once. Start here, then take pieces out of it.",filterSafe:!0},{id:"farm",name:"the farm",selector:".backdrop",blurb:"The backdrop and everything cut off it — props, leaves, birds.",filterSafe:!0},{id:"props",name:"the furniture",selector:".bd-prop",blurb:"The glasshouse, the lamp, the plants, the fence.",filterSafe:!0},{id:"leaves",name:"the loose leaves",selector:".bd-leaf",blurb:"Eighteen of them, already scooting on their own timers.",filterSafe:!0},{id:"puppets",name:"the puppets",selector:".rig",blurb:"You and whatever is standing opposite you.",filterSafe:!0},{id:"hand",name:"your hand",selector:".hand",blurb:"The row of cards, as one thing.",filterSafe:!0},{id:"cards",name:"the cards",selector:".card",blurb:"Each card on its own. No filter — they carry their own shadows.",filterSafe:!1},{id:"piles",name:"the piles",selector:".pile",blurb:"Draw and discard.",filterSafe:!0},{id:"chips",name:"the chips",selector:".chip-holder",blurb:"The counters along the top.",filterSafe:!0},{id:"intent",name:"what it intends",selector:".intent-strip",blurb:"The strip that says what is coming next turn.",filterSafe:!0},{id:"plates",name:"the name plates",selector:".plate",blurb:"The labels under each puppet.",filterSafe:!0},{id:"ender",name:"end turn",selector:".ender",blurb:"The button. Bind a glow to the beat and it asks to be pressed.",filterSafe:!0},{id:"ticker",name:"the ticker",selector:".ticker",blurb:"The line of running commentary.",filterSafe:!0}];function Ie(e){return ct.find(t=>t.id===e)}let we=0;function Pr(e){return we+=1,{id:`d${we.toString(36)}`,target:e,on:!0,moves:{}}}const ut=400,re=["translate","rotate","scale","filter","opacity"],ae={translate:"translate",rotate:"rotate",scale:"scale",filter:"filter",opacity:"opacity"};class Ur{root;held=new Map;touched=new Set;now=0;constructor(t){this.root=t}apply(t,o,s){this.now=s;const r=new Set;for(const n of t.dress??[]){if(!n.on)continue;const c=Ie(n.target);if(c===void 0)continue;r.add(n.id);const u=this.hold(n.id,c.selector);if(u.els.length===0)continue;const b=i=>{const l=ge.get(i);return l===void 0?0:o.resolve(`${n.id}/${i}`,n.moves[i],l.def)},w=i=>{const l=ge.get(i);return l!==void 0&&Math.abs(b(i)-l.def)>1e-4},m=new Map;for(const i of re){const d=fe.filter(v=>v.channel===i).map(v=>v.key).some(w)&&(i!=="filter"||c.filterSafe);m.set(i,d?this.build(i,b):null)}for(const[i,l]of m)if(u.wrote.get(i)!==(l??"")){u.wrote.set(i,l??"");for(const d of u.els)d.style.setProperty(ae[i],l??""),l!==null&&this.touched.add(d)}}for(const[n,c]of this.held)r.has(n)||(this.strip(c),this.held.delete(n))}build(t,o){switch(t){case"translate":return`${o("x").toFixed(2)}px ${o("y").toFixed(2)}px`;case"rotate":return`${(o("turn")*360).toFixed(3)}deg`;case"scale":return o("scale").toFixed(4);case"opacity":return o("fade").toFixed(3);case"filter":{const s=[],r=o("blur");r>.01&&s.push(`blur(${r.toFixed(2)}px)`);const n=o("bright");Math.abs(n-1)>1e-4&&s.push(`brightness(${n.toFixed(3)})`);const c=o("sat");Math.abs(c-1)>1e-4&&s.push(`saturate(${c.toFixed(3)})`);const u=o("hue");Math.abs(u)>1e-4&&s.push(`hue-rotate(${(u*360).toFixed(2)}deg)`);const b=o("contrast");Math.abs(b-1)>1e-4&&s.push(`contrast(${b.toFixed(3)})`);const w=o("glow");return w>.01&&s.push(`drop-shadow(0 0 ${w.toFixed(2)}px currentColor)`),s.join(" ")}default:return""}}hold(t,o){let s=this.held.get(t);if(s===void 0&&(s={els:[],at:-1e9,wrote:new Map},this.held.set(t,s)),this.now-s.at>ut||s.els.length===0){s.at=this.now;const r=[...this.root.querySelectorAll(o)].filter(n=>n instanceof HTMLElement);(r.length!==s.els.length||r.some((n,c)=>n!==s.els[c]))&&(this.strip(s),s.els=r,s.wrote.clear())}return s}strip(t){for(const o of t.els){for(const s of re)o.style.setProperty(ae[s],"");this.touched.delete(o)}t.wrote.clear()}clear(){for(const t of this.held.values())this.strip(t);for(const t of this.touched)for(const o of re)t.style.setProperty(ae[o],"");this.touched.clear(),this.held.clear()}}const a=(e,t,o,s,r,n=.001,c={})=>({key:e,label:t,min:o,max:s,def:r,step:n,...c}),f=(e,t,o,s,r,n=.001,c={})=>({key:e,label:t,min:o,max:s,def:r,step:n,...c,scales:!0}),ht={id:"wobble",label:"RGB wobble",group:"colour",blurb:"The three channels pull apart along a line that turns. The house preset.",needsImage:!0,params:[f("amount","split",0,.03,.0025),a("angle","angle",0,1,0),a("spin","spin",-.5,.5,.03),a("sep","green centred",0,1,1,1,{options:["no","yes"],hint:"off pushes green the other way, which reads dirtier"})],glsl:`
vec4 fx(vec2 uv) {
  float a = (p_angle + u_bars * p_spin) * TAU;
  vec2 d = vec2(cos(a), sin(a)) * p_amount / ASP;
  vec4 c = src(uv);
  float r = src(uv + d).r;
  float b = src(uv - d).b;
  float g = p_sep > 0.5 ? c.g : src(uv + d.yx * 0.6).g;
  return vec4(r, g, b, c.a);
}`},ft={id:"ripple",label:"ripple",group:"move",blurb:"Rings running out from a point, like something was dropped in it.",needsImage:!0,params:[f("amount","depth",0,.06,.004),a("freq","rings",1,60,14,.1),a("speed","speed",-4,4,1),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP;
  float r = length(d);
  float w = sin(r * p_freq - u_bars * p_speed * TAU * 0.5);
  vec2 off = normalize(d + 1e-6) * w * p_amount;
  return src(uv + off / ASP);
}`},pt={id:"flow",label:"flow",group:"move",blurb:"Soft noise pushes the picture around. Heat off a road; paper breathing.",needsImage:!0,params:[f("amount","depth",0,.08,.006),a("scale","grain",.5,12,2.4,.01),a("speed","speed",0,2,.14),a("warp","churn",0,1,.35)],glsl:`
vec4 fx(vec2 uv) {
  vec2 q = uv * ASP * p_scale;
  float t = u_bars * p_speed;
  vec2 w = vec2(fbm(q + vec2(t, 0.0)), fbm(q + vec2(0.0, t) + 31.7));
  vec2 n = vec2(fbm(q + w * p_warp * 2.0 + 5.2), fbm(q - w * p_warp * 2.0 + 17.3));
  return src(uv + (n - 0.5) * p_amount);
}`},dt={id:"breathe",label:"breathe",group:"move",blurb:"Scale about a point. Bind it to the kick and the room has a pulse.",needsImage:!0,params:[f("amount","zoom",-.2,.2,.008),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5),f("roll","roll",-.2,.2,0)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP;
  d = rot(p_roll * TAU) * d;
  d /= (1.0 + p_amount);
  return src(c + d / ASP);
}`},mt={id:"sway",label:"sway",group:"move",blurb:"Two slow sines, out of phase, so the drift never repeats on itself.",needsImage:!0,params:[f("x","across",0,.06,.006),f("y","up",0,.06,.003),a("rate","rate",0,1,.08),a("lag","lag",0,1,.25,.01,{hint:"how far behind the vertical runs"})],glsl:`
vec4 fx(vec2 uv) {
  float t = u_bars * p_rate * TAU;
  vec2 off = vec2(sin(t) * p_x, sin(t * 0.73 + p_lag * TAU) * p_y);
  return src(uv + off);
}`},bt={id:"slice",label:"slice",group:"move",blurb:"Horizontal bands jump sideways. Tape, not glitch — keep it under a hair.",needsImage:!0,params:[f("amount","throw",0,.12,.01),a("rows","bands",2,120,26,1),a("speed","reshuffle",0,20,6,.1),f("chance","how many",0,1,.25)],glsl:`
vec4 fx(vec2 uv) {
  float row = floor(uv.y * p_rows);
  float t = floor(u_bars * p_speed);
  float r = hash21(vec2(row, t));
  float hit = step(1.0 - p_chance, r);
  float dir = hash21(vec2(row + 9.1, t)) * 2.0 - 1.0;
  return src(uv + vec2(dir * p_amount * hit, 0.0));
}`},vt={id:"bleed",label:"bleed",group:"move",blurb:"Smear out from a point. A zoom blur that reads as speed or as glare.",needsImage:!0,params:[f("amount","reach",0,.2,.02),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5),a("bias","bias to light",0,1,.4)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec4 sum = vec4(0.0);
  float wsum = 0.0;
  for (int i = 0; i < 10; i++) {
    float f = float(i) / 9.0;
    vec2 s = mix(uv, c, f * p_amount * 5.0);
    vec4 t = src(s);
    float w = mix(1.0, lum(t.rgb) + 0.05, p_bias) * (1.0 - f * 0.5);
    sum += t * w;
    wsum += w;
  }
  return sum / max(wsum, 1e-4);
}`},gt={id:"mirror",label:"mirror",group:"mirror",blurb:"Fold one half onto the other. The split moves, which is the whole trick.",needsImage:!0,params:[a("axis","axis",0,2,0,1,{options:["left↔right","top↕bottom","both"]}),a("split","split",0,1,.5),a("flip","keep",0,1,0,1,{options:["near side","far side"]}),a("mix2","fold, or blend",0,1,1,.001,{hint:"1 folds hard, below that ghosts the two halves together"})],glsl:`
vec4 fx(vec2 uv) {
  vec2 m = uv;
  float s = p_split;
  bool far = p_flip > 0.5;
  if (p_axis < 1.5) {
    float v = p_axis < 0.5 ? uv.x : uv.y;
    bool beyond = far ? v < s : v > s;
    float f = beyond ? 2.0 * s - v : v;
    if (p_axis < 0.5) m.x = f; else m.y = f;
  } else {
    m.x = (far ? uv.x < s : uv.x > s) ? 2.0 * s - uv.x : uv.x;
    m.y = (far ? uv.y < s : uv.y > s) ? 2.0 * s - uv.y : uv.y;
  }
  return mix(src(uv), src(m), p_mix2);
}`},wt={id:"kaleido",label:"kaleidoscope",group:"mirror",blurb:"N-fold about a point. Two slices is a mirror; twelve is a rose window.",needsImage:!0,params:[a("slices","slices",2,24,6,1),a("spin","spin",-.5,.5,.01),a("zoom","zoom",.2,3,1,.01),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP / p_zoom;
  float r = length(d);
  float a = atan(d.y, d.x) + u_bars * p_spin * TAU;
  float seg = TAU / max(p_slices, 1.0);
  a = mod(a, seg);
  a = abs(a - seg * 0.5);
  vec2 q = c + vec2(cos(a), sin(a)) * r / ASP;
  return src(q);
}`},xt={id:"tile",label:"tile",group:"mirror",blurb:"Repeat the frame in a grid, mirrored at every seam so it never breaks.",needsImage:!0,params:[a("count","across",1,6,2,1),a("rows","down",1,6,2,1),a("flip","mirror seams",0,1,1,1,{options:["no","yes"]}),a("drift","drift",-.5,.5,0)],glsl:`
vec4 fx(vec2 uv) {
  vec2 n = vec2(max(p_count, 1.0), max(p_rows, 1.0));
  vec2 q = uv * n + vec2(u_bars * p_drift, 0.0);
  vec2 cell = floor(q);
  vec2 f = fract(q);
  if (p_flip > 0.5) {
    if (mod(cell.x, 2.0) > 0.5) f.x = 1.0 - f.x;
    if (mod(cell.y, 2.0) > 0.5) f.y = 1.0 - f.y;
  }
  return src(f);
}`},_t={id:"river",label:"river of mirrors",group:"mirror",blurb:"Mirrors facing each other along a line, with the reflections flowing through. Breathes.",needsImage:!0,params:[a("angle","angle",-.25,.25,0),a("period","mirror spacing",.02,.6,.16),a("flow","flow",-.3,.3,.02,5e-4,{hint:"negative runs it the other way"}),a("ratio","second chain",1,6,2.31,.01,{hint:"off a whole number is what stops it repeating"}),a("tangle","let them interact",0,1,.35),a("reach","reach",.1,3,1,.01,{hint:"how much of the picture each mirror shows"}),f("breathe","breathe",0,.6,.1),a("rate","breath rate",.005,.4,.045),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5)],glsl:`
vec4 fx(vec2 uv) {
  float a = p_angle * TAU;
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = rot(a) * ((uv - c) * ASP);

  float breath = 1.0 + sin(u_bars * p_rate * TAU) * p_breathe;
  float period = max(p_period * breath, 0.004);

  // Along the axis, sliding. The reflections move; the picture does not.
  float s = (d.x - u_bars * p_flow) / period;

  float chain = abs(fract(s) * 2.0 - 1.0);
  float finer = abs(fract(s * p_ratio) * 2.0 - 1.0);
  float k = mix(chain, chain * finer, p_tangle);

  float x = (k - 0.5) * period * p_reach;
  vec2 q = c + (rot(-a) * vec2(x, d.y)) / ASP;
  return src(q);
}`},yt={id:"levels",label:"levels",group:"colour",blurb:"Brightness, contrast, saturation, hue. The one every look ends up wanting.",needsImage:!0,params:[f("bright","brightness",-.5,.5,0),f("contrast","contrast",-1,1,0),f("sat","saturation",-1,1,0),f("hue","hue turn",-.5,.5,0),f("lift","lift blacks",-.2,.3,0)],glsl:`
vec4 fx(vec2 uv) {
  vec4 c = src(uv);
  vec3 v = c.rgb + p_bright;
  v = (v - 0.5) * (1.0 + p_contrast) + 0.5;
  vec3 h = rgb2hsv(max(v, 0.0));
  h.x = fract(h.x + p_hue);
  h.y = clamp(h.y * (1.0 + p_sat), 0.0, 1.0);
  v = hsv2rgb(h);
  v = v * (1.0 - p_lift) + p_lift;
  return vec4(v, c.a);
}`},Tt={id:"tint",label:"tint",group:"colour",blurb:"Push one end of the picture toward a hue. Cold shadows, warm lamps.",needsImage:!0,params:[f("amount","amount",0,1,.12),a("hue","hue",0,1,.55),a("sat","purity",0,1,.5),a("toward","where",0,1,0,1,{options:["shadows","highlights"]})],glsl:`
vec4 fx(vec2 uv) {
  vec4 c = src(uv);
  float l = lum(c.rgb);
  float m = p_toward > 0.5 ? l : 1.0 - l;
  vec3 t = hsv2rgb(vec3(p_hue, p_sat, 1.0));
  return vec4(mix(c.rgb, c.rgb * t * 1.6, m * p_amount), c.a);
}`},Et={id:"poster",label:"posterise",group:"colour",blurb:"Fewer steps, with a dither so the bands do not read as a broken screen.",needsImage:!0,params:[a("steps","steps",2,32,10,1),f("dither","dither",0,1,.4)],glsl:`
vec4 fx(vec2 uv) {
  vec4 c = src(uv);
  float n = max(p_steps, 2.0);
  float d = (hash21(floor(uv * u_res) + floor(u_time * 12.0)) - 0.5) * p_dither / n;
  return vec4(floor((c.rgb + d) * n + 0.5) / n, c.a);
}`},$t={id:"pixel",label:"pixelate",group:"grit",blurb:"Snap to a grid. Bind the size to a hit and it comes apart on the beat.",needsImage:!0,params:[a("size","block",1,64,4,.5),a("round","soften",0,1,0)],glsl:`
vec4 fx(vec2 uv) {
  float s = max(p_size, 1.0);
  vec2 g = u_res / s;
  vec2 q = (floor(uv * g) + 0.5) / g;
  return mix(src(q), src(uv), p_round);
}`},At={id:"edge",label:"edges",group:"grit",blurb:"Find the lines and lay them back over the picture. Ink on the paper.",needsImage:!0,params:[f("amount","amount",0,2,.35),a("width","width",.5,6,1.2,.1),a("dark","as",0,1,1,1,{options:["light","ink"]})],glsl:`
vec4 fx(vec2 uv) {
  vec2 e = p_width / u_res;
  float tl = lum(src(uv + vec2(-e.x, e.y)).rgb);
  float tc = lum(src(uv + vec2(0.0, e.y)).rgb);
  float tr = lum(src(uv + e).rgb);
  float ml = lum(src(uv + vec2(-e.x, 0.0)).rgb);
  float mr = lum(src(uv + vec2(e.x, 0.0)).rgb);
  float bl = lum(src(uv - e).rgb);
  float bc = lum(src(uv - vec2(0.0, e.y)).rgb);
  float br = lum(src(uv + vec2(e.x, -e.y)).rgb);
  float gx = (tr + 2.0 * mr + br) - (tl + 2.0 * ml + bl);
  float gy = (tl + 2.0 * tc + tr) - (bl + 2.0 * bc + br);
  float g = clamp(sqrt(gx * gx + gy * gy) * p_amount, 0.0, 1.0);
  vec4 c = src(uv);
  vec3 o = p_dark > 0.5 ? c.rgb * (1.0 - g) : c.rgb + g;
  return vec4(o, max(c.a, p_dark > 0.5 ? c.a : g));
}`},kt={id:"bloom",label:"bloom",group:"light",blurb:"The bright things spill. A lamp at dusk needs about 0.15 of this.",needsImage:!0,params:[f("amount","amount",0,1.5,.25),a("threshold","from",0,1,.62),a("radius","reach",.5,24,6,.1)],glsl:`
vec4 fx(vec2 uv) {
  vec2 e = p_radius / u_res;
  vec3 sum = vec3(0.0);
  float wsum = 0.0;
  for (int i = 0; i < 12; i++) {
    float a = float(i) / 12.0 * TAU;
    float r = 0.4 + fract(float(i) * 0.618) * 0.9;
    vec3 t = src(uv + vec2(cos(a), sin(a)) * e * r).rgb;
    vec3 b = max(t - p_threshold, 0.0);
    sum += b;
    wsum += 1.0;
  }
  vec4 c = src(uv);
  vec3 glow = sum / wsum * p_amount * 3.0;
  return vec4(c.rgb + glow, max(c.a, clamp(lum(glow), 0.0, 1.0)));
}`},St={id:"blur",label:"blur",group:"light",blurb:"One direction, nine taps. Cheap, and the only honest way to soften focus.",needsImage:!0,params:[f("amount","amount",0,24,2,.1),a("angle","angle",0,1,0),a("round","both ways",0,1,0,1,{options:["one","cross"]})],glsl:`
vec4 fx(vec2 uv) {
  float a = p_angle * TAU;
  vec2 d = vec2(cos(a), sin(a)) * p_amount / u_res;
  vec4 sum = vec4(0.0);
  for (int i = -4; i <= 4; i++) {
    float w = 1.0 - abs(float(i)) / 5.0;
    sum += src(uv + d * float(i)) * w;
    if (p_round > 0.5) sum += src(uv + vec2(-d.y, d.x) * float(i)) * w;
  }
  float n = p_round > 0.5 ? 12.6 : 6.3;
  return sum / n;
}`},Rt={id:"vignette",label:"vignette",group:"light",blurb:"Close the corners in. Bind it to pressure and the room narrows on you.",needsImage:!1,params:[f("amount","amount",0,1.5,.35),a("radius","radius",.1,1.4,.78),a("soft","softness",.02,1,.45)],glsl:`
vec4 fx(vec2 uv) {
  vec2 d = (uv - 0.5) * ASP * 1.42;
  float v = smoothstep(p_radius, p_radius - p_soft, length(d));
  float k = 1.0 - (1.0 - v) * p_amount;
  vec4 c = src(uv);
  return vec4(c.rgb * k, mix(c.a, max(c.a, (1.0 - v) * p_amount), 0.0) + (1.0 - v) * p_amount * (1.0 - c.a));
}`},Mt={id:"fog",label:"fog",group:"light",blurb:"Slow cloud drifting across. Makes its own light — works on an empty canvas.",needsImage:!1,params:[f("amount","amount",0,1,.18),a("scale","size",.3,8,1.6,.01),a("speed","drift",0,.6,.04),a("hue","hue",0,1,.55),a("sat","purity",0,1,.15),a("height","sit low",0,1,.4,.01,{hint:"pulls the cloud toward the floor of the frame"})],glsl:`
vec4 fx(vec2 uv) {
  vec2 q = uv * ASP * p_scale;
  float t = u_bars * p_speed;
  float n = fbm(q + vec2(t, t * 0.31));
  n = smoothstep(0.35, 0.85, n);
  float band = mix(1.0, smoothstep(0.0, 0.9, uv.y), p_height);
  float a = n * band * p_amount;
  vec3 col = hsv2rgb(vec3(p_hue, p_sat, 1.0));
  vec4 c = src(uv);
  return vec4(c.rgb + col * a, max(c.a, a));
}`},It={id:"motes",label:"motes",group:"light",blurb:"Dust in a shaft of light. Rises, wanders, never lands. Makes its own light.",needsImage:!1,params:[f("amount","amount",0,1,.3),a("count","how many",4,80,26,1),a("size","size",.5,6,1.6,.1),a("rise","rise",-.3,.3,.03),a("hue","hue",0,1,.12)],glsl:`
vec4 fx(vec2 uv) {
  vec2 q = uv * ASP;
  float n = max(p_count, 1.0);
  float acc = 0.0;
  for (int i = 0; i < 80; i++) {
    if (float(i) >= n) break;
    float fi = float(i);
    vec2 seed = vec2(fi * 1.37, fi * 2.71);
    float sx = hash21(seed);
    float sy = hash21(seed + 4.2);
    float sp = 0.4 + hash21(seed + 9.4);
    float y = fract(sy - u_bars * p_rise * sp);
    float x = sx + sin(u_bars * 0.3 * sp + sx * TAU) * 0.02;
    vec2 pos = vec2(x, y) * ASP;
    float r = length(q - pos);
    float rad = p_size * (0.4 + hash21(seed + 1.1)) / 400.0;
    acc += smoothstep(rad, 0.0, r);
  }
  vec3 col = hsv2rgb(vec3(p_hue, 0.25, 1.0));
  float a = clamp(acc, 0.0, 1.0) * p_amount;
  vec4 c = src(uv);
  return vec4(c.rgb + col * a, max(c.a, a));
}`},Lt={id:"beams",label:"beams",group:"light",blurb:"Light through glass, at an angle, slowly turning. Makes its own light.",needsImage:!1,params:[f("amount","amount",0,1,.16),a("angle","angle",0,1,.13),a("count","how many",1,20,5,.1),a("spread","softness",.02,1,.4),a("drift","drift",-.2,.2,.01),a("hue","hue",0,1,.11)],glsl:`
vec4 fx(vec2 uv) {
  vec2 d = (uv - 0.5) * ASP;
  d = rot(p_angle * TAU) * d;
  float s = sin((d.x + u_bars * p_drift) * p_count * TAU * 0.5);
  float band = smoothstep(1.0 - p_spread, 1.0, s * 0.5 + 0.5);
  float fade = smoothstep(1.0, 0.1, length((uv - 0.5) * ASP) * 1.2);
  float a = band * fade * p_amount;
  vec3 col = hsv2rgb(vec3(p_hue, 0.2, 1.0));
  vec4 c = src(uv);
  return vec4(c.rgb + col * a, max(c.a, a));
}`},Ft={id:"pulse",label:"pulse",group:"light",blurb:"One soft ring of light from a point. Bind the size to a hit. Makes its own light.",needsImage:!1,params:[f("amount","amount",0,1.5,.3),a("radius","radius",0,1.2,.3),a("soft","softness",.01,1,.35),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5),a("hue","hue",0,1,.08),a("ring","as a ring",0,1,0,1,{options:["filled","ring"]})],glsl:`
vec4 fx(vec2 uv) {
  float r = length((uv - vec2(p_cx, p_cy)) * ASP);
  float a = p_ring > 0.5
    ? smoothstep(p_soft, 0.0, abs(r - p_radius))
    : smoothstep(p_radius, max(p_radius - p_soft, 0.0), r);
  a *= p_amount;
  vec3 col = hsv2rgb(vec3(p_hue, 0.3, 1.0));
  vec4 c = src(uv);
  return vec4(c.rgb + col * a, max(c.a, a));
}`},Pt={id:"grain",label:"grain",group:"grit",blurb:"The paper this is all printed on. Makes its own light.",needsImage:!1,params:[f("amount","amount",0,.5,.05),a("size","size",.5,8,1.5,.1),a("speed","boil",0,60,24,1),a("colour","colour",0,1,0)],glsl:`
vec4 fx(vec2 uv) {
  vec2 g = floor(uv * u_res / max(p_size, 0.5));
  float t = floor(u_time * p_speed);
  float n = hash21(g + t * 7.3);
  vec3 nc = vec3(n, hash21(g + t * 7.3 + 11.0), hash21(g + t * 7.3 + 23.0));
  vec3 v = mix(vec3(n), nc, p_colour) - 0.5;
  vec4 c = src(uv);
  return vec4(c.rgb + v * p_amount * 2.0, max(c.a, abs(v.r) * p_amount * 2.0));
}`},Ut={id:"scan",label:"scanlines",group:"grit",blurb:"Lines, and a roll bar that walks up the screen. Makes its own light.",needsImage:!1,params:[f("amount","lines",0,1,.12),a("count","how many",20,900,260,1),a("roll","roll speed",-2,2,.12),f("bar","roll bar",0,1,.08)],glsl:`
vec4 fx(vec2 uv) {
  float s = sin((uv.y + u_bars * p_roll * 0.02) * p_count * TAU * 0.5) * 0.5 + 0.5;
  float bar = smoothstep(0.7, 1.0, sin((uv.y - u_bars * p_roll * 0.2) * TAU)) * p_bar;
  vec4 c = src(uv);
  float k = 1.0 - s * p_amount;
  return vec4(c.rgb * k + bar, max(c.a, s * p_amount * 0.6 + bar));
}`},zt={id:"trails",label:"trails",group:"time",blurb:"Last frame, moved a little, laid back under this one. The feedback loop.",needsImage:!0,params:[f("feedback","hold",0,.97,.7),f("zoom","zoom",-.06,.06,.004),f("spin","spin",-.06,.06,0),f("driftx","drift x",-.02,.02,0),f("drifty","drift y",-.02,.02,0),a("fade","cool",0,1,.06,.001,{hint:"how fast the held frame loses colour"})],glsl:`
vec4 fx(vec2 uv) {
  vec2 d = (uv - 0.5) * ASP;
  d = rot(p_spin * TAU) * d / (1.0 + p_zoom);
  vec2 q = 0.5 + d / ASP + vec2(p_driftx, p_drifty);
  vec4 old = prev(q);
  old.rgb *= (1.0 - p_fade);
  vec4 now = src(uv);
  vec3 rgb = max(now.rgb, old.rgb * p_feedback);
  return vec4(rgb, max(now.a, old.a * p_feedback));
}`},Ot={id:"swirl",label:"swirl",group:"move",blurb:"Twist about a point, hardest at the middle. Water going down a drain.",needsImage:!0,params:[f("amount","twist",-.5,.5,.03),a("radius","reach",.05,1.5,.55,.01),a("falloff","edge",.2,6,1.6,.05,{hint:"high keeps the twist in the middle; low spreads it out"}),f("spin","wind up",-.4,.4,0,.001,{hint:"the twist itself turning, per bar"}),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP;
  float r = length(d);
  float k = 1.0 - smoothstep(0.0, max(p_radius, 1e-3), r);
  k = pow(max(k, 0.0), max(p_falloff, 0.05));
  float a = (p_amount + u_bars * p_spin * 0.25) * TAU * k;
  d = rot(a) * d;
  return src(c + d / ASP);
}`},qt={id:"lens",label:"lens",group:"move",blurb:"Glass in front of the picture. Four shapes of it, and a colour fringe.",needsImage:!0,params:[a("mode","glass",0,3,0,1,{options:["barrel","pincushion","fisheye","anamorphic"]}),f("amount","strength",-.6,.6,.06),a("radius","field",.2,2,.8,.01),f("chroma","colour fringe",0,.05,.002,2e-4,{hint:"the three channels focus at different distances"}),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP;
  float r = length(d) / max(p_radius, 1e-3);
  vec2 q;
  if (p_mode < 0.5) {
    q = d * (1.0 + p_amount * r * r);
  } else if (p_mode < 1.5) {
    q = d / (1.0 + p_amount * r * r);
  } else if (p_mode < 2.5) {
    float s = 1.0 + p_amount * 3.0;
    float rr = max(r, 1e-4);
    q = d * (atan(rr * s) / (rr * s));
  } else {
    q = vec2(d.x * (1.0 + p_amount), d.y * (1.0 - p_amount * 0.5));
  }
  vec4 mid = src(c + q / ASP);
  float k = p_chroma;
  vec4 lo = src(c + q * (1.0 - k) / ASP);
  vec4 hi = src(c + q * (1.0 + k) / ASP);
  return vec4(lo.r, mid.g, hi.b, mid.a);
}`},Nt={id:"wave",label:"wave",group:"move",blurb:"A sine pushed through the picture along an axis. Heat haze; a flag.",needsImage:!0,params:[a("mode","along",0,3,0,1,{options:["across","up","both","diagonal"]}),f("amount","depth",0,.08,.006),a("freq","waves",.5,40,6,.1),a("speed","speed",-3,3,.5),a("sharp","squared off",0,1,0,.01,{hint:"takes the sine toward a hard edge"}),a("skew","lean",-1,1,0,.01,{hint:"tilts the wavefront off the axis"})],glsl:`
float shaped(float x, float sharp) {
  float s = sin(x);
  return mix(s, sign(s) * pow(abs(s), 0.3), sharp);
}
vec4 fx(vec2 uv) {
  float t = u_bars * p_speed * TAU * 0.5;
  float ax = uv.y + uv.x * p_skew;
  float ay = uv.x + uv.y * p_skew;
  float wx = shaped(ax * p_freq + t, p_sharp) * p_amount;
  float wy = shaped(ay * p_freq * 0.83 + t * 1.11, p_sharp) * p_amount;
  vec2 off;
  if (p_mode < 0.5) off = vec2(wx, 0.0);
  else if (p_mode < 1.5) off = vec2(0.0, wy);
  else if (p_mode < 2.5) off = vec2(wx, wy);
  else off = vec2(wx, wx) * 0.7071;
  return src(uv + off);
}`},Bt={id:"churn",label:"churn",group:"move",blurb:"Noise that pushes the picture around, in three different grains of it.",needsImage:!0,params:[a("mode","grain",0,2,0,1,{options:["curl","ridged","coarse"]}),f("amount","depth",0,.12,.008),a("scale","size",.3,14,2.2,.01),a("speed","speed",0,2,.12),a("bias","lean",-1,1,0,.01,{hint:"pushes the whole field one way"})],glsl:`
vec2 curl(vec2 q) {
  float e = 0.07;
  float a = fbm(q + vec2(0.0, e));
  float b = fbm(q - vec2(0.0, e));
  float c = fbm(q + vec2(e, 0.0));
  float d = fbm(q - vec2(e, 0.0));
  return vec2(a - b, d - c) / (2.0 * e);
}
vec4 fx(vec2 uv) {
  vec2 q = uv * ASP * p_scale;
  float t = u_bars * p_speed;
  vec2 v;
  if (p_mode < 0.5) {
    v = curl(q + t) * 0.12;
  } else if (p_mode < 1.5) {
    float r1 = 1.0 - abs(fbm(q + t) * 2.0 - 1.0);
    float r2 = 1.0 - abs(fbm(q + 19.7 - t) * 2.0 - 1.0);
    v = vec2(r1, r2) * 2.0 - 1.0;
  } else {
    float s = 0.0;
    float a = 1.0;
    vec2 pp = q;
    for (int i = 0; i < 3; i++) {
      s += a * (vnoise(pp + t) - 0.5);
      pp *= 2.1;
      a *= 0.55;
    }
    v = vec2(s, s * 0.7) * 2.0;
  }
  v += vec2(p_bias, -p_bias) * 0.5;
  return src(uv + v * p_amount);
}`},Dt={id:"shatter",label:"shatter",group:"move",blurb:"Break the frame into cells and move each one on its own. Cracked glass.",needsImage:!0,params:[f("amount","throw",0,.12,.008),a("cells","pieces",2,40,9,.5),f("spin","turn",0,.3,.01),a("speed","reshuffle",0,12,1.5,.1,{hint:"how often the pieces are dealt again, per bar"}),f("gap","seams",0,.6,.08,.005,{hint:"darkens where the pieces meet"})],glsl:`
vec4 fx(vec2 uv) {
  vec2 g = uv * ASP * p_cells;
  vec2 gi = floor(g);
  vec2 gf = fract(g);
  float best = 8.0;
  vec2 cell = gi;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 o = vec2(float(x), float(y));
      vec2 id = gi + o;
      vec2 pt = o + vec2(hash21(id), hash21(id + 37.7));
      vec2 dd = pt - gf;
      float d = dot(dd, dd);
      if (d < best) { best = d; cell = id; }
    }
  }
  float t = floor(u_bars * p_speed);
  float a = (hash21(cell + t) - 0.5) * TAU * p_spin;
  vec2 off = (vec2(hash21(cell + t + 5.3), hash21(cell + t + 11.1)) - 0.5) * p_amount;
  vec2 c = (cell + 0.5) / (ASP * max(p_cells, 1e-3));
  vec2 d = uv - c;
  vec4 col = src(c + rot(a) * d + off);
  float edge = smoothstep(0.30, 0.72, sqrt(best));
  return vec4(col.rgb * mix(1.0, 1.0 - p_gap, edge), col.a);
}`},Ct={id:"smear",label:"smear",group:"move",blurb:"Drag the picture one way and let it trail. Directional, where bleed is radial.",needsImage:!0,params:[f("amount","reach",0,.25,.02),a("angle","angle",0,1,0),a("curve","bunching",.2,3,1,.05,{hint:"low spreads the trail out; high keeps it near the source"}),a("even","evenness",0,1,.2,.01,{hint:"at 1 every step counts the same and it reads as a blur"}),a("bias","bias to light",0,1,.35)],glsl:`
vec4 fx(vec2 uv) {
  float a = p_angle * TAU;
  vec2 dir = vec2(cos(a), sin(a)) / ASP;
  vec4 sum = vec4(0.0);
  float wsum = 0.0;
  for (int i = 0; i < 12; i++) {
    float t = float(i) / 11.0;
    vec4 c = src(uv - dir * p_amount * pow(t, max(p_curve, 0.05)));
    float w = mix(1.0 - t, 1.0, p_even) * mix(1.0, lum(c.rgb) + 0.05, p_bias);
    sum += c * w;
    wsum += w;
  }
  return sum / max(wsum, 1e-4);
}`},jt={id:"polar",label:"polar",group:"move",blurb:"Unroll the frame around a point, or roll it back up. Tunnels and rosettes.",needsImage:!0,params:[a("mode","remap",0,2,0,1,{options:["unroll","roll up","tunnel"]}),f("amount","how far",0,1,.25),a("twist","twist",-2,2,0,.01),a("zoom","zoom",.1,4,1,.01),a("spin","spin",-1,1,0,.005,{hint:"turns the remap, per bar"}),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP;
  float r = length(d);
  float a = atan(d.y, d.x) / TAU + 0.5;
  float turn = u_bars * p_spin * 0.25;
  vec2 q;
  if (p_mode < 0.5) {
    q = vec2(fract(a + turn), clamp(r * p_zoom, 0.0, 1.0));
  } else if (p_mode < 1.5) {
    float ang = (uv.x + turn + p_twist * 0.1) * TAU;
    float rad = uv.y * p_zoom * 0.7;
    q = c + vec2(cos(ang), sin(ang)) * rad / ASP;
  } else {
    q = fract(vec2(a + turn + p_twist * 0.1, p_zoom * 0.35 / max(r, 1e-3) + u_bars * 0.05));
  }
  return src(mix(uv, q, clamp(p_amount, 0.0, 1.0)));
}`},Gt={id:"blocks",label:"blocks",group:"grit",blurb:"Squares of the picture jump, and tear their colour on the way. Datamosh.",needsImage:!0,params:[a("size","block",4,160,34,1),f("chance","how many",0,1,.12),f("throw","throw",0,.3,.03),f("shift","colour tear",0,.04,.004,5e-4),a("speed","reshuffle",0,24,4,.1,{hint:"deals a new set of blocks this many times a bar"})],glsl:`
vec4 fx(vec2 uv) {
  float t = floor(u_bars * p_speed);
  vec2 g = max(u_res / max(p_size, 2.0), vec2(1.0));
  vec2 cell = floor(uv * g);
  float on = step(1.0 - p_chance, hash21(cell + t * 7.0));
  vec2 off = (vec2(hash21(cell + t + 3.1), hash21(cell + t + 9.7)) - 0.5) * p_throw * on;
  vec2 q = uv + off;
  float s = p_shift * on;
  vec4 mid = src(q);
  return vec4(src(q + vec2(s, 0.0)).r, mid.g, src(q - vec2(s, 0.0)).b, mid.a);
}`},Ht={id:"dropout",label:"dropout",group:"grit",blurb:"Tape that has been played too many times. Lines drop, the picture rolls.",needsImage:!0,params:[f("amount","dropout",0,1,.15),a("lines","lines",40,900,240,1),a("roll","roll",-2,2,.05,.005,{hint:"vertical hold, per bar"}),f("noise","head switch",0,1,.25,.01,{hint:"the band of hash along the bottom edge"}),f("ghost","ghost",0,.05,.004,5e-4),f("bleach","lose colour",0,1,.4)],glsl:`
vec4 fx(vec2 uv) {
  vec2 q = uv;
  q.y = fract(q.y + fract(u_bars * p_roll));
  float line = floor(q.y * p_lines);
  float n = hash21(vec2(line, floor(u_time * 20.0)));
  float drop = step(1.0 - p_amount * 0.45, n);
  q.x += (n - 0.5) * p_amount * 0.12 * drop;
  vec4 c = src(q);
  c.rgb += src(q - vec2(p_ghost, 0.0)).rgb * p_ghost * 24.0;
  float band = smoothstep(0.035, 0.0, q.y);
  c.rgb = mix(c.rgb, vec3(hash21(q * 420.0 + u_time)), band * p_noise);
  c.rgb = mix(c.rgb, vec3(lum(c.rgb)), drop * p_bleach);
  return c;
}`},Xt={id:"sort",label:"sort",group:"grit",blurb:"Runs of pixels dragged toward the brightest thing near them. Pixel sorting.",needsImage:!0,params:[a("mode","along",0,1,0,1,{options:["rows","columns"]}),f("amount","amount",0,1,.5),f("length","run",0,.3,.05),a("from","only above",0,1,.45,.01,{hint:"darker than this is left alone, which is what makes it read as sorting"}),a("dir","toward",0,1,0,1,{options:["light","dark"]})],glsl:`
vec4 fx(vec2 uv) {
  vec4 here = src(uv);
  if (lum(here.rgb) < p_from) return here;
  vec2 ax = p_mode < 0.5 ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 best = here;
  float bl = lum(best.rgb);
  for (int i = 1; i <= 10; i++) {
    vec4 c = src(uv + ax * p_length * (float(i) / 10.0));
    float l = lum(c.rgb);
    bool take = p_dir < 0.5 ? (l > bl) : (l < bl);
    if (take) { best = c; bl = l; }
  }
  return mix(here, best, clamp(p_amount, 0.0, 1.0));
}`},Vt={id:"tear",label:"tear",group:"grit",blurb:"One seam running through the frame, pulling the picture apart as it passes.",needsImage:!0,params:[f("amount","pull",0,.3,.03),a("at","where",0,1,.5),a("width","width",.002,.5,.06),a("roll","travel",-2,2,.25,.005,{hint:"how far the seam moves per bar. Zero holds it still"}),f("tint","burn",0,1,.25),a("hue","burn hue",0,1,.08)],glsl:`
vec4 fx(vec2 uv) {
  float seam = fract(p_at + u_bars * p_roll);
  float d = uv.y - seam;
  float k = smoothstep(max(p_width, 1e-4), 0.0, abs(d));
  float side = d < 0.0 ? -1.0 : 1.0;
  vec4 c = src(uv + vec2(p_amount * k * side, 0.0));
  vec3 hot = hsv2rgb(vec3(p_hue, 0.75, 1.0));
  return vec4(mix(c.rgb, c.rgb * 0.4 + hot * 0.9, k * p_tint), c.a);
}`},Wt={id:"key",label:"chroma key",group:"colour",blurb:"Find one colour and do something to only it. Green screen, four ways.",needsImage:!0,params:[a("mode","do what",0,3,3,1,{options:["cut it out","keep only it","repaint it","drain it"],hint:"cut leaves a hole for whatever is under the canvas; drain is the gentle one"}),f("amount","amount",0,1,.5),a("hue","which colour",0,1,.33,.005,{hint:"0.33 is green, 0 is red, 0.66 is blue"}),a("tol","how close",0,.5,.12),a("soft","softness",.001,.4,.1),a("floor","ignore greys under",0,1,.06,.01,{hint:"a grey has no hue, so without this it keys everything"}),a("into","repaint to",0,1,.08,.005)],glsl:`
vec4 fx(vec2 uv) {
  vec4 c = src(uv);
  vec3 h = rgb2hsv(c.rgb);
  float d = abs(h.x - p_hue);
  d = min(d, 1.0 - d);
  float m = 1.0 - smoothstep(p_tol, p_tol + p_soft, d);
  m *= smoothstep(p_floor, p_floor + 0.06, h.y);
  float k = m * clamp(p_amount, 0.0, 1.0);
  if (p_mode < 0.5) {
    return vec4(c.rgb * (1.0 - k), c.a * (1.0 - k));
  } else if (p_mode < 1.5) {
    float keep = mix(1.0, m, clamp(p_amount, 0.0, 1.0));
    return vec4(c.rgb * keep, c.a * keep);
  } else if (p_mode < 2.5) {
    vec3 rep = hsv2rgb(vec3(p_into, h.y, h.z));
    return vec4(mix(c.rgb, rep, k), c.a);
  }
  return vec4(mix(c.rgb, vec3(lum(c.rgb)), k), c.a);
}`},Yt={id:"duotone",label:"duotone",group:"colour",blurb:"Throw the whole picture between two inks. The cheapest way to change a mood.",needsImage:!0,params:[f("amount","amount",0,1,.3),a("dark","shadow hue",0,1,.6,.005),a("light","light hue",0,1,.1,.005),a("sat","purity",0,1,.4),a("pivot","pivot",0,1,.5,.01,{hint:"which luminance sits on the join"}),a("curve","curve",.2,4,1,.05)],glsl:`
vec4 fx(vec2 uv) {
  vec4 c = src(uv);
  float l = clamp(lum(c.rgb) - p_pivot + 0.5, 0.0, 1.0);
  l = pow(l, max(p_curve, 0.05));
  vec3 lo = hsv2rgb(vec3(p_dark, p_sat, 0.14));
  vec3 hi = hsv2rgb(vec3(p_light, p_sat * 0.7, 1.0));
  return vec4(mix(c.rgb, mix(lo, hi, l), clamp(p_amount, 0.0, 1.0)), c.a);
}`},Kt={id:"halftone",label:"halftone",group:"colour",blurb:"Print it. Dots, lines or a crosshatch, at whatever angle the plate was set.",needsImage:!0,params:[a("mode","screen",0,2,0,1,{options:["dots","lines","crosshatch"]}),f("amount","amount",0,1,.3),a("size","dot size",1.5,40,7,.1),a("angle","angle",0,1,.06),a("sharp","hardness",.01,.5,.14,.005)],glsl:`
vec4 fx(vec2 uv) {
  vec4 c = src(uv);
  float l = lum(c.rgb);
  vec2 g = rot(p_angle * TAU) * (uv * u_res / max(p_size, 1.0));
  float pat;
  if (p_mode < 0.5) {
    vec2 f = fract(g) - 0.5;
    pat = smoothstep(l - p_sharp, l + p_sharp, length(f) * 1.5);
  } else if (p_mode < 1.5) {
    pat = smoothstep(l - p_sharp, l + p_sharp, 0.5 + 0.5 * sin(g.y * TAU));
  } else {
    float a = 0.5 + 0.5 * sin(g.y * TAU);
    float b = 0.5 + 0.5 * sin((rot(1.15) * g).y * TAU);
    pat = smoothstep(l - p_sharp, l + p_sharp, max(a, b) * 0.92);
  }
  vec3 ink = mix(c.rgb, vec3(0.05, 0.06, 0.07), pat);
  return vec4(mix(c.rgb, ink, clamp(p_amount, 0.0, 1.0)), c.a);
}`},Zt={id:"caustics",label:"caustics",group:"light",blurb:"The net of light off moving water, thrown across whatever is underneath.",needsImage:!1,params:[f("amount","amount",0,1,.18),a("scale","size",.5,12,3,.01),a("speed","speed",0,1.5,.09),a("sharp","thinness",1,8,3,.1,{hint:"high gives thin bright lines; low gives a wash"}),a("hue","hue",0,1,.14),a("sat","purity",0,1,.25)],glsl:`
vec4 fx(vec2 uv) {
  vec2 q = uv * ASP * p_scale;
  float t = u_bars * p_speed;
  float a = fbm(q + vec2(t, t * 0.6));
  float b = fbm(q * 1.7 - vec2(t * 0.8, t * 0.3) + 11.3);
  float v = 1.0 - clamp(abs(a - b) * 3.2, 0.0, 1.0);
  v = pow(v, max(p_sharp, 1.0));
  vec3 tone = hsv2rgb(vec3(p_hue, p_sat, 1.0));
  vec4 c = src(uv);
  float k = v * clamp(p_amount, 0.0, 1.0);
  return vec4(c.rgb + tone * k, max(c.a, k));
}`},Jt=[ht,pt,mt,dt,ft,bt,vt,Ot,qt,Nt,Bt,Dt,Ct,jt,gt,wt,xt,_t,yt,Tt,Et,Wt,Yt,Kt,kt,St,Rt,Mt,Lt,It,Ft,Zt,Pt,Ut,$t,At,Gt,Ht,Xt,Vt,zt],Qt={key:"multiplier",label:"multiplier",min:0,max:3,def:1,step:.01,hint:"scales everything in this pass that is an amount. 0 is off"};function G(e){return[...e.params,Qt]}const Le=new Map(Jt.map(e=>[e.id,e]));function he(e){return Le.get(e)}function Fe(e){return Le.has(e)}function zr(e){const t={};for(const o of G(e))t[o.key]=o.def;return t}const Or=[{id:"move",label:"move"},{id:"mirror",label:"mirror"},{id:"colour",label:"colour"},{id:"light",label:"light"},{id:"grit",label:"grit"},{id:"time",label:"time"}],xe=(e,t=0,o=1)=>e<t?t:e>o?o:e,Pe={abs:e=>Math.abs(e[0]??0),sign:e=>Math.sign(e[0]??0),sqrt:e=>Math.sqrt(Math.max(0,e[0]??0)),floor:e=>Math.floor(e[0]??0),ceil:e=>Math.ceil(e[0]??0),round:e=>Math.round(e[0]??0),fract:e=>(e[0]??0)-Math.floor(e[0]??0),sin:e=>Math.sin(e[0]??0),cos:e=>Math.cos(e[0]??0),tan:e=>Math.tan(e[0]??0),exp:e=>Math.exp(e[0]??0),log:e=>Math.log(Math.max(1e-9,e[0]??0)),pow:e=>Math.pow(e[0]??0,e[1]??1),min:e=>e.length===0?0:Math.min(...e),max:e=>e.length===0?0:Math.max(...e),mod:e=>{const t=e[1]??1;return t===0?0:(e[0]??0)-Math.floor((e[0]??0)/t)*t},clamp:e=>xe(e[0]??0,e[1]??0,e[2]??1),mix:e=>(e[0]??0)+((e[1]??0)-(e[0]??0))*(e[2]??0),lerp:e=>(e[0]??0)+((e[1]??0)-(e[0]??0))*(e[2]??0),step:e=>(e[1]??0)<(e[0]??0)?0:1,smoothstep:e=>{const t=e[0]??0,o=e[1]??1;if(o===t)return(e[2]??0)<t?0:1;const s=xe(((e[2]??0)-t)/(o-t));return s*s*(3-2*s)},hash:e=>{const t=Math.sin((e[0]??0)*127.1)*43758.5453;return t-Math.floor(t)}},Ue=new Set(["smooth","glide","lag","count"]),es={smooth:1,glide:1,lag:1,count:2},ts=.5,ss=(e,t,o,s)=>o<=0?t:t+(e-t)*Math.pow(.001,s/o),ze={pi:Math.PI,tau:Math.PI*2,e:Math.E,true:1,false:0},qr=[...Object.keys(Pe),...Ue].sort(),Nr=Object.keys(ze).sort(),os=["<=",">=","==","!=","&&","||","//","+","-","*","/","%","^","(",")",",","?",":","<",">","!"];function rs(e){const t=[];let o=0;for(;o<e.length;){const s=e[o]??"";if(s===" "||s==="	"||s===`
`||s==="\r"){o+=1;continue}if(s>="0"&&s<="9"||s==="."&&/[0-9]/.test(e[o+1]??"")){const n=/^[0-9]*\.?[0-9]+(?:e[-+]?[0-9]+)?/i.exec(e.slice(o));if(n===null)return`that number at ${o+1} does not parse`;t.push({kind:"num",value:Number(n[0]),at:o}),o+=n[0].length;continue}if(/[a-z_]/i.test(s)){const n=/^[a-z_][a-z0-9_]*(?:\.[a-z0-9_]+)*/i.exec(e.slice(o));if(n===null)return`that name at ${o+1} does not parse`;t.push({kind:"name",value:n[0],at:o}),o+=n[0].length;continue}const r=os.find(n=>e.startsWith(n,o));if(r===void 0)return`“${s}” is not something this understands`;t.push({kind:"op",value:r,at:o}),o+=r.length}return t.push({kind:"end",at:e.length}),t}const as={"||":1,"&&":2,"==":3,"!=":3,"<":3,">":3,"<=":3,">=":3,"+":4,"-":4,"*":5,"/":5,"//":5,"%":5,"^":6},ns={"+":(e,t)=>e+t,"-":(e,t)=>e-t,"*":(e,t)=>e*t,"/":(e,t)=>e/t,"//":(e,t)=>t===0?0:Math.floor(e/t),"%":(e,t)=>t===0?0:e-Math.floor(e/t)*t,"^":(e,t)=>Math.pow(e,t),"<":(e,t)=>e<t?1:0,">":(e,t)=>e>t?1:0,"<=":(e,t)=>e<=t?1:0,">=":(e,t)=>e>=t?1:0,"==":(e,t)=>e===t?1:0,"!=":(e,t)=>e!==t?1:0,"&&":(e,t)=>e!==0&&t!==0?1:0,"||":(e,t)=>e!==0||t!==0?1:0};class O extends Error{}function is(e,t,o){let s=0;const r=()=>e[s]??{kind:"end",at:0},n=()=>e[s++]??{kind:"end",at:0},c=m=>{const i=r();if(i.kind!=="op"||i.value!==m)throw new O(`expected “${m}”`);s+=1},u=()=>{const m=n();if(m.kind==="num"){const i=m.value;return()=>i}if(m.kind==="op"&&m.value==="("){const i=b(0);return c(")"),i}if(m.kind==="op"&&m.value==="-"){const i=u();return(l,d)=>-i(l,d)}if(m.kind==="op"&&m.value==="!"){const i=u();return(l,d)=>i(l,d)===0?1:0}if(m.kind==="name"){const i=m.value,l=r();if(l.kind==="op"&&l.value==="("){const v=Pe[i],g=Ue.has(i);if(v===void 0&&!g)throw new O(`there is no function called “${i}”`);s+=1;const p=[];if(!(r().kind==="op"&&r().value===")"))for(;;){p.push(b(0));const _=r();if(_.kind==="op"&&_.value===","){s+=1;continue}break}if(c(")"),g){const _=o.n;if(o.n+=es[i]??1,i==="count")return(T,y)=>{const k=p[0]?.(T,y)??0,I=p[1]?.(T,y)??.5,S=y.mem[_]??0;if((y.mem[_+1]??0)===0){if(k>=I)return y.mem[_]=S+1,y.mem[_+1]=1,S+1}else k<I*ts&&(y.mem[_+1]=0);return S};const A=i==="smooth",x=i==="lag";return(T,y)=>{const k=p[0]?.(T,y)??0,I=p[1]?.(T,y)??.2,S=y.mem[_]??k;if(A&&k>=S)return y.mem[_]=k,k;const be=x?p[2]?.(T,y)??I:I,ve=ss(S,k,k>=S?I:be,y.dt);return y.mem[_]=ve,ve}}const h=v;return(_,A)=>h(p.map(x=>x(_,A)))}const d=ze[i];return d!==void 0?()=>d:(t.add(i),v=>v(i))}throw new O(m.kind==="end"?"it stops in the middle":"that is not something this understands")},b=m=>{let i=u();for(;;){const l=r();if(l.kind!=="op")break;if(l.value==="?"&&m===0){s+=1;const h=b(0);c(":");const _=b(0),A=i;i=(x,T)=>A(x,T)!==0?h(x,T):_(x,T);continue}const d=as[l.value];if(d===void 0||d<m)break;s+=1;const v=ns[l.value];if(v===void 0)throw new O(`“${l.value}” cannot be used like that`);const g=b(l.value==="^"?d:d+1),p=i;i=(h,_)=>v(p(h,_),g(h,_))}return i},w=b(0);if(r().kind!=="end")throw new O("there is something left over at the end");return w}const _e=new Map,ne=e=>({run:()=>Number.NaN,slots:0,error:e,names:[]});function pe(e){const t=_e.get(e);if(t!==void 0)return t;const o=ls(e);return _e.set(e,o),o}function ls(e){if(e.trim()==="")return ne("empty");const t=rs(e);if(typeof t=="string")return ne(t);const o=new Set,s={n:0};try{return{run:is(t,o,s),slots:s.n,error:null,names:[...o].sort()}}catch(r){return ne(r instanceof O?r.message:String(r))}}const cs={dt:1/60,mem:new Float64Array(0)};function us(e,t,o,s=cs){const r=pe(e);if(r.error!==null)return o;const n=r.run(t,s);return Number.isFinite(n)?n:o}function L(e){return typeof e=="object"&&e!==null&&"source"in e}function z(e){return typeof e=="object"&&e!==null&&"expr"in e}function Br(e,t){return e===void 0?t:L(e)?e.base:z(e)?t:e}function $(e,t,o){return{source:t,base:e,depth:o,curve:1,fall:.12}}function de(e){return{id:`lfo-${e}`,name:e,shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5}}const Oe=.25,qe=.18,me=.08;let ye=0;function Te(e={}){return ye+=1,{id:`r${ye.toString(36)}`,shape:"rect",x:.5,y:.5,w:.3,h:.18,rot:0,feather:.35,amount:1,drift:me,...e}}const Dr={id:"untitled",name:"untitled",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,lfos:[de("a")],layers:[],notes:""};function Cr(e,t){return e.wears===void 0||e.wears.length===0||t===void 0?!0:e.wears.includes(t)}let Ee=0;function jr(e){return Ee+=1,`${e}-${Ee.toString(36)}`}function $e(e){const t=new Set,o=s=>{if(L(s)&&t.add(s.source),z(s))for(const r of pe(s.expr).names)t.add(r)};for(const s of e.layers){o(s.mix);for(const r of Object.values(s.params))o(r);for(const r of s.regions??[])o(r.amount)}for(const s of e.dress??[])for(const r of Object.values(s.moves))o(r);return[...t].sort()}function Ne(e,t){return{...e,layers:e.layers.filter(o=>t(o.effect))}}const U=(e,t,o)=>({...de(e),shape:t,bars:o}),hs=[{id:"rgb-wobble",name:"RGB wobble",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The house preset. The channels part on the low end and drift on a slow LFO.",lfos:[U("slow","sine",8)],layers:[{id:"w1",effect:"wobble",on:!0,mix:1,params:{amount:{...$(9e-4,"music.low",.0045),curve:1.6,fall:.2},angle:$(0,"lfo.slow",1),spin:0,sep:1}},{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.004,y:.002,rate:.097,lag:.25}}]},{id:"glasshouse-breath",name:"glasshouse breath",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The room has a pulse. Zoom on the downbeat, noise drift under it, lamp spills.",lfos:[U("drift","noise",6)],layers:[{id:"b1",effect:"breathe",on:!0,mix:1,params:{amount:{...$(0,"bar.pulse",.011),curve:2,fall:.3},cx:.42,cy:.52,roll:0}},{id:"b2",effect:"flow",on:!0,mix:1,params:{amount:{...$(.002,"music.mid",.004),curve:1.4,fall:.35},scale:2.1,speed:.174,warp:.4}},{id:"b3",effect:"bloom",on:!0,mix:1,params:{amount:{...$(.14,"music.level",.22),curve:1.5,fall:.4},threshold:.66,radius:7}}]},{id:"hat-paper",name:"hi-hat paper",scene:"greenhouse",mount:"over",blend:"soft-light",opacity:.9,notes:"Over-mount. The paper grain moves with the hats; the corners close as pressure rises.",lfos:[],layers:[{id:"g1",effect:"grain",on:!0,mix:1,params:{amount:{...$(.02,"music.high",.07),curve:1.8,fall:.09},size:1.6,speed:24,colour:.15}},{id:"g2",effect:"vignette",on:!0,mix:1,params:{amount:{...$(.1,"pressure",.45),curve:1,fall:1.2},radius:.8,soft:.5}}]},{id:"rose-window",name:"rose window",scene:"greenhouse",mount:"plate",blend:"normal",opacity:.55,notes:"Mirrors, folded on a slow turn. Half opacity because at full it is a screensaver.",lfos:[U("turn","saw",32),U("split","sine",12)],layers:[{id:"k1",effect:"kaleido",on:!0,mix:.5,params:{slices:6,spin:.0077,zoom:$(1.1,"lfo.split",.25),cx:.5,cy:.45}},{id:"k2",effect:"mirror",on:!0,mix:{...$(.15,"music.level",.4),curve:1.6,fall:.5},params:{axis:0,split:$(.42,"lfo.split",.16),flip:0,mix2:1}}]},{id:"signal-rot",name:"signal rot",scene:"inside",mount:"plate",blend:"normal",opacity:1,notes:"For the bad end of a fight. Bands jump on a hit, the frame holds and cools.",lfos:[U("gate","hold",2)],layers:[{id:"s1",effect:"slice",on:!0,mix:{...$(0,"sfx.hit",1),curve:2.2,fall:.22},params:{amount:.035,rows:34,speed:4,chance:.3}},{id:"s2",effect:"trails",on:!0,mix:1,params:{feedback:{...$(.42,"music.low",.3),curve:1.4,fall:.5},zoom:.003,spin:.001,driftx:0,drifty:0,fade:.09}},{id:"s3",effect:"poster",on:!0,mix:.5,params:{steps:14,dither:.5}}]},{id:"dusk-light",name:"dusk light",scene:"greenhouse",mount:"over",blend:"screen",opacity:.75,notes:"All light, no picture. Beams through the glass, dust rising, fog on the floor.",lfos:[U("breeze","noise",10)],layers:[{id:"l1",effect:"beams",on:!0,mix:1,params:{amount:{...$(.07,"music.level",.1),curve:1.6,fall:.6},angle:.14,count:4.5,spread:.45,drift:.0155,hue:.1}},{id:"l2",effect:"motes",on:!0,mix:1,params:{amount:.22,count:22,size:1.5,rise:.039,hue:.11}},{id:"l3",effect:"fog",on:!0,mix:1,params:{amount:$(.08,"lfo.breeze",.07),scale:1.4,speed:.058,hue:.55,sat:.12,height:.55}}]}],fs={id:"river-road",name:"the road, upstream",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The band of soil only. Mirrors along it with the reflections flowing upstream, breathing on a four-bar LFO. Sky and glasshouse untouched.",lfos:[{...de("breath"),shape:"sine",bars:4}],layers:[{id:"rr1",effect:"river",on:!0,mix:.42,regions:[{...Te(),shape:"rect",x:.5,y:.53,w:.52,h:.135,rot:0,feather:.75,amount:1}],params:{angle:0,period:.17,flow:.0426,ratio:2.31,tangle:.3,reach:1.1,breathe:0,rate:.087,cx:.5,cy:.53}},{id:"rr2",effect:"breathe",on:!0,mix:1,regions:[{...Te(),x:.5,y:.53,w:.52,h:.16,feather:.85,amount:.7}],params:{amount:$(.002,"lfo.breath",.006),cx:.5,cy:.53,roll:0}}]},ps={id:"the-room-breathes",name:"the room breathes",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The interface on the transport. Hand lifts on the downbeat, puppets breathe over four bars, the button glows on the bass. Nothing in seconds — it survives a tempo change.",lfos:[U("breath","sine",4)],layers:[{id:"db1",effect:"breathe",on:!0,mix:1,params:{amount:{...$(0,"bar.pulse",.006),curve:2,fall:.35},cx:.5,cy:.5,roll:0}}],dress:[{id:"dh",target:"hand",on:!0,moves:{y:{...$(0,"bar.pulse",-2.2),curve:2,fall:.28}}},{id:"dp",target:"puppets",on:!0,moves:{scale:$(.997,"lfo.breath",.006),y:$(0,"lfo.breath",-1.4)}},{id:"de",target:"ender",on:!0,moves:{glow:{...$(0,"music.low",7),curve:1.8,fall:.3}}},{id:"dt",target:"ticker",on:!0,moves:{sat:{...$(1,"music.high",.35),curve:1.6,fall:.4}}}]},Gr=[...hs,fs,ps],ie=`#version 300 es
in vec2 a_pos;
uniform float u_flip;
out vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos.x, a_pos.y * u_flip, 0.0, 1.0);
}`,ds=`#version 300 es
in vec2 a_pos;
uniform vec4 u_rect;
uniform float u_flip;
out vec2 v_uv;
void main() {
  vec2 t = a_pos * 0.5 + 0.5;
  v_uv = vec2(t.x, 1.0 - t.y);
  float x = u_rect.x + t.x * u_rect.z;
  float y = u_rect.y + (1.0 - t.y) * u_rect.w;
  gl_Position = vec4(x * 2.0 - 1.0, (1.0 - y * 2.0) * u_flip, 0.0, 1.0);
}`,D=6;function ms(e){return e.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1,powerPreference:"low-power"})}function bs(e){const t=e.createVertexArray();if(t===null)throw new Error("no vao");e.bindVertexArray(t);const o=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),t}function Ae(e,t,o){const s=e.createShader(t);if(s===null)throw new Error("no shader");if(e.shaderSource(s,o),e.compileShader(s),!e.getShaderParameter(s,e.COMPILE_STATUS)){const r=e.getShaderInfoLog(s)??"unknown";throw e.deleteShader(s),new Error(vs(o,r))}return s}function vs(e,t){const o=e.split(`
`).map((s,r)=>`${String(r+1).padStart(3)} | ${s}`);return`${t}
${o.join(`
`)}`}function Y(e,t,o){const s=e.createProgram();if(s===null)throw new Error("no program");const r=Ae(e,e.VERTEX_SHADER,t),n=Ae(e,e.FRAGMENT_SHADER,o);if(e.attachShader(s,r),e.attachShader(s,n),e.bindAttribLocation(s,0,"a_pos"),e.linkProgram(s),e.deleteShader(r),e.deleteShader(n),!e.getProgramParameter(s,e.LINK_STATUS)){const c=e.getProgramInfoLog(s)??"unknown";throw e.deleteProgram(s),new Error(c)}return s}function K(e,t,o){const s=e.createTexture(),r=e.createFramebuffer();if(s===null||r===null)throw new Error("no target");return e.bindTexture(e.TEXTURE_2D,s),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t,o,0,e.RGBA,e.UNSIGNED_BYTE,null),Be(e),e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,s,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{fb:r,tex:s,w:t,h:o}}function Z(e,t,o,s){t.w===o&&t.h===s||(e.bindTexture(e.TEXTURE_2D,t.tex),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,o,s,0,e.RGBA,e.UNSIGNED_BYTE,null),t.w=o,t.h=s)}function Be(e){e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR)}function gs(e,t){const o=e.createTexture();if(o===null)throw new Error("no texture");return e.bindTexture(e.TEXTURE_2D,o),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),Be(e),o}function ws(e){return new Promise((t,o)=>{const s=new Image;s.crossOrigin="anonymous",s.onload=()=>t(s),s.onerror=()=>o(new Error(`could not load ${e}`)),s.src=e})}const xs=`
#define TAU 6.28318530718
#define ASP (vec2(u_res.x / max(u_res.y, 1.0), 1.0))
vec4 src(vec2 uv) { return texture(u_src, clamp(uv, vec2(0.0), vec2(1.0))); }
vec4 prev(vec2 uv) { return texture(u_prev, clamp(uv, vec2(0.0), vec2(1.0))); }
float lum(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
mat2 rot(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }
float hash21(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i), b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0)), d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * vnoise(p); p *= 2.03; a *= 0.5; }
  return v;
}
vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + 1e-10)), d / (q.x + 1e-10), q.x);
}
vec3 hsv2rgb(vec3 c) {
  vec3 p = abs(fract(c.xxx + vec3(1.0, 2.0 / 3.0, 1.0 / 3.0)) * 6.0 - 3.0);
  return c.z * mix(vec3(1.0), clamp(p - 1.0, 0.0, 1.0), c.y);
}`,N=6,_s=`
uniform int u_regions;
uniform int u_outside;
uniform vec4 u_regionBox[${N}];
uniform vec4 u_regionCfg[${N}];

float maskAt(vec2 uv) {
  if (u_regions == 0) return u_outside == 1 ? 0.0 : 1.0;
  float m = 0.0;
  for (int i = 0; i < ${N}; i++) {
    if (i >= u_regions) break;
    vec4 box = u_regionBox[i];
    vec4 cfg = u_regionCfg[i];
    vec2 span = max(box.zw, vec2(1e-4));
    // Into the region's own frame, corrected for aspect so a rotated box is
    // the shape it looks like rather than a sheared one.
    vec2 d = (uv - box.xy) * ASP;
    d = rot(-cfg.w * TAU) * d;
    d /= (span * ASP);
    float feather = max(cfg.y, 1e-4);
    float inside = cfg.x < 0.5
      ? min(1.0 - smoothstep(1.0 - feather, 1.0, abs(d.x)),
            1.0 - smoothstep(1.0 - feather, 1.0, abs(d.y)))
      : 1.0 - smoothstep(1.0 - feather, 1.0, length(d));
    m = max(m, inside * cfg.z);
  }
  return u_outside == 1 ? 1.0 - m : m;
}`;function ys(e){return`#version 300 es
precision highp float;
uniform sampler2D u_src;
uniform sampler2D u_prev;
uniform vec2 u_res;
uniform float u_time;
uniform float u_bars;
uniform float u_bar;
uniform float u_beat;
uniform float u_mix;
uniform float u_spill;
float INSIDE;
${G(e).map(o=>`uniform float p_${o.key}_now;
uniform float p_${o.key}_ago;
#define p_${o.key} mix(p_${o.key}_ago, p_${o.key}_now, INSIDE)`).join(`
`)}
in vec2 v_uv;
out vec4 outColor;
${xs}
${_s}
${e.glsl}
void main() {
  vec4 base = src(v_uv);
  // Assigned before fx() is called, because every p_ knob reads it.
  INSIDE = maskAt(v_uv);
  // The rest of the screen still gets some. u_spill is a quarter by default,
  // which is why a masked pass no longer short-circuits over most of the frame.
  float m = clamp(u_mix, 0.0, 1.0) * mix(u_spill, 1.0, INSIDE);
  if (m <= 0.0005) { outColor = base; return; }
  vec4 c = fx(v_uv);
  outColor = mix(base, c, m);
}`}const Ts=`#version 300 es
precision highp float;
uniform sampler2D u_src;
uniform float u_alpha;
in vec2 v_uv;
out vec4 outColor;
void main() {
  vec4 c = texture(u_src, v_uv);
  float a = clamp(c.a * u_alpha, 0.0, 1.0);
  outColor = vec4(c.rgb * a, a);
}`,ke=`#version 300 es
precision highp float;
uniform sampler2D u_src;
in vec2 v_uv;
out vec4 outColor;
void main() { outColor = texture(u_src, v_uv); }`;class Hr{canvas;gl;vao;cache=new Map;present;blit;rect;flips=new Map;a;b;history;base;baseReady=!1;textures=[];boxes=new Float32Array(N*4);cfgs=new Float32Array(N*4);w=0;h=0;error=null;broken=new Set;constructor(t){const o=ms(t);if(o===null)throw new Error("this browser has no WebGL2");this.canvas=t,this.gl=o,this.vao=bs(o),this.present=Y(o,ie,Ts),this.blit=Y(o,ie,ke),this.rect=Y(o,ds,ke);for(const s of[this.present,this.blit,this.rect])this.flips.set(s,o.getUniformLocation(s,"u_flip"));this.a=K(o,2,2),this.b=K(o,2,2),this.history=K(o,2,2),this.base=K(o,2,2)}aim(t,o){this.gl.useProgram(t),this.gl.uniform1f(this.flips.get(t)??null,o==="canvas"?1:-1)}resize(t,o){const s=this.gl,r=Math.max(2,Math.round(t)),n=Math.max(2,Math.round(o));r===this.w&&n===this.h||(this.w=r,this.h=n,this.canvas.width=r,this.canvas.height=n,Z(s,this.a,r,n),Z(s,this.b,r,n),Z(s,this.history,r,n),Z(s,this.base,r,n),this.baseReady=!1)}async setScene(t,o){const s=this.gl;for(const n of this.textures)s.deleteTexture(n);this.textures=[];const r=await Promise.all(t.map(n=>ws(n.src).catch(()=>null)));this.pending={parts:t,stage:o,images:r},this.baseReady=!1}pending=null;buildBase(){const t=this.gl,o=this.pending;if(t.bindFramebuffer(t.FRAMEBUFFER,this.base.fb),t.viewport(0,0,this.w,this.h),t.disable(t.BLEND),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),o!==null){t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),this.aim(this.rect,"buffer"),t.bindVertexArray(this.vao),t.uniform1i(t.getUniformLocation(this.rect,"u_src"),0);const s=t.getUniformLocation(this.rect,"u_rect");t.activeTexture(t.TEXTURE0);for(let r=0;r<o.parts.length;r++){const n=o.images[r],c=o.parts[r];if(n==null||c===void 0)continue;const u=gs(t,n);this.textures.push(u),t.bindTexture(t.TEXTURE_2D,u);const b=c.w/o.stage.w;t.uniform4f(s,c.x/o.stage.w+(c.flip===!0?b:0),c.y/o.stage.h,c.flip===!0?-b:b,c.h/o.stage.h),t.drawArrays(t.TRIANGLES,0,D)}t.disable(t.BLEND)}t.bindFramebuffer(t.FRAMEBUFFER,null),this.baseReady=!0}compiled(t){const o=this.cache.get(t.id);if(o!==void 0)return o;const s=this.gl;try{const r=Y(s,ie,ys(t)),n={};for(const u of["u_src","u_prev","u_res","u_time","u_bars","u_bar","u_beat","u_mix","u_flip","u_regions","u_outside","u_regionBox[0]","u_regionCfg[0]"])n[u]=s.getUniformLocation(r,u);n.u_spill=s.getUniformLocation(r,"u_spill");for(const u of G(t))n[`p_${u.key}_now`]=s.getUniformLocation(r,`p_${u.key}_now`),n[`p_${u.key}_ago`]=s.getUniformLocation(r,`p_${u.key}_ago`);const c={program:r,effect:t,locs:n};return this.cache.set(t.id,c),c}catch(r){return this.error=`${t.id}: ${String(r instanceof Error?r.message:r)}`,null}}draw(t,o,s){const r=this.gl;if(this.w===0)return;this.baseReady||this.buildBase(),this.broken.clear(),r.bindVertexArray(this.vao),r.disable(r.BLEND),r.viewport(0,0,this.w,this.h);let n=this.a,c=this.b;r.bindFramebuffer(r.FRAMEBUFFER,n.fb),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),t.mount==="plate"&&(this.aim(this.blit,"buffer"),r.uniform1i(r.getUniformLocation(this.blit,"u_src"),0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,this.base.tex),r.drawArrays(r.TRIANGLES,0,D));for(const u of t.layers){if(!u.on)continue;const b=he(u.effect);if(b===void 0)continue;const w=this.compiled(b);if(w===null){this.broken.add(u.id);continue}const m=Math.max(0,o.resolve(`${u.id}/multiplier`,u.params.multiplier,1))*Math.max(0,s.fx??1),i=Math.min(1,o.resolve(`${u.id}/mix`,u.mix,1)*m);if(i<=5e-4)continue;const l=p=>w.locs[p]??null;r.bindFramebuffer(r.FRAMEBUFFER,c.fb),r.useProgram(w.program),r.uniform1i(l("u_src"),0),r.uniform1i(l("u_prev"),1),r.uniform2f(l("u_res"),this.w,this.h),r.uniform1f(l("u_time"),s.time),r.uniform1f(l("u_bars"),s.bars),r.uniform1f(l("u_bar"),s.bar),r.uniform1f(l("u_beat"),s.beat),r.uniform1f(l("u_mix"),i),r.uniform1f(l("u_flip"),-1);const d=(u.regions??[]).slice(0,N);if(r.uniform1i(l("u_regions"),d.length),r.uniform1i(l("u_outside"),u.outside===!0?1:0),d.length>0){for(let p=0;p<d.length;p++){const h=d[p];if(h===void 0)continue;this.boxes[p*4]=h.x,this.boxes[p*4+1]=h.y,this.boxes[p*4+2]=h.w,this.boxes[p*4+3]=h.h,this.cfgs[p*4]=h.shape==="ellipse"?1:0,this.cfgs[p*4+1]=h.feather;const _=1-(h.drift??me)*o.wander(h.id);this.cfgs[p*4+2]=o.resolve(`${u.id}/${h.id}`,h.amount,1)*_,this.cfgs[p*4+3]=h.rot}r.uniform4fv(l("u_regionBox[0]"),this.boxes.subarray(0,d.length*4)),r.uniform4fv(l("u_regionCfg[0]"),this.cfgs.subarray(0,d.length*4))}const v=u.lag??qe;r.uniform1f(l("u_spill"),Math.max(0,Math.min(1,u.spill??Oe)));for(const p of G(b)){const h=`${u.id}/${p.key}`,_=u.params[p.key],A=y=>Math.max(p.min,Math.min(p.max,y)),x=y=>p.scales===!0?A(y)*m:A(y),T=o.resolve(h,_,p.def);r.uniform1f(l(`p_${p.key}_now`),x(T)),r.uniform1f(l(`p_${p.key}_ago`),x(v>0?o.lagged(h,v,T):T))}r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,n.tex),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,this.history.tex),r.drawArrays(r.TRIANGLES,0,D);const g=n;n=c,c=g}r.bindFramebuffer(r.FRAMEBUFFER,this.history.fb),this.aim(this.blit,"buffer"),r.uniform1i(r.getUniformLocation(this.blit,"u_src"),0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,n.tex),r.drawArrays(r.TRIANGLES,0,D),r.bindFramebuffer(r.FRAMEBUFFER,null),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),this.aim(this.present,"canvas"),r.uniform1i(r.getUniformLocation(this.present,"u_src"),0),r.uniform1f(r.getUniformLocation(this.present,"u_alpha"),t.opacity),r.bindTexture(r.TEXTURE_2D,n.tex),r.drawArrays(r.TRIANGLES,0,D),r.bindVertexArray(null)}clearHistory(){const t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.history.fb),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindFramebuffer(t.FRAMEBUFFER,null)}dispose(){const t=this.gl;for(const o of this.textures)t.deleteTexture(o);for(const o of this.cache.values())t.deleteProgram(o.program);for(const o of[this.a,this.b,this.history,this.base])t.deleteFramebuffer(o.fb),t.deleteTexture(o.tex);t.deleteProgram(this.present),t.deleteProgram(this.blit),t.deleteProgram(this.rect),this.cache.clear(),this.textures=[]}}const Es=""+new URL("char-astra-AVwth5Go.png",import.meta.url).href,F={w:1180,h:720},ee=e=>({src:e,x:0,y:0,w:F.w,h:F.h});function C(e,t,o,s,r,n,c=!1){const u=ue[e],b=[];for(let w=0;w<Math.ceil(r/u.h);w++)for(let m=0;m<Math.ceil(s/u.w);m++)b.push({src:u.src,x:t+m*u.w-n.x,y:o+w*u.h-n.y,w:u.w+1,h:u.h+1,flip:m%2===1!==c});return b}function $s(e){const t=Xe(e);return[...C("wall",0,0,e.w,e.tear+te+30,t),...C("floor",0,e.tear+te,e.w,e.h-e.tear-te,t),...C("horizon",0,e.tear-ue.horizon.h*Ve,e.w,ue.horizon.h,t),...C("endwall",0,0,se,e.h,t,!0),...C("endwall",e.w-se,0,se,e.h,t)]}const De={id:"greenhouse",name:"the greenhouse",blurb:"Dusk on the farm. The first breach, and the board every fight is played on.",base:[ee(We)],over:[H.glasshouse,H.lamp,H.plants,H.fence,...He].map(e=>({src:e.src,x:e.x,y:e.y,w:e.w,h:e.h})),under:"#0b0f11",mountsAt:"ui/Backdrop.tsx — under .bd-plate, over .backdrop"},As={id:"breach",name:"a fight",blurb:"The flat teal paper a breach is played on when it is not on the farm.",base:[ee(Me.bg.src)],over:[],under:"#0b0f11",mountsAt:"ui/BreachScene.tsx — behind the board"},ks={id:"inside",name:"inside",blurb:"The interior sheet — the darker paper the indoor fights are cut on.",base:[ee(Me.bgInside.src)],over:[],under:"#07090a",mountsAt:"ui/Backs.tsx — behind the board"},Ss={id:"room",name:"your room",blurb:"The room the tutorial starts in. The real one — console, drawer, and the door out.",base:$s(Ye),over:[],under:"#0a0c0d",draws:"homeroom",mountsAt:"ui/RoomScene.tsx — plate replaces .sheets; over sits above .world"},Rs={id:"intro",name:"the cold open",blurb:"The lab you wake up in. Two people you never see the faces of, and one lamp.",base:[ee(Ke)],over:[{src:je,x:604.6,y:144,w:209.6,h:576,flip:!0},{src:Es,x:26,y:259.2,w:328,h:432},{src:Ge,x:783.6,y:72,w:490.8,h:691.2,flip:!0}],under:"#05070a",mountsAt:"ui/Intro.tsx — over .intro-room, under .intro-lamp"},Ms={id:"open",name:"the written scenes",blurb:"Show.tsx — the text cold open, the deaths, the ending. Planes and clip-paths, no plate.",base:[],over:[],under:"#1d2427",draws:"paper-room",overOnly:!0,mountsAt:"ui/Show.tsx — over .show-stage, under .show-housing"},q={w:5504,h:3072},J=Math.min(F.w/q.w,F.h/q.h),Is={src:"./title/bg.jpg",x:0,y:0,w:F.w,h:F.h},Ls={id:"title",name:"the front door",blurb:"The title screen. A photographed maze, a paper robot being lowered into it, and one button.",base:[Is],over:[],under:"#05070a",draws:"title",frame:{x:(F.w-q.w*J)/2,y:(F.h-q.h*J)/2,w:q.w*J,h:q.h*J},mountsAt:"ui/Title.tsx — plate fills .title-stage, over sits above it"},Fs={id:"void",name:"nothing",blurb:"No picture at all. For building a light or a grain that goes over anything.",base:[],over:[],under:"#101314",mountsAt:"anywhere — this is an over-mount look"},Ps=[Ls,Rs,Ss,De,As,ks,Ms,Fs];function Us(e){return Ps.find(t=>t.id===e)??De}const zs=Math.PI*2;function Xr(e,t){const o=[];for(const s of e)for(const r of Ze){const n=Je[r];o.push({id:`${s.id}.${r}`,label:`${s.id} ${r}`,group:s.group,...n===void 0?{}:{hint:n}})}o.push({id:"beat",label:"beat",group:"transport",hint:"runs 0→1 across every beat"},{id:"beat.pulse",label:"beat pulse",group:"transport",hint:"lands on the beat and decays"},{id:"bar",label:"bar",group:"transport",hint:"runs 0→1 across the bar"},{id:"bar.pulse",label:"bar pulse",group:"transport",hint:"lands on the downbeat and decays"},{id:"phrase",label:"phrase",group:"transport",hint:"runs 0→1 across the whole loop"},{id:"phrase.pulse",label:"phrase pulse",group:"transport"}),o.push({id:"pressure",label:"pressure",group:"game",hint:"suspicion ÷ the level it notices you at"},{id:"corruption",label:"corruption",group:"game",hint:"the dial. Only ever rises"},{id:"one",label:"always one",group:"game",hint:"for a fixed offset with no movement"});for(const s of t)o.push({id:`lfo.${s.name}`,label:`lfo ${s.name}`,group:"lfo",hint:s.sync?`${s.shape}, ${s.bars} bar${s.bars===1?"":"s"}`:`${s.shape}, ${s.hz} Hz`});return o}function j(e){const t=Math.sin(e*127.1)*43758.5453;return t-Math.floor(t)}function Os(e,t,o){const s=t-Math.floor(t);switch(e.shape){case"sine":return .5+.5*Math.sin(s*zs);case"tri":return s<.5?s*2:2-s*2;case"saw":return s;case"ramp":return 1-s;case"square":return s<e.duty?1:0;case"hold":return j(o+e.phase*977);case"noise":{const r=j(o+e.phase*977),n=j(o+1+e.phase*977),c=s*s*(3-2*s);return r+(n-r)*c}default:return 0}}class qs{laps=0;lastBar=0;lastBars=0;bars=0;seconds=0;tick(t,o){if(this.seconds+=o,!t.playing||t.bars<=0){const s=t.bpm>0?t.bpm:120,r=(t.beatsPerBar||4)*(60/s);this.bars+=o/r;return}t.bars!==this.lastBars&&(this.lastBars=t.bars,this.lastBar=t.bar),t.bar<this.lastBar-1e-6&&(this.laps+=1),this.lastBar=t.bar,this.bars=this.laps*t.bars+t.bar}}const le=e=>{const t=1-(e-Math.floor(e));return t*t*t},Ns=2,M=180;class Vr{clock=new qs;values=new Map;falling=new Map;seen=new Set;trails=new Map;memo=new Map;get all(){return this.values}update(t,o,s){const r=Math.min(Math.max(s,.004166666666666667),.1);this.clock.tick(o.beat,r);const n=this.values;n.clear();for(const[l,d]of o.taps){const v=d??Q;n.set(`${l}.level`,v.level),n.set(`${l}.low`,v.low),n.set(`${l}.mid`,v.mid),n.set(`${l}.high`,v.high),n.set(`${l}.hit`,v.hit),n.set(`${l}.swell`,v.swell)}const c=this.clock.bars,u=o.beat.beatsPerBar||4,b=c-Math.floor(c),w=c*u%1,m=o.beat.bars>0?o.beat.bars:16,i=c/m%1;n.set("bar",b),n.set("bar.pulse",le(b)),n.set("beat",w),n.set("beat.pulse",le(w)),n.set("phrase",i),n.set("phrase.pulse",le(i)),n.set("one",1);for(const[l,d]of Object.entries(o.extra))n.set(l,d);for(const l of t.lfos){const d=l.sync?c/Math.max(l.bars,.015625)+l.phase:this.clock.seconds*l.hz+l.phase;n.set(`lfo.${l.name}`,Os(l,d,Math.floor(d)))}if(this.falling.size>0&&this.falling.size!==this.seen.size)for(const l of this.falling.keys())this.seen.has(l)||this.falling.delete(l);this.seen.clear(),this.dt=r}dt=1/60;value(t){return this.values.get(t)??0}resolve(t,o,s){if(o===void 0)return s;if(z(o)){const m=pe(o.expr).slots;let i=this.memo.get(t);(i===void 0||i.length<m)&&(i=new Float64Array(m),this.memo.set(t,i));const l=us(o.expr,d=>this.value(d),s,{dt:this.dt,mem:i});return this.remember(t,l),l}if(!L(o))return o;this.seen.add(t);const r=Math.max(0,Math.min(1,this.value(o.source))),n=o.curve===1?r:Math.pow(r,Math.max(o.curve,.01)),c=this.falling.get(t)??0;let u=n;const b=o.rise??0;b>0&&n>c?u=n+(c-n)*Math.pow(.001,this.dt/b):o.fall>0&&n<c&&(u=n+(c-n)*Math.pow(.001,this.dt/o.fall)),this.falling.set(t,u);const w=o.base+o.depth*u;return this.remember(t,w),w}remember(t,o){let s=this.trails.get(t);s===void 0&&(s={t:new Float64Array(M),v:new Float32Array(M),i:0,full:!1},this.trails.set(t,s)),s.t[s.i]=this.clock.seconds,s.v[s.i]=o,s.i=(s.i+1)%M,s.i===0&&(s.full=!0)}last(t){const o=this.trails.get(t);return o===void 0||(o.full?M:o.i)===0?Number.NaN:o.v[(o.i-1+M)%M]??Number.NaN}lagged(t,o,s){const r=this.trails.get(t);if(r===void 0)return s;const n=r.full?M:r.i;if(n===0)return s;const c=this.clock.seconds-Math.max(0,Math.min(o,Ns)),u=(r.i-1+M)%M;let b=u;for(let w=0;w<n;w++){const m=(u-w+M)%M;if(r.t[m]<=c){const i=r.t[m],l=r.t[b],d=r.v[m],v=r.v[b];return l<=i?d:d+(v-d)*((c-i)/(l-i))}b=m}return r.v[b]}wander(t){let o=2166136261;for(let w=0;w<t.length;w++)o^=t.charCodeAt(w),o=Math.imul(o,16777619);const s=(o>>>0)/4294967296,r=this.clock.seconds*.13+s*977,n=Math.floor(r),c=r-n,u=j(n+s*31),b=j(n+1+s*31);return u+(b-u)*(c*c*(3-2*c))}}const Bs="breach",Ds="breach",Cs="breach",js="plate",Gs="normal",Hs=1,Xs=`for breaches
`,Vs=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.52,duty:.5},{id:"lfo-trip",name:"trip",shape:"sine",sync:!0,bars:16,hz:.25,phase:.29,duty:.5},{id:"lfo-counter",name:"counter",shape:"sine",sync:!0,bars:16,hz:.25,phase:.5,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5}],Ws=[{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"ripple-1",effect:"ripple",on:!0,mix:1,params:{amount:{expr:".002+music.low/400"},freq:22.7,speed:.351,cx:.5,cy:.5}},{id:"kaleido-1",effect:"kaleido",on:!0,mix:.086,params:{slices:5,spin:.01,zoom:2.04,cx:.258,cy:.685}}],Ys={id:Bs,name:Ds,scene:Cs,mount:js,blend:Gs,opacity:Hs,notes:Xs,lfos:Vs,layers:Ws},Ks="cold-open",Zs="cold open",Js="intro",Qs="plate",eo="normal",to=1,so=`this is for the intro, the new one with voices

The wobble's mix was wired straight to music.low, which is a full-range 0..1 signal — so the pass snapped fully on at each kick and fully off between them. It is smoothed now, and floored at 0.25 so it swells rather than flickering in and out of existence.
`,oo=[{id:"lfo-drift",name:"drift",shape:"noise",sync:!0,bars:32,hz:.25,phase:.07,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:6,hz:.25,phase:0,duty:.5},{id:"lfo-b",name:"b",shape:"sine",sync:!0,bars:12,hz:.25,phase:0,duty:.5},{id:"lfo-c",name:"c",shape:"sine",sync:!0,bars:16,hz:.25,phase:0,duty:.5}],ro=[{id:"flow-2",effect:"flow",on:!0,mix:1,params:{amount:.032,scale:1.66,speed:.542,warp:.199}},{id:"wobble-3",effect:"wobble",on:!0,mix:{expr:"0.25 + smooth(music.low, 0.35) * 0.5"},params:{amount:.009,angle:{expr:"lfo.a"},spin:{expr:".1"},sep:1}},{id:"bloom-5",effect:"bloom",on:!0,mix:.289,params:{amount:.723,threshold:{expr:".5+lfo.c/5"},radius:{expr:"lfo.b*20"}}}],ao=["intro"],no={id:Ks,name:Zs,scene:Js,mount:Qs,blend:eo,opacity:to,notes:so,lfos:oo,layers:ro,wears:ao},io="dusk-light",lo="dusk light",co="greenhouse",uo="over",ho="screen",fo=.75,po="All light, no picture. Beams through the glass, dust rising, fog on the floor.",mo=[{id:"lfo-breeze",name:"breeze",shape:"noise",sync:!0,bars:10,hz:.25,phase:0,duty:.5}],bo=[{id:"l1",effect:"beams",on:!0,mix:1,params:{amount:{source:"music.level",base:.07,depth:.1,curve:1.6,fall:.6},angle:.14,count:4.5,spread:.45,drift:.008,hue:.1}},{id:"l2",effect:"motes",on:!0,mix:1,params:{amount:.22,count:22,size:1.5,rise:.02,hue:.11}},{id:"l3",effect:"fog",on:!0,mix:1,params:{amount:{source:"lfo.breeze",base:.08,depth:.07,curve:1,fall:.12},scale:1.4,speed:.03,hue:.55,sat:.12,height:.55}}],vo={id:io,name:lo,scene:co,mount:uo,blend:ho,opacity:fo,notes:po,lfos:mo,layers:bo},go="front-door",wo="front-door",xo="title",_o="plate",yo="normal",To=1,Eo=`for the front door
`,$o=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.52,duty:.5},{id:"lfo-trip",name:"trip",shape:"sine",sync:!0,bars:16,hz:.25,phase:.29,duty:.5},{id:"lfo-counter",name:"counter",shape:"sine",sync:!0,bars:16,hz:.25,phase:.5,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5},{id:"lfo-b",name:"b",shape:"sine",sync:!0,bars:6,hz:.25,phase:.32,duty:.5}],Ao=[{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"w1",effect:"wobble",on:!0,mix:{expr:".4+lfo.a/2"},params:{amount:{expr:".002+lag(music.low,.4,.4)/100"},angle:{expr:".3+(lfo.a/2-lfo.b/3)"},spin:-.005,sep:1}},{id:"bloom-2",effect:"bloom",on:!0,mix:1,params:{amount:{expr:".3+lfo.b/10-lfo.a/10"},threshold:{expr:".2+lfo.a/3"},radius:6},regions:[{id:"r3",shape:"rect",x:.49678800856531047,y:.6319440230429301,w:.5082967377234154,h:.2505305378329753,rot:0,feather:.27,amount:1,drift:.08}]},{id:"slice-1",effect:"slice",on:!0,mix:.518,params:{amount:.006,rows:20,speed:2.3,chance:.253}}],ko=["title"],So={id:go,name:wo,scene:xo,mount:_o,blend:yo,opacity:To,notes:Eo,lfos:$o,layers:Ao,wears:ko},Ro="gentle-trip",Mo="gentle trip",Io="greenhouse",Lo="plate",Fo="normal",Po=1,Uo=`A gentle trip for the background. The ripple's depth and ring count each swing 20% about where they were set, on two 16-bar sine LFOs half a cycle apart — so the rings crowd in as the depth eases off, and open out as it swells. Nothing lands on a beat; it is meant to be noticed on the second play.

Rates are now per BAR rather than per second — the whole catalogue moved onto the transport, so this stays in time when the record changes tempo. The numbers were converted at 1.935s a bar so it looks exactly as it did.
`,zo=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.52,duty:.5},{id:"lfo-trip",name:"trip",shape:"sine",sync:!0,bars:16,hz:.25,phase:.29,duty:.5},{id:"lfo-counter",name:"counter",shape:"sine",sync:!0,bars:16,hz:.25,phase:.5,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5}],Oo=[{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.006,y:.006,rate:.067,lag:.84}},{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"w1",effect:"wobble",on:!0,mix:1,params:{amount:{source:"music.low",base:9e-4,depth:.014,curve:3.6,fall:.84},angle:{source:"lfo.slow",base:0,depth:1,curve:1,fall:.12},spin:0,sep:1}},{id:"ripple-1",effect:"ripple",on:!0,mix:1,params:{amount:{expr:".002+music.high/150"},freq:14,speed:1,cx:.5,cy:.5}},{id:"bloom-2",effect:"bloom",on:!0,mix:1,params:{amount:{expr:""},threshold:{expr:".2+lfo.a/3"},radius:6},regions:[{id:"r3",shape:"rect",x:.49678800856531047,y:.20545454545454545,w:.49678800856531047,h:.20545454545454545,rot:0,feather:.27,amount:1,drift:.08}]}],qo={id:Ro,name:Mo,scene:Io,mount:Lo,blend:Fo,opacity:Po,notes:Uo,lfos:zo,layers:Oo},No="greenhouse",Bo="greenhouse",Do="greenhouse",Co="plate",jo="normal",Go=1,Ho=`for the greenhouse
`,Xo=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.52,duty:.5},{id:"lfo-trip",name:"trip",shape:"sine",sync:!0,bars:16,hz:.25,phase:.29,duty:.5},{id:"lfo-counter",name:"counter",shape:"sine",sync:!0,bars:16,hz:.25,phase:.5,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5},{id:"lfo-b",name:"b",shape:"sine",sync:!0,bars:6,hz:.25,phase:.32,duty:.5}],Vo=[{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.006,y:.006,rate:.067,lag:.84}},{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"w1",effect:"wobble",on:!0,mix:{expr:".4+lfo.a/2"},params:{amount:{expr:".002+lag(music.low,.4,.4)/100"},angle:{expr:".3+(lfo.a/2-lfo.b/3)"},spin:-.005,sep:1}},{id:"ripple-1",effect:"ripple",on:!0,mix:{expr:".3+lfo.b/2"},params:{amount:{expr:".002+lag(music.high,1,1)/100"},freq:52.7,speed:1,cx:.5,cy:.5}},{id:"bloom-2",effect:"bloom",on:!0,mix:1,params:{amount:{expr:".3+lfo.b/10-lfo.a/10"},threshold:{expr:".2+lfo.a/3"},radius:6},regions:[{id:"r3",shape:"rect",x:.49170326227658456,y:.17579799237720742,w:.5082967377234154,h:.2505305378329753,rot:0,feather:.27,amount:1,drift:.08}]}],Wo=["greenhouse"],Yo={id:No,name:Bo,scene:Do,mount:Co,blend:jo,opacity:Go,notes:Ho,lfos:Xo,layers:Vo,wears:Wo},Ko="home-room",Zo="home-room",Jo="room",Qo="plate",er="screen",tr=1,sr="this is for the home-room",or=[{id:"lfo-drift",name:"drift",shape:"noise",sync:!0,bars:32,hz:.25,phase:.07,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:6,hz:.25,phase:0,duty:.5},{id:"lfo-b",name:"b",shape:"sine",sync:!0,bars:12,hz:.25,phase:0,duty:.5},{id:"lfo-c",name:"c",shape:"sine",sync:!0,bars:16,hz:.25,phase:0,duty:.5}],rr=[{id:"ripple-1",effect:"ripple",on:!0,mix:1,params:{amount:.003,freq:44.8,speed:1,cx:.482,cy:.778}},{id:"pulse-3",effect:"pulse",on:!0,mix:1,params:{amount:.3,radius:.256,soft:.838,cx:.244,cy:.522,hue:{expr:"lag(music.mid,2,1)/2"},ring:0}},{id:"ripple-4",effect:"ripple",on:!0,mix:1,params:{amount:.004,freq:52.2,speed:-.682,cx:.249,cy:.567}}],ar=["room"],nr={id:Ko,name:Zo,scene:Jo,mount:Qo,blend:er,opacity:tr,notes:sr,lfos:or,layers:rr,wears:ar},ir="infiltrated",lr="infiltrated",cr="inside",ur="plate",hr="normal",fr=1,pr="infiltration background always during combats when theres been an infultration move to this",dr=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:8,hz:.25,phase:.2,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5}],mr=[{id:"beams-1",effect:"beams",on:!0,mix:1,params:{amount:.262,angle:.352,count:1.3,spread:.541,drift:.143,hue:.567}},{id:"bleed-4",effect:"bleed",on:!0,mix:.186,params:{amount:.093,cx:.675,cy:.5,bias:{expr:"music.low"}},regions:[{id:"r3",shape:"rect",x:.11363412771804315,y:.8923691012244847,w:.9261963848769764,h:.18559530559923842,rot:-.008,feather:0,amount:1,drift:.3}]},{id:"grain-2",effect:"grain",on:!0,mix:.684,params:{amount:.08,size:1.1,speed:9,colour:.043},regions:[{id:"r4",shape:"rect",x:.8238036927100948,y:.17707226267922282,w:.17873868043426822,h:.6715090946797249,rot:0,feather:.35,amount:1,drift:.08},{id:"r5",shape:"rect",x:.5623629876981044,y:.782913275544842,w:.08559322919355261,h:.06566808181410566,rot:0,feather:.35,amount:1,drift:.08},{id:"r6",shape:"rect",x:.11829514514937525,y:.07327432690853983,w:.5237288677387684,h:.6580930349542624,rot:0,feather:.35,amount:1,drift:.08}]}],br=[],vr=["inside"],gr={id:ir,name:lr,scene:cr,mount:ur,blend:hr,opacity:fr,notes:pr,lfos:dr,layers:mr,dress:br,wears:vr},wr="medium-trip",xr="medium trip",_r="room",yr="plate",Tr="normal",Er=1,$r=`Background and other elements that need a medium-sized trip.
[NH] "it needs an lfo that slowly moves the depth and rate up and down about 20% each and is on a slow lfo with one of them at 1/2 beat to the other."
So the ripple's depth rides lfo.slow (32 bars) and its rate rides lfo.drift (16 bars) — half the period, and started out of phase. Both are base = centre*0.8 with depth = centre*0.4, which is a sine's 0..1 mapped onto +/-20% of the value the studio filed.
`,Ar=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.2,duty:.5},{id:"lfo-drift",name:"drift",shape:"sine",sync:!0,bars:16,hz:.5,phase:.55,duty:.5}],kr=[{id:"w1",effect:"wobble",on:!0,mix:1,params:{amount:{source:"music.low",base:9e-4,depth:.0045,curve:1.6,fall:.2},angle:{source:"lfo.slow",base:0,depth:1,curve:1,fall:.12},spin:0,sep:1}},{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.02,y:.019,rate:.173,lag:.39}},{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"ripple-2",effect:"ripple",on:!0,mix:1,params:{amount:{source:"lfo.slow",base:.0304,depth:.0152,curve:1,fall:0},freq:41.1,speed:{source:"lfo.drift",base:.0856,depth:.0428,curve:1,fall:0},cx:.706,cy:.469}}],Sr=[],Rr={id:wr,name:xr,scene:_r,mount:yr,blend:Tr,opacity:Er,notes:$r,lfos:Ar,layers:kr,dress:Sr};function E(e){return Number.isInteger(e)?String(e):String(Number(e.toFixed(4)))}function ce(e,t,o){if(!L(o))return null;const s=o,r=[];s.curve!==1&&r.push(`curve ${E(s.curve)}`),(s.rise??0)>0&&r.push(`rise ${E(s.rise??0)}s`),s.fall>0&&r.push(`fall ${E(s.fall)}s`);const n=`${E(s.base)} → ${E(s.base+s.depth)}`;return`| ${e} | ${t} | \`${s.source}\` | ${n} | ${r.join(", ")||"—"} |`}function Se(e,t){const o=Us(e.scene),s=[];s.push(`# LOOK REQUEST — ${e.name}`),s.push(""),s.push(`\`${e.id}\` · ${t} · from the look studio (\`looks.html\`)`),s.push(""),e.notes.trim()!==""&&(s.push("> "+e.notes.trim().split(`
`).join(`
> `)),s.push("")),s.push("## Where it goes"),s.push(""),s.push(`- **built against** — ${o.name} (\`${o.id}\`)`);const r=e.wears??[];s.push(r.length===0?"- **wears in** — anywhere. It declares no scenes, so any host may mount it":`- **wears in** — ONLY ${r.map(i=>`\`${i}\``).join(", ")}. \`Look.tsx\` renders nothing elsewhere`),s.push(`- **mount** — ${e.mount==="plate"?"PLATE: the canvas replaces the flat background sheet, game props sit over it untouched":`OVER: the canvas sits above the board on \`mix-blend-mode: ${e.blend}\``}`),s.push(`- **opacity** — ${E(e.opacity)}`),s.push(`- **suggested host** — ${o.mountsAt}`),s.push(""),s.push("## The stack"),s.push(""),s.push("Bottom of this list is drawn first."),s.push("");for(const i of e.layers){const l=he(i.effect),d=l?.label??i.effect,v=i.on?"":" _(muted)_",g=L(i.mix)?`mix ← \`${i.mix.source}\``:z(i.mix)?`mix = \`${i.mix.expr}\``:`mix ${E(i.mix)}`;s.push(`- **${d}** — ${g}${v}`);const p=[];for(const h of l===void 0?[]:G(l)){const _=i.params[h.key];if(L(_)||z(_))continue;const A=typeof _=="number"?_:h.def;A!==h.def&&p.push(`${h.label} ${E(A)}`)}p.length>0&&s.push(`  - ${p.join(" · ")}`);for(const h of i.regions??[]){const _=L(h.amount)?`${E(h.amount.base)} → ${E(h.amount.base+h.amount.depth)} ← \`${h.amount.source}\``:z(h.amount)?`\`${h.amount.expr}\``:E(h.amount),A=h.rot===0?"":`, turned ${E(h.rot)}`;s.push(`  - ${h.shape==="ellipse"?"oval":"box"} at ${E(h.x)}, ${E(h.y)} · ${E(h.w*2)} × ${E(h.h*2)} of the frame${A} · edge ${E(h.feather)} · at ${_}`)}if((i.regions??[]).length>0){i.outside===!0&&s.push("  - **inverted** — the effect lands everywhere EXCEPT those");const h=i.spill??Oe,_=i.lag??qe;s.push(h===0?"  - the rest of the screen gets **nothing** — a hard mask":`  - the rest of the screen gets **${E(h)}** of it, **${E(_)}s** behind`);const A=(i.regions??[]).map(x=>x.drift??me);A.some(x=>x>0)&&s.push(`  - each region wanders off that by up to ${A.map(E).join(", ")} on its own noise`)}}e.layers.length===0&&s.push("_(empty)_"),s.push(""),s.push("## What moves"),s.push("");const n=[];for(const i of e.layers){const l=he(i.effect)?.label??i.effect,d=ce(l,"mix",i.mix);d!==null&&n.push(d);for(const[v,g]of Object.entries(i.params)){const p=ce(l,v,g);p!==null&&n.push(p)}for(const[v,g]of(i.regions??[]).entries()){const p=ce(l,`region ${v+1}`,g.amount);p!==null&&n.push(p)}}n.length===0?s.push("Nothing. Every parameter in this look is a fixed number."):(s.push("| layer | knob | driven by | range | shaping |"),s.push("| --- | --- | --- | --- | --- |"),s.push(...n)),s.push("");const c=(e.dress??[]).filter(i=>i.on);if(c.length>0){s.push("## The interface"),s.push(""),s.push("Driven by CSS, not by the shader — a canvas cannot see the cards. Written as the"),s.push("independent `translate`/`rotate`/`scale` properties, so the game keeps its own"),s.push("`transform` on every one of these. See `looks/dresser.ts`."),s.push("");for(const i of c){const l=Ie(i.target),d=[];for(const v of fe){const g=i.moves[v.key];g!==void 0&&(L(g)?d.push(`${v.label} ${E(g.base)} → ${E(g.base+g.depth)} ← \`${g.source}\``):z(g)?d.push(`${v.label} = \`${g.expr}\``):Math.abs(g-v.def)>1e-4&&d.push(`${v.label} ${E(g)}`))}s.push(`- **${l?.name??i.target}** (\`${l?.selector??"?"}\`)`),s.push(d.length>0?`  - ${d.join(" · ")}`:"  - _(nothing turned)_")}s.push("")}const u=e.lfos.filter(i=>$e(e).includes(`lfo.${i.name}`));if(u.length>0){s.push("## The LFOs it uses"),s.push("");for(const i of u){const l=i.sync?`${E(i.bars)} bar${i.bars===1?"":"s"} — locked to the transport`:`${E(i.hz)} Hz — free running`,d=i.phase===0?"":`, phase ${E(i.phase)}`;s.push(`- \`lfo.${i.name}\` — ${i.shape}, ${l}${d}`)}s.push("")}const b=e.layers.filter(i=>i.on).length,w=e.layers.some(i=>i.on&&i.effect==="trails");s.push("## What it costs"),s.push(""),s.push(`- ${b} full-screen pass${b===1?"":"es"} per frame at 1180×720`),s.push(`- ${w?"holds a feedback buffer (one extra full-screen texture)":"no feedback buffer"}`);const m=e.layers.filter(i=>i.on&&(i.regions??[]).length>0).length;return m>0&&s.push(`- ${m} pass${m===1?"":"es"} masked to regions — cheaper than it looks, the mask short-circuits`),s.push(`- listens to: ${$e(e).map(i=>`\`${i}\``).join(", ")||"nothing"}`),s.push(""),s.push("## To pick this up"),s.push(""),s.push("```"),s.push(`the look studio filed ${e.id} — wire it into the game`),s.push("```"),s.push(""),s.push(`The patch is next to this file at \`design/looks/${e.id}.look.json\`. It is`),s.push("the same format `src/breach/looks/render.ts` already reads, so wiring it in is"),s.push("mounting `<Look>` in the host above and pointing it at this id — not a port."),s.push(""),s.join(`
`)}const Mr=Object.assign({"../../../design/looks/breach.look.json":Ys,"../../../design/looks/cold-open.look.json":no,"../../../design/looks/dusk-light.look.json":vo,"../../../design/looks/front-door.look.json":So,"../../../design/looks/gentle-trip.look.json":qo,"../../../design/looks/greenhouse.look.json":Yo,"../../../design/looks/home-room.look.json":nr,"../../../design/looks/infiltrated.look.json":gr,"../../../design/looks/medium-trip.look.json":Rr}),Wr=new Map(Object.entries(Mr).map(([e,t])=>{const o=e.split("/").pop()?.replace(".look.json","")??t.id;return[o,Ne({...t,id:o},Fe)]})),Ir=()=>new Date().toISOString().replace(/\.\d+Z$/,"Z");async function Yr(e,t){const o=Ir(),s=JSON.stringify({look:e,stamp:o,brief:t?Se(e,o):null});try{const r=await fetch("/__looks/save",{method:"POST",headers:{"content-type":"application/json"},body:s});return r.ok?{ok:!0,where:((await r.json()).files??[]).join("  ·  ")}:{ok:!1,where:`the dev server said ${r.status}`}}catch{return Re(`${e.id}.look.json`,JSON.stringify(e,null,2),"application/json"),t&&Re(`${e.id}.request.md`,Se(e,o),"text/markdown"),{ok:!1,where:"no dev server — downloaded instead"}}}function Re(e,t,o){const s=URL.createObjectURL(new Blob([t],{type:o})),r=document.createElement("a");r.href=s,r.download=e,r.click(),setTimeout(()=>URL.revokeObjectURL(s),4e3)}const Ce="breach.look.draft";function Kr(e){try{localStorage.setItem(Ce,JSON.stringify(e))}catch{}}function Zr(){try{const e=localStorage.getItem(Ce);return e===null?null:Ne(JSON.parse(e),Fe)}catch{return null}}export{Gr as A,Te as B,Nr as C,me as D,Jt as E,qr as F,Or as G,Yr as H,Cr as I,qe as L,fe as M,N as R,Oe as S,ct as T,Pr as a,z as b,us as c,zr as d,he as e,pe as f,F as g,Dr as h,L as i,Zr as j,Vr as k,jr as l,Wr as m,de as n,Xr as o,G as p,Hr as q,Br as r,Us as s,Ie as t,Ur as u,Kr as v,Ps as w,Fr as x,Ne as y,Fe as z};
