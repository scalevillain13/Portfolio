(function() {
  'use strict';

  const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterButtons.length || !portfolioItems.length) return;

  function filterProjects(category) {
    portfolioItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      
      if (category === 'all' || itemCategory === category) {
        item.classList.remove('is-hidden');
      } else {
        item.classList.add('is-hidden');
      }
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      filterButtons.forEach(b => b.classList.remove('portfolio-filter-btn--active'));
      this.classList.add('portfolio-filter-btn--active');
      
      filterProjects(category);
    });
  });
})();
