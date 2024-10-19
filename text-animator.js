// TextAnimator v1.0
(function(window) {
  function TextAnimator() {
    function getRandomCharacter(characters) {
      return characters[Math.floor(Math.random() * characters.length)];
    }

    function generateRandomText(text, characters) {
      return text.split('').map(char => 
        char !== ' ' && char !== '.' ? getRandomCharacter(characters) : char
      ).join('');
    }

    function animateText(element) {
      const originalText = element.textContent;
      const speed = parseInt(element.dataset.animateSpeed) || 800;
      const color = element.dataset.animateColor;
      const characters = element.dataset.animateCharacters || 'abcdefghijklmnopqrstuvwxyz0123456789';
      
      let randomText = generateRandomText(originalText, characters);
      
      if (color) {
        element.style.color = color;
      }

      function animateCharacter(i) {
        setTimeout(() => {
          randomText = randomText.substring(0, i) + originalText[i] + randomText.substring(i + 1);
          element.textContent = randomText;
        }, Math.random() * speed);
      }

      for (let i = 0; i < originalText.length; i++) {
        animateCharacter(i);
      }
    }

    function init() {
      const elements = document.querySelectorAll('[data-animate-text]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateText(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      elements.forEach(element => observer.observe(element));
    }

    // Public method
    this.init = init;
  }

  // Make TextAnimator available globally
  window.TextAnimator = new TextAnimator();

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.TextAnimator.init);
  } else {
    window.TextAnimator.init();
  }
})(window);
