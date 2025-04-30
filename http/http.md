## HTTP:

In Node.js, the http module is one of the core building blocks of the platform. It's part of Node's standard library and allows you to create web servers and handle HTTP requests and responses. You don’t need to install anything to use it—just import it in your file, and you’re ready to build a server. It gives you direct control over how requests and responses are handled, making it a great tool for understanding how the web works at a low level.

Imagine you're building a tiny web server from scratch. You start by importing the http module:

```js
import http from "node:http";
```

Once imported, you can create a server using http.createServer(). This method takes a callback function with two arguments — req (the request object) and res (the response object). This callback is triggered every time a client (like a browser or Postman) makes a request.

```js
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, world!");
});
```

Here, res.statusCode sets the HTTP status code (200 means OK). Then, we define the content type as plain text, and finally send the response body with res.end().

Now, to make your server listen for requests, you use the listen() method:

```js
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

And just like that, you've created a functioning web server. If you visit http://localhost:3000, you’ll get back “Hello, world!” in your browser.

## Routing:

Let’s say you want to respond differently based on the URL. You can use the req.url property:

```js
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Home Page</h1>");
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>About Page</h1>");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>404 Not Found</h1>");
  }
});
```

Every time a request comes in, you're checking its path and returning different content accordingly. There’s no routing like in Express—you're building it yourself.

## Response Object:

In Node.js, the response object (res) is part of the built-in http module and plays a crucial role in defining the data sent back to the client in response to an HTTP request. It allows you to control the response’s status code, headers, and body.

While there are various methods available on the response object, let’s focus on those most commonly used.

1. Setting Status Code and Headers:

The first step in sending a response is to define the status code (e.g., 200 for success or 404 for not found) and the appropriate headers, which can be done with res.writeHead().

```js
res.writeHead(200, { "Content-Type": "text/plain" });
```

2. Sending the Response Body:

Once the status and headers are set, the body of the response is sent using res.end().

res.end(): Ends the response and optionally sends data. It can send strings, buffers, or objects (which will be automatically stringified).

```js
res.end("Hello, world!");
```

If you’re dealing with large data, you can use res.write() to send chunks of data before calling res.end() to finalize the response.

```js
res.write("Part 1 of the data...");
res.write("Part 2 of the data...");
res.end("Final part of the data.");
```

3. Setting Headers Individually:

In some cases, you may need to set or modify specific headers after calling writeHead(). You can do this using res.setHeader():

```js
res.setHeader("Content-Type", "application/json");
```

res.statusCode() - sets the HTTP status code (e.g. 200, 404, 500) before sending the response.

res.setHeader() - sets a specific HTTP header (like Content-Type or X-Custom-Header). This method is useful for adding or modifying headers without changing the status code.

4. Handling JSON Responses:

Since modern web applications often exchange data in JSON format, you can respond with JSON using the following pattern:

```js
res.end(JSON.stringify({ message: "Data received successfully!" }));
```

## Request Object:

When an HTTP request hits your Node.js server, it's handed over to you as a request object — commonly referred to as req. This object is an instance of http.IncomingMessage and contains everything the client sends: the URL they're requesting, the method they're using, any headers they've included, and, if it's a POST or PUT request, the body of the data as well.

When a client (say, your browser or Postman) makes a request, Node.js passes the request into your callback as req.

```js
const server = http.createServer((req, res) => {});
```

- Reading Headers:

Every HTTP request comes with headers — key-value pairs carrying metadata, like content types, authentication tokens, cookies, and so on.

You access them via req.headers:

```js
console.log(req.headers["user-agent"]); // Shows browser info
console.log(req.headers["content-type"]); // Shows body format (e.g., 'application/json')
```

- Handling Request Body (e.g., POST data):

The request object (req) holds information about the incoming request—like the URL (req.url), method (req.method), headers (req.headers), and even the body (though reading the body requires listening to data events, which you’d need to do manually for POST requests).

If you want to handle incoming data from a POST request, you'd do something like this:

```js
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/data") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ received: body }));
    });
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});
```

1. Body:

Here you’re manually collecting data chunks from the request stream and assembling them into a complete body string. Data may be received in multiple chunks, so we’ll build the entire body piece by piece.

2. Listening for Data Chunks:

req.on('data', chunk => { ... }): This listens for incoming data from the client. The req object is a stream, meaning it doesn't necessarily receive all the data at once. The 'data' event is triggered whenever a chunk of data arrives.

body += chunk: Each chunk of data that arrives is added to the body string. The client sends data in small chunks, so this step ensures the data is accumulated until the entire request body is received.

3. When Data Transmission Ends:

req.on('end', () => { ... }): This event listener is triggered when all the data has been received. Once the entire body is received, the end event is emitted, and the callback inside it is executed.

const parsed = JSON.parse(body);: Since the body is usually in JSON format (for example, when sending API data), we parse it using JSON.parse() to convert the raw string into a JavaScript object.

This is how low-level the HTTP module is—nothing is abstracted unless you use a higher-level framework like Express.

The http module is built on top of Node.js streams and events, so it's incredibly efficient and scalable, even though it’s a bit verbose for everyday use.

## Importent Questions:

- Why use "node:http" instead of 'http' ?

```js
import http from "node:http";
```

The "node:http" prefix is required in ECMAScript Modules (ESM) to explicitly identify built-in Node.js modules. This helps avoid conflicts with user-defined modules (e.g., a custom http.js file). In ESM, Node.js uses the node: prefix to clearly differentiate core modules from other modules, ensuring better compatibility and clarity. This was introduced to future-proof the module system and avoid ambiguities.

In CommonJS, you can just use require('http'), but in ESM, you must use import http from 'node:http'.

- Why we have to stringify the body ?

```js
res.end(JSON.stringify({ received: body }));
```

res.end() only accepts a string or a Buffer, it doesn't automatically convert JavaScript objects to JSON. So if you try to pass an object directly: Node.js will complain, because it doesn’t know how to turn that object into something that can be sent over the network.

- Which one to use when ? (res.writeHead or res.statusCode and res.setHeader)

This is a single method that sets both the status code and headers in one go. It’s very convenient if you're sending the response immediately after. But once writeHead() is called, you can’t set headers anymore—it finalizes them.

```js
res.writeHead(200, { "Content-Type": "application/json" });
```

Using both res.statusCode and res.setHeader() approach is more readable, especially in complex handlers. More importantly, it allows you to:

1. Set headers incrementally, perhaps based on logic spread over multiple lines.
2. Keep the headers and status code mutable until the very last moment, before res.end() is called.

```js
res.statusCode = 200;
res.setHeader("Content-Type", "application/json");
```

When to prefer each ?

1. Use writeHead() when you know everything in one shot and want to be concise.
2. Use statusCode + setHeader() when your logic is more dynamic or spread out.
