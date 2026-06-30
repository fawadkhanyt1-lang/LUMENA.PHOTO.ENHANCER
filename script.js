/* ============================================================
   THEME SYSTEM
================================================================ */
const body = document.body;
const savedTheme = localStorage.getItem('lumena-theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
document.querySelectorAll('.theme-dot').forEach(d=>{
  if(d.dataset.t===savedTheme) d.classList.add('active');
  d.addEventListener('click', ()=>{
    document.querySelectorAll('.theme-dot').forEach(x=>x.classList.remove('active'));
    d.classList.add('active');
    body.setAttribute('data-theme', d.dataset.t);
    localStorage.setItem('lumena-theme', d.dataset.t);
  });
});

/* Ripple effect for primary buttons */
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('click', function(e){
    const r = document.createElement('span');
    r.className='ripple';
    const rect = this.getBoundingClientRect();
    r.style.left = (e.clientX-rect.left)+'px';
    r.style.top = (e.clientY-rect.top)+'px';
    this.appendChild(r);
    setTimeout(()=>r.remove(),650);
  });
});

function toast(msg){
  const t = document.getElementById('toast');
  document.getElementById('toastText').textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._tm);
  toast._tm = setTimeout(()=>t.classList.remove('show'), 2200);
}

/* ============================================================
   SCROLL REVEAL
================================================================ */
const revealEls = document.querySelectorAll('.feature-card, .step, .testi-card');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
},{threshold:.15});
function observeReveal(){ document.querySelectorAll('.feature-card, .step, .testi-card').forEach(el=>io.observe(el)); }

/* ============================================================
   CONTENT DATA (features, steps, testimonials, faq, filters)
================================================================ */
const featureIcons = {
  auto:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2-6.3-4.6L5.7 21l2.3-7.2-6-4.6h7.6z"/></svg>`,
  slider:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="7" cy="18" r="2"/></svg>`,
  filter:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 3H2l8 9.5V19l4 2v-8.5z"/></svg>`,
  blur:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>`,
  denoise:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M8 12h8M12 8v8"/></svg>`,
  crop:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2v14a2 2 0 002 2h14M18 22V8a2 2 0 00-2-2H2"/></svg>`,
  batch:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  download:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>`,
  history:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 00-15-6.7L3 13"/></svg>`,
};
const features = [
  {icon:'auto', t:'One-click Auto Enhance', d:'A smart algorithm balances exposure, contrast and color in a single click — no guesswork.'},
  {icon:'slider', t:'Precision adjustments', d:'Fine-tune brightness, contrast, saturation, sharpness, warmth and noise independently.'},
  {icon:'filter', t:'Cinematic filter gallery', d:'Vintage, HDR, cinematic, cool, warm and more — preview every filter before applying.'},
  {icon:'blur', t:'Background blur', d:'Soften the background to draw focus to your subject, with adjustable strength.'},
  {icon:'denoise', t:'Noise reduction', d:'Clean up grainy low-light shots while preserving detail and edges.'},
  {icon:'crop', t:'Crop, rotate & flip', d:'Reframe any shot with a draggable crop box, 90° rotation and horizontal/vertical flip.'},
  {icon:'batch', t:'Batch uploads', d:'Load multiple photos at once and switch between them without losing your edits.'},
  {icon:'history', t:'Undo & redo', d:'Step backward and forward through your edit history at any time.'},
  {icon:'download', t:'Flexible export', d:'Download as lossless PNG or compressed JPG at the quality level you choose.'},
];
document.getElementById('featuresGrid').innerHTML = features.map(f=>`
  <div class="feature-card">
    <div class="feature-icon">${featureIcons[f.icon]}</div>
    <h3>${f.t}</h3><p>${f.d}</p>
  </div>`).join('');

const steps = [
  {n:'01', t:'Upload', d:'Drag a photo in or browse from your device. Multiple photos welcome.'},
  {n:'02', t:'Adjust', d:'Use Auto Enhance or fine-tune sliders, filters and tools to taste.'},
  {n:'03', t:'Compare', d:'Toggle between original and enhanced to confirm the result.'},
  {n:'04', t:'Download', d:'Export at your chosen quality — PNG or JPG, ready to share.'},
];
document.getElementById('stepsGrid').innerHTML = steps.map(s=>`
  <div class="step"><div class="step-num">${s.n}</div><h4>${s.t}</h4><p>${s.d}</p></div>`).join('');

const testimonials = [
  {n:'Amara K.', r:'Travel blogger', t:'AK', q:'I run every travel shot through the auto enhance before posting. It fixes flat lighting in seconds.'},
  {n:'Daniyal R.', r:'Product photographer', t:'DR', q:'The denoise and sharpness combo saved a whole batch of low-light product shots I thought were unusable.'},
  {n:'Priya S.', r:'Etsy seller', t:'PS', q:'Batch upload means I can prep a week of listing photos in one sitting. Huge time saver.'},
];
document.getElementById('testiGrid').innerHTML = testimonials.map(t=>`
  <div class="testi-card"><div class="testi-stars">★★★★★</div><p>"${t.q}"</p>
  <div class="testi-user"><div class="testi-avatar">${t.t}</div><div><b>${t.n}</b><span>${t.r}</span></div></div></div>`).join('');

const faqs = [
  {q:'Do my photos get uploaded to a server?', a:'No. All enhancement happens locally in your browser using the Canvas API — your images never leave your device.'},
  {q:'What file types are supported?', a:'JPG, PNG and WEBP are supported for both upload and export, with adjustable JPG quality.'},
  {q:'Can I undo an edit?', a:'Yes — use the undo and redo buttons in the canvas toolbar to step through your edit history at any time.'},
  {q:'Is there a limit on photo size?', a:'Very large images are automatically scaled for smooth editing performance, then exported at the working resolution.'},
  {q:'What does background blur actually do?', a:'It applies a graduated blur that keeps the center of your photo sharp while softening the edges, simulating a shallow depth of field.'},
];
document.getElementById('faqList').innerHTML = faqs.map((f,i)=>`
  <div class="faq-item" data-i="${i}">
    <div class="faq-q">${f.q}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></div>
    <div class="faq-a"><p>${f.a}</p></div>
  </div>`).join('');
document.querySelectorAll('.faq-item').forEach(item=>{
  item.querySelector('.faq-q').addEventListener('click', ()=>{
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>{ i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight=null; });
    if(!wasOpen){ item.classList.add('open'); const a=item.querySelector('.faq-a'); a.style.maxHeight=a.scrollHeight+'px'; }
  });
});

/* Filter definitions: CSS-filter style strings applied via canvas ctx.filter */
const FILTERS = [
  {id:'none', name:'Original', css:''},
  {id:'vivid', name:'Vivid', css:'saturate(1.5) contrast(1.12) brightness(1.04)'},
  {id:'bw', name:'B & W', css:'grayscale(1) contrast(1.08)'},
  {id:'vintage', name:'Vintage', css:'sepia(.35) saturate(1.1) contrast(.95) brightness(1.03)'},
  {id:'cool', name:'Cool', css:'saturate(1.1) hue-rotate(-12deg) brightness(1.02)'},
  {id:'warm', name:'Warm', css:'saturate(1.15) hue-rotate(8deg) brightness(1.03)'},
  {id:'hdr', name:'HDR', css:'contrast(1.25) saturate(1.3) brightness(1.05)'},
  {id:'cinema', name:'Cinematic', css:'contrast(1.15) saturate(.85) brightness(.96) sepia(.12)'},
];
document.getElementById('filterGrid').innerHTML = FILTERS.map(f=>`
  <div class="filter-chip" data-f="${f.id}"><img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&q=60&auto=format" style="filter:${f.css}"><span>${f.name}</span></div>`).join('');

/* ============================================================
   PANEL TABS
================================================================ */
document.querySelectorAll('.panel-tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.panel-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.panel-section').forEach(s=>s.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`.panel-section[data-section="${tab.dataset.tab}"]`).classList.add('active');
  });
});

/* ============================================================
   EDITOR ENGINE
================================================================ */
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const uploadZone = document.getElementById('uploadZone');
const canvasStage = document.getElementById('canvasStage');
const canvasToolbar = document.getElementById('canvasToolbar');
const fileInput = document.getElementById('fileInput');
const canvasArea = document.getElementById('canvasArea');
const progressOverlay = document.getElementById('progressOverlay');
const compareBadge = document.getElementById('compareBadge');

let state = {
  brightness:0, contrast:0, saturation:0, sharpness:0, denoise:0, warmth:0, activeFilter:'none',
  rotation:0, flipH:1, flipV:1, zoom:1,
};
let originalImg = null;     // pristine HTMLImage for current photo
let baseImageData = null;   // ImageData baseline after crop/rotate/flip (pre adjustment)
let history = [];           // array of {dataURL, state}
let historyIndex = -1;
let comparing = false;

let batch = []; // {id, img, state, name}
let activeBatchId = null;

function showEditor(){
  uploadZone.style.display='none';
  canvasStage.style.display='block';
  canvasToolbar.classList.add('show');
}

function loadImageFile(file, asNewBatchItem=true){
  return new Promise(res=>{
    const reader = new FileReader();
    reader.onload = e=>{
      const img = new Image();
      img.onload = ()=>{
        const id = Date.now()+Math.random();
        const item = {id, img, name:file.name, state:{brightness:0,contrast:0,saturation:0,sharpness:0,denoise:0,warmth:0,activeFilter:'none',rotation:0,flipH:1,flipV:1,zoom:1}};
        batch.push(item);
        renderBatchStrip();
        res(item);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

async function handleFiles(fileList){
  const files = Array.from(fileList).filter(f=>f.type.startsWith('image/'));
  if(!files.length) return;
  progressOverlay.classList.add('show');
  document.getElementById('progressText').textContent = files.length>1 ? `Loading ${files.length} photos…` : 'Loading photo…';
  let firstItem=null;
  for(const f of files){ const item = await loadImageFile(f); if(!firstItem) firstItem=item; }
  setTimeout(()=>{
    progressOverlay.classList.remove('show');
    showEditor();
    setActiveBatch(firstItem.id);
    toast(files.length>1 ? `${files.length} photos loaded` : 'Photo loaded');
  }, 450);
}

function setActiveBatch(id){
  const item = batch.find(b=>b.id===id);
  if(!item) return;
  activeBatchId = id;
  originalImg = item.img;
  state = item.state;
  history = []; historyIndex = -1;
  initCanvasFromImage();
  pushHistory();
  syncSlidersToState();
  renderBatchStrip();
}

function renderBatchStrip(){
  const strip = document.getElementById('batchStrip');
  strip.innerHTML = batch.map(b=>`<div class="batch-thumb ${b.id===activeBatchId?'active':''}" data-id="${b.id}"><img src="${b.img.src}"></div>`).join('') + '<div class="batch-add" id="batchAddBtn">+</div>';
  strip.querySelectorAll('.batch-thumb').forEach(t=>t.addEventListener('click', ()=>setActiveBatch(parseFloat(t.dataset.id))));
  document.getElementById('batchAddBtn').addEventListener('click', ()=>fileInput.click());
}

function initCanvasFromImage(){
  const maxDim = 1100;
  let w = originalImg.naturalWidth, h = originalImg.naturalHeight;
  if(w>maxDim || h>maxDim){ const r = Math.min(maxDim/w, maxDim/h); w=Math.round(w*r); h=Math.round(h*r); }
  canvas.width = w; canvas.height = h;
  drawBase();
}

function drawBase(){
  // draws original image applying rotation/flip into canvas at canvas's own dimensions
  const w = canvas.width, h = canvas.height;
  ctx.save();
  ctx.clearRect(0,0,w,h);
  ctx.translate(w/2, h/2);
  ctx.rotate((state.rotation*Math.PI)/180);
  ctx.scale(state.flipH, state.flipV);
  const swap = state.rotation%180!==0;
  const dw = swap? h:w, dh = swap? w:h;
  ctx.drawImage(originalImg, -dw/2, -dh/2, dw, dh);
  ctx.restore();
  baseImageData = ctx.getImageData(0,0,w,h);
  applyAdjustments();
}

function buildFilterString(){
  const b = 1 + state.brightness/100;
  const c = 1 + state.contrast/100;
  const s = 1 + state.saturation/100;
  const warmHue = state.warmth>=0 ? `hue-rotate(${(state.warmth/100*10)}deg)` : `hue-rotate(${(state.warmth/100*10)}deg)`;
  const filterChip = FILTERS.find(f=>f.id===state.activeFilter);
  const filterCss = filterChip ? filterChip.css : '';
  return `brightness(${b}) contrast(${c}) saturate(${s}) ${warmHue} ${filterCss}`.trim();
}

function applySharpenDenoise(imageData){
  if(state.sharpness===0 && state.denoise===0) return imageData;
  const {width:w, height:h, data} = imageData;
  const out = new Uint8ClampedArray(data);
  const sAmt = state.sharpness/100;
  const dAmt = state.denoise/100;
  // combined 3x3 kernel: sharpen vs box-blur(denoise) blended
  for(let y=1;y<h-1;y++){
    for(let x=1;x<w-1;x++){
      const i = (y*w+x)*4;
      for(let c=0;c<3;c++){
        const center = data[i+c];
        const up=data[((y-1)*w+x)*4+c], down=data[((y+1)*w+x)*4+c], left=data[(y*w+x-1)*4+c], right=data[(y*w+x+1)*4+c];
        const avg = (up+down+left+right+center)/5;
        let val = center;
        if(sAmt>0){ val = center + (center - avg) * sAmt * 1.6; }
        if(dAmt>0){ val = val*(1-dAmt*0.6) + avg*(dAmt*0.6); }
        out[i+c] = val;
      }
    }
  }
  return new ImageData(out, w, h);
}

function applyAdjustments(){
  if(!baseImageData) return;
  const w = canvas.width, h = canvas.height;
  ctx.save();
  ctx.filter = buildFilterString();
  // draw base image data through an offscreen canvas to allow ctx.filter to apply
  const off = document.createElement('canvas'); off.width=w; off.height=h;
  off.getContext('2d').putImageData(baseImageData,0,0);
  ctx.clearRect(0,0,w,h);
  ctx.drawImage(off,0,0);
  ctx.restore();
  ctx.filter='none';
  if(state.sharpness>0 || state.denoise>0){
    const id = ctx.getImageData(0,0,w,h);
    const processed = applySharpenDenoise(id);
    ctx.putImageData(processed,0,0);
  }
  canvas.style.transform = `scale(${state.zoom})`;
}

/* ---- history ---- */
function pushHistory(){
  historyIndex++;
  history.length = historyIndex;
  history.push({dataURL: canvas.toDataURL(), snapState: JSON.parse(JSON.stringify(state))});
}
function commitState(){ applyAdjustments(); pushHistory(); if(activeBatchId){ const item=batch.find(b=>b.id===activeBatchId); if(item) item.state = state; } }
function restoreFromHistory(){
  const h = history[historyIndex];
  if(!h) return;
  state = JSON.parse(JSON.stringify(h.snapState));
  const img = new Image();
  img.onload = ()=>{ ctx.clearRect(0,0,canvas.width,canvas.height); ctx.drawImage(img,0,0,canvas.width,canvas.height); };
  img.src = h.dataURL;
  syncSlidersToState();
}
document.getElementById('undoBtn').addEventListener('click', ()=>{
  if(historyIndex>0){ historyIndex--; restoreFromHistory(); toast('Undo'); }
});
document.getElementById('redoBtn').addEventListener('click', ()=>{
  if(historyIndex<history.length-1){ historyIndex++; restoreFromHistory(); toast('Redo'); }
});

function syncSlidersToState(){
  ['brightness','contrast','saturation','sharpness','denoise','warmth'].forEach(k=>{
    const r = document.getElementById('r'+k[0].toUpperCase()+k.slice(1));
    const v = document.getElementById('v'+k[0].toUpperCase()+k.slice(1));
    r.value = state[k]; v.textContent = state[k];
  });
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.toggle('active', c.dataset.f===state.activeFilter));
}

/* ---- sliders ---- */
['Brightness','Contrast','Saturation','Sharpness','Denoise','Warmth'].forEach(key=>{
  const slider = document.getElementById('r'+key);
  const valEl = document.getElementById('v'+key);
  slider.addEventListener('input', ()=>{
    state[key.toLowerCase()] = parseInt(slider.value);
    valEl.textContent = slider.value;
    applyAdjustments();
  });
  slider.addEventListener('change', commitState);
});

/* ---- filters ---- */
document.getElementById('filterGrid').addEventListener('click', e=>{
  const chip = e.target.closest('.filter-chip');
  if(!chip) return;
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  chip.classList.add('active');
  state.activeFilter = chip.dataset.f;
  applyAdjustments();
  commitState();
  toast(`Filter: ${chip.querySelector('span').textContent}`);
});

/* ---- auto enhance ---- */
document.getElementById('autoEnhanceBtn').addEventListener('click', ()=>{
  progressOverlay.classList.add('show');
  document.getElementById('progressText').textContent='Auto enhancing…';
  setTimeout(()=>{
    state.brightness=8; state.contrast=14; state.saturation=18; state.sharpness=22; state.denoise=10; state.warmth=4;
    syncSlidersToState();
    applyAdjustments();
    commitState();
    progressOverlay.classList.remove('show');
    toast('Auto enhance applied');
  }, 700);
});

/* ---- reset ---- */
document.getElementById('resetBtn').addEventListener('click', ()=>{
  state = {brightness:0,contrast:0,saturation:0,sharpness:0,denoise:0,warmth:0,activeFilter:'none',rotation:0,flipH:1,flipV:1,zoom:1};
  syncSlidersToState();
  initCanvasFromImage();
  pushHistory();
  toast('Reset to original');
});

/* ---- compare toggle ---- */
document.getElementById('compareBtn').addEventListener('click', ()=>{
  comparing = !comparing;
  compareBadge.classList.toggle('show', comparing);
  document.getElementById('compareBtn').classList.toggle('active', comparing);
  if(comparing){
    const w=canvas.width,h=canvas.height;
    ctx.clearRect(0,0,w,h);
    const off=document.createElement('canvas'); off.width=w; off.height=h;
    off.getContext('2d').drawImage(originalImg,0,0,w,h);
    ctx.drawImage(off,0,0);
  } else { applyAdjustments(); }
});

/* ---- zoom ---- */
document.getElementById('zoomInBtn').addEventListener('click', ()=>{ state.zoom=Math.min(2.5,state.zoom+0.15); canvas.style.transform=`scale(${state.zoom})`; });
document.getElementById('zoomOutBtn').addEventListener('click', ()=>{ state.zoom=Math.max(0.5,state.zoom-0.15); canvas.style.transform=`scale(${state.zoom})`; });

/* ---- rotate / flip ---- */
document.getElementById('rotateBtn').addEventListener('click', ()=>{
  state.rotation = (state.rotation+90)%360;
  const w=canvas.width, h=canvas.height;
  canvas.width=h; canvas.height=w;
  drawBase(); commitState(); toast('Rotated 90°');
});
document.getElementById('flipHBtn').addEventListener('click', ()=>{ state.flipH*=-1; drawBase(); commitState(); toast('Flipped horizontally'); });
document.getElementById('flipVBtn').addEventListener('click', ()=>{ state.flipV*=-1; drawBase(); commitState(); toast('Flipped vertically'); });

/* ---- background blur (radial: sharp center, blurred edges) ---- */
document.getElementById('bgBlurBtn').addEventListener('click', ()=>{
  progressOverlay.classList.add('show');
  document.getElementById('progressText').textContent='Blurring background…';
  setTimeout(()=>{
    const w=canvas.width,h=canvas.height;
    const blurred=document.createElement('canvas'); blurred.width=w; blurred.height=h;
    const bctx=blurred.getContext('2d');
    bctx.filter='blur(9px)';
    bctx.drawImage(canvas,0,0);
    bctx.filter='none';
    // radial mask: draw sharp original on top, masked by radial gradient (transparent center -> opaque edge)
    const grad = bctx.createRadialGradient(w/2,h/2,Math.min(w,h)*0.18, w/2,h/2, Math.max(w,h)*0.62);
    grad.addColorStop(0,'rgba(0,0,0,0)');
    grad.addColorStop(1,'rgba(0,0,0,1)');
    bctx.globalCompositeOperation='destination-out';
    // can't directly mask easily; simpler approach: composite sharp circle from current canvas onto blurred
    bctx.globalCompositeOperation='source-over';
    const maskCanvas=document.createElement('canvas'); maskCanvas.width=w; maskCanvas.height=h;
    const mctx=maskCanvas.getContext('2d');
    mctx.drawImage(canvas,0,0);
    mctx.globalCompositeOperation='destination-in';
    const rg=mctx.createRadialGradient(w/2,h/2,Math.min(w,h)*0.15, w/2,h/2, Math.max(w,h)*0.55);
    rg.addColorStop(0,'rgba(0,0,0,1)'); rg.addColorStop(1,'rgba(0,0,0,0)');
    mctx.fillStyle=rg; mctx.fillRect(0,0,w,h);
    bctx.drawImage(maskCanvas,0,0);
    ctx.clearRect(0,0,w,h);
    ctx.drawImage(blurred,0,0);
    baseImageData = ctx.getImageData(0,0,w,h);
    commitState();
    progressOverlay.classList.remove('show');
    toast('Background blur applied');
  },500);
});

/* ---- crop ---- */
const cropBox = document.getElementById('cropBox');
let cropping=false, cropRect=null, dragInfo=null;
document.getElementById('cropToolBtn').addEventListener('click', ()=>{
  cropping = !cropping;
  document.getElementById('cropToolBtn').classList.toggle('active', cropping);
  if(cropping){
    const r = canvas.getBoundingClientRect();
    const areaR = canvasArea.getBoundingClientRect();
    cropRect = {x:r.width*0.12, y:r.height*0.12, w:r.width*0.76, h:r.height*0.76, canvasLeft:r.left-areaR.left, canvasTop:r.top-areaR.top};
    cropBox.style.display='block';
    updateCropBoxUI();
    toast('Drag the box, then Apply Crop');
  } else { cropBox.style.display='none'; }
});
function updateCropBoxUI(){
  cropBox.style.left = (cropRect.canvasLeft+cropRect.x)+'px';
  cropBox.style.top = (cropRect.canvasTop+cropRect.y)+'px';
  cropBox.style.width = cropRect.w+'px';
  cropBox.style.height = cropRect.h+'px';
}
cropBox.addEventListener('mousedown', e=>{
  const isHandle = e.target.classList.contains('handle');
  dragInfo = {startX:e.clientX, startY:e.clientY, rect:{...cropRect}, handle: isHandle? e.target.classList[1] : null};
  e.stopPropagation();
});
window.addEventListener('mousemove', e=>{
  if(!dragInfo) return;
  const dx = e.clientX-dragInfo.startX, dy = e.clientY-dragInfo.startY;
  if(dragInfo.handle){
    let {x,y,w,h} = dragInfo.rect;
    if(dragInfo.handle==='se'){ w+=dx; h+=dy; }
    if(dragInfo.handle==='sw'){ x+=dx; w-=dx; h+=dy; }
    if(dragInfo.handle==='ne'){ y+=dy; w+=dx; h-=dy; }
    if(dragInfo.handle==='nw'){ x+=dx; y+=dy; w-=dx; h-=dy; }
    cropRect = {...cropRect, x:Math.max(0,x), y:Math.max(0,y), w:Math.max(40,w), h:Math.max(40,h)};
  } else {
    cropRect = {...cropRect, x:dragInfo.rect.x+dx, y:dragInfo.rect.y+dy};
  }
  updateCropBoxUI();
});
window.addEventListener('mouseup', ()=>{ dragInfo=null; });

document.getElementById('applyCropBtn').addEventListener('click', ()=>{
  if(!cropping || !cropRect) { toast('Select Crop tool first'); return; }
  const scaleX = canvas.width / canvas.getBoundingClientRect().width;
  const scaleY = canvas.height / canvas.getBoundingClientRect().height;
  const sx = cropRect.x*scaleX, sy = cropRect.y*scaleY, sw = cropRect.w*scaleX, sh = cropRect.h*scaleY;
  const off = document.createElement('canvas'); off.width=sw; off.height=sh;
  off.getContext('2d').drawImage(canvas, sx,sy,sw,sh, 0,0,sw,sh);
  canvas.width=sw; canvas.height=sh;
  ctx.drawImage(off,0,0);
  baseImageData = ctx.getImageData(0,0,sw,sh);
  cropping=false; cropBox.style.display='none';
  document.getElementById('cropToolBtn').classList.remove('active');
  commitState();
  toast('Crop applied');
});

/* ---- upload handlers ---- */
uploadZone.addEventListener('click', ()=>fileInput.click());
document.getElementById('navUploadBtn').addEventListener('click', ()=>{ document.getElementById('tool').scrollIntoView({behavior:'smooth'}); setTimeout(()=>fileInput.click(),500); });
document.getElementById('heroUploadBtn').addEventListener('click', ()=>{ document.getElementById('tool').scrollIntoView({behavior:'smooth'}); setTimeout(()=>fileInput.click(),500); });
document.getElementById('newPhotoBtn').addEventListener('click', ()=>fileInput.click());
fileInput.addEventListener('change', e=>handleFiles(e.target.files));

['dragover','dragenter'].forEach(ev=>uploadZone.addEventListener(ev, e=>{ e.preventDefault(); uploadZone.classList.add('dragover'); }));
['dragleave','drop'].forEach(ev=>uploadZone.addEventListener(ev, e=>{ e.preventDefault(); uploadZone.classList.remove('dragover'); }));
uploadZone.addEventListener('drop', e=>{ handleFiles(e.dataTransfer.files); });

/* ---- download ---- */
document.getElementById('downloadBtn').addEventListener('click', ()=>{
  const q = parseFloat(document.getElementById('qualitySelect').value);
  const isPng = q===1.0;
  const link = document.createElement('a');
  link.download = `lumena-enhanced.${isPng?'png':'jpg'}`;
  link.href = canvas.toDataURL(isPng?'image/png':'image/jpeg', q);
  link.click();
  toast('Download started');
});

document.getElementById('batchAddBtn')?.addEventListener('click', ()=>fileInput.click());

/* ---- newsletter ---- */
document.getElementById('subscribeBtn').addEventListener('click', e=>{
  e.preventDefault();
  const input = document.querySelector('.newsletter input');
  if(input.value.includes('@')){ toast('Subscribed — welcome!'); input.value=''; }
  else { toast('Enter a valid email'); }
});

/* init reveal animations once content injected */
observeReveal();
