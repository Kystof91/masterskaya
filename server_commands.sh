#!/bin/bash
cd /var/www/medical-center
tar -xzf medical-center.tar.gz
rm medical-center.tar.gz
npm install
npm run build
mkdir -p logs
pm2 stop medical-center-app 2>/dev/null || true
pm2 delete medical-center-app 2>/dev/null || true
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
