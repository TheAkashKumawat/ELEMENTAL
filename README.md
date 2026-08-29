# ELEMENTAL — 100% Cruelty-Free Indian Luxury E-Commerce Platform

> An ultra-premium, mobile-responsive direct-to-consumer (DTC) e-commerce storefront and headless commerce platform tailored for the Indian luxury market. Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Medusa.js v2**, and **Stripe / UPI / RuPay payment integrations**.

---

## 🏛️ System Architecture

```
                               ┌──────────────────────────────┐
                               │      Client Web Browser      │
                               │  (Mobile, Tablet, Desktop)   │
                               └──────────────┬───────────────┘
                                              │
                                              ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ NEXT.JS 15 STOREFRONT (/storefront)                                                             │
│ • Next.js App Router (SSG / Dynamic SSR / Responsive Mobile Layouts)                           │
│ • Luxury Architectural Design System (Tailwind CSS, Inter & Playfair Display typography)       │
│ • 100% Cruelty-Free Catalog (Botanical Bamboo Silk, Bio-Leather, Organic Cotton, Corozo)        │
│ • Indian Localization: INR (₹) Pricing, 36 Indian States/UTs, 6-digit PIN codes, GST invoices  │
│ • Indian Payments: Instant UPI (@upi), RuPay, Visa, Mastercard, NetBanking                     │
│ • Responsive Cart Drawer & Wishlist (Zustand persistent state)                                  │
│ • Dual Mode: Live Medusa REST API + Instant Embedded 24-Item Catalog Fallback                  │
└────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                 │ Storefront REST API (CORS)
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ MEDUSA.JS HEADLESS BACKEND (/backend)                                                           │
│ • Headless Commerce Engine (Regions, Currencies, Shipping, Taxes)                               │
│ • PostgreSQL Database Module                                                                    │
│ • Medusa Admin Dashboard (Product Catalog, Inventory, Order Management)                        │
│ • Stripe & Custom Payment Provider Modules                                                      │
│ • Automated Seed Script (`npm run seed`) populating 24 luxury items, variants, and stock counts │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🌿 100% Plant-Based & Cruelty-Free Catalog

ELEMENTAL is strictly **100% plant-based, vegan, and cruelty-free**. Zero animal products (no calfskin, leather, wool, cashmere, suede, silk, horn buttons, or down):

1. **Apparel**:
   - **Pure Bamboo Silk Relaxed Crewneck** (Coimbatore bamboo silk & organic cotton).
   - **Pleated Organic Linen & Cotton Trouser** (Belgian organic flax linen & tagua palm Corozo nut buttons).
   - **Botanical Waffle Knit Thermal Sweater** (GOTS certified organic cotton & eucalyptus Tencel).
   - **14oz Raw Selvedge Denim Jean** (Long-staple cotton denim with embossed plant-based apple-skin patch).
2. **Footwear**:
   - **Plant Bio-Leather Court Sneaker** (Cactus / apple skin bio-leather upper, Margom natural Hevea rubber sole, natural cork insole).
   - **Waxed Canvas & Bio-Suede Chelsea Boot** (18oz organic waxed duck canvas, plant microfiber bio-suede, Goodyear-welted Vibram lug outsole).
   - **Commando Bio-Leather Derby Shoe** (Breathable plant bio-leather & chunky Vibram sole).
   - **Plant Bio-Suede Penny Loafer** (Plant microfiber bio-suede & driving studs).
3. **Accessories**:
   - **Architect Waxed Canvas & Bio-Leather Tote** (18oz waxed canvas, cactus bio-leather handles, Moradabad raw brass hardware).
   - **Architect Bio-Leather Minimalist Wallet** (Italian apple skin bio-leather, RFID shielding).
   - **Botanical Bamboo Silk & Modal Fringe Scarf** (Handspun bamboo silk & organic modal).
   - **Titanium Chronograph Watch** (Aerospace Grade 2 titanium & organic cotton NATO strap).
4. **Home & Living**:
   - **Botanical Sandalwood & Amber Soy Candle** (100% pure plant soy wax & essential oils).
   - **Terracotta Arch Vase**, **Makrana Marble Monolith Bowl**, and **Moradabad Brass Task Lamp**.

---

## 🇮🇳 Indian E-Commerce Features

- **Currency & Pricing**: All items priced in Indian Rupees (`₹`), with formatted GST breakdowns (12% / 18%).
- **Pan-India Logistics**: BlueDart / Delhivery Surface (₹99 / Free over ₹1,999), Air Priority (₹249), Same-Day Metro Dispatch (₹499) for Mumbai, Delhi NCR, Bengaluru.
- **Address Structure**: Flat / Building, Locality, 36 Indian States and Union Territories dropdown, and 6-digit PIN code.
- **Payment Options**: **Instant UPI** (`elemental@upi` verified demo check), **RuPay** cards, Visa, Mastercard, American Express, NetBanking (HDFC, ICICI, SBI, Axis, Kotak).

---

## 📱 Mobile Responsiveness & UX

- **Sticky Mobile Add-to-Bag**: Fixed bottom action bar on mobile screens with real-time price and 1-tap cart trigger.
- **2-Column Product Grid**: Mobile-optimized 2-column catalog and category tiles (`grid-cols-2 lg:grid-cols-4`).
- **Touch Gallery Controls**: Visible navigation arrows and zoom modals for touchscreens.
- **iOS Auto-Zoom Prevention**: All inputs configured with 16px mobile font sizing (`text-base sm:text-sm`).
- **Zero Horizontal Jitter**: Global `overflow-x: hidden` and `-webkit-tap-highlight-color: transparent` across all mobile viewports.

---

## 🚀 Running the Project Locally

### 1. Run the Storefront (Next.js 15)
```bash
cd c:\Users\iampr\Desktop\Ecom\storefront
npm install
npm run build
npx next start -p 3000
```
- Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Run the Medusa Backend (Optional / Staging)
```bash
cd c:\Users\iampr\Desktop\Ecom\backend
npm install
npm run build
npm run start
```
- Medusa Admin runs on [http://localhost:9000/app](http://localhost:9000/app).

---

## 🌐 Going Live & Production Deployment

For complete, step-by-step instructions on setting up the live managed PostgreSQL database, deploying the backend to Railway/Render, deploying the frontend to Vercel, and connecting live payment gateways, refer to:

👉 **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

---

## 📌 Context for Next Antigravity Session

If you are opening this project in a new Antigravity session, here is what is completed and what can be done next:

### What Is Completed:
1. Complete Next.js 15 storefront with 24 cruelty-free, plant-based products, full search, wishlist, filters, cart, checkout, confirmation, static pages, and client portal.
2. Full Indian localization (INR `₹`, UPI, RuPay, Indian States/UTs, 6-digit PINs, GST calculation).
3. Mobile responsive testing and optimization across all screen sizes.
4. Production bundle built and verified 200 OK across all routes.
5. `DEPLOYMENT_GUIDE.md` created with complete deployment instructions.

### Next Steps You Can Ask Antigravity To Do:
- **Deploy to Vercel & Railway**: "Help me deploy this project live to Vercel and Railway using the deployment guide."
- **Integrate Live Payment Gateway**: "Integrate real Razorpay / Stripe API keys for live transactions."
- **Connect Custom Domain**: "Configure DNS settings for my custom domain (e.g. `elemental.in`)."
- **Add More Products / Custom Media**: "Add 10 new home decor products with custom images."
