import { createServer } from "node:http";

const sayHello = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, world!");
};

// routing based on url and method
const routing = (req, res) => {
  const { url, method } = req;

  if (url === "/" && method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Home Page</h1>");
  } else if (url === "/product" && method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Product Page</h1>");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>404 Page Not Found</h1>");
  }
};

// receiving body data from request stream
const receiveBody = (req, res) => {
  const { url, method } = req;

  if (url === "/submit" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body = body + chunk;
    });

    req.on("end", () => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ received: body }));
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Something Went Wrong</h1>");
  }
};

const server = createServer(receiveBody);

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
