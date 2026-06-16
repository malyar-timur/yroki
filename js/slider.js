document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- SLIDER LOGIC ---
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressBar = document.getElementById('progress-bar');
  const counterCurrent = document.getElementById('counter-current');
  const counterTotal = document.getElementById('counter-total');
  
  const totalSlides = slides.length;
  
  if (counterTotal) counterTotal.textContent = totalSlides;

  // Read slide number from URL Hash on page load (e.g. #slide-3 -> index 2)
  function getSlideIndexFromHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const slideNum = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= totalSlides) {
        return slideNum - 1;
      }
    }
    return 0;
  }

  let currentSlideIndex = getSlideIndexFromHash();

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev-slide');
      if (index === currentSlideIndex) {
        slide.classList.add('active');
      } else if (index < currentSlideIndex) {
        slide.classList.add('prev-slide');
      }
    });

    // Update Buttons
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;

    // Update Progress Bar
    const progress = totalSlides > 1 ? (currentSlideIndex / (totalSlides - 1)) * 100 : 100;
    if (progressBar) progressBar.style.width = `${progress}%`;

    // Update Counter
    if (counterCurrent) counterCurrent.textContent = currentSlideIndex + 1;
    
    // Smoothly update URL hash without scrolling the window
    history.replaceState(null, null, '#slide-' + (currentSlideIndex + 1));

    // Refresh icons inside active slides
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateSlides();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
        updateSlides();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentSlideIndex > 0) {
      currentSlideIndex--;
      updateSlides();
    } else if (e.key === 'ArrowRight' && currentSlideIndex < totalSlides - 1) {
      currentSlideIndex++;
      updateSlides();
    }
  });

  // Listen to manual URL hash changes (e.g. clicking slide-linked buttons/menu links)
  window.addEventListener('hashchange', () => {
    const index = getSlideIndexFromHash();
    if (index !== currentSlideIndex) {
      currentSlideIndex = index;
      updateSlides();
    }
  });

  // Perform initial render
  updateSlides();

  // Remove the temporary anti-flicker style tag once DOM layout has initialized
  const flickerStyle = document.getElementById('hash-flicker-prevent');
  if (flickerStyle) {
    flickerStyle.remove();
  }
});
