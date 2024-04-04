const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3000;
const HOST = "localhost";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

// this use midleware is calling all time so we need to filter out if is it post get etc using app.post, app.get etc
// this middleware always executes, not just for post requests but also for get
// app.use("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });
app.post("/product", (req, res, next) => {
  // now this app.post only execute if its a post request
  console.log(req.body);
  res.redirect("/");
});

app.use("/home", (req, res, next) => {
  console.log("home");
  res.send(`<h1>Home Screen</h1>`);
  // cant use next after res.send() method
  // next();
});

// this does not mean that the full path, so the part after the domain has to be a slash but that it has to start with that.
app.use("/", (req, res, next) => {
  res.send(`<h1>Root Screen</h1>`);
});

// app.use((req, res, next) => {
//   console.log("In the middleware");
//   next(); // allows the request to continue to the next middleware in line
// });

// app.use((req, res, next) => {
//   console.log("In another middleware");
//   // send set automatic header for us but we can override that using setHeader() method
//   res.send(`<h1>Welcome to our express js server</h1>`);
// });

// const server = http.createServer(app);

// server.listen(PORT, HOST, () => {
//   console.log(`Server is running on http://${HOST}:${PORT}`);
// });

// this is the alternative way to create server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
