const express = require('express');
const fs = require('fs');

const HOST = 'localhost';
const PORT = 3000;

const app = express();

app.use(express.json());

const toursListData = JSON.parse(
  fs.readFileSync(`${__dirname}/localData/tours-simple.json`, 'utf8')
);

/* 
get, post etc work like same. the first arguent is a path or route name and then a callback. the callback is only fire if
some hit the perticular route with perticular method like get or post. so we can create multiple api with same route name.
like "/about" can be use as a get and post at the same time and execution is depend on route and http method.

in the callback we can access request and responce object.
*/

// server root route
app.get('/', (req, res) => {
  // we can send status code using res.status
  // express automatically detect the data and set a header for us. in this case it set "Content-Type: text/html"
  // res.status(200).send('<h1>hello from the server</h1>');
  // (req, res) => this part also called a route handeler

  res.status(200).json({
    message: `Server is running on http://${HOST}:${PORT}`,
  });
});

// get all tours data form local json
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: toursListData.length,
    data: {
      tours: toursListData,
    },
  });
});

// create new tour
app.post('/api/v1/tours', (req, res) => {
  const createID = toursListData[toursListData.length - 1].id + 1;
  const bodyData = req.body;
  const allToursData = toursListData;
  // const newToure = Object.assign(bodyData, { id: createID }); // old approch

  // new approch
  const newToure = {
    id: createID,
    ...bodyData,
  };

  allToursData.push(newToure);

  fs.writeFile(
    `${__dirname}/localData/tours-simple.json`,
    JSON.stringify(allToursData),
    (error) => {
      if (error)
        res.status(404).json({
          status: 'error',
          data: {},
        });
      else
        res.status(200).json({
          status: 'success',
          results: allToursData.length,
          data: {
            tours: allToursData,
          },
        });
    }
  );
});

// listen useed for listen to the server request, its takes host ip and port number to start the server.
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
