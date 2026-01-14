document.addEventListener('DOMContentLoaded',function(){
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  toggle.addEventListener('click',()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    // toggle visibility
    if(nav.style.display === 'block'){
      nav.style.display = '';
    } else {
      nav.style.display = 'block';
    }
  });
  // Close nav when focus moves away (small screens)
  document.addEventListener('click',(e)=>{
    if(!nav.contains(e.target) && !toggle.contains(e.target) && window.innerWidth < 768){
      nav.style.display = '';
      toggle.setAttribute('aria-expanded','false');
    }
  });
});
