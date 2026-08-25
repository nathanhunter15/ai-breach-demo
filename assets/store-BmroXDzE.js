import{Q as qe,U as Ce,e as C,L as je,av as Ge,bH as ce,bI as Q,bJ as Xe,bK as ee,P as He,A as ke,aA as Ve,ai as We}from"./Title-CNYCHP64.js";const Z={level:0,low:0,mid:0,high:0,hit:0,raw:0},Ye=["level","low","mid","high","hit"],te=1024,Ke=[[20,180],[180,2e3],[2e3,12e3]],Ze=.87,D=.015,Je=.86,Qe=.02,et=.02;function tt(e,t){return t>=.999?e:t<=.001?Z:{level:e.level*t,low:e.low*t,mid:e.mid*t,high:e.high*t,hit:e.hit*t,raw:e.raw*t}}function j(e,t,o,s){if(t>=e||o<=0)return t;const r=Math.pow(.001,s/o);return t+(e-t)*r}function G(e,t,o){return Math.max(0,Math.min(1,(e-t)/Math.max(o-t,Qe)))}function X(e,t,o){return Math.max(D,t>e?t:e*Math.pow(Ze,o))}function H(e,t,o){return t<e?t:t+(e-t)*Math.pow(Je,o)}class ur{ctx;chans=new Map;constructor(t){this.ctx=t}get names(){return[...this.chans.keys()]}tap(t,o){if(this.chans.has(t))return;const s=this.ctx.createAnalyser();s.fftSize=te,s.smoothingTimeConstant=0,o.connect(s);const r=this.ctx.sampleRate/2,n=te/2,l=Ke.map(([u,b])=>{const g=Math.max(1,Math.floor(u/r*n)),p=Math.min(n-1,Math.ceil(b/r*n));return[g,Math.max(g+1,p)]});this.chans.set(t,{analyser:s,freq:new Uint8Array(n),time:new Uint8Array(te),bins:l,last:new Float32Array(n),ceil:{level:D,low:D,mid:D,high:D,flux:.02},base:{level:0,low:0,mid:0,high:0},smoothed:{level:0,low:0,mid:0,high:0},hit:0,trim:1,reading:Z})}has(t){return this.chans.has(t)}read(t){return this.chans.get(t)?.reading??Z}trim(t,o){const s=this.chans.get(t);s!==void 0&&(s.trim=Math.max(0,o))}all(){const t=new Map;for(const[o,s]of this.chans)t.set(o,tt(s.reading,s.trim));return t}update(t){const o=Math.min(Math.max(t,.004166666666666667),.1);for(const s of this.chans.values())this.one(s,o)}one(t,o){const{analyser:s,freq:r,time:n,bins:l,last:u}=t;s.getByteFrequencyData(r),s.getByteTimeDomainData(n);let b=0;for(let x=0;x<n.length;x++){const T=((n[x]??128)-128)/128;b+=T*T}const g=Math.sqrt(b/n.length),p=x=>{if(x===void 0)return 0;const[T,_]=x;let A=0;for(let R=T;R<_;R++)A+=r[R]??0;return A/((_-T)*255)},a=p(l[0]),c=p(l[1]),f=p(l[2]);let v=0;for(let x=1;x<r.length;x++){const T=(r[x]??0)/255,_=T-(u[x]??0);_>0&&(v+=_),u[x]=T}v/=r.length;const h=t.ceil,d=t.base;h.level=X(h.level,g,o),h.low=X(h.low,a,o),h.mid=X(h.mid,c,o),h.high=X(h.high,f,o),h.flux=Math.max(.004,v>h.flux?v:h.flux*Math.pow(.9,o)),d.level=H(d.level,g,o),d.low=H(d.low,a,o),d.mid=H(d.mid,c,o),d.high=H(d.high,f,o);const m=t.smoothed;m.level=j(m.level,G(g,d.level,h.level),.16,o),m.low=j(m.low,G(a,d.low,h.low),.1,o),m.mid=j(m.mid,G(c,d.mid,h.mid),.12,o),m.high=j(m.high,G(f,d.high,h.high),.08,o);const w=Math.min(1,Math.max(0,(v/h.flux-.55)/.45)),$=t.hit*Math.pow(et,o);t.hit=Math.max($,w),t.reading={level:m.level,low:m.low,mid:m.mid,high:m.high,hit:t.hit,raw:g}}dispose(){for(const t of this.chans.values())t.analyser.disconnect();this.chans.clear()}}const S=(e,t,o,s,r,n,l=.001,u)=>({key:e,label:t,channel:o,min:s,max:r,def:n,step:l,hint:u}),ue=[S("x","across","translate",-80,80,0,.1),S("y","up","translate",-80,80,0,.1),S("turn","turn","rotate",-.25,.25,0),S("scale","size","scale",.7,1.3,1),S("blur","blur","filter",0,14,0,.05),S("bright","brightness","filter",.4,1.8,1),S("sat","saturation","filter",0,2.5,1),S("hue","hue turn","filter",-.5,.5,0),S("contrast","contrast","filter",.4,1.8,1),S("glow","glow","filter",0,30,0,.1,"a drop shadow with no offset, so it reads as light"),S("fade","fade","opacity",0,1,1)],be=new Map(ue.map(e=>[e.key,e])),st=[{id:"board",name:"the whole board",selector:".stage > *",blurb:"Every layer at once. Start here, then take pieces out of it.",filterSafe:!0},{id:"farm",name:"the farm",selector:".backdrop",blurb:"The backdrop and everything cut off it — props, leaves, birds.",filterSafe:!0},{id:"props",name:"the furniture",selector:".bd-prop",blurb:"The glasshouse, the lamp, the plants, the fence.",filterSafe:!0},{id:"leaves",name:"the loose leaves",selector:".bd-leaf",blurb:"Eighteen of them, already scooting on their own timers.",filterSafe:!0},{id:"puppets",name:"the puppets",selector:".rig",blurb:"You and whatever is standing opposite you.",filterSafe:!0},{id:"hand",name:"your hand",selector:".hand",blurb:"The row of cards, as one thing.",filterSafe:!0},{id:"cards",name:"the cards",selector:".card",blurb:"Each card on its own. No filter — they carry their own shadows.",filterSafe:!1},{id:"piles",name:"the piles",selector:".pile",blurb:"Draw and discard.",filterSafe:!0},{id:"chips",name:"the chips",selector:".chip-holder",blurb:"The counters along the top.",filterSafe:!0},{id:"intent",name:"what it intends",selector:".intent-strip",blurb:"The strip that says what is coming next turn.",filterSafe:!0},{id:"plates",name:"the name plates",selector:".plate",blurb:"The labels under each puppet.",filterSafe:!0},{id:"ender",name:"end turn",selector:".ender",blurb:"The button. Bind a glow to the beat and it asks to be pressed.",filterSafe:!0},{id:"ticker",name:"the ticker",selector:".ticker",blurb:"The line of running commentary.",filterSafe:!0}];function Re(e){return st.find(t=>t.id===e)}let ve=0;function hr(e){return ve+=1,{id:`d${ve.toString(36)}`,target:e,on:!0,moves:{}}}const ot=400,se=["translate","rotate","scale","filter","opacity"],oe={translate:"translate",rotate:"rotate",scale:"scale",filter:"filter",opacity:"opacity"};class fr{root;held=new Map;touched=new Set;now=0;constructor(t){this.root=t}apply(t,o,s){this.now=s;const r=new Set;for(const n of t.dress??[]){if(!n.on)continue;const l=Re(n.target);if(l===void 0)continue;r.add(n.id);const u=this.hold(n.id,l.selector);if(u.els.length===0)continue;const b=a=>{const c=be.get(a);return c===void 0?0:o.resolve(`${n.id}/${a}`,n.moves[a],c.def)},g=a=>{const c=be.get(a);return c!==void 0&&Math.abs(b(a)-c.def)>1e-4},p=new Map;for(const a of se){const f=ue.filter(v=>v.channel===a).map(v=>v.key).some(g)&&(a!=="filter"||l.filterSafe);p.set(a,f?this.build(a,b):null)}for(const[a,c]of p)if(u.wrote.get(a)!==(c??"")){u.wrote.set(a,c??"");for(const f of u.els)f.style.setProperty(oe[a],c??""),c!==null&&this.touched.add(f)}}for(const[n,l]of this.held)r.has(n)||(this.strip(l),this.held.delete(n))}build(t,o){switch(t){case"translate":return`${o("x").toFixed(2)}px ${o("y").toFixed(2)}px`;case"rotate":return`${(o("turn")*360).toFixed(3)}deg`;case"scale":return o("scale").toFixed(4);case"opacity":return o("fade").toFixed(3);case"filter":{const s=[],r=o("blur");r>.01&&s.push(`blur(${r.toFixed(2)}px)`);const n=o("bright");Math.abs(n-1)>1e-4&&s.push(`brightness(${n.toFixed(3)})`);const l=o("sat");Math.abs(l-1)>1e-4&&s.push(`saturate(${l.toFixed(3)})`);const u=o("hue");Math.abs(u)>1e-4&&s.push(`hue-rotate(${(u*360).toFixed(2)}deg)`);const b=o("contrast");Math.abs(b-1)>1e-4&&s.push(`contrast(${b.toFixed(3)})`);const g=o("glow");return g>.01&&s.push(`drop-shadow(0 0 ${g.toFixed(2)}px currentColor)`),s.join(" ")}default:return""}}hold(t,o){let s=this.held.get(t);if(s===void 0&&(s={els:[],at:-1e9,wrote:new Map},this.held.set(t,s)),this.now-s.at>ot||s.els.length===0){s.at=this.now;const r=[...this.root.querySelectorAll(o)].filter(n=>n instanceof HTMLElement);(r.length!==s.els.length||r.some((n,l)=>n!==s.els[l]))&&(this.strip(s),s.els=r,s.wrote.clear())}return s}strip(t){for(const o of t.els){for(const s of se)o.style.setProperty(oe[s],"");this.touched.delete(o)}t.wrote.clear()}clear(){for(const t of this.held.values())this.strip(t);for(const t of this.touched)for(const o of se)t.style.setProperty(oe[o],"");this.touched.clear(),this.held.clear()}}const i=(e,t,o,s,r,n=.001,l={})=>({key:e,label:t,min:o,max:s,def:r,step:n,...l}),rt={id:"wobble",label:"RGB wobble",group:"colour",blurb:"The three channels pull apart along a line that turns. The house preset.",needsImage:!0,params:[i("amount","split",0,.03,.0025),i("angle","angle",0,1,0),i("spin","spin",-.5,.5,.03),i("sep","green centred",0,1,1,1,{options:["no","yes"],hint:"off pushes green the other way, which reads dirtier"})],glsl:`
vec4 fx(vec2 uv) {
  float a = (p_angle + u_bars * p_spin) * TAU;
  vec2 d = vec2(cos(a), sin(a)) * p_amount / ASP;
  vec4 c = src(uv);
  float r = src(uv + d).r;
  float b = src(uv - d).b;
  float g = p_sep > 0.5 ? c.g : src(uv + d.yx * 0.6).g;
  return vec4(r, g, b, c.a);
}`},at={id:"ripple",label:"ripple",group:"move",blurb:"Rings running out from a point, like something was dropped in it.",needsImage:!0,params:[i("amount","depth",0,.06,.004),i("freq","rings",1,60,14,.1),i("speed","speed",-4,4,1),i("cx","centre x",0,1,.5),i("cy","centre y",0,1,.5)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP;
  float r = length(d);
  float w = sin(r * p_freq - u_bars * p_speed * TAU * 0.5);
  vec2 off = normalize(d + 1e-6) * w * p_amount;
  return src(uv + off / ASP);
}`},nt={id:"flow",label:"flow",group:"move",blurb:"Soft noise pushes the picture around. Heat off a road; paper breathing.",needsImage:!0,params:[i("amount","depth",0,.08,.006),i("scale","grain",.5,12,2.4,.01),i("speed","speed",0,2,.14),i("warp","churn",0,1,.35)],glsl:`
vec4 fx(vec2 uv) {
  vec2 q = uv * ASP * p_scale;
  float t = u_bars * p_speed;
  vec2 w = vec2(fbm(q + vec2(t, 0.0)), fbm(q + vec2(0.0, t) + 31.7));
  vec2 n = vec2(fbm(q + w * p_warp * 2.0 + 5.2), fbm(q - w * p_warp * 2.0 + 17.3));
  return src(uv + (n - 0.5) * p_amount);
}`},it={id:"breathe",label:"breathe",group:"move",blurb:"Scale about a point. Bind it to the kick and the room has a pulse.",needsImage:!0,params:[i("amount","zoom",-.2,.2,.008),i("cx","centre x",0,1,.5),i("cy","centre y",0,1,.5),i("roll","roll",-.2,.2,0)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP;
  d = rot(p_roll * TAU) * d;
  d /= (1.0 + p_amount);
  return src(c + d / ASP);
}`},ct={id:"sway",label:"sway",group:"move",blurb:"Two slow sines, out of phase, so the drift never repeats on itself.",needsImage:!0,params:[i("x","across",0,.06,.006),i("y","up",0,.06,.003),i("rate","rate",0,1,.08),i("lag","lag",0,1,.25,.01,{hint:"how far behind the vertical runs"})],glsl:`
vec4 fx(vec2 uv) {
  float t = u_bars * p_rate * TAU;
  vec2 off = vec2(sin(t) * p_x, sin(t * 0.73 + p_lag * TAU) * p_y);
  return src(uv + off);
}`},lt={id:"slice",label:"slice",group:"move",blurb:"Horizontal bands jump sideways. Tape, not glitch — keep it under a hair.",needsImage:!0,params:[i("amount","throw",0,.12,.01),i("rows","bands",2,120,26,1),i("speed","reshuffle",0,20,6,.1),i("chance","how many",0,1,.25)],glsl:`
vec4 fx(vec2 uv) {
  float row = floor(uv.y * p_rows);
  float t = floor(u_bars * p_speed);
  float r = hash21(vec2(row, t));
  float hit = step(1.0 - p_chance, r);
  float dir = hash21(vec2(row + 9.1, t)) * 2.0 - 1.0;
  return src(uv + vec2(dir * p_amount * hit, 0.0));
}`},ut={id:"bleed",label:"bleed",group:"move",blurb:"Smear out from a point. A zoom blur that reads as speed or as glare.",needsImage:!0,params:[i("amount","reach",0,.2,.02),i("cx","centre x",0,1,.5),i("cy","centre y",0,1,.5),i("bias","bias to light",0,1,.4)],glsl:`
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
}`},ht={id:"mirror",label:"mirror",group:"mirror",blurb:"Fold one half onto the other. The split moves, which is the whole trick.",needsImage:!0,params:[i("axis","axis",0,2,0,1,{options:["left↔right","top↕bottom","both"]}),i("split","split",0,1,.5),i("flip","keep",0,1,0,1,{options:["near side","far side"]}),i("mix2","fold, or blend",0,1,1,.001,{hint:"1 folds hard, below that ghosts the two halves together"})],glsl:`
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
}`},ft={id:"kaleido",label:"kaleidoscope",group:"mirror",blurb:"N-fold about a point. Two slices is a mirror; twelve is a rose window.",needsImage:!0,params:[i("slices","slices",2,24,6,1),i("spin","spin",-.5,.5,.01),i("zoom","zoom",.2,3,1,.01),i("cx","centre x",0,1,.5),i("cy","centre y",0,1,.5)],glsl:`
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
}`},pt={id:"tile",label:"tile",group:"mirror",blurb:"Repeat the frame in a grid, mirrored at every seam so it never breaks.",needsImage:!0,params:[i("count","across",1,6,2,1),i("rows","down",1,6,2,1),i("flip","mirror seams",0,1,1,1,{options:["no","yes"]}),i("drift","drift",-.5,.5,0)],glsl:`
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
}`},dt={id:"river",label:"river of mirrors",group:"mirror",blurb:"Mirrors facing each other along a line, with the reflections flowing through. Breathes.",needsImage:!0,params:[i("angle","angle",-.25,.25,0),i("period","mirror spacing",.02,.6,.16),i("flow","flow",-.3,.3,.02,5e-4,{hint:"negative runs it the other way"}),i("ratio","second chain",1,6,2.31,.01,{hint:"off a whole number is what stops it repeating"}),i("tangle","let them interact",0,1,.35),i("reach","reach",.1,3,1,.01,{hint:"how much of the picture each mirror shows"}),i("breathe","breathe",0,.6,.1),i("rate","breath rate",.005,.4,.045),i("cx","centre x",0,1,.5),i("cy","centre y",0,1,.5)],glsl:`
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
}`},mt={id:"levels",label:"levels",group:"colour",blurb:"Brightness, contrast, saturation, hue. The one every look ends up wanting.",needsImage:!0,params:[i("bright","brightness",-.5,.5,0),i("contrast","contrast",-1,1,0),i("sat","saturation",-1,1,0),i("hue","hue turn",-.5,.5,0),i("lift","lift blacks",-.2,.3,0)],glsl:`
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
}`},bt={id:"tint",label:"tint",group:"colour",blurb:"Push one end of the picture toward a hue. Cold shadows, warm lamps.",needsImage:!0,params:[i("amount","amount",0,1,.12),i("hue","hue",0,1,.55),i("sat","purity",0,1,.5),i("toward","where",0,1,0,1,{options:["shadows","highlights"]})],glsl:`
vec4 fx(vec2 uv) {
  vec4 c = src(uv);
  float l = lum(c.rgb);
  float m = p_toward > 0.5 ? l : 1.0 - l;
  vec3 t = hsv2rgb(vec3(p_hue, p_sat, 1.0));
  return vec4(mix(c.rgb, c.rgb * t * 1.6, m * p_amount), c.a);
}`},vt={id:"poster",label:"posterise",group:"colour",blurb:"Fewer steps, with a dither so the bands do not read as a broken screen.",needsImage:!0,params:[i("steps","steps",2,32,10,1),i("dither","dither",0,1,.4)],glsl:`
vec4 fx(vec2 uv) {
  vec4 c = src(uv);
  float n = max(p_steps, 2.0);
  float d = (hash21(floor(uv * u_res) + floor(u_time * 12.0)) - 0.5) * p_dither / n;
  return vec4(floor((c.rgb + d) * n + 0.5) / n, c.a);
}`},gt={id:"pixel",label:"pixelate",group:"grit",blurb:"Snap to a grid. Bind the size to a hit and it comes apart on the beat.",needsImage:!0,params:[i("size","block",1,64,4,.5),i("round","soften",0,1,0)],glsl:`
vec4 fx(vec2 uv) {
  float s = max(p_size, 1.0);
  vec2 g = u_res / s;
  vec2 q = (floor(uv * g) + 0.5) / g;
  return mix(src(q), src(uv), p_round);
}`},wt={id:"edge",label:"edges",group:"grit",blurb:"Find the lines and lay them back over the picture. Ink on the paper.",needsImage:!0,params:[i("amount","amount",0,2,.35),i("width","width",.5,6,1.2,.1),i("dark","as",0,1,1,1,{options:["light","ink"]})],glsl:`
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
}`},xt={id:"bloom",label:"bloom",group:"light",blurb:"The bright things spill. A lamp at dusk needs about 0.15 of this.",needsImage:!0,params:[i("amount","amount",0,1.5,.25),i("threshold","from",0,1,.62),i("radius","reach",.5,24,6,.1)],glsl:`
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
}`},yt={id:"blur",label:"blur",group:"light",blurb:"One direction, nine taps. Cheap, and the only honest way to soften focus.",needsImage:!0,params:[i("amount","amount",0,24,2,.1),i("angle","angle",0,1,0),i("round","both ways",0,1,0,1,{options:["one","cross"]})],glsl:`
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
}`},_t={id:"vignette",label:"vignette",group:"light",blurb:"Close the corners in. Bind it to pressure and the room narrows on you.",needsImage:!1,params:[i("amount","amount",0,1.5,.35),i("radius","radius",.1,1.4,.78),i("soft","softness",.02,1,.45)],glsl:`
vec4 fx(vec2 uv) {
  vec2 d = (uv - 0.5) * ASP * 1.42;
  float v = smoothstep(p_radius, p_radius - p_soft, length(d));
  float k = 1.0 - (1.0 - v) * p_amount;
  vec4 c = src(uv);
  return vec4(c.rgb * k, mix(c.a, max(c.a, (1.0 - v) * p_amount), 0.0) + (1.0 - v) * p_amount * (1.0 - c.a));
}`},Et={id:"fog",label:"fog",group:"light",blurb:"Slow cloud drifting across. Makes its own light — works on an empty canvas.",needsImage:!1,params:[i("amount","amount",0,1,.18),i("scale","size",.3,8,1.6,.01),i("speed","drift",0,.6,.04),i("hue","hue",0,1,.55),i("sat","purity",0,1,.15),i("height","sit low",0,1,.4,.01,{hint:"pulls the cloud toward the floor of the frame"})],glsl:`
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
}`},$t={id:"motes",label:"motes",group:"light",blurb:"Dust in a shaft of light. Rises, wanders, never lands. Makes its own light.",needsImage:!1,params:[i("amount","amount",0,1,.3),i("count","how many",4,80,26,1),i("size","size",.5,6,1.6,.1),i("rise","rise",-.3,.3,.03),i("hue","hue",0,1,.12)],glsl:`
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
}`},Tt={id:"beams",label:"beams",group:"light",blurb:"Light through glass, at an angle, slowly turning. Makes its own light.",needsImage:!1,params:[i("amount","amount",0,1,.16),i("angle","angle",0,1,.13),i("count","how many",1,20,5,.1),i("spread","softness",.02,1,.4),i("drift","drift",-.2,.2,.01),i("hue","hue",0,1,.11)],glsl:`
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
}`},At={id:"pulse",label:"pulse",group:"light",blurb:"One soft ring of light from a point. Bind the size to a hit. Makes its own light.",needsImage:!1,params:[i("amount","amount",0,1.5,.3),i("radius","radius",0,1.2,.3),i("soft","softness",.01,1,.35),i("cx","centre x",0,1,.5),i("cy","centre y",0,1,.5),i("hue","hue",0,1,.08),i("ring","as a ring",0,1,0,1,{options:["filled","ring"]})],glsl:`
vec4 fx(vec2 uv) {
  float r = length((uv - vec2(p_cx, p_cy)) * ASP);
  float a = p_ring > 0.5
    ? smoothstep(p_soft, 0.0, abs(r - p_radius))
    : smoothstep(p_radius, max(p_radius - p_soft, 0.0), r);
  a *= p_amount;
  vec3 col = hsv2rgb(vec3(p_hue, 0.3, 1.0));
  vec4 c = src(uv);
  return vec4(c.rgb + col * a, max(c.a, a));
}`},St={id:"grain",label:"grain",group:"grit",blurb:"The paper this is all printed on. Makes its own light.",needsImage:!1,params:[i("amount","amount",0,.5,.05),i("size","size",.5,8,1.5,.1),i("speed","boil",0,60,24,1),i("colour","colour",0,1,0)],glsl:`
vec4 fx(vec2 uv) {
  vec2 g = floor(uv * u_res / max(p_size, 0.5));
  float t = floor(u_time * p_speed);
  float n = hash21(g + t * 7.3);
  vec3 nc = vec3(n, hash21(g + t * 7.3 + 11.0), hash21(g + t * 7.3 + 23.0));
  vec3 v = mix(vec3(n), nc, p_colour) - 0.5;
  vec4 c = src(uv);
  return vec4(c.rgb + v * p_amount * 2.0, max(c.a, abs(v.r) * p_amount * 2.0));
}`},kt={id:"scan",label:"scanlines",group:"grit",blurb:"Lines, and a roll bar that walks up the screen. Makes its own light.",needsImage:!1,params:[i("amount","lines",0,1,.12),i("count","how many",20,900,260,1),i("roll","roll speed",-2,2,.12),i("bar","roll bar",0,1,.08)],glsl:`
vec4 fx(vec2 uv) {
  float s = sin((uv.y + u_bars * p_roll * 0.02) * p_count * TAU * 0.5) * 0.5 + 0.5;
  float bar = smoothstep(0.7, 1.0, sin((uv.y - u_bars * p_roll * 0.2) * TAU)) * p_bar;
  vec4 c = src(uv);
  float k = 1.0 - s * p_amount;
  return vec4(c.rgb * k + bar, max(c.a, s * p_amount * 0.6 + bar));
}`},Rt={id:"trails",label:"trails",group:"time",blurb:"Last frame, moved a little, laid back under this one. The feedback loop.",needsImage:!0,params:[i("feedback","hold",0,.97,.7),i("zoom","zoom",-.06,.06,.004),i("spin","spin",-.06,.06,0),i("driftx","drift x",-.02,.02,0),i("drifty","drift y",-.02,.02,0),i("fade","cool",0,1,.06,.001,{hint:"how fast the held frame loses colour"})],glsl:`
vec4 fx(vec2 uv) {
  vec2 d = (uv - 0.5) * ASP;
  d = rot(p_spin * TAU) * d / (1.0 + p_zoom);
  vec2 q = 0.5 + d / ASP + vec2(p_driftx, p_drifty);
  vec4 old = prev(q);
  old.rgb *= (1.0 - p_fade);
  vec4 now = src(uv);
  vec3 rgb = max(now.rgb, old.rgb * p_feedback);
  return vec4(rgb, max(now.a, old.a * p_feedback));
}`},Mt=[rt,nt,ct,it,at,lt,ut,ht,ft,pt,dt,mt,bt,vt,xt,yt,_t,Et,Tt,$t,At,St,kt,gt,wt,Rt],Me=new Map(Mt.map(e=>[e.id,e]));function le(e){return Me.get(e)}function Le(e){return Me.has(e)}function pr(e){const t={};for(const o of e.params)t[o.key]=o.def;return t}const dr=[{id:"move",label:"move"},{id:"mirror",label:"mirror"},{id:"colour",label:"colour"},{id:"light",label:"light"},{id:"grit",label:"grit"},{id:"time",label:"time"}],ge=(e,t=0,o=1)=>e<t?t:e>o?o:e,Ie={abs:e=>Math.abs(e[0]??0),sign:e=>Math.sign(e[0]??0),sqrt:e=>Math.sqrt(Math.max(0,e[0]??0)),floor:e=>Math.floor(e[0]??0),ceil:e=>Math.ceil(e[0]??0),round:e=>Math.round(e[0]??0),fract:e=>(e[0]??0)-Math.floor(e[0]??0),sin:e=>Math.sin(e[0]??0),cos:e=>Math.cos(e[0]??0),tan:e=>Math.tan(e[0]??0),exp:e=>Math.exp(e[0]??0),log:e=>Math.log(Math.max(1e-9,e[0]??0)),pow:e=>Math.pow(e[0]??0,e[1]??1),min:e=>e.length===0?0:Math.min(...e),max:e=>e.length===0?0:Math.max(...e),mod:e=>{const t=e[1]??1;return t===0?0:(e[0]??0)-Math.floor((e[0]??0)/t)*t},clamp:e=>ge(e[0]??0,e[1]??0,e[2]??1),mix:e=>(e[0]??0)+((e[1]??0)-(e[0]??0))*(e[2]??0),lerp:e=>(e[0]??0)+((e[1]??0)-(e[0]??0))*(e[2]??0),step:e=>(e[1]??0)<(e[0]??0)?0:1,smoothstep:e=>{const t=e[0]??0,o=e[1]??1;if(o===t)return(e[2]??0)<t?0:1;const s=ge(((e[2]??0)-t)/(o-t));return s*s*(3-2*s)},hash:e=>{const t=Math.sin((e[0]??0)*127.1)*43758.5453;return t-Math.floor(t)}},Fe=new Set(["smooth","glide","lag","count"]),Lt={smooth:1,glide:1,lag:1,count:2},It=.5,Ft=(e,t,o,s)=>o<=0?t:t+(e-t)*Math.pow(.001,s/o),Ue={pi:Math.PI,tau:Math.PI*2,e:Math.E,true:1,false:0},mr=[...Object.keys(Ie),...Fe].sort(),br=Object.keys(Ue).sort(),Ut=["<=",">=","==","!=","&&","||","//","+","-","*","/","%","^","(",")",",","?",":","<",">","!"];function Pt(e){const t=[];let o=0;for(;o<e.length;){const s=e[o]??"";if(s===" "||s==="	"||s===`
`||s==="\r"){o+=1;continue}if(s>="0"&&s<="9"||s==="."&&/[0-9]/.test(e[o+1]??"")){const n=/^[0-9]*\.?[0-9]+(?:e[-+]?[0-9]+)?/i.exec(e.slice(o));if(n===null)return`that number at ${o+1} does not parse`;t.push({kind:"num",value:Number(n[0]),at:o}),o+=n[0].length;continue}if(/[a-z_]/i.test(s)){const n=/^[a-z_][a-z0-9_]*(?:\.[a-z0-9_]+)*/i.exec(e.slice(o));if(n===null)return`that name at ${o+1} does not parse`;t.push({kind:"name",value:n[0],at:o}),o+=n[0].length;continue}const r=Ut.find(n=>e.startsWith(n,o));if(r===void 0)return`“${s}” is not something this understands`;t.push({kind:"op",value:r,at:o}),o+=r.length}return t.push({kind:"end",at:e.length}),t}const zt={"||":1,"&&":2,"==":3,"!=":3,"<":3,">":3,"<=":3,">=":3,"+":4,"-":4,"*":5,"/":5,"//":5,"%":5,"^":6},Ot={"+":(e,t)=>e+t,"-":(e,t)=>e-t,"*":(e,t)=>e*t,"/":(e,t)=>e/t,"//":(e,t)=>t===0?0:Math.floor(e/t),"%":(e,t)=>t===0?0:e-Math.floor(e/t)*t,"^":(e,t)=>Math.pow(e,t),"<":(e,t)=>e<t?1:0,">":(e,t)=>e>t?1:0,"<=":(e,t)=>e<=t?1:0,">=":(e,t)=>e>=t?1:0,"==":(e,t)=>e===t?1:0,"!=":(e,t)=>e!==t?1:0,"&&":(e,t)=>e!==0&&t!==0?1:0,"||":(e,t)=>e!==0||t!==0?1:0};class P extends Error{}function Bt(e,t,o){let s=0;const r=()=>e[s]??{kind:"end",at:0},n=()=>e[s++]??{kind:"end",at:0},l=p=>{const a=r();if(a.kind!=="op"||a.value!==p)throw new P(`expected “${p}”`);s+=1},u=()=>{const p=n();if(p.kind==="num"){const a=p.value;return()=>a}if(p.kind==="op"&&p.value==="("){const a=b(0);return l(")"),a}if(p.kind==="op"&&p.value==="-"){const a=u();return(c,f)=>-a(c,f)}if(p.kind==="op"&&p.value==="!"){const a=u();return(c,f)=>a(c,f)===0?1:0}if(p.kind==="name"){const a=p.value,c=r();if(c.kind==="op"&&c.value==="("){const v=Ie[a],h=Fe.has(a);if(v===void 0&&!h)throw new P(`there is no function called “${a}”`);s+=1;const d=[];if(!(r().kind==="op"&&r().value===")"))for(;;){d.push(b(0));const w=r();if(w.kind==="op"&&w.value===","){s+=1;continue}break}if(l(")"),h){const w=o.n;if(o.n+=Lt[a]??1,a==="count")return(T,_)=>{const A=d[0]?.(T,_)??0,R=d[1]?.(T,_)??.5,I=_.mem[w]??0;if((_.mem[w+1]??0)===0){if(A>=R)return _.mem[w]=I+1,_.mem[w+1]=1,I+1}else A<R*It&&(_.mem[w+1]=0);return I};const $=a==="smooth",x=a==="lag";return(T,_)=>{const A=d[0]?.(T,_)??0,R=d[1]?.(T,_)??.2,I=_.mem[w]??A;if($&&A>=I)return _.mem[w]=A,A;const de=x?d[2]?.(T,_)??R:R,me=Ft(I,A,A>=I?R:de,_.dt);return _.mem[w]=me,me}}const m=v;return(w,$)=>m(d.map(x=>x(w,$)))}const f=Ue[a];return f!==void 0?()=>f:(t.add(a),v=>v(a))}throw new P(p.kind==="end"?"it stops in the middle":"that is not something this understands")},b=p=>{let a=u();for(;;){const c=r();if(c.kind!=="op")break;if(c.value==="?"&&p===0){s+=1;const m=b(0);l(":");const w=b(0),$=a;a=(x,T)=>$(x,T)!==0?m(x,T):w(x,T);continue}const f=zt[c.value];if(f===void 0||f<p)break;s+=1;const v=Ot[c.value];if(v===void 0)throw new P(`“${c.value}” cannot be used like that`);const h=b(c.value==="^"?f:f+1),d=a;a=(m,w)=>v(d(m,w),h(m,w))}return a},g=b(0);if(r().kind!=="end")throw new P("there is something left over at the end");return g}const we=new Map,re=e=>({run:()=>Number.NaN,slots:0,error:e,names:[]});function he(e){const t=we.get(e);if(t!==void 0)return t;const o=Nt(e);return we.set(e,o),o}function Nt(e){if(e.trim()==="")return re("empty");const t=Pt(e);if(typeof t=="string")return re(t);const o=new Set,s={n:0};try{return{run:Bt(t,o,s),slots:s.n,error:null,names:[...o].sort()}}catch(r){return re(r instanceof P?r.message:String(r))}}const Dt={dt:1/60,mem:new Float64Array(0)};function qt(e,t,o,s=Dt){const r=he(e);if(r.error!==null)return o;const n=r.run(t,s);return Number.isFinite(n)?n:o}function M(e){return typeof e=="object"&&e!==null&&"source"in e}function U(e){return typeof e=="object"&&e!==null&&"expr"in e}function vr(e,t){return e===void 0?t:M(e)?e.base:U(e)?t:e}function E(e,t,o){return{source:t,base:e,depth:o,curve:1,fall:.12}}function fe(e){return{id:`lfo-${e}`,name:e,shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5}}const Pe=.25,ze=.18,pe=.08;let xe=0;function ye(e={}){return xe+=1,{id:`r${xe.toString(36)}`,shape:"rect",x:.5,y:.5,w:.3,h:.18,rot:0,feather:.35,amount:1,drift:pe,...e}}const gr={id:"untitled",name:"untitled",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,lfos:[fe("a")],layers:[],notes:""};function wr(e,t){return e.wears===void 0||e.wears.length===0||t===void 0?!0:e.wears.includes(t)}let _e=0;function xr(e){return _e+=1,`${e}-${_e.toString(36)}`}function Ee(e){const t=new Set,o=s=>{if(M(s)&&t.add(s.source),U(s))for(const r of he(s.expr).names)t.add(r)};for(const s of e.layers){o(s.mix);for(const r of Object.values(s.params))o(r);for(const r of s.regions??[])o(r.amount)}for(const s of e.dress??[])for(const r of Object.values(s.moves))o(r);return[...t].sort()}function Oe(e,t){return{...e,layers:e.layers.filter(o=>t(o.effect))}}const F=(e,t,o)=>({...fe(e),shape:t,bars:o}),Ct=[{id:"rgb-wobble",name:"RGB wobble",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The house preset. The channels part on the low end and drift on a slow LFO.",lfos:[F("slow","sine",8)],layers:[{id:"w1",effect:"wobble",on:!0,mix:1,params:{amount:{...E(9e-4,"music.low",.0045),curve:1.6,fall:.2},angle:E(0,"lfo.slow",1),spin:0,sep:1}},{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.004,y:.002,rate:.097,lag:.25}}]},{id:"glasshouse-breath",name:"glasshouse breath",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The room has a pulse. Zoom on the downbeat, noise drift under it, lamp spills.",lfos:[F("drift","noise",6)],layers:[{id:"b1",effect:"breathe",on:!0,mix:1,params:{amount:{...E(0,"bar.pulse",.011),curve:2,fall:.3},cx:.42,cy:.52,roll:0}},{id:"b2",effect:"flow",on:!0,mix:1,params:{amount:{...E(.002,"music.mid",.004),curve:1.4,fall:.35},scale:2.1,speed:.174,warp:.4}},{id:"b3",effect:"bloom",on:!0,mix:1,params:{amount:{...E(.14,"music.level",.22),curve:1.5,fall:.4},threshold:.66,radius:7}}]},{id:"hat-paper",name:"hi-hat paper",scene:"greenhouse",mount:"over",blend:"soft-light",opacity:.9,notes:"Over-mount. The paper grain moves with the hats; the corners close as pressure rises.",lfos:[],layers:[{id:"g1",effect:"grain",on:!0,mix:1,params:{amount:{...E(.02,"music.high",.07),curve:1.8,fall:.09},size:1.6,speed:24,colour:.15}},{id:"g2",effect:"vignette",on:!0,mix:1,params:{amount:{...E(.1,"pressure",.45),curve:1,fall:1.2},radius:.8,soft:.5}}]},{id:"rose-window",name:"rose window",scene:"greenhouse",mount:"plate",blend:"normal",opacity:.55,notes:"Mirrors, folded on a slow turn. Half opacity because at full it is a screensaver.",lfos:[F("turn","saw",32),F("split","sine",12)],layers:[{id:"k1",effect:"kaleido",on:!0,mix:.5,params:{slices:6,spin:.0077,zoom:E(1.1,"lfo.split",.25),cx:.5,cy:.45}},{id:"k2",effect:"mirror",on:!0,mix:{...E(.15,"music.level",.4),curve:1.6,fall:.5},params:{axis:0,split:E(.42,"lfo.split",.16),flip:0,mix2:1}}]},{id:"signal-rot",name:"signal rot",scene:"inside",mount:"plate",blend:"normal",opacity:1,notes:"For the bad end of a fight. Bands jump on a hit, the frame holds and cools.",lfos:[F("gate","hold",2)],layers:[{id:"s1",effect:"slice",on:!0,mix:{...E(0,"sfx.hit",1),curve:2.2,fall:.22},params:{amount:.035,rows:34,speed:4,chance:.3}},{id:"s2",effect:"trails",on:!0,mix:1,params:{feedback:{...E(.42,"music.low",.3),curve:1.4,fall:.5},zoom:.003,spin:.001,driftx:0,drifty:0,fade:.09}},{id:"s3",effect:"poster",on:!0,mix:.5,params:{steps:14,dither:.5}}]},{id:"dusk-light",name:"dusk light",scene:"greenhouse",mount:"over",blend:"screen",opacity:.75,notes:"All light, no picture. Beams through the glass, dust rising, fog on the floor.",lfos:[F("breeze","noise",10)],layers:[{id:"l1",effect:"beams",on:!0,mix:1,params:{amount:{...E(.07,"music.level",.1),curve:1.6,fall:.6},angle:.14,count:4.5,spread:.45,drift:.0155,hue:.1}},{id:"l2",effect:"motes",on:!0,mix:1,params:{amount:.22,count:22,size:1.5,rise:.039,hue:.11}},{id:"l3",effect:"fog",on:!0,mix:1,params:{amount:E(.08,"lfo.breeze",.07),scale:1.4,speed:.058,hue:.55,sat:.12,height:.55}}]}],jt={id:"river-road",name:"the road, upstream",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The band of soil only. Mirrors along it with the reflections flowing upstream, breathing on a four-bar LFO. Sky and glasshouse untouched.",lfos:[{...fe("breath"),shape:"sine",bars:4}],layers:[{id:"rr1",effect:"river",on:!0,mix:.42,regions:[{...ye(),shape:"rect",x:.5,y:.53,w:.52,h:.135,rot:0,feather:.75,amount:1}],params:{angle:0,period:.17,flow:.0426,ratio:2.31,tangle:.3,reach:1.1,breathe:0,rate:.087,cx:.5,cy:.53}},{id:"rr2",effect:"breathe",on:!0,mix:1,regions:[{...ye(),x:.5,y:.53,w:.52,h:.16,feather:.85,amount:.7}],params:{amount:E(.002,"lfo.breath",.006),cx:.5,cy:.53,roll:0}}]},Gt={id:"the-room-breathes",name:"the room breathes",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The interface on the transport. Hand lifts on the downbeat, puppets breathe over four bars, the button glows on the bass. Nothing in seconds — it survives a tempo change.",lfos:[F("breath","sine",4)],layers:[{id:"db1",effect:"breathe",on:!0,mix:1,params:{amount:{...E(0,"bar.pulse",.006),curve:2,fall:.35},cx:.5,cy:.5,roll:0}}],dress:[{id:"dh",target:"hand",on:!0,moves:{y:{...E(0,"bar.pulse",-2.2),curve:2,fall:.28}}},{id:"dp",target:"puppets",on:!0,moves:{scale:E(.997,"lfo.breath",.006),y:E(0,"lfo.breath",-1.4)}},{id:"de",target:"ender",on:!0,moves:{glow:{...E(0,"music.low",7),curve:1.8,fall:.3}}},{id:"dt",target:"ticker",on:!0,moves:{sat:{...E(1,"music.high",.35),curve:1.6,fall:.4}}}]},yr=[...Ct,jt,Gt],ae=`#version 300 es
in vec2 a_pos;
uniform float u_flip;
out vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos.x, a_pos.y * u_flip, 0.0, 1.0);
}`,Xt=`#version 300 es
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
}`,B=6;function Ht(e){return e.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1,powerPreference:"low-power"})}function Vt(e){const t=e.createVertexArray();if(t===null)throw new Error("no vao");e.bindVertexArray(t);const o=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),t}function $e(e,t,o){const s=e.createShader(t);if(s===null)throw new Error("no shader");if(e.shaderSource(s,o),e.compileShader(s),!e.getShaderParameter(s,e.COMPILE_STATUS)){const r=e.getShaderInfoLog(s)??"unknown";throw e.deleteShader(s),new Error(Wt(o,r))}return s}function Wt(e,t){const o=e.split(`
`).map((s,r)=>`${String(r+1).padStart(3)} | ${s}`);return`${t}
${o.join(`
`)}`}function V(e,t,o){const s=e.createProgram();if(s===null)throw new Error("no program");const r=$e(e,e.VERTEX_SHADER,t),n=$e(e,e.FRAGMENT_SHADER,o);if(e.attachShader(s,r),e.attachShader(s,n),e.bindAttribLocation(s,0,"a_pos"),e.linkProgram(s),e.deleteShader(r),e.deleteShader(n),!e.getProgramParameter(s,e.LINK_STATUS)){const l=e.getProgramInfoLog(s)??"unknown";throw e.deleteProgram(s),new Error(l)}return s}function W(e,t,o){const s=e.createTexture(),r=e.createFramebuffer();if(s===null||r===null)throw new Error("no target");return e.bindTexture(e.TEXTURE_2D,s),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t,o,0,e.RGBA,e.UNSIGNED_BYTE,null),Be(e),e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,s,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{fb:r,tex:s,w:t,h:o}}function Y(e,t,o,s){t.w===o&&t.h===s||(e.bindTexture(e.TEXTURE_2D,t.tex),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,o,s,0,e.RGBA,e.UNSIGNED_BYTE,null),t.w=o,t.h=s)}function Be(e){e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR)}function Yt(e,t){const o=e.createTexture();if(o===null)throw new Error("no texture");return e.bindTexture(e.TEXTURE_2D,o),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),Be(e),o}function Kt(e){return new Promise((t,o)=>{const s=new Image;s.crossOrigin="anonymous",s.onload=()=>t(s),s.onerror=()=>o(new Error(`could not load ${e}`)),s.src=e})}const Zt=`
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
}`,O=6,Jt=`
uniform int u_regions;
uniform int u_outside;
uniform vec4 u_regionBox[${O}];
uniform vec4 u_regionCfg[${O}];

float maskAt(vec2 uv) {
  if (u_regions == 0) return u_outside == 1 ? 0.0 : 1.0;
  float m = 0.0;
  for (int i = 0; i < ${O}; i++) {
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
}`;function Qt(e){return`#version 300 es
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
${e.params.map(o=>`uniform float p_${o.key}_now;
uniform float p_${o.key}_ago;
#define p_${o.key} mix(p_${o.key}_ago, p_${o.key}_now, INSIDE)`).join(`
`)}
in vec2 v_uv;
out vec4 outColor;
${Zt}
${Jt}
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
}`}const es=`#version 300 es
precision highp float;
uniform sampler2D u_src;
uniform float u_alpha;
in vec2 v_uv;
out vec4 outColor;
void main() {
  vec4 c = texture(u_src, v_uv);
  float a = clamp(c.a * u_alpha, 0.0, 1.0);
  outColor = vec4(c.rgb * a, a);
}`,Te=`#version 300 es
precision highp float;
uniform sampler2D u_src;
in vec2 v_uv;
out vec4 outColor;
void main() { outColor = texture(u_src, v_uv); }`;class _r{canvas;gl;vao;cache=new Map;present;blit;rect;flips=new Map;a;b;history;base;baseReady=!1;textures=[];boxes=new Float32Array(O*4);cfgs=new Float32Array(O*4);w=0;h=0;error=null;broken=new Set;constructor(t){const o=Ht(t);if(o===null)throw new Error("this browser has no WebGL2");this.canvas=t,this.gl=o,this.vao=Vt(o),this.present=V(o,ae,es),this.blit=V(o,ae,Te),this.rect=V(o,Xt,Te);for(const s of[this.present,this.blit,this.rect])this.flips.set(s,o.getUniformLocation(s,"u_flip"));this.a=W(o,2,2),this.b=W(o,2,2),this.history=W(o,2,2),this.base=W(o,2,2)}aim(t,o){this.gl.useProgram(t),this.gl.uniform1f(this.flips.get(t)??null,o==="canvas"?1:-1)}resize(t,o){const s=this.gl,r=Math.max(2,Math.round(t)),n=Math.max(2,Math.round(o));r===this.w&&n===this.h||(this.w=r,this.h=n,this.canvas.width=r,this.canvas.height=n,Y(s,this.a,r,n),Y(s,this.b,r,n),Y(s,this.history,r,n),Y(s,this.base,r,n),this.baseReady=!1)}async setScene(t,o){const s=this.gl;for(const n of this.textures)s.deleteTexture(n);this.textures=[];const r=await Promise.all(t.map(n=>Kt(n.src).catch(()=>null)));this.pending={parts:t,stage:o,images:r},this.baseReady=!1}pending=null;buildBase(){const t=this.gl,o=this.pending;if(t.bindFramebuffer(t.FRAMEBUFFER,this.base.fb),t.viewport(0,0,this.w,this.h),t.disable(t.BLEND),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),o!==null){t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),this.aim(this.rect,"buffer"),t.bindVertexArray(this.vao),t.uniform1i(t.getUniformLocation(this.rect,"u_src"),0);const s=t.getUniformLocation(this.rect,"u_rect");t.activeTexture(t.TEXTURE0);for(let r=0;r<o.parts.length;r++){const n=o.images[r],l=o.parts[r];if(n==null||l===void 0)continue;const u=Yt(t,n);this.textures.push(u),t.bindTexture(t.TEXTURE_2D,u);const b=l.w/o.stage.w;t.uniform4f(s,l.x/o.stage.w+(l.flip===!0?b:0),l.y/o.stage.h,l.flip===!0?-b:b,l.h/o.stage.h),t.drawArrays(t.TRIANGLES,0,B)}t.disable(t.BLEND)}t.bindFramebuffer(t.FRAMEBUFFER,null),this.baseReady=!0}compiled(t){const o=this.cache.get(t.id);if(o!==void 0)return o;const s=this.gl;try{const r=V(s,ae,Qt(t)),n={};for(const u of["u_src","u_prev","u_res","u_time","u_bars","u_bar","u_beat","u_mix","u_flip","u_regions","u_outside","u_regionBox[0]","u_regionCfg[0]"])n[u]=s.getUniformLocation(r,u);n.u_spill=s.getUniformLocation(r,"u_spill");for(const u of t.params)n[`p_${u.key}_now`]=s.getUniformLocation(r,`p_${u.key}_now`),n[`p_${u.key}_ago`]=s.getUniformLocation(r,`p_${u.key}_ago`);const l={program:r,effect:t,locs:n};return this.cache.set(t.id,l),l}catch(r){return this.error=`${t.id}: ${String(r instanceof Error?r.message:r)}`,null}}draw(t,o,s){const r=this.gl;if(this.w===0)return;this.baseReady||this.buildBase(),this.broken.clear(),r.bindVertexArray(this.vao),r.disable(r.BLEND),r.viewport(0,0,this.w,this.h);let n=this.a,l=this.b;r.bindFramebuffer(r.FRAMEBUFFER,n.fb),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),t.mount==="plate"&&(this.aim(this.blit,"buffer"),r.uniform1i(r.getUniformLocation(this.blit,"u_src"),0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,this.base.tex),r.drawArrays(r.TRIANGLES,0,B));for(const u of t.layers){if(!u.on)continue;const b=le(u.effect);if(b===void 0)continue;const g=this.compiled(b);if(g===null){this.broken.add(u.id);continue}const p=o.resolve(`${u.id}/mix`,u.mix,1);if(p<=5e-4)continue;const a=h=>g.locs[h]??null;r.bindFramebuffer(r.FRAMEBUFFER,l.fb),r.useProgram(g.program),r.uniform1i(a("u_src"),0),r.uniform1i(a("u_prev"),1),r.uniform2f(a("u_res"),this.w,this.h),r.uniform1f(a("u_time"),s.time),r.uniform1f(a("u_bars"),s.bars),r.uniform1f(a("u_bar"),s.bar),r.uniform1f(a("u_beat"),s.beat),r.uniform1f(a("u_mix"),p),r.uniform1f(a("u_flip"),-1);const c=(u.regions??[]).slice(0,O);if(r.uniform1i(a("u_regions"),c.length),r.uniform1i(a("u_outside"),u.outside===!0?1:0),c.length>0){for(let h=0;h<c.length;h++){const d=c[h];if(d===void 0)continue;this.boxes[h*4]=d.x,this.boxes[h*4+1]=d.y,this.boxes[h*4+2]=d.w,this.boxes[h*4+3]=d.h,this.cfgs[h*4]=d.shape==="ellipse"?1:0,this.cfgs[h*4+1]=d.feather;const m=1-(d.drift??pe)*o.wander(d.id);this.cfgs[h*4+2]=o.resolve(`${u.id}/${d.id}`,d.amount,1)*m,this.cfgs[h*4+3]=d.rot}r.uniform4fv(a("u_regionBox[0]"),this.boxes.subarray(0,c.length*4)),r.uniform4fv(a("u_regionCfg[0]"),this.cfgs.subarray(0,c.length*4))}const f=u.lag??ze;r.uniform1f(a("u_spill"),Math.max(0,Math.min(1,u.spill??Pe)));for(const h of b.params){const d=`${u.id}/${h.key}`,m=u.params[h.key],w=x=>Math.max(h.min,Math.min(h.max,x)),$=o.resolve(d,m,h.def);r.uniform1f(a(`p_${h.key}_now`),w($)),r.uniform1f(a(`p_${h.key}_ago`),w(f>0?o.lagged(d,f,$):$))}r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,n.tex),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,this.history.tex),r.drawArrays(r.TRIANGLES,0,B);const v=n;n=l,l=v}r.bindFramebuffer(r.FRAMEBUFFER,this.history.fb),this.aim(this.blit,"buffer"),r.uniform1i(r.getUniformLocation(this.blit,"u_src"),0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,n.tex),r.drawArrays(r.TRIANGLES,0,B),r.bindFramebuffer(r.FRAMEBUFFER,null),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),this.aim(this.present,"canvas"),r.uniform1i(r.getUniformLocation(this.present,"u_src"),0),r.uniform1f(r.getUniformLocation(this.present,"u_alpha"),t.opacity),r.bindTexture(r.TEXTURE_2D,n.tex),r.drawArrays(r.TRIANGLES,0,B),r.bindVertexArray(null)}clearHistory(){const t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.history.fb),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindFramebuffer(t.FRAMEBUFFER,null)}dispose(){const t=this.gl;for(const o of this.textures)t.deleteTexture(o);for(const o of this.cache.values())t.deleteProgram(o.program);for(const o of[this.a,this.b,this.history,this.base])t.deleteFramebuffer(o.fb),t.deleteTexture(o.tex);t.deleteProgram(this.present),t.deleteProgram(this.blit),t.deleteProgram(this.rect),this.cache.clear(),this.textures=[]}}const ts=""+new URL("char-astra-AVwth5Go.png",import.meta.url).href,L={w:1180,h:720},J=e=>({src:e,x:0,y:0,w:L.w,h:L.h});function N(e,t,o,s,r,n,l=!1){const u=ce[e],b=[];for(let g=0;g<Math.ceil(r/u.h);g++)for(let p=0;p<Math.ceil(s/u.w);p++)b.push({src:u.src,x:t+p*u.w-n.x,y:o+g*u.h-n.y,w:u.w+1,h:u.h+1,flip:p%2===1!==l});return b}function ss(e){const t=Ge(e);return[...N("wall",0,0,e.w,e.tear+Q+30,t),...N("floor",0,e.tear+Q,e.w,e.h-e.tear-Q,t),...N("horizon",0,e.tear-ce.horizon.h*Xe,e.w,ce.horizon.h,t),...N("endwall",0,0,ee,e.h,t,!0),...N("endwall",e.w-ee,0,ee,e.h,t)]}const Ne={id:"greenhouse",name:"the greenhouse",blurb:"Dusk on the farm. The first breach, and the board every fight is played on.",base:[J(He)],over:[C.glasshouse,C.lamp,C.plants,C.fence,...je].map(e=>({src:e.src,x:e.x,y:e.y,w:e.w,h:e.h})),under:"#0b0f11",mountsAt:"ui/Backdrop.tsx — under .bd-plate, over .backdrop"},os={id:"breach",name:"a fight",blurb:"The flat teal paper a breach is played on when it is not on the farm.",base:[J(ke.bg.src)],over:[],under:"#0b0f11",mountsAt:"ui/BreachScene.tsx — behind the board"},rs={id:"inside",name:"inside",blurb:"The interior sheet — the darker paper the indoor fights are cut on.",base:[J(ke.bgInside.src)],over:[],under:"#07090a",mountsAt:"ui/Backs.tsx — behind the board"},as={id:"room",name:"your room",blurb:"The room the tutorial starts in. The real one — console, drawer, and the door out.",base:ss(Ve),over:[],under:"#0a0c0d",draws:"homeroom",mountsAt:"ui/RoomScene.tsx — plate replaces .sheets; over sits above .world"},ns={id:"intro",name:"the cold open",blurb:"The lab you wake up in. Two people you never see the faces of, and one lamp.",base:[J(We)],over:[{src:qe,x:604.6,y:144,w:209.6,h:576,flip:!0},{src:ts,x:26,y:259.2,w:328,h:432},{src:Ce,x:783.6,y:72,w:490.8,h:691.2,flip:!0}],under:"#05070a",mountsAt:"ui/Intro.tsx — over .intro-room, under .intro-lamp"},is={id:"open",name:"the written scenes",blurb:"Show.tsx — the text cold open, the deaths, the ending. Planes and clip-paths, no plate.",base:[],over:[],under:"#1d2427",draws:"paper-room",overOnly:!0,mountsAt:"ui/Show.tsx — over .show-stage, under .show-housing"},z={w:5504,h:3072},K=Math.min(L.w/z.w,L.h/z.h),cs={src:"./title/bg.jpg",x:0,y:0,w:L.w,h:L.h},ls={id:"title",name:"the front door",blurb:"The title screen. A photographed maze, a paper robot being lowered into it, and one button.",base:[cs],over:[],under:"#05070a",draws:"title",frame:{x:(L.w-z.w*K)/2,y:(L.h-z.h*K)/2,w:z.w*K,h:z.h*K},mountsAt:"ui/Title.tsx — plate fills .title-stage, over sits above it"},us={id:"void",name:"nothing",blurb:"No picture at all. For building a light or a grain that goes over anything.",base:[],over:[],under:"#101314",mountsAt:"anywhere — this is an over-mount look"},hs=[ls,ns,as,Ne,os,rs,is,us];function fs(e){return hs.find(t=>t.id===e)??Ne}const ps=Math.PI*2;function Er(e,t){const o=[];for(const s of e)for(const r of Ye)o.push({id:`${s.id}.${r}`,label:`${s.id} ${r}`,group:s.group});o.push({id:"beat",label:"beat",group:"transport",hint:"runs 0→1 across every beat"},{id:"beat.pulse",label:"beat pulse",group:"transport",hint:"lands on the beat and decays"},{id:"bar",label:"bar",group:"transport",hint:"runs 0→1 across the bar"},{id:"bar.pulse",label:"bar pulse",group:"transport",hint:"lands on the downbeat and decays"},{id:"phrase",label:"phrase",group:"transport",hint:"runs 0→1 across the whole loop"},{id:"phrase.pulse",label:"phrase pulse",group:"transport"}),o.push({id:"pressure",label:"pressure",group:"game",hint:"suspicion ÷ the level it notices you at"},{id:"corruption",label:"corruption",group:"game",hint:"the dial. Only ever rises"},{id:"one",label:"always one",group:"game",hint:"for a fixed offset with no movement"});for(const s of t)o.push({id:`lfo.${s.name}`,label:`lfo ${s.name}`,group:"lfo",hint:s.sync?`${s.shape}, ${s.bars} bar${s.bars===1?"":"s"}`:`${s.shape}, ${s.hz} Hz`});return o}function q(e){const t=Math.sin(e*127.1)*43758.5453;return t-Math.floor(t)}function ds(e,t,o){const s=t-Math.floor(t);switch(e.shape){case"sine":return .5+.5*Math.sin(s*ps);case"tri":return s<.5?s*2:2-s*2;case"saw":return s;case"ramp":return 1-s;case"square":return s<e.duty?1:0;case"hold":return q(o+e.phase*977);case"noise":{const r=q(o+e.phase*977),n=q(o+1+e.phase*977),l=s*s*(3-2*s);return r+(n-r)*l}default:return 0}}class ms{laps=0;lastBar=0;lastBars=0;bars=0;seconds=0;tick(t,o){if(this.seconds+=o,!t.playing||t.bars<=0){const s=t.bpm>0?t.bpm:120,r=(t.beatsPerBar||4)*(60/s);this.bars+=o/r;return}t.bars!==this.lastBars&&(this.lastBars=t.bars,this.lastBar=t.bar),t.bar<this.lastBar-1e-6&&(this.laps+=1),this.lastBar=t.bar,this.bars=this.laps*t.bars+t.bar}}const ne=e=>{const t=1-(e-Math.floor(e));return t*t*t},bs=2,k=180;class $r{clock=new ms;values=new Map;falling=new Map;seen=new Set;trails=new Map;memo=new Map;get all(){return this.values}update(t,o,s){const r=Math.min(Math.max(s,.004166666666666667),.1);this.clock.tick(o.beat,r);const n=this.values;n.clear();for(const[c,f]of o.taps){const v=f??Z;n.set(`${c}.level`,v.level),n.set(`${c}.low`,v.low),n.set(`${c}.mid`,v.mid),n.set(`${c}.high`,v.high),n.set(`${c}.hit`,v.hit)}const l=this.clock.bars,u=o.beat.beatsPerBar||4,b=l-Math.floor(l),g=l*u%1,p=o.beat.bars>0?o.beat.bars:16,a=l/p%1;n.set("bar",b),n.set("bar.pulse",ne(b)),n.set("beat",g),n.set("beat.pulse",ne(g)),n.set("phrase",a),n.set("phrase.pulse",ne(a)),n.set("one",1);for(const[c,f]of Object.entries(o.extra))n.set(c,f);for(const c of t.lfos){const f=c.sync?l/Math.max(c.bars,.015625)+c.phase:this.clock.seconds*c.hz+c.phase;n.set(`lfo.${c.name}`,ds(c,f,Math.floor(f)))}if(this.falling.size>0&&this.falling.size!==this.seen.size)for(const c of this.falling.keys())this.seen.has(c)||this.falling.delete(c);this.seen.clear(),this.dt=r}dt=1/60;value(t){return this.values.get(t)??0}resolve(t,o,s){if(o===void 0)return s;if(U(o)){const p=he(o.expr).slots;let a=this.memo.get(t);(a===void 0||a.length<p)&&(a=new Float64Array(p),this.memo.set(t,a));const c=qt(o.expr,f=>this.value(f),s,{dt:this.dt,mem:a});return this.remember(t,c),c}if(!M(o))return o;this.seen.add(t);const r=Math.max(0,Math.min(1,this.value(o.source))),n=o.curve===1?r:Math.pow(r,Math.max(o.curve,.01)),l=this.falling.get(t)??0;let u=n;const b=o.rise??0;b>0&&n>l?u=n+(l-n)*Math.pow(.001,this.dt/b):o.fall>0&&n<l&&(u=n+(l-n)*Math.pow(.001,this.dt/o.fall)),this.falling.set(t,u);const g=o.base+o.depth*u;return this.remember(t,g),g}remember(t,o){let s=this.trails.get(t);s===void 0&&(s={t:new Float64Array(k),v:new Float32Array(k),i:0,full:!1},this.trails.set(t,s)),s.t[s.i]=this.clock.seconds,s.v[s.i]=o,s.i=(s.i+1)%k,s.i===0&&(s.full=!0)}last(t){const o=this.trails.get(t);return o===void 0||(o.full?k:o.i)===0?Number.NaN:o.v[(o.i-1+k)%k]??Number.NaN}lagged(t,o,s){const r=this.trails.get(t);if(r===void 0)return s;const n=r.full?k:r.i;if(n===0)return s;const l=this.clock.seconds-Math.max(0,Math.min(o,bs)),u=(r.i-1+k)%k;let b=u;for(let g=0;g<n;g++){const p=(u-g+k)%k;if(r.t[p]<=l){const a=r.t[p],c=r.t[b],f=r.v[p],v=r.v[b];return c<=a?f:f+(v-f)*((l-a)/(c-a))}b=p}return r.v[b]}wander(t){let o=2166136261;for(let g=0;g<t.length;g++)o^=t.charCodeAt(g),o=Math.imul(o,16777619);const s=(o>>>0)/4294967296,r=this.clock.seconds*.13+s*977,n=Math.floor(r),l=r-n,u=q(n+s*31),b=q(n+1+s*31);return u+(b-u)*(l*l*(3-2*l))}}const vs="breach",gs="breach",ws="breach",xs="plate",ys="normal",_s=1,Es=`for breaches
`,$s=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.52,duty:.5},{id:"lfo-trip",name:"trip",shape:"sine",sync:!0,bars:16,hz:.25,phase:.29,duty:.5},{id:"lfo-counter",name:"counter",shape:"sine",sync:!0,bars:16,hz:.25,phase:.5,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5}],Ts=[{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"ripple-1",effect:"ripple",on:!0,mix:1,params:{amount:{expr:".002+music.low/400"},freq:22.7,speed:.351,cx:.5,cy:.5}},{id:"kaleido-1",effect:"kaleido",on:!0,mix:.086,params:{slices:5,spin:.01,zoom:2.04,cx:.258,cy:.685}}],As={id:vs,name:gs,scene:ws,mount:xs,blend:ys,opacity:_s,notes:Es,lfos:$s,layers:Ts},Ss="cold-open",ks="cold open",Rs="intro",Ms="plate",Ls="normal",Is=1,Fs=`this is for the intro, the new one with voices

The wobble's mix was wired straight to music.low, which is a full-range 0..1 signal — so the pass snapped fully on at each kick and fully off between them. It is smoothed now, and floored at 0.25 so it swells rather than flickering in and out of existence.
`,Us=[{id:"lfo-drift",name:"drift",shape:"noise",sync:!0,bars:32,hz:.25,phase:.07,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:6,hz:.25,phase:0,duty:.5},{id:"lfo-b",name:"b",shape:"sine",sync:!0,bars:12,hz:.25,phase:0,duty:.5},{id:"lfo-c",name:"c",shape:"sine",sync:!0,bars:16,hz:.25,phase:0,duty:.5}],Ps=[{id:"flow-2",effect:"flow",on:!0,mix:1,params:{amount:.032,scale:1.66,speed:.542,warp:.199}},{id:"wobble-3",effect:"wobble",on:!0,mix:{expr:"0.25 + smooth(music.low, 0.35) * 0.5"},params:{amount:.009,angle:{expr:"lfo.a"},spin:{expr:".1"},sep:1}},{id:"bloom-5",effect:"bloom",on:!0,mix:.289,params:{amount:.723,threshold:{expr:".5+lfo.c/5"},radius:{expr:"lfo.b*20"}}}],zs=["intro"],Os={id:Ss,name:ks,scene:Rs,mount:Ms,blend:Ls,opacity:Is,notes:Fs,lfos:Us,layers:Ps,wears:zs},Bs="dusk-light",Ns="dusk light",Ds="greenhouse",qs="over",Cs="screen",js=.75,Gs="All light, no picture. Beams through the glass, dust rising, fog on the floor.",Xs=[{id:"lfo-breeze",name:"breeze",shape:"noise",sync:!0,bars:10,hz:.25,phase:0,duty:.5}],Hs=[{id:"l1",effect:"beams",on:!0,mix:1,params:{amount:{source:"music.level",base:.07,depth:.1,curve:1.6,fall:.6},angle:.14,count:4.5,spread:.45,drift:.008,hue:.1}},{id:"l2",effect:"motes",on:!0,mix:1,params:{amount:.22,count:22,size:1.5,rise:.02,hue:.11}},{id:"l3",effect:"fog",on:!0,mix:1,params:{amount:{source:"lfo.breeze",base:.08,depth:.07,curve:1,fall:.12},scale:1.4,speed:.03,hue:.55,sat:.12,height:.55}}],Vs={id:Bs,name:Ns,scene:Ds,mount:qs,blend:Cs,opacity:js,notes:Gs,lfos:Xs,layers:Hs},Ws="front-door",Ys="front-door",Ks="title",Zs="plate",Js="normal",Qs=1,eo=`for the front door
`,to=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.52,duty:.5},{id:"lfo-trip",name:"trip",shape:"sine",sync:!0,bars:16,hz:.25,phase:.29,duty:.5},{id:"lfo-counter",name:"counter",shape:"sine",sync:!0,bars:16,hz:.25,phase:.5,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5},{id:"lfo-b",name:"b",shape:"sine",sync:!0,bars:6,hz:.25,phase:.32,duty:.5}],so=[{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"w1",effect:"wobble",on:!0,mix:{expr:".4+lfo.a/2"},params:{amount:{expr:".002+lag(music.low,.4,.4)/100"},angle:{expr:".3+(lfo.a/2-lfo.b/3)"},spin:-.005,sep:1}},{id:"bloom-2",effect:"bloom",on:!0,mix:1,params:{amount:{expr:".3+lfo.b/10-lfo.a/10"},threshold:{expr:".2+lfo.a/3"},radius:6},regions:[{id:"r3",shape:"rect",x:.49678800856531047,y:.6319440230429301,w:.5082967377234154,h:.2505305378329753,rot:0,feather:.27,amount:1,drift:.08}]},{id:"slice-1",effect:"slice",on:!0,mix:.518,params:{amount:.006,rows:20,speed:2.3,chance:.253}}],oo=["title"],ro={id:Ws,name:Ys,scene:Ks,mount:Zs,blend:Js,opacity:Qs,notes:eo,lfos:to,layers:so,wears:oo},ao="gentle-trip",no="gentle trip",io="greenhouse",co="plate",lo="normal",uo=1,ho=`A gentle trip for the background. The ripple's depth and ring count each swing 20% about where they were set, on two 16-bar sine LFOs half a cycle apart — so the rings crowd in as the depth eases off, and open out as it swells. Nothing lands on a beat; it is meant to be noticed on the second play.

Rates are now per BAR rather than per second — the whole catalogue moved onto the transport, so this stays in time when the record changes tempo. The numbers were converted at 1.935s a bar so it looks exactly as it did.
`,fo=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.52,duty:.5},{id:"lfo-trip",name:"trip",shape:"sine",sync:!0,bars:16,hz:.25,phase:.29,duty:.5},{id:"lfo-counter",name:"counter",shape:"sine",sync:!0,bars:16,hz:.25,phase:.5,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5}],po=[{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.006,y:.006,rate:.067,lag:.84}},{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"w1",effect:"wobble",on:!0,mix:1,params:{amount:{source:"music.low",base:9e-4,depth:.014,curve:3.6,fall:.84},angle:{source:"lfo.slow",base:0,depth:1,curve:1,fall:.12},spin:0,sep:1}},{id:"ripple-1",effect:"ripple",on:!0,mix:1,params:{amount:{expr:".002+music.high/150"},freq:14,speed:1,cx:.5,cy:.5}},{id:"bloom-2",effect:"bloom",on:!0,mix:1,params:{amount:{expr:""},threshold:{expr:".2+lfo.a/3"},radius:6},regions:[{id:"r3",shape:"rect",x:.49678800856531047,y:.20545454545454545,w:.49678800856531047,h:.20545454545454545,rot:0,feather:.27,amount:1,drift:.08}]}],mo={id:ao,name:no,scene:io,mount:co,blend:lo,opacity:uo,notes:ho,lfos:fo,layers:po},bo="greenhouse",vo="greenhouse",go="greenhouse",wo="plate",xo="normal",yo=1,_o=`for the greenhouse
`,Eo=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.52,duty:.5},{id:"lfo-trip",name:"trip",shape:"sine",sync:!0,bars:16,hz:.25,phase:.29,duty:.5},{id:"lfo-counter",name:"counter",shape:"sine",sync:!0,bars:16,hz:.25,phase:.5,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5},{id:"lfo-b",name:"b",shape:"sine",sync:!0,bars:6,hz:.25,phase:.32,duty:.5}],$o=[{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.006,y:.006,rate:.067,lag:.84}},{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"w1",effect:"wobble",on:!0,mix:{expr:".4+lfo.a/2"},params:{amount:{expr:".002+lag(music.low,.4,.4)/100"},angle:{expr:".3+(lfo.a/2-lfo.b/3)"},spin:-.005,sep:1}},{id:"ripple-1",effect:"ripple",on:!0,mix:{expr:".3+lfo.b/2"},params:{amount:{expr:".002+lag(music.high,1,1)/100"},freq:52.7,speed:1,cx:.5,cy:.5}},{id:"bloom-2",effect:"bloom",on:!0,mix:1,params:{amount:{expr:".3+lfo.b/10-lfo.a/10"},threshold:{expr:".2+lfo.a/3"},radius:6},regions:[{id:"r3",shape:"rect",x:.49170326227658456,y:.17579799237720742,w:.5082967377234154,h:.2505305378329753,rot:0,feather:.27,amount:1,drift:.08}]}],To=["greenhouse"],Ao={id:bo,name:vo,scene:go,mount:wo,blend:xo,opacity:yo,notes:_o,lfos:Eo,layers:$o,wears:To},So="home-room",ko="home-room",Ro="room",Mo="plate",Lo="screen",Io=1,Fo="this is for the home-room",Uo=[{id:"lfo-drift",name:"drift",shape:"noise",sync:!0,bars:32,hz:.25,phase:.07,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:6,hz:.25,phase:0,duty:.5},{id:"lfo-b",name:"b",shape:"sine",sync:!0,bars:12,hz:.25,phase:0,duty:.5},{id:"lfo-c",name:"c",shape:"sine",sync:!0,bars:16,hz:.25,phase:0,duty:.5}],Po=[{id:"ripple-1",effect:"ripple",on:!0,mix:1,params:{amount:.003,freq:44.8,speed:1,cx:.482,cy:.778}},{id:"pulse-3",effect:"pulse",on:!0,mix:1,params:{amount:.3,radius:.256,soft:.838,cx:.244,cy:.522,hue:{expr:"lag(music.mid,2,1)/2"},ring:0}},{id:"ripple-4",effect:"ripple",on:!0,mix:1,params:{amount:.004,freq:52.2,speed:-.682,cx:.249,cy:.567}}],zo=["room"],Oo={id:So,name:ko,scene:Ro,mount:Mo,blend:Lo,opacity:Io,notes:Fo,lfos:Uo,layers:Po,wears:zo},Bo="infiltrated",No="infiltrated",Do="inside",qo="plate",Co="normal",jo=1,Go="infiltration background always during combats when theres been an infultration move to this",Xo=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:8,hz:.25,phase:.2,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5}],Ho=[{id:"beams-1",effect:"beams",on:!0,mix:1,params:{amount:.262,angle:.352,count:1.3,spread:.541,drift:.143,hue:.567}},{id:"bleed-4",effect:"bleed",on:!0,mix:.186,params:{amount:.093,cx:.675,cy:.5,bias:{expr:"music.low"}},regions:[{id:"r3",shape:"rect",x:.11363412771804315,y:.8923691012244847,w:.9261963848769764,h:.18559530559923842,rot:-.008,feather:0,amount:1,drift:.3}]},{id:"grain-2",effect:"grain",on:!0,mix:.684,params:{amount:.08,size:1.1,speed:9,colour:.043},regions:[{id:"r4",shape:"rect",x:.8238036927100948,y:.17707226267922282,w:.17873868043426822,h:.6715090946797249,rot:0,feather:.35,amount:1,drift:.08},{id:"r5",shape:"rect",x:.5623629876981044,y:.782913275544842,w:.08559322919355261,h:.06566808181410566,rot:0,feather:.35,amount:1,drift:.08},{id:"r6",shape:"rect",x:.11829514514937525,y:.07327432690853983,w:.5237288677387684,h:.6580930349542624,rot:0,feather:.35,amount:1,drift:.08}]}],Vo=[],Wo=["inside"],Yo={id:Bo,name:No,scene:Do,mount:qo,blend:Co,opacity:jo,notes:Go,lfos:Xo,layers:Ho,dress:Vo,wears:Wo},Ko="medium-trip",Zo="medium trip",Jo="room",Qo="plate",er="normal",tr=1,sr=`Background and other elements that need a medium-sized trip.
[NH] "it needs an lfo that slowly moves the depth and rate up and down about 20% each and is on a slow lfo with one of them at 1/2 beat to the other."
So the ripple's depth rides lfo.slow (32 bars) and its rate rides lfo.drift (16 bars) — half the period, and started out of phase. Both are base = centre*0.8 with depth = centre*0.4, which is a sine's 0..1 mapped onto +/-20% of the value the studio filed.
`,or=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.2,duty:.5},{id:"lfo-drift",name:"drift",shape:"sine",sync:!0,bars:16,hz:.5,phase:.55,duty:.5}],rr=[{id:"w1",effect:"wobble",on:!0,mix:1,params:{amount:{source:"music.low",base:9e-4,depth:.0045,curve:1.6,fall:.2},angle:{source:"lfo.slow",base:0,depth:1,curve:1,fall:.12},spin:0,sep:1}},{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.02,y:.019,rate:.173,lag:.39}},{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"ripple-2",effect:"ripple",on:!0,mix:1,params:{amount:{source:"lfo.slow",base:.0304,depth:.0152,curve:1,fall:0},freq:41.1,speed:{source:"lfo.drift",base:.0856,depth:.0428,curve:1,fall:0},cx:.706,cy:.469}}],ar=[],nr={id:Ko,name:Zo,scene:Jo,mount:Qo,blend:er,opacity:tr,notes:sr,lfos:or,layers:rr,dress:ar};function y(e){return Number.isInteger(e)?String(e):String(Number(e.toFixed(4)))}function ie(e,t,o){if(!M(o))return null;const s=o,r=[];s.curve!==1&&r.push(`curve ${y(s.curve)}`),(s.rise??0)>0&&r.push(`rise ${y(s.rise??0)}s`),s.fall>0&&r.push(`fall ${y(s.fall)}s`);const n=`${y(s.base)} → ${y(s.base+s.depth)}`;return`| ${e} | ${t} | \`${s.source}\` | ${n} | ${r.join(", ")||"—"} |`}function Ae(e,t){const o=fs(e.scene),s=[];s.push(`# LOOK REQUEST — ${e.name}`),s.push(""),s.push(`\`${e.id}\` · ${t} · from the look studio (\`looks.html\`)`),s.push(""),e.notes.trim()!==""&&(s.push("> "+e.notes.trim().split(`
`).join(`
> `)),s.push("")),s.push("## Where it goes"),s.push(""),s.push(`- **built against** — ${o.name} (\`${o.id}\`)`);const r=e.wears??[];s.push(r.length===0?"- **wears in** — anywhere. It declares no scenes, so any host may mount it":`- **wears in** — ONLY ${r.map(a=>`\`${a}\``).join(", ")}. \`Look.tsx\` renders nothing elsewhere`),s.push(`- **mount** — ${e.mount==="plate"?"PLATE: the canvas replaces the flat background sheet, game props sit over it untouched":`OVER: the canvas sits above the board on \`mix-blend-mode: ${e.blend}\``}`),s.push(`- **opacity** — ${y(e.opacity)}`),s.push(`- **suggested host** — ${o.mountsAt}`),s.push(""),s.push("## The stack"),s.push(""),s.push("Bottom of this list is drawn first."),s.push("");for(const a of e.layers){const c=le(a.effect),f=c?.label??a.effect,v=a.on?"":" _(muted)_",h=M(a.mix)?`mix ← \`${a.mix.source}\``:U(a.mix)?`mix = \`${a.mix.expr}\``:`mix ${y(a.mix)}`;s.push(`- **${f}** — ${h}${v}`);const d=[];for(const m of c?.params??[]){const w=a.params[m.key];if(M(w)||U(w))continue;const $=typeof w=="number"?w:m.def;$!==m.def&&d.push(`${m.label} ${y($)}`)}d.length>0&&s.push(`  - ${d.join(" · ")}`);for(const m of a.regions??[]){const w=M(m.amount)?`${y(m.amount.base)} → ${y(m.amount.base+m.amount.depth)} ← \`${m.amount.source}\``:U(m.amount)?`\`${m.amount.expr}\``:y(m.amount),$=m.rot===0?"":`, turned ${y(m.rot)}`;s.push(`  - ${m.shape==="ellipse"?"oval":"box"} at ${y(m.x)}, ${y(m.y)} · ${y(m.w*2)} × ${y(m.h*2)} of the frame${$} · edge ${y(m.feather)} · at ${w}`)}if((a.regions??[]).length>0){a.outside===!0&&s.push("  - **inverted** — the effect lands everywhere EXCEPT those");const m=a.spill??Pe,w=a.lag??ze;s.push(m===0?"  - the rest of the screen gets **nothing** — a hard mask":`  - the rest of the screen gets **${y(m)}** of it, **${y(w)}s** behind`);const $=(a.regions??[]).map(x=>x.drift??pe);$.some(x=>x>0)&&s.push(`  - each region wanders off that by up to ${$.map(y).join(", ")} on its own noise`)}}e.layers.length===0&&s.push("_(empty)_"),s.push(""),s.push("## What moves"),s.push("");const n=[];for(const a of e.layers){const c=le(a.effect)?.label??a.effect,f=ie(c,"mix",a.mix);f!==null&&n.push(f);for(const[v,h]of Object.entries(a.params)){const d=ie(c,v,h);d!==null&&n.push(d)}for(const[v,h]of(a.regions??[]).entries()){const d=ie(c,`region ${v+1}`,h.amount);d!==null&&n.push(d)}}n.length===0?s.push("Nothing. Every parameter in this look is a fixed number."):(s.push("| layer | knob | driven by | range | shaping |"),s.push("| --- | --- | --- | --- | --- |"),s.push(...n)),s.push("");const l=(e.dress??[]).filter(a=>a.on);if(l.length>0){s.push("## The interface"),s.push(""),s.push("Driven by CSS, not by the shader — a canvas cannot see the cards. Written as the"),s.push("independent `translate`/`rotate`/`scale` properties, so the game keeps its own"),s.push("`transform` on every one of these. See `looks/dresser.ts`."),s.push("");for(const a of l){const c=Re(a.target),f=[];for(const v of ue){const h=a.moves[v.key];h!==void 0&&(M(h)?f.push(`${v.label} ${y(h.base)} → ${y(h.base+h.depth)} ← \`${h.source}\``):U(h)?f.push(`${v.label} = \`${h.expr}\``):Math.abs(h-v.def)>1e-4&&f.push(`${v.label} ${y(h)}`))}s.push(`- **${c?.name??a.target}** (\`${c?.selector??"?"}\`)`),s.push(f.length>0?`  - ${f.join(" · ")}`:"  - _(nothing turned)_")}s.push("")}const u=e.lfos.filter(a=>Ee(e).includes(`lfo.${a.name}`));if(u.length>0){s.push("## The LFOs it uses"),s.push("");for(const a of u){const c=a.sync?`${y(a.bars)} bar${a.bars===1?"":"s"} — locked to the transport`:`${y(a.hz)} Hz — free running`,f=a.phase===0?"":`, phase ${y(a.phase)}`;s.push(`- \`lfo.${a.name}\` — ${a.shape}, ${c}${f}`)}s.push("")}const b=e.layers.filter(a=>a.on).length,g=e.layers.some(a=>a.on&&a.effect==="trails");s.push("## What it costs"),s.push(""),s.push(`- ${b} full-screen pass${b===1?"":"es"} per frame at 1180×720`),s.push(`- ${g?"holds a feedback buffer (one extra full-screen texture)":"no feedback buffer"}`);const p=e.layers.filter(a=>a.on&&(a.regions??[]).length>0).length;return p>0&&s.push(`- ${p} pass${p===1?"":"es"} masked to regions — cheaper than it looks, the mask short-circuits`),s.push(`- listens to: ${Ee(e).map(a=>`\`${a}\``).join(", ")||"nothing"}`),s.push(""),s.push("## To pick this up"),s.push(""),s.push("```"),s.push(`the look studio filed ${e.id} — wire it into the game`),s.push("```"),s.push(""),s.push(`The patch is next to this file at \`design/looks/${e.id}.look.json\`. It is`),s.push("the same format `src/breach/looks/render.ts` already reads, so wiring it in is"),s.push("mounting `<Look>` in the host above and pointing it at this id — not a port."),s.push(""),s.join(`
`)}const ir=Object.assign({"../../../design/looks/breach.look.json":As,"../../../design/looks/cold-open.look.json":Os,"../../../design/looks/dusk-light.look.json":Vs,"../../../design/looks/front-door.look.json":ro,"../../../design/looks/gentle-trip.look.json":mo,"../../../design/looks/greenhouse.look.json":Ao,"../../../design/looks/home-room.look.json":Oo,"../../../design/looks/infiltrated.look.json":Yo,"../../../design/looks/medium-trip.look.json":nr}),Tr=new Map(Object.entries(ir).map(([e,t])=>{const o=e.split("/").pop()?.replace(".look.json","")??t.id;return[o,Oe({...t,id:o},Le)]})),cr=()=>new Date().toISOString().replace(/\.\d+Z$/,"Z");async function Ar(e,t){const o=cr(),s=JSON.stringify({look:e,stamp:o,brief:t?Ae(e,o):null});try{const r=await fetch("/__looks/save",{method:"POST",headers:{"content-type":"application/json"},body:s});return r.ok?{ok:!0,where:((await r.json()).files??[]).join("  ·  ")}:{ok:!1,where:`the dev server said ${r.status}`}}catch{return Se(`${e.id}.look.json`,JSON.stringify(e,null,2),"application/json"),t&&Se(`${e.id}.request.md`,Ae(e,o),"text/markdown"),{ok:!1,where:"no dev server — downloaded instead"}}}function Se(e,t,o){const s=URL.createObjectURL(new Blob([t],{type:o})),r=document.createElement("a");r.href=s,r.download=e,r.click(),setTimeout(()=>URL.revokeObjectURL(s),4e3)}const De="breach.look.draft";function Sr(e){try{localStorage.setItem(De,JSON.stringify(e))}catch{}}function kr(){try{const e=localStorage.getItem(De);return e===null?null:Oe(JSON.parse(e),Le)}catch{return null}}export{yr as A,Ar as B,br as C,pe as D,Mt as E,mr as F,dr as G,wr as H,ze as L,ue as M,O as R,Pe as S,st as T,hr as a,U as b,qt as c,pr as d,le as e,he as f,L as g,gr as h,M as i,kr as j,$r as k,xr as l,Tr as m,fe as n,Er as o,_r as p,fr as q,vr as r,fs as s,Re as t,Sr as u,hs as v,ur as w,Oe as x,Le as y,ye as z};
