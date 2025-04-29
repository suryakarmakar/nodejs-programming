## Node.js Basics:

### What is Node.js ?

Node.js is an open-source, cross-platform JavaScript runtime environment that allows JavaScript code to be executed outside of a web browser, typically on the server-side.
It was created by Ryan Dahl in 2009, with the goal of building highly scalable network applications that can handle many simultaneous connections with minimal overhead.

Internally, Node.js is powered by the V8 engine, the same JavaScript engine that runs inside the Chrome browser. However, Node.js extends V8 by adding additional core modules and bindings written in C and C++, which allow JavaScript to interact with the underlying operating system. Through this design, Node.js can perform tasks like reading from the file system, managing network connections, and handling processes — things that pure browser JavaScript cannot do on its own.

What makes Node.js truly special is its non-blocking, event-driven architecture. Unlike traditional server models where a thread is assigned per client (as in Java or PHP servers), Node.js operates on a single-threaded event loop. Instead of creating new threads for each request, Node.js uses asynchronous I/O to handle thousands or even millions of connections concurrently on a single thread. When a task (such as reading a file or querying a database) is requested, Node.js delegates that task to the underlying system or its internal libuv thread pool, allowing the main thread to continue executing other code. Once the task is completed, its associated callback is queued to be handled by the event loop. This design minimizes resource usage and maximizes performance, making Node.js an excellent choice for I/O-heavy, real-time, and scalable network applications.

Another important feature of Node.js is its npm (Node Package Manager) — the largest ecosystem of open-source libraries in the world. npm allows developers to install, manage, and share reusable packages of code, which accelerates application development dramatically. Through npm, Node.js developers have access to millions of libraries for tasks ranging from web frameworks (like Express.js) to authentication, real-time communication (like Socket.io), and much more.

In terms of practical usage, Node.js is often used to build:

1. Web servers and RESTful APIs
2. Real-time applications (like chat apps, collaborative tools)
3. Microservices architectures
4. Serverless applications
5. Proxy servers
6. Command-line tools
7. Streaming services (audio/video)

Because of its event-driven model, lightweight execution, and scalability, Node.js has been widely adopted by major companies such as Netflix, LinkedIn, PayPal, Uber, and many others.

However, it's important to understand that Node.js is not ideal for CPU-intensive tasks (like complex image processing or large computational algorithms) because those tasks can block the single-threaded event loop, leading to degraded performance. For CPU-heavy work, Node.js provides modules like worker_threads that enable actual multi-threaded execution, but careful design is still required.

In summary:

1. Node.js enables JavaScript on the server.
2. It is built on V8, libuv, and C++ bindings.
3. It uses a single-threaded event loop with non-blocking I/O for handling concurrency efficiently.
4. It has a vast npm ecosystem that powers its flexibility and adoption.
5. It is ideal for high-concurrency, I/O-bound, low-latency applications — but not for heavy CPU computation without extra design.

Thus, Node.js transformed JavaScript from a browser-only language into a full-stack, server-side programming powerhouse.

### How Node.js Runs JavaScript Outside the Browser ?

Introduction

Traditionally, JavaScript was a language designed for browsers.
Browsers like Chrome, Firefox, and Safari had their own JavaScript engines (like V8, SpiderMonkey, etc.) that interpreted and executed JavaScript code inside the browser.

However, Node.js came and liberated JavaScript from the browser.
It made it possible to use JavaScript to build server-side applications — handling files, network requests, databases, processes, and more — all things browsers normally don't expose directly to JavaScript.

But how exactly does Node.js make this happen?
The answer lies in how it embeds and extends the JavaScript engine and provides extra capabilities beyond what a browser does.

Let's break it down carefully.

1. Node.js Embeds the V8 JavaScript Engine

At the heart of Node.js is the V8 Engine, developed by Google. V8 is a high-performance JavaScript engine written in C++, and it is the same engine that powers the Chrome browser.

V8's job is to:

1. Parse JavaScript code (syntax analysis)
2. Compile JavaScript into machine code using a Just-In-Time (JIT) compiler
3. Execute the machine code directly on the CPU

When you install Node.js, you are essentially installing:

1. The V8 engine (to run JavaScript)
2. A C++ runtime (Node.js's own system)
3. Core libraries (to handle networking, files, events, etc.)

Thus, when Node.js starts, it boots up the V8 engine inside a C++ program, giving it the ability to interpret and run any JavaScript file you provide.

2. Node.js Provides Extra APIs via C++ Bindings

While V8 can run pure JavaScript, it does not provide access to system-level features like:

1. Reading files from disk
2. Opening network sockets
3. Listening on a port
4. Performing cryptographic operations
5. Creating child processes

Browsers also don't allow JavaScript direct access to the operating system — because of security reasons. Browsers wrap JavaScript with browser-specific APIs like fetch, DOM manipulation, etc.

Node.js had to create its own set of APIs. To solve this, Node.js does two things:

- a. C++ Bindings:

Node.js is written in C and C++. It uses bindings between JavaScript and C++ code.

1. The C++ side handles low-level system operations.
2. It exposes a JavaScript interface (called "bindings") that looks like normal JavaScript functions.
3. When you call a Node.js function like fs.readFile(), you are actually invoking a C++ function behind the scenes, through a binding layer.

This way, JavaScript code running inside Node.js can:

1. Read and write files
2. Make HTTP requests
3. Perform network communication
4. Create timers
5. Access environment variables
6. Spawn child processes

Thus, Node.js extends the limited V8 JavaScript environment with a powerful set of system-level features.

- b. Built-in Modules:

Node.js bundles many core modules written in JavaScript + C++:

1. fs — File System operations
2. http — HTTP server and client
3. net — TCP and IPC servers
4. crypto — Cryptographic functions
5. stream — Stream interfaces
6. events — EventEmitter for event-driven programming
7. os — Information about operating system
8. path — Path utilities

All these modules use C++ bindings under the hood to call native OS functionality, but are exposed to you as familiar JavaScript libraries.

- 3. The Event Loop and Non-Blocking Architecture:

In browsers, JavaScript is mainly event-driven too — think of onclick handlers, etc. Node.js takes this idea and builds an entire server environment on it. It uses an event loop powered by libuv, a C library that provides:

1. Non-blocking I/O
2. Thread pool for heavy tasks
3. Timers
4. Networking operations

When you execute JavaScript in Node.js, it:

1. Runs synchronous JavaScript code immediately via V8
2. For asynchronous operations (like file reading, network requests):
   1. Offloads them to libuv or system kernel
   2. Registers a callback
   3. Continues executing other code without waiting
3. When async operations complete, the event loop picks up the registered callbacks and runs them.

Thus, Node.js can handle thousands of concurrent connections without blocking even though it runs JavaScript on a single main thread.

4. Bringing It All Together

Here’s the complete flow when you run a Node.js script:

1. Startup: Node.js starts a C++ program that initializes V8, libuv, and loads Node.js core modules.

2. Parsing: Your JavaScript file is parsed and compiled into machine code by the V8 engine.

3. Execution: Node.js executes your JavaScript code synchronously. If an asynchronous operation is encountered (e.g., reading a file, network request), it is offloaded.

4. Handling Async: libuv handles the async operation. Node.js continues executing other code without blocking.

5. Event Loop: When async operations finish, their callbacks are added to the task queue, and the event loop picks them up and executes.

6. Process Exit: When no more work (timers, network handles, async operations) is left, Node.js exits the process cleanly.

### How Node.js Works Internally ?

Introduction

At first glance, Node.js seems simple: you write JavaScript code, run it with node, and things just work.
But internally, Node.js is a very sophisticated system built with:

1. V8 Engine (for running JavaScript code)
2. libuv (for event loop, thread pool, async I/O)
3. C++ bindings (to bridge JavaScript and system-level tasks)
4. Internal C++ and JavaScript libraries (for modules like HTTP, FS, Streams, etc.)

These components orchestrate together to create the famous non-blocking, event-driven, single-threaded but highly concurrent Node.js environment.

Let’s now go step-by-step to deeply understand how Node.js really works internally.

1. Bootstrapping Phase (Starting Node.js)

When you type:

```bash
node app.js
```

the following sequence happens:

1. Node.js C++ core (main program) starts running.
2. It initializes:
   1. The V8 engine (compiles and executes JavaScript)
   2. libuv (manages event loop, async I/O)
   3. Internal libraries (written in C++ and JS) like fs, net, http, stream, crypto, etc.
3. It sets up global objects like: global, process, Buffer, console
4. It loads your JavaScript file (app.js) and sends it to V8 for parsing and execution.

5. Code Execution Phase (V8 Engine Execution)

Once your script (app.js) is loaded:

1. V8 parses your JavaScript code into an Abstract Syntax Tree (AST).
2. Then, it compiles your JavaScript into machine code (using JIT compilation).
3. V8 executes your code synchronously — line by line.

When it encounters synchronous code like:

```js
console.log("Hello World");
```

V8 immediately executes it.

When it encounters asynchronous code like:

```js
fs.readFile("file.txt", (err, data) => {
  console.log(data.toString());
});
```

something more interesting happens — because Node.js does NOT wait for I/O operations.

3. Offloading to libuv (Non-blocking I/O)

Node.js uses libuv, a C library, to handle non-blocking operations.

When V8 encounters async operations like:

```
fs.readFile()
http.get()
setTimeout()
process.nextTick()
```

Node.js does not handle them directly inside the V8 thread. Instead, it delegates these tasks to libuv and native C++ APIs.

Depending on the type of async task:

Type of Async Work | Who Handles It?

File System (e.g., fs) | libuv Thread Pool (workers)

TCP/UDP Networking | OS kernel (via libuv)

Timers (setTimeout) | libuv internal queue

DNS without Cache | libuv thread pool

HTTP Requests (client) | OS or libuv

4. Event Loop (The Heart of Node.js)

Once asynchronous operations are offloaded, Node.js enters its event loop phase. The event loop is a C++/JavaScript hybrid structure managed by libuv.

It continuously monitors multiple phases, such as:

Phase | Description

Timers Phase | Executes callbacks scheduled by setTimeout() and setInterval().

Pending Callbacks Phase | Executes I/O callbacks deferred to the next loop cycle.

Idle, Prepare Phase | Internal use only (prepare for next operations).

Poll Phase | Waits for new I/O events (reading from sockets, files, etc.).

Check Phase | Executes setImmediate() callbacks.

Close Callbacks Phase | Handles closed resources (e.g., sockets).

5. Thread Pool (Handling Expensive Work):

Node.js is single-threaded in the JavaScript layer, but multi-threaded underneath through libuv’s thread pool.

The thread pool has 4 threads by default (can be changed using the UV_THREADPOOL_SIZE environment variable)

It is used to handle CPU-intensive or blocking I/O tasks such as:

1. File system operations (fs.readFile(), fs.writeFile())
2. DNS lookups (without caching)
3. Crypto operations (crypto.pbkdf2, crypto.randomBytes)
4. Compression (zlib)

So when you do something like:

```js
fs.readFile("bigFile.txt", callback);
```

it doesn’t block the main thread — instead, the thread pool picks it up, does the I/O operation, then when ready, schedules the callback on the event loop. Thus, Node.js achieves asynchronous behavior even for blocking tasks by offloading them.

6. Native Module System

Node.js has a powerful Module System based on:

1. CommonJS (require()) modules
2. ESM (ECMAScript Modules, import/export)

When you do:

```js
const fs = require("fs");
```

Node.js:

1. Resolves the module (checks core modules, node_modules, file paths)
2. Loads it
3. Caches it to avoid reloading
4. Exposes it as a JavaScript object.
5. This module loading is done synchronously when required during execution.

6. Exiting the Process

The Node.js process keeps running as long as:

1. There are pending timers
2. There are open sockets or file descriptors
3. There are callbacks waiting to be executed

Once the event loop has no more work, Node.js gracefully exits. Alternatively, you can manually exit with process.exit(code).

### Life Cycle of Node.js:

Introduction

Node.js is a server-side runtime environment built on top of Google’s V8 JavaScript engine. It allows developers to run JavaScript code outside of a browser. Internally, Node.js is a complex system that uses several components working together:

1. The V8 engine (to run JavaScript code),
2. The libuv library (to handle asynchronous I/O and manage a thread pool),
3. C++ bindings (for system-level operations),
4. Other internal libraries (HTTP, DNS, File system modules, etc.).

Node.js is famous for its non-blocking, asynchronous event-driven architecture, but internally it uses a mix of single-threaded JavaScript execution and multi-threaded background operations.

Understanding its full lifecycle requires a deep look into how it initializes, runs, handles async tasks, and finally exits.

1. Initialization Phase -

When a Node.js process starts:

1. The V8 engine is initialized. This is the JavaScript engine developed by Google for Chrome, and it is responsible for compiling and executing JavaScript code.

2. The libuv library is initialized. libuv is a C-based library responsible for abstracting asynchronous I/O operations and providing the event loop. It also creates a thread pool, which is usually configured with 4 threads by default.

3. Node.js initializes its internal core modules (like fs, http, crypto, etc.), and loads system-level bindings.

4. It parses environment variables, command-line arguments, and configures process-wide settings.

5. Finally, it loads and starts executing the user’s JavaScript code (the entry file).

At this stage, all setup for running JavaScript code and handling asynchronous operations is completed.

2. Execution of Top-Level JavaScript Code -

Once Node.js finishes initialization:

1. It starts executing the top-level JavaScript code immediately.
2. This top-level code is executed synchronously.
3. If during execution, asynchronous operations are encountered (such as file reading, HTTP requests, timers, etc.), Node.js offloads these tasks to either:
   1. The OS kernel (for low-level networking or socket operations), or
   2. The libuv thread pool (for filesystem access, DNS lookup, compression, or crypto operations).

The key point here is that Node.js does not wait for these asynchronous operations to complete. Instead, it registers a callback function and moves on to executing the next line of code. At this point, the event loop starts running.

3. The Event Loop Phase -

The Event Loop is the heart of Node.js — it is a mechanism that constantly checks if there is any work to be done (callbacks to be executed).

The event loop is designed to run in phases, and each phase has a specific type of callback that it is responsible for executing.

The phases run in a loop, continuously checking and executing tasks, as long as there are pending operations.

The event loop phases are:

a. Timers Phase

1. Executes callbacks scheduled by setTimeout() and setInterval().
2. Node.js checks if the timer delay has elapsed and then executes the timer callback.

b. Pending Callbacks Phase

1. Executes system-level callbacks that were deferred to the next loop iteration.
2. Examples include certain errors from TCP servers.

c. Idle, Prepare Phase

1. Internal operations used by Node.js and libuv to prepare for the poll phase.
2. Not directly visible to users.

d. Poll Phase

1. The most important phase.
2. Node.js retrieves new I/O events (such as incoming network data, completed file reads, etc.).
3. If callbacks are ready, it executes them.
4. If there are no immediate events to handle:
   1. If timers are due, Node.js moves to the Timers Phase.
   2. Otherwise, Node.js will block and wait for I/O events.

e. Check Phase

1. Executes callbacks registered with setImmediate().

f. Close Callbacks Phase

1. Executes cleanup callbacks for resources like sockets (e.g., socket.on('close')).
2. This cycle repeats continuously until there is no more work to do.

3. Microtasks and NextTick Queue -

Outside of the normal event loop phases, Node.js manages microtasks, which are very small units of work that are given higher priority.

There are two types of microtasks:

1. process.nextTick() Queue: Tasks scheduled via process.nextTick() are run immediately after the current operation, before any I/O or timers.

2. Promise Microtasks Queue: .then(), async/await, and resolved Promises are processed after process.nextTick() but still before moving to the next event loop phase.

The full order is:

```
Synchronous Code → process.nextTick() → Promise callbacks → Event Loop Phase
```

This priority system is critical because heavy use of process.nextTick() can starve the event loop (causing delays in I/O).

5. The Thread Pool (libuv Thread Pool) -

Not all operations in Node.js are handled by the event loop directly.

When Node.js needs to perform CPU-intensive or slow I/O operations (like filesystem access, DNS lookups without OS optimization, compression, encryption), it delegates these to the libuv thread pool.

1. By default, this pool has 4 worker threads.
2. Operations are distributed across these threads in parallel.
3. When a thread completes its work, it places a notification on the event loop’s task queue, and the event loop picks up the callback in a future iteration.

Example of Thread Pool Usage:

```
fs.readFile()
crypto.pbkdf2()
zlib compression
```

Important: If the thread pool is saturated (all 4 threads are busy), new tasks must wait, causing potential delays.

6. Non-Blocking vs Blocking Operations -

In Node.js:

1. Non-Blocking: Most operations are designed to be non-blocking by using callbacks, Promises, or async/await. The main thread never waits for them; instead, work continues, and a callback is triggered once ready.

2. Blocking: Some operations, like fs.readFileSync(), are synchronous and block the event loop until completed. These should be avoided in production servers because they prevent handling concurrent requests.

--

7. Garbage Collection (V8 GC) -

Node.js uses V8’s automatic garbage collector to reclaim memory used by objects no longer in use.

1. Garbage collection runs periodically in the background.
2. GC can introduce small pauses (stop-the-world pauses), but modern V8 is highly optimized to minimize impact.

GC typically happens when:

1. Memory usage crosses a threshold.
2. Idle time is detected (event loop not busy).

--

8. Exit and Shutdown -

Node.js will exit the process when:

1. No timers are pending.
2. No active handles (such as sockets or servers) are open.
3. No pending microtasks or background tasks are left.

Before shutdown:

1. 'beforeExit' event is emitted.
2. If new work is scheduled inside 'beforeExit', the event loop resumes.
3. After finishing all remaining work, the 'exit' event is emitted.
4. The process terminates.

###
