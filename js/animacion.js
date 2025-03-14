document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .zoom-in")
    .forEach((el) => {
      observer.observe(el);
    });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("active");
      burger.classList.toggle("active");
    });
  }

  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  window.addEventListener("load", function () {
    const loader = document.querySelector(".page-loader");
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }, 1000);
    }
  });
});
