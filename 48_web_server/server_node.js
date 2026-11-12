const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if ((req.url = "/")) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello world");
  } else if ((req.url = "/test")) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("This is for test purpose");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Page not found");
  }
});

server.listen(port, hostname, () => {
  console.log(`server is running on http://${hostname}:${port}`);
});
