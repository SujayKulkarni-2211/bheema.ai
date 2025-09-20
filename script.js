document.addEventListener("DOMContentLoaded", () => {
  // Only initialize loader on homepage
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  if (currentPage === "index.html" || currentPage === "") {
    initializeLoader()
  }

  // Handle mobile navigation toggle
  initializeMobileNav()

  // Handle login form submission
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Simulate login process
      setTimeout(() => {
        window.location.href = "dashboard.html"
      }, 500)
    })
  }

  // Handle navigation active states
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    }
  })
})

function initializeMobileNav() {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove("active")
        navMenu.classList.remove("active")
      }
    })
  }
}

function initializeLoader() {
  const loader = document.getElementById("loader")
  const loaderText = document.querySelector(".loader-subtext")

  if (!loader) return

  // Enhanced system initialization phases
  const initPhases = [
    "Initializing Bheema AI Agent...",
    "Loading Neural Networks...",
    "Connecting to Compliance Database...",
    "Calibrating OCR Engine...",
    "Establishing Secure Connection...",
    "Activating Autonomous Agent...",
    "System Ready!",
  ]

  let currentPhase = 0

  // Update loader text through phases
  const phaseInterval = setInterval(() => {
    if (currentPhase < initPhases.length - 1) {
      loaderText.textContent = initPhases[currentPhase]
      currentPhase++
    } else {
      clearInterval(phaseInterval)
      // Final phase before hiding
      loaderText.textContent = initPhases[currentPhase]
      setTimeout(() => {
        hideLoader()
      }, 1000)
    }
  }, 700)
}

function hideLoader() {
  const loader = document.getElementById("loader")
  if (loader) {
    loader.classList.add("hidden")
    // Remove from DOM after transition
    setTimeout(() => {
      loader.style.display = "none"
    }, 500)
  }
}

// Enhanced utility functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Enhanced styles with tech theme
  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === "success" ? "#00ff88" : type === "error" ? "#ff4444" : type === "warning" ? "#ff8800" : "#0066ff"};
        color: ${type === "warning" ? "#333" : "white"};
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 255, 255, 0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
        font-family: "JetBrains Mono", monospace;
        font-weight: 600;
        border: 2px solid rgba(0, 255, 255, 0.5);
        backdrop-filter: blur(10px);
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 4000)
}

// Add enhanced CSS animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .progress-bar {
        width: 100%;
        height: 8px;
        background: rgba(0, 102, 255, 0.2);
        border-radius: 4px;
        overflow: hidden;
        margin: 20px 0;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--primary-blue), var(--accent-blue));
        width: 0%;
        animation: progressFill 3s ease-in-out forwards;
    }
    
    @keyframes progressFill {
        0% { width: 0%; }
        25% { width: 25%; }
        50% { width: 50%; }
        75% { width: 75%; }
        100% { width: 100%; }
    }
`
document.head.appendChild(style)
