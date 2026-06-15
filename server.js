const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = process.env.PORT || 3000;
const rootDir = __dirname;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function safeFilePath(requestUrl) {
  const parsedPath = decodeURIComponent((requestUrl || "/").split("?")[0]);

  if (parsedPath === "/" || parsedPath === "") {
    return path.join(rootDir, "index.html");
  }

  const normalizedPath = path.normalize(parsedPath).replace(/^(\.\.(\\|\/|$))+/, "");
  const resolvedPath = path.join(rootDir, normalizedPath);

  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
    return path.join(resolvedPath, "index.html");
  }

  if (!path.extname(resolvedPath)) {
    const htmlFallback = `${resolvedPath}.html`;
    if (fs.existsSync(htmlFallback)) {
      return htmlFallback;
    }
  }

  return resolvedPath;
}

function sendNotFound(response) {
  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Not found");
}

const server = http.createServer((request, response) => {
  const filePath = safeFilePath(request.url);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (!path.extname(filePath)) {
        fs.readFile(path.join(rootDir, "index.html"), (fallbackError, fallbackContent) => {
          if (fallbackError) {
            sendNotFound(response);
            return;
          }

          response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          response.end(fallbackContent);
        });
        return;
      }

      sendNotFound(response);
      return;
    }

    const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    response.writeHead(200, { "Content-Type": contentType });
    response.end(content);
  });
});

server.listen(port, () => {
  console.log(`GreenPulse listening on http://127.0.0.1:${port}`);
});
