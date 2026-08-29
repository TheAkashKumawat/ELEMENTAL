#!/bin/sh
set -e

APP_PORT="${PORT:-8080}"

if [ "$SERVICE_TYPE" = "backend" ] || [ "$RAILWAY_SERVICE_NAME" = "backend" ] || [ "$RAILWAY_SERVICE_NAME" = "medusa" ]; then
  echo "🚀 Launching ELEMENTAL Medusa Backend on port $APP_PORT..."
  cd backend
  if [ ! -d "node_modules" ]; then
    npm install --production=false --legacy-peer-deps
  fi
  export PORT="$APP_PORT"
  npm run start
else
  echo "🚀 Launching ELEMENTAL Storefront on port $APP_PORT..."
  cd storefront
  if [ ! -d "node_modules" ]; then
    npm install --production=false --legacy-peer-deps
  fi
  npm run build
  npx next start -H 0.0.0.0 -p "$APP_PORT"
fi
