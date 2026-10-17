const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'✕':'☰';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';}));
const progress=document.getElementById('progress');
function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?scrollY/max*100:0}%`;}
addEventListener('scroll',updateScroll,{passive:true});updateScroll();
const links=[...nav.querySelectorAll('a[href^="#"]')];
const watcher=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+entry.target.id));}}},{rootMargin:'-25% 0px -65% 0px'});
document.querySelectorAll('main section[id]').forEach(el=>watcher.observe(el));

// FormSubmit AJAX integration: no page redirect. The destination inbox must activate FormSubmit first.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const status = document.getElementById('contactStatus');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    if (contactForm.elements['_honey'].value) return;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    status.className = 'contact-status';
    status.textContent = 'Submitting your message…';
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      const result = await response.json();
      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error(result.message || 'The service could not accept your message.');
      }
      status.className = 'contact-status success';
      status.textContent = 'Your message was submitted. If this is the first submission, the team may need to activate email delivery.';
      contactForm.reset();
    } catch (error) {
      status.className = 'contact-status error';
      status.textContent = 'Message not sent. Please try again later or contact the team by email.';
      console.error('Contact form submission error:', error);
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
    }
  });
}


// Local video cards: do not render broken players while MP4s are missing.
// Video paths are defined on each .media-card in index.html.
for (const card of document.querySelectorAll('.media-card[data-video-src]')) {
  const src = card.dataset.videoSrc;
  const host = card.querySelector('[data-video-host]');
  if (!src || !host) continue;
  // HEAD checks for a present file in Vercel or a local development web server.
  fetch(src, { method: 'HEAD' }).then(response => {
    if (!response.ok || !(response.headers.get('content-type') || '').includes('video')) return;
    const player = document.createElement('video');
    player.controls = true;
    player.preload = 'metadata';
    player.playsInline = true;
    player.setAttribute('aria-label', card.querySelector('h4')?.textContent || 'Research video');
    player.src = src;
    host.replaceChildren(player);
  }).catch(() => {/* Keep awaiting-upload placeholder if unavailable. */});
}


// Modal: detailed explanations reproduced from the supplied group research paper.
const researchComponents = [{"owner": "Keenavinna K.A.I.U.", "studentId": "IT22214034", "title": "Outbreak Prediction", "description": "Random Forest and XGBoost compare dengue outbreak risk classes Low, Medium and High using historical surveillance and meteorological factors. Chronologically separated 2025 evaluation is reported in the group paper.", "technologies": "Data preprocessing · Training/testing · Risk classification"}, {"owner": "Hettiarachchi A.T.", "studentId": "IT22165848", "title": "Explainable AI & Visualization", "description": "Uses SHAP local and global interpretations to show which temporal and environmental factors influence model predictions. Presents interpretable trends and geographic risk information.", "technologies": "SHAP · Feature importance · Risk visualization"}, {"owner": "Wickramarachchi T.T.", "studentId": "IT22243980", "title": "Intervention Optimization", "description": "Uses Q-Learning to connect dengue and environmental conditions with context-sensitive intervention recommendations, supporting decision-making rather than replacing professional guidance.", "technologies": "Q-Learning · Interventions · Policy"}, {"owner": "Adiithya A.A.H.", "studentId": "IT22281982", "title": "Dengue Health Intelligence", "description": "DistilBERT-based NLP supports Sinhala and English dengue-related information classification, chatbot help and misinformation handling. The paper also describes AI-assisted PHI inspection.", "technologies": "DistilBERT · NLP · Evidence retrieval"}];
const componentDialog = document.getElementById('componentDialog');
for (const button of document.querySelectorAll('[data-component]')) {
  button.addEventListener('click', () => {
    const info = researchComponents[Number(button.dataset.component)];
    if (!info || !componentDialog) return;
    document.getElementById('componentTitle').textContent = info.title;
    document.getElementById('componentOwner').textContent = `${info.owner} · ${info.studentId}`;
    document.getElementById('componentDescription').textContent = info.description;
    document.getElementById('componentTech').textContent = info.technologies;
    componentDialog.showModal();
  });
}
componentDialog?.querySelector('[data-close-dialog]')?.addEventListener('click', () => componentDialog.close());
componentDialog?.addEventListener('click', (event) => { if (event.target === componentDialog) componentDialog.close(); });

// Live risk probabilities from the verified /today-dashboard JSON schema.
// These are model probabilities for one forecast, NOT proportions of areas/cases.
const forecastDate = document.getElementById('forecastDate');
const forecastStatus = document.getElementById('forecastStatus');
const forecastNote = document.getElementById('forecastNote');
const riskEndpoint = window.VECTORSHIELD_API_CONFIG?.riskEndpoint;
const riskIds = { High: 'riskHigh', Medium: 'riskMedium', Low: 'riskLow' };

if (forecastStatus && riskEndpoint && /^https:\/\//i.test(riskEndpoint)) {
  (async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      forecastStatus.textContent = 'Loading latest model forecast…';
      const response = await fetch(riskEndpoint, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
        cache: 'no-store'
      });
      if (!response.ok) throw new Error(`API returned HTTP ${response.status}`);
      const data = await response.json();
      if (!data || !/^\d{4}-\d{2}-\d{2}$/.test(data.date || '')) {
        throw new Error('Missing or invalid forecast date');
      }
      if (!data.probabilities || !['High','Medium','Low'].every(
        key => typeof data.probabilities[key] === 'number' && Number.isFinite(data.probabilities[key]) && data.probabilities[key] >= 0 && data.probabilities[key] <= 100
      )) throw new Error('Invalid risk probability fields');

      const sum = ['High','Medium','Low'].reduce((n,key) => n+data.probabilities[key], 0);
      if (Math.abs(sum - 100) > 0.5) throw new Error('Risk probabilities do not total 100%');

      for (const [risk, id] of Object.entries(riskIds)) {
        const element = document.getElementById(id);
        if (element) element.textContent = `${data.probabilities[risk].toFixed(2)}%`;
      }
      if (forecastDate) forecastDate.textContent = `${data.date} · Week ${data.week ?? '—'}`;
      const level = ['High','Medium','Low'].includes(data.risk_level) ? data.risk_level : 'Unspecified';
      const confidence = typeof data.confidence === 'number' ? ` (${data.confidence.toFixed(2)}% confidence)` : '';
      const nowLK = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Colombo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
      const dateLabel = data.date === nowLK ? "Today's" : 'Latest available';
      forecastStatus.textContent = `${dateLabel} model forecast: ${level} risk${confidence}. Model: ${data.model_used || 'Research prediction model'}.`;
      if (forecastNote) forecastNote.textContent =
        'These are model-estimated probabilities, NOT the percentage of Colombo areas at each risk level. ' +
        'The backend uses historical seasonal dengue/weather averages and the displayed Sri Lanka date; this is not a live case-surveillance reading.';
    } catch (err) {
      forecastStatus.textContent = `Forecast unavailable: ${err.message}. Check API availability and CORS configuration.`;
      for (const id of Object.values(riskIds)) {
        const element = document.getElementById(id);
        if (element) element.textContent = '—';
      }
    } finally {
      clearTimeout(timeout);
    }
  })();
}

// Presentation title -> OneDrive, only after the user enters real public/viewer-approved URLs.
for (const row of document.querySelectorAll('.presentation-entry[data-presentation]')) {
  const url = window.VECTORSHIELD_ONEDRIVE_LINKS?.[row.dataset.presentation];
  if (!url || !/^https:\/\//i.test(url)) continue;
  const title = row.querySelector('.presentation-name');
  const note = row.querySelector('.onedrive-note');
  if (!title) continue;
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = title.textContent + ' ↗';
  title.replaceChildren(link);
  if (note) note.textContent = 'Open in OneDrive';
}
