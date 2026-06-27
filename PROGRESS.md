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

### Phase 7 — Деплой ✅ (зинда)
- [x] `vercel.json` (SPA rewrites) + Vercel CLI + login (idriswo)
- [x] **Деплой зинда:** https://fast-cart-2-8wg4.vercel.app (Dashboard import)
- [x] env-ҳо дуруст: `VITE_BASE_URL`, `VITE_IMAGE_URL` дар bundle ҳастанд (тасдиқ шуд)
- [x] Ташхис (2026-06-25): API ҷавоб медиҳад (200, products), CORS домени Vercel-ро
      иҷозат медиҳад (`Access-Control-Allow-Origin`) — деплой солим аст
- ⚠️ **Кушоданашуда:** корбар гуфт «modalka-ҳо bezeban (тарҷума намешаванд)» — вале
      ҳамаи toast/меню тавассути `t()`-анд ва hardcoded матн ёфт нашуд. Тафсилот/скриншот
      лозим: кадом модалка, кадом саҳифа.

### Phase 8 — API-и амиқтар + redesign-и саҳифаҳо ✅
- [x] **Catalog redesign:** breadcrumb, sort dropdown (Маъмул/нарх), sidebar-и
      пӯшидашаванда (Category/Brand/Color/Price range), «More Products» (load-more)
- [x] **Бренд/Ранг аз endpoint-ҳои алоҳида:** `getBrands()` (`/Brand/get-brands`),
      `getColors()` (`/Color/get-colors`) — рӯйхати пурраи устувор (на аз ҷавоби маҳсулот)
- [x] **Subcategory flyout (Home):** `get-categories` `subCategories`-ро дорад; hover →
      менюи subcategory дар рост; клик → `/catalog?subcategory=ID` → `SubcategoryId` филтр
- [x] **Profile ба API васл шуд:** `api/profile.ts` — `getUserProfile(id)`
      (`/UserProfile/get-user-profile-by-id`, id = JWT `sid`) + `updateUserProfile(FormData)`
      (`/UserProfile/update-user-profile`, multipart). Майдонҳо: Ном/Насаб/Email/Телефон/Dob/Аватар
      - ⚠️ API майдони `Image`-ро ҳатмӣ мехоҳад — дар сайти зинда (воридшуда) санҷидан лозим
- [x] **ProductDetail redesign (Exclusive):** галерея (thumbnail + расми калон), ситора+шарҳ+
      In Stock, нарх, ранг, андоза (XS–XL, визуалӣ), qty+Buy Now+wishlist, Free/Return Delivery,
      бахши «Маҳсулоти монанд» (аз ҳамон категория)
- [x] **Багфикс — расм дар ProductDetail:** `Product.images` аслан `string[]` аст (на объект);
      типҳо ва галерея ислоҳ шуданд. Тасдиқ: `/images/<file>` → HTTP 200
- [x] **Багфикс — Profile update 400:** API ҳамаи 6 майдонро ҳатмӣ мехоҳад
      (FirstName, LastName, Email, PhoneNumber, **Dob**, **Image**). Ҳалли: ҳама ҳатмӣ
      фиристода мешаванд; агар расми нав набошад, расми ҷории профил аз сервер гирифта
      ва ҳамчун Image баргардонида мешавад. (Дар сайти зинда санҷидан лозим)

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
- ⚠️ **Маҳдудияти backend (тағйири username / login бо email):** Корбар мехоҳад
  username-и login-ро иваз кунад ё бо email login кунад. Дар тарафи frontend
  **имконнопазир** — тест шуд (2026-06-27):
  - `update-user-profile` userName-ро **иваз намекунад** (200 медиҳад, вале нодида мегирад).
  - `Account/login` (LoginDto) **танҳо** `userName`-ро қабул мекунад; email/phone → 400.
  - `get-user-profiles` (барои email→username) бе auth → 401.
  - **Ҳал:** танҳо дар backend мумкин (login бо `FindByEmail` ё endpoint-и change-username).
- Деплойи нав (push → Vercel худкор build мекунад) санҷидан: ProductDetail расмҳо,
  Catalog (бренд/ранг/subcategory), Profile (GET/PUT дар сайти зинда).
- ⚠️ Санҷидани `update-user-profile` дар сайти зинда (майдони Image ҳатмӣ).
- Ихтиёрӣ: stagger-и сабук барои кортҳои маҳсулот; bundle code-split (chunk > 500kB).
- Ихтиёрӣ: васл кардани API-и воқеии фармоиш (CheckOut ҳозир mock аст).

## 📝 Лог
- **2026-06-24:** Phase 1 + 2. Стек гузошта шуд, API-и softclub васл шуд, каталог/детал/корзинка/wishlist сохта шуд. Build тоза.
- **2026-06-24:** Анимация AOS → react-awesome-reveal (Reveal.tsx). Сипас **i18n (tj/ru/en)** пурра илова шуд: i18next + LanguageSwitcher, ҳамаи саҳифаҳо тарҷумашуда, Zod бо makeSchema(t). Build тоза.
- **2026-06-25:** **Dark/Light mode** (ThemeToggle, var-based). Анимация **баргардонида шуд ба AOS** (классикӣ fade-up). Саҳифаҳои нави Exclusive-style: **Contact, About, Account, Cart, CheckOut**. **UserMenu** dropdown. FlashSales ҳамсатҳ, менюи категорияҳои Home калонтар. Build тоза.
- **2026-06-25:** Деплой зинда (Vercel) — ташхис: API + CORS + env солим.
- **2026-06-26:** **Catalog redesign** + бренд/ранг аз endpoint-ҳои алоҳида + **subcategory flyout** (Home) бо `SubcategoryId` филтр. **Profile ба API васл** (get/update-user-profile). **ProductDetail redesign** (Exclusive). Багфикс: расм дар ProductDetail (`images` = string[]). Build тоза.
- **2026-06-27:** Багфикси **Profile update 400** — API ҳамаи майдонҳоро (Dob+Image) ҳатмӣ мехоҳад; ҳама фиристода мешаванд, расми ҷорӣ ҳангоми набудани расми нав баргардонида мешавад. Build тоза.
- **2026-06-25:** Тайёрии деплой — `vercel.json` (SPA rewrites) илова/push шуд, Vercel CLI насб, login (idriswo). Деплой тавассути CLI овезон шуд → бо Dashboard import тамом мешавад (env-ҳо дар PROGRESS).
- **2026-06-25:** ProductDetail: расми маҳсулот аз массиви `images` гирифта мешавад (`product.images?.[0]?.images ?? product.image`); типҳо ва `products.ts` мутобиқ шуданд. Build тоза.
  - ⚠️ **Кушоданашуда:** корбар гуфт «деплой кор намекунад» — аммо тафсилот (URL/хато) надод. Дар session-и оянда: URL ё хатои дақиқро пурсидан ва ислоҳ кардан.
- **2026-06-27:** Санҷиши пурраи API-и зинда + ислоҳҳои Profile:
  - Ҳамаи endpoint-ҳо санҷида шуданд (register/login/products/product-by-id/categories/brands/colors/profile get+update) — ҳама 200.
  - **Profile update 413** (расми калон, ~60с) → `compressImage()` дар `lib/utils.ts` (хурд то 1024px, JPEG ≤~1MB); дар Account ба расми нав ва ҷорӣ татбиқ шуд.
  - **FormData Content-Type** — interceptor дар `axios.ts` барои FormData Content-Type-ро ҳазф мекунад (вагарна 400).
  - **Намоиши ном** — `profileName` ба auth store илова шуд (persist дар localStorage); UserMenu акнун firstName/lastName-и профилро нишон медиҳад (на username-и token); пас аз save ва ҳангоми бор кардани профил синхрон мешавад.
  - **Тағйири username / login бо email** — тест шуд ва дар frontend имконнопазир будани он тасдиқ шуд (ниг. «Қадами навбатӣ»). Кори backend.
