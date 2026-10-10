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
