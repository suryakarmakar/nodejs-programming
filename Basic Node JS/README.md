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
