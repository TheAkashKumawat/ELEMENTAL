#!/bin/sh
set -e

if [ "$SERVICE_TYPE" = "backend" ] || [ "$RAILWAY_SERVICE_NAME" = "backend" ] || [ "$RAILWAY_SERVICE_NAME" = "medusa" ]; then
  echo "🚀 Launching ELEMENTAL Medusa Backend..."
  cd backend
  if [ ! -d "node_modules" ]; then
    npm install --production=false
  fi
  npm run start
else
  echo "🚀 Launching ELEMENTAL Storefront..."
  cd storefront
  if [ ! -d "node_modules" ]; then
    npm install --production=false
  fi
  npm run build
  npm run start
fi
