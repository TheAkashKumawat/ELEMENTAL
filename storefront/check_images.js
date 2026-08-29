const https = require('https');

// Extract URLs from products.ts
const fs = require('fs');
const content = fs.readFileSync('./src/lib/data/products.ts', 'utf8');
const urls = [...new Set(content.match(/https:\/\/images\.unsplash\.com\/[^\s',"]+/g) || [])];

console.log(`Found ${urls.length} unique Unsplash URLs. Checking status codes...`);

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: 'ERROR', error: e.message });
    });
  });
}

(async () => {
  const results = await Promise.all(urls.map(checkUrl));
  const bad = results.filter(r => r.status !== 200 && r.status !== 302 && r.status !== 301);
  if (bad.length > 0) {
    console.log('Bad URLs:', bad);
  } else {
    console.log('ALL', results.length, 'Unsplash URLs returned 200 OK!');
  }
})();
