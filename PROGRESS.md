# FastCart — Прогресс лоиҳа

**Лоиҳа:** Marketplace барои хариду фуруши маҳсулоти техникӣ.
**Сана сар:** 2026-06-24

## 🧰 Стек
React 18 + TypeScript + Vite • TailwindCSS v4 • shadcn-style UI • Zustand (persist) •
axios (interceptors) • React Hook Form + Zod • lucide-react • react-router-dom v7

## 🔌 API (воқеӣ)
- Base: `https://store-api.softclub.tj`  (env: `VITE_BASE_URL`)
- Расмҳо: `https://store-api.softclub.tj/images/{file}` (env: `VITE_IMAGE_URL`)
- Swagger: https://store-api.softclub.tj/swagger/index.html
- Endpointҳои истифодашуда:
  - `GET /Category/get-categories`
  - `GET /Product/get-products` (ProductName, MinPrice, MaxPrice, BrandId, ColorId, CategoryId, SubcategoryId, PageNumber, PageSize)
  - `GET /Product/get-product-by-id?id=`
  - `POST /Account/login`, `POST /Account/register` (Phase 4)

---

## 🗺️ Фазаҳо

### Phase 1 — Setup ✅
- [x] Git, комадаҳо /stop /clear /start, PROGRESS.md
- [x] Скаффолди Vite + TS + Tailwind + shadcn + Zustand + axios + RHF

### Phase 2 — Каталог ✅
- [x] axios interceptors + env + типҳои API
- [x] Layout (Header бо search/cart/wishlist, Footer)
- [x] Саҳифаи Асосӣ (Home): hero, категорияҳо аз API, маҳсулоти беҳтарин, services
- [x] Саҳифаи Каталог: filter (категория/бренд/ранг/нарх), search, pagination
- [x] ProductCard (add to cart, wishlist toggle, discount badge)
- [x] Саҳифаи яккаи маҳсулот (ProductDetail) бо қ qty selector
- [x] Корзинка ва Wishlist (Zustand persist) — функсионалӣ
- [x] Build бе хато ✅

### Phase 3 — Checkout ✅
- [x] Саҳифаи checkout: форма бо RHF + Zod (ном, телефон, суроға, пардохт, эзоҳ)
- [x] Валидатсия + хулосаи фармоиш + экрани муваффақият
- [x] Тоза кардани корзинка пас аз фармоиш
- [ ] Васл ба API-и фармоиш (вақте endpoint бошад — Phase 4)

### Phase 4 — Авторизатсия ✅
- [x] Zustand auth store (jwt-decode: sid/name/email/role/exp)
- [x] Login (POST /Account/login → токен дар data.data) бо RHF+Zod
- [x] Register (POST /Account/register) бо RHF+Zod + дизайни FastCard (#DB4444)
- [x] axios interceptor: access token + refresh-token логика (401 → refresh → retry → logout)
  - Эзоҳ: API endpoint-и refresh надорад → ҳозир 401 logout мекунад. Сохтор тайёр.
- [x] react-hot-toast (паёмҳо)
- [x] Муҳофизат: бе login илова ба cart/wishlist ё checkout НАМЕШАВАД
  - useRequireAuth (амалҳо) + ProtectedRoute (маршрутҳои /cart /wishlist /checkout /account)
- [x] Header: намоиши корбар + тугмаи баромад; саҳифаи Профил
- [x] Бо API-и воқеӣ санҷида шуд: register+login+JWT кор мекунад ✅

### Phase 5 — Панели фурушанда ❌ (хориҷ карда шуд)
- Аввал сохта шуд, вале аз тарафи клиент **тоза карда шуд** (бо хоҳиши корбар).
- Сабаб: панели админӣ набояд дар client-side бошад. Файлҳои Seller/api нест шуданд.

### Phase 5.5 — Responsive + дизайни Ecommerce ✅
- [x] Намунаи дизайн: `C:\Users\USER\Desktop\Ecommerce (1)` (Exclusive template)
- [x] Header-и мобилӣ: hamburger + drawer (ҷустуҷӯ + меню), responsive
- [x] PromoBanner («Аз мусиқӣ лаззат баред» + countdown + сабз)
- [x] NewArrival (мозаикаи 4-катак)
- [x] Санҷида шуд: режими desktop (1280) ва мобилӣ (390) — ҳар ду аъло

### Phase 6 — Дизайн ва анимация ✅ (қисман)
- [x] AOS scroll animations (fade-up/right/left, zoom-in) — `aos`
- [x] Skeleton loaders (shimmer) дар Home ва Catalog
- [x] ProductCard айни FastCard: slide-up add-to-cart, тугмаҳои амудӣ (heart+eye),
      mix-blend image, hover scale, рейтинги ситора, hover-и сурх
- [x] Hero carousel-и худгардон (4 слайд, dot-ҳои сурх)
- [x] FlashSales: countdown timer + Swiper carousel (`swiper`)
- [x] Header: underline-и слайдшаванда, анимацияи икона (heart/cart)
- [x] SectionHead бо хатчаи сурх
- [ ] боқимонда: i18n (tj/ru/en), dark mode

### Phase 7 — Деплой

---

## 📌 Ҳолати ҳозира
Сайти пурра: каталог, авторизатсия, корзинка, checkout, дизайни Ecommerce/Exclusive,
responsive. Расмҳои воқеӣ (на эмодзӣ). Анимацияи ягонаи классикӣ бо
`react-awesome-reveal` (fade-up, бе AOS/motion). i18n (tj/ru/en) илова шуд.
`container-x` = 1400px. Хатчаи тахфиф хориҷ шуд. Build тоза.

## 🎨 Дизайн/UX
- Расмҳои воқеии Unsplash дар Hero/PromoBanner/NewArrival (бе эмодзӣ — Section 4.8 taste-skill)
- Reveal.tsx: Fade direction="up" triggerOnce, layout дар div-и дохилӣ (grid вайрон намешавад)
- i18n: react-i18next + LanguageSwitcher (tj/ru/en)

## ➡️ Қадами навбатӣ
- Phase 6 (боқимонда): dark mode.
- Phase 7: Деплой.

## 📝 Лог
- **2026-06-24:** Phase 1 + 2. Стек гузошта шуд, API-и softclub васл шуд, каталог/детал/корзинка/wishlist сохта шуд. Build тоза.
