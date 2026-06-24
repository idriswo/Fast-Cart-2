// Намоиши маҳсулот ва категорияҳо (намунавӣ — баъдтар аз API меояд)

const products = [
  { name: "iPhone 15 Pro", price: 12990, old: 14990, disc: "-13%", rating: 4.8, sold: 88, emoji: "📱" },
  { name: "MacBook Air M3", price: 18500, old: 21000, disc: "-12%", rating: 4.9, sold: 65, emoji: "💻" },
  { name: "AirPods Pro 2", price: 2490, old: 2990, disc: "-17%", rating: 4.7, sold: 145, emoji: "🎧" },
  { name: "PlayStation 5", price: 6990, old: 7990, disc: "-13%", rating: 5.0, sold: 99, emoji: "🎮" },
  { name: "Samsung S24 Ultra", price: 13990, old: 15990, disc: "-12%", rating: 4.6, sold: 73, emoji: "📱" },
  { name: "iPad Pro 11", price: 9990, old: 11500, disc: "-13%", rating: 4.8, sold: 54, emoji: "📲" },
  { name: "Sony WH-1000XM5", price: 3990, old: 4500, disc: "-11%", rating: 4.9, sold: 120, emoji: "🎧" },
  { name: "Apple Watch S9", price: 4290, old: 4990, disc: "-14%", rating: 4.7, sold: 81, emoji: "⌚" },
];

const categories = [
  { name: "Смартфон", emoji: "📱" },
  { name: "Компютер", emoji: "💻" },
  { name: "Аудио", emoji: "🎧" },
  { name: "Камера", emoji: "📷" },
  { name: "Гейминг", emoji: "🎮" },
  { name: "Смарт-соат", emoji: "⌚" },
];

const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));

document.getElementById("products").innerHTML = products.map(p => `
  <div class="card">
    <div class="thumb">
      <span class="disc">${p.disc}</span>
      <span class="fav">♡</span>
      ${p.emoji}
    </div>
    <h3>${p.name}</h3>
    <div class="price">${p.price.toLocaleString()} с. <s>${p.old.toLocaleString()} с.</s></div>
    <div class="stars">${stars(p.rating)} <span>(${p.sold})</span></div>
  </div>
`).join("");

document.getElementById("categories").innerHTML = categories.map(c => `
  <div class="cat-item">
    <div class="emoji">${c.emoji}</div>
    <span>${c.name}</span>
  </div>
`).join("");

// Корзинка — намунавӣ
let cartCount = 0;
document.querySelectorAll(".card .fav").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.target.textContent = e.target.textContent === "♡" ? "♥" : "♡";
  });
});
