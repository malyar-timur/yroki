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
  
  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  
  if (counterTotal) counterTotal.textContent = totalSlides;

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

  updateSlides();
});
