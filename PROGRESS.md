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

### Phase 5 — Панели фурушанда (add-product и ғ.)
### Phase 6 — Сайқал: i18n (tj/ru/en), dark mode, skeleton loaders
### Phase 7 — Деплой

---

## 📌 Ҳолати ҳозира
Phase 4 тамом — авторизатсияи пурра бо JWT кор мекунад. Бе login сайт амалҳои харидро
намедиҳад. Build тоза. Dev: `npm run dev`.

## ➡️ Қадами навбатӣ
- Phase 5: Панели фурушанда (add/update/delete product, бо нақши Seller).
- Phase 6: i18n (tj/ru/en), dark mode, skeleton loaders.
- Push-и аввал ба GitHub (ҳангоми /stop).

## 📝 Лог
- **2026-06-24:** Phase 1 + 2. Стек гузошта шуд, API-и softclub васл шуд, каталог/детал/корзинка/wishlist сохта шуд. Build тоза.
