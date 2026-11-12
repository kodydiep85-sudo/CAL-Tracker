// Tiny zero-dependency web server so this app also runs as a Render "Web Service".
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.md': 'text/plain; charset=utf-8'
};

http.createServer((req, res) => {
  let urlPath;
  try { urlPath = decodeURIComponent(req.url.split('?')[0]); } catch (e) { urlPath = '/'; }
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';
  const file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }

  fs.readFile(file, (err, data) => {
    if (err) {
      // unknown path → serve the app
      return fs.readFile(path.join(ROOT, 'index.html'), (e2, html) => {
        if (e2) { res.writeHead(500); return res.end('index.html missing'); }
        res.writeHead(200, { 'Content-Type': TYPES['.html'], 'Cache-Control': 'no-cache' });
        res.end(html);
      });
    }
    const ext = path.extname(file).toLowerCase();
    const headers = { 'Content-Type': TYPES[ext] || 'application/octet-stream' };
    headers['Cache-Control'] = (ext === '.html' || file.endsWith('sw.js')) ? 'no-cache' : 'public, max-age=86400';
    res.writeHead(200, headers);
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => console.log('Calorie Tracker running on port ' + PORT));
