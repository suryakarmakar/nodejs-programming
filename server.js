/* calling this function here with this built-in FS module name will then return an object in which there are lots of functions that we 
can use. using this module we can read and write files and many more
*/
const fs = require("fs");

/* synchronous -  each statement is basically processed one after another, line by line. this is also called a blocking code */

/* the first one is the path to the file that we're reading and then also the character encoded. */
// const text = fs.readFileSync("readFile.txt", "utf8");
// console.log(text);

/* writeFileSync also takes 2 argument 1st one is path and 2nd one is what we want to write into that file */
// const data = "writing some text data on writeFile.txt";
// fs.writeFileSync("writeFile.txt", data);

// console.log(fs.readFileSync("writeFile.txt", "utf8"));

/* asynchronous, non-blocking code - in asynchronous code, we upload heavy work to basically be worked on in the background.
And then, once that work is done, a callback function that we register before is called to handle the result. */

/* this readFile takes 3 argument file path, character encoded and then a call back funcation, and this call back fucnation
also take 2 argument first one is for erro,r in case there was any and the second one will then be the data, itself 

note - the error is usually always the first one and then the data.
*/

// fs.readFile("writeFile.txt", "utf8", (error, data) => {
//   console.log(data);
// });

// const data = "writing some text data on writeFile.txt using non-blocking code";

// fs.writeFile("writeFile.txt", data, "utf8", (error) => {
//   console.log("file created successfully");
// });

// perform multiple steps in orders, using callback functions. this is a simple example of call back hell where one call back are dependent with a another call back and the nesting goes on

// fs.writeFile("writeFile.txt", data, "utf8", (error) => {
//   console.log("file created successfully");
//   fs.readFile("writeFile.txt", "utf8", (error, data) => {
//     console.log(data);
//   });
// });
/////////////////////////////////////////////////////////////////////////

/* this http module gives us networking capabilities such as building an http server. */
const http = require("http");
const url = require("url");

/* create server will accept a callback function, which will be fired off each time a new request hits our server. 
and this callback function gets access to two very important and fundamental variables. It is the request variable, and a 
response variable */

/* the top level code actually only gets executed once right in the beginning. but this createServer executed each time
that there is a new request, but not a code that's out here.*/
const productsJsonData = fs.readFileSync("data.json", "utf8");

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // we can add routing like this
  // if (pathName === "/" || pathName === "/home") {
  //   res.writeHead(200, {
  //     "Content-Type": "text/html",
  //   });
  //   res.write("<h1>Welcome to node js server</h1>");
  //   res.end();
  // } else if (pathName === "/product") {
  //   res.writeHead(200, {
  //     "Content-Type": "text/html",
  //   });
  //   res.write("<h1>Product page</h1>");
  //   res.end();
  // } else {
  //   res.writeHead(404, {
  //     "Content-Type": "text/html",
  //   });
  //   res.write("<h1>404, page not found!</h1>");
  //   res.end();
  // }

  // if you have nested folder then use __dirname insted of ./
  if (pathName === "/api/v1/products") {
    // fs.readFile("data.json", "utf8", (error, data) => {
    //   res.writeHead(404, {
    //     "Content-Type": "application/json",
    //   });
    //   res.end(data);
    // });

    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.end(productsJsonData);
  }
});

/* after creating a server now step 2 is started listening for incoming requests. in listen methode we have to pass
port no then host ip and a call back function */

server.listen(8000, "localhost", () => {
  console.log("server is running on http://localhost:8000");
});
