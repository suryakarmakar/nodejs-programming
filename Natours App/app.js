const express = require('express');
const fs = require('fs');
// const url = require('url');

const HOST = 'localhost';
const PORT = 3000;

const app = express();

// this middleware can identify json request form client side
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

// fetch all tours data
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'toures data get successfully',
    data: {
      results: toursListData.length,
      tours: toursListData,
    },
  });
});

// fetch single tour data
app.get('/api/v1/tours/:id', (req, res) => {
  // we cant pass query on same route name, we have already define '/api/v1/tours' exact route for fetch all route data. so here we have to use parames or use diffirente route
  // const { query, pathname } = url.parse(req.url, true);

  // if you want to make some params optional then use question mark after param name like this, /:id?/:name?. other wise if you define params but never send a value then you get a error.
  const tourID = req.params.id;
  const singleTour = toursListData[tourID];

  if (!singleTour)
    return res.status(404).json({
      status: 'error',
      message: 'data not found',
      data: {},
    });

  res.status(200).json({
    status: 'success',
    message: 'toure data get successfully',
    data: {
      results: 1,
      tours: singleTour,
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
          message: 'data not saved',
          data: {},
        });
      else
        res.status(201).json({
          status: 'success',
          message: 'data saved successfully',
          data: {
            results: allToursData.length,
            tours: allToursData,
          },
        });
    }
  );
});

// update tours field value
app.patch('/api/v1/tours/:id', (req, res) => {
  const tourID = Number(req.params.id);
  const bodyData = req.body;
  const isExistingTour = toursListData[tourID];

  if (!isExistingTour)
    return res.status(404).json({
      status: 'error',
      message: 'data not found',
      data: {},
    });

  const updateArray = toursListData.map((item) => {
    if (tourID === item.id)
      return {
        ...item,
        ...bodyData,
      };
    else return item;
  });

  fs.writeFile(
    `${__dirname}/localData/tours-simple.json`,
    JSON.stringify(updateArray),
    (error) => {
      if (error)
        res.status(404).json({
          status: 'error',
          message: 'data not update',
          data: {},
        });
      else
        res.status(201).json({
          status: 'success',
          message: 'data update successfully',
          data: {
            results: updateArray.length,
            tours: updateArray,
          },
        });
    }
  );
});

// listen useed for listen to the server request, its takes host ip and port number to start the server.
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
