const http = require("http");
const fs = require("fs");

let indexFileBuffer;

const serveIndex = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.writeHeader(200);
  res.end(indexFileBuffer);
};

const server = http.createServer(serveIndex);

// :16, :20 -> 2 async request same time
fs.readFile(__dirname + "/index.html", function (err, buffer) {
  indexFileBuffer = buffer;
  server.listen(8080, "localhost", function () {
    console.log("Server is running on http://localhost:8080");
  });
});
