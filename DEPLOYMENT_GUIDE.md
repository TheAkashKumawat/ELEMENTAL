# 🚀 ELEMENTAL — Complete Production Deployment & Live Operations Guide

This guide details how to take the **ELEMENTAL** e-commerce platform live, configure the managed production database, and enable live payment processing (UPI, RuPay, NetBanking, Cards).

---

## 🏛️ 1. Production Architecture Overview

```
                               ┌────────────────────────────────────────┐
                               │       CUSTOM DOMAIN / DNS              │
                               │        (e.g., elemental.in)            │
                               └──────────────────┬─────────────────────┘
                                                  │
                 ┌────────────────────────────────┴────────────────────────────────┐
                 ▼                                                                 ▼
┌─────────────────────────────────┐                             ┌─────────────────────────────────┐
│     STOREFRONT (Next.js 15)     │                             │    MEDUSA BACKEND & ADMIN PANEL │
│        Hosted on Vercel         │                             │       Hosted on Railway / Render│
│   • Serverless Edge Rendering   │  ◄── REST / GraphQL API ──► │   • Medusa Headless Engine      │
│   • Instant Indian CDN delivery │                             │   • Admin Portal (/app)         │
└────────────────┬────────────────┘                             └────────────────┬────────────────┘
                 │                                                               │
                 │ (Live Payment Session)                                        │ (Database & Cache)
                 ▼                                                               ▼
┌─────────────────────────────────┐                             ┌─────────────────────────────────┐
│   PAYMENT GATEWAY (Stripe/UPI)  │                             │   MANAGED DATABASE (PostgreSQL) │
│  • Instant UPI (GPay/PhonePe)   │  ── Webhook (Order Paid) ─► │    Neon / Supabase / Railway    │
│  • RuPay / Cards / NetBanking   │                             │  • Products, Orders, Customers  │
└─────────────────────────────────┘                             └─────────────────────────────────┘
```

---

## 🗄️ 2. How the Live Database Works

### The Database Engine
The backend runs on **PostgreSQL 15+** managed in the cloud (via [Neon.tech](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app)).

### Stored Data Entities:
1. **Catalog**: Products, 100% cruelty-free materials, color swatches, sizes, prices in INR (`₹`), and real-time inventory counts.
2. **Customers & Accounts**: Names, contact details (`+91`), encrypted passwords, and saved Indian addresses with 6-digit PIN codes.
3. **Shopping Carts & Checkout**: Active sessions, applied promo discounts (`WELCOME10`), selected delivery options (BlueDart/Air/Metro).
4. **Orders & Invoices**: Auto-generated order IDs (e.g. `ELM-9841`), GST breakdown (12% / 18%), courier tracking numbers, and transaction IDs.

### Admin Dashboard Access:
Once deployed, you and your team access the web-based admin portal at:
`https://your-medusa-backend.up.railway.app/app`
- Add, edit, or archive products.
- Manage stock levels and set inventory alerts.
- Process returns, customer inquiries, and fulfill orders.

---

## 💳 3. How Live Payments Work (UPI, RuPay, Cards)

### Payment Flow (Two-Step Verification):
1. **Initiation**: When the customer reaches step 3 of checkout, the frontend requests an encrypted `PaymentIntent` or `order_id` from the payment gateway locking the exact INR amount.
2. **Customer Authorization**:
   - **UPI**: The customer enters their VPA or taps UPI Intent to approve on Google Pay, PhonePe, Paytm, or BHIM.
   - **Cards / RuPay**: The customer enters card details and completes bank 3D Secure OTP verification.
3. **Webhook Verification**:
   - The payment gateway fires an asynchronous, cryptographically signed HTTP POST request to your backend (`https://your-medusa-backend.up.railway.app/hooks/payment`).
   - The backend verifies the signature, marks the order as `PAID` in PostgreSQL, deducts stock, generates a GST tax invoice, and triggers warehouse dispatch.

### Recommended Payment Gateways for India:
- **Razorpay** (Recommended for India): Full support for UPI Intent & QR, RuPay, Visa, Mastercard, NetBanking across all Indian banks.
- **Cashfree Payments**: High success rates for instant UPI and automated refunds.
- **Stripe India**: Ideal for accepting both Indian domestic cards and international cross-border payments.

---

## 🛠️ 4. Step-by-Step Live Deployment (15–20 Minutes)

### Step 1: Push Code to GitHub
1. Initialize git and commit your workspace:
   ```bash
   cd c:\Users\iampr\Desktop\Ecom
   git init
   git add .
   git commit -m "feat: complete ELEMENTAL luxury e-commerce store"
   ```
2. Create a new private or public repository on GitHub (e.g. `elemental-store`).
3. Link and push:
   ```bash
   git remote add origin https://github.com/your-username/elemental-store.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Provision a Cloud PostgreSQL Database
1. Go to [Neon.tech](https://neon.tech) or [Supabase.com](https://supabase.com) (both have generous free tiers).
2. Click **Create Project** -> Select Region: **Asia / Mumbai / Singapore**.
3. Copy your connection string:
   ```env
   DATABASE_URL=postgres://username:password@ep-sample-12345.ap-southeast-1.neon.tech/elemental_db?sslmode=require
   ```

---

### Step 3: Deploy Medusa Backend to Railway / Render

#### Option A: Railway (Fastest)
1. Go to [Railway.app](https://railway.app) and sign in with GitHub.
2. Click **New Project** -> **Deploy from GitHub Repo** -> Select `elemental-store`.
3. Set the **Root Directory** to `/backend`.
4. Go to **Variables** and add:
   ```env
   PORT=9000
   NODE_ENV=production
   DATABASE_URL=postgres://... (from Step 2)
   JWT_SECRET=generate_a_random_32_character_string
   COOKIE_SECRET=generate_a_random_32_character_string
   MEDUSA_ADMIN_ONBOARDING_TYPE=default
   STRIPE_API_KEY=sk_live_... (or sk_test_... for staging)
   ```
5. Click **Deploy**. Railway will run migrations and provide a live URL, e.g.:
   `https://elemental-backend.up.railway.app`
6. Create your first Admin user via Railway terminal:
   ```bash
   npx medusa user -e admin@elemental.in -p YourSecurePassword123!
   ```

---

### Step 4: Deploy Next.js Storefront to Vercel
1. Go to [Vercel.com](https://vercel.com) and click **Add New Project**.
2. Select your `elemental-store` repository from GitHub.
3. Configure the build settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: Click edit and select `storefront`
4. Add **Environment Variables**:
   ```env
   NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://elemental-backend.up.railway.app
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... (or pk_test_...)
   NEXT_PUBLIC_BASE_URL=https://elemental.in (or your vercel.app domain)
   ```
5. Click **Deploy**. Vercel will build the production storefront and assign an SSL-enabled `.vercel.app` URL within ~60 seconds.

---

### Step 5: Connect your Custom Domain (e.g. `elemental.in`)
1. In your **Vercel Dashboard**, go to **Settings > Domains**.
2. Enter your domain name (e.g., `elemental.in` or `www.elemental.in`).
3. Update DNS at your domain registrar (GoDaddy, Namecheap, Google Domains):
   - **Type `A`**: `@` -> `76.76.21.21`
   - **Type `CNAME`**: `www` -> `cname.vercel-dns.com`
4. SSL certificates will generate automatically within 5 minutes.

---

## 🔒 5. Production Go-Live Checklist

- [ ] **Catalog Verification**: Confirm all 24 products display prices in INR (`₹`) and 100% plant-based / cruelty-free materials.
- [ ] **Payment Gateway Verification**:
  - Switch Stripe/Razorpay from `Test Mode` to `Live Mode`.
  - Perform a live ₹1 test transaction using real UPI / Card.
  - Verify that the webhook returns `HTTP 200` and the order shows up in Admin.
- [ ] **GST Invoice Settings**: Ensure your GSTIN is configured in the billing profile for Indian tax compliance.
- [ ] **Logistics Integration**: Connect Shiprocket / BlueDart API keys for automated label generation and pickup dispatch.
- [ ] **Email Notifications**: Configure Resend / SendGrid / Amazon SES for transactional order confirmation emails.

---

## 📞 Support & Handover

For any assistance or questions, refer to the [README.md](./README.md) file or launch Antigravity with this codebase.
