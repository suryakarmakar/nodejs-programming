[+] fs.writeFile and fs.writeFileSync
I earlier mentioned that there also is a write file method but we use write file sync, the sync here
stands for synchronous and this is a special method which will actually block code execution until this file is created.
Now working with files is available in two modes, here is the synchronous mode and we block execution of the next line of code until this file is done. Now for this short of a text we enter, this is super fast and we won't even notice it
but think about a huge file, a couple of hundreds of megabytes or even bigger, if you do something with that,
read it, copy it, whatever it is and you block the code execution,
then the next line and all the other code will not continue to run until that file operation is done
and even new incoming requests of other users would not be handled until that file operation is done
and you don't want that, therefore you should not use that syntax here.
You can if you know you'll only have a very short file operation but even then, it's better to use this
write file method here which actually does not just accept the path and the data but also a third argument and that is again such a callback,
so a function that should be executed when it's done.

[+] Streams and buffers concept

[+] understandning event driven code execution
const testing = () =>{ 1. register "listiner 1" but not execute the body now
res.on('listiner 1',() =>{
// execute this body in feature(its a call back)
}) 1. register "listiner 2" but not execute the body now
res.on('listiner 2',() =>{
// execute this body in feature(its a call back)
})
// execute console.log
console.log('hello')
}

[+] Nodejs lifecycle

[+] The event loop

[+] express.js
So what is express and why do we use it? Well I briefly mentioned it, writing all that server side logic is pretty complex,
just remember what we had to do to parse an incoming request. For extracting the body, we manually had
to listen to the data event, to the end event and then create a buffer which we in the end converted to a string and this was just one type of data we could get. If we get other kinds of data, like for example we get a file or differently structured data, then we would have to write new logic. Now expressjs helps us with that, it actually doesn't have a built-in way of handling or parsing that data but it makes it easy to install another package that can easily be hooked into our project that will then do the parsing for us and you will see what I mean in a second. We in general don't want to care about all these nitty gritty details, we want to focus on our code that defines our application, so the thing that really sets our application apart from other applications, our unique selling point you could say and we do use a framework for this, for all the heavy lifting. A framework is basically a set of helper functions but also a suite of tools and rules with which we work, so basically we have a clearly defined way or at least some outline on how we should structure our application, our code and how we should work with that framework to write clean code
and of course, I will teach you all of that for expressjs in this module. So expressjs helps us with that and this is why we will dive into it here.

[+] middleware

[+] next argument

app.use((req, res, next) => {})
this function you're passing is receiving yet another function here on the next argument and this next argument, basically this function you're receiving here has to be executed to allow the request to travel on to the next middleware.

[+] res.send()
but instead of doing this, there is a new utility function we can use, send. Send allows us to send well a response and actually this allows us to attach a body which is of type any,
you can still set one manually with set header of course, so you can always override this expressjs

[+]
app.use("/home", (req, res, next) => {
res.send(`<h1>Home Screen</h1>`);
});
and this is how we can use that middleware approach to control what is getting shown and the order here as well as the fact whether we are calling next or not matters a lot.

if you are sending a response, this is a good indication that you never want to call next too becaus you don't want to execute any other response related code just as before with vanilla nodejs, you don't want to send more than on response, this won't work and will result in an error.

[+] body-parser
parsing the req body
app.use(bodyParser.urlencoded({ extended: false }));
