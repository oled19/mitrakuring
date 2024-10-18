// Toggle class active untuk (hamburger) menu
const navbarNav = document.querySelector(".navbar-nav");

// ketika (hamburger) menu di klik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

//klik (Hamburger) di luar cybar sidebar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Toggle class active untuk (search form)
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Klik di (luar elemen)
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});

// (Modal Box)
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalPrice = document.querySelector("#modal-price");
const modalOriginalPrice = document.querySelector("#modal-original-price");
const modalWhatsappLink = document.querySelector("#modal-whatsapp-link");

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();
    itemDetailModal.style.display = "flex";

    const productCard = btn.closest(".product-card");

    // Ambil data dari atribut data-
    const productTitle = productCard.getAttribute("data-title");
    const productDescription = productCard.getAttribute("data-description");
    const productImageSrc = productCard.querySelector("img").src;

    // Ambil harga dari elemen .product-price
    const productPriceElement = productCard.querySelector(".product-price");
    const productPriceText = productPriceElement.textContent.trim().split(" ");
    const productPrice = productPriceText[0]; // Harga Normal
    const productOriginalPrice = productPriceText[1] ? productPriceText[1] : ""; // Harga Diskon

    // Update modal content
    modalTitle.textContent = productTitle;
    modalDescription.textContent = productDescription;
    modalImage.src = productImageSrc;
    modalPrice.textContent = productPrice;
    modalOriginalPrice.textContent = productOriginalPrice;

    // Buat URL WhatsApp dinamis
    const whatsappLink = `https://wa.me/628128452491?text=${encodeURIComponent(
      `Saya tertarik dengan produk ${productTitle} dengan harga ${productPrice}${
        productOriginalPrice ? ` ${productOriginalPrice}` : ""
      }`
    )}`;
    modalWhatsappLink.href = whatsappLink;
  };
});

// (Modal Box) klik tombol close modal
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

// (Modal Box) klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};

// Fungsi buat (searching di dalam Detail Produk) nya
document.addEventListener("DOMContentLoaded", () => {
  // (Scroll Up) Button Functionality
  const scrollUpButton = document.getElementById("scroll-up");

  // Show button when (scrolling) down 100px
  window.onscroll = function () {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      scrollUpButton.style.display = "block";
    } else {
      scrollUpButton.style.display = "none";
    }
  };

  // (Scroll) to top when the button is clicked
  scrollUpButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const searchBox = document.getElementById("search-box");

  searchBox.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const products = document.querySelectorAll(".product-card");

    products.forEach((product) => {
      const title = product.getAttribute("data-title").toLowerCase();
      if (title.includes(query)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
});

// (Link Whatsapp) Ambil semua elemen dengan kelas 'product-card'
// (Link Whatsapp) Loop melalui setiap elemen
const productCards = document.querySelectorAll(".product-card");

productCards.forEach((productCard) => {
  // (Link Whatsapp) Ambil data dari elemen
  const productName = productCard.getAttribute("data-title");
  const productPriceElement = productCard.querySelector(".product-price");
  const productPrice = productPriceElement.firstChild.textContent.trim();
  const productOriginalPrice = productPriceElement.querySelector("span")
    ? productPriceElement.querySelector("span").textContent.trim()
    : "";

  // (Link Whatsapp) Bangun URL dinamis
  const whatsappLink = `https://wa.me/628128452491?text=Nama%20Produk:%20${encodeURIComponent(
    productName
  )}%0AHarga:%20${encodeURIComponent(
    productPrice
  )}%0AAsli:%20${encodeURIComponent(
    productOriginalPrice
  )}%0Ahttps://example.com`;

  // (Link Whatsapp) Tambahkan URL ke elemen link di modal
  productCard.querySelector(".shopping-cart-link[data-type='whatsapp']").href =
    whatsappLink;

  // (Link YouTube) Tangani link YouTube terpisah jika diperlukan
  const youtubeLinks = document.querySelectorAll(
    ".shopping-cart-link[data-type='youtube']"
  );

  youtubeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      window.open(link.href, "_blank");
      e.preventDefault();
    });
  });
});
