// script.js
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons safely
  function initLucideIcons() {
    if (typeof lucide !== "undefined") {
      try {
        lucide.createIcons();
      } catch (e) {
        console.warn("Lucide failed to initialize icons:", e);
      }
    }
  }

  // Draw immediately and again on full window completion
  initLucideIcons();
  window.addEventListener("load", initLucideIcons);

  // 2. IntersectionObserver for Scroll-Reveal animations (mimicking motion library)
  const scrollElements = document.querySelectorAll(".scroll-reveal");
  
  if (scrollElements.length > 0) {
    if (typeof IntersectionObserver !== "undefined") {
      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            // Opt-in once revealed
            scrollObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      });

      scrollElements.forEach(el => scrollObserver.observe(el));
    } else {
      // Fallback: Reveal immediately if IntersectionObserver is not supported
      scrollElements.forEach(el => el.classList.add("revealed"));
    }

    // Safety timeout: If scroll elements are still not revealed after 800ms
    // (e.g. if constrained or stuck within iframe page-size bounds), reveal them anyway
    setTimeout(() => {
      scrollElements.forEach(el => {
        if (!el.classList.contains("revealed")) {
          el.classList.add("revealed");
        }
      });
    }, 800);
  }

  // 3. Navigation link active state highlight
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightNavigation() {
    let scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavigation);
  try {
    highlightNavigation(); // initial execution
  } catch (e) {
    console.warn("Navigation highlight issue on load:", e);
  }

  // 4. Project detail panel expanded state logic safely
  const projectCards = document.querySelectorAll(".project-card");
  
  projectCards.forEach((card, index) => {
    const toggleBtn = card.querySelector(".project-details-btn");
    const drawer = card.querySelector(".project-details-drawer");
    if (!toggleBtn || !drawer) return; // Safeguard if elements are missing
    
    const chevronIcon = toggleBtn.querySelector("[data-lucide]") || toggleBtn.querySelector(".lucide");
    
    toggleBtn.addEventListener("click", () => {
      const isExpanded = drawer.classList.contains("expanded");
      
      // Close other expanded drawers
      document.querySelectorAll(".project-details-drawer").forEach((otherDrawer, otherIndex) => {
        if (otherIndex !== index) {
          otherDrawer.classList.remove("expanded");
          const otherCard = otherDrawer.closest(".project-card");
          if (otherCard) {
            const otherBtn = otherCard.querySelector(".project-details-btn");
            if (otherBtn) {
              const btnSpan = otherBtn.querySelector("span");
              if (btnSpan) btnSpan.textContent = "Explore Project Details";
              const otherIcon = otherBtn.querySelector("[data-lucide]") || otherBtn.querySelector(".lucide");
              if (otherIcon) {
                otherIcon.setAttribute("data-lucide", "chevron-right");
              }
            }
          }
        }
      });

      // Toggle state
      if (isExpanded) {
        drawer.classList.remove("expanded");
        const btnSpan = toggleBtn.querySelector("span");
        if (btnSpan) btnSpan.textContent = "Explore Project Details";
        if (chevronIcon) {
          chevronIcon.setAttribute("data-lucide", "chevron-right");
        }
      } else {
        drawer.classList.add("expanded");
        const btnSpan = toggleBtn.querySelector("span");
        if (btnSpan) btnSpan.textContent = "Show Less";
        if (chevronIcon) {
          chevronIcon.setAttribute("data-lucide", "chevron-down");
        }
      }
      
      // Re-generate icons in button safely
      if (typeof lucide !== "undefined") {
        try {
          lucide.createIcons();
        } catch (e) {
          console.warn("Lucide failing on toggle:", e);
        }
      }
    });
  });

  // 5. Contact Form submission simulator
  const contactForm = document.getElementById("quick-contact-form");
  const formContainer = document.getElementById("contact-form-container");
  const successContainer = document.getElementById("contact-success-container");
  const errorContainer = document.getElementById("contact-error-container");
  const resetBtn = document.getElementById("contact-reset-btn");

  if (contactForm && formContainer && successContainer) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("form-name");
      const emailInput = document.getElementById("form-email");
      const messageInput = document.getElementById("form-message");
      const submitBtn = document.getElementById("form-submit-btn");

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      // Simple validations
      if (!name) {
        showError("Please enter your name.");
        return;
      }
      if (!email || !email.includes("@")) {
        showError("Please enter a valid email address.");
        return;
      }
      if (!message) {
        showError("Please write a message.");
        return;
      }

      // Hide active errors
      errorContainer.classList.add("hidden");
      errorContainer.textContent = "";

      // Disable inputs and entering sending state
      setInputStates(true);
      submitBtn.innerHTML = `
        <span class="sending-indicator">
          Sending message
          <span class="sending-dot"></span>
          <span class="sending-dot"></span>
          <span class="sending-dot"></span>
        </span>
      `;

      // Simulating network delay
      setTimeout(() => {
        // Shift views
        formContainer.classList.add("hidden");
        successContainer.classList.remove("hidden");
        
        // Clear inputs and reset state
        contactForm.reset();
        setInputStates(false);
        submitBtn.innerHTML = `
          Send Message
          <i data-lucide="send" class="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
        `;
        lucide.createIcons();
      }, 1500);

      function setInputStates(disabled) {
        nameInput.disabled = disabled;
        emailInput.disabled = disabled;
        messageInput.disabled = disabled;
        submitBtn.disabled = disabled;
      }

      function showError(msg) {
        errorContainer.textContent = msg;
        errorContainer.classList.remove("hidden");
        errorContainer.classList.add("animate-fade-in-up");
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        successContainer.classList.add("hidden");
        formContainer.classList.remove("hidden");
        // Redraw icons
        lucide.createIcons();
      });
    }
  }
});
