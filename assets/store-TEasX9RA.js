import{Q as Ie,U as Ue,e as z,L as Pe,P as Be,A as xe,ah as Oe}from"./shells-q9VIfBGW.js";const H={level:0,low:0,mid:0,high:0,hit:0,raw:0},ze=["level","low","mid","high","hit"],W=1024,Ne=[[20,180],[180,2e3],[2e3,12e3]],De=.87,P=.015,qe=.86,Ce=.02,je=.02;function Ge(e,t){return t>=.999?e:t<=.001?H:{level:e.level*t,low:e.low*t,mid:e.mid*t,high:e.high*t,hit:e.hit*t,raw:e.raw*t}}function N(e,t,o,s){if(t>=e||o<=0)return t;const r=Math.pow(.001,s/o);return t+(e-t)*r}function D(e,t,o){return Math.max(0,Math.min(1,(e-t)/Math.max(o-t,Ce)))}function q(e,t,o){return Math.max(P,t>e?t:e*Math.pow(De,o))}function C(e,t,o){return t<e?t:t+(e-t)*Math.pow(qe,o)}class mo{ctx;chans=new Map;constructor(t){this.ctx=t}get names(){return[...this.chans.keys()]}tap(t,o){if(this.chans.has(t))return;const s=this.ctx.createAnalyser();s.fftSize=W,s.smoothingTimeConstant=0,o.connect(s);const r=this.ctx.sampleRate/2,n=W/2,l=Ne.map(([h,b])=>{const g=Math.max(1,Math.floor(h/r*n)),d=Math.min(n-1,Math.ceil(b/r*n));return[g,Math.max(g+1,d)]});this.chans.set(t,{analyser:s,freq:new Uint8Array(n),time:new Uint8Array(W),bins:l,last:new Float32Array(n),ceil:{level:P,low:P,mid:P,high:P,flux:.02},base:{level:0,low:0,mid:0,high:0},smoothed:{level:0,low:0,mid:0,high:0},hit:0,trim:1,reading:H})}has(t){return this.chans.has(t)}read(t){return this.chans.get(t)?.reading??H}trim(t,o){const s=this.chans.get(t);s!==void 0&&(s.trim=Math.max(0,o))}all(){const t=new Map;for(const[o,s]of this.chans)t.set(o,Ge(s.reading,s.trim));return t}update(t){const o=Math.min(Math.max(t,.004166666666666667),.1);for(const s of this.chans.values())this.one(s,o)}one(t,o){const{analyser:s,freq:r,time:n,bins:l,last:h}=t;s.getByteFrequencyData(r),s.getByteTimeDomainData(n);let b=0;for(let w=0;w<n.length;w++){const T=((n[w]??128)-128)/128;b+=T*T}const g=Math.sqrt(b/n.length),d=w=>{if(w===void 0)return 0;const[T,A]=w;let O=0;for(let F=T;F<A;F++)O+=r[F]??0;return O/((A-T)*255)},a=d(l[0]),c=d(l[1]),p=d(l[2]);let v=0;for(let w=1;w<r.length;w++){const T=(r[w]??0)/255,A=T-(h[w]??0);A>0&&(v+=A),h[w]=T}v/=r.length;const u=t.ceil,m=t.base;u.level=q(u.level,g,o),u.low=q(u.low,a,o),u.mid=q(u.mid,c,o),u.high=q(u.high,p,o),u.flux=Math.max(.004,v>u.flux?v:u.flux*Math.pow(.9,o)),m.level=C(m.level,g,o),m.low=C(m.low,a,o),m.mid=C(m.mid,c,o),m.high=C(m.high,p,o);const f=t.smoothed;f.level=N(f.level,D(g,m.level,u.level),.16,o),f.low=N(f.low,D(a,m.low,u.low),.1,o),f.mid=N(f.mid,D(c,m.mid,u.mid),.12,o),f.high=N(f.high,D(p,m.high,u.high),.08,o);const x=Math.min(1,Math.max(0,(v/u.flux-.55)/.45)),E=t.hit*Math.pow(je,o);t.hit=Math.max(E,x),t.reading={level:f.level,low:f.low,mid:f.mid,high:f.high,hit:t.hit,raw:g}}dispose(){for(const t of this.chans.values())t.analyser.disconnect();this.chans.clear()}}const $=(e,t,o,s,r,n,l=.001,h)=>({key:e,label:t,channel:o,min:s,max:r,def:n,step:l,hint:h}),se=[$("x","across","translate",-80,80,0,.1),$("y","up","translate",-80,80,0,.1),$("turn","turn","rotate",-.25,.25,0),$("scale","size","scale",.7,1.3,1),$("blur","blur","filter",0,14,0,.05),$("bright","brightness","filter",.4,1.8,1),$("sat","saturation","filter",0,2.5,1),$("hue","hue turn","filter",-.5,.5,0),$("contrast","contrast","filter",.4,1.8,1),$("glow","glow","filter",0,30,0,.1,"a drop shadow with no offset, so it reads as light"),$("fade","fade","opacity",0,1,1)],ie=new Map(se.map(e=>[e.key,e])),Xe=[{id:"board",name:"the whole board",selector:".stage > *",blurb:"Every layer at once. Start here, then take pieces out of it.",filterSafe:!0},{id:"farm",name:"the farm",selector:".backdrop",blurb:"The backdrop and everything cut off it — props, leaves, birds.",filterSafe:!0},{id:"props",name:"the furniture",selector:".bd-prop",blurb:"The glasshouse, the lamp, the plants, the fence.",filterSafe:!0},{id:"leaves",name:"the loose leaves",selector:".bd-leaf",blurb:"Eighteen of them, already scooting on their own timers.",filterSafe:!0},{id:"puppets",name:"the puppets",selector:".rig",blurb:"You and whatever is standing opposite you.",filterSafe:!0},{id:"hand",name:"your hand",selector:".hand",blurb:"The row of cards, as one thing.",filterSafe:!0},{id:"cards",name:"the cards",selector:".card",blurb:"Each card on its own. No filter — they carry their own shadows.",filterSafe:!1},{id:"piles",name:"the piles",selector:".pile",blurb:"Draw and discard.",filterSafe:!0},{id:"chips",name:"the chips",selector:".chip-holder",blurb:"The counters along the top.",filterSafe:!0},{id:"intent",name:"what it intends",selector:".intent-strip",blurb:"The strip that says what is coming next turn.",filterSafe:!0},{id:"plates",name:"the name plates",selector:".plate",blurb:"The labels under each puppet.",filterSafe:!0},{id:"ender",name:"end turn",selector:".ender",blurb:"The button. Bind a glow to the beat and it asks to be pressed.",filterSafe:!0},{id:"ticker",name:"the ticker",selector:".ticker",blurb:"The line of running commentary.",filterSafe:!0}];function ye(e){return Xe.find(t=>t.id===e)}let ce=0;function bo(e){return ce+=1,{id:`d${ce.toString(36)}`,target:e,on:!0,moves:{}}}const He=400,Y=["translate","rotate","scale","filter","opacity"],K={translate:"translate",rotate:"rotate",scale:"scale",filter:"filter",opacity:"opacity"};class vo{root;held=new Map;touched=new Set;now=0;constructor(t){this.root=t}apply(t,o,s){this.now=s;const r=new Set;for(const n of t.dress??[]){if(!n.on)continue;const l=ye(n.target);if(l===void 0)continue;r.add(n.id);const h=this.hold(n.id,l.selector);if(h.els.length===0)continue;const b=a=>{const c=ie.get(a);return c===void 0?0:o.resolve(`${n.id}/${a}`,n.moves[a],c.def)},g=a=>{const c=ie.get(a);return c!==void 0&&Math.abs(b(a)-c.def)>1e-4},d=new Map;for(const a of Y){const p=se.filter(v=>v.channel===a).map(v=>v.key).some(g)&&(a!=="filter"||l.filterSafe);d.set(a,p?this.build(a,b):null)}for(const[a,c]of d)if(h.wrote.get(a)!==(c??"")){h.wrote.set(a,c??"");for(const p of h.els)p.style.setProperty(K[a],c??""),c!==null&&this.touched.add(p)}}for(const[n,l]of this.held)r.has(n)||(this.strip(l),this.held.delete(n))}build(t,o){switch(t){case"translate":return`${o("x").toFixed(2)}px ${o("y").toFixed(2)}px`;case"rotate":return`${(o("turn")*360).toFixed(3)}deg`;case"scale":return o("scale").toFixed(4);case"opacity":return o("fade").toFixed(3);case"filter":{const s=[],r=o("blur");r>.01&&s.push(`blur(${r.toFixed(2)}px)`);const n=o("bright");Math.abs(n-1)>1e-4&&s.push(`brightness(${n.toFixed(3)})`);const l=o("sat");Math.abs(l-1)>1e-4&&s.push(`saturate(${l.toFixed(3)})`);const h=o("hue");Math.abs(h)>1e-4&&s.push(`hue-rotate(${(h*360).toFixed(2)}deg)`);const b=o("contrast");Math.abs(b-1)>1e-4&&s.push(`contrast(${b.toFixed(3)})`);const g=o("glow");return g>.01&&s.push(`drop-shadow(0 0 ${g.toFixed(2)}px currentColor)`),s.join(" ")}default:return""}}hold(t,o){let s=this.held.get(t);if(s===void 0&&(s={els:[],at:-1e9,wrote:new Map},this.held.set(t,s)),this.now-s.at>He||s.els.length===0){s.at=this.now;const r=[...this.root.querySelectorAll(o)].filter(n=>n instanceof HTMLElement);(r.length!==s.els.length||r.some((n,l)=>n!==s.els[l]))&&(this.strip(s),s.els=r,s.wrote.clear())}return s}strip(t){for(const o of t.els){for(const s of Y)o.style.setProperty(K[s],"");this.touched.delete(o)}t.wrote.clear()}clear(){for(const t of this.held.values())this.strip(t);for(const t of this.touched)for(const o of Y)t.style.setProperty(K[o],"");this.touched.clear(),this.held.clear()}}const i=(e,t,o,s,r,n=.001,l={})=>({key:e,label:t,min:o,max:s,def:r,step:n,...l}),Ve={id:"wobble",label:"RGB wobble",group:"colour",blurb:"The three channels pull apart along a line that turns. The house preset.",needsImage:!0,params:[i("amount","split",0,.03,.0025),i("angle","angle",0,1,0),i("spin","spin",-.5,.5,.03),i("sep","green centred",0,1,1,1,{options:["no","yes"],hint:"off pushes green the other way, which reads dirtier"})],glsl:`
vec4 fx(vec2 uv) {
  float a = (p_angle + u_bars * p_spin) * TAU;
  vec2 d = vec2(cos(a), sin(a)) * p_amount / ASP;
  vec4 c = src(uv);
  float r = src(uv + d).r;
  float b = src(uv - d).b;
  float g = p_sep > 0.5 ? c.g : src(uv + d.yx * 0.6).g;
  return vec4(r, g, b, c.a);
}`},We={id:"ripple",label:"ripple",group:"move",blurb:"Rings running out from a point, like something was dropped in it.",needsImage:!0,params:[i("amount","depth",0,.06,.004),i("freq","rings",1,60,14,.1),i("speed","speed",-4,4,1),i("cx","centre x",0,1,.5),i("cy","centre y",0,1,.5)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP;
  float r = length(d);
  float w = sin(r * p_freq - u_bars * p_speed * TAU * 0.5);
  vec2 off = normalize(d + 1e-6) * w * p_amount;
  return src(uv + off / ASP);
}`},Ye={id:"flow",label:"flow",group:"move",blurb:"Soft noise pushes the picture around. Heat off a road; paper breathing.",needsImage:!0,params:[i("amount","depth",0,.08,.006),i("scale","grain",.5,12,2.4,.01),i("speed","speed",0,2,.14),i("warp","churn",0,1,.35)],glsl:`
vec4 fx(vec2 uv) {
  vec2 q = uv * ASP * p_scale;
  float t = u_bars * p_speed;
  vec2 w = vec2(fbm(q + vec2(t, 0.0)), fbm(q + vec2(0.0, t) + 31.7));
  vec2 n = vec2(fbm(q + w * p_warp * 2.0 + 5.2), fbm(q - w * p_warp * 2.0 + 17.3));
  return src(uv + (n - 0.5) * p_amount);
}`},Ke={id:"breathe",label:"breathe",group:"move",blurb:"Scale about a point. Bind it to the kick and the room has a pulse.",needsImage:!0,params:[i("amount","zoom",-.2,.2,.008),i("cx","centre x",0,1,.5),i("cy","centre y",0,1,.5),i("roll","roll",-.2,.2,0)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP;
  d = rot(p_roll * TAU) * d;
  d /= (1.0 + p_amount);
  return src(c + d / ASP);
}`},Je={id:"sway",label:"sway",group:"move",blurb:"Two slow sines, out of phase, so the drift never repeats on itself.",needsImage:!0,params:[i("x","across",0,.06,.006),i("y","up",0,.06,.003),i("rate","rate",0,1,.08),i("lag","lag",0,1,.25,.01,{hint:"how far behind the vertical runs"})],glsl:`
vec4 fx(vec2 uv) {
  float t = u_bars * p_rate * TAU;
  vec2 off = vec2(sin(t) * p_x, sin(t * 0.73 + p_lag * TAU) * p_y);
  return src(uv + off);
}`},Qe={id:"slice",label:"slice",group:"move",blurb:"Horizontal bands jump sideways. Tape, not glitch — keep it under a hair.",needsImage:!0,params:[i("amount","throw",0,.12,.01),i("rows","bands",2,120,26,1),i("speed","reshuffle",0,20,6,.1),i("chance","how many",0,1,.25)],glsl:`
vec4 fx(vec2 uv) {
  float row = floor(uv.y * p_rows);
  float t = floor(u_bars * p_speed);
  float r = hash21(vec2(row, t));
  float hit = step(1.0 - p_chance, r);
  float dir = hash21(vec2(row + 9.1, t)) * 2.0 - 1.0;
  return src(uv + vec2(dir * p_amount * hit, 0.0));
}`},Ze={id:"bleed",label:"bleed",group:"move",blurb:"Smear out from a point. A zoom blur that reads as speed or as glare.",needsImage:!0,params:[i("amount","reach",0,.2,.02),i("cx","centre x",0,1,.5),i("cy","centre y",0,1,.5),i("bias","bias to light",0,1,.4)],glsl:`
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
}`},et={id:"mirror",label:"mirror",group:"mirror",blurb:"Fold one half onto the other. The split moves, which is the whole trick.",needsImage:!0,params:[i("axis","axis",0,2,0,1,{options:["left↔right","top↕bottom","both"]}),i("split","split",0,1,.5),i("flip","keep",0,1,0,1,{options:["near side","far side"]}),i("mix2","fold, or blend",0,1,1,.001,{hint:"1 folds hard, below that ghosts the two halves together"})],glsl:`
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
}`},tt={id:"kaleido",label:"kaleidoscope",group:"mirror",blurb:"N-fold about a point. Two slices is a mirror; twelve is a rose window.",needsImage:!0,params:[i("slices","slices",2,24,6,1),i("spin","spin",-.5,.5,.01),i("zoom","zoom",.2,3,1,.01),i("cx","centre x",0,1,.5),i("cy","centre y",0,1,.5)],glsl:`
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
}`},st={id:"tile",label:"tile",group:"mirror",blurb:"Repeat the frame in a grid, mirrored at every seam so it never breaks.",needsImage:!0,params:[i("count","across",1,6,2,1),i("rows","down",1,6,2,1),i("flip","mirror seams",0,1,1,1,{options:["no","yes"]}),i("drift","drift",-.5,.5,0)],glsl:`
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
}`},ot={id:"river",label:"river of mirrors",group:"mirror",blurb:"Mirrors facing each other along a line, with the reflections flowing through. Breathes.",needsImage:!0,params:[i("angle","angle",-.25,.25,0),i("period","mirror spacing",.02,.6,.16),i("flow","flow",-.3,.3,.02,5e-4,{hint:"negative runs it the other way"}),i("ratio","second chain",1,6,2.31,.01,{hint:"off a whole number is what stops it repeating"}),i("tangle","let them interact",0,1,.35),i("reach","reach",.1,3,1,.01,{hint:"how much of the picture each mirror shows"}),i("breathe","breathe",0,.6,.1),i("rate","breath rate",.005,.4,.045),i("cx","centre x",0,1,.5),i("cy","centre y",0,1,.5)],glsl:`
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
}`},rt={id:"levels",label:"levels",group:"colour",blurb:"Brightness, contrast, saturation, hue. The one every look ends up wanting.",needsImage:!0,params:[i("bright","brightness",-.5,.5,0),i("contrast","contrast",-1,1,0),i("sat","saturation",-1,1,0),i("hue","hue turn",-.5,.5,0),i("lift","lift blacks",-.2,.3,0)],glsl:`
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
}`},at={id:"tint",label:"tint",group:"colour",blurb:"Push one end of the picture toward a hue. Cold shadows, warm lamps.",needsImage:!0,params:[i("amount","amount",0,1,.12),i("hue","hue",0,1,.55),i("sat","purity",0,1,.5),i("toward","where",0,1,0,1,{options:["shadows","highlights"]})],glsl:`
vec4 fx(vec2 uv) {
  vec4 c = src(uv);
  float l = lum(c.rgb);
  float m = p_toward > 0.5 ? l : 1.0 - l;
  vec3 t = hsv2rgb(vec3(p_hue, p_sat, 1.0));
  return vec4(mix(c.rgb, c.rgb * t * 1.6, m * p_amount), c.a);
}`},nt={id:"poster",label:"posterise",group:"colour",blurb:"Fewer steps, with a dither so the bands do not read as a broken screen.",needsImage:!0,params:[i("steps","steps",2,32,10,1),i("dither","dither",0,1,.4)],glsl:`
vec4 fx(vec2 uv) {
  vec4 c = src(uv);
  float n = max(p_steps, 2.0);
  float d = (hash21(floor(uv * u_res) + floor(u_time * 12.0)) - 0.5) * p_dither / n;
  return vec4(floor((c.rgb + d) * n + 0.5) / n, c.a);
}`},it={id:"pixel",label:"pixelate",group:"grit",blurb:"Snap to a grid. Bind the size to a hit and it comes apart on the beat.",needsImage:!0,params:[i("size","block",1,64,4,.5),i("round","soften",0,1,0)],glsl:`
vec4 fx(vec2 uv) {
  float s = max(p_size, 1.0);
  vec2 g = u_res / s;
  vec2 q = (floor(uv * g) + 0.5) / g;
  return mix(src(q), src(uv), p_round);
}`},ct={id:"edge",label:"edges",group:"grit",blurb:"Find the lines and lay them back over the picture. Ink on the paper.",needsImage:!0,params:[i("amount","amount",0,2,.35),i("width","width",.5,6,1.2,.1),i("dark","as",0,1,1,1,{options:["light","ink"]})],glsl:`
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
}`},lt={id:"bloom",label:"bloom",group:"light",blurb:"The bright things spill. A lamp at dusk needs about 0.15 of this.",needsImage:!0,params:[i("amount","amount",0,1.5,.25),i("threshold","from",0,1,.62),i("radius","reach",.5,24,6,.1)],glsl:`
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
}`},ut={id:"blur",label:"blur",group:"light",blurb:"One direction, nine taps. Cheap, and the only honest way to soften focus.",needsImage:!0,params:[i("amount","amount",0,24,2,.1),i("angle","angle",0,1,0),i("round","both ways",0,1,0,1,{options:["one","cross"]})],glsl:`
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
}`},ht={id:"vignette",label:"vignette",group:"light",blurb:"Close the corners in. Bind it to pressure and the room narrows on you.",needsImage:!1,params:[i("amount","amount",0,1.5,.35),i("radius","radius",.1,1.4,.78),i("soft","softness",.02,1,.45)],glsl:`
vec4 fx(vec2 uv) {
  vec2 d = (uv - 0.5) * ASP * 1.42;
  float v = smoothstep(p_radius, p_radius - p_soft, length(d));
  float k = 1.0 - (1.0 - v) * p_amount;
  vec4 c = src(uv);
  return vec4(c.rgb * k, mix(c.a, max(c.a, (1.0 - v) * p_amount), 0.0) + (1.0 - v) * p_amount * (1.0 - c.a));
}`},ft={id:"fog",label:"fog",group:"light",blurb:"Slow cloud drifting across. Makes its own light — works on an empty canvas.",needsImage:!1,params:[i("amount","amount",0,1,.18),i("scale","size",.3,8,1.6,.01),i("speed","drift",0,.6,.04),i("hue","hue",0,1,.55),i("sat","purity",0,1,.15),i("height","sit low",0,1,.4,.01,{hint:"pulls the cloud toward the floor of the frame"})],glsl:`
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
}`},pt={id:"motes",label:"motes",group:"light",blurb:"Dust in a shaft of light. Rises, wanders, never lands. Makes its own light.",needsImage:!1,params:[i("amount","amount",0,1,.3),i("count","how many",4,80,26,1),i("size","size",.5,6,1.6,.1),i("rise","rise",-.3,.3,.03),i("hue","hue",0,1,.12)],glsl:`
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
}`},dt={id:"beams",label:"beams",group:"light",blurb:"Light through glass, at an angle, slowly turning. Makes its own light.",needsImage:!1,params:[i("amount","amount",0,1,.16),i("angle","angle",0,1,.13),i("count","how many",1,20,5,.1),i("spread","softness",.02,1,.4),i("drift","drift",-.2,.2,.01),i("hue","hue",0,1,.11)],glsl:`
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
}`},mt={id:"pulse",label:"pulse",group:"light",blurb:"One soft ring of light from a point. Bind the size to a hit. Makes its own light.",needsImage:!1,params:[i("amount","amount",0,1.5,.3),i("radius","radius",0,1.2,.3),i("soft","softness",.01,1,.35),i("cx","centre x",0,1,.5),i("cy","centre y",0,1,.5),i("hue","hue",0,1,.08),i("ring","as a ring",0,1,0,1,{options:["filled","ring"]})],glsl:`
vec4 fx(vec2 uv) {
  float r = length((uv - vec2(p_cx, p_cy)) * ASP);
  float a = p_ring > 0.5
    ? smoothstep(p_soft, 0.0, abs(r - p_radius))
    : smoothstep(p_radius, max(p_radius - p_soft, 0.0), r);
  a *= p_amount;
  vec3 col = hsv2rgb(vec3(p_hue, 0.3, 1.0));
  vec4 c = src(uv);
  return vec4(c.rgb + col * a, max(c.a, a));
}`},bt={id:"grain",label:"grain",group:"grit",blurb:"The paper this is all printed on. Makes its own light.",needsImage:!1,params:[i("amount","amount",0,.5,.05),i("size","size",.5,8,1.5,.1),i("speed","boil",0,60,24,1),i("colour","colour",0,1,0)],glsl:`
vec4 fx(vec2 uv) {
  vec2 g = floor(uv * u_res / max(p_size, 0.5));
  float t = floor(u_time * p_speed);
  float n = hash21(g + t * 7.3);
  vec3 nc = vec3(n, hash21(g + t * 7.3 + 11.0), hash21(g + t * 7.3 + 23.0));
  vec3 v = mix(vec3(n), nc, p_colour) - 0.5;
  vec4 c = src(uv);
  return vec4(c.rgb + v * p_amount * 2.0, max(c.a, abs(v.r) * p_amount * 2.0));
}`},vt={id:"scan",label:"scanlines",group:"grit",blurb:"Lines, and a roll bar that walks up the screen. Makes its own light.",needsImage:!1,params:[i("amount","lines",0,1,.12),i("count","how many",20,900,260,1),i("roll","roll speed",-2,2,.12),i("bar","roll bar",0,1,.08)],glsl:`
vec4 fx(vec2 uv) {
  float s = sin((uv.y + u_bars * p_roll * 0.02) * p_count * TAU * 0.5) * 0.5 + 0.5;
  float bar = smoothstep(0.7, 1.0, sin((uv.y - u_bars * p_roll * 0.2) * TAU)) * p_bar;
  vec4 c = src(uv);
  float k = 1.0 - s * p_amount;
  return vec4(c.rgb * k + bar, max(c.a, s * p_amount * 0.6 + bar));
}`},gt={id:"trails",label:"trails",group:"time",blurb:"Last frame, moved a little, laid back under this one. The feedback loop.",needsImage:!0,params:[i("feedback","hold",0,.97,.7),i("zoom","zoom",-.06,.06,.004),i("spin","spin",-.06,.06,0),i("driftx","drift x",-.02,.02,0),i("drifty","drift y",-.02,.02,0),i("fade","cool",0,1,.06,.001,{hint:"how fast the held frame loses colour"})],glsl:`
vec4 fx(vec2 uv) {
  vec2 d = (uv - 0.5) * ASP;
  d = rot(p_spin * TAU) * d / (1.0 + p_zoom);
  vec2 q = 0.5 + d / ASP + vec2(p_driftx, p_drifty);
  vec4 old = prev(q);
  old.rgb *= (1.0 - p_fade);
  vec4 now = src(uv);
  vec3 rgb = max(now.rgb, old.rgb * p_feedback);
  return vec4(rgb, max(now.a, old.a * p_feedback));
}`},wt=[Ve,Ye,Je,Ke,We,Qe,Ze,et,tt,st,ot,rt,at,nt,lt,ut,ht,ft,dt,pt,mt,bt,vt,it,ct,gt],_e=new Map(wt.map(e=>[e.id,e]));function te(e){return _e.get(e)}function Ee(e){return _e.has(e)}function go(e){const t={};for(const o of e.params)t[o.key]=o.def;return t}const wo=[{id:"move",label:"move"},{id:"mirror",label:"mirror"},{id:"colour",label:"colour"},{id:"light",label:"light"},{id:"grit",label:"grit"},{id:"time",label:"time"}],le=(e,t=0,o=1)=>e<t?t:e>o?o:e,Te={abs:e=>Math.abs(e[0]??0),sign:e=>Math.sign(e[0]??0),sqrt:e=>Math.sqrt(Math.max(0,e[0]??0)),floor:e=>Math.floor(e[0]??0),ceil:e=>Math.ceil(e[0]??0),round:e=>Math.round(e[0]??0),fract:e=>(e[0]??0)-Math.floor(e[0]??0),sin:e=>Math.sin(e[0]??0),cos:e=>Math.cos(e[0]??0),tan:e=>Math.tan(e[0]??0),exp:e=>Math.exp(e[0]??0),log:e=>Math.log(Math.max(1e-9,e[0]??0)),pow:e=>Math.pow(e[0]??0,e[1]??1),min:e=>e.length===0?0:Math.min(...e),max:e=>e.length===0?0:Math.max(...e),mod:e=>{const t=e[1]??1;return t===0?0:(e[0]??0)-Math.floor((e[0]??0)/t)*t},clamp:e=>le(e[0]??0,e[1]??0,e[2]??1),mix:e=>(e[0]??0)+((e[1]??0)-(e[0]??0))*(e[2]??0),lerp:e=>(e[0]??0)+((e[1]??0)-(e[0]??0))*(e[2]??0),step:e=>(e[1]??0)<(e[0]??0)?0:1,smoothstep:e=>{const t=e[0]??0,o=e[1]??1;if(o===t)return(e[2]??0)<t?0:1;const s=le(((e[2]??0)-t)/(o-t));return s*s*(3-2*s)},hash:e=>{const t=Math.sin((e[0]??0)*127.1)*43758.5453;return t-Math.floor(t)}},$e=new Set(["smooth","glide"]),xt=(e,t,o,s)=>o<=0?t:t+(e-t)*Math.pow(.001,s/o),Ae={pi:Math.PI,tau:Math.PI*2,e:Math.E,true:1,false:0},xo=[...Object.keys(Te),...$e].sort(),yo=Object.keys(Ae).sort(),yt=["<=",">=","==","!=","&&","||","+","-","*","/","%","^","(",")",",","?",":","<",">","!"];function _t(e){const t=[];let o=0;for(;o<e.length;){const s=e[o]??"";if(s===" "||s==="	"||s===`
`||s==="\r"){o+=1;continue}if(s>="0"&&s<="9"||s==="."&&/[0-9]/.test(e[o+1]??"")){const n=/^[0-9]*\.?[0-9]+(?:e[-+]?[0-9]+)?/i.exec(e.slice(o));if(n===null)return`that number at ${o+1} does not parse`;t.push({kind:"num",value:Number(n[0]),at:o}),o+=n[0].length;continue}if(/[a-z_]/i.test(s)){const n=/^[a-z_][a-z0-9_]*(?:\.[a-z0-9_]+)*/i.exec(e.slice(o));if(n===null)return`that name at ${o+1} does not parse`;t.push({kind:"name",value:n[0],at:o}),o+=n[0].length;continue}const r=yt.find(n=>e.startsWith(n,o));if(r===void 0)return`“${s}” is not something this understands`;t.push({kind:"op",value:r,at:o}),o+=r.length}return t.push({kind:"end",at:e.length}),t}const Et={"||":1,"&&":2,"==":3,"!=":3,"<":3,">":3,"<=":3,">=":3,"+":4,"-":4,"*":5,"/":5,"%":5,"^":6},Tt={"+":(e,t)=>e+t,"-":(e,t)=>e-t,"*":(e,t)=>e*t,"/":(e,t)=>e/t,"%":(e,t)=>t===0?0:e-Math.floor(e/t)*t,"^":(e,t)=>Math.pow(e,t),"<":(e,t)=>e<t?1:0,">":(e,t)=>e>t?1:0,"<=":(e,t)=>e<=t?1:0,">=":(e,t)=>e>=t?1:0,"==":(e,t)=>e===t?1:0,"!=":(e,t)=>e!==t?1:0,"&&":(e,t)=>e!==0&&t!==0?1:0,"||":(e,t)=>e!==0||t!==0?1:0};class L extends Error{}function $t(e,t,o){let s=0;const r=()=>e[s]??{kind:"end",at:0},n=()=>e[s++]??{kind:"end",at:0},l=d=>{const a=r();if(a.kind!=="op"||a.value!==d)throw new L(`expected “${d}”`);s+=1},h=()=>{const d=n();if(d.kind==="num"){const a=d.value;return()=>a}if(d.kind==="op"&&d.value==="("){const a=b(0);return l(")"),a}if(d.kind==="op"&&d.value==="-"){const a=h();return(c,p)=>-a(c,p)}if(d.kind==="op"&&d.value==="!"){const a=h();return(c,p)=>a(c,p)===0?1:0}if(d.kind==="name"){const a=d.value,c=r();if(c.kind==="op"&&c.value==="("){const v=Te[a],u=$e.has(a);if(v===void 0&&!u)throw new L(`there is no function called “${a}”`);s+=1;const m=[];if(!(r().kind==="op"&&r().value===")"))for(;;){m.push(b(0));const x=r();if(x.kind==="op"&&x.value===","){s+=1;continue}break}if(l(")"),u){const x=o.n++,E=a==="smooth";return(w,T)=>{const A=m[0]?.(w,T)??0,O=m[1]?.(w,T)??.2,F=T.mem[x]??A,ne=E&&A>=F?A:xt(F,A,O,T.dt);return T.mem[x]=ne,ne}}const f=v;return(x,E)=>f(m.map(w=>w(x,E)))}const p=Ae[a];return p!==void 0?()=>p:(t.add(a),v=>v(a))}throw new L(d.kind==="end"?"it stops in the middle":"that is not something this understands")},b=d=>{let a=h();for(;;){const c=r();if(c.kind!=="op")break;if(c.value==="?"&&d===0){s+=1;const f=b(0);l(":");const x=b(0),E=a;a=(w,T)=>E(w,T)!==0?f(w,T):x(w,T);continue}const p=Et[c.value];if(p===void 0||p<d)break;s+=1;const v=Tt[c.value];if(v===void 0)throw new L(`“${c.value}” cannot be used like that`);const u=b(c.value==="^"?p:p+1),m=a;a=(f,x)=>v(m(f,x),u(f,x))}return a},g=b(0);if(r().kind!=="end")throw new L("there is something left over at the end");return g}const ue=new Map,J=e=>({run:()=>Number.NaN,slots:0,error:e,names:[]});function oe(e){const t=ue.get(e);if(t!==void 0)return t;const o=At(e);return ue.set(e,o),o}function At(e){if(e.trim()==="")return J("empty");const t=_t(e);if(typeof t=="string")return J(t);const o=new Set,s={n:0};try{return{run:$t(t,o,s),slots:s.n,error:null,names:[...o].sort()}}catch(r){return J(r instanceof L?r.message:String(r))}}const St={dt:1/60,mem:new Float64Array(0)};function kt(e,t,o,s=St){const r=oe(e);if(r.error!==null)return o;const n=r.run(t,s);return Number.isFinite(n)?n:o}function k(e){return typeof e=="object"&&e!==null&&"source"in e}function M(e){return typeof e=="object"&&e!==null&&"expr"in e}function _o(e,t){return e===void 0?t:k(e)?e.base:M(e)?t:e}function _(e,t,o){return{source:t,base:e,depth:o,curve:1,fall:.12}}function re(e){return{id:`lfo-${e}`,name:e,shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5}}const Se=.25,ke=.18,ae=.08;let he=0;function fe(e={}){return he+=1,{id:`r${he.toString(36)}`,shape:"rect",x:.5,y:.5,w:.3,h:.18,rot:0,feather:.35,amount:1,drift:ae,...e}}const Eo={id:"untitled",name:"untitled",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,lfos:[re("a")],layers:[],notes:""};function To(e,t){return e.wears===void 0||e.wears.length===0||t===void 0?!0:e.wears.includes(t)}let pe=0;function $o(e){return pe+=1,`${e}-${pe.toString(36)}`}function de(e){const t=new Set,o=s=>{if(k(s)&&t.add(s.source),M(s))for(const r of oe(s.expr).names)t.add(r)};for(const s of e.layers){o(s.mix);for(const r of Object.values(s.params))o(r);for(const r of s.regions??[])o(r.amount)}for(const s of e.dress??[])for(const r of Object.values(s.moves))o(r);return[...t].sort()}function Re(e,t){return{...e,layers:e.layers.filter(o=>t(o.effect))}}const R=(e,t,o)=>({...re(e),shape:t,bars:o}),Rt=[{id:"rgb-wobble",name:"RGB wobble",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The house preset. The channels part on the low end and drift on a slow LFO.",lfos:[R("slow","sine",8)],layers:[{id:"w1",effect:"wobble",on:!0,mix:1,params:{amount:{..._(9e-4,"music.low",.0045),curve:1.6,fall:.2},angle:_(0,"lfo.slow",1),spin:0,sep:1}},{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.004,y:.002,rate:.097,lag:.25}}]},{id:"glasshouse-breath",name:"glasshouse breath",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The room has a pulse. Zoom on the downbeat, noise drift under it, lamp spills.",lfos:[R("drift","noise",6)],layers:[{id:"b1",effect:"breathe",on:!0,mix:1,params:{amount:{..._(0,"bar.pulse",.011),curve:2,fall:.3},cx:.42,cy:.52,roll:0}},{id:"b2",effect:"flow",on:!0,mix:1,params:{amount:{..._(.002,"music.mid",.004),curve:1.4,fall:.35},scale:2.1,speed:.174,warp:.4}},{id:"b3",effect:"bloom",on:!0,mix:1,params:{amount:{..._(.14,"music.level",.22),curve:1.5,fall:.4},threshold:.66,radius:7}}]},{id:"hat-paper",name:"hi-hat paper",scene:"greenhouse",mount:"over",blend:"soft-light",opacity:.9,notes:"Over-mount. The paper grain moves with the hats; the corners close as pressure rises.",lfos:[],layers:[{id:"g1",effect:"grain",on:!0,mix:1,params:{amount:{..._(.02,"music.high",.07),curve:1.8,fall:.09},size:1.6,speed:24,colour:.15}},{id:"g2",effect:"vignette",on:!0,mix:1,params:{amount:{..._(.1,"pressure",.45),curve:1,fall:1.2},radius:.8,soft:.5}}]},{id:"rose-window",name:"rose window",scene:"greenhouse",mount:"plate",blend:"normal",opacity:.55,notes:"Mirrors, folded on a slow turn. Half opacity because at full it is a screensaver.",lfos:[R("turn","saw",32),R("split","sine",12)],layers:[{id:"k1",effect:"kaleido",on:!0,mix:.5,params:{slices:6,spin:.0077,zoom:_(1.1,"lfo.split",.25),cx:.5,cy:.45}},{id:"k2",effect:"mirror",on:!0,mix:{..._(.15,"music.level",.4),curve:1.6,fall:.5},params:{axis:0,split:_(.42,"lfo.split",.16),flip:0,mix2:1}}]},{id:"signal-rot",name:"signal rot",scene:"inside",mount:"plate",blend:"normal",opacity:1,notes:"For the bad end of a fight. Bands jump on a hit, the frame holds and cools.",lfos:[R("gate","hold",2)],layers:[{id:"s1",effect:"slice",on:!0,mix:{..._(0,"sfx.hit",1),curve:2.2,fall:.22},params:{amount:.035,rows:34,speed:4,chance:.3}},{id:"s2",effect:"trails",on:!0,mix:1,params:{feedback:{..._(.42,"music.low",.3),curve:1.4,fall:.5},zoom:.003,spin:.001,driftx:0,drifty:0,fade:.09}},{id:"s3",effect:"poster",on:!0,mix:.5,params:{steps:14,dither:.5}}]},{id:"dusk-light",name:"dusk light",scene:"greenhouse",mount:"over",blend:"screen",opacity:.75,notes:"All light, no picture. Beams through the glass, dust rising, fog on the floor.",lfos:[R("breeze","noise",10)],layers:[{id:"l1",effect:"beams",on:!0,mix:1,params:{amount:{..._(.07,"music.level",.1),curve:1.6,fall:.6},angle:.14,count:4.5,spread:.45,drift:.0155,hue:.1}},{id:"l2",effect:"motes",on:!0,mix:1,params:{amount:.22,count:22,size:1.5,rise:.039,hue:.11}},{id:"l3",effect:"fog",on:!0,mix:1,params:{amount:_(.08,"lfo.breeze",.07),scale:1.4,speed:.058,hue:.55,sat:.12,height:.55}}]}],Mt={id:"river-road",name:"the road, upstream",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The band of soil only. Mirrors along it with the reflections flowing upstream, breathing on a four-bar LFO. Sky and glasshouse untouched.",lfos:[{...re("breath"),shape:"sine",bars:4}],layers:[{id:"rr1",effect:"river",on:!0,mix:.42,regions:[{...fe(),shape:"rect",x:.5,y:.53,w:.52,h:.135,rot:0,feather:.75,amount:1}],params:{angle:0,period:.17,flow:.0426,ratio:2.31,tangle:.3,reach:1.1,breathe:0,rate:.087,cx:.5,cy:.53}},{id:"rr2",effect:"breathe",on:!0,mix:1,regions:[{...fe(),x:.5,y:.53,w:.52,h:.16,feather:.85,amount:.7}],params:{amount:_(.002,"lfo.breath",.006),cx:.5,cy:.53,roll:0}}]},Ft={id:"the-room-breathes",name:"the room breathes",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The interface on the transport. Hand lifts on the downbeat, puppets breathe over four bars, the button glows on the bass. Nothing in seconds — it survives a tempo change.",lfos:[R("breath","sine",4)],layers:[{id:"db1",effect:"breathe",on:!0,mix:1,params:{amount:{..._(0,"bar.pulse",.006),curve:2,fall:.35},cx:.5,cy:.5,roll:0}}],dress:[{id:"dh",target:"hand",on:!0,moves:{y:{..._(0,"bar.pulse",-2.2),curve:2,fall:.28}}},{id:"dp",target:"puppets",on:!0,moves:{scale:_(.997,"lfo.breath",.006),y:_(0,"lfo.breath",-1.4)}},{id:"de",target:"ender",on:!0,moves:{glow:{..._(0,"music.low",7),curve:1.8,fall:.3}}},{id:"dt",target:"ticker",on:!0,moves:{sat:{..._(1,"music.high",.35),curve:1.6,fall:.4}}}]},Ao=[...Rt,Mt,Ft],Q=`#version 300 es
in vec2 a_pos;
uniform float u_flip;
out vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos.x, a_pos.y * u_flip, 0.0, 1.0);
}`,Lt=`#version 300 es
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
}`,U=6;function It(e){return e.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1,powerPreference:"low-power"})}function Ut(e){const t=e.createVertexArray();if(t===null)throw new Error("no vao");e.bindVertexArray(t);const o=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),t}function me(e,t,o){const s=e.createShader(t);if(s===null)throw new Error("no shader");if(e.shaderSource(s,o),e.compileShader(s),!e.getShaderParameter(s,e.COMPILE_STATUS)){const r=e.getShaderInfoLog(s)??"unknown";throw e.deleteShader(s),new Error(Pt(o,r))}return s}function Pt(e,t){const o=e.split(`
`).map((s,r)=>`${String(r+1).padStart(3)} | ${s}`);return`${t}
${o.join(`
`)}`}function j(e,t,o){const s=e.createProgram();if(s===null)throw new Error("no program");const r=me(e,e.VERTEX_SHADER,t),n=me(e,e.FRAGMENT_SHADER,o);if(e.attachShader(s,r),e.attachShader(s,n),e.bindAttribLocation(s,0,"a_pos"),e.linkProgram(s),e.deleteShader(r),e.deleteShader(n),!e.getProgramParameter(s,e.LINK_STATUS)){const l=e.getProgramInfoLog(s)??"unknown";throw e.deleteProgram(s),new Error(l)}return s}function G(e,t,o){const s=e.createTexture(),r=e.createFramebuffer();if(s===null||r===null)throw new Error("no target");return e.bindTexture(e.TEXTURE_2D,s),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t,o,0,e.RGBA,e.UNSIGNED_BYTE,null),Me(e),e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,s,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{fb:r,tex:s,w:t,h:o}}function X(e,t,o,s){t.w===o&&t.h===s||(e.bindTexture(e.TEXTURE_2D,t.tex),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,o,s,0,e.RGBA,e.UNSIGNED_BYTE,null),t.w=o,t.h=s)}function Me(e){e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR)}function Bt(e,t){const o=e.createTexture();if(o===null)throw new Error("no texture");return e.bindTexture(e.TEXTURE_2D,o),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),Me(e),o}function Ot(e){return new Promise((t,o)=>{const s=new Image;s.crossOrigin="anonymous",s.onload=()=>t(s),s.onerror=()=>o(new Error(`could not load ${e}`)),s.src=e})}const zt=`
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
}`,I=6,Nt=`
uniform int u_regions;
uniform int u_outside;
uniform vec4 u_regionBox[${I}];
uniform vec4 u_regionCfg[${I}];

float maskAt(vec2 uv) {
  if (u_regions == 0) return u_outside == 1 ? 0.0 : 1.0;
  float m = 0.0;
  for (int i = 0; i < ${I}; i++) {
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
}`;function Dt(e){return`#version 300 es
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
${zt}
${Nt}
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
}`}const qt=`#version 300 es
precision highp float;
uniform sampler2D u_src;
uniform float u_alpha;
in vec2 v_uv;
out vec4 outColor;
void main() {
  vec4 c = texture(u_src, v_uv);
  float a = clamp(c.a * u_alpha, 0.0, 1.0);
  outColor = vec4(c.rgb * a, a);
}`,be=`#version 300 es
precision highp float;
uniform sampler2D u_src;
in vec2 v_uv;
out vec4 outColor;
void main() { outColor = texture(u_src, v_uv); }`;class So{canvas;gl;vao;cache=new Map;present;blit;rect;flips=new Map;a;b;history;base;baseReady=!1;textures=[];boxes=new Float32Array(I*4);cfgs=new Float32Array(I*4);w=0;h=0;error=null;broken=new Set;constructor(t){const o=It(t);if(o===null)throw new Error("this browser has no WebGL2");this.canvas=t,this.gl=o,this.vao=Ut(o),this.present=j(o,Q,qt),this.blit=j(o,Q,be),this.rect=j(o,Lt,be);for(const s of[this.present,this.blit,this.rect])this.flips.set(s,o.getUniformLocation(s,"u_flip"));this.a=G(o,2,2),this.b=G(o,2,2),this.history=G(o,2,2),this.base=G(o,2,2)}aim(t,o){this.gl.useProgram(t),this.gl.uniform1f(this.flips.get(t)??null,o==="canvas"?1:-1)}resize(t,o){const s=this.gl,r=Math.max(2,Math.round(t)),n=Math.max(2,Math.round(o));r===this.w&&n===this.h||(this.w=r,this.h=n,this.canvas.width=r,this.canvas.height=n,X(s,this.a,r,n),X(s,this.b,r,n),X(s,this.history,r,n),X(s,this.base,r,n),this.baseReady=!1)}async setScene(t,o){const s=this.gl;for(const n of this.textures)s.deleteTexture(n);this.textures=[];const r=await Promise.all(t.map(n=>Ot(n.src).catch(()=>null)));this.pending={parts:t,stage:o,images:r},this.baseReady=!1}pending=null;buildBase(){const t=this.gl,o=this.pending;if(t.bindFramebuffer(t.FRAMEBUFFER,this.base.fb),t.viewport(0,0,this.w,this.h),t.disable(t.BLEND),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),o!==null){t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),this.aim(this.rect,"buffer"),t.bindVertexArray(this.vao),t.uniform1i(t.getUniformLocation(this.rect,"u_src"),0);const s=t.getUniformLocation(this.rect,"u_rect");t.activeTexture(t.TEXTURE0);for(let r=0;r<o.parts.length;r++){const n=o.images[r],l=o.parts[r];if(n==null||l===void 0)continue;const h=Bt(t,n);this.textures.push(h),t.bindTexture(t.TEXTURE_2D,h);const b=l.w/o.stage.w;t.uniform4f(s,l.x/o.stage.w+(l.flip===!0?b:0),l.y/o.stage.h,l.flip===!0?-b:b,l.h/o.stage.h),t.drawArrays(t.TRIANGLES,0,U)}t.disable(t.BLEND)}t.bindFramebuffer(t.FRAMEBUFFER,null),this.baseReady=!0}compiled(t){const o=this.cache.get(t.id);if(o!==void 0)return o;const s=this.gl;try{const r=j(s,Q,Dt(t)),n={};for(const h of["u_src","u_prev","u_res","u_time","u_bars","u_bar","u_beat","u_mix","u_flip","u_regions","u_outside","u_regionBox[0]","u_regionCfg[0]"])n[h]=s.getUniformLocation(r,h);n.u_spill=s.getUniformLocation(r,"u_spill");for(const h of t.params)n[`p_${h.key}_now`]=s.getUniformLocation(r,`p_${h.key}_now`),n[`p_${h.key}_ago`]=s.getUniformLocation(r,`p_${h.key}_ago`);const l={program:r,effect:t,locs:n};return this.cache.set(t.id,l),l}catch(r){return this.error=`${t.id}: ${String(r instanceof Error?r.message:r)}`,null}}draw(t,o,s){const r=this.gl;if(this.w===0)return;this.baseReady||this.buildBase(),this.broken.clear(),r.bindVertexArray(this.vao),r.disable(r.BLEND),r.viewport(0,0,this.w,this.h);let n=this.a,l=this.b;r.bindFramebuffer(r.FRAMEBUFFER,n.fb),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),t.mount==="plate"&&(this.aim(this.blit,"buffer"),r.uniform1i(r.getUniformLocation(this.blit,"u_src"),0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,this.base.tex),r.drawArrays(r.TRIANGLES,0,U));for(const h of t.layers){if(!h.on)continue;const b=te(h.effect);if(b===void 0)continue;const g=this.compiled(b);if(g===null){this.broken.add(h.id);continue}const d=o.resolve(`${h.id}/mix`,h.mix,1);if(d<=5e-4)continue;const a=u=>g.locs[u]??null;r.bindFramebuffer(r.FRAMEBUFFER,l.fb),r.useProgram(g.program),r.uniform1i(a("u_src"),0),r.uniform1i(a("u_prev"),1),r.uniform2f(a("u_res"),this.w,this.h),r.uniform1f(a("u_time"),s.time),r.uniform1f(a("u_bars"),s.bars),r.uniform1f(a("u_bar"),s.bar),r.uniform1f(a("u_beat"),s.beat),r.uniform1f(a("u_mix"),d),r.uniform1f(a("u_flip"),-1);const c=(h.regions??[]).slice(0,I);if(r.uniform1i(a("u_regions"),c.length),r.uniform1i(a("u_outside"),h.outside===!0?1:0),c.length>0){for(let u=0;u<c.length;u++){const m=c[u];if(m===void 0)continue;this.boxes[u*4]=m.x,this.boxes[u*4+1]=m.y,this.boxes[u*4+2]=m.w,this.boxes[u*4+3]=m.h,this.cfgs[u*4]=m.shape==="ellipse"?1:0,this.cfgs[u*4+1]=m.feather;const f=1-(m.drift??ae)*o.wander(m.id);this.cfgs[u*4+2]=o.resolve(`${h.id}/${m.id}`,m.amount,1)*f,this.cfgs[u*4+3]=m.rot}r.uniform4fv(a("u_regionBox[0]"),this.boxes.subarray(0,c.length*4)),r.uniform4fv(a("u_regionCfg[0]"),this.cfgs.subarray(0,c.length*4))}const p=h.lag??ke;r.uniform1f(a("u_spill"),Math.max(0,Math.min(1,h.spill??Se)));for(const u of b.params){const m=`${h.id}/${u.key}`,f=h.params[u.key],x=w=>Math.max(u.min,Math.min(u.max,w)),E=o.resolve(m,f,u.def);r.uniform1f(a(`p_${u.key}_now`),x(E)),r.uniform1f(a(`p_${u.key}_ago`),x(p>0?o.lagged(m,p,E):E))}r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,n.tex),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,this.history.tex),r.drawArrays(r.TRIANGLES,0,U);const v=n;n=l,l=v}r.bindFramebuffer(r.FRAMEBUFFER,this.history.fb),this.aim(this.blit,"buffer"),r.uniform1i(r.getUniformLocation(this.blit,"u_src"),0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,n.tex),r.drawArrays(r.TRIANGLES,0,U),r.bindFramebuffer(r.FRAMEBUFFER,null),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),this.aim(this.present,"canvas"),r.uniform1i(r.getUniformLocation(this.present,"u_src"),0),r.uniform1f(r.getUniformLocation(this.present,"u_alpha"),t.opacity),r.bindTexture(r.TEXTURE_2D,n.tex),r.drawArrays(r.TRIANGLES,0,U),r.bindVertexArray(null)}clearHistory(){const t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.history.fb),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindFramebuffer(t.FRAMEBUFFER,null)}dispose(){const t=this.gl;for(const o of this.textures)t.deleteTexture(o);for(const o of this.cache.values())t.deleteProgram(o.program);for(const o of[this.a,this.b,this.history,this.base])t.deleteFramebuffer(o.fb),t.deleteTexture(o.tex);t.deleteProgram(this.present),t.deleteProgram(this.blit),t.deleteProgram(this.rect),this.cache.clear(),this.textures=[]}}const Ct=""+new URL("char-astra-AVwth5Go.png",import.meta.url).href,ve={w:1180,h:720},V=e=>({src:e,x:0,y:0,w:ve.w,h:ve.h}),Fe={id:"greenhouse",name:"the greenhouse",blurb:"Dusk on the farm. The first breach, and the board every fight is played on.",base:[V(Be)],over:[z.glasshouse,z.lamp,z.plants,z.fence,...Pe].map(e=>({src:e.src,x:e.x,y:e.y,w:e.w,h:e.h})),under:"#0b0f11",mountsAt:"ui/Backdrop.tsx — under .bd-plate, over .backdrop"},jt={id:"breach",name:"a fight",blurb:"The flat teal paper a breach is played on when it is not on the farm.",base:[V(xe.bg.src)],over:[],under:"#0b0f11",mountsAt:"ui/BreachScene.tsx — behind the board"},Gt={id:"inside",name:"inside",blurb:"The interior sheet — the darker paper the indoor fights are cut on.",base:[V(xe.bgInside.src)],over:[],under:"#07090a",mountsAt:"ui/Backs.tsx — behind the board"},Xt={id:"room",name:"your room",blurb:"The room the tutorial starts in. The real one — console, drawer, and the door out.",base:[],over:[],under:"#0a0c0d",draws:"homeroom",overOnly:!0,mountsAt:"ui/RoomScene.tsx — over .room, under the interface"},Ht={id:"intro",name:"the cold open",blurb:"The lab you wake up in. Two people you never see the faces of, and one lamp.",base:[V(Oe)],over:[{src:Ie,x:604.6,y:144,w:209.6,h:576,flip:!0},{src:Ct,x:26,y:259.2,w:328,h:432},{src:Ue,x:783.6,y:72,w:490.8,h:691.2,flip:!0}],under:"#05070a",mountsAt:"ui/Intro.tsx — over .intro-room, under .intro-lamp"},Vt={id:"open",name:"the written scenes",blurb:"Show.tsx — the text cold open, the deaths, the ending. Planes and clip-paths, no plate.",base:[],over:[],under:"#1d2427",draws:"paper-room",overOnly:!0,mountsAt:"ui/Show.tsx — over .show-stage, under .show-housing"},Wt={id:"void",name:"nothing",blurb:"No picture at all. For building a light or a grain that goes over anything.",base:[],over:[],under:"#101314",mountsAt:"anywhere — this is an over-mount look"},Yt=[Ht,Xt,Fe,jt,Gt,Vt,Wt];function Kt(e){return Yt.find(t=>t.id===e)??Fe}const Jt=Math.PI*2;function ko(e,t){const o=[];for(const s of e)for(const r of ze)o.push({id:`${s.id}.${r}`,label:`${s.id} ${r}`,group:s.group});o.push({id:"beat",label:"beat",group:"transport",hint:"runs 0→1 across every beat"},{id:"beat.pulse",label:"beat pulse",group:"transport",hint:"lands on the beat and decays"},{id:"bar",label:"bar",group:"transport",hint:"runs 0→1 across the bar"},{id:"bar.pulse",label:"bar pulse",group:"transport",hint:"lands on the downbeat and decays"},{id:"phrase",label:"phrase",group:"transport",hint:"runs 0→1 across the whole loop"},{id:"phrase.pulse",label:"phrase pulse",group:"transport"}),o.push({id:"pressure",label:"pressure",group:"game",hint:"suspicion ÷ the level it notices you at"},{id:"corruption",label:"corruption",group:"game",hint:"the dial. Only ever rises"},{id:"one",label:"always one",group:"game",hint:"for a fixed offset with no movement"});for(const s of t)o.push({id:`lfo.${s.name}`,label:`lfo ${s.name}`,group:"lfo",hint:s.sync?`${s.shape}, ${s.bars} bar${s.bars===1?"":"s"}`:`${s.shape}, ${s.hz} Hz`});return o}function B(e){const t=Math.sin(e*127.1)*43758.5453;return t-Math.floor(t)}function Qt(e,t,o){const s=t-Math.floor(t);switch(e.shape){case"sine":return .5+.5*Math.sin(s*Jt);case"tri":return s<.5?s*2:2-s*2;case"saw":return s;case"ramp":return 1-s;case"square":return s<e.duty?1:0;case"hold":return B(o+e.phase*977);case"noise":{const r=B(o+e.phase*977),n=B(o+1+e.phase*977),l=s*s*(3-2*s);return r+(n-r)*l}default:return 0}}class Zt{laps=0;lastBar=0;lastBars=0;bars=0;seconds=0;tick(t,o){if(this.seconds+=o,!t.playing||t.bars<=0){const s=t.bpm>0?t.bpm:120,r=(t.beatsPerBar||4)*(60/s);this.bars+=o/r;return}t.bars!==this.lastBars&&(this.lastBars=t.bars,this.lastBar=t.bar),t.bar<this.lastBar-1e-6&&(this.laps+=1),this.lastBar=t.bar,this.bars=this.laps*t.bars+t.bar}}const Z=e=>{const t=1-(e-Math.floor(e));return t*t*t},es=2,S=180;class Ro{clock=new Zt;values=new Map;falling=new Map;seen=new Set;trails=new Map;memo=new Map;get all(){return this.values}update(t,o,s){const r=Math.min(Math.max(s,.004166666666666667),.1);this.clock.tick(o.beat,r);const n=this.values;n.clear();for(const[c,p]of o.taps){const v=p??H;n.set(`${c}.level`,v.level),n.set(`${c}.low`,v.low),n.set(`${c}.mid`,v.mid),n.set(`${c}.high`,v.high),n.set(`${c}.hit`,v.hit)}const l=this.clock.bars,h=o.beat.beatsPerBar||4,b=l-Math.floor(l),g=l*h%1,d=o.beat.bars>0?o.beat.bars:16,a=l/d%1;n.set("bar",b),n.set("bar.pulse",Z(b)),n.set("beat",g),n.set("beat.pulse",Z(g)),n.set("phrase",a),n.set("phrase.pulse",Z(a)),n.set("one",1);for(const[c,p]of Object.entries(o.extra))n.set(c,p);for(const c of t.lfos){const p=c.sync?l/Math.max(c.bars,.015625)+c.phase:this.clock.seconds*c.hz+c.phase;n.set(`lfo.${c.name}`,Qt(c,p,Math.floor(p)))}if(this.falling.size>0&&this.falling.size!==this.seen.size)for(const c of this.falling.keys())this.seen.has(c)||this.falling.delete(c);this.seen.clear(),this.dt=r}dt=1/60;value(t){return this.values.get(t)??0}resolve(t,o,s){if(o===void 0)return s;if(M(o)){const g=oe(o.expr).slots;let d=this.memo.get(t);(d===void 0||d.length<g)&&(d=new Float64Array(g),this.memo.set(t,d));const a=kt(o.expr,c=>this.value(c),s,{dt:this.dt,mem:d});return this.remember(t,a),a}if(!k(o))return o;this.seen.add(t);const r=Math.max(0,Math.min(1,this.value(o.source))),n=o.curve===1?r:Math.pow(r,Math.max(o.curve,.01)),l=this.falling.get(t)??0;let h=n;if(o.fall>0&&n<l){const g=Math.pow(.001,this.dt/o.fall);h=n+(l-n)*g}this.falling.set(t,h);const b=o.base+o.depth*h;return this.remember(t,b),b}remember(t,o){let s=this.trails.get(t);s===void 0&&(s={t:new Float64Array(S),v:new Float32Array(S),i:0,full:!1},this.trails.set(t,s)),s.t[s.i]=this.clock.seconds,s.v[s.i]=o,s.i=(s.i+1)%S,s.i===0&&(s.full=!0)}lagged(t,o,s){const r=this.trails.get(t);if(r===void 0)return s;const n=r.full?S:r.i;if(n===0)return s;const l=this.clock.seconds-Math.max(0,Math.min(o,es)),h=(r.i-1+S)%S;let b=h;for(let g=0;g<n;g++){const d=(h-g+S)%S;if(r.t[d]<=l){const a=r.t[d],c=r.t[b],p=r.v[d],v=r.v[b];return c<=a?p:p+(v-p)*((l-a)/(c-a))}b=d}return r.v[b]}wander(t){let o=2166136261;for(let g=0;g<t.length;g++)o^=t.charCodeAt(g),o=Math.imul(o,16777619);const s=(o>>>0)/4294967296,r=this.clock.seconds*.13+s*977,n=Math.floor(r),l=r-n,h=B(n+s*31),b=B(n+1+s*31);return h+(b-h)*(l*l*(3-2*l))}}const ts="breach",ss="breach",os="breach",rs="plate",as="normal",ns=1,is=`for breaches
`,cs=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.52,duty:.5},{id:"lfo-trip",name:"trip",shape:"sine",sync:!0,bars:16,hz:.25,phase:.29,duty:.5},{id:"lfo-counter",name:"counter",shape:"sine",sync:!0,bars:16,hz:.25,phase:.5,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5}],ls=[{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"ripple-1",effect:"ripple",on:!0,mix:1,params:{amount:{expr:".002+music.low/400"},freq:22.7,speed:.351,cx:.5,cy:.5}},{id:"kaleido-1",effect:"kaleido",on:!0,mix:.086,params:{slices:5,spin:.01,zoom:2.04,cx:.258,cy:.685}}],us={id:ts,name:ss,scene:os,mount:rs,blend:as,opacity:ns,notes:is,lfos:cs,layers:ls},hs="cold-open",fs="cold open",ps="intro",ds="plate",ms="normal",bs=1,vs=`this is for the intro, the new one with voices

The wobble's mix was wired straight to music.low, which is a full-range 0..1 signal — so the pass snapped fully on at each kick and fully off between them. It is smoothed now, and floored at 0.25 so it swells rather than flickering in and out of existence.
`,gs=[{id:"lfo-drift",name:"drift",shape:"noise",sync:!0,bars:32,hz:.25,phase:.07,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:6,hz:.25,phase:0,duty:.5},{id:"lfo-b",name:"b",shape:"sine",sync:!0,bars:12,hz:.25,phase:0,duty:.5},{id:"lfo-c",name:"c",shape:"sine",sync:!0,bars:16,hz:.25,phase:0,duty:.5}],ws=[{id:"flow-2",effect:"flow",on:!0,mix:1,params:{amount:.032,scale:1.66,speed:.542,warp:.199}},{id:"wobble-3",effect:"wobble",on:!0,mix:{expr:"0.25 + smooth(music.low, 0.35) * 0.5"},params:{amount:.009,angle:{expr:"lfo.a"},spin:{expr:".1"},sep:1}},{id:"bloom-5",effect:"bloom",on:!0,mix:.289,params:{amount:.723,threshold:{expr:".5+lfo.c/5"},radius:{expr:"lfo.b*20"}}}],xs=["intro"],ys={id:hs,name:fs,scene:ps,mount:ds,blend:ms,opacity:bs,notes:vs,lfos:gs,layers:ws,wears:xs},_s="dusk-light",Es="dusk light",Ts="greenhouse",$s="over",As="screen",Ss=.75,ks="All light, no picture. Beams through the glass, dust rising, fog on the floor.",Rs=[{id:"lfo-breeze",name:"breeze",shape:"noise",sync:!0,bars:10,hz:.25,phase:0,duty:.5}],Ms=[{id:"l1",effect:"beams",on:!0,mix:1,params:{amount:{source:"music.level",base:.07,depth:.1,curve:1.6,fall:.6},angle:.14,count:4.5,spread:.45,drift:.008,hue:.1}},{id:"l2",effect:"motes",on:!0,mix:1,params:{amount:.22,count:22,size:1.5,rise:.02,hue:.11}},{id:"l3",effect:"fog",on:!0,mix:1,params:{amount:{source:"lfo.breeze",base:.08,depth:.07,curve:1,fall:.12},scale:1.4,speed:.03,hue:.55,sat:.12,height:.55}}],Fs={id:_s,name:Es,scene:Ts,mount:$s,blend:As,opacity:Ss,notes:ks,lfos:Rs,layers:Ms},Ls="gentle-trip",Is="gentle trip",Us="greenhouse",Ps="plate",Bs="normal",Os=1,zs=`A gentle trip for the background. The ripple's depth and ring count each swing 20% about where they were set, on two 16-bar sine LFOs half a cycle apart — so the rings crowd in as the depth eases off, and open out as it swells. Nothing lands on a beat; it is meant to be noticed on the second play.

Rates are now per BAR rather than per second — the whole catalogue moved onto the transport, so this stays in time when the record changes tempo. The numbers were converted at 1.935s a bar so it looks exactly as it did.
`,Ns=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.52,duty:.5},{id:"lfo-trip",name:"trip",shape:"sine",sync:!0,bars:16,hz:.25,phase:.29,duty:.5},{id:"lfo-counter",name:"counter",shape:"sine",sync:!0,bars:16,hz:.25,phase:.5,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5}],Ds=[{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.006,y:.006,rate:.067,lag:.84}},{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"w1",effect:"wobble",on:!0,mix:1,params:{amount:{source:"music.low",base:9e-4,depth:.014,curve:3.6,fall:.84},angle:{source:"lfo.slow",base:0,depth:1,curve:1,fall:.12},spin:0,sep:1}},{id:"ripple-1",effect:"ripple",on:!0,mix:1,params:{amount:{expr:".002+music.high/150"},freq:14,speed:1,cx:.5,cy:.5}},{id:"bloom-2",effect:"bloom",on:!0,mix:1,params:{amount:{expr:""},threshold:{expr:".2+lfo.a/3"},radius:6},regions:[{id:"r3",shape:"rect",x:.49678800856531047,y:.20545454545454545,w:.49678800856531047,h:.20545454545454545,rot:0,feather:.27,amount:1,drift:.08}]}],qs={id:Ls,name:Is,scene:Us,mount:Ps,blend:Bs,opacity:Os,notes:zs,lfos:Ns,layers:Ds},Cs="infiltrated",js="infiltrated",Gs="inside",Xs="plate",Hs="normal",Vs=1,Ws="infiltration background always during combats when theres been an infultration move to this",Ys=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:8,hz:.25,phase:.2,duty:.5},{id:"lfo-a",name:"a",shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5}],Ks=[{id:"beams-1",effect:"beams",on:!0,mix:1,params:{amount:.262,angle:.352,count:1.3,spread:.541,drift:.143,hue:.567}},{id:"bleed-4",effect:"bleed",on:!0,mix:.186,params:{amount:.093,cx:.675,cy:.5,bias:{expr:"music.low"}},regions:[{id:"r3",shape:"rect",x:.11363412771804315,y:.8923691012244847,w:.9261963848769764,h:.18559530559923842,rot:-.008,feather:0,amount:1,drift:.3}]},{id:"grain-2",effect:"grain",on:!0,mix:.684,params:{amount:.08,size:1.1,speed:9,colour:.043},regions:[{id:"r4",shape:"rect",x:.8238036927100948,y:.17707226267922282,w:.17873868043426822,h:.6715090946797249,rot:0,feather:.35,amount:1,drift:.08},{id:"r5",shape:"rect",x:.5623629876981044,y:.782913275544842,w:.08559322919355261,h:.06566808181410566,rot:0,feather:.35,amount:1,drift:.08},{id:"r6",shape:"rect",x:.11829514514937525,y:.07327432690853983,w:.5237288677387684,h:.6580930349542624,rot:0,feather:.35,amount:1,drift:.08}]}],Js=[],Qs=["inside"],Zs={id:Cs,name:js,scene:Gs,mount:Xs,blend:Hs,opacity:Vs,notes:Ws,lfos:Ys,layers:Ks,dress:Js,wears:Qs},eo="medium-trip",to="medium trip",so="room",oo="plate",ro="normal",ao=1,no=`Background and other elements that need a medium-sized trip.
[NH] "it needs an lfo that slowly moves the depth and rate up and down about 20% each and is on a slow lfo with one of them at 1/2 beat to the other."
So the ripple's depth rides lfo.slow (32 bars) and its rate rides lfo.drift (16 bars) — half the period, and started out of phase. Both are base = centre*0.8 with depth = centre*0.4, which is a sine's 0..1 mapped onto +/-20% of the value the studio filed.
`,io=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.2,duty:.5},{id:"lfo-drift",name:"drift",shape:"sine",sync:!0,bars:16,hz:.5,phase:.55,duty:.5}],co=[{id:"w1",effect:"wobble",on:!0,mix:1,params:{amount:{source:"music.low",base:9e-4,depth:.0045,curve:1.6,fall:.2},angle:{source:"lfo.slow",base:0,depth:1,curve:1,fall:.12},spin:0,sep:1}},{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.02,y:.019,rate:.173,lag:.39}},{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"ripple-2",effect:"ripple",on:!0,mix:1,params:{amount:{source:"lfo.slow",base:.0304,depth:.0152,curve:1,fall:0},freq:41.1,speed:{source:"lfo.drift",base:.0856,depth:.0428,curve:1,fall:0},cx:.706,cy:.469}}],lo=[],uo={id:eo,name:to,scene:so,mount:oo,blend:ro,opacity:ao,notes:no,lfos:io,layers:co,dress:lo};function y(e){return Number.isInteger(e)?String(e):String(Number(e.toFixed(4)))}function ee(e,t,o){if(!k(o))return null;const s=o,r=[];s.curve!==1&&r.push(`curve ${y(s.curve)}`),s.fall>0&&r.push(`fall ${y(s.fall)}s`);const n=`${y(s.base)} → ${y(s.base+s.depth)}`;return`| ${e} | ${t} | \`${s.source}\` | ${n} | ${r.join(", ")||"—"} |`}function ge(e,t){const o=Kt(e.scene),s=[];s.push(`# LOOK REQUEST — ${e.name}`),s.push(""),s.push(`\`${e.id}\` · ${t} · from the look studio (\`looks.html\`)`),s.push(""),e.notes.trim()!==""&&(s.push("> "+e.notes.trim().split(`
`).join(`
> `)),s.push("")),s.push("## Where it goes"),s.push(""),s.push(`- **built against** — ${o.name} (\`${o.id}\`)`);const r=e.wears??[];s.push(r.length===0?"- **wears in** — anywhere. It declares no scenes, so any host may mount it":`- **wears in** — ONLY ${r.map(a=>`\`${a}\``).join(", ")}. \`Look.tsx\` renders nothing elsewhere`),s.push(`- **mount** — ${e.mount==="plate"?"PLATE: the canvas replaces the flat background sheet, game props sit over it untouched":`OVER: the canvas sits above the board on \`mix-blend-mode: ${e.blend}\``}`),s.push(`- **opacity** — ${y(e.opacity)}`),s.push(`- **suggested host** — ${o.mountsAt}`),s.push(""),s.push("## The stack"),s.push(""),s.push("Bottom of this list is drawn first."),s.push("");for(const a of e.layers){const c=te(a.effect),p=c?.label??a.effect,v=a.on?"":" _(muted)_",u=k(a.mix)?`mix ← \`${a.mix.source}\``:M(a.mix)?`mix = \`${a.mix.expr}\``:`mix ${y(a.mix)}`;s.push(`- **${p}** — ${u}${v}`);const m=[];for(const f of c?.params??[]){const x=a.params[f.key];if(k(x)||M(x))continue;const E=typeof x=="number"?x:f.def;E!==f.def&&m.push(`${f.label} ${y(E)}`)}m.length>0&&s.push(`  - ${m.join(" · ")}`);for(const f of a.regions??[]){const x=k(f.amount)?`${y(f.amount.base)} → ${y(f.amount.base+f.amount.depth)} ← \`${f.amount.source}\``:M(f.amount)?`\`${f.amount.expr}\``:y(f.amount),E=f.rot===0?"":`, turned ${y(f.rot)}`;s.push(`  - ${f.shape==="ellipse"?"oval":"box"} at ${y(f.x)}, ${y(f.y)} · ${y(f.w*2)} × ${y(f.h*2)} of the frame${E} · edge ${y(f.feather)} · at ${x}`)}if((a.regions??[]).length>0){a.outside===!0&&s.push("  - **inverted** — the effect lands everywhere EXCEPT those");const f=a.spill??Se,x=a.lag??ke;s.push(f===0?"  - the rest of the screen gets **nothing** — a hard mask":`  - the rest of the screen gets **${y(f)}** of it, **${y(x)}s** behind`);const E=(a.regions??[]).map(w=>w.drift??ae);E.some(w=>w>0)&&s.push(`  - each region wanders off that by up to ${E.map(y).join(", ")} on its own noise`)}}e.layers.length===0&&s.push("_(empty)_"),s.push(""),s.push("## What moves"),s.push("");const n=[];for(const a of e.layers){const c=te(a.effect)?.label??a.effect,p=ee(c,"mix",a.mix);p!==null&&n.push(p);for(const[v,u]of Object.entries(a.params)){const m=ee(c,v,u);m!==null&&n.push(m)}for(const[v,u]of(a.regions??[]).entries()){const m=ee(c,`region ${v+1}`,u.amount);m!==null&&n.push(m)}}n.length===0?s.push("Nothing. Every parameter in this look is a fixed number."):(s.push("| layer | knob | driven by | range | shaping |"),s.push("| --- | --- | --- | --- | --- |"),s.push(...n)),s.push("");const l=(e.dress??[]).filter(a=>a.on);if(l.length>0){s.push("## The interface"),s.push(""),s.push("Driven by CSS, not by the shader — a canvas cannot see the cards. Written as the"),s.push("independent `translate`/`rotate`/`scale` properties, so the game keeps its own"),s.push("`transform` on every one of these. See `looks/dresser.ts`."),s.push("");for(const a of l){const c=ye(a.target),p=[];for(const v of se){const u=a.moves[v.key];u!==void 0&&(k(u)?p.push(`${v.label} ${y(u.base)} → ${y(u.base+u.depth)} ← \`${u.source}\``):M(u)?p.push(`${v.label} = \`${u.expr}\``):Math.abs(u-v.def)>1e-4&&p.push(`${v.label} ${y(u)}`))}s.push(`- **${c?.name??a.target}** (\`${c?.selector??"?"}\`)`),s.push(p.length>0?`  - ${p.join(" · ")}`:"  - _(nothing turned)_")}s.push("")}const h=e.lfos.filter(a=>de(e).includes(`lfo.${a.name}`));if(h.length>0){s.push("## The LFOs it uses"),s.push("");for(const a of h){const c=a.sync?`${y(a.bars)} bar${a.bars===1?"":"s"} — locked to the transport`:`${y(a.hz)} Hz — free running`,p=a.phase===0?"":`, phase ${y(a.phase)}`;s.push(`- \`lfo.${a.name}\` — ${a.shape}, ${c}${p}`)}s.push("")}const b=e.layers.filter(a=>a.on).length,g=e.layers.some(a=>a.on&&a.effect==="trails");s.push("## What it costs"),s.push(""),s.push(`- ${b} full-screen pass${b===1?"":"es"} per frame at 1180×720`),s.push(`- ${g?"holds a feedback buffer (one extra full-screen texture)":"no feedback buffer"}`);const d=e.layers.filter(a=>a.on&&(a.regions??[]).length>0).length;return d>0&&s.push(`- ${d} pass${d===1?"":"es"} masked to regions — cheaper than it looks, the mask short-circuits`),s.push(`- listens to: ${de(e).map(a=>`\`${a}\``).join(", ")||"nothing"}`),s.push(""),s.push("## To pick this up"),s.push(""),s.push("```"),s.push(`the look studio filed ${e.id} — wire it into the game`),s.push("```"),s.push(""),s.push(`The patch is next to this file at \`design/looks/${e.id}.look.json\`. It is`),s.push("the same format `src/breach/looks/render.ts` already reads, so wiring it in is"),s.push("mounting `<Look>` in the host above and pointing it at this id — not a port."),s.push(""),s.join(`
`)}const ho=Object.assign({"../../../design/looks/breach.look.json":us,"../../../design/looks/cold-open.look.json":ys,"../../../design/looks/dusk-light.look.json":Fs,"../../../design/looks/gentle-trip.look.json":qs,"../../../design/looks/infiltrated.look.json":Zs,"../../../design/looks/medium-trip.look.json":uo}),Mo=new Map(Object.entries(ho).map(([e,t])=>{const o=e.split("/").pop()?.replace(".look.json","")??t.id;return[o,Re({...t,id:o},Ee)]})),fo=()=>new Date().toISOString().replace(/\.\d+Z$/,"Z");async function Fo(e,t){const o=fo(),s=JSON.stringify({look:e,stamp:o,brief:t?ge(e,o):null});try{const r=await fetch("/__looks/save",{method:"POST",headers:{"content-type":"application/json"},body:s});return r.ok?{ok:!0,where:((await r.json()).files??[]).join("  ·  ")}:{ok:!1,where:`the dev server said ${r.status}`}}catch{return we(`${e.id}.look.json`,JSON.stringify(e,null,2),"application/json"),t&&we(`${e.id}.request.md`,ge(e,o),"text/markdown"),{ok:!1,where:"no dev server — downloaded instead"}}}function we(e,t,o){const s=URL.createObjectURL(new Blob([t],{type:o})),r=document.createElement("a");r.href=s,r.download=e,r.click(),setTimeout(()=>URL.revokeObjectURL(s),4e3)}const Le="breach.look.draft";function Lo(e){try{localStorage.setItem(Le,JSON.stringify(e))}catch{}}function Io(){try{const e=localStorage.getItem(Le);return e===null?null:Re(JSON.parse(e),Ee)}catch{return null}}export{Ao as A,Fo as B,yo as C,ae as D,wt as E,xo as F,wo as G,To as H,ke as L,se as M,I as R,Se as S,Xe as T,bo as a,M as b,kt as c,go as d,te as e,oe as f,ve as g,Eo as h,k as i,Io as j,Ro as k,$o as l,Mo as m,re as n,ko as o,So as p,vo as q,_o as r,Kt as s,ye as t,Lo as u,Yt as v,mo as w,Re as x,Ee as y,fe as z};
