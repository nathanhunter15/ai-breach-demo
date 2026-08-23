import{R as M,h as B,L as be,P as ge,A as ce}from"./room-AF3HWnsj.js";const W={level:0,low:0,mid:0,high:0,hit:0,raw:0},_e=["level","low","mid","high","hit"],j=1024,xe=[[20,180],[180,2e3],[2e3,12e3]],we=.87,I=.015,ye=.86,Ee=.02,Te=.02;function P(e,t,r,s){if(t>=e||r<=0)return t;const o=Math.pow(.001,s/r);return t+(e-t)*o}function O(e,t,r){return Math.max(0,Math.min(1,(e-t)/Math.max(r-t,Ee)))}function D(e,t,r){return Math.max(I,t>e?t:e*Math.pow(we,r))}function z(e,t,r){return t<e?t:t+(e-t)*Math.pow(ye,r)}class Gt{ctx;chans=new Map;constructor(t){this.ctx=t}get names(){return[...this.chans.keys()]}tap(t,r){if(this.chans.has(t))return;const s=this.ctx.createAnalyser();s.fftSize=j,s.smoothingTimeConstant=0,r.connect(s);const o=this.ctx.sampleRate/2,n=j/2,l=xe.map(([u,m])=>{const i=Math.max(1,Math.floor(u/o*n)),v=Math.min(n-1,Math.ceil(m/o*n));return[i,Math.max(i+1,v)]});this.chans.set(t,{analyser:s,freq:new Uint8Array(n),time:new Uint8Array(j),bins:l,last:new Float32Array(n),ceil:{level:I,low:I,mid:I,high:I,flux:.02},base:{level:0,low:0,mid:0,high:0},smoothed:{level:0,low:0,mid:0,high:0},hit:0,reading:W})}has(t){return this.chans.has(t)}read(t){return this.chans.get(t)?.reading??W}all(){const t=new Map;for(const[r,s]of this.chans)t.set(r,s.reading);return t}update(t){const r=Math.min(Math.max(t,.004166666666666667),.1);for(const s of this.chans.values())this.one(s,r)}one(t,r){const{analyser:s,freq:o,time:n,bins:l,last:u}=t;s.getByteFrequencyData(o),s.getByteTimeDomainData(n);let m=0;for(let w=0;w<n.length;w++){const E=((n[w]??128)-128)/128;m+=E*E}const i=Math.sqrt(m/n.length),v=w=>{if(w===void 0)return 0;const[E,k]=w;let Z=0;for(let G=E;G<k;G++)Z+=o[G]??0;return Z/((k-E)*255)},p=v(l[0]),h=v(l[1]),g=v(l[2]);let d=0;for(let w=1;w<o.length;w++){const E=(o[w]??0)/255,k=E-(u[w]??0);k>0&&(d+=k),u[w]=E}d/=o.length;const c=t.ceil,f=t.base;c.level=D(c.level,i,r),c.low=D(c.low,p,r),c.mid=D(c.mid,h,r),c.high=D(c.high,g,r),c.flux=Math.max(.004,d>c.flux?d:c.flux*Math.pow(.9,r)),f.level=z(f.level,i,r),f.low=z(f.low,p,r),f.mid=z(f.mid,h,r),f.high=z(f.high,g,r);const b=t.smoothed;b.level=P(b.level,O(i,f.level,c.level),.16,r),b.low=P(b.low,O(p,f.low,c.low),.1,r),b.mid=P(b.mid,O(h,f.mid,c.mid),.12,r),b.high=P(b.high,O(g,f.high,c.high),.08,r);const y=Math.min(1,Math.max(0,(d/c.flux-.55)/.45)),S=t.hit*Math.pow(Te,r);t.hit=Math.max(S,y),t.reading={level:b.level,low:b.low,mid:b.mid,high:b.high,hit:t.hit,raw:i}}dispose(){for(const t of this.chans.values())t.analyser.disconnect();this.chans.clear()}}const a=(e,t,r,s,o,n=.001,l={})=>({key:e,label:t,min:r,max:s,def:o,step:n,...l}),Ae={id:"wobble",label:"RGB wobble",group:"colour",blurb:"The three channels pull apart along a line that turns. The house preset.",needsImage:!0,params:[a("amount","split",0,.03,.0025),a("angle","angle",0,1,0),a("spin","spin",-.5,.5,.03),a("sep","green centred",0,1,1,1,{options:["no","yes"],hint:"off pushes green the other way, which reads dirtier"})],glsl:`
vec4 fx(vec2 uv) {
  float a = (p_angle + u_time * p_spin) * TAU;
  vec2 d = vec2(cos(a), sin(a)) * p_amount / ASP;
  vec4 c = src(uv);
  float r = src(uv + d).r;
  float b = src(uv - d).b;
  float g = p_sep > 0.5 ? c.g : src(uv + d.yx * 0.6).g;
  return vec4(r, g, b, c.a);
}`},Re={id:"ripple",label:"ripple",group:"move",blurb:"Rings running out from a point, like something was dropped in it.",needsImage:!0,params:[a("amount","depth",0,.06,.004),a("freq","rings",1,60,14,.1),a("speed","speed",-4,4,1),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP;
  float r = length(d);
  float w = sin(r * p_freq - u_time * p_speed * TAU * 0.5);
  vec2 off = normalize(d + 1e-6) * w * p_amount;
  return src(uv + off / ASP);
}`},$e={id:"flow",label:"flow",group:"move",blurb:"Soft noise pushes the picture around. Heat off a road; paper breathing.",needsImage:!0,params:[a("amount","depth",0,.08,.006),a("scale","grain",.5,12,2.4,.01),a("speed","speed",0,2,.14),a("warp","churn",0,1,.35)],glsl:`
vec4 fx(vec2 uv) {
  vec2 q = uv * ASP * p_scale;
  float t = u_time * p_speed;
  vec2 w = vec2(fbm(q + vec2(t, 0.0)), fbm(q + vec2(0.0, t) + 31.7));
  vec2 n = vec2(fbm(q + w * p_warp * 2.0 + 5.2), fbm(q - w * p_warp * 2.0 + 17.3));
  return src(uv + (n - 0.5) * p_amount);
}`},Se={id:"breathe",label:"breathe",group:"move",blurb:"Scale about a point. Bind it to the kick and the room has a pulse.",needsImage:!0,params:[a("amount","zoom",-.2,.2,.008),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5),a("roll","roll",-.2,.2,0)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP;
  d = rot(p_roll * TAU) * d;
  d /= (1.0 + p_amount);
  return src(c + d / ASP);
}`},ke={id:"sway",label:"sway",group:"move",blurb:"Two slow sines, out of phase, so the drift never repeats on itself.",needsImage:!0,params:[a("x","across",0,.06,.006),a("y","up",0,.06,.003),a("rate","rate",0,1,.08),a("lag","lag",0,1,.25,.01,{hint:"how far behind the vertical runs"})],glsl:`
vec4 fx(vec2 uv) {
  float t = u_time * p_rate * TAU;
  vec2 off = vec2(sin(t) * p_x, sin(t * 0.73 + p_lag * TAU) * p_y);
  return src(uv + off);
}`},Le={id:"slice",label:"slice",group:"move",blurb:"Horizontal bands jump sideways. Tape, not glitch — keep it under a hair.",needsImage:!0,params:[a("amount","throw",0,.12,.01),a("rows","bands",2,120,26,1),a("speed","reshuffle",0,20,6,.1),a("chance","how many",0,1,.25)],glsl:`
vec4 fx(vec2 uv) {
  float row = floor(uv.y * p_rows);
  float t = floor(u_time * p_speed);
  float r = hash21(vec2(row, t));
  float hit = step(1.0 - p_chance, r);
  float dir = hash21(vec2(row + 9.1, t)) * 2.0 - 1.0;
  return src(uv + vec2(dir * p_amount * hit, 0.0));
}`},Ie={id:"bleed",label:"bleed",group:"move",blurb:"Smear out from a point. A zoom blur that reads as speed or as glare.",needsImage:!0,params:[a("amount","reach",0,.2,.02),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5),a("bias","bias to light",0,1,.4)],glsl:`
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
}`},Fe={id:"mirror",label:"mirror",group:"mirror",blurb:"Fold one half onto the other. The split moves, which is the whole trick.",needsImage:!0,params:[a("axis","axis",0,2,0,1,{options:["left↔right","top↕bottom","both"]}),a("split","split",0,1,.5),a("flip","keep",0,1,0,1,{options:["near side","far side"]}),a("mix2","fold, or blend",0,1,1,.001,{hint:"1 folds hard, below that ghosts the two halves together"})],glsl:`
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
}`},Ue={id:"kaleido",label:"kaleidoscope",group:"mirror",blurb:"N-fold about a point. Two slices is a mirror; twelve is a rose window.",needsImage:!0,params:[a("slices","slices",2,24,6,1),a("spin","spin",-.5,.5,.01),a("zoom","zoom",.2,3,1,.01),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5)],glsl:`
vec4 fx(vec2 uv) {
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = (uv - c) * ASP / p_zoom;
  float r = length(d);
  float a = atan(d.y, d.x) + u_time * p_spin * TAU;
  float seg = TAU / max(p_slices, 1.0);
  a = mod(a, seg);
  a = abs(a - seg * 0.5);
  vec2 q = c + vec2(cos(a), sin(a)) * r / ASP;
  return src(q);
}`},Me={id:"tile",label:"tile",group:"mirror",blurb:"Repeat the frame in a grid, mirrored at every seam so it never breaks.",needsImage:!0,params:[a("count","across",1,6,2,1),a("rows","down",1,6,2,1),a("flip","mirror seams",0,1,1,1,{options:["no","yes"]}),a("drift","drift",-.5,.5,0)],glsl:`
vec4 fx(vec2 uv) {
  vec2 n = vec2(max(p_count, 1.0), max(p_rows, 1.0));
  vec2 q = uv * n + vec2(u_time * p_drift, 0.0);
  vec2 cell = floor(q);
  vec2 f = fract(q);
  if (p_flip > 0.5) {
    if (mod(cell.x, 2.0) > 0.5) f.x = 1.0 - f.x;
    if (mod(cell.y, 2.0) > 0.5) f.y = 1.0 - f.y;
  }
  return src(f);
}`},Be={id:"river",label:"river of mirrors",group:"mirror",blurb:"Mirrors facing each other along a line, with the reflections flowing through. Breathes.",needsImage:!0,params:[a("angle","angle",-.25,.25,0),a("period","mirror spacing",.02,.6,.16),a("flow","flow",-.3,.3,.02,5e-4,{hint:"negative runs it the other way"}),a("ratio","second chain",1,6,2.31,.01,{hint:"off a whole number is what stops it repeating"}),a("tangle","let them interact",0,1,.35),a("reach","reach",.1,3,1,.01,{hint:"how much of the picture each mirror shows"}),a("breathe","breathe",0,.6,.1),a("rate","breath rate",.005,.4,.045),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5)],glsl:`
vec4 fx(vec2 uv) {
  float a = p_angle * TAU;
  vec2 c = vec2(p_cx, p_cy);
  vec2 d = rot(a) * ((uv - c) * ASP);

  float breath = 1.0 + sin(u_time * p_rate * TAU) * p_breathe;
  float period = max(p_period * breath, 0.004);

  // Along the axis, sliding. The reflections move; the picture does not.
  float s = (d.x - u_time * p_flow) / period;

  float chain = abs(fract(s) * 2.0 - 1.0);
  float finer = abs(fract(s * p_ratio) * 2.0 - 1.0);
  float k = mix(chain, chain * finer, p_tangle);

  float x = (k - 0.5) * period * p_reach;
  vec2 q = c + (rot(-a) * vec2(x, d.y)) / ASP;
  return src(q);
}`},Pe={id:"levels",label:"levels",group:"colour",blurb:"Brightness, contrast, saturation, hue. The one every look ends up wanting.",needsImage:!0,params:[a("bright","brightness",-.5,.5,0),a("contrast","contrast",-1,1,0),a("sat","saturation",-1,1,0),a("hue","hue turn",-.5,.5,0),a("lift","lift blacks",-.2,.3,0)],glsl:`
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
}`},Oe={id:"tint",label:"tint",group:"colour",blurb:"Push one end of the picture toward a hue. Cold shadows, warm lamps.",needsImage:!0,params:[a("amount","amount",0,1,.12),a("hue","hue",0,1,.55),a("sat","purity",0,1,.5),a("toward","where",0,1,0,1,{options:["shadows","highlights"]})],glsl:`
vec4 fx(vec2 uv) {
  vec4 c = src(uv);
  float l = lum(c.rgb);
  float m = p_toward > 0.5 ? l : 1.0 - l;
  vec3 t = hsv2rgb(vec3(p_hue, p_sat, 1.0));
  return vec4(mix(c.rgb, c.rgb * t * 1.6, m * p_amount), c.a);
}`},De={id:"poster",label:"posterise",group:"colour",blurb:"Fewer steps, with a dither so the bands do not read as a broken screen.",needsImage:!0,params:[a("steps","steps",2,32,10,1),a("dither","dither",0,1,.4)],glsl:`
vec4 fx(vec2 uv) {
  vec4 c = src(uv);
  float n = max(p_steps, 2.0);
  float d = (hash21(floor(uv * u_res) + floor(u_time * 12.0)) - 0.5) * p_dither / n;
  return vec4(floor((c.rgb + d) * n + 0.5) / n, c.a);
}`},ze={id:"pixel",label:"pixelate",group:"grit",blurb:"Snap to a grid. Bind the size to a hit and it comes apart on the beat.",needsImage:!0,params:[a("size","block",1,64,4,.5),a("round","soften",0,1,0)],glsl:`
vec4 fx(vec2 uv) {
  float s = max(p_size, 1.0);
  vec2 g = u_res / s;
  vec2 q = (floor(uv * g) + 0.5) / g;
  return mix(src(q), src(uv), p_round);
}`},Ne={id:"edge",label:"edges",group:"grit",blurb:"Find the lines and lay them back over the picture. Ink on the paper.",needsImage:!0,params:[a("amount","amount",0,2,.35),a("width","width",.5,6,1.2,.1),a("dark","as",0,1,1,1,{options:["light","ink"]})],glsl:`
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
}`},qe={id:"bloom",label:"bloom",group:"light",blurb:"The bright things spill. A lamp at dusk needs about 0.15 of this.",needsImage:!0,params:[a("amount","amount",0,1.5,.25),a("threshold","from",0,1,.62),a("radius","reach",.5,24,6,.1)],glsl:`
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
}`},Ce={id:"blur",label:"blur",group:"light",blurb:"One direction, nine taps. Cheap, and the only honest way to soften focus.",needsImage:!0,params:[a("amount","amount",0,24,2,.1),a("angle","angle",0,1,0),a("round","both ways",0,1,0,1,{options:["one","cross"]})],glsl:`
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
}`},Ge={id:"vignette",label:"vignette",group:"light",blurb:"Close the corners in. Bind it to pressure and the room narrows on you.",needsImage:!1,params:[a("amount","amount",0,1.5,.35),a("radius","radius",.1,1.4,.78),a("soft","softness",.02,1,.45)],glsl:`
vec4 fx(vec2 uv) {
  vec2 d = (uv - 0.5) * ASP * 1.42;
  float v = smoothstep(p_radius, p_radius - p_soft, length(d));
  float k = 1.0 - (1.0 - v) * p_amount;
  vec4 c = src(uv);
  return vec4(c.rgb * k, mix(c.a, max(c.a, (1.0 - v) * p_amount), 0.0) + (1.0 - v) * p_amount * (1.0 - c.a));
}`},je={id:"fog",label:"fog",group:"light",blurb:"Slow cloud drifting across. Makes its own light — works on an empty canvas.",needsImage:!1,params:[a("amount","amount",0,1,.18),a("scale","size",.3,8,1.6,.01),a("speed","drift",0,.6,.04),a("hue","hue",0,1,.55),a("sat","purity",0,1,.15),a("height","sit low",0,1,.4,.01,{hint:"pulls the cloud toward the floor of the frame"})],glsl:`
vec4 fx(vec2 uv) {
  vec2 q = uv * ASP * p_scale;
  float t = u_time * p_speed;
  float n = fbm(q + vec2(t, t * 0.31));
  n = smoothstep(0.35, 0.85, n);
  float band = mix(1.0, smoothstep(0.0, 0.9, uv.y), p_height);
  float a = n * band * p_amount;
  vec3 col = hsv2rgb(vec3(p_hue, p_sat, 1.0));
  vec4 c = src(uv);
  return vec4(c.rgb + col * a, max(c.a, a));
}`},Xe={id:"motes",label:"motes",group:"light",blurb:"Dust in a shaft of light. Rises, wanders, never lands. Makes its own light.",needsImage:!1,params:[a("amount","amount",0,1,.3),a("count","how many",4,80,26,1),a("size","size",.5,6,1.6,.1),a("rise","rise",-.3,.3,.03),a("hue","hue",0,1,.12)],glsl:`
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
    float y = fract(sy - u_time * p_rise * sp);
    float x = sx + sin(u_time * 0.3 * sp + sx * TAU) * 0.02;
    vec2 pos = vec2(x, y) * ASP;
    float r = length(q - pos);
    float rad = p_size * (0.4 + hash21(seed + 1.1)) / 400.0;
    acc += smoothstep(rad, 0.0, r);
  }
  vec3 col = hsv2rgb(vec3(p_hue, 0.25, 1.0));
  float a = clamp(acc, 0.0, 1.0) * p_amount;
  vec4 c = src(uv);
  return vec4(c.rgb + col * a, max(c.a, a));
}`},Ve={id:"beams",label:"beams",group:"light",blurb:"Light through glass, at an angle, slowly turning. Makes its own light.",needsImage:!1,params:[a("amount","amount",0,1,.16),a("angle","angle",0,1,.13),a("count","how many",1,20,5,.1),a("spread","softness",.02,1,.4),a("drift","drift",-.2,.2,.01),a("hue","hue",0,1,.11)],glsl:`
vec4 fx(vec2 uv) {
  vec2 d = (uv - 0.5) * ASP;
  d = rot(p_angle * TAU) * d;
  float s = sin((d.x + u_time * p_drift) * p_count * TAU * 0.5);
  float band = smoothstep(1.0 - p_spread, 1.0, s * 0.5 + 0.5);
  float fade = smoothstep(1.0, 0.1, length((uv - 0.5) * ASP) * 1.2);
  float a = band * fade * p_amount;
  vec3 col = hsv2rgb(vec3(p_hue, 0.2, 1.0));
  vec4 c = src(uv);
  return vec4(c.rgb + col * a, max(c.a, a));
}`},He={id:"pulse",label:"pulse",group:"light",blurb:"One soft ring of light from a point. Bind the size to a hit. Makes its own light.",needsImage:!1,params:[a("amount","amount",0,1.5,.3),a("radius","radius",0,1.2,.3),a("soft","softness",.01,1,.35),a("cx","centre x",0,1,.5),a("cy","centre y",0,1,.5),a("hue","hue",0,1,.08),a("ring","as a ring",0,1,0,1,{options:["filled","ring"]})],glsl:`
vec4 fx(vec2 uv) {
  float r = length((uv - vec2(p_cx, p_cy)) * ASP);
  float a = p_ring > 0.5
    ? smoothstep(p_soft, 0.0, abs(r - p_radius))
    : smoothstep(p_radius, max(p_radius - p_soft, 0.0), r);
  a *= p_amount;
  vec3 col = hsv2rgb(vec3(p_hue, 0.3, 1.0));
  vec4 c = src(uv);
  return vec4(c.rgb + col * a, max(c.a, a));
}`},We={id:"grain",label:"grain",group:"grit",blurb:"The paper this is all printed on. Makes its own light.",needsImage:!1,params:[a("amount","amount",0,.5,.05),a("size","size",.5,8,1.5,.1),a("speed","boil",0,60,24,1),a("colour","colour",0,1,0)],glsl:`
vec4 fx(vec2 uv) {
  vec2 g = floor(uv * u_res / max(p_size, 0.5));
  float t = floor(u_time * p_speed);
  float n = hash21(g + t * 7.3);
  vec3 nc = vec3(n, hash21(g + t * 7.3 + 11.0), hash21(g + t * 7.3 + 23.0));
  vec3 v = mix(vec3(n), nc, p_colour) - 0.5;
  vec4 c = src(uv);
  return vec4(c.rgb + v * p_amount * 2.0, max(c.a, abs(v.r) * p_amount * 2.0));
}`},Ye={id:"scan",label:"scanlines",group:"grit",blurb:"Lines, and a roll bar that walks up the screen. Makes its own light.",needsImage:!1,params:[a("amount","lines",0,1,.12),a("count","how many",20,900,260,1),a("roll","roll speed",-2,2,.12),a("bar","roll bar",0,1,.08)],glsl:`
vec4 fx(vec2 uv) {
  float s = sin((uv.y + u_time * p_roll * 0.02) * p_count * TAU * 0.5) * 0.5 + 0.5;
  float bar = smoothstep(0.7, 1.0, sin((uv.y - u_time * p_roll * 0.2) * TAU)) * p_bar;
  vec4 c = src(uv);
  float k = 1.0 - s * p_amount;
  return vec4(c.rgb * k + bar, max(c.a, s * p_amount * 0.6 + bar));
}`},Ke={id:"trails",label:"trails",group:"time",blurb:"Last frame, moved a little, laid back under this one. The feedback loop.",needsImage:!0,params:[a("feedback","hold",0,.97,.7),a("zoom","zoom",-.06,.06,.004),a("spin","spin",-.06,.06,0),a("driftx","drift x",-.02,.02,0),a("drifty","drift y",-.02,.02,0),a("fade","cool",0,1,.06,.001,{hint:"how fast the held frame loses colour"})],glsl:`
vec4 fx(vec2 uv) {
  vec2 d = (uv - 0.5) * ASP;
  d = rot(p_spin * TAU) * d / (1.0 + p_zoom);
  vec2 q = 0.5 + d / ASP + vec2(p_driftx, p_drifty);
  vec4 old = prev(q);
  old.rgb *= (1.0 - p_fade);
  vec4 now = src(uv);
  vec3 rgb = max(now.rgb, old.rgb * p_feedback);
  return vec4(rgb, max(now.a, old.a * p_feedback));
}`},Je=[Ae,$e,ke,Se,Re,Le,Ie,Fe,Ue,Me,Be,Pe,Oe,De,qe,Ce,Ge,je,Ve,Xe,He,We,Ye,ze,Ne,Ke],le=new Map(Je.map(e=>[e.id,e]));function Y(e){return le.get(e)}function ue(e){return le.has(e)}function jt(e){const t={};for(const r of e.params)t[r.key]=r.def;return t}const Xt=[{id:"move",label:"move"},{id:"mirror",label:"mirror"},{id:"colour",label:"colour"},{id:"light",label:"light"},{id:"grit",label:"grit"},{id:"time",label:"time"}];function A(e){return typeof e=="object"&&e!==null}function Vt(e,t){return e===void 0?t:A(e)?e.base:e}function x(e,t,r){return{source:t,base:e,depth:r,curve:1,fall:.12}}function K(e){return{id:`lfo-${e}`,name:e,shape:"sine",sync:!0,bars:4,hz:.25,phase:0,duty:.5}}const he=.25,fe=.18,J=.08;let ee=0;function te(e={}){return ee+=1,{id:`r${ee.toString(36)}`,shape:"rect",x:.5,y:.5,w:.3,h:.18,rot:0,feather:.35,amount:1,drift:J,...e}}const Ht={id:"untitled",name:"untitled",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,lfos:[K("a")],layers:[],notes:""};let se=0;function Wt(e){return se+=1,`${e}-${se.toString(36)}`}function re(e){const t=new Set,r=s=>{A(s)&&t.add(s.source)};for(const s of e.layers){r(s.mix);for(const o of Object.values(s.params))r(o);for(const o of s.regions??[])r(o.amount)}return[...t].sort()}function pe(e,t){return{...e,layers:e.layers.filter(r=>t(r.effect))}}const R=(e,t,r)=>({...K(e),shape:t,bars:r}),Qe=[{id:"rgb-wobble",name:"RGB wobble",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The house preset. The channels part on the low end and drift on a slow LFO.",lfos:[R("slow","sine",8)],layers:[{id:"w1",effect:"wobble",on:!0,mix:1,params:{amount:{...x(9e-4,"music.low",.0045),curve:1.6,fall:.2},angle:x(0,"lfo.slow",1),spin:0,sep:1}},{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.004,y:.002,rate:.05,lag:.25}}]},{id:"glasshouse-breath",name:"glasshouse breath",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The room has a pulse. Zoom on the downbeat, noise drift under it, lamp spills.",lfos:[R("drift","noise",6)],layers:[{id:"b1",effect:"breathe",on:!0,mix:1,params:{amount:{...x(0,"bar.pulse",.011),curve:2,fall:.3},cx:.42,cy:.52,roll:0}},{id:"b2",effect:"flow",on:!0,mix:1,params:{amount:{...x(.002,"music.mid",.004),curve:1.4,fall:.35},scale:2.1,speed:.09,warp:.4}},{id:"b3",effect:"bloom",on:!0,mix:1,params:{amount:{...x(.14,"music.level",.22),curve:1.5,fall:.4},threshold:.66,radius:7}}]},{id:"hat-paper",name:"hi-hat paper",scene:"greenhouse",mount:"over",blend:"soft-light",opacity:.9,notes:"Over-mount. The paper grain moves with the hats; the corners close as pressure rises.",lfos:[],layers:[{id:"g1",effect:"grain",on:!0,mix:1,params:{amount:{...x(.02,"music.high",.07),curve:1.8,fall:.09},size:1.6,speed:24,colour:.15}},{id:"g2",effect:"vignette",on:!0,mix:1,params:{amount:{...x(.1,"pressure",.45),curve:1,fall:1.2},radius:.8,soft:.5}}]},{id:"rose-window",name:"rose window",scene:"greenhouse",mount:"plate",blend:"normal",opacity:.55,notes:"Mirrors, folded on a slow turn. Half opacity because at full it is a screensaver.",lfos:[R("turn","saw",32),R("split","sine",12)],layers:[{id:"k1",effect:"kaleido",on:!0,mix:.5,params:{slices:6,spin:.004,zoom:x(1.1,"lfo.split",.25),cx:.5,cy:.45}},{id:"k2",effect:"mirror",on:!0,mix:{...x(.15,"music.level",.4),curve:1.6,fall:.5},params:{axis:0,split:x(.42,"lfo.split",.16),flip:0,mix2:1}}]},{id:"signal-rot",name:"signal rot",scene:"inside",mount:"plate",blend:"normal",opacity:1,notes:"For the bad end of a fight. Bands jump on a hit, the frame holds and cools.",lfos:[R("gate","hold",2)],layers:[{id:"s1",effect:"slice",on:!0,mix:{...x(0,"sfx.hit",1),curve:2.2,fall:.22},params:{amount:.035,rows:34,speed:9,chance:.3}},{id:"s2",effect:"trails",on:!0,mix:1,params:{feedback:{...x(.42,"music.low",.3),curve:1.4,fall:.5},zoom:.003,spin:.001,driftx:0,drifty:0,fade:.09}},{id:"s3",effect:"poster",on:!0,mix:.5,params:{steps:14,dither:.5}}]},{id:"dusk-light",name:"dusk light",scene:"greenhouse",mount:"over",blend:"screen",opacity:.75,notes:"All light, no picture. Beams through the glass, dust rising, fog on the floor.",lfos:[R("breeze","noise",10)],layers:[{id:"l1",effect:"beams",on:!0,mix:1,params:{amount:{...x(.07,"music.level",.1),curve:1.6,fall:.6},angle:.14,count:4.5,spread:.45,drift:.008,hue:.1}},{id:"l2",effect:"motes",on:!0,mix:1,params:{amount:.22,count:22,size:1.5,rise:.02,hue:.11}},{id:"l3",effect:"fog",on:!0,mix:1,params:{amount:x(.08,"lfo.breeze",.07),scale:1.4,speed:.03,hue:.55,sat:.12,height:.55}}]}],Ze={id:"river-road",name:"the road, upstream",scene:"greenhouse",mount:"plate",blend:"normal",opacity:1,notes:"The band of soil only. Mirrors along it with the reflections flowing upstream, breathing on a four-bar LFO. Sky and glasshouse untouched.",lfos:[{...K("breath"),shape:"sine",bars:4}],layers:[{id:"rr1",effect:"river",on:!0,mix:.42,regions:[{...te(),shape:"rect",x:.5,y:.53,w:.52,h:.135,rot:0,feather:.75,amount:1}],params:{angle:0,period:.17,flow:.022,ratio:2.31,tangle:.3,reach:1.1,breathe:0,rate:.045,cx:.5,cy:.53}},{id:"rr2",effect:"breathe",on:!0,mix:1,regions:[{...te(),x:.5,y:.53,w:.52,h:.16,feather:.85,amount:.7}],params:{amount:x(.002,"lfo.breath",.006),cx:.5,cy:.53,roll:0}}]},Yt=[...Qe,Ze],X=`#version 300 es
in vec2 a_pos;
uniform float u_flip;
out vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos.x, a_pos.y * u_flip, 0.0, 1.0);
}`,et=`#version 300 es
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
}`,L=6;function tt(e){return e.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1,powerPreference:"low-power"})}function st(e){const t=e.createVertexArray();if(t===null)throw new Error("no vao");e.bindVertexArray(t);const r=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),t}function oe(e,t,r){const s=e.createShader(t);if(s===null)throw new Error("no shader");if(e.shaderSource(s,r),e.compileShader(s),!e.getShaderParameter(s,e.COMPILE_STATUS)){const o=e.getShaderInfoLog(s)??"unknown";throw e.deleteShader(s),new Error(rt(r,o))}return s}function rt(e,t){const r=e.split(`
`).map((s,o)=>`${String(o+1).padStart(3)} | ${s}`);return`${t}
${r.join(`
`)}`}function N(e,t,r){const s=e.createProgram();if(s===null)throw new Error("no program");const o=oe(e,e.VERTEX_SHADER,t),n=oe(e,e.FRAGMENT_SHADER,r);if(e.attachShader(s,o),e.attachShader(s,n),e.bindAttribLocation(s,0,"a_pos"),e.linkProgram(s),e.deleteShader(o),e.deleteShader(n),!e.getProgramParameter(s,e.LINK_STATUS)){const l=e.getProgramInfoLog(s)??"unknown";throw e.deleteProgram(s),new Error(l)}return s}function q(e,t,r){const s=e.createTexture(),o=e.createFramebuffer();if(s===null||o===null)throw new Error("no target");return e.bindTexture(e.TEXTURE_2D,s),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t,r,0,e.RGBA,e.UNSIGNED_BYTE,null),me(e),e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,s,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{fb:o,tex:s,w:t,h:r}}function C(e,t,r,s){t.w===r&&t.h===s||(e.bindTexture(e.TEXTURE_2D,t.tex),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,r,s,0,e.RGBA,e.UNSIGNED_BYTE,null),t.w=r,t.h=s)}function me(e){e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR)}function ot(e,t){const r=e.createTexture();if(r===null)throw new Error("no texture");return e.bindTexture(e.TEXTURE_2D,r),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),me(e),r}function at(e){return new Promise((t,r)=>{const s=new Image;s.crossOrigin="anonymous",s.onload=()=>t(s),s.onerror=()=>r(new Error(`could not load ${e}`)),s.src=e})}const nt=`
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
}`,$=6,it=`
uniform int u_regions;
uniform int u_outside;
uniform vec4 u_regionBox[${$}];
uniform vec4 u_regionCfg[${$}];

float maskAt(vec2 uv) {
  if (u_regions == 0) return u_outside == 1 ? 0.0 : 1.0;
  float m = 0.0;
  for (int i = 0; i < ${$}; i++) {
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
}`;function ct(e){return`#version 300 es
precision highp float;
uniform sampler2D u_src;
uniform sampler2D u_prev;
uniform vec2 u_res;
uniform float u_time;
uniform float u_bar;
uniform float u_beat;
uniform float u_mix;
uniform float u_spill;
float INSIDE;
${e.params.map(r=>`uniform float p_${r.key}_now;
uniform float p_${r.key}_ago;
#define p_${r.key} mix(p_${r.key}_ago, p_${r.key}_now, INSIDE)`).join(`
`)}
in vec2 v_uv;
out vec4 outColor;
${nt}
${it}
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
}`}const lt=`#version 300 es
precision highp float;
uniform sampler2D u_src;
uniform float u_alpha;
in vec2 v_uv;
out vec4 outColor;
void main() {
  vec4 c = texture(u_src, v_uv);
  float a = clamp(c.a * u_alpha, 0.0, 1.0);
  outColor = vec4(c.rgb * a, a);
}`,ae=`#version 300 es
precision highp float;
uniform sampler2D u_src;
in vec2 v_uv;
out vec4 outColor;
void main() { outColor = texture(u_src, v_uv); }`;class Kt{canvas;gl;vao;cache=new Map;present;blit;rect;flips=new Map;a;b;history;base;baseReady=!1;textures=[];boxes=new Float32Array($*4);cfgs=new Float32Array($*4);w=0;h=0;error=null;broken=new Set;constructor(t){const r=tt(t);if(r===null)throw new Error("this browser has no WebGL2");this.canvas=t,this.gl=r,this.vao=st(r),this.present=N(r,X,lt),this.blit=N(r,X,ae),this.rect=N(r,et,ae);for(const s of[this.present,this.blit,this.rect])this.flips.set(s,r.getUniformLocation(s,"u_flip"));this.a=q(r,2,2),this.b=q(r,2,2),this.history=q(r,2,2),this.base=q(r,2,2)}aim(t,r){this.gl.useProgram(t),this.gl.uniform1f(this.flips.get(t)??null,r==="canvas"?1:-1)}resize(t,r){const s=this.gl,o=Math.max(2,Math.round(t)),n=Math.max(2,Math.round(r));o===this.w&&n===this.h||(this.w=o,this.h=n,this.canvas.width=o,this.canvas.height=n,C(s,this.a,o,n),C(s,this.b,o,n),C(s,this.history,o,n),C(s,this.base,o,n),this.baseReady=!1)}async setScene(t,r){const s=this.gl;for(const n of this.textures)s.deleteTexture(n);this.textures=[];const o=await Promise.all(t.map(n=>at(n.src).catch(()=>null)));this.pending={parts:t,stage:r,images:o},this.baseReady=!1}pending=null;buildBase(){const t=this.gl,r=this.pending;if(t.bindFramebuffer(t.FRAMEBUFFER,this.base.fb),t.viewport(0,0,this.w,this.h),t.disable(t.BLEND),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),r!==null){t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),this.aim(this.rect,"buffer"),t.bindVertexArray(this.vao),t.uniform1i(t.getUniformLocation(this.rect,"u_src"),0);const s=t.getUniformLocation(this.rect,"u_rect");t.activeTexture(t.TEXTURE0);for(let o=0;o<r.parts.length;o++){const n=r.images[o],l=r.parts[o];if(n==null||l===void 0)continue;const u=ot(t,n);this.textures.push(u),t.bindTexture(t.TEXTURE_2D,u),t.uniform4f(s,l.x/r.stage.w,l.y/r.stage.h,l.w/r.stage.w,l.h/r.stage.h),t.drawArrays(t.TRIANGLES,0,L)}t.disable(t.BLEND)}t.bindFramebuffer(t.FRAMEBUFFER,null),this.baseReady=!0}compiled(t){const r=this.cache.get(t.id);if(r!==void 0)return r;const s=this.gl;try{const o=N(s,X,ct(t)),n={};for(const u of["u_src","u_prev","u_res","u_time","u_bar","u_beat","u_mix","u_flip","u_regions","u_outside","u_regionBox[0]","u_regionCfg[0]"])n[u]=s.getUniformLocation(o,u);n.u_spill=s.getUniformLocation(o,"u_spill");for(const u of t.params)n[`p_${u.key}_now`]=s.getUniformLocation(o,`p_${u.key}_now`),n[`p_${u.key}_ago`]=s.getUniformLocation(o,`p_${u.key}_ago`);const l={program:o,effect:t,locs:n};return this.cache.set(t.id,l),l}catch(o){return this.error=`${t.id}: ${String(o instanceof Error?o.message:o)}`,null}}draw(t,r,s){const o=this.gl;if(this.w===0)return;this.baseReady||this.buildBase(),this.broken.clear(),o.bindVertexArray(this.vao),o.disable(o.BLEND),o.viewport(0,0,this.w,this.h);let n=this.a,l=this.b;o.bindFramebuffer(o.FRAMEBUFFER,n.fb),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),t.mount==="plate"&&(this.aim(this.blit,"buffer"),o.uniform1i(o.getUniformLocation(this.blit,"u_src"),0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,this.base.tex),o.drawArrays(o.TRIANGLES,0,L));for(const u of t.layers){if(!u.on)continue;const m=Y(u.effect);if(m===void 0)continue;const i=this.compiled(m);if(i===null){this.broken.add(u.id);continue}const v=r.resolve(`${u.id}/mix`,u.mix,1);if(v<=5e-4)continue;const p=c=>i.locs[c]??null;o.bindFramebuffer(o.FRAMEBUFFER,l.fb),o.useProgram(i.program),o.uniform1i(p("u_src"),0),o.uniform1i(p("u_prev"),1),o.uniform2f(p("u_res"),this.w,this.h),o.uniform1f(p("u_time"),s.time),o.uniform1f(p("u_bar"),s.bar),o.uniform1f(p("u_beat"),s.beat),o.uniform1f(p("u_mix"),v),o.uniform1f(p("u_flip"),-1);const h=(u.regions??[]).slice(0,$);if(o.uniform1i(p("u_regions"),h.length),o.uniform1i(p("u_outside"),u.outside===!0?1:0),h.length>0){for(let c=0;c<h.length;c++){const f=h[c];if(f===void 0)continue;this.boxes[c*4]=f.x,this.boxes[c*4+1]=f.y,this.boxes[c*4+2]=f.w,this.boxes[c*4+3]=f.h,this.cfgs[c*4]=f.shape==="ellipse"?1:0,this.cfgs[c*4+1]=f.feather;const b=1-(f.drift??J)*r.wander(f.id);this.cfgs[c*4+2]=r.resolve(`${u.id}/${f.id}`,f.amount,1)*b,this.cfgs[c*4+3]=f.rot}o.uniform4fv(p("u_regionBox[0]"),this.boxes.subarray(0,h.length*4)),o.uniform4fv(p("u_regionCfg[0]"),this.cfgs.subarray(0,h.length*4))}const g=u.lag??fe;o.uniform1f(p("u_spill"),Math.max(0,Math.min(1,u.spill??he)));for(const c of m.params){const f=`${u.id}/${c.key}`,b=u.params[c.key],y=w=>Math.max(c.min,Math.min(c.max,w)),S=r.resolve(f,b,c.def);o.uniform1f(p(`p_${c.key}_now`),y(S)),o.uniform1f(p(`p_${c.key}_ago`),y(g>0?r.lagged(f,g,S):S))}o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,n.tex),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,this.history.tex),o.drawArrays(o.TRIANGLES,0,L);const d=n;n=l,l=d}o.bindFramebuffer(o.FRAMEBUFFER,this.history.fb),this.aim(this.blit,"buffer"),o.uniform1i(o.getUniformLocation(this.blit,"u_src"),0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,n.tex),o.drawArrays(o.TRIANGLES,0,L),o.bindFramebuffer(o.FRAMEBUFFER,null),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),this.aim(this.present,"canvas"),o.uniform1i(o.getUniformLocation(this.present,"u_src"),0),o.uniform1f(o.getUniformLocation(this.present,"u_alpha"),t.opacity),o.bindTexture(o.TEXTURE_2D,n.tex),o.drawArrays(o.TRIANGLES,0,L),o.bindVertexArray(null)}clearHistory(){const t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.history.fb),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindFramebuffer(t.FRAMEBUFFER,null)}dispose(){const t=this.gl;for(const r of this.textures)t.deleteTexture(r);for(const r of this.cache.values())t.deleteProgram(r.program);for(const r of[this.a,this.b,this.history,this.base])t.deleteFramebuffer(r.fb),t.deleteTexture(r.tex);t.deleteProgram(this.present),t.deleteProgram(this.blit),t.deleteProgram(this.rect),this.cache.clear(),this.textures=[]}}const F={w:1180,h:720},Q=e=>({src:e,x:0,y:0,w:F.w,h:F.h}),de={id:"greenhouse",name:"the greenhouse",blurb:"Dusk on the farm. The first breach, and the board every fight is played on.",base:[Q(ge)],over:[B.glasshouse,B.lamp,B.plants,B.fence,...be].map(e=>({src:e.src,x:e.x,y:e.y,w:e.w,h:e.h})),under:"#0b0f11",mountsAt:"ui/Backdrop.tsx — under .bd-plate, over .backdrop"},ut={id:"board",name:"the fight sheet",blurb:"The flat teal paper a breach is played on when it is not on the farm.",base:[Q(ce.bg.src)],over:[],under:"#0b0f11",mountsAt:"ui/Backs.tsx — behind the board"},ht={id:"inside",name:"inside",blurb:"The interior sheet — the darker paper the indoor fights are cut on.",base:[Q(ce.bgInside.src)],over:[],under:"#07090a",mountsAt:"ui/Backs.tsx — behind the board"},ft={id:"room",name:"the room",blurb:"The building you walk. Rough: the real one is assembled band by band in code.",base:[{src:M.wall.src,x:0,y:0,w:F.w,h:300},{src:M.floor.src,x:0,y:254,w:F.w,h:466},{src:M.horizon.src,x:0,y:200,w:F.w,h:120}],over:[{src:M.terminal.src,x:760,y:190,w:180,h:150}],under:"#0a0c0d",mountsAt:"ui/RoomScene.tsx — under the bands"},pt={id:"void",name:"nothing",blurb:"No picture at all. For building a light or a grain that goes over anything.",base:[],over:[],under:"#101314",mountsAt:"anywhere — this is an over-mount look"},mt=[de,ut,ht,ft,pt];function dt(e){return mt.find(t=>t.id===e)??de}const vt=Math.PI*2;function Jt(e,t){const r=[];for(const s of e)for(const o of _e)r.push({id:`${s.id}.${o}`,label:`${s.id} ${o}`,group:s.group});r.push({id:"beat",label:"beat",group:"transport",hint:"runs 0→1 across every beat"},{id:"beat.pulse",label:"beat pulse",group:"transport",hint:"lands on the beat and decays"},{id:"bar",label:"bar",group:"transport",hint:"runs 0→1 across the bar"},{id:"bar.pulse",label:"bar pulse",group:"transport",hint:"lands on the downbeat and decays"},{id:"phrase",label:"phrase",group:"transport",hint:"runs 0→1 across the whole loop"},{id:"phrase.pulse",label:"phrase pulse",group:"transport"}),r.push({id:"pressure",label:"pressure",group:"game",hint:"suspicion ÷ the level it notices you at"},{id:"corruption",label:"corruption",group:"game",hint:"the dial. Only ever rises"},{id:"one",label:"always one",group:"game",hint:"for a fixed offset with no movement"});for(const s of t)r.push({id:`lfo.${s.name}`,label:`lfo ${s.name}`,group:"lfo",hint:s.sync?`${s.shape}, ${s.bars} bar${s.bars===1?"":"s"}`:`${s.shape}, ${s.hz} Hz`});return r}function U(e){const t=Math.sin(e*127.1)*43758.5453;return t-Math.floor(t)}function bt(e,t,r){const s=t-Math.floor(t);switch(e.shape){case"sine":return .5+.5*Math.sin(s*vt);case"tri":return s<.5?s*2:2-s*2;case"saw":return s;case"ramp":return 1-s;case"square":return s<e.duty?1:0;case"hold":return U(r+e.phase*977);case"noise":{const o=U(r+e.phase*977),n=U(r+1+e.phase*977),l=s*s*(3-2*s);return o+(n-o)*l}default:return 0}}class gt{laps=0;lastBar=0;lastBars=0;bars=0;seconds=0;tick(t,r){if(this.seconds+=r,!t.playing||t.bars<=0){const s=t.bpm>0?t.bpm:120,o=(t.beatsPerBar||4)*(60/s);this.bars+=r/o;return}t.bars!==this.lastBars&&(this.lastBars=t.bars,this.lastBar=t.bar),t.bar<this.lastBar-1e-6&&(this.laps+=1),this.lastBar=t.bar,this.bars=this.laps*t.bars+t.bar}}const V=e=>{const t=1-(e-Math.floor(e));return t*t*t},_t=2,T=180;class Qt{clock=new gt;values=new Map;falling=new Map;seen=new Set;trails=new Map;get all(){return this.values}update(t,r,s){const o=Math.min(Math.max(s,.004166666666666667),.1);this.clock.tick(r.beat,o);const n=this.values;n.clear();for(const[h,g]of r.taps){const d=g??W;n.set(`${h}.level`,d.level),n.set(`${h}.low`,d.low),n.set(`${h}.mid`,d.mid),n.set(`${h}.high`,d.high),n.set(`${h}.hit`,d.hit)}const l=this.clock.bars,u=r.beat.beatsPerBar||4,m=l-Math.floor(l),i=l*u%1,v=r.beat.bars>0?r.beat.bars:16,p=l/v%1;n.set("bar",m),n.set("bar.pulse",V(m)),n.set("beat",i),n.set("beat.pulse",V(i)),n.set("phrase",p),n.set("phrase.pulse",V(p)),n.set("one",1);for(const[h,g]of Object.entries(r.extra))n.set(h,g);for(const h of t.lfos){const g=h.sync?l/Math.max(h.bars,.015625)+h.phase:this.clock.seconds*h.hz+h.phase;n.set(`lfo.${h.name}`,bt(h,g,Math.floor(g)))}if(this.falling.size>0&&this.falling.size!==this.seen.size)for(const h of this.falling.keys())this.seen.has(h)||this.falling.delete(h);this.seen.clear(),this.dt=o}dt=1/60;value(t){return this.values.get(t)??0}resolve(t,r,s){if(r===void 0)return s;if(!A(r))return r;this.seen.add(t);const o=Math.max(0,Math.min(1,this.value(r.source))),n=r.curve===1?o:Math.pow(o,Math.max(r.curve,.01)),l=this.falling.get(t)??0;let u=n;if(r.fall>0&&n<l){const i=Math.pow(.001,this.dt/r.fall);u=n+(l-n)*i}this.falling.set(t,u);const m=r.base+r.depth*u;return this.remember(t,m),m}remember(t,r){let s=this.trails.get(t);s===void 0&&(s={t:new Float64Array(T),v:new Float32Array(T),i:0,full:!1},this.trails.set(t,s)),s.t[s.i]=this.clock.seconds,s.v[s.i]=r,s.i=(s.i+1)%T,s.i===0&&(s.full=!0)}lagged(t,r,s){const o=this.trails.get(t);if(o===void 0)return s;const n=o.full?T:o.i;if(n===0)return s;const l=this.clock.seconds-Math.max(0,Math.min(r,_t)),u=(o.i-1+T)%T;let m=u;for(let i=0;i<n;i++){const v=(u-i+T)%T;if(o.t[v]<=l){const p=o.t[v],h=o.t[m],g=o.v[v],d=o.v[m];return h<=p?g:g+(d-g)*((l-p)/(h-p))}m=v}return o.v[m]}wander(t){let r=2166136261;for(let i=0;i<t.length;i++)r^=t.charCodeAt(i),r=Math.imul(r,16777619);const s=(r>>>0)/4294967296,o=this.clock.seconds*.13+s*977,n=Math.floor(o),l=o-n,u=U(n+s*31),m=U(n+1+s*31);return u+(m-u)*(l*l*(3-2*l))}}const xt="dusk-light",wt="dusk light",yt="greenhouse",Et="over",Tt="screen",At=.75,Rt="All light, no picture. Beams through the glass, dust rising, fog on the floor.",$t=[{id:"lfo-breeze",name:"breeze",shape:"noise",sync:!0,bars:10,hz:.25,phase:0,duty:.5}],St=[{id:"l1",effect:"beams",on:!0,mix:1,params:{amount:{source:"music.level",base:.07,depth:.1,curve:1.6,fall:.6},angle:.14,count:4.5,spread:.45,drift:.008,hue:.1}},{id:"l2",effect:"motes",on:!0,mix:1,params:{amount:.22,count:22,size:1.5,rise:.02,hue:.11}},{id:"l3",effect:"fog",on:!0,mix:1,params:{amount:{source:"lfo.breeze",base:.08,depth:.07,curve:1,fall:.12},scale:1.4,speed:.03,hue:.55,sat:.12,height:.55}}],kt={id:xt,name:wt,scene:yt,mount:Et,blend:Tt,opacity:At,notes:Rt,lfos:$t,layers:St},Lt="gentle-trip",It="gentle trip",Ft="greenhouse",Ut="plate",Mt="normal",Bt=1,Pt=`A gentle trip for the background. The ripple's depth and ring count each swing 20% about where they were set, on two 16-bar sine LFOs half a cycle apart — so the rings crowd in as the depth eases off, and open out as it swells. Nothing lands on a beat; it is meant to be noticed on the second play.
`,Ot=[{id:"lfo-slow",name:"slow",shape:"sine",sync:!0,bars:32,hz:.25,phase:.2,duty:.5},{id:"lfo-trip",name:"trip",shape:"sine",sync:!0,bars:16,hz:.25,phase:0,duty:.5},{id:"lfo-counter",name:"counter",shape:"sine",sync:!0,bars:16,hz:.25,phase:.5,duty:.5}],Dt=[{id:"w1",effect:"wobble",on:!0,mix:1,params:{amount:{source:"music.low",base:9e-4,depth:.0045,curve:1.6,fall:.2},angle:{source:"lfo.slow",base:0,depth:1,curve:1,fall:.12},spin:0,sep:1}},{id:"w2",effect:"sway",on:!0,mix:1,params:{x:.016,y:.015,rate:.114,lag:.39}},{id:"breathe-1",effect:"breathe",on:!0,mix:1,params:{amount:.066,cx:.5,cy:.5,roll:0}},{id:"ripple-2",effect:"ripple",on:!0,mix:1,params:{amount:{source:"lfo.trip",base:.0112,depth:.0056,curve:1,fall:0},freq:{source:"lfo.counter",base:25.84,depth:12.92,curve:1,fall:0},speed:.107,cx:.034,cy:.047}}],zt={id:Lt,name:It,scene:Ft,mount:Ut,blend:Mt,opacity:Bt,notes:Pt,lfos:Ot,layers:Dt};function _(e){return Number.isInteger(e)?String(e):String(Number(e.toFixed(4)))}function H(e,t,r){if(!A(r))return null;const s=r,o=[];s.curve!==1&&o.push(`curve ${_(s.curve)}`),s.fall>0&&o.push(`fall ${_(s.fall)}s`);const n=`${_(s.base)} → ${_(s.base+s.depth)}`;return`| ${e} | ${t} | \`${s.source}\` | ${n} | ${o.join(", ")||"—"} |`}function ne(e,t){const r=dt(e.scene),s=[];s.push(`# LOOK REQUEST — ${e.name}`),s.push(""),s.push(`\`${e.id}\` · ${t} · from the look studio (\`looks.html\`)`),s.push(""),e.notes.trim()!==""&&(s.push("> "+e.notes.trim().split(`
`).join(`
> `)),s.push("")),s.push("## Where it goes"),s.push(""),s.push(`- **scene** — ${r.name} (\`${r.id}\`)`),s.push(`- **mount** — ${e.mount==="plate"?"PLATE: the canvas replaces the flat background sheet, game props sit over it untouched":`OVER: the canvas sits above the board on \`mix-blend-mode: ${e.blend}\``}`),s.push(`- **opacity** — ${_(e.opacity)}`),s.push(`- **suggested host** — ${r.mountsAt}`),s.push(""),s.push("## The stack"),s.push(""),s.push("Bottom of this list is drawn first."),s.push("");for(const i of e.layers){const v=Y(i.effect),p=v?.label??i.effect,h=i.on?"":" _(muted)_",g=A(i.mix)?`mix ← \`${i.mix.source}\``:`mix ${_(i.mix)}`;s.push(`- **${p}** — ${g}${h}`);const d=[];for(const c of v?.params??[]){const f=i.params[c.key];if(A(f))continue;const b=typeof f=="number"?f:c.def;b!==c.def&&d.push(`${c.label} ${_(b)}`)}d.length>0&&s.push(`  - ${d.join(" · ")}`);for(const c of i.regions??[]){const f=A(c.amount)?`${_(c.amount.base)} → ${_(c.amount.base+c.amount.depth)} ← \`${c.amount.source}\``:_(c.amount),b=c.rot===0?"":`, turned ${_(c.rot)}`;s.push(`  - ${c.shape==="ellipse"?"oval":"box"} at ${_(c.x)}, ${_(c.y)} · ${_(c.w*2)} × ${_(c.h*2)} of the frame${b} · edge ${_(c.feather)} · at ${f}`)}if((i.regions??[]).length>0){i.outside===!0&&s.push("  - **inverted** — the effect lands everywhere EXCEPT those");const c=i.spill??he,f=i.lag??fe;s.push(c===0?"  - the rest of the screen gets **nothing** — a hard mask":`  - the rest of the screen gets **${_(c)}** of it, **${_(f)}s** behind`);const b=(i.regions??[]).map(y=>y.drift??J);b.some(y=>y>0)&&s.push(`  - each region wanders off that by up to ${b.map(_).join(", ")} on its own noise`)}}e.layers.length===0&&s.push("_(empty)_"),s.push(""),s.push("## What moves"),s.push("");const o=[];for(const i of e.layers){const v=Y(i.effect)?.label??i.effect,p=H(v,"mix",i.mix);p!==null&&o.push(p);for(const[h,g]of Object.entries(i.params)){const d=H(v,h,g);d!==null&&o.push(d)}for(const[h,g]of(i.regions??[]).entries()){const d=H(v,`region ${h+1}`,g.amount);d!==null&&o.push(d)}}o.length===0?s.push("Nothing. Every parameter in this look is a fixed number."):(s.push("| layer | knob | driven by | range | shaping |"),s.push("| --- | --- | --- | --- | --- |"),s.push(...o)),s.push("");const n=e.lfos.filter(i=>re(e).includes(`lfo.${i.name}`));if(n.length>0){s.push("## The LFOs it uses"),s.push("");for(const i of n){const v=i.sync?`${_(i.bars)} bar${i.bars===1?"":"s"} — locked to the transport`:`${_(i.hz)} Hz — free running`,p=i.phase===0?"":`, phase ${_(i.phase)}`;s.push(`- \`lfo.${i.name}\` — ${i.shape}, ${v}${p}`)}s.push("")}const l=e.layers.filter(i=>i.on).length,u=e.layers.some(i=>i.on&&i.effect==="trails");s.push("## What it costs"),s.push(""),s.push(`- ${l} full-screen pass${l===1?"":"es"} per frame at 1180×720`),s.push(`- ${u?"holds a feedback buffer (one extra full-screen texture)":"no feedback buffer"}`);const m=e.layers.filter(i=>i.on&&(i.regions??[]).length>0).length;return m>0&&s.push(`- ${m} pass${m===1?"":"es"} masked to regions — cheaper than it looks, the mask short-circuits`),s.push(`- listens to: ${re(e).map(i=>`\`${i}\``).join(", ")||"nothing"}`),s.push(""),s.push("## To pick this up"),s.push(""),s.push("```"),s.push(`the look studio filed ${e.id} — wire it into the game`),s.push("```"),s.push(""),s.push(`The patch is next to this file at \`design/looks/${e.id}.look.json\`. It is`),s.push("the same format `src/breach/looks/render.ts` already reads, so wiring it in is"),s.push("mounting `<Look>` in the host above and pointing it at this id — not a port."),s.push(""),s.join(`
`)}const Nt=Object.assign({"../../../design/looks/dusk-light.look.json":kt,"../../../design/looks/gentle-trip.look.json":zt}),Zt=new Map(Object.entries(Nt).map(([e,t])=>{const r=e.split("/").pop()?.replace(".look.json","")??t.id;return[r,pe({...t,id:r},ue)]})),qt=()=>new Date().toISOString().replace(/\.\d+Z$/,"Z");async function es(e,t){const r=qt(),s=JSON.stringify({look:e,stamp:r,brief:t?ne(e,r):null});try{const o=await fetch("/__looks/save",{method:"POST",headers:{"content-type":"application/json"},body:s});return o.ok?{ok:!0,where:((await o.json()).files??[]).join("  ·  ")}:{ok:!1,where:`the dev server said ${o.status}`}}catch{return ie(`${e.id}.look.json`,JSON.stringify(e,null,2),"application/json"),t&&ie(`${e.id}.request.md`,ne(e,r),"text/markdown"),{ok:!1,where:"no dev server — downloaded instead"}}}function ie(e,t,r){const s=URL.createObjectURL(new Blob([t],{type:r})),o=document.createElement("a");o.href=s,o.download=e,o.click(),setTimeout(()=>URL.revokeObjectURL(s),4e3)}const ve="breach.look.draft";function ts(e){try{localStorage.setItem(ve,JSON.stringify(e))}catch{}}function ss(){try{const e=localStorage.getItem(ve);return e===null?null:pe(JSON.parse(e),ue)}catch{return null}}export{Yt as A,J as D,Je as E,Xt as G,fe as L,$ as R,he as S,F as a,Ht as b,ss as c,jt as d,Y as e,Qt as f,Jt as g,Kt as h,A as i,mt as j,ts as k,Wt as l,Zt as m,K as n,Gt as o,ue as p,te as q,Vt as r,dt as s,pe as t,es as u};
