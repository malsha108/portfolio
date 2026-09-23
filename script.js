/* Theme toggle */
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  if(!btn) return;
  const icon = btn.querySelector('i');
  function apply(theme){
    if(theme){ root.setAttribute('data-theme', theme); }
    else { root.removeAttribute('data-theme'); }
    const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if(icon) icon.className = isDark ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
  }
  let saved = null;
  try{ saved = localStorage.getItem('theme'); }catch(e){}
  apply(saved);
  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light');
    const next = current === 'dark' ? 'light' : 'dark';
    apply(next);
    try{ localStorage.setItem('theme', next); }catch(e){}
  });
})();

/* Mobile nav */
(function(){
  const btn = document.getElementById('hamburgerBtn');
  const panel = document.getElementById('mobilePanel');
  if(!btn || !panel) return;
  btn.addEventListener('click', () => panel.classList.toggle('open'));
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => panel.classList.remove('open')));
})();

/* Scroll reveal */
(function(){
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {threshold:0.15});
  items.forEach(i=>io.observe(i));
})();

/* ---------------- Projects ---------------- */
const projects = [
  {
    tag: "01 · Desktop Application",
    name: "Hotel Management System",
    short: "A desktop-based hotel operations tool covering rooms, staff and guest flow end to end.",
    type: "Desktop Application",
    desc: "A Java Swing desktop application built to manage day-to-day hotel operations — from customer and staff records to room availability and pickup requests — backed by a MySQL database via JDBC.",
    tech: ["Java Swing","JDBC","MySQL","NetBeans"],
    features: ["Customer, employee, driver, room and department management","Room search and live room status","Check-in and check-out workflows","Pickup request handling"],
    github: "https://github.com/malsha108",
    thumb: `<img src="./HHH.PNG" alt="Hotel Management System">`
  },
  {
    tag: "02 · UI/UX Case Study",
    name: "FoodHub",
    short: "A food delivery app concept focused on local, location-based restaurant discovery.",
    type: "Mobile App UI/UX",
    desc: "A modern food delivery mobile app home screen designed in Figma, focused on discovering local restaurants nearby, with category filters and rich restaurant cards.",
    tech: ["Figma","UI/UX Design","Clay Mockup"],
    features: ["Location-based restaurant discovery","Category filters — Burgers, Pizza, Rice, Drinks","Restaurant cards with ratings, delivery time and distance","3D iPhone mockup presentation"],
    github: "https://github.com/malsha108",
    githubLabel: "View Prototype",
    thumb: `<img src="./Untitled-edited.jpg" alt="FoodHub UI">`
  },
  {
    tag: "03 · UI/UX Case Study",
    name: "InternHub",
    short: "An internship discovery app concept for Sri Lankan HNDIT and university students.",
    type: "Mobile App UI/UX",
    desc: "A mobile app concept helping Sri Lankan students discover and explore internship opportunities, with an interactive Figma prototype linking search, job details and direct HR chat.",
    tech: ["Figma","Auto Layout","Component System"],
    features: ["Home screen with internship search & filters","Job details with company info, salary and requirements","Direct chat screen with HR","Interactive prototype across 3 key screens"],
    github: "https://bit.ly/4dfm7OD",
    githubLabel: "View Prototype",
    thumb: `<img src="./Untitled%20(1).png" alt="InternHub UI">`
  }
];

const PER_PAGE = 2;
let currentPage = 1;
const projGrid = document.getElementById('projGrid');
const projPagination = document.getElementById('projPagination');

function renderProjects(page){
  if(!projGrid || !projPagination) return;
  currentPage = page;
  const start = (page-1)*PER_PAGE;
  const pageItems = projects.slice(start, start+PER_PAGE);
  projGrid.innerHTML = pageItems.map((p, idx) => `
    <div class="proj-card reveal in">
      <div class="proj-thumb">${p.thumb}</div>
      <div class="proj-body">
        <span class="ptag">${p.tag}</span>
        <h3>${p.name}</h3>
        <p>${p.short}</p>
        <div class="tech-row">${p.tech.map(t=>`<span>${t}</span>`).join('')}</div>
        <div class="proj-actions">
          <a class="btn btn-ghost" href="${p.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> ${p.githubLabel || 'GitHub'}</a>
          <button class="btn btn-ghost details-btn" data-idx="${start+idx}">Details</button>
        </div>
      </div>
    </div>
  `).join('');
  const totalPages = Math.ceil(projects.length / PER_PAGE);
  let html = `<button class="page-btn nav" id="prevPageBtn" ${page===1?'disabled':''}><i class="fa-solid fa-arrow-left"></i> Previous</button>`;
  for(let i=1;i<=totalPages;i++){
    html += `<button class="page-btn ${i===page?'active':''}" data-page="${i}">${i}</button>`;
  }
  html += `<button class="page-btn nav" id="nextPageBtn" ${page===totalPages?'disabled':''}>Next <i class="fa-solid fa-arrow-right"></i></button>`;
  projPagination.innerHTML = html;

  projPagination.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click', ()=>renderProjects(parseInt(b.dataset.page))));
  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');
  if(prevBtn) prevBtn.addEventListener('click', ()=>{ if(currentPage>1) renderProjects(currentPage-1); });
  if(nextBtn) nextBtn.addEventListener('click', ()=>{ if(currentPage<totalPages) renderProjects(currentPage+1); });

  projGrid.querySelectorAll('.details-btn').forEach(b=>b.addEventListener('click', ()=>openProjectModal(parseInt(b.dataset.idx))));
}
renderProjects(1);

/* Modal */
const modalBackdrop = document.getElementById('projModalBackdrop');
