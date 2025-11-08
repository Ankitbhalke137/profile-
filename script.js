'use strict';




// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// NOTE: DOM queries and event listeners are initialized inside DOMContentLoaded below
// to ensure elements are present. (See the large DOMContentLoaded block later in the file.)

// removed top-level DOM queries to avoid running before DOM is ready

// testimonials variables (kept declaration for backward compatibility if needed)
let testimonialsItem;
let modalContainer;
let modalCloseBtn;
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded: initializing interactive behavior');
  // element toggle function
  const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
  }

  // testimonials variables
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  }
  if (modalCloseBtn && overlay) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
    overlay.addEventListener("click", testimonialsModalFunc);
  }

  // select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");
  if (select) {
    select.addEventListener("click", function () { elementToggleFunc(this); });
  }
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      elementToggleFunc(select);
    });
  }
  const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }
  let lastClickedBtn = filterBtn[0];
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }

  // contact form variables
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form && form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  // page navigation variables
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  console.log('Found navigation links:', navigationLinks.length, 'pages:', pages.length);

  // helper to activate a page and link
  const activate = (linkEl, pageEl) => {
    navigationLinks.forEach(link => link.classList.remove("active"));
    pages.forEach(page => page.classList.remove("active"));
    if (pageEl) pageEl.classList.add('active');
    if (linkEl) linkEl.classList.add('active');
    window.scrollTo(0,0);
    try {
      if (pageEl && pageEl.dataset && pageEl.dataset.page) {
        // update URL hash without adding history entry
        history.replaceState(null, '', '#' + pageEl.dataset.page);
      }
    } catch (e) {
      console.warn('Unable to update hash:', e);
    }
  };

  // attach click handlers with detailed logging and fallback matching
  navigationLinks.forEach((linkEl, idx) => {
    linkEl.addEventListener('click', function(ev) {
      const raw = this.textContent || this.innerText || '';
      const btnText = raw.trim().toLowerCase();
      console.log('Nav click:', {index: idx, text: raw, btnText});

      // 1) try matching by text
      let targetPage = Array.from(pages).find(p => (p.dataset.page || '').toLowerCase() === btnText);

      // 2) if not found, try data-target attribute on button (e.g., data-target="resume")
      if (!targetPage && this.dataset && this.dataset.target) {
        const targetName = this.dataset.target.trim().toLowerCase();
        console.log('Trying data-target:', targetName);
        targetPage = Array.from(pages).find(p => (p.dataset.page || '').toLowerCase() === targetName);
      }

      // 3) fallback: attempt to match by index (if counts are equal)
      if (!targetPage && pages[idx]) {
        console.log('Falling back to index match for index', idx);
        targetPage = pages[idx];
      }

      console.log('Resolved target page:', targetPage ? targetPage.dataset.page : null);
      if (targetPage) {
        activate(linkEl, targetPage);
      }
    });
  });

  // Expose direct Resume activation and hash-based navigation fallback
  const resumeBtn = Array.from(navigationLinks).find(l => (l.textContent||'').toLowerCase().includes('resume'));
  const resumePage = Array.from(pages).find(p => (p.dataset.page||'').toLowerCase() === 'resume');
  console.log('resumeBtn found:', !!resumeBtn, 'resumePage found:', !!resumePage);

  // If URL has a hash at load, try activating that page
  const activateFromHash = () => {
    const hash = (location.hash || '').replace('#','').toLowerCase();
    if (!hash) return;
    const pageEl = Array.from(pages).find(p => (p.dataset.page||'').toLowerCase() === hash);
  const linkEl = Array.from(navigationLinks).find(l => ((l.textContent||'').trim().toLowerCase() === hash) || (l.dataset && (l.dataset.target||'').toLowerCase() === hash));
    console.log('activateFromHash:', hash, 'pageEl:', !!pageEl, 'linkEl:', !!linkEl);
    if (pageEl) activate(linkEl || null, pageEl);
  };

  // initial hash activation
  activateFromHash();

  // listen for future hash changes
  window.addEventListener('hashchange', activateFromHash);
});