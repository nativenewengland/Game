const http = require('http');
const fs = require('fs');
const path = require('path');

const DEFAULT_PORT = 8080;
const port = Number.parseInt(process.env.PORT, 10) || DEFAULT_PORT;
const rootDir = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
};

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function getFilePath(requestUrl) {
  const urlPath = requestUrl.split('?')[0].split('#')[0];
  const normalizedPath = path.normalize(decodeURIComponent(urlPath));
  const safePath = normalizedPath.replace(/^([/\\])*|\.\.+/g, '');
  if (!safePath || safePath === path.sep) {
    return path.join(rootDir, 'index.html');
  }
  return path.join(rootDir, safePath);
}

async function sendFile(filePath, res) {
  try {
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory()) {
      const directoryIndex = path.join(filePath, 'index.html');
      return sendFile(directoryIndex, res);
    }
    const contentType = getContentType(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
    return undefined;
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`[dev-server] Error serving ${filePath}:`, error);
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return undefined;
  }
}

const server = http.createServer(async (req, res) => {
  if (!req || !req.url) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad Request');
    return;
  }

  const filePath = getFilePath(req.url);
  await sendFile(filePath, res);
});

server.listen(port, () => {
  console.log(`Development server running at http://localhost:${port}`);
});
