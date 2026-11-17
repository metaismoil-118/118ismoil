
// ===================================
// APPLE WEBSITE - JAVASCRIPT
// ===================================

// MAHSULOTLAR
// Rasmlarni shu yerdagi URL orqali almashtirishingiz mumkin.

const products = [
  {
    name: "iPhone 17 Pro",
    category: "iphone",
    price: 1199,
    description: "Titanium. Powerful. Pro.",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=85"
  },
  {
    name: "iPhone 17",
    category: "iphone",
    price: 899,
    description: "Ajoyib dizayn va tezlik.",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=85"
  },
  {
    name: "MacBook Pro",
    category: "mac",
    price: 1999,
    description: "Professional kuch.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=85"
  },
  {
    name: "MacBook Air",
    category: "mac",
    price: 1099,
    description: "Yengillik va samaradorlik.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85"
  },
  {
    name: "iPad Pro",
    category: "ipad",
    price: 999,
    description: "Ijod uchun yangi daraja.",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=700&q=85"
  },
  {
    name: "iPad Air",
    category: "ipad",
    price: 699,
    description: "Kuchli va ixcham.",
    image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=700&q=85"
  },
  {
    name: "Apple Watch",
    category: "watch",
    price: 399,
    description: "Harakat va salomatlik.",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=700&q=85"
  },
  {
    name: "AirPods Pro",
    category: "audio",
    price: 249,
    description: "Yuqori sifatli ovoz.",
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&w=700&q=85"
  },
  {
    name: "AirPods Max",
    category: "audio",
    price: 549,
    description: "Premium audio tajribasi.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=85"
  }
];

// ELEMENTLAR
const productsGrid = document.getElementById("productsGrid");
const filters = document.querySelectorAll(".filter");
const toast = document.getElementById("toast");

// NARX FORMAT
function formatPrice(price) {
  return "$" + price.toLocaleString("en-US");
}

// MAHSULOTLARNI CHIQARISH
function renderProducts(category = "all") {
  productsGrid.innerHTML = "";

  const filtered = category === "all"
    ? products
    : products.filter(product => product.category === category);

  filtered.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.style.animationDelay = `${index * 0.08}s`;

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-price">${formatPrice(product.price)}</div>
      <button class="buy-btn">Sotib olish</button>
    `;

    card.querySelector(".buy-btn").addEventListener("click", () => {
      showToast(`${product.name} tanlandi! Bu demo do'kon.`);
    });

    productsGrid.appendChild(card);
  });
}

renderProducts();

// FILTER
filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    renderProducts(button.dataset.filter);
  });
});

// TOAST
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  menuBtn.innerHTML = navLinks.classList.contains("open")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// SEARCH
const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const closeSearch = document.getElementById("closeSearch");
const searchResults = document.getElementById("searchResults");

searchBtn.addEventListener("click", () => {
  searchBox.classList.toggle("active");

  if (searchBox.classList.contains("active")) {
    searchInput.focus();
  }
});

closeSearch.addEventListener("click", () => {
  searchBox.classList.remove("active");
});

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();

  searchResults.innerHTML = "";

  if (!value) return;

  const results = products.filter(product =>
    product.name.toLowerCase().includes(value) ||
    product.category.toLowerCase().includes(value)
  );

  if (results.length === 0) {
    searchResults.textContent = "Mahsulot topilmadi.";
    return;
  }

  results.forEach(product => {
    const link = document.createElement("a");
    link.href = "#store";
    link.textContent = `${product.name} — ${formatPrice(product.price)}`;

    link.addEventListener("click", () => {
      searchBox.classList.remove("active");
      renderProducts(product.category);
      filters.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === product.category);
      });
    });

    searchResults.appendChild(link);
  });
});

// LOGIN MODAL
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");

loginBtn.addEventListener("click", () => {
  loginModal.classList.add("active");
});

closeLogin.addEventListener("click", () => {
  loginModal.classList.remove("active");
});

loginModal.addEventListener("click", event => {
  if (event.target === loginModal) {
    loginModal.classList.remove("active");
  }
});

document.getElementById("loginForm").addEventListener("submit", event => {
  event.preventDefault();
  showToast("Demo: login tizimi hali serverga ulanmagan.");
  loginModal.classList.remove("active");
});

// NEWSLETTER
document.getElementById("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  showToast("Rahmat! Demo obunangiz qabul qilindi.");
  event.target.reset();
});

// SCROLL ANIMATION
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});

// ESCAPE KEY
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    searchBox.classList.remove("active");
    loginModal.classList.remove("active");
    navLinks.classList.remove("open");
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
});

console.log("Apple website successfully loaded!");
