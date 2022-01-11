const http = require("http");

const helloWorld = function (req, res) {
  res.setHeader("Conetnt-Type", "text/html");
  res.writeHeader(200);
  res.end("<html><body><h2>Hello world!</h2></body></html>");
};

const server = http.createServer(helloWorld);

server.listen(8080, "localhost", function () {
  console.log("Server is running on http://localhost:8080");
});
