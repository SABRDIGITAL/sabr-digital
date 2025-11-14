document.addEventListener("DOMContentLoaded", () => {
  // Feather icons
  if (window.feather) feather.replace();

  // Year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Mobile menu toggle (reused on all pages)
  const mobileToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Modals
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove("hidden");
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("hidden");
  }

  const beforeAfterCard = document.getElementById("beforeAfterCard");
  if (beforeAfterCard) {
    beforeAfterCard.addEventListener("click", () => openModal("beforeAfterModal"));
  }

  const simpleProcessCard = document.getElementById("simpleProcessCard");
  if (simpleProcessCard) {
    simpleProcessCard.addEventListener("click", () => openModal("simpleProcessModal"));
  }

  document.querySelectorAll("[data-modal-close]").forEach((btn) => {
    const id = btn.getAttribute("data-modal-close");
    btn.addEventListener("click", () => closeModal(id));
  });

  // Close modal when clicking backdrop (outside)
  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        backdrop.classList.add("hidden");
      }
    });
  });

  // Scroll animations (IntersectionObserver fallback if no GSAP)
  const animatedEls = document.querySelectorAll("[data-animate]");
  if (animatedEls.length) {
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      animatedEls.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );
      });

      // Parallax for hero bg glow
      const parallax = document.querySelector(".parallax-bg");
      if (parallax) {
        gsap.to(parallax, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: parallax,
            start: "top top",
            scrub: true,
          },
        });
      }
    } else {
      // Fallback: IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      animatedEls.forEach((el) => observer.observe(el));
    }
  }
});
