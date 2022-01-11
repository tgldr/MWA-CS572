const http = require("http");
const fs = require("fs");

let indexFileBuffer;
let statusCode;

const serverAllRequests = function (req, res) {
  if (req.method === "POST") {
    res.setHeader("Content-Type", "application/json");

    switch (req.url) {
      case "/page1.html":
        fs.readFile(__dirname + "/page1.html", function (err, buffer) {
          if (err) {
            indexFileBuffer = "File not found";
            statusCode = 404;
          } else {
            indexFileBuffer = buffer;
            statusCode = 200;
          }
          res.writeHeader(statusCode);
          res.end(JSON.stringify({ data: indexFileBuffer.toString() }));
        });
        break;
      case "/page2.html":
        fs.readFile(__dirname + "/page1.html", function (err, buffer) {
          if (err) {
            indexFileBuffer = "File not found";
            statusCode = 404;
          } else {
            indexFileBuffer = buffer;
            statusCode = 200;
          }
          res.writeHeader(statusCode);
          res.end(JSON.stringify({ data: indexFileBuffer.toString() }));
        });
        break;

      default:
        fs.readFile(__dirname + "/index.html", function (err, buffer) {
          if (err) {
            indexFileBuffer = "File not found";
            statusCode = 404;
          } else {
            indexFileBuffer = buffer;
            statusCode = 200;
          }
          res.writeHeader(statusCode);
          res.end(JSON.stringify({ data: indexFileBuffer.toString() }));
        });
    }
  } else if (req.method === "GET") {
    res.setHeader("Content-Type", "text/html");

    switch (req.url) {
      case "/page1.html":
        fs.readFile(__dirname + "/page1.html", function (err, buffer) {
          if (err) {
            indexFileBuffer = "File not found";
            statusCode = 404;
          } else {
            indexFileBuffer = buffer;
            statusCode = 200;
          }
          res.writeHeader(statusCode);
          res.end(indexFileBuffer);
        });
        break;
      case "/page2.html":
        fs.readFile(__dirname + "/page1.html", function (err, buffer) {
          if (err) {
            indexFileBuffer = "File not found";
            statusCode = 404;
          } else {
            indexFileBuffer = buffer;
            statusCode = 200;
          }
          res.writeHeader(statusCode);
          res.end(indexFileBuffer);
        });
        break;

      default:
        fs.readFile(__dirname + "/index.html", function (err, buffer) {
          if (err) {
            indexFileBuffer = "File not found";
            statusCode = 404;
          } else {
            indexFileBuffer = buffer;
            statusCode = 200;
          }
          res.writeHeader(statusCode);
          res.end(indexFileBuffer);
        });
    }
  }
};

const server = http.createServer(serverAllRequests);

server.listen(4343, "localhost", function () {
  console.log("Server is running on http://localhost:4343");
});
