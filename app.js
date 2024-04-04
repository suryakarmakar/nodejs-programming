const express = require("express");
const bodyParser = require("body-parser");

const adminRouter = require("./routes/admin");

const PORT = 3000;
const HOST = "localhost";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRouter);

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
