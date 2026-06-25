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
- [x] **i18n (tj/ru/en)** — `i18next` + `react-i18next` + language-detector
      - LanguageSwitcher дар Header (desktop + мобилӣ), сабт дар localStorage
      - Ҳамаи саҳифаҳо/компонентҳо тарҷума шуданд (Header, Footer, Home, Catalog,
        Cart, Wishlist, CheckOut, Login, Register, ProductDetail, ProductCard,
        Hero, FlashSales, PromoBanner, NewArrival, About/Contact/Account/404)
      - Zod-и валидатсия бо `makeSchema(t)` сезабона шуд
- [x] **Dark / Light mode** — toggle (офтоб/моҳ) дар Header, сабт дар localStorage
      - Усул: баръакскунии палитраи `neutral`/`soft` дар `.dark` (CSS var-ҳои Tailwind v4)
      - Компонентҳои ҳамеша-торик (Footer/Hero/NewArrival) → `zinc` (аз баръакскунӣ эмин)
      - Скрипт дар `index.html` барои пешгирии FOUC
- [x] **Анимация баргардонида шуд ба AOS** (react-awesome-reveal хориҷ шуд)
      - Танҳо як услуби классикӣ: `fade-up`, once, ease-out-cubic; `Reveal` бо AOS
- [x] FlashSales: сарлавҳа ва countdown ҳамсатҳ (items-end)
- [x] Менюи категорияҳои Home: калонтар (19px) + hover + chevron

### Phase 6.5 — Саҳифаҳои Exclusive-style ✅
- [x] **Contact** (`pages/Contact.tsx`): ду корт — Call/Write To Us + формаи тамос (RHF+Zod)
- [x] **About** (`pages/About.tsx`): Қисса + расм, омори 4-корт, хизматрасониҳо
- [x] **Account/Profile** (`pages/Account.tsx`): менюи паҳлуӣ + формаи профил + тағйири парол
- [x] **Cart** (`pages/Cart.tsx`): ҷадвали Product/Price/Qty/Subtotal, степпер, купон, "Cart Total"
- [x] **CheckOut** (`pages/CheckOut.tsx`): Billing Details + хулоса + Bank/Cash радио + купон + Place Order
- [x] **UserMenu** (`components/UserMenu.tsx`): икони корбар → dropdown (Профил / Баромадан)
- Эзоҳ: Contact/About/Account аз `Simple.tsx` ба файлҳои алоҳида кӯчиданд (Simple = танҳо NotFound)

### Phase 7 — Деплой 🚧 (дар ҷараён)
- [x] `vercel.json` илова шуд — SPA rewrites (ҳамаи routeҳо → index.html), commit/push шуд
- [x] Vercel CLI насб шуд; корбар `vercel login` кард (GitHub: idriswo)
- [ ] **Деплой нотамом** — CLI дар ин муҳит интерактивӣ овезон мешавад (whoami/link/deploy
      ҳеҷ output намедиҳанд). Роҳи тавсияшаванда: **Vercel Dashboard import**.
- **Барои тамом кардан (қадами навбатӣ):**
  1. https://vercel.com/new → Import репозиторияи `idriswo/Fast-Cart-2`
  2. Framework: Vite (худкор), Build: `npm run build`, Output: `dist`
  3. Environment Variables гузоштан:
     - `VITE_BASE_URL` = `https://store-api.softclub.tj`
     - `VITE_IMAGE_URL` = `https://store-api.softclub.tj/images`
  4. Deploy → URL-ро санҷидан (саҳифаҳо, расмҳо, i18n, dark mode)
  - Алтернатива: дар терминали корбар `! vercel --prod` + `vercel env add ...`

---

## 📌 Ҳолати ҳозира
Сайти пурра бо дизайни **Exclusive/Ecommerce** дар ҳамаи саҳифаҳо: Home, Catalog,
ProductDetail, Cart, CheckOut, Contact, About, Account, Login, Register, Wishlist.
**i18n (tj/ru/en)** + **Dark/Light mode** + анимацияи классикии **AOS (fade-up)**.
UserMenu dropdown. Responsive. `container-x` = 1400px. Build тоза.

## 🎨 Дизайн/UX
- Расмҳои воқеии Unsplash дар Hero/PromoBanner/NewArrival/About
- `Reveal.tsx` акнун бо **AOS** (data-aos="fade-up", AOS.refresh барои контенти динамикӣ)
- Dark mode: `.dark` var-ҳои neutral/soft баръакс; white/black даст нахӯрда (матни сафеди тугмаҳо солим)
- i18n: react-i18next + LanguageSwitcher; ThemeToggle; UserMenu (ҳама дар Header)

## ➡️ Қадами навбатӣ
- **Phase 7 — деплойро тамом кардан:** Vercel Dashboard import (idriswo/Fast-Cart-2),
  env `VITE_BASE_URL` ва `VITE_IMAGE_URL` гузоштан, Deploy. (vercel.json тайёр)
- Ихтиёрӣ: stagger-и сабук барои кортҳои маҳсулот; bundle code-split (chunk > 500kB).
- Ихтиёрӣ: васл кардани API-и воқеии фармоиш (CheckOut ҳозир mock аст).

## 📝 Лог
- **2026-06-24:** Phase 1 + 2. Стек гузошта шуд, API-и softclub васл шуд, каталог/детал/корзинка/wishlist сохта шуд. Build тоза.
- **2026-06-24:** Анимация AOS → react-awesome-reveal (Reveal.tsx). Сипас **i18n (tj/ru/en)** пурра илова шуд: i18next + LanguageSwitcher, ҳамаи саҳифаҳо тарҷумашуда, Zod бо makeSchema(t). Build тоза.
- **2026-06-25:** **Dark/Light mode** (ThemeToggle, var-based). Анимация **баргардонида шуд ба AOS** (классикӣ fade-up). Саҳифаҳои нави Exclusive-style: **Contact, About, Account, Cart, CheckOut**. **UserMenu** dropdown. FlashSales ҳамсатҳ, менюи категорияҳои Home калонтар. Build тоза.
- **2026-06-25:** Тайёрии деплой — `vercel.json` (SPA rewrites) илова/push шуд, Vercel CLI насб, login (idriswo). Деплой тавассути CLI овезон шуд → бо Dashboard import тамом мешавад (env-ҳо дар PROGRESS).
- **2026-06-25:** ProductDetail: расми маҳсулот аз массиви `images` гирифта мешавад (`product.images?.[0]?.images ?? product.image`); типҳо ва `products.ts` мутобиқ шуданд. Build тоза.
  - ⚠️ **Кушоданашуда:** корбар гуфт «деплой кор намекунад» — аммо тафсилот (URL/хато) надод. Дар session-и оянда: URL ё хатои дақиқро пурсидан ва ислоҳ кардан.
