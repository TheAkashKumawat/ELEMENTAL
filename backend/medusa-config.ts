import { loadEnv, defineConfig } from '@medusajs/framework/utils';

loadEnv(process.env.NODE_ENV || 'development', process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/medusa-elemental',
    http: {
      storeCors: process.env.STORE_CORS || 'http://localhost:3000,http://localhost:8000',
      adminCors: process.env.ADMIN_CORS || 'http://localhost:9000,http://localhost:7001',
      authCors: process.env.AUTH_CORS || 'http://localhost:3000,http://localhost:9000',
      jwtSecret: process.env.JWT_SECRET || 'supersecret_jwt_key_elemental_ss26',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret_cookie_key_elemental_ss26',
    },
  },
  admin: {
    disable: false,
    backendUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
  },
  modules: [
    {
      resolve: '@medusajs/payment',
      options: {
        providers: [
          {
            resolve: '@medusajs/payment-stripe',
            id: 'stripe',
            options: {
              apiKey: process.env.STRIPE_API_KEY || 'sk_test_mock_elemental_key',
              webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_mock_elemental_secret',
            },
          },
        ],
      },
    },
  ],
});
