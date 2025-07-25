// DOM Elements
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")
const loginBtn = document.getElementById("login-btn")
const signupBtn = document.getElementById("signup-btn")

// Enhanced navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu toggle with animation
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
  document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "auto"
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.style.overflow = "auto"
  })
})

// Enhanced search functionality
searchBtn.addEventListener("click", (e) => {
  e.preventDefault()
  const query = searchInput.value.trim()
  if (query) {
    showSearchResults(query)
  } else {
    showEmptySearchAlert()
  }
})

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault()
    searchBtn.click()
  }
})

// Popular search tags functionality
document.querySelectorAll(".search-tag").forEach((tag) => {
  tag.addEventListener("click", () => {
    const tagText = tag.textContent
    searchInput.value = tagText
    showSearchResults(tagText)
  })
})

// Enhanced search results with better UI
function showSearchResults(query) {
  const modal = document.createElement("div")
  modal.className = "search-modal"
  modal.innerHTML = `
    <div class="search-modal-content">
      <div class="search-modal-header">
        <div class="search-header-content">
          <h3>Search Results for "${query}"</h3>
          <p>Found 12 services matching your search</p>
        </div>
        <button class="close-modal">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="search-modal-body">
        <div class="search-filters">
          <button class="filter-btn active">All</button>
          <button class="filter-btn">Home Services</button>
          <button class="filter-btn">Repairs</button>
          <button class="filter-btn">Beauty</button>
        </div>
        <div class="search-results">
          ${generateSearchResults(query)}
        </div>
      </div>
    </div>
  `

  addSearchModalStyles()
  document.body.appendChild(modal)
  document.body.style.overflow = "hidden"

  // Close modal functionality
  const closeModal = modal.querySelector(".close-modal")
  closeModal.addEventListener("click", closeSearchModal)

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeSearchModal()
    }
  })

  // Add click handlers to search results
  modal.querySelectorAll(".search-result").forEach((result) => {
    result.addEventListener("click", () => {
      const serviceName = result.querySelector("h4").textContent
      closeSearchModal()
      showBookingModal(serviceName)
    })
  })

  // Filter functionality
  modal.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      // Here you would filter the results based on the selected category
    })
  })

  function closeSearchModal() {
    document.body.removeChild(modal)
    document.body.style.overflow = "auto"
  }
}

function generateSearchResults(query) {
  const services = [
    {
      icon: "fas fa-broom",
      name: "Premium Home Cleaning",
      description: "Deep cleaning with eco-friendly products",
      price: "$35",
      rating: "4.9",
      reviews: "2.1k",
      badge: "Premium",
      image: "https://media.gettyimages.com/id/1372306674/photo/man-cleaning-the-terrace-tiles-of-the-apartment.jpg?s=612x612&w=0&k=20&c=2XvsouVZfMi1KcZn42ZzWp-KLPrxmyBx7Xp7wx-CHHg="
    },
    {
      icon: "fas fa-snowflake",
      name: "AC Repair & Service",
      description: "Expert AC installation and maintenance",
      price: "$45",
      rating: "4.8",
      reviews: "1.8k",
      badge: "Popular",
      image: "https://media.gettyimages.com/id/1308375294/photo/technician-repairing-air-conditioner.jpg?s=612x612&w=0&k=20&c=BZIkJ9qarD6s94uWQauL4q88Ft65kp7xENsUBMrIfjU=",
    },
    {
      icon: "fas fa-wrench",
      name: "Emergency Plumbing",
      description: "24/7 plumbing services available",
      price: "$40",
      rating: "4.7",
      reviews: "1.5k",
      badge: "24/7",
      image: "https://media.gettyimages.com/id/529770683/photo/young-plumber-with-clip-board.jpg?s=612x612&w=0&k=20&c=fNBG0x-FJpR4vtu0_eWeEK2d8KZvKVmgawpO__L75m4=",
    },
    {
      icon: "fas fa-cut",
      name: "Beauty at Home",
      description: "Professional salon services at home",
      price: "$30",
      rating: "4.9",
      reviews: "3.2k",
      badge: "New",
      image: "https://media.gettyimages.com/id/1988542149/photo/happy-barber-man-and-hair-cut-with-scissors-in-home-hairdresser-and-grooming-for-beauty.jpg?s=612x612&w=0&k=20&c=Dz0Q3bW9ZAuXJIji27_2dEPlacajcLnYYhYkErLS34U=",
    },
  ]

  return services
    .map(
      (service) => `
    <div class="search-result">
      <div class="search-result-image">
        <img src="${service.image}" alt="${service.name}">
        <div class="search-result-badge ${service.badge.toLowerCase()}">${service.badge}</div>
      </div>
      <div class="search-result-content">
        <div class="search-result-header">
          <h4>${service.name}</h4>
          <div class="search-result-rating">
            <i class="fas fa-star"></i>
            <span>${service.rating} (${service.reviews})</span>
          </div>
        </div>
        <p>${service.description}</p>
        <div class="search-result-footer">
          <span class="search-result-price">Starting at <strong>${service.price}</strong></span>
          <button class="search-result-btn">Book Now</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("")
}

function addSearchModalStyles() {
  if (document.getElementById("search-modal-styles")) return

  const style = document.createElement("style")
  style.id = "search-modal-styles"
  style.textContent = `
    .search-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
      animation: fadeIn 0.3s ease;
      backdrop-filter: blur(5px);
    }
    
    .search-modal-content {
      background: white;
      border-radius: 20px;
      max-width: 800px;
      width: 95%;
      max-height: 90vh;
      overflow: hidden;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    }
    
    .search-modal-header {
      padding: 30px;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background: linear-gradient(135deg, #f8fafc, #e2e8f0);
    }
    
    .search-header-content h3 {
      margin: 0 0 5px 0;
      color: #1e293b;
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .search-header-content p {
      margin: 0;
      color: #64748b;
      font-size: 14px;
    }
    
    .close-modal {
      background: none;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #64748b;
      transition: all 0.3s ease;
    }
    
    .close-modal:hover {
      background: #f1f5f9;
      color: #1e293b;
    }
    
    .search-modal-body {
      padding: 30px;
      max-height: 60vh;
      overflow-y: auto;
    }
    
    .search-filters {
      display: flex;
      gap: 12px;
      margin-bottom: 25px;
      flex-wrap: wrap;
    }
    
    .filter-btn {
      padding: 8px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 25px;
      background: white;
      color: #64748b;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .filter-btn.active,
    .filter-btn:hover {
      border-color: #2563eb;
      background: #2563eb;
      color: white;
    }
    
    .search-results {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .search-result {
      display: flex;
      gap: 20px;
      padding: 20px;
      border: 2px solid #f1f5f9;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .search-result:hover {
      border-color: #2563eb;
      background: #f8fafc;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .search-result-image {
      position: relative;
      flex-shrink: 0;
    }
    
    .search-result-image img {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      object-fit: cover;
    }
    
    .search-result-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      padding: 2px 6px;
      border-radius: 8px;
      font-size: 10px;
      font-weight: 600;
      color: white;
    }
    
    .search-result-badge.premium {
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
    }
    
    .search-result-badge.popular {
      background: linear-gradient(135deg, #ef4444, #f97316);
    }
    
    .search-result-badge.new {
      background: linear-gradient(135deg, #10b981, #059669);
    }
    
    .search-result-badge.24\/7 {
      background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    }
    
    .search-result-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .search-result-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }
    
    .search-result h4 {
      margin: 0;
      color: #1e293b;
      font-size: 1.1rem;
      font-weight: 600;
    }
    
    .search-result-rating {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      color: #64748b;
    }
    
    .search-result-rating i {
      color: #fbbf24;
    }
    
    .search-result p {
      margin: 0 0 15px 0;
      color: #64748b;
      font-size: 14px;
      line-height: 1.5;
    }
    
    .search-result-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }
    
    .search-result-price {
      color: #64748b;
      font-size: 14px;
    }
    
    .search-result-price strong {
      color: #2563eb;
      font-size: 16px;
      font-weight: 700;
    }
    
    .search-result-btn {
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .search-result-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }
    
    @media (max-width: 768px) {
      .search-modal-content {
        width: 95%;
        margin: 20px;
      }
      
      .search-result {
        flex-direction: column;
        text-align: center;
      }
      
      .search-result-header {
        flex-direction: column;
        gap: 8px;
      }
      
      .search-filters {
        justify-content: center;
      }
    }
  `

  document.head.appendChild(style)
}

function showEmptySearchAlert() {
  const toast = document.createElement("div")
  toast.className = "toast-notification"
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fas fa-search"></i>
      <span>Please enter a search term</span>
    </div>
  `

  const toastStyle = document.createElement("style")
  toastStyle.textContent = `
    .toast-notification {
      position: fixed;
      top: 100px;
      right: 20px;
      background: linear-gradient(135deg, #ef4444, #f97316);
      color: white;
      padding: 15px 20px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
      z-index: 3000;
      animation: slideInRight 0.3s ease;
    }
    
    .toast-content {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 500;
    }
    
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `

  document.head.appendChild(toastStyle)
  document.body.appendChild(toast)

  setTimeout(() => {
    toast.style.animation = "slideInRight 0.3s ease reverse"
    setTimeout(() => {
      document.body.removeChild(toast)
      document.head.removeChild(toastStyle)
    }, 300)
  }, 3000)
}

// Enhanced service card interactions
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", () => {
    const serviceName = card.querySelector("h3").textContent
    showBookingModal(serviceName)
  })
})

// Enhanced category card interactions
document.querySelectorAll(".category-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation()
    const categoryName = btn.closest(".category-card").querySelector("h3").textContent
    showCategoryModal(categoryName)
  })
})

// Enhanced booking modal
function showBookingModal(serviceName) {
  const modal = document.createElement("div")
  modal.className = "booking-modal"
  modal.innerHTML = `
    <div class="booking-modal-content">
      <div class="booking-modal-header">
        <div class="booking-header-content">
          <h3>Book ${serviceName}</h3>
          <p>Schedule your service with our verified professionals</p>
        </div>
        <button class="close-booking-modal">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="booking-modal-body">
        <div class="booking-steps">
          <div class="booking-step active">
            <div class="step-number">1</div>
            <span>Service Details</span>
          </div>
          <div class="booking-step">
            <div class="step-number">2</div>
            <span>Date & Time</span>
          </div>
          <div class="booking-step">
            <div class="step-number">3</div>
            <span>Contact Info</span>
          </div>
        </div>
        
        <form class="booking-form">
          <div class="form-section active" id="step-1">
            <h4>Service Details</h4>
            <div class="form-group">
              <label>Service Type</label>
              <select required>
                <option value="">Select service type</option>
                <option value="basic">Basic Service - $35</option>
                <option value="premium">Premium Service - $55</option>
                <option value="deluxe">Deluxe Service - $75</option>
              </select>
            </div>
            <div class="form-group">
              <label>Additional Requirements</label>
              <textarea placeholder="Any specific requirements or notes..."></textarea>
            </div>
            <button type="button" class="next-step-btn">Next Step</button>
          </div>
          
          <div class="form-section" id="step-2">
            <h4>Select Date & Time</h4>
            <div class="form-group">
              <label>Preferred Date</label>
              <input type="date" required>
            </div>
            <div class="form-group">
              <label>Preferred Time</label>
              <div class="time-slots">
                <button type="button" class="time-slot">9:00 AM</button>
                <button type="button" class="time-slot">11:00 AM</button>
                <button type="button" class="time-slot">2:00 PM</button>
                <button type="button" class="time-slot">4:00 PM</button>
                <button type="button" class="time-slot">6:00 PM</button>
              </div>
            </div>
            <div class="step-buttons">
              <button type="button" class="prev-step-btn">Previous</button>
              <button type="button" class="next-step-btn">Next Step</button>
            </div>
          </div>
          
          <div class="form-section" id="step-3">
            <h4>Contact Information</h4>
            <div class="form-row">
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" required>
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input type="tel" required>
              </div>
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" required>
            </div>
            <div class="form-group">
              <label>Service Address</label>
              <textarea placeholder="Enter your complete address..." required></textarea>
            </div>
            <div class="step-buttons">
              <button type="button" class="prev-step-btn">Previous</button>
              <button type="submit" class="book-service-btn">
                <i class="fas fa-calendar-check"></i>
                Book Service
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `

  addBookingModalStyles()
  document.body.appendChild(modal)
  document.body.style.overflow = "hidden"

  setupBookingModalEvents(modal)
}

function addBookingModalStyles() {
  if (document.getElementById("booking-modal-styles")) return

  const style = document.createElement("style")
  style.id = "booking-modal-styles"
  style.textContent = `
    .booking-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
      animation: fadeIn 0.3s ease;
      backdrop-filter: blur(5px);
    }
    
    .booking-modal-content {
      background: white;
      border-radius: 20px;
      max-width: 600px;
      width: 95%;
      max-height: 90vh;
      overflow: hidden;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    }
    
    .booking-modal-header {
      padding: 30px;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      color: white;
    }
    
    .booking-header-content h3 {
      margin: 0 0 5px 0;
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .booking-header-content p {
      margin: 0;
      opacity: 0.9;
      font-size: 14px;
    }
    
    .close-booking-modal {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
      transition: all 0.3s ease;
    }
    
    .close-booking-modal:hover {
      background: rgba(255, 255, 255, 0.3);
    }
    
    .booking-modal-body {
      padding: 30px;
      max-height: 60vh;
      overflow-y: auto;
    }
    
    .booking-steps {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      position: relative;
    }
    
    .booking-steps::before {
      content: '';
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      height: 2px;
      background: #e5e7eb;
      z-index: 1;
    }
    
    .booking-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      position: relative;
      z-index: 2;
    }
    
    .step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #e5e7eb;
      color: #64748b;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .booking-step.active .step-number {
      background: #2563eb;
      color: white;
    }
    
    .booking-step span {
      font-size: 12px;
      color: #64748b;
      font-weight: 500;
    }
    
    .booking-step.active span {
      color: #2563eb;
    }
    
    .form-section {
      display: none;
    }
    
    .form-section.active {
      display: block;
    }
    
    .form-section h4 {
      margin: 0 0 20px 0;
      color: #1e293b;
      font-size: 1.2rem;
      font-weight: 600;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #374151;
      font-weight: 500;
      font-size: 14px;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #2563eb;
    }
    
    .form-group textarea {
      resize: vertical;
      min-height: 80px;
    }
    
    .time-slots {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 10px;
    }
    
    .time-slot {
      padding: 10px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      background: white;
      color: #64748b;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .time-slot:hover,
    .time-slot.selected {
      border-color: #2563eb;
      background: #2563eb;
      color: white;
    }
    
    .step-buttons {
      display: flex;
      gap: 15px;
      margin-top: 30px;
    }
    
    .next-step-btn,
    .prev-step-btn,
    .book-service-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .next-step-btn,
    .book-service-btn {
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      color: white;
      flex: 1;
      justify-content: center;
    }
    
    .next-step-btn:hover,
    .book-service-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
    }
    
    .prev-step-btn {
      background: #f1f5f9;
      color: #64748b;
      border: 2px solid #e5e7eb;
    }
    
    .prev-step-btn:hover {
      background: #e2e8f0;
      color: #374151;
    }
    
    @media (max-width: 768px) {
      .booking-modal-content {
        width: 95%;
        margin: 20px;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .time-slots {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .step-buttons {
        flex-direction: column;
      }
    }
  `

  document.head.appendChild(style)
}

function setupBookingModalEvents(modal) {
  let currentStep = 1
  const totalSteps = 3

  // Close modal
  const closeBtn = modal.querySelector(".close-booking-modal")
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(modal)
    document.body.style.overflow = "auto"
  })

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal)
      document.body.style.overflow = "auto"
    }
  })

  // Time slot selection
  modal.querySelectorAll(".time-slot").forEach((slot) => {
    slot.addEventListener("click", () => {
      modal.querySelectorAll(".time-slot").forEach((s) => s.classList.remove("selected"))
      slot.classList.add("selected")
    })
  })

  // Step navigation
  function updateStep(step) {
    // Update step indicators
    modal.querySelectorAll(".booking-step").forEach((s, index) => {
      if (index < step) {
        s.classList.add("active")
      } else {
        s.classList.remove("active")
      }
    })

    // Update form sections
    modal.querySelectorAll(".form-section").forEach((section, index) => {
      if (index === step - 1) {
        section.classList.add("active")
      } else {
        section.classList.remove("active")
      }
    })
  }

  // Next step buttons
  modal.querySelectorAll(".next-step-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep < totalSteps) {
        currentStep++
        updateStep(currentStep)
      }
    })
  })

  // Previous step buttons
  modal.querySelectorAll(".prev-step-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 1) {
        currentStep--
        updateStep(currentStep)
      }
    })
  })

  // Form submission
  const form = modal.querySelector(".booking-form")
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    showBookingConfirmation()
    document.body.removeChild(modal)
    document.body.style.overflow = "auto"
  })
}

function showBookingConfirmation() {
  const confirmation = document.createElement("div")
  confirmation.className = "booking-confirmation"
  confirmation.innerHTML = `
    <div class="confirmation-content">
      <div class="confirmation-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3>Booking Confirmed!</h3>
      <p>Your service has been successfully booked. You'll receive a confirmation email shortly.</p>
      <div class="confirmation-details">
        <div class="detail-item">
          <i class="fas fa-calendar"></i>
          <span>Service Date: Tomorrow, 2:00 PM</span>
        </div>
        <div class="detail-item">
          <i class="fas fa-user"></i>
          <span>Professional: John Smith</span>
        </div>
        <div class="detail-item">
          <i class="fas fa-phone"></i>
          <span>Contact: +1 (555) 123-4567</span>
        </div>
      </div>
      <button class="confirmation-btn">Got it!</button>
    </div>
  `

  const confirmationStyle = document.createElement("style")
  confirmationStyle.textContent = `
    .booking-confirmation {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 3000;
      animation: fadeIn 0.3s ease;
      backdrop-filter: blur(5px);
    }
    
    .confirmation-content {
      background: white;
      border-radius: 20px;
      padding: 40px;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    }
    
    .confirmation-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #10b981, #059669);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      animation: scaleIn 0.5s ease 0.2s both;
    }
    
    .confirmation-icon i {
      font-size: 40px;
      color: white;
    }
    
    .confirmation-content h3 {
      margin: 0 0 15px 0;
      color: #1e293b;
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .confirmation-content p {
      margin: 0 0 25px 0;
      color: #64748b;
      line-height: 1.6;
    }
    
    .confirmation-details {
      background: #f8fafc;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 25px;
      text-align: left;
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      font-size: 14px;
      color: #374151;
    }
    
    .detail-item:last-child {
      margin-bottom: 0;
    }
    
    .detail-item i {
      color: #2563eb;
      width: 16px;
    }
    
    .confirmation-btn {
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .confirmation-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
    }
    
    @keyframes scaleIn {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
  `

  document.head.appendChild(confirmationStyle)
  document.body.appendChild(confirmation)

  const confirmBtn = confirmation.querySelector(".confirmation-btn")
  confirmBtn.addEventListener("click", () => {
    document.body.removeChild(confirmation)
    document.head.removeChild(confirmationStyle)
  })

  setTimeout(() => {
    if (document.body.contains(confirmation)) {
      document.body.removeChild(confirmation)
      document.head.removeChild(confirmationStyle)
    }
  }, 5000)
}

// Login/Signup enhanced modals
loginBtn.addEventListener("click", () => {
  showAuthModal("login")
})

signupBtn.addEventListener("click", () => {
  showAuthModal("signup")
})

function showAuthModal(type) {
  const modal = document.createElement("div");
  modal.className = "auth-modal";

  renderAuthContent(type);

  function renderAuthContent(currentType) {
    const isLogin = currentType === "login";
    const title = isLogin ? "Welcome Back" : "Join ServiceHub";
    const subtitle = isLogin ? "Sign in to your account" : "Create your account";
    const submitText = isLogin ? "Sign In" : "Create Account";
    const switchText = isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in";

    modal.innerHTML = `
      <div class="auth-modal-content">
        <div class="auth-modal-header">
          <div class="auth-header-content">
            <h3>${title}</h3>
            <p>${subtitle}</p>
          </div>
          <button class="close-auth-modal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="auth-modal-body">
          <form class="auth-form">
            ${!isLogin ? '<input type="text" placeholder="Full Name" required>' : ""}
            <input type="email" placeholder="Email Address" required>
            <input type="password" placeholder="Password" required>
            ${!isLogin ? '<input type="password" placeholder="Confirm Password" required>' : ""}
            ${!isLogin
              ? `
              <label class="checkbox-label">
                <input type="checkbox" required>
                <span class="checkmark"></span>
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
              `
              : ""
            }
            <button type="submit" class="auth-submit-btn">
              <i class="fas fa-${isLogin ? "sign-in-alt" : "user-plus"}"></i>
              ${submitText}
            </button>
          </form>
          <div class="auth-divider">
            <span>or continue with</span>
          </div>
          <div class="social-auth-buttons">
            <button class="social-auth-btn google">
              <i class="fab fa-google"></i>
              Google
            </button>
            <button class="social-auth-btn facebook">
              <i class="fab fa-facebook-f"></i>
              Facebook
            </button>
          </div>
          <div class="auth-switch-link" style="margin-top:24px">
            <a href="#" class="switch-auth-link">${switchText}</a>
          </div>
        </div>
      </div>
    `;
    addAuthModalStyles();
  }

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  // Close modal logic
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  modal.querySelector(".close-auth-modal").addEventListener("click", closeModal);

  // Switch between login/signup
  modal.querySelector(".switch-auth-link").addEventListener("click", function (e) {
    e.preventDefault();
    renderAuthContent(type === "login" ? "signup" : "login");
    attachHandlers(); // Re-attach handlers after re-render
  });

  function closeModal() {
    document.body.removeChild(modal);
    document.body.style.overflow = "auto";
  }

  function attachHandlers() {
    modal.querySelector(".close-auth-modal").addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
    modal.querySelector(".switch-auth-link").addEventListener("click", function (e) {
      e.preventDefault();
      renderAuthContent(type === "login" ? "signup" : "login");
      attachHandlers();
    });
    modal.querySelector(".auth-form").addEventListener("submit", function (e) {
      e.preventDefault();
      // Handle auth (login or signup) here
      closeModal();
    });
  }
  attachHandlers();

  // (Optional) Social auth button handlers
  // modal.querySelector(".social-auth-btn.google").addEventListener("click", ...);
  // modal.querySelector(".social-auth-btn.facebook").addEventListener("click", ...);

  function addAuthModalStyles() {
    if (document.getElementById("auth-modal-styles")) return;
    const style = document.createElement("style");
    style.id = "auth-modal-styles";
    style.textContent = `
      .auth-modal {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center;
        z-index: 2000;
      }
      .auth-modal-content {
        background: #fff; border-radius: 16px; width: 95%; max-width: 400px; overflow: hidden;
        box-shadow: 0 16px 48px rgba(0,0,0,0.18);
        animation: fadeIn 0.3s ease;
      }
      .auth-modal-header {
        display: flex; justify-content: space-between; align-items: center;
        padding: 24px 24px 0 24px;
      }
      .auth-header-content h3 {
        margin: 0 0 8px 0; font-size: 1.3rem; font-weight: 700;
      }
      .auth-header-content p {
        margin: 0; color: #64748b; font-size: 15px;
      }
      .close-auth-modal {
        background: none; border: none; color: #64748b;
        font-size: 1.3rem; cursor: pointer; border-radius: 50%; width: 36px; height: 36px;
        transition: background 0.2s;
      }
      .close-auth-modal:hover {
        background: #f1f5f9;
      }
      .auth-modal-body {
        padding: 24px;
      }
      .auth-form {
        display: flex; flex-direction: column; gap: 14px;
      }
      .auth-form input[type="text"], .auth-form input[type="email"], .auth-form input[type="password"] {
        width: 100%; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 15px;
      }
      .auth-form input:focus {
        outline: none; border-color: #2563eb;
      }
      .checkbox-label {
        font-size: 13px; color: #6b7280; display: flex; align-items: center; gap: 6px;
      }
      .checkbox-label .checkmark {
        display: inline-block; width: 16px; height: 16px; border: 2px solid #2563eb; border-radius: 4px;
        margin-right: 6px; vertical-align: middle;
      }
      .auth-submit-btn {
        background: linear-gradient(135deg, #2563eb, #3b82f6);
        color: #fff; border: none; border-radius: 8px; padding: 12px; font-size: 1.05rem;
        font-weight: 600; cursor: pointer; transition: box-shadow 0.2s;
        display: flex; align-items: center; gap: 8px; justify-content: center;
      }
      .auth-submit-btn:hover {
        box-shadow: 0 4px 16px #3b82f658;
      }
      .auth-divider {
        border-top: 1px solid #e5e7eb;
        text-align: center; margin: 18px 0 14px; position: relative;
      }
      .auth-divider span {
        display: inline-block; background: #fff; padding: 0 10px; position: relative; top: -12px; color: #888; font-size: 0.95em;
      }
      .social-auth-buttons {
        display: flex; gap: 12px; justify-content: center;
      }
      .social-auth-btn {
        border: 1px solid #e5e7eb; border-radius: 6px; background: #f9fafb;
        padding: 7px 18px; font-size: 0.97rem; color: #444; font-weight: 600;
        cursor: pointer; display: flex; align-items: center; gap: 7px;
        transition: background 0.15s, border-color 0.2s;
      }
      .social-auth-btn.google:hover {
        background: #f4f5f7; border-color: #e94335; color: #e94335;
      }
      .social-auth-btn.facebook:hover {
        background: #f4f5f7; border-color: #1877f2; color: #1877f2;
      }
      .auth-switch-link {
        text-align: center; margin-top: 10px;
      }
      .auth-switch-link a {
        color: #2563eb; cursor: pointer; text-decoration: none; font-size: 0.99em;
      }
      .auth-switch-link a:hover {
        text-decoration: underline;
      }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    `;
    document.head.appendChild(style);
  }
}
