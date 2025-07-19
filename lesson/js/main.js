// ===== ОБЩИЕ ФУНКЦИИ =====
function initModal() {
  document.querySelectorAll("[data-bs-toggle='modal']").forEach((button) => {
    button.addEventListener("click", function() {
      const presentationId = this.dataset.presentation;
      const modalTitle = document.getElementById("modalTitle");
      const carouselInner = document.getElementById("carouselInner");
      carouselInner.innerHTML = "";

      if (presentationId === "my-favorite") {
        initCarousel(11, 'slides/my_favorite/s', 'My Favorite (2 класс)');
      } else if (presentationId === "team-games") {
        initCarousel(5, 'slides/team_games/b', 'Team Games (3 класс)');
      }
    });
  });
}

function initCarousel(slidesCount, pathPrefix, title) {
  const carouselInner = document.getElementById("carouselInner");
  document.getElementById("modalTitle").textContent = title;

  for (let i = 1; i <= slidesCount; i++) {
    const slideItem = document.createElement("div");
    slideItem.className = `carousel-item ${i === 1 ? "active" : ""}`;

    const slideCounter = document.createElement("div");
    slideCounter.className = "slide-counter";
    slideCounter.textContent = `${i} / ${slidesCount}`;

    const slideImg = document.createElement("img");
    slideImg.src = `${pathPrefix}${i}.jpg`;
    slideImg.className = "d-block w-100";
    slideImg.alt = `Слайд ${i}`;
    slideImg.style.maxHeight = "70vh";
    slideImg.style.objectFit = "contain";
    slideImg.style.margin = "0 auto";

    slideImg.onerror = function() {
      this.src = `https://via.placeholder.com/800x600?text=Slide+${i}`;
    };

    slideItem.appendChild(slideImg);
    slideItem.appendChild(slideCounter);
    carouselInner.appendChild(slideItem);
  }
}

function showPhoto(photoSrc) {
  document.getElementById("modalPhoto").src = photoSrc;
}

// ===== ФИЛЬТРЫ И ПОИСК =====
function initFilters() {
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", function() {
      document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.classList.remove("active", "btn-primary");
        btn.classList.add("btn-outline-secondary");
      });
      this.classList.remove("btn-outline-secondary");
      this.classList.add("active", "btn-primary");

      const grade = this.dataset.grade;
      document.querySelectorAll(".grade-section").forEach((section) => {
        section.style.display = 
          grade === "all" || section.dataset.grade === grade ? "block" : "none";
      });
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      const searchTerm = this.value.toLowerCase().trim();
      document.querySelectorAll(".presentation-card").forEach((card) => {
        const title = card.querySelector(".card-title").textContent.toLowerCase();
        const text = card.querySelector(".card-text").textContent.toLowerCase();
        card.closest(".col-md-6").style.display = 
          title.includes(searchTerm) || text.includes(searchTerm) ? "block" : "none";
      });
    });
  }
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener("DOMContentLoaded", function() {
  // Инициализация модальных окон
  if (document.getElementById("presentationModal") || document.getElementById("photoModal")) {
    initModal();
  }

  // Инициализация фильтров и поиска
  if (document.getElementById("presentationsContainer")) {
    initFilters();
    initSearch();
  }
});
document.addEventListener("DOMContentLoaded", function() {
  const careerBtn = document.getElementById("careerBtn");
  if (careerBtn) {
    careerBtn.addEventListener("click", function() {
      const careerText = document.getElementById("careerText");
      if (careerText) {
        careerText.style.display = careerText.style.display === "none" ? "block" : "none";
      }
    });
  }
});