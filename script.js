document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide icons
    // Assuming lucide is available globally or imported elsewhere. If not, you'll need to import it.
    // For example: import * as lucide from 'lucide';
    // Or, if using a CDN:  The lucide object should be available globally.
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    } else {
      console.warn("Lucide icons not initialized.  Ensure Lucide is properly included.")
    }
  
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
    const mobileMenu = document.getElementById("mobile-menu")
    const menuIcon = document.querySelector(".menu-icon")
    const closeIcon = document.querySelector(".close-icon")
  
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
      menuIcon.classList.toggle("hidden")
      closeIcon.classList.toggle("hidden")
    })
  
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden")
        menuIcon.classList.remove("hidden")
        closeIcon.classList.add("hidden")
      })
    })
  
    // Theme toggle functionality
    const themeToggle = document.getElementById("theme-toggle")
    const mobileThemeToggle = document.getElementById("mobile-theme-toggle")
    const darkIcons = document.querySelectorAll(".dark-icon")
    const lightIcons = document.querySelectorAll(".light-icon")
    const html = document.documentElement
  
    function toggleTheme() {
      if (html.classList.contains("dark")) {
        html.classList.remove("dark")
        darkIcons.forEach((icon) => icon.classList.add("hidden"))
        lightIcons.forEach((icon) => icon.classList.remove("hidden"))
        localStorage.setItem("theme", "light")
      } else {
        html.classList.add("dark")
        darkIcons.forEach((icon) => icon.classList.remove("hidden"))
        lightIcons.forEach((icon) => icon.classList.add("hidden"))
        localStorage.setItem("theme", "dark")
      }
    }
  
    themeToggle.addEventListener("click", toggleTheme)
    mobileThemeToggle.addEventListener("click", toggleTheme)
  
    // Check for saved theme preference or use default dark theme
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
      html.classList.remove("dark")
      darkIcons.forEach((icon) => icon.classList.add("hidden"))
      lightIcons.forEach((icon) => icon.classList.remove("hidden"))
    } else {
      darkIcons.forEach((icon) => icon.classList.remove("hidden"))
      lightIcons.forEach((icon) => icon.classList.add("hidden"))
    }
  
    // Animate elements when they come into view
    function animateOnScroll() {
      const animatedElements = document.querySelectorAll(".animate-item, .animate-fade-in, .animate-fade-in-scale")
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1"
              entry.target.style.transform = entry.target.classList.contains("animate-fade-in-scale")
                ? "scale(1)"
                : "translateY(0)"
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: "-100px" },
      )
  
      animatedElements.forEach((el) => {
        observer.observe(el)
      })
    }
  
    // Animate skill bars
    function animateSkillBars() {
      const skillBars = document.querySelectorAll(".skill-progress")
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const level = entry.target.getAttribute("data-level")
              entry.target.style.width = `${level}%`
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 },
      )
  
      skillBars.forEach((bar) => {
        observer.observe(bar)
      })
    }
  
    // Contact form submission
    const contactForm = document.getElementById("contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form data
        const formData = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          subject: document.getElementById("subject").value,
          message: document.getElementById("message").value,
        }
  
        // Log form data (in a real application, you would send this to a server)
        console.log("Form submitted:", formData)
  
        // Show success message
        alert("Thank you for your message! I'll get back to you soon.")
  
        // Reset form
        contactForm.reset()
      })
    }
  
    // Initialize animations
    animateOnScroll()
    animateSkillBars()
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for header
            behavior: "smooth",
          })
        }
      })
    })
  })
  
  
  
  
