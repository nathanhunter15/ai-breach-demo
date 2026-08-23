import{R as B,h as P,L as Te,P as Ae,A as de}from"./room-ejcTTR6n.js";const j={level:0,low:0,mid:0,high:0,hit:0,raw:0},Re=["level","low","mid","high","hit"],V=1024,Se=[[20,180],[180,2e3],[2e3,12e3]],$e=.87,L=.015,ke=.86,Me=.02,Fe=.02;function Le(t,s){return s>=.999?t:s<=.001?j:{level:t.level*s,low:t.low*s,mid:t.mid*s,high:t.high*s,hit:t.hit*s,raw:t.raw*s}}function O(t,s,r,e){if(s>=t||r<=0)return s;const o=Math.pow(.001,e/r);return s+(t-s)*o}function D(t,s,r){return Math.max(0,Math.min(1,(t-s)/Math.max(r-s,Me)))}function z(t,s,r){return Math.max(L,s>t?s:t*Math.pow($e,r))}function N(t,s,r){return s<t?s:s+(t-s)*Math.pow(ke,r)}class es{ctx;chans=new Map;constructor(s){this.ctx=s}get names(){return[...this.chans.keys()]}tap(s,r){if(this.chans.has(s))return;const e=this.ctx.createAnalyser();e.fftSize=V,e.smoothingTimeConstant=0,r.connect(e);const o=this.ctx.sampleRate/2,n=V/2,c=Se.map(([h,v])=>{const m=Math.max(1,Math.floor(h/o*n)),i=Math.min(n-1,Math.ceil(v/o*n));return[m,Math.max(m+1,i)]});this.chans.set(s,{analyser:e,freq:new Uint8Array(n),time:new Uint8Array(V),bins:c,last:new Float32Array(n),ceil:{level:L,low:L,mid:L,high:L,flux:.02},base:{level:0,low:0,mid:0,high:0},smoothed:{level:0,low:0,mid:0,high:0},hit:0,trim:1,reading:j})}has(s){return this.chans.has(s)}read(s){return this.chans.get(s)?.reading??j}trim(s,r){const e=this.chans.get(s);e!==void 0&&(e.trim=Math.max(0,r))}all(){const s=new Map;for(const[r,e]of this.chans)s.set(r,Le(e.reading,e.trim));return s}update(s){const r=Math.min(Math.max(s,.004166666666666667),.1);for(const e of this.chans.values())this.one(e,r)}one(s,r){const{analyser:e,freq:o,time:n,bins:c,last:h}=s;e.getByteFrequencyData(o),e.getByteTimeDomainData(n);let v=0;for(let w=0;w<n.length;w++){const A=((n[w]??128)-128)/128;v+=A*A}const m=Math.sqrt(v/n.length),i=w=>{if(w===void 0)return 0;const[A,M]=w;let re=0;for(let X=A;X<M;X++)re+=o[X]??0;return re/((M-A)*255)},u=i(c[0]),l=i(c[1]),b=i(c[2]);let d=0;for(let w=1;w<o.length;w++){const A=(o[w]??0)/255,M=A-(h[w]??0);M>0&&(d+=M),h[w]=A}d/=o.length;const p=s.ceil,f=s.base;p.level=z(p.level,m,r),p.low=z(p.low,u,r),p.mid=z(p.mid,l,r),p.high=z(p.high,b,r),p.flux=Math.max(.004,d>p.flux?d:p.flux*Math.pow(.9,r)),f.level=N(f.level,m,r),f.low=N(f.low,u,r),f.mid=N(f.mid,l,r),f.high=N(f.high,b,r);const x=s.smoothed;x.level=O(x.level,D(m,f.level,p.level),.16,r),x.low=O(x.low,D(u,f.low,p.low),.1,r),x.mid=O(x.mid,D(l,f.mid,p.mid),.12,r),x.high=O(x.high,D(b,f.high,p.high),.08,r);const y=Math.min(1,Math.max(0,(d/p.flux-.55)/.45)),T=s.hit*Math.pow(Fe,r);s.hit=Math.max(T,y),s.reading={level:x.level,low:x.low,mid:x.mid,high:x.high,hit:s.hit,raw:m}}dispose(){for(const s of this.chans.values())s.analyser.disconnect();this.chans.clear()}}const E=(t,s,r,e,o,n,c=.001,h)=>({key:t,label:s,channel:r,min:e,max:o,def:n,step:c,hint:h}),Z=[E("x","across","translate",-80,80,0,.1),E("y","up","translate",-80,80,0,.1),E("turn","turn","rotate",-.25,.25,0),E("scale","size","scale",.7,1.3,1),E("blur","blur","filter",0,14,0,.05),E("bright","brightness","filter",.4,1.8,1),E("sat","saturation","filter",0,2.5,1),E("hue","hue turn","filter",-.5,.5,0),E("contrast","contrast","filter",.4,1.8,1),E("glow","glow","filter",0,30,0,.1,"a drop shadow with no offset, so it reads as light"),E("fade","fade","opacity",0,1,1)],oe=new Map(Z.map(t=>[t.key,t])),Ie=[{id:"board",name:"the whole board",selector:".stage > *",blurb:"Every layer at once. Start here, then take pieces out of it.",filterSafe:!0},{id:"farm",name:"the farm",selector:".backdrop",blurb:"The backdrop and everything cut off it — props, leaves, birds.",filterSafe:!0},{id:"props",name:"the furniture",selector:".bd-prop",blurb:"The glasshouse, the lamp, the plants, the fence.",filterSafe:!0},{id:"leaves",name:"the loose leaves",selector:".bd-leaf",blurb:"Eighteen of them, already scooting on their own timers.",filterSafe:!0},{id:"puppets",name:"the puppets",selector:".rig",blurb:"You and whatever is standing opposite you.",filterSafe:!0},{id:"hand",name:"your hand",selector:".hand",blurb:"The row of cards, as one thing.",filterSafe:!0},{id:"cards",name:"the cards",selector:".card",blurb:"Each card on its own. No filter — they carry their own shadows.",filterSafe:!1},{id:"piles",name:"the piles",selector:".pile",blurb:"Draw and discard.",filterSafe:!0},{id:"chips",name:"the chips",selector:".chip-holder",blurb:"The counters along the top.",filterSafe:!0},{id:"intent",name:"what it intends",selector:".intent-strip",blurb:"The strip that says what is coming next turn.",filterSafe:!0},{id:"plates",name:"the name plates",selector:".plate",blurb:"The labels under each puppet.",filterSafe:!0},{id:"ender",name:"end turn",selector:".ender",blurb:"The button. Bind a glow to the beat and it asks to be pressed.",filterSafe:!0},{id:"ticker",name:"the ticker",selector:".ticker",blurb:"The line of running commentary.",filterSafe:!0}];function me(t){return Ie.find(s=>s.id===t)}let ae=0;function ts(t){return ae+=1,{id:`d${ae.toString(36)}`,target:t,on:!0,moves:{}}}const Ue=400,H=["translate","rotate","scale","filter","opacity"],W={translate:"translate",rotate:"rotate",scale:"scale",filter:"filter",opacity:"opacity"};class ss{root;held=new Map;touched=new Set;now=0;constructor(s){this.root=s}apply(s,r,e){this.now=e;const o=new Set;for(const n of s.dress??[]){if(!n.on)continue;const c=me(n.target);if(c===void 0)continue;o.add(n.id);const h=this.hold(n.id,c.selector);if(h.els.length===0)continue;const v=u=>{const l=oe.get(u);return l===void 0?0:r.resolve(`${n.id}/${u}`,n.moves[u],l.def)},m=u=>{const l=oe.get(u);return l!==void 0&&Math.abs(v(u)-l.def)>1e-4},i=new Map;for(const u of H){const b=Z.filter(d=>d.channel===u).map(d=>d.key).some(m)&&(u!=="filter"||c.filterSafe);i.set(u,b?this.build(u,v):null)}for(const[u,l]of i)if(h.wrote.get(u)!==(l??"")){h.wrote.set(u,l??"");for(const b of h.els)b.style.setProperty(W[u],l??""),l!==null&&this.touched.add(b)}}for(const[n,c]of this.held)o.has(n)||(this.strip(c),this.held.delete(n))}build(s,r){switch(s){case"translate":return`${r("x").toFixed(2)}px ${r("y").toFixed(2)}px`;case"rotate":return`${(r("turn")*360).toFixed(3)}deg`;case"scale":return r("scale").toFixed(4);case"opacity":return r("fade").toFixed(3);case"filter":{const e=[],o=r("blur");o>.01&&e.push(`blur(${o.toFixed(2)}px)`);const n=r("bright");Math.abs(n-1)>1e-4&&e.push(`brightness(${n.toFixed(3)})`);const c=r("sat");Math.abs(c-1)>1e-4&&e.push(`saturate(${c.toFixed(3)})`);const h=r("hue");Math.abs(h)>1e-4&&e.push(`hue-rotate(${(h*360).toFixed(2)}deg)`);const v=r("contrast");Math.abs(v-1)>1e-4&&e.push(`contrast(${v.toFixed(3)})`);const m=r("glow");return m>.01&&e.push(`drop-shadow(0 0 ${m.toFixed(2)}px currentColor)`),e.join(" ")}default:return""}}hold(s,r){let e=this.held.get(s);if(e===void 0&&(e={els:[],at:-1e9,wrote:new Map},this.held.set(s,e)),this.now-e.at>Ue||e.els.length===0){e.at=this.now;const o=[...this.root.querySelectorAll(r)].filter(n=>n instanceof HTMLElement);(o.length!==e.els.length||o.some((n,c)=>n!==e.els[c]))&&(this.strip(e),e.els=o,e.wrote.clear())}return e}strip(s){for(const r of s.els){for(const e of H)r.style.setProperty(W[e],"");this.touched.delete(r)}s.wrote.clear()}clear(){for(const s of this.held.values())this.strip(s);for(const s of this.touched)for(const r of H)s.style.setProperty(W[r],"");this.touched.clear(),this.held.clear()}}const a=(t,s,r,e,o,n=.001,c={})=>({key:t,label:s,min:r,max:e,def:o,step:n,...c}),Be={id:"wobble",label:"RGB wobble",group:"colour",blurb:"The three channels pull apart along a line that turns. The house preset.",needsImage:!0,params:[a("amount","split",0,.03,.0025),a("angle","angle",0,1,0),a("spin","spin",-.5,.5,.03),a("sep","green centred",0,1,1,1,{options:["no","yes"],hint:"off pushes green the other way, which reads dirtier"})],glsl:`
vec4 fx(vec2 uv) {
  float a = (p_angle + u_bars * p_spin) * TAU;
  vec2 d = vec2(cos(a), sin(a)) * p_amount / ASP;
  vec4 c = src(uv);
  float r = src(uv + d).r;
  float b = src(uv - d).b;
  float g = p_sep > 0.5 ? c.g : src(uv + d.yx * 0.6).g;
  return vec4(r, g, b, c.a);
}`},Pe={id:"ripple",label:"ripple",group:"move",blurb:"Rings running out from a point, like something was dropped in it.",needsImage:!0,params:[a("amount","depth",0,.06,.004),a("freq","rings",1,60,14,.1),a("speed","speed",-4,4,1),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP;
  float r = length(d);
  float w = sin(r * p_freq - u_bars * p_speed * TAU * 0.5);
  vec2 off = normalize(d + 1e-6) * w * p_amount;
  return src(uv + off / ASP);
}`},Oe={id:"flow",label:"flow",group:"move",blurb:"Soft noise pushes the picture around. Heat off a road; paper breathing.",needsImage:!0,params:[a("amount","depth",0,.08,.006),a("scale","grain",.5,12,2.4,.01),a("speed","speed",0,2,.14),a("warp","churn",0,1,.35)],glsl:`
vec4 fx(vec2 uv) {
  vec2 q = uv * ASP * p_scale;
  float t = u_bars * p_speed;
  vec2 w = vec2(fbm(q + vec2(t, 0.0)), fbm(q + vec2(0.0, t) + 31.7));
  vec2 n = vec2(fbm(q + w * p_warp * 2.0 + 5.2), fbm(q - w * p_warp * 2.0 + 17.3));
  return src(uv + (n - 0.5) * p_amount);
}`},De={id:"breathe",label:"breathe",group:"move",blurb:"Scale about a point. Bind it to the kick and the room has a pulse.",needsImage:!0,params:[a("amount","zoom",-.2,.2,.008),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5),a("roll","roll",-.2,.2,0)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP;
  d = rot(p_roll * TAU) * d;
  d /= (1.0 + p_amount);
  return src(c + d / ASP);
}`},ze={id:"sway",label:"sway",group:"move",blurb:"Two slow sines, out of phase, so the drift never repeats on itself.",needsImage:!0,params:[a("x","across",0,.06,.006),a("y","up",0,.06,.003),a("rate","rate",0,1,.08),a("lag","lag",0,1,.25,.01,{hint:"how far behind the vertical runs"})],glsl:`
vec4 fx(vec2 uv) {
  float t = u_bars * p_rate * TAU;
  vec2 off = vec2(sin(t) * p_x, sin(t * 0.73 + p_lag * TAU) * p_y);
  return src(uv + off);
}`},Ne={id:"slice",label:"slice",group:"move",blurb:"Horizontal bands jump sideways. Tape, not glitch — keep it under a hair.",needsImage:!0,params:[a("amount","throw",0,.12,.01),a("rows","bands",2,120,26,1),a("speed","reshuffle",0,20,6,.1),a("chance","how many",0,1,.25)],glsl:`
vec4 fx(vec2 uv) {
  float row = floor(uv.y * p_rows);
  float t = floor(u_bars * p_speed);
  float r = hash21(vec2(row, t));
  float hit = step(1.0 - p_chance, r);
  float dir = hash21(vec2(row + 9.1, t)) * 2.0 - 1.0;
  return src(uv + vec2(dir * p_amount * hit, 0.0));
}`},qe={id:"bleed",label:"bleed",group:"move",blurb:"Smear out from a point. A zoom blur that reads as speed or as glare.",needsImage:!0,params:[a("amount","reach",0,.2,.02),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5),a("bias","bias to light",0,1,.4)],glsl:`
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
}`},Ce={id:"mirror",label:"mirror",group:"mirror",blurb:"Fold one half onto the other. The split moves, which is the whole trick.",needsImage:!0,params:[a("axis","axis",0,2,0,1,{options:["left↔right","top↕bottom","both"]}),a("split","split",0,1,.5),a("flip","keep",0,1,0,1,{options:["near side","far side"]}),a("mix2","fold, or blend",0,1,1,.001,{hint:"1 folds hard, below that ghosts the two halves together"})],glsl:`
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
}`},Ge={id:"kaleido",label:"kaleidoscope",group:"mirror",blurb:"N-fold about a point. Two slices is a mirror; twelve is a rose window.",needsImage:!0,params:[a("slices","slices",2,24,6,1),a("spin","spin",-.5,.5,.01),a("zoom","zoom",.2,3,1,.01),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5)],glsl:`
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
}`},je={id:"tile",label:"tile",group:"mirror",blurb:"Repeat the frame in a grid, mirrored at every seam so it never breaks.",needsImage:!0,params:[a("count","across",1,6,2,1),a("rows","down",1,6,2,1),a("flip","mirror seams",0,1,1,1,{options:["no","yes"]}),a("drift","drift",-.5,.5,0)],glsl:`
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
}`},Xe={id:"river",label:"river of mirrors",group:"mirror",blurb:"Mirrors facing each other along a line, with the reflections flowing through. Breathes.",needsImage:!0,params:[a("angle","angle",-.25,.25,0),a("period","mirror spacing",.02,.6,.16),a("flow","flow",-.3,.3,.02,5e-4,{hint:"negative runs it the other way"}),a("ratio","second chain",1,6,2.31,.01,{hint:"off a whole number is what stops it repeating"}),a("tangle","let them interact",0,1,.35),a("reach","reach",.1,3,1,.01,{hint:"how much of the picture each mirror shows"}),a("breathe","breathe",0,.6,.1),a("rate","breath rate",.005,.4,.045),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5)],glsl:`
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
}`},Ve={id:"levels",label:"levels",group:"colour",blurb:"Brightness, contrast, saturation, hue. The one every look ends up wanting.",needsImage:!0,params:[a("bright","brightness",-.5,.5,0),a("contrast","contrast",-1,1,0),a("sat","saturation",-1,1,0),a("hue","hue turn",-.5,.5,0),a("lift","lift blacks",-.2,.3,0)],glsl:`
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
}`},He={id:"tint",label:"tint",group:"colour",blurb:"Push one end of the picture toward a hue. Cold shadows, warm lamps.",needsImage:!0,params:[a("amount","amount",0,1,.12),a("hue","hue",0,1,.55),a("sat","purity",0,1,.5),a("toward","where",0,1,0,1,{options:["shadows","highlights"]})],glsl:`
vec4 fx(vec2 uv) {
  vec4 c = src(uv);
  float l = lum(c.rgb);
  float m = p_toward > 0.5 ? l : 1.0 - l;
  vec3 t = hsv2rgb(vec3(p_hue, p_sat, 1.0));
  return vec4(mix(c.rgb, c.rgb * t * 1.6, m * p_amount), c.a);
}`},We={id:"poster",label:"posterise",group:"colour",blurb:"Fewer steps, with a dither so the bands do not read as a broken screen.",needsImage:!0,params:[a("steps","steps",2,32,10,1),a("dither","dither",0,1,.4)],glsl:`
vec4 fx(vec2 uv) {
  vec4 c = src(uv);
  float n = max(p_steps, 2.0);
  float d = (hash21(floor(uv * u_res) + floor(u_time * 12.0)) - 0.5) * p_dither / n;
  return vec4(floor((c.rgb + d) * n + 0.5) / n, c.a);
}`},Ye={id:"pixel",label:"pixelate",group:"grit",blurb:"Snap to a grid. Bind the size to a hit and it comes apart on the beat.",needsImage:!0,params:[a("size","block",1,64,4,.5),a("round","soften",0,1,0)],glsl:`
vec4 fx(vec2 uv) {
  float s = max(p_size, 1.0);
  vec2 g = u_res / s;
  vec2 q = (floor(uv * g) + 0.5) / g;
  return mix(src(q), src(uv), p_round);
}`},Ke={id:"edge",label:"edges",group:"grit",blurb:"Find the lines and lay them back over the picture. Ink on the paper.",needsImage:!0,params:[a("amount","amount",0,2,.35),a("width","width",.5,6,1.2,.1),a("dark","as",0,1,1,1,{options:["light","ink"]})],glsl:`
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
}`},Je={id:"bloom",label:"bloom",group:"light",blurb:"The bright things spill. A lamp at dusk needs about 0.15 of this.",needsImage:!0,params:[a("amount","amount",0,1.5,.25),a("threshold","from",0,1,.62),a("radius","reach",.5,24,6,.1)],glsl:`
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
}`},Qe={id:"blur",label:"blur",group:"light",blurb:"One direction, nine taps. Cheap, and the only honest way to soften focus.",needsImage:!0,params:[a("amount","amount",0,24,2,.1),a("angle","angle",0,1,0),a("round","both ways",0,1,0,1,{options:["one","cross"]})],glsl:`
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
}`},Ze={id:"vignette",label:"vignette",group:"light",blurb:"Close the corners in. Bind it to pressure and the room narrows on you.",needsImage:!1,params:[a("amount","amount",0,1.5,.35),a("radius","radius",.1,1.4,.78),a("soft","softness",.02,1,.45)],glsl:`
vec4 fx(vec2 uv) {
  vec2 d = (uv - 0.5) * ASP * 1.42;
  float v = smoothstep(p_radius, p_radius - p_soft, length(d));
  float k = 1.0 - (1.0 - v) * p_amount;
  vec4 c = src(uv);
  return vec4(c.rgb * k, mix(c.a, max(c.a, (1.0 - v) * p_amount), 0.0) + (1.0 - v) * p_amount * (1.0 - c.a));
}`},et={id:"fog",label:"fog",group:"light",blurb:"Slow cloud drifting across. Makes its own light — works on an empty canvas.",needsImage:!1,params:[a("amount","amount",0,1,.18),a("scale","size",.3,8,1.6,.01),a("speed","drift",0,.6,.04),a("hue","hue",0,1,.55),a("sat","purity",0,1,.15),a("height","sit low",0,1,.4,.01,{hint:"pulls the cloud toward the floor of the frame"})],glsl:`
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
}`},tt={id:"motes",label:"motes",group:"light",blurb:"Dust in a shaft of light. Rises, wanders, never lands. Makes its own light.",needsImage:!1,params:[a("amount","amount",0,1,.3),a("count","how many",4,80,26,1),a("size","size",.5,6,1.6,.1),a("rise","rise",-.3,.3,.03),a("hue","hue",0,1,.12)],glsl:`
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
}`},st={id:"beams",label:"beams",group:"light",blurb:"Light through glass, at an angle, slowly turning. Makes its own light.",needsImage:!1,params:[a("amount","amount",0,1,.16),a("angle","angle",0,1,.13),a("count","how many",1,20,5,.1),a("spread","softness",.02,1,.4),a("drift","drift",-.2,.2,.01),a("hue","hue",0,1,.11)],glsl:`
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
}`},rt={id:"pulse",label:"pulse",group:"light",blurb:"One soft ring of light from a point. Bind the size to a hit. Makes its own light.",needsImage:!1,params:[a("amount","amount",0,1.5,.3),a("radius","radius",0,1.2,.3),a("soft","softness",.01,1,.35),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5),a("hue","hue",0,1,.08),a("ring","as a ring",0,1,0,1,{options:["filled","ring"]})],glsl:`
vec4 fx(vec2 uv) {
  float r = length((uv - vec2(p_cx, p_cy)) * ASP);
  float a = p_ring > 0.5
    ? smoothstep(p_soft, 0.0, abs(r - p_radius))
    : smoothstep(p_radius, max(p_radius - p_soft, 0.0), r);
  a *= p_amount;
  vec3 col = hsv2rgb(vec3(p_hue, 0.3, 1.0));
  vec4 c = src(uv);
  return vec4(c.rgb + col * a, max(c.a, a));
}`},ot={id:"grain",label:"grain",group:"grit",blurb:"The paper this is all printed on. Makes its own light.",needsImage:!1,params:[a("amount","amount",0,.5,.05),a("size","size",.5,8,1.5,.1),a("speed","boil",0,60,24,1),a("colour","colour",0,1,0)],glsl:`
vec4 fx(vec2 uv) {
  vec2 g = floor(uv * u_res / max(p_size, 0.5));
  float t = floor(u_time * p_speed);
  float n = hash21(g + t * 7.3);
  vec3 nc = vec3(n, hash21(g + t * 7.3 + 11.0), hash21(g + t * 7.3 + 23.0));
  vec3 v = mix(vec3(n), nc, p_colour) - 0.5;
  vec4 c = src(uv);
  return vec4(c.rgb + v * p_amount * 2.0, max(c.a, abs(v.r) * p_amount * 2.0));
}`},at={id:"scan",label:"scanlines",group:"grit",blurb:"Lines, and a roll bar that walks up the screen. Makes its own light.",needsImage:!1,params:[a("amount","lines",0,1,.12),a("count","how many",20,900,260,1),a("roll","roll speed",-2,2,.12),a("bar","roll bar",0,1,.08)],glsl:`
vec4 fx(vec2 uv) {
  float s = sin((uv.y + u_bars * p_roll * 0.02) * p_count * TAU * 0.5) * 0.5 + 0.5;
  float bar = smoothstep(0.7, 1.0, sin((uv.y - u_bars * p_roll * 0.2) * TAU)) * p_bar;
  vec4 c = src(uv);
  float k = 1.0 - s * p_amount;
  return vec4(c.rgb * k + bar, max(c.a, s * p_amount * 0.6 + bar));
}`},nt={id:"trails",label:"trails",group:"time",blurb:"Last frame, moved a little, laid back under this one. The feedback loop.",needsImage:!0,params:[a("feedback","hold",0,.97,.7),a("zoom","zoom",-.06,.06,.004),a("spin","spin",-.06,.06,0),a("driftx","drift x",-.02,.02,0),a("drifty","drift y",-.02,.02,0),a("fade","cool",0,1,.06,.001,{hint:"how fast the held frame loses colour"})],glsl:`
vec4 fx(vec2 uv) {
  vec2 d = (uv - 0.5) * ASP;
  d = rot(p_spin * TAU) * d / (1.0 + p_zoom);
  vec2 q = 0.5 + d / ASP + vec2(p_driftx, p_drifty);
  vec4 old = prev(q);
  old.rgb *= (1.0 - p_fade);
  vec4 now = src(uv);
  vec3 rgb = max(now.rgb, old.rgb * p_feedback);
  return vec4(rgb, max(now.a, old.a * p_feedback));
}`},it=[Be,Oe,ze,De,Pe,Ne,qe,Ce,Ge,je,Xe,Ve,He,We,Je,Qe,Ze,et,st,tt,rt,ot,at,Ye,Ke,nt],be=new Map(it.map(t=>[t.id,t]));function Q(t){return be.get(t)}function ve(t){return be.has(t)}function rs(t){const s={};for(const r of t.params)s[r.key]=r.def;return s}const os=[{id:"move",label:"move"},{id:"mirror",label:"mirror"},{id:"colour",label:"colour"},{id:"light",label:"light"},{id:"grit",label:"grit"},{id:"time",label:"time"}];function S(t){return typeof t=="object"&&t!==null}function as(t,s){return t===void 0?s:S(t)?t.base:t}function _(t,s,r){return{source:s,base:t,depth:r,curve:1,fall:.12}}function ee(t){return{id:`lfo-${t}`,name:t,shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5}}const ge=.25,xe=.18,te=.08;let ne=0;function ie(t={}){return ne+=1,{id:`r${ne.toString(36)}`,shape:"rect",x:.5,y:.5,w:.3,h:.18,rot:0,feather:.35,amount:1,drift:te,...t}}const ns={id:"untitled",name:"untitled",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,lfos:[ee("a")],layers:[],notes:""};let ce=0;function is(t){return ce+=1,`${t}-${ce.toString(36)}`}function le(t){const s=new Set,r=e=>{S(e)&&s.add(e.source)};for(const e of t.layers){r(e.mix);for(const o of Object.values(e.params))r(o);for(const o of e.regions??[])r(o.amount)}for(const e of t.dress??[])for(const o of Object.values(e.moves))r(o);return[...s].sort()}function _e(t,s){return{...t,layers:t.layers.filter(r=>s(r.effect))}}const $=(t,s,r)=>({...ee(t),shape:s,bars:r}),ct=[{id:"rgb-wobble",name:"RGB wobble",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The house preset. The channels part on the low end and drift on a slow LFO.",lfos:[$("slow","sine",8)],layers:[{id:"w1",effect:"wobble",on:!0,mix:1,params:{amount:{..._(9e-4,"music.low",.0045),curve:1.6,fall:.2},angle:_(0,"lfo.slow",1),spin:0,sep:1}},{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.004,y:.002,rate:.097,lag:.25}}]},{id:"glasshouse-breath",name:"glasshouse breath",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The room has a pulse. Zoom on the downbeat, noise drift under it, lamp spills.",lfos:[$("drift","noise",6)],layers:[{id:"b1",effect:"breathe",on:!0,mix:1,params:{amount:{..._(0,"bar.pulse",.011),curve:2,fall:.3},cx:.42,cy:.52,roll:0}},{id:"b2",effect:"flow",on:!0,mix:1,params:{amount:{..._(.002,"music.mid",.004),curve:1.4,fall:.35},scale:2.1,speed:.174,warp:.4}},{id:"b3",effect:"bloom",on:!0,mix:1,params:{amount:{..._(.14,"music.level",.22),curve:1.5,fall:.4},threshold:.66,radius:7}}]},{id:"hat-paper",name:"hi-hat paper",scene:"greenhouse",mount:"over",blend:"soft-light",opacity:.9,notes:"Over-mount. The paper grain moves with the hats; the corners close as pressure rises.",lfos:[],layers:[{id:"g1",effect:"grain",on:!0,mix:1,params:{amount:{..._(.02,"music.high",.07),curve:1.8,fall:.09},size:1.6,speed:24,colour:.15}},{id:"g2",effect:"vignette",on:!0,mix:1,params:{amount:{..._(.1,"pressure",.45),curve:1,fall:1.2},radius:.8,soft:.5}}]},{id:"rose-window",name:"rose window",scene:"greenhouse",mount:"plate",blend:"normal",opacity:.55,notes:"Mirrors, folded on a slow turn. Half opacity because at full it is a screensaver.",lfos:[$("turn","saw",32),$("split","sine",12)],layers:[{id:"k1",effect:"kaleido",on:!0,mix:.5,params:{slices:6,spin:.0077,zoom:_(1.1,"lfo.split",.25),cx:.5,cy:.45}},{id:"k2",effect:"mirror",on:!0,mix:{..._(.15,"music.level",.4),curve:1.6,fall:.5},params:{axis:0,split:_(.42,"lfo.split",.16),flip:0,mix2:1}}]},{id:"signal-rot",name:"signal rot",scene:"inside",mount:"plate",blend:"normal",opacity:1,notes:"For the bad end of a fight. Bands jump on a hit, the frame holds and cools.",lfos:[$("gate","hold",2)],layers:[{id:"s1",effect:"slice",on:!0,mix:{..._(0,"sfx.hit",1),curve:2.2,fall:.22},params:{amount:.035,rows:34,speed:4,chance:.3}},{id:"s2",effect:"trails",on:!0,mix:1,params:{feedback:{..._(.42,"music.low",.3),curve:1.4,fall:.5},zoom:.003,spin:.001,driftx:0,drifty:0,fade:.09}},{id:"s3",effect:"poster",on:!0,mix:.5,params:{steps:14,dither:.5}}]},{id:"dusk-light",name:"dusk light",scene:"greenhouse",mount:"over",blend:"screen",opacity:.75,notes:"All light, no picture. Beams through the glass, dust rising, fog on the floor.",lfos:[$("breeze","noise",10)],layers:[{id:"l1",effect:"beams",on:!0,mix:1,params:{amount:{..._(.07,"music.level",.1),curve:1.6,fall:.6},angle:.14,count:4.5,spread:.45,drift:.0155,hue:.1}},{id:"l2",effect:"motes",on:!0,mix:1,params:{amount:.22,count:22,size:1.5,rise:.039,hue:.11}},{id:"l3",effect:"fog",on:!0,mix:1,params:{amount:_(.08,"lfo.breeze",.07),scale:1.4,speed:.058,hue:.55,sat:.12,height:.55}}]}],lt={id:"river-road",name:"the road, upstream",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The band of soil only. Mirrors along it with the reflections flowing upstream, breathing on a four-bar LFO. Sky and glasshouse untouched.",lfos:[{...ee("breath"),shape:"sine",bars:4}],layers:[{id:"rr1",effect:"river",on:!0,mix:.42,regions:[{...ie(),shape:"rect",x:.5,y:.53,w:.52,h:.135,rot:0,feather:.75,amount:1}],params:{angle:0,period:.17,flow:.0426,ratio:2.31,tangle:.3,reach:1.1,breathe:0,rate:.087,cx:.5,cy:.53}},{id:"rr2",effect:"breathe",on:!0,mix:1,regions:[{...ie(),x:.5,y:.53,w:.52,h:.16,feather:.85,amount:.7}],params:{amount:_(.002,"lfo.breath",.006),cx:.5,cy:.53,roll:0}}]},ut={id:"the-room-breathes",name:"the room breathes",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The interface on the transport. Hand lifts on the downbeat, puppets breathe over four bars, the button glows on the bass. Nothing in seconds — it survives a tempo change.",lfos:[$("breath","sine",4)],layers:[{id:"db1",effect:"breathe",on:!0,mix:1,params:{amount:{..._(0,"bar.pulse",.006),curve:2,fall:.35},cx:.5,cy:.5,roll:0}}],dress:[{id:"dh",target:"hand",on:!0,moves:{y:{..._(0,"bar.pulse",-2.2),curve:2,fall:.28}}},{id:"dp",target:"puppets",on:!0,moves:{scale:_(.997,"lfo.breath",.006),y:_(0,"lfo.breath",-1.4)}},{id:"de",target:"ender",on:!0,moves:{glow:{..._(0,"music.low",7),curve:1.8,fall:.3}}},{id:"dt",target:"ticker",on:!0,moves:{sat:{..._(1,"music.high",.35),curve:1.6,fall:.4}}}]},cs=[...ct,lt,ut],Y=`#version 300 es
in vec2 a_pos;
uniform float u_flip;
out vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos.x, a_pos.y * u_flip, 0.0, 1.0);
}`,ht=`#version 300 es
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
}`,F=6;function ft(t){return t.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1,powerPreference:"low-power"})}function pt(t){const s=t.createVertexArray();if(s===null)throw new Error("no vao");t.bindVertexArray(s);const r=t.createBuffer();return t.bindBuffer(t.ARRAY_BUFFER,r),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.bindVertexArray(null),s}function ue(t,s,r){const e=t.createShader(s);if(e===null)throw new Error("no shader");if(t.shaderSource(e,r),t.compileShader(e),!t.getShaderParameter(e,t.COMPILE_STATUS)){const o=t.getShaderInfoLog(e)??"unknown";throw t.deleteShader(e),new Error(dt(r,o))}return e}function dt(t,s){const r=t.split(`
`).map((e,o)=>`${String(o+1).padStart(3)} | ${e}`);return`${s}
${r.join(`
`)}`}function q(t,s,r){const e=t.createProgram();if(e===null)throw new Error("no program");const o=ue(t,t.VERTEX_SHADER,s),n=ue(t,t.FRAGMENT_SHADER,r);if(t.attachShader(e,o),t.attachShader(e,n),t.bindAttribLocation(e,0,"a_pos"),t.linkProgram(e),t.deleteShader(o),t.deleteShader(n),!t.getProgramParameter(e,t.LINK_STATUS)){const c=t.getProgramInfoLog(e)??"unknown";throw t.deleteProgram(e),new Error(c)}return e}function C(t,s,r){const e=t.createTexture(),o=t.createFramebuffer();if(e===null||o===null)throw new Error("no target");return t.bindTexture(t.TEXTURE_2D,e),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,s,r,0,t.RGBA,t.UNSIGNED_BYTE,null),we(t),t.bindFramebuffer(t.FRAMEBUFFER,o),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),t.bindFramebuffer(t.FRAMEBUFFER,null),{fb:o,tex:e,w:s,h:r}}function G(t,s,r,e){s.w===r&&s.h===e||(t.bindTexture(t.TEXTURE_2D,s.tex),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,r,e,0,t.RGBA,t.UNSIGNED_BYTE,null),s.w=r,s.h=e)}function we(t){t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR)}function mt(t,s){const r=t.createTexture();if(r===null)throw new Error("no texture");return t.bindTexture(t.TEXTURE_2D,r),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,s),we(t),r}function bt(t){return new Promise((s,r)=>{const e=new Image;e.crossOrigin="anonymous",e.onload=()=>s(e),e.onerror=()=>r(new Error(`could not load ${t}`)),e.src=t})}const vt=`
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
}`,k=6,gt=`
uniform int u_regions;
uniform int u_outside;
uniform vec4 u_regionBox[${k}];
uniform vec4 u_regionCfg[${k}];

float maskAt(vec2 uv) {
  if (u_regions == 0) return u_outside == 1 ? 0.0 : 1.0;
  float m = 0.0;
  for (int i = 0; i < ${k}; i++) {
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
}`;function xt(t){return`#version 300 es
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
${t.params.map(r=>`uniform float p_${r.key}_now;
uniform float p_${r.key}_ago;
#define p_${r.key} mix(p_${r.key}_ago, p_${r.key}_now, INSIDE)`).join(`
`)}
in vec2 v_uv;
out vec4 outColor;
${vt}
${gt}
${t.glsl}
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
}`}const _t=`#version 300 es
precision highp float;
uniform sampler2D u_src;
uniform float u_alpha;
in vec2 v_uv;
out vec4 outColor;
void main() {
  vec4 c = texture(u_src, v_uv);
  float a = clamp(c.a * u_alpha, 0.0, 1.0);
  outColor = vec4(c.rgb * a, a);
}`,he=`#version 300 es
precision highp float;
uniform sampler2D u_src;
in vec2 v_uv;
out vec4 outColor;
void main() { outColor = texture(u_src, v_uv); }`;class ls{canvas;gl;vao;cache=new Map;present;blit;rect;flips=new Map;a;b;history;base;baseReady=!1;textures=[];boxes=new Float32Array(k*4);cfgs=new Float32Array(k*4);w=0;h=0;error=null;broken=new Set;constructor(s){const r=ft(s);if(r===null)throw new Error("this browser has no WebGL2");this.canvas=s,this.gl=r,this.vao=pt(r),this.present=q(r,Y,_t),this.blit=q(r,Y,he),this.rect=q(r,ht,he);for(const e of[this.present,this.blit,this.rect])this.flips.set(e,r.getUniformLocation(e,"u_flip"));this.a=C(r,2,2),this.b=C(r,2,2),this.history=C(r,2,2),this.base=C(r,2,2)}aim(s,r){this.gl.useProgram(s),this.gl.uniform1f(this.flips.get(s)??null,r==="canvas"?1:-1)}resize(s,r){const e=this.gl,o=Math.max(2,Math.round(s)),n=Math.max(2,Math.round(r));o===this.w&&n===this.h||(this.w=o,this.h=n,this.canvas.width=o,this.canvas.height=n,G(e,this.a,o,n),G(e,this.b,o,n),G(e,this.history,o,n),G(e,this.base,o,n),this.baseReady=!1)}async setScene(s,r){const e=this.gl;for(const n of this.textures)e.deleteTexture(n);this.textures=[];const o=await Promise.all(s.map(n=>bt(n.src).catch(()=>null)));this.pending={parts:s,stage:r,images:o},this.baseReady=!1}pending=null;buildBase(){const s=this.gl,r=this.pending;if(s.bindFramebuffer(s.FRAMEBUFFER,this.base.fb),s.viewport(0,0,this.w,this.h),s.disable(s.BLEND),s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT),r!==null){s.enable(s.BLEND),s.blendFunc(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA),this.aim(this.rect,"buffer"),s.bindVertexArray(this.vao),s.uniform1i(s.getUniformLocation(this.rect,"u_src"),0);const e=s.getUniformLocation(this.rect,"u_rect");s.activeTexture(s.TEXTURE0);for(let o=0;o<r.parts.length;o++){const n=r.images[o],c=r.parts[o];if(n==null||c===void 0)continue;const h=mt(s,n);this.textures.push(h),s.bindTexture(s.TEXTURE_2D,h),s.uniform4f(e,c.x/r.stage.w,c.y/r.stage.h,c.w/r.stage.w,c.h/r.stage.h),s.drawArrays(s.TRIANGLES,0,F)}s.disable(s.BLEND)}s.bindFramebuffer(s.FRAMEBUFFER,null),this.baseReady=!0}compiled(s){const r=this.cache.get(s.id);if(r!==void 0)return r;const e=this.gl;try{const o=q(e,Y,xt(s)),n={};for(const h of["u_src","u_prev","u_res","u_time","u_bars","u_bar","u_beat","u_mix","u_flip","u_regions","u_outside","u_regionBox[0]","u_regionCfg[0]"])n[h]=e.getUniformLocation(o,h);n.u_spill=e.getUniformLocation(o,"u_spill");for(const h of s.params)n[`p_${h.key}_now`]=e.getUniformLocation(o,`p_${h.key}_now`),n[`p_${h.key}_ago`]=e.getUniformLocation(o,`p_${h.key}_ago`);const c={program:o,effect:s,locs:n};return this.cache.set(s.id,c),c}catch(o){return this.error=`${s.id}: ${String(o instanceof Error?o.message:o)}`,null}}draw(s,r,e){const o=this.gl;if(this.w===0)return;this.baseReady||this.buildBase(),this.broken.clear(),o.bindVertexArray(this.vao),o.disable(o.BLEND),o.viewport(0,0,this.w,this.h);let n=this.a,c=this.b;o.bindFramebuffer(o.FRAMEBUFFER,n.fb),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),s.mount==="plate"&&(this.aim(this.blit,"buffer"),o.uniform1i(o.getUniformLocation(this.blit,"u_src"),0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,this.base.tex),o.drawArrays(o.TRIANGLES,0,F));for(const h of s.layers){if(!h.on)continue;const v=Q(h.effect);if(v===void 0)continue;const m=this.compiled(v);if(m===null){this.broken.add(h.id);continue}const i=r.resolve(`${h.id}/mix`,h.mix,1);if(i<=5e-4)continue;const u=p=>m.locs[p]??null;o.bindFramebuffer(o.FRAMEBUFFER,c.fb),o.useProgram(m.program),o.uniform1i(u("u_src"),0),o.uniform1i(u("u_prev"),1),o.uniform2f(u("u_res"),this.w,this.h),o.uniform1f(u("u_time"),e.time),o.uniform1f(u("u_bars"),e.bars),o.uniform1f(u("u_bar"),e.bar),o.uniform1f(u("u_beat"),e.beat),o.uniform1f(u("u_mix"),i),o.uniform1f(u("u_flip"),-1);const l=(h.regions??[]).slice(0,k);if(o.uniform1i(u("u_regions"),l.length),o.uniform1i(u("u_outside"),h.outside===!0?1:0),l.length>0){for(let p=0;p<l.length;p++){const f=l[p];if(f===void 0)continue;this.boxes[p*4]=f.x,this.boxes[p*4+1]=f.y,this.boxes[p*4+2]=f.w,this.boxes[p*4+3]=f.h,this.cfgs[p*4]=f.shape==="ellipse"?1:0,this.cfgs[p*4+1]=f.feather;const x=1-(f.drift??te)*r.wander(f.id);this.cfgs[p*4+2]=r.resolve(`${h.id}/${f.id}`,f.amount,1)*x,this.cfgs[p*4+3]=f.rot}o.uniform4fv(u("u_regionBox[0]"),this.boxes.subarray(0,l.length*4)),o.uniform4fv(u("u_regionCfg[0]"),this.cfgs.subarray(0,l.length*4))}const b=h.lag??xe;o.uniform1f(u("u_spill"),Math.max(0,Math.min(1,h.spill??ge)));for(const p of v.params){const f=`${h.id}/${p.key}`,x=h.params[p.key],y=w=>Math.max(p.min,Math.min(p.max,w)),T=r.resolve(f,x,p.def);o.uniform1f(u(`p_${p.key}_now`),y(T)),o.uniform1f(u(`p_${p.key}_ago`),y(b>0?r.lagged(f,b,T):T))}o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,n.tex),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,this.history.tex),o.drawArrays(o.TRIANGLES,0,F);const d=n;n=c,c=d}o.bindFramebuffer(o.FRAMEBUFFER,this.history.fb),this.aim(this.blit,"buffer"),o.uniform1i(o.getUniformLocation(this.blit,"u_src"),0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,n.tex),o.drawArrays(o.TRIANGLES,0,F),o.bindFramebuffer(o.FRAMEBUFFER,null),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),this.aim(this.present,"canvas"),o.uniform1i(o.getUniformLocation(this.present,"u_src"),0),o.uniform1f(o.getUniformLocation(this.present,"u_alpha"),s.opacity),o.bindTexture(o.TEXTURE_2D,n.tex),o.drawArrays(o.TRIANGLES,0,F),o.bindVertexArray(null)}clearHistory(){const s=this.gl;s.bindFramebuffer(s.FRAMEBUFFER,this.history.fb),s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT),s.bindFramebuffer(s.FRAMEBUFFER,null)}dispose(){const s=this.gl;for(const r of this.textures)s.deleteTexture(r);for(const r of this.cache.values())s.deleteProgram(r.program);for(const r of[this.a,this.b,this.history,this.base])s.deleteFramebuffer(r.fb),s.deleteTexture(r.tex);s.deleteProgram(this.present),s.deleteProgram(this.blit),s.deleteProgram(this.rect),this.cache.clear(),this.textures=[]}}const I={w:1180,h:720},se=t=>({src:t,x:0,y:0,w:I.w,h:I.h}),ye={id:"greenhouse",name:"the greenhouse",blurb:"Dusk on the farm. The first breach, and the board every fight is played on.",base:[se(Ae)],over:[P.glasshouse,P.lamp,P.plants,P.fence,...Te].map(t=>({src:t.src,x:t.x,y:t.y,w:t.w,h:t.h})),under:"#0b0f11",mountsAt:"ui/Backdrop.tsx — under .bd-plate, over .backdrop"},wt={id:"board",name:"the fight sheet",blurb:"The flat teal paper a breach is played on when it is not on the farm.",base:[se(de.bg.src)],over:[],under:"#0b0f11",mountsAt:"ui/Backs.tsx — behind the board"},yt={id:"inside",name:"inside",blurb:"The interior sheet — the darker paper the indoor fights are cut on.",base:[se(de.bgInside.src)],over:[],under:"#07090a",mountsAt:"ui/Backs.tsx — behind the board"},Et={id:"room",name:"the room",blurb:"The building you walk. Rough: the real one is assembled band by band in code.",base:[{src:B.wall.src,x:0,y:0,w:I.w,h:300},{src:B.floor.src,x:0,y:254,w:I.w,h:466},{src:B.horizon.src,x:0,y:200,w:I.w,h:120}],over:[{src:B.terminal.src,x:760,y:190,w:180,h:150}],under:"#0a0c0d",mountsAt:"ui/RoomScene.tsx — under the bands"},Tt={id:"void",name:"nothing",blurb:"No picture at all. For building a light or a grain that goes over anything.",base:[],over:[],under:"#101314",mountsAt:"anywhere — this is an over-mount look"},At=[ye,wt,yt,Et,Tt];function Rt(t){return At.find(s=>s.id===t)??ye}const St=Math.PI*2;function us(t,s){const r=[];for(const e of t)for(const o of Re)r.push({id:`${e.id}.${o}`,label:`${e.id} ${o}`,group:e.group});r.push({id:"beat",label:"beat",group:"transport",hint:"runs 0→1 across every beat"},{id:"beat.pulse",label:"beat pulse",group:"transport",hint:"lands on the beat and decays"},{id:"bar",label:"bar",group:"transport",hint:"runs 0→1 across the bar"},{id:"bar.pulse",label:"bar pulse",group:"transport",hint:"lands on the downbeat and decays"},{id:"phrase",label:"phrase",group:"transport",hint:"runs 0→1 across the whole loop"},{id:"phrase.pulse",label:"phrase pulse",group:"transport"}),r.push({id:"pressure",label:"pressure",group:"game",hint:"suspicion ÷ the level it notices you at"},{id:"corruption",label:"corruption",group:"game",hint:"the dial. Only ever rises"},{id:"one",label:"always one",group:"game",hint:"for a fixed offset with no movement"});for(const e of s)r.push({id:`lfo.${e.name}`,label:`lfo ${e.name}`,group:"lfo",hint:e.sync?`${e.shape}, ${e.bars} bar${e.bars===1?"":"s"}`:`${e.shape}, ${e.hz} Hz`});return r}function U(t){const s=Math.sin(t*127.1)*43758.5453;return s-Math.floor(s)}function $t(t,s,r){const e=s-Math.floor(s);switch(t.shape){case"sine":return .5+.5*Math.sin(e*St);case"tri":return e<.5?e*2:2-e*2;case"saw":return e;case"ramp":return 1-e;case"square":return e<t.duty?1:0;case"hold":return U(r+t.phase*977);case"noise":{const o=U(r+t.phase*977),n=U(r+1+t.phase*977),c=e*e*(3-2*e);return o+(n-o)*c}default:return 0}}class kt{laps=0;lastBar=0;lastBars=0;bars=0;seconds=0;tick(s,r){if(this.seconds+=r,!s.playing||s.bars<=0){const e=s.bpm>0?s.bpm:120,o=(s.beatsPerBar||4)*(60/e);this.bars+=r/o;return}s.bars!==this.lastBars&&(this.lastBars=s.bars,this.lastBar=s.bar),s.bar<this.lastBar-1e-6&&(this.laps+=1),this.lastBar=s.bar,this.bars=this.laps*s.bars+s.bar}}const K=t=>{const s=1-(t-Math.floor(t));return s*s*s},Mt=2,R=180;class hs{clock=new kt;values=new Map;falling=new Map;seen=new Set;trails=new Map;get all(){return this.values}update(s,r,e){const o=Math.min(Math.max(e,.004166666666666667),.1);this.clock.tick(r.beat,o);const n=this.values;n.clear();for(const[l,b]of r.taps){const d=b??j;n.set(`${l}.level`,d.level),n.set(`${l}.low`,d.low),n.set(`${l}.mid`,d.mid),n.set(`${l}.high`,d.high),n.set(`${l}.hit`,d.hit)}const c=this.clock.bars,h=r.beat.beatsPerBar||4,v=c-Math.floor(c),m=c*h%1,i=r.beat.bars>0?r.beat.bars:16,u=c/i%1;n.set("bar",v),n.set("bar.pulse",K(v)),n.set("beat",m),n.set("beat.pulse",K(m)),n.set("phrase",u),n.set("phrase.pulse",K(u)),n.set("one",1);for(const[l,b]of Object.entries(r.extra))n.set(l,b);for(const l of s.lfos){const b=l.sync?c/Math.max(l.bars,.015625)+l.phase:this.clock.seconds*l.hz+l.phase;n.set(`lfo.${l.name}`,$t(l,b,Math.floor(b)))}if(this.falling.size>0&&this.falling.size!==this.seen.size)for(const l of this.falling.keys())this.seen.has(l)||this.falling.delete(l);this.seen.clear(),this.dt=o}dt=1/60;value(s){return this.values.get(s)??0}resolve(s,r,e){if(r===void 0)return e;if(!S(r))return r;this.seen.add(s);const o=Math.max(0,Math.min(1,this.value(r.source))),n=r.curve===1?o:Math.pow(o,Math.max(r.curve,.01)),c=this.falling.get(s)??0;let h=n;if(r.fall>0&&n<c){const m=Math.pow(.001,this.dt/r.fall);h=n+(c-n)*m}this.falling.set(s,h);const v=r.base+r.depth*h;return this.remember(s,v),v}remember(s,r){let e=this.trails.get(s);e===void 0&&(e={t:new Float64Array(R),v:new Float32Array(R),i:0,full:!1},this.trails.set(s,e)),e.t[e.i]=this.clock.seconds,e.v[e.i]=r,e.i=(e.i+1)%R,e.i===0&&(e.full=!0)}lagged(s,r,e){const o=this.trails.get(s);if(o===void 0)return e;const n=o.full?R:o.i;if(n===0)return e;const c=this.clock.seconds-Math.max(0,Math.min(r,Mt)),h=(o.i-1+R)%R;let v=h;for(let m=0;m<n;m++){const i=(h-m+R)%R;if(o.t[i]<=c){const u=o.t[i],l=o.t[v],b=o.v[i],d=o.v[v];return l<=u?b:b+(d-b)*((c-u)/(l-u))}v=i}return o.v[v]}wander(s){let r=2166136261;for(let m=0;m<s.length;m++)r^=s.charCodeAt(m),r=Math.imul(r,16777619);const e=(r>>>0)/4294967296,o=this.clock.seconds*.13+e*977,n=Math.floor(o),c=o-n,h=U(n+e*31),v=U(n+1+e*31);return h+(v-h)*(c*c*(3-2*c))}}const Ft="dusk-light",Lt="dusk light",It="greenhouse",Ut="over",Bt="screen",Pt=.75,Ot="All light, no picture. Beams through the glass, dust rising, fog on the floor.",Dt=[{id:"lfo-breeze",name:"breeze",shape:"noise",sync:!0,bars:10,hz:.25,phase:0,duty:.5}],zt=[{id:"l1",effect:"beams",on:!0,mix:1,params:{amount:{source:"music.level",base:.07,depth:.1,curve:1.6,fall:.6},angle:.14,count:4.5,spread:.45,drift:.008,hue:.1}},{id:"l2",effect:"motes",on:!0,mix:1,params:{amount:.22,count:22,size:1.5,rise:.02,hue:.11}},{id:"l3",effect:"fog",on:!0,mix:1,params:{amount:{source:"lfo.breeze",base:.08,depth:.07,curve:1,fall:.12},scale:1.4,speed:.03,hue:.55,sat:.12,height:.55}}],Nt={id:Ft,name:Lt,scene:It,mount:Ut,blend:Bt,opacity:Pt,notes:Ot,lfos:Dt,layers:zt},qt="gentle-trip",Ct="gentle trip",Gt="greenhouse",jt="plate",Xt="normal",Vt=1,Ht=`A gentle trip for the background. The ripple's depth and ring count each swing 20% about where they were set, on two 16-bar sine LFOs half a cycle apart — so the rings crowd in as the depth eases off, and open out as it swells. Nothing lands on a beat; it is meant to be noticed on the second play.

Rates are now per BAR rather than per second — the whole catalogue moved onto the transport, so this stays in time when the record changes tempo. The numbers were converted at 1.935s a bar so it looks exactly as it did.
`,Wt=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.2,duty:.5},{id:"lfo-trip",name:"trip",shape:"sine",sync:!0,bars:16,hz:.25,phase:0,duty:.5},{id:"lfo-counter",name:"counter",shape:"sine",sync:!0,bars:16,hz:.25,phase:.5,duty:.5}],Yt=[{id:"w1",effect:"wobble",on:!0,mix:1,params:{amount:{source:"music.low",base:9e-4,depth:.0045,curve:1.6,fall:.2},angle:{source:"lfo.slow",base:0,depth:1,curve:1,fall:.12},spin:0,sep:1}},{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.016,y:.015,rate:.22065,lag:.39}},{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"ripple-2",effect:"ripple",on:!0,mix:1,params:{amount:{source:"lfo.trip",base:.0112,depth:.0056,curve:1,fall:0},freq:{source:"lfo.counter",base:25.84,depth:12.92,curve:1,fall:0},speed:.2071,cx:.034,cy:.047}}],Kt={id:qt,name:Ct,scene:Gt,mount:jt,blend:Xt,opacity:Vt,notes:Ht,lfos:Wt,layers:Yt};function g(t){return Number.isInteger(t)?String(t):String(Number(t.toFixed(4)))}function J(t,s,r){if(!S(r))return null;const e=r,o=[];e.curve!==1&&o.push(`curve ${g(e.curve)}`),e.fall>0&&o.push(`fall ${g(e.fall)}s`);const n=`${g(e.base)} → ${g(e.base+e.depth)}`;return`| ${t} | ${s} | \`${e.source}\` | ${n} | ${o.join(", ")||"—"} |`}function fe(t,s){const r=Rt(t.scene),e=[];e.push(`# LOOK REQUEST — ${t.name}`),e.push(""),e.push(`\`${t.id}\` · ${s} · from the look studio (\`looks.html\`)`),e.push(""),t.notes.trim()!==""&&(e.push("> "+t.notes.trim().split(`
`).join(`
> `)),e.push("")),e.push("## Where it goes"),e.push(""),e.push(`- **scene** — ${r.name} (\`${r.id}\`)`),e.push(`- **mount** — ${t.mount==="plate"?"PLATE: the canvas replaces the flat background sheet, game props sit over it untouched":`OVER: the canvas sits above the board on \`mix-blend-mode: ${t.blend}\``}`),e.push(`- **opacity** — ${g(t.opacity)}`),e.push(`- **suggested host** — ${r.mountsAt}`),e.push(""),e.push("## The stack"),e.push(""),e.push("Bottom of this list is drawn first."),e.push("");for(const i of t.layers){const u=Q(i.effect),l=u?.label??i.effect,b=i.on?"":" _(muted)_",d=S(i.mix)?`mix ← \`${i.mix.source}\``:`mix ${g(i.mix)}`;e.push(`- **${l}** — ${d}${b}`);const p=[];for(const f of u?.params??[]){const x=i.params[f.key];if(S(x))continue;const y=typeof x=="number"?x:f.def;y!==f.def&&p.push(`${f.label} ${g(y)}`)}p.length>0&&e.push(`  - ${p.join(" · ")}`);for(const f of i.regions??[]){const x=S(f.amount)?`${g(f.amount.base)} → ${g(f.amount.base+f.amount.depth)} ← \`${f.amount.source}\``:g(f.amount),y=f.rot===0?"":`, turned ${g(f.rot)}`;e.push(`  - ${f.shape==="ellipse"?"oval":"box"} at ${g(f.x)}, ${g(f.y)} · ${g(f.w*2)} × ${g(f.h*2)} of the frame${y} · edge ${g(f.feather)} · at ${x}`)}if((i.regions??[]).length>0){i.outside===!0&&e.push("  - **inverted** — the effect lands everywhere EXCEPT those");const f=i.spill??ge,x=i.lag??xe;e.push(f===0?"  - the rest of the screen gets **nothing** — a hard mask":`  - the rest of the screen gets **${g(f)}** of it, **${g(x)}s** behind`);const y=(i.regions??[]).map(T=>T.drift??te);y.some(T=>T>0)&&e.push(`  - each region wanders off that by up to ${y.map(g).join(", ")} on its own noise`)}}t.layers.length===0&&e.push("_(empty)_"),e.push(""),e.push("## What moves"),e.push("");const o=[];for(const i of t.layers){const u=Q(i.effect)?.label??i.effect,l=J(u,"mix",i.mix);l!==null&&o.push(l);for(const[b,d]of Object.entries(i.params)){const p=J(u,b,d);p!==null&&o.push(p)}for(const[b,d]of(i.regions??[]).entries()){const p=J(u,`region ${b+1}`,d.amount);p!==null&&o.push(p)}}o.length===0?e.push("Nothing. Every parameter in this look is a fixed number."):(e.push("| layer | knob | driven by | range | shaping |"),e.push("| --- | --- | --- | --- | --- |"),e.push(...o)),e.push("");const n=(t.dress??[]).filter(i=>i.on);if(n.length>0){e.push("## The interface"),e.push(""),e.push("Driven by CSS, not by the shader — a canvas cannot see the cards. Written as the"),e.push("independent `translate`/`rotate`/`scale` properties, so the game keeps its own"),e.push("`transform` on every one of these. See `looks/dresser.ts`."),e.push("");for(const i of n){const u=me(i.target),l=[];for(const b of Z){const d=i.moves[b.key];d!==void 0&&(S(d)?l.push(`${b.label} ${g(d.base)} → ${g(d.base+d.depth)} ← \`${d.source}\``):Math.abs(d-b.def)>1e-4&&l.push(`${b.label} ${g(d)}`))}e.push(`- **${u?.name??i.target}** (\`${u?.selector??"?"}\`)`),e.push(l.length>0?`  - ${l.join(" · ")}`:"  - _(nothing turned)_")}e.push("")}const c=t.lfos.filter(i=>le(t).includes(`lfo.${i.name}`));if(c.length>0){e.push("## The LFOs it uses"),e.push("");for(const i of c){const u=i.sync?`${g(i.bars)} bar${i.bars===1?"":"s"} — locked to the transport`:`${g(i.hz)} Hz — free running`,l=i.phase===0?"":`, phase ${g(i.phase)}`;e.push(`- \`lfo.${i.name}\` — ${i.shape}, ${u}${l}`)}e.push("")}const h=t.layers.filter(i=>i.on).length,v=t.layers.some(i=>i.on&&i.effect==="trails");e.push("## What it costs"),e.push(""),e.push(`- ${h} full-screen pass${h===1?"":"es"} per frame at 1180×720`),e.push(`- ${v?"holds a feedback buffer (one extra full-screen texture)":"no feedback buffer"}`);const m=t.layers.filter(i=>i.on&&(i.regions??[]).length>0).length;return m>0&&e.push(`- ${m} pass${m===1?"":"es"} masked to regions — cheaper than it looks, the mask short-circuits`),e.push(`- listens to: ${le(t).map(i=>`\`${i}\``).join(", ")||"nothing"}`),e.push(""),e.push("## To pick this up"),e.push(""),e.push("```"),e.push(`the look studio filed ${t.id} — wire it into the game`),e.push("```"),e.push(""),e.push(`The patch is next to this file at \`design/looks/${t.id}.look.json\`. It is`),e.push("the same format `src/breach/looks/render.ts` already reads, so wiring it in is"),e.push("mounting `<Look>` in the host above and pointing it at this id — not a port."),e.push(""),e.join(`
`)}const Jt=Object.assign({"../../../design/looks/dusk-light.look.json":Nt,"../../../design/looks/gentle-trip.look.json":Kt}),fs=new Map(Object.entries(Jt).map(([t,s])=>{const r=t.split("/").pop()?.replace(".look.json","")??s.id;return[r,_e({...s,id:r},ve)]})),Qt=()=>new Date().toISOString().replace(/\.\d+Z$/,"Z");async function ps(t,s){const r=Qt(),e=JSON.stringify({look:t,stamp:r,brief:s?fe(t,r):null});try{const o=await fetch("/__looks/save",{method:"POST",headers:{"content-type":"application/json"},body:e});return o.ok?{ok:!0,where:((await o.json()).files??[]).join("  ·  ")}:{ok:!1,where:`the dev server said ${o.status}`}}catch{return pe(`${t.id}.look.json`,JSON.stringify(t,null,2),"application/json"),s&&pe(`${t.id}.request.md`,fe(t,r),"text/markdown"),{ok:!1,where:"no dev server — downloaded instead"}}}function pe(t,s,r){const e=URL.createObjectURL(new Blob([s],{type:r})),o=document.createElement("a");o.href=e,o.download=t,o.click(),setTimeout(()=>URL.revokeObjectURL(e),4e3)}const Ee="breach.look.draft";function ds(t){try{localStorage.setItem(Ee,JSON.stringify(t))}catch{}}function ms(){try{const t=localStorage.getItem(Ee);return t===null?null:_e(JSON.parse(t),ve)}catch{return null}}export{cs as A,te as D,it as E,os as G,xe as L,Z as M,k as R,ge as S,Ie as T,ts as a,I as b,ns as c,rs as d,Q as e,ms as f,hs as g,us as h,S as i,ls as j,ss as k,is as l,ds as m,ee as n,At as o,fs as p,es as q,as as r,Rt as s,me as t,_e as u,ve as v,ie as w,ps as x};
