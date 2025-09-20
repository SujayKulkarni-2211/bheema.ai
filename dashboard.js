document.addEventListener("DOMContentLoaded", () => {
  // Sample product data
  const sampleProducts = [
    {
      id: 1,
      name: "Organic Basmati Rice",
      image: "basmati-rice-package.png",
      ocrText: "Organic Basmati Rice, 1kg, Best Quality Rice",
      violations: ["Missing MRP", "Missing Manufacturer Details"],
      status: "non-compliant",
    },
    {
      id: 2,
      name: "Premium Tea Leaves",
      image: "elegant-tea-package.png",
      ocrText: "Premium Tea Leaves, Net Qty: 250g, MRP: ₹150, Mfg: ABC Tea Co.",
      violations: ["Missing Country of Origin"],
      status: "non-compliant",
    },
    {
      id: 3,
      name: "Whole Wheat Flour",
      image: "flour-package.png",
      ocrText:
        "Whole Wheat Flour, Net Qty: 5kg, MRP: ₹200, Made in India, Mfg: XYZ Mills, Consumer Care: 1800-xxx-xxxx",
      violations: [],
      status: "compliant",
    },
    {
      id: 4,
      name: "Coconut Oil",
      image: "coconut-oil-bottle.png",
      ocrText: "Pure Coconut Oil, 500ml, Cold Pressed",
      violations: ["Missing MRP", "Missing Net Quantity", "Missing Expiry Date"],
      status: "non-compliant",
    },
    {
      id: 5,
      name: "Honey",
      image: "golden-honey-jar.png",
      ocrText: "Pure Honey, 250g, MRP: ₹180, Mfg: Honey Farms Ltd, Made in India, Best Before: 12/2025",
      violations: ["Missing Consumer Care Details"],
      status: "non-compliant",
    },
  ]

  const liveActivities = [
    { message: "Autonomous agent scanned 47 products in last minute", type: "agent", timestamp: new Date() },
    {
      message: "Detected MRP violation in Organic Rice product",
      type: "agent",
      timestamp: new Date(Date.now() - 30000),
    },
    {
      message: "Inspector confirmed violation in Premium Tea",
      type: "inspector",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      message: "Agent processed batch of 156 e-commerce listings",
      type: "agent",
      timestamp: new Date(Date.now() - 90000),
    },
    {
      message: "Compliance score improved to 94.7% after corrections",
      type: "agent",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      message: "Inspector validated 12 compliance reports",
      type: "inspector",
      timestamp: new Date(Date.now() - 150000),
    },
    {
      message: "Agent detected missing country of origin in 8 products",
      type: "agent",
      timestamp: new Date(Date.now() - 180000),
    },
    {
      message: "Automated legal notice sent to 3 non-compliant sellers",
      type: "agent",
      timestamp: new Date(Date.now() - 210000),
    },
  ]

  // Initialize dashboard
  initializeTabs()
  populateProductsTable()
  populateViolationsList()
  startLiveActivityLog()
  initializeEnhancedOCRModal()

  function initializeTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn")
    const tabContents = document.querySelectorAll(".tab-content")

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab")

        // Remove active class from all tabs and contents
        tabBtns.forEach((b) => b.classList.remove("active"))
        tabContents.forEach((c) => c.classList.remove("active"))

        // Add active class to clicked tab and corresponding content
        btn.classList.add("active")
        document.getElementById(targetTab).classList.add("active")
      })
    })
  }

  function populateProductsTable() {
    const tbody = document.getElementById("productsTableBody")
    if (!tbody) return

    tbody.innerHTML = sampleProducts
      .map(
        (product) => `
            <tr>
                <td><strong>${product.name}</strong></td>
                <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
                <td><div class="ocr-text">${product.ocrText}</div></td>
                <td class="violations">
                    ${product.violations.length > 0 ? product.violations.join(", ") : "None"}
                </td>
                <td class="status-${product.status}">
                    ${product.status === "compliant" ? '<i class="fas fa-check-circle"></i> Compliant' : '<i class="fas fa-times-circle"></i> Non-Compliant'}
                </td>
                <td>
                    <button class="btn btn-small btn-primary" onclick="viewDetails(${product.id})">View Details</button>
                </td>
            </tr>
        `,
      )
      .join("")
  }

  function populateViolationsList() {
    const violationsList = document.getElementById("violationsList")
    if (!violationsList) return

    const violations = []
    sampleProducts.forEach((product) => {
      product.violations.forEach((violation) => {
        violations.push({
          productName: product.name,
          violationType: violation,
          severity: getSeverity(violation),
          productId: product.id,
        })
      })
    })

    violationsList.innerHTML = violations
      .map(
        (violation) => `
            <div class="violation-card">
                <div class="violation-header">
                    <div>
                        <div class="violation-type">${violation.violationType}</div>
                        <div>Product: ${violation.productName}</div>
                    </div>
                    <span class="severity severity-${violation.severity.toLowerCase()}">${violation.severity}</span>
                </div>
                <div class="violation-actions">
                    <button class="btn btn-small btn-success" onclick="confirmViolation(${violation.productId}, '${violation.violationType}')">
                        Confirm Violation
                    </button>
                    <button class="btn btn-small btn-warning" onclick="markCorrect(${violation.productId}, '${violation.violationType}')">
                        Mark as Correct
                    </button>
                </div>
            </div>
        `,
      )
      .join("")

    // Add filter functionality
    const violationFilter = document.getElementById("violationFilter")
    if (violationFilter) {
      violationFilter.addEventListener("change", filterViolations)
    }
  }

  function startLiveActivityLog() {
    const liveLogElement = document.getElementById("liveActivityLog")
    if (!liveLogElement) return

    function updateLiveLog() {
      // Add new activity every 10-30 seconds
      const newActivities = [
        "Autonomous agent processed 23 new product listings",
        "Detected missing manufacturer details in 4 products",
        "Compliance validation completed for batch #" + Math.floor(Math.random() * 1000),
        "Agent flagged potential MRP violation in electronics category",
        "Automated quality check passed for 89 products",
        "Risk assessment completed for high-priority violations",
        "Agent updated compliance database with latest regulations",
        "Processed OCR text extraction for 156 product images",
      ]

      const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)]
      const newEntry = {
        message: randomActivity,
        type: "agent",
        timestamp: new Date(),
      }

      liveActivities.unshift(newEntry)

      // Keep only last 10 activities
      if (liveActivities.length > 10) {
        liveActivities.pop()
      }

      renderLiveActivityLog()
    }

    function renderLiveActivityLog() {
      liveLogElement.innerHTML = liveActivities
        .map(
          (entry) => `
          <div class="live-log-entry">
            <div class="log-content">
              <div class="log-message">${entry.message}</div>
              <div class="log-timestamp">${formatTimestamp(entry.timestamp)}</div>
            </div>
            <div class="log-type ${entry.type}">${entry.type === "agent" ? '<i class="fas fa-robot"></i> Agent' : '<i class="fas fa-user"></i> Inspector'}</div>
          </div>
        `,
        )
        .join("")
    }

    function formatTimestamp(date) {
      const now = new Date()
      const diff = Math.floor((now - date) / 1000)

      if (diff < 60) return `${diff}s ago`
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
      return date.toLocaleDateString()
    }

    // Initial render
    renderLiveActivityLog()

    // Update every 15 seconds
    setInterval(updateLiveLog, 15000)
  }

  function getSeverity(violation) {
    const highSeverity = ["Missing MRP", "Missing Net Quantity"]
    const mediumSeverity = ["Missing Manufacturer Details", "Missing Country of Origin"]

    if (highSeverity.includes(violation)) return "High"
    if (mediumSeverity.includes(violation)) return "Medium"
    return "Low"
  }

  function filterViolations() {
    const filter = document.getElementById("violationFilter").value
    const violationCards = document.querySelectorAll(".violation-card")

    violationCards.forEach((card) => {
      const violationType = card.querySelector(".violation-type").textContent
      const shouldShow =
        filter === "all" ||
        (filter === "missing-mrp" && violationType.includes("MRP")) ||
        (filter === "missing-quantity" && violationType.includes("Quantity")) ||
        (filter === "missing-manufacturer" && violationType.includes("Manufacturer")) ||
        (filter === "missing-origin" && violationType.includes("Origin"))

      card.style.display = shouldShow ? "block" : "none"
    })
  }

  function initializeEnhancedOCRModal() {
    const scanBtn = document.getElementById("scanNewProduct")
    const scannerSection = document.getElementById("aiScannerSection")
    const uploadArea = document.getElementById("uploadArea")
    const imageInput = document.getElementById("imageInput")
    const analyzeBtn = document.getElementById("analyzeCompliance")

    if (scanBtn) {
      scanBtn.addEventListener("click", () => {
        // Smooth scroll to scanner section
        scannerSection.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      })
    }

    if (uploadArea) {
      uploadArea.addEventListener("click", () => {
        imageInput.click()
      })

      uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault()
        uploadArea.style.borderColor = "var(--accent-blue)"
      })

      uploadArea.addEventListener("dragleave", () => {
        uploadArea.style.borderColor = "var(--cyber-blue)"
      })

      uploadArea.addEventListener("drop", (e) => {
        e.preventDefault()
        uploadArea.style.borderColor = "var(--cyber-blue)"
        const files = e.dataTransfer.files
        if (files.length > 0) {
          handleImageUpload({ target: { files } })
        }
      })
    }

    // Add event listener for new upload button
    const uploadBtn = document.querySelector(".btn-upload-primary")
    if (uploadBtn) {
      uploadBtn.addEventListener("click", () => {
        imageInput.click()
      })
    }

    if (imageInput) {
      imageInput.addEventListener("change", handleImageUpload)
    }

    if (analyzeBtn) {
      analyzeBtn.addEventListener("click", analyzeCompliance)
    }
  }

  function handleImageUpload(event) {
    const file = event.target.files[0]
    if (!file) return

    const progressDiv = document.getElementById("ocrProgress")
    const resultDiv = document.getElementById("ocrResult")
    const steps = document.querySelectorAll(".step")

    progressDiv.style.display = "block"
    resultDiv.style.display = "none"

    // Animate progress steps
    let currentStep = 0
    const stepInterval = setInterval(() => {
      if (currentStep < steps.length) {
        steps[currentStep].classList.add("active")
        currentStep++
      } else {
        clearInterval(stepInterval)
      }
    }, 750)

    // Simulate OCR processing
    setTimeout(() => {
      const mockOCRText = generateMockOCRText()
      document.getElementById("extractedText").value = mockOCRText

      progressDiv.style.display = "none"
      resultDiv.style.display = "block"

      // Reset steps
      steps.forEach((step) => step.classList.remove("active"))
    }, 3000)
  }

  function generateMockOCRText() {
    const mockTexts = [
      "Premium Quality Rice\n1kg Net Weight\nMRP: ₹120\nMfg: ABC Foods Ltd\nMade in India\nConsumer Care: 1800-123-4567",
      "Organic Tea Leaves\n250g\nBest Before: 12/2025\nConsumer Care: 1800-123-4567\nMfg: Tea Gardens Ltd",
      "Pure Honey\n500ml\nMRP: ₹200\nMfg Date: 01/2024\nXYZ Honey Farms\nMade in India",
      "Whole Wheat Flour\n5kg Net Qty\nMRP: ₹180\nMade in India\nConsumer Care: support@flour.com\nMfg: Flour Mills Ltd",
    ]

    return mockTexts[Math.floor(Math.random() * mockTexts.length)]
  }

  function analyzeCompliance() {
    const extractedText = document.getElementById("extractedText").value
    const violations = checkCompliance(extractedText)

    showNotification(
      `Autonomous agent analysis complete! Found ${violations.length} violations.`,
      violations.length === 0 ? "success" : "warning",
    )

    // Add to products table (simulation)
    const newProduct = {
      id: sampleProducts.length + 1,
      name: "Scanned Product",
      image: "/scanned-product.jpg",
      ocrText: extractedText,
      violations: violations,
      status: violations.length === 0 ? "compliant" : "non-compliant",
    }

    sampleProducts.push(newProduct)
    populateProductsTable()
    populateViolationsList()

    // Add to live activity log
    liveActivities.unshift({
      message: `New product scanned: ${violations.length} violations detected`,
      type: "agent",
      timestamp: new Date(),
    })

    // Scroll back to top of scanner section
    document.getElementById("aiScannerSection").scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    resetOCRModal()
  }

  function checkCompliance(text) {
    const violations = []
    const lowerText = text.toLowerCase()

    if (!lowerText.includes("mrp") && !lowerText.includes("₹")) {
      violations.push("Missing MRP")
    }

    if (!lowerText.includes("net") && !lowerText.includes("qty") && !lowerText.includes("weight")) {
      violations.push("Missing Net Quantity")
    }

    if (!lowerText.includes("mfg") && !lowerText.includes("manufacturer")) {
      violations.push("Missing Manufacturer Details")
    }

    if (!lowerText.includes("india") && !lowerText.includes("made in")) {
      violations.push("Missing Country of Origin")
    }

    if (!lowerText.includes("consumer care") && !lowerText.includes("1800") && !lowerText.includes("@")) {
      violations.push("Missing Consumer Care Details")
    }

    return violations
  }

  function resetOCRModal() {
    document.getElementById("imageInput").value = ""
    document.getElementById("ocrProgress").style.display = "none"
    document.getElementById("ocrResult").style.display = "none"
    document.getElementById("extractedText").value = ""

    // Reset progress steps
    const steps = document.querySelectorAll(".step")
    steps.forEach((step) => step.classList.remove("active"))
  }

  // Global functions for button clicks
  window.viewDetails = (productId) => {
    const product = sampleProducts.find((p) => p.id === productId)
    if (product) {
      alert(
        `Product Details:\n\nName: ${product.name}\nViolations: ${product.violations.join(", ") || "None"}\nStatus: ${product.status}`,
      )
    }
  }

  window.confirmViolation = (productId, violationType) => {
    showNotification(`Violation "${violationType}" confirmed for product ID ${productId}`, "success")

    // Add to live activity log
    liveActivities.unshift({
      message: `Inspector confirmed violation: ${violationType}`,
      type: "inspector",
      timestamp: new Date(),
    })
  }

  window.markCorrect = (productId, violationType) => {
    showNotification(`Violation "${violationType}" marked as correct for product ID ${productId}`, "success")

    // Add to live activity log
    liveActivities.unshift({
      message: `Inspector corrected false positive: ${violationType}`,
      type: "inspector",
      timestamp: new Date(),
    })
  }
})

// Utility function for notifications
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === "success" ? "#00ff88" : type === "error" ? "#ff4444" : type === "warning" ? "#ff8800" : "#0066ff"};
        color: ${type === "warning" ? "#333" : "white"};
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
        font-family: "JetBrains Mono", monospace;
        font-weight: 600;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 4000)
}
