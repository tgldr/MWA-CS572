const http = require("http");
const fs = require("fs");

let indexFileBuffer;
let statusCode;

const serveIndex = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.writeHeader(statusCode);
  res.end(indexFileBuffer);
};

const server = http.createServer(serveIndex);

// :16, :20 -> 2 async request same time
fs.readFile(__dirname + "/index.html", function (err, buffer) {
  if (err) {
    indexFileBuffer = "File not found";
    statusCode = 404;
  } else {
    indexFileBuffer = buffer;
    statusCode = 200;
  }
  server.listen(8080, "localhost", function () {
    console.log("Server is running on http://localhost:8080");
  });
});
