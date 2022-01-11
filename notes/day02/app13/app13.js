const http = require("http");
const fs = require("fs");

const readIndexAndServe = function (req, res) {
  fs.readFile(__dirname + "/index.html", function (err, buffer) {
    res.setHeader("Content-Type", "text/html");
    res.writeHeader(200);
    res.end(buffer);
  });
};

const server = http.createServer(readIndexAndServe);

server.listen(8080, "localhost", function () {
  console.log("Server is running on http://localhost:8080");
});
