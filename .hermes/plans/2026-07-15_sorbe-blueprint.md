# Sorbe — Ice Cream E-Commerce Blueprint & Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.
> **Current Phase:** Blueprint & Planning — NO EXECUTION until approved.

**Goal:** Build a complete ice cream e-commerce website (Sorbe) adapted from the Caceres-Videogames codebase, with Supabase backend, Vercel hosting, Wompi payments, and full Meta ecosystem integration (WhatsApp Business API, Facebook/Instagram Shop, Meta Pixel).

**Architecture:** React 18 SPA (Vite + TypeScript + shadcn/ui + Tailwind CSS) with Supabase (Postgres, Auth, Storage, Realtime) as backend. Payments via Wompi (already integrated in base). Meta integrations: WhatsApp Business API (customer chat + order notifications), Facebook/Instagram Catalog (product feed), and Meta Pixel (analytics/retargeting). No cloud deployment until all features are complete.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS 3, shadcn/ui, Supabase (@supabase/supabase-js, @supabase/ssr), TanStack Query, react-hook-form + zod, react-router-dom, recharts, Wompi API (El Salvador). Meta: WhatsApp Cloud API, Facebook Conversions API.

**Base Repo:** github.com/pipe1800/Caceres-Videogames (Lovable-generated e-commerce: Vite + React + shadcn/ui + Supabase + Wompi payments for El Salvador)

**Country:** El Salvador (Wompi, Spanish, SVC/USD)
**Language:** Spanish only
**Domain:** Vercel default (*.vercel.app) — custom domain deferred
**Admin:** Team-based with role-based access (admin roles needed)

---

## Key Decisions (User-Confirmed)

| Decision | Answer |
|----------|--------|
| Payment processor | Wompi (already integrated — KEEP IT) |
| Delivery model | Pickup AND delivery |
| Product complexity | Size variants (chico/mediano/grande) with price modifiers |
| WhatsApp Business | Already verified — use Cloud API for full programmatic access |
| Domain | Vercel default for now |
| Facebook/Instagram | Business accounts exist and ready |
| Language | Spanish only |
| Admin access | Team with role-based access |
| Brand name | Sorbe |
| Country | El Salvador |

---

## Phase 0: Foundation — Repo Setup & Branding

### Task 0.1: Clone & Initialize Project
**Objective:** Clone Caceres-Videogames, strip gaming-specific content, set up Sorbe project

**Files:**
- Create: entire `/home/Felipe/Documents/Sorbe/` directory structure

**Step 1: Clone the base repo**
```bash
cd /home/Felipe/Documents/Sorbe
git clone git@github.com:pipe1800/Caceres-Videogames.git .
rm -rf .git  # start fresh git history
git init
git add -A && git commit -m "init: clone Caceres-Videogames as Sorbe base"
```

**Step 2: Update package.json for Sorbe**
- Change `name` to `sorbe`
- Change `version` to `0.1.0`
- Update description to "Sorbe — Helados Artesanales"

**Step 3: Create new GitHub repo**
```bash
gh repo create pipe1800/Sorbe --public --description "Sorbe — Helados Artesanales | E-Commerce" --source=. --remote=origin --push
```

**Verification:** `git remote -v` shows `github.com/pipe1800/Sorbe`

---

### Task 0.2: Install Dependencies & Verify Build
**Objective:** Ensure the base project builds cleanly

**Step 1: Install dependencies**
```bash
npm install
```

**Step 2: Run production build**
```bash
npm run build
```

**Verification:** Build succeeds with zero errors. `dist/` directory created.

---

## Phase 1: Schema Redesign — Ice Cream Data Model

### Task 1.1: Redesign Supabase Schema for Ice Cream
**Objective:** Extend videogame schema with ice-cream-specific tables (keep existing Wompi/payment tables)

**Files:**
- Create: `supabase/migrations/00001_initial_schema.sql`
- Create: `reference/database-sorbe.md` (updated reference doc)

**Schema Changes:**

| Old Table | Action | New Table | Key Changes |
|-----------|--------|-----------|-------------|
| `products` | Extend | `products` | Remove: `console`. Add: `flavor_profile` (text[]), `dietary_info` (jsonb: {vegano, sin_gluten, sin_azucar, sin_lactosa}), `size_options` (jsonb: [{nombre, modificador_precio}]), `es_temporal` (bool), `alergenos` (text[]), `ingredientes` (text). Keep: `sku`, `name`, `description`, `price`, `original_price`, `is_new`, `is_on_sale`, `rating`, `review_count`, `in_stock`, `stock_count`, `image_urls`, `likes_count` |
| `categories` | Adapt | `categories` | Ice cream hierarchy: Tipo (paletas, conos, vasitos, granizados, postres) → Familia de Sabor (frutal, cremoso, chocolate) |
| `product_categories` | Keep | `product_categories` | No changes needed |
| `orders` | Extend | `orders` | Add: `metodo_entrega` (recoger/domicilio), `direccion_entrega` (jsonb), `hora_programada` (timestamptz), `chat_whatsapp_id` (text). Keep all Wompi fields. |
| `payments` | Keep | `payments` | Wompi integration stays. Add: `metodo_pago` (tarjeta, efectivo, transferencia, wompi) |
| `admin_users` | Extend | `admin_users` | Add: `rol` (admin, editor, viewer), `nombre` (text) |
| NEW | Create | `clientes` | id (uuid), telefono (text), whatsapp_id (text), nombre (text), email (text), total_pedidos (int), creado_en |
| NEW | Create | `eventos_meta` | id, nombre_evento, datos_evento (jsonb), user_id, creado_en — server-side Meta Pixel events |
| NEW | Create | `config_tienda` | id, clave, valor — dynamic store settings (horarios, direccion, sabores destacados) |

**Step 1: Write migration SQL**
Create `supabase/migrations/00001_schema_sorbe.sql` with all CREATE TABLE, ALTER TABLE, indexes, and RLS policies.

**Step 2: Write reference document**
Create `reference/database-sorbe.md` documenting the full schema.

**Step 3: Generate TypeScript types**
```bash
npx supabase gen types typescript --linked > src/types/supabase.ts
```

**Verification:** Review schema with `supabase db advisors` once Supabase project is linked.

---

## Phase 2: Visual Rebrand — From Gaming to Ice Cream

### Task 2.1: Update Theme & Design Tokens
**Objective:** Replace dark gaming aesthetic with fresh warm ice cream branding

**Files:**
- Modify: `tailwind.config.ts` — Sorbe color palette
- Modify: `src/index.css` — CSS variables for Sorbe theme
- Modify: `src/App.css` — remove gaming styles

**Color Palette (Sorbe):**
```
Fondo:      Crema #FFF8E7 → warm off-white base
Primario:   Fresa #FF6B6B → vibrant coral/red (CTAs, accents)
Secundario: Menta #4ECDC4 → fresh mint green
Oscuro:     Chocolate #2C1810 → rich dark brown (text, headers)
Claro:      Vainilla #FAF3E0 → warm cream
Acento:     Frambuesa #C44569 → deep pink (hover states)
```

**Step 1: Update tailwind.config.ts**
Extend theme with Sorbe color tokens (sorbe-crema, sorbe-fresa, sorbe-menta, sorbe-chocolate, sorbe-vainilla, sorbe-frambuesa).

**Step 2: Update src/index.css**
Replace CSS variables, add rounded playful typography.

**Step 3: Clean up src/App.css**
Remove game-specific styles.

**Verification:** `npm run dev` — site renders with new warm color scheme.

---

### Task 2.2: Redesign Core Components for Ice Cream
**Objective:** Adapt all consumer-facing components for ice cream products

**Files:**
- Modify: `src/components/Header.tsx` — "Sorbe" logo, nav: Menú, Sabores, Pedir, Nosotros
- Modify: `src/components/Hero.tsx` — ice cream hero, sabores de temporada
- Modify: `src/components/Footer.tsx` — Sorbe branding, WhatsApp, Instagram, Facebook links
- Modify: `src/components/Navigation.tsx` — simplified ice cream nav
- Modify: `src/components/ProductCard.tsx` — flavor badges, dietary icons, size selector
- Modify: `src/components/ProductSection.tsx` — "Nuestras Paletas", "Conos", etc.
- Modify: `src/components/CompanyInfo.tsx` — "Nuestra Historia" about Sorbe
- Modify: `src/components/LocationSelector.tsx` — adapt for El Salvador delivery zones
- Create: `src/components/IndicadorSabor.tsx` — visual flavor indicator (fresa = red dot, etc.)
- Create: `src/components/IconosDieta.tsx` — vegano/sin gluten/sin azúcar icons
- Create: `src/components/SelectorTalla.tsx` — chico/mediano/grande picker
- Create: `src/components/BannerTemporal.tsx` — "Sabores de Temporada" promo banner

**Step 1: Update LocationSelector**
Keep it — already has El Salvador data. Refine for delivery zone selection.

**Step 2: Create new ice-cream-specific components**
Build IndicadorSabor, IconosDieta, SelectorTalla, BannerTemporal with Spanish labels.

**Step 3: Adapt existing components**
Update Header, Hero, Footer, Navigation, ProductCard, ProductSection, CompanyInfo — all Spanish text.

**Verification:** Navigate through all pages — no gaming references remain, warm ice cream theme consistent.

---

### Task 2.3: Update Pages for Ice Cream Flow
**Objective:** Adapt all pages for the ice cream shopping experience (Spanish-only)

**Files:**
- Modify: `src/pages/Index.tsx` — hero con sabores de temporada, productos destacados, reseñas
- Modify: `src/pages/Products.tsx` — filtrar por sabor, dieta, talla, temporal
- Modify: `src/pages/ProductDetail.tsx` — selector de talla, info dieta, ingredientes, alérgenos
- Modify: `src/pages/Cart.tsx` — variantes de talla en carrito, toggle recoger/domicilio
- Modify: `src/pages/Checkout.tsx` — datos de entrega, integración Wompi (ya existente)
- Modify: `src/pages/PaymentSuccess.tsx` — confirmación con hora de recogida/entrega
- Create: `src/pages/Nosotros.tsx` — historia de la marca, ubicación, horarios
- Create: `src/pages/Sabores.tsx` — galería de sabores / menú de temporada
- Create: `src/pages/Contacto.tsx` — WhatsApp, redes sociales, formulario de contacto

**Step 1: Update existing pages**
Adapt Index, Products, ProductDetail, Cart, Checkout, PaymentSuccess for ice cream + Spanish.

**Step 2: Create new pages**
Build Nosotros, Sabores, Contacto.

**Step 3: Update App.tsx routing**
Add routes: `/nosotros`, `/sabores`, `/contacto`.

**Verification:** Full user flow: explorar → filtrar → detalle producto → agregar al carrito → checkout → confirmación.

---

## Phase 3: Backend — Supabase Integration

### Task 3.1: Set Up Supabase Project
**Objective:** Create Supabase project and link local environment

**Files:**
- Create: `supabase/config.toml`
- Modify: `.env` — Supabase vars for Sorbe

**Step 1: Create Supabase project**
```bash
supabase init
supabase link --project-ref <sorbe-project-ref>
```

**Step 2: Configure environment**
Update `.env` with Supabase URL and anon key. Keep all Wompi vars.

**Step 3: Run initial migration**
```bash
supabase db push
```

**Verification:** `supabase status` shows linked project.

---

### Task 3.2: Refactor Supabase Services
**Objective:** Organize Supabase client and create typed service modules for Sorbe domain

**Files:**
- Modify: `src/integrations/supabase/client.ts` — clean up, standardize
- Modify: `src/integrations/supabase/types.ts` — add Sorbe + Meta types
- Modify: `src/integrations/supabase/supabaseClient.ts` — singleton pattern
- Keep: `src/integrations/wompi/` — STAYS, Wompi integration is preserved
- Create: `src/integrations/supabase/servicioProductos.ts` — CRUD for ice cream products
- Create: `src/integrations/supabase/servicioCategorias.ts` — category queries
- Create: `src/integrations/supabase/servicioClientes.ts` — customer management
- Create: `src/integrations/supabase/servicioConfig.ts` — store config get/set
- Create: `src/integrations/supabase/servicioPedidos.ts` — order service with delivery metadata
- Create: `src/integrations/supabase/servicioNotificaciones.ts` — wraps notificationService

**Step 1: Refactor Supabase client**
Standardize client creation, export typed client.

**Step 2: Create service modules**
Build all servicio* modules with proper error handling and Spanish method names where appropriate.

**Step 3: Update env vars**
Keep Wompi vars, add Meta vars to `.env.example`.

**Step 4: Keep notificationService.ts**
Already exists — extend with WhatsApp notification support.

**Verification:** Test queries against Supabase via `supabase db query` or MCP.

---

### Task 3.3: Set Up RLS Policies & Security
**Objective:** Proper Row Level Security for all tables, role-based admin access

**Files:**
- Create: `supabase/migrations/00002_rls_politicas.sql`

**RLS Policy Checklist:**
- `products`: lectura pública, escritura admin/editor
- `categories`: lectura pública, escritura admin/editor
- `orders`: usuarios autenticados crear/leer propios, admin leer todos
- `clientes`: usuarios autenticados leer propio, admin leer todos
- `config_tienda`: lectura pública, escritura admin
- `eventos_meta`: inserción pública (CAPI), lectura admin
- `admin_users`: acceso según rol (admin, editor, viewer)
- Enable RLS on ALL tables in public schema

**Step 1: Write RLS migration**
Create migration with all policies following Supabase security checklist. Role-based: admin (full), editor (products/orders write), viewer (read only).

**Step 2: Apply and verify**
```bash
supabase db push
```

**Verification:** Test as anon user — can read products but not modify.

---

## Phase 4: Meta Ecosystem Integration

### Task 4.1: Meta Pixel Setup (Client & Server Side)
**Objective:** Full Meta Pixel implementation for conversion tracking and retargeting

**Files:**
- Create: `src/integrations/meta/pixel.ts` — client-side Pixel helper
- Create: `src/integrations/meta/conversiones.ts` — server-side Conversions API
- Modify: `src/main.tsx` — initialize Pixel on app load
- Modify: `src/App.tsx` — page view tracking on route changes
- Create: `supabase/functions/registrar-conversion/index.ts` — Edge Function for CAPI

**Eventos a Rastrear:**
- `PageView` — todas las páginas
- `ViewContent` — página de detalle de producto
- `AddToCart` — agregar al carrito
- `InitiateCheckout` — iniciar checkout
- `Purchase` — pedido completado (con valor)
- `Search` — búsqueda/filtro de productos
- `ViewCategory` — navegación por categoría

**Step 1: Create Pixel helper**
`MetaPixel` class with `iniciar()`, `rastrear(evento, params)`, and `vistaPagina()` methods.

**Step 2: Integrate with router**
Track PageView on every route change.

**Step 3: Wire into purchase flow**
Track AddToCart, InitiateCheckout, Purchase at each step.

**Step 4: Create server-side fallback (Edge Function)**
Conversions API Edge Function for reliable purchase tracking. Store events in `eventos_meta` table.

**Verification:** Install Meta Pixel Helper browser extension — events fire correctly.

---

### Task 4.2: Facebook/Instagram Product Catalog
**Objective:** Product feed for Facebook/Instagram Shop integration

**Files:**
- Create: `src/integrations/meta/catalogo.ts` — catalog feed generator
- Create: `supabase/functions/feed-productos/index.ts` — serve XML feed
- Create: `public/facebook-product-feed.xml` — static feed endpoint

**Feed Requirements:**
- XML format per Facebook Commerce specification
- Fields: id, title, description, link, image_link, price, availability, condition, brand (Sorbe), google_product_category (Alimentos y Bebidas > Postres Congelados)
- Auto-updated from Supabase products table
- Includes size variants as item_group_id variants

**Step 1: Build feed generator**
Function that queries products table and outputs Facebook XML format.

**Step 2: Create Edge Function**
Deno Edge Function that regenerates feed.

**Step 3: Document Meta Commerce Manager setup**
Instructions for connecting the feed URL in Facebook Commerce Manager.

**Verification:** Feed URL returns valid XML, Facebook Commerce Manager accepts it.

---

### Task 4.3: WhatsApp Business API Integration
**Objective:** WhatsApp Cloud API for customer chat, order confirmations, and admin alerts (already have verified WhatsApp Business account)

**Files:**
- Create: `src/integrations/meta/whatsapp.ts` — WhatsApp Cloud API client
- Create: `src/components/BotonWhatsApp.tsx` — floating chat button
- Create: `supabase/functions/whatsapp-webhook/index.ts` — incoming message handler
- Create: `supabase/functions/whatsapp-notificar/index.ts` — order notifications

**Features:**
- Floating WhatsApp button on all pages (green bubble, "¿Te ayudamos?")
- Click-to-chat con mensaje predefinido: "Hola Sorbe, quiero hacer un pedido..."
- Confirmación de pedido vía mensaje template de WhatsApp
- Notificaciones al admin para nuevos pedidos
- Catálogo de productos vía WhatsApp (lista de mensajes interactivos)
- (Futuro) Chatbot simple para consultas de menú y horarios

**Step 1: Create WhatsApp button component**
Floating action button with WhatsApp icon, pre-filled message template.

**Step 2: Set up WhatsApp Cloud API client**
Configure with phone number ID, access token, and business account ID.

**Step 3: Build notification Edge Function**
Send order confirmation and admin alerts via WhatsApp templates.

**Step 4: (Future) Webhook for incoming messages**
Handle customer inquiries automatically or route to admin.

**Verification:** Click WhatsApp button → opens WhatsApp with pre-filled message. Test order notification delivers.

---

## Phase 5: Admin Panel Adaptation

### Task 5.1: Adapt Admin Dashboard for Ice Cream
**Objective:** Update admin pages and components for ice cream product management with role-based access

**Files:**
- Modify: `src/pages/AdminLogin.tsx` — Sorbe branding
- Modify: `src/pages/AdminDashboard.tsx` — ice cream metrics (sabores populares, rendimiento temporal)
- Modify: `src/pages/AdminAddProduct.tsx` — ice cream product form (sabor, dieta, talla)
- Modify: `src/components/admin/AddProductModal.tsx` — sabor, dieta, talla fields
- Modify: `src/components/admin/EditProductModal.tsx` — same field updates
- Modify: `src/components/admin/BulkProductUpload.tsx` — ice cream CSV template
- Modify: `src/components/admin/CategoryManager.tsx` — ice cream category tree
- Modify: `src/components/admin/ImageUpload.tsx` — keep as-is
- Modify: `src/components/admin/dashboard/*` — adapt all dashboard cards
- Create: `src/hooks/useAdmin.tsx` — update for role-based access (admin, editor, viewer)
- Create: `src/components/admin/ProtectedRoute.tsx` — role-gated routing
- Modify: `src/pages/NotFound.tsx` — Spanish 404 page

**Step 1: Update admin product forms**
Replace `console` with `perfil_sabor`, add `info_dietetica`, `opciones_talla`, `es_temporal`, `alergenos`.

**Step 2: Update dashboard analytics**
Replace gaming metrics with: sabores más vendidos, ventas por talla, tendencias de temporada, horas pico, pedidos por método de entrega.

**Step 3: Add role-based access**
Update AdminProvider to check roles. Protect routes: viewer can't edit, editor can't manage users.

**Step 4: Update category manager**
Ice cream category hierarchy: Tipo > Familia de Sabor > Específico.

**Verification:** Log into admin, create a product with new fields, verify it appears on storefront.

---

### Task 5.2: Store Configuration Admin
**Objective:** Admin UI for managing store settings (horarios, zonas de entrega, sabores destacados)

**Files:**
- Create: `src/pages/AdminConfig.tsx` — configuración de tienda
- Create: `src/components/admin/FormConfigTienda.tsx` — settings form
- Create: `src/components/admin/GestorUsuarios.tsx` — team user management (admin only)
- Modify: `src/App.tsx` — add admin config route

**Settings to Manage:**
- Horarios (apertura/cierre, días)
- Zonas de entrega (municipios/departamentos, costo)
- Sabores destacados/de temporada
- Número de WhatsApp para chat
- Enlaces de redes sociales
- Dirección para recoger

**Step 1: Build FormConfigTienda**
React Hook Form with validation, save/load from `config_tienda` table.

**Step 2: Build GestorUsuarios**
Admin-only page to add/remove/change roles for team members.

**Step 3: Add admin settings route**
`/admin/configuracion` → AdminConfig page.

**Verification:** Save store hours, refresh — frontend picks up new hours from Supabase.

---

## Phase 6: Vercel Deployment Preparation

### Task 6.1: Configure Vercel Deployment
**Objective:** Prepare project for Vercel deployment (no actual deploy until approved)

**Files:**
- Create: `vercel.json` — Vercel configuration
- Create: `.env.production` — production env template
- Modify: `package.json` — add vercel build script if needed

**vercel.json:**
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "routes": [
    { "src": "/[^.]+", "dest": "/index.html" }
  ],
  "env": {
    "VITE_SUPABASE_URL": "@sorbe-supabase-url",
    "VITE_SUPABASE_ANON_KEY": "@sorbe-supabase-anon-key",
    "VITE_WOMPI_APP_ID": "@sorbe-wompi-app-id",
    "VITE_WOMPI_API_SECRET": "@sorbe-wompi-api-secret",
    "VITE_WOMPI_API_URL": "@sorbe-wompi-api-url",
    "VITE_META_PIXEL_ID": "@sorbe-meta-pixel-id"
  }
}
```

**Step 1: Create vercel.json**
SPA routing, environment variable references. Include ALL Wompi vars.

**Step 2: Document all env vars**
List every required Vercel environment variable and Supabase secret.

**Step 3: Test production build**
```bash
npm run build
```

**Verification:** `dist/` outputs clean, `npm run preview` serves correctly with all integrations.

---

### Task 6.2: Supabase Edge Functions for Production
**Objective:** Prepare all Edge Functions for production deploy

**Files:**
- Create: `supabase/functions/_shared/cors.ts` — CORS helper
- Create: `supabase/functions/_shared/cliente.ts` — admin client factory
- Verify: `supabase/functions/registrar-conversion/index.ts`
- Verify: `supabase/functions/feed-productos/index.ts`
- Verify: `supabase/functions/whatsapp-webhook/index.ts`
- Verify: `supabase/functions/whatsapp-notificar/index.ts`

**Step 1: Create shared utilities**
CORS handler, Supabase admin client factory.

**Step 2: Deploy functions locally for testing**
```bash
supabase functions serve --no-verify-jwt
```

**Step 3: Test each function**
Curl each endpoint and verify response.

**Verification:** All functions respond correctly to local requests.

---

## Phase 7: Quality & Polish

### Task 7.1: Responsive Design & Mobile Optimization
**Objective:** Perfect mobile experience for on-the-go ice cream ordering

**Files:**
- Modify: All page and component files for responsive breakpoints

**Checklist:**
- Product cards stack properly on mobile
- Cart accessible from bottom nav on mobile
- WhatsApp button positioned correctly (bottom-right, not blocking content)
- Hero images optimized for mobile
- Touch targets ≥ 44px (important for size selector, add to cart)
- Font sizes readable at 320px width

**Step 1: Audit all pages at mobile breakpoints**
Test at 320px, 375px, 414px widths.

**Step 2: Fix layout issues**
Adjust grid, flex, spacing for mobile.

**Verification:** Chrome DevTools mobile view — all pages functional and pleasant.

---

### Task 7.2: SEO & Metadata (Spanish)
**Objective:** SEO optimization for local ice cream search traffic in El Salvador

**Files:**
- Modify: `index.html` — Spanish meta tags
- Create: `src/components/SEO.tsx` — per-page SEO component
- Verify: `public/robots.txt`
- Create: `public/sitemap.xml`

**Step 1: Update index.html**
Title: "Sorbe — Helados Artesanales | El Salvador"
Meta description: "Helados artesanales Sorbe. Paletas, conos, vasitos y más. Pedidos a domicilio en El Salvador. ¡Pide tus sabores favoritos!"
Og:image, og:type, twitter card — all in Spanish.

**Step 2: Create SEO component**
Dynamically set document title and meta tags per route. All Spanish.

**Step 3: Generate sitemap**
Manual sitemap with all product pages, categories, and static pages.

**Verification:** View page source — correct Spanish meta tags render.

---

### Task 7.3: Performance Optimization
**Objective:** Lighthouse score ≥ 90 on all metrics

**Files:**
- Modify: `vite.config.ts` — code splitting config
- Modify: Various components — lazy loading

**Optimizations:**
- Route-based code splitting via `React.lazy()`
- Image lazy loading with `loading="lazy"`
- Font preloading
- Bundle size analysis with `rollup-plugin-visualizer`

**Step 1: Implement route splitting**
Lazy load all page components.

**Step 2: Add loading skeletons**
Skeleton components while pages load.

**Step 3: Analyze bundle**
```bash
npx vite build --debug
```

**Verification:** Lighthouse audit — Performance ≥ 90.

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Wompi API changes | Payment processing breaks | Pin API version; monitor Wompi changelog |
| WhatsApp Cloud API rate limits | Delayed notifications | Queue system in Supabase; fallback to email |
| Facebook Commerce Manager rejection | No IG/FB Shop | Fix feed format issues per rejection reason |
| Supabase free tier limits | Service degradation | Monitor usage; upgrade plan when approaching limits |
| Lovable-tagged code quirks | Unexpected behavior | Review all components that originated from Lovable |
| Mobile ordering UX | Lost conversions | Thorough mobile testing; WhatsApp button as fallback checkout |

---

## Timeline Estimate

| Phase | Description | Est. Tasks | Dependencies |
|-------|-------------|-----------|--------------|
| 0 | Foundation & Setup | 2 | None |
| 1 | Schema Redesign | 1 | Phase 0 |
| 2 | Visual Rebrand | 3 | Phase 0 |
| 3 | Supabase Integration | 3 | Phase 1 |
| 4 | Meta Integration | 3 | Phase 3 |
| 5 | Admin Adaptation | 2 | Phase 2 + 3 |
| 6 | Vercel Prep | 2 | Phase 5 |
| 7 | Quality & Polish | 3 | Phase 6 |

**Total:** 19 tasks across 7 phases.

---

## Next Steps

1. Review updated blueprint and confirm
2. Create Meta Business account if not already done (business.facebook.com)
3. Create Supabase project (supabase.com) — we'll need the project ref
4. After approval: Begin Phase 0 execution (clone + init)
