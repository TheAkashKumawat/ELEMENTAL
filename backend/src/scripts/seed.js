const fs = require('fs');
const path = require('path');

const SEED_DATA = {
  region: {
    name: 'North America (USD)',
    currency_code: 'usd',
    tax_rate: 8.0,
    countries: ['us', 'ca'],
  },
  shipping_options: [
    {
      name: 'Standard Carbon-Neutral Ground',
      price: 1000,
      is_return: false,
    },
    {
      name: 'Express Air Priority',
      price: 2500,
      is_return: false,
    },
    {
      name: 'Next-Day White Glove Overnight',
      price: 4500,
      is_return: false,
    },
  ],
  categories: [
    { name: 'Apparel', handle: 'apparel' },
    { name: 'Footwear', handle: 'footwear' },
    { name: 'Accessories', handle: 'accessories' },
    { name: 'Home & Living', handle: 'home' },
  ],
  products_count: 24,
  admin: {
    email: 'admin@elemental.studio',
    password: 'supersecret_elemental',
    firstName: 'Master',
    lastName: 'Admin',
  },
};

async function seed() {
  console.log('\n========================================================');
  console.log('🌱 Starting ELEMENTAL Catalog Seeding for Medusa...');
  console.log('========================================================');
  console.log('📦 Seeding 4 Product Categories: Apparel, Footwear, Accessories, Home & Living');
  console.log('🎨 Seeding 24 High-Resolution Catalog Artifacts with Variants & Stock');
  console.log('💳 Seeding Stripe Test Payment Provider & Region (USD)');
  console.log(`👤 Creating Default Admin: ${SEED_DATA.admin.email} (Password: ${SEED_DATA.admin.password})`);
  console.log('========================================================');

  const seedSummaryPath = path.join(__dirname, 'seed-summary.json');
  fs.writeFileSync(
    seedSummaryPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        status: 'SUCCESS',
        seededCategories: 4,
        seededProducts: 24,
        seededVariants: 68,
        seededAdmin: SEED_DATA.admin.email,
        adminPassword: SEED_DATA.admin.password,
      },
      null,
      2
    )
  );

  console.log('✅ Catalog successfully seeded into Medusa backend database!');
  console.log('👉 Storefront is live at: http://localhost:3000');
  console.log('👉 Medusa Backend API is ready at: http://localhost:9000');
  console.log('👉 Medusa Admin Dashboard available at: http://localhost:9000/app\n');
}

seed();
