const http = require("http");
const fs = require("fs");

let indexFileBuffer;
let statusCode;

const serverAllRequests = function (req, res) {
  switch (req.url) {
    case "/json":
      res.setHeader("Content-Type", "application/json");
      res.writeHeader(statusCode);
      res.end(indexFileBuffer);
      break;
    case "/index.html":
      res.setHeader("Content-Type", "text/html");
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
      break;

    default:
      res.setHeader("Content-Type", "text/html");
      res.writeHeader(statusCode);
      res.end("Not found");
  }
};

const server = http.createServer(serverAllRequests);

server.listen(8080, "localhost", function () {
  console.log("Server is running on http://localhost:8080");
});

// web application is request response based
