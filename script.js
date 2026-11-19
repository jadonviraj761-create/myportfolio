/* ========================================
   Portfolio JavaScript
   ======================================== */
(function () {
  "use strict";

  /* ---------- Elements ---------- */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinksContainer = document.getElementById("nav-links");
  const themeToggle = document.getElementById("theme-toggle");
  const contactForm = document.getElementById("contact-form");
  const toast = document.getElementById("toast");
  const yearEl = document.getElementById("year");

  /* ---------- Current year in footer ---------- */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Theme toggle ---------- */
  const THEME_KEY = "portfolio-theme";
  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    const icon = themeToggle.querySelector("i");
    if (icon) {
      icon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
    }
  };
  const initTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(saved || (prefersDark ? "dark" : "light"));
  };
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }
  initTheme();

  /* ---------- Navbar scroll effect ---------- */
  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = navLinksContainer.classList.toggle("open");
      const icon = mobileMenuBtn.querySelector("i");
      if (icon) {
        icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      }
    });
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinksContainer.classList.remove("open");
        const icon = mobileMenuBtn.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars";
      });
    });
  }
  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const highlightNav = () => {
    const scrollY = window.pageYOffset;
    let current = null;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 90;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", highlightNav, { passive: true });

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const scrollPadding = parseInt(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
        window.scrollTo({ top: target.offsetTop - scrollPadding, behavior: "smooth" });
      }
    });
  });

  /* ---------- Scroll reveal animation ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Skill bar animation ---------- */
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".skill-progress").forEach((bar) => {
            const width = bar.getAttribute("data-width");
            bar.style.setProperty("--w", width);
            bar.classList.add("animate");
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
  );
  document.querySelectorAll(".skills-grid").forEach((el) => skillObserver.observe(el));

  /* ---------- Contact form ---------- */
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = "Sending...";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        contactForm.reset();
        showToast("Message sent successfully!");
      }, 1400);
    });
  }

  const showToast = (message) => {
    if (!toast) return;
    const span = toast.querySelector("span");
    if (span) span.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3500);
  };

  /* ---------- Typing effect for hero tagline ---------- */
  const tagline = document.querySelector(".hero-tagline");
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = "";
    tagline.style.opacity = 1;
    let i = 0;
    const type = () => {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(type, 50);
      }
    };
    setTimeout(type, 600);
  }
})();