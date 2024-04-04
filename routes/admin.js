const express = require("express");

const router = express.Router();

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

module.exports = router;
