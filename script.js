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
