## What is nodejs and Why we use it?

NodeJS is a JavaScript Runtime built on Google's open-source V8 JavaScript engine.

V8 engine can help us to compile javascript code out side of the browser. now that we have JavaScript
outside of the browser in a kind of stand alone environment which just NodeJS,

Node applications are so fast and so scalable because NodeJS is single threaded based on an event driven,
non-blocking I/O model which makes NodeJS very lightweight and efficient.

NOTE - But, there is actually, also, a type of apps that we should not build with Node. And this is when
our app needs some super heavy server-side processing like having image manipulations, video conversion,
file compression or anything like that.

the biggest one is probably that using the same language across your entire stack both on the front-end
and the back-end is a lot easier for you or for your team.

And another great reason for using Node is that there is a huge library of open-source packages
or modules, It's called NPM and you've probably heard of it or even used it already.

## package.json file

1. ^ this denote only update and accept the minor version. `
2. ~ this only update patchs of that package.

To check is any package get outdated or need to update or not then run this command.

> npm outdated

- types of npm packages:

1. dependence - uisng for project and production.
2. dev dependence - useing for development help and not for production.

## Static vs Dynamic vs API

## V8 engine: writen by c++ besides js

the V8 engine is what converts JavaScript code into machine code that a computer can actually understand.

## Libuv : writen by c++

libuv is an open source library with a strong focus on asynchronous IO. So, input output. This layer is what gives Node access to the
underlying computer operating system, file system, networking, and more.

Besides that, libuv also implements two extremely important features of Node.JS which are the event loop and also the thread pool.

the event loop is responsible for handling easy tasks like executing call backs and network IO while the thread pool is for more heavy work
like file access or compression or something like that.

## Processes:

## Threads:

## Thread Pool:

1. additional 4 threads or more
2. offload work from the event loop
3. handle heavy and expensive tasks like file uplaod, compression, DBS lookup executing

## Event Loop:

```
            |--> [Start]
            |        |
        yes |    [Expired timer callbacks]
            |        |
            |    [I/O polling and callbacks]
 [Exit]<----|        |
         no |    [setImmediate callbacks]
            |        |
            |    [close callbacks]
            |        |
            <---------
```

1. dont use sync version of funcations in fs, crypto and zlib modules in your callback funcations
2. dont perform complex calculations e.g. loops inside loops
3. be careful with JSON in large objects
4. dont use too complex regular expressions

## Event-driven architecture:

So most of Node's core modules, like the ones we already used, like HTTP, File System, and Timers are built around an event-driven architecture.

[Event emitter] -> [Event listener] -> [Attached callback funcation]

1. Node, there are certain objects called event emitters that emit named events as soon as something important happens in the app, like a request hitting server, or a timer expiring, or a file finishing to read.

2. These events can then be picked up by event listeners that we developers set up, which will fire off
callback functions that are attached to each listener, okay.

So again, on one hand, we have event emitters, and on the other hand event listeners that will react to emitted events by calling callback function.

## Single Thread:

```
    [Initialize program]
        |
    [Execute top-lavel code]
        |
    [Require modules]
        |
    [Register event callbacks]
        |
    [Start event loop]
```

## What is Express and why we use it?

1. express is a minimal node js framework, a higher level of abstraction
2. express contains very robust set of features like complex routing, easier handling of requests and responses, middleware,
   server-side rendering etc.
3. express allows for ratid development of node js applications.
4. express makes it easier to organize our application onto the MVC architecture.

## API:

Application Programming Interface, a piece of software that can be used by another piece of software, in order to allow
application to talk to each other.

- Web Apis:

Database -> JSON data -> API [web browser, ios app, android app, desktop app etc]

web APIs, where we simply built an app that sends data to a client whenever a request comes in. Imagine we have our app running on a server and we have a client. So in fact, we effectively have two pieces of software talking to each other.
APIs aren't only used to send data, and aren't always related to web development or JavaScript. The application in API can actually mean many different things as long as the piece of software is relatively stand alone.

Take for example, the Node File System, or the HTTP Modules. We can say that they are small pieces of software and we can use them, we can interact with them by using their API. For example, when we use the readfile function from the FS Module, we are actually using the FS API. And that's why you will sometimes hear the term node APIs. And that usually simply refers to the core node modules that we can interact with.

another example, let's say we create a class in any programming language like Java and then add some public methods or properties to it. These methods will then be the API of each object created from that class because we're giving other pieces of software the possibility of interacting with our initial piece of software, the objects, in this case.

You see, API has actually a broader meaning than just building web APIs.

## REST:

REST, which stands for Representational States Transfer, is basically a way of building web APIs in a logical way, making them easy to consume.

- REST Architecture:

1. Separate API into logical resources - the key abstraction of information in REST is a resource, and therefore all the data that we wanna share in the API should be divided into logical resource.

Now, what actually is a resource?

Well, in the context of REST, it is an object or a representation of something which has some data associated to it. any information that can be named can be a resourcee.

For example, tours, or users, or reviews in the case of the example that we are following.

So basically, any information that can be named can be a resource, alright. It just has to be a name, though, not a verb.

2. Expose structured. resource-based URLs - Now, we need to expose, which means to make available, the data using some structured URLs that the client can send a request to.

https://www.natours.com/addNewTour or /getTour, /getTourByUser etc

This entire address is called the URL and this /addNewTour is called an API Endpoint.

3. Use HTTP methods -

Now, there's actually something very wrong with these endpoints here because they really don't follow the third rule which says that we should only use the HTTP methods in order to perform actions on data. So, endpoints should only contain our resources and not the actions that can be performed on them because they will quickly become a nightmare to maintain.

/getTour -> /tours [GET]

So this /getTour endpoint is to get data about a tour. And so we should simply name the endpoint /tours and send the data whenever a get request is made to this endpoint. So in other words, when a client uses a GET HTTP method to access the endpoint.
it's a common practice to always use the resource name in plural which is why I have /tours here and not /tour.

/addNewTour -> /tours [POST]

The only difference is really the HTP method that is used for the request. If the /tours endpoint is accessed with GET,
we send data to the client. But if the same endpoint is accessed with POST, we expect data to come in with a request,so that we can then create a new resource on the server side.

/updateTour -> /tours/1 [PUT] or /tours/id=1 [PATCH]

The difference between them is that with PUT, the client is supposed to send the entire updated object, while with PATCH, it is supposed to send only the part of the object that has been changed.

/deleteTour -> /tours/1 [DELETE]

GET -> fetch data form server
POST -> create a new resource
PUT / PATCH -> update an existing resource
DELETE -> delete existing resource

So these are the five HTTP methods that we can and should respond to when building our RESTful APIs so that the client can perform the four basic CRUD operations. So CRUD stands for Create, Read, Update and Delete.

/getToursByUser -> /users/3/tours [GET]

So this particular endpoint here could send data about all the tours that user number 3 has booked.

/deleteToursByUser -> /users/3/tours/9 [DELETE]

in the case of deleting, there could be a delete request to the same, requesting tour number 9 to be deleted from user number 3.

So there really are a tons of possibilities of combining resources like this.

4. Send data as JSON - Now, about the data that the client actually receives, or that the server receives from the client, usually, we use the JSON Data Format.

we usually do some simple response formatting before sending. There are a couple of standards for this and we're gonna use a very simple one called Jsend.

{
"status": "sucess",
"data": {
"id" : 5,
"name" : "surya"
}
}

wrapping the data into an additional object like we did here is called Enveloping, and it's a common practice to mitigate some security issues and other problems. Also, there are other standards for response-formatting that you can look into, like Jsend:API or the Odata JSON Protocol.

5. Be stateless - a RESTful API should always be stateless. So, what does stateless actually mean? Well, in a stateless RESTful API, all state is handled on the client and not on the server. And state simply refers to a piece of data in the application that might change over time.

Let's take the list with several pages as an example. And let's say that recurrently on page five and want to move forward to page six. So we could have a simple endpoint called /tours/nextPage and submit a request to it, right? But the server would then have to figure out what the current page is and based on that send the next page to the client. In other words, the server would have to remember the previous request. It would have to handle the state server side and that is exactly what we want to avoid in RESTful APIs, okay? Instead, in this case, we should create a /tours/page endpoint and paste the number six to it in order to request page number six. This way, we would then state on the client because on a client, we would already know that we're on page five and so all we had to do is to just add one and then request page number six. So the server doesn't have to remember anything in this case. All it has to do is to send back data for page number six as we requested. And by the way, statelessness and statefulness, which is the opposite, are very important concepts in computer science and application design in general. So, it's a good idea to actually have some understanding what a stateless API is and how it works.

## Middleware:

Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

It is those methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method.

- bodyParser.json() vs express.json()

Node/Express Framework has been used to install another piece of middleware in order for us to be able to read the “body” of an incoming JSON object. This piece of middleware was called body-parser and used to not be part of the Express framework.
When Express 4.0 was released they decided to remove the bundled middleware from Express and make them separate packages instead. The syntax then changed from app.use(express.json()) to app.use(bodyParser.json()) after installing the body-parser module.

```
// calling body-parser to handle the Request Object from POST requests
const bodyParser = require('body-parser');

// parse application/json, basically parse incoming Request Object as a JSON Object
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ extended: false }));

// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(bodyParser.urlencoded({ extended: true }));
```

body-parser was added back to Express in release 4.16.0. That means you don’t have to use bodyParser.json() anymore if you are on the latest release. You can use express.json() instead. Their own body-parser implementation is now included in the default Express package so there is no need for you to download another dependency.

```
// parse application/json, basically parse incoming Request Object as a JSON Object
app.use(express.json());

// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(express.urlencoded({ extended: false }));

// parse incoming Request Object if object, with nested objects, or generally any type.
app.use(express.urlencoded({ extended: true }));
```

express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());

express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());

## req.query and req.params

Req.params and req.query are like special notes attached to the web address (URL). They help the server understand what you want and respond accordingly. Req.params identifies specific details in the URL, while req.query adds extra instructions, like search criteria, to your request.

Take a look at the URL below:

/netflix/movies?name=TheNotebook&year=2004

/movies -> req.params

name=TheNotebook&year=2004 -> req.query

- req.params:

1. Resembles a subway station, just for your data
2. Prefixed with a colon(:) when writing routes

- req.query:

1. Used for searching, and sorting (for example, the user wants to get information on the Disney movies released after the 2010s)
2. Presented as key-value pairs
3. Written after a question mark(?)
