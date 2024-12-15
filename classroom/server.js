const express = require("express");
const app = express();
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
secret: "mysupersecretstring",
resave: false, 
saveUninitialized:true,
cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Convert to a Date object
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true,
},
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    
    if(name==="anonymous"){
    req.flash("error","user  not registered");
    }
    else{
        req.flash("success","user registered successfully");
    }
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    
    res.render("page.ejs",{name:req.session.name});
});

// app.use(session({secret: "mysupersecretstring",resave: false, saveUninitialized:true}));

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
  
//     res.send(`You snet a request ${rq.session.count}times`); 
// })

// app.get("/test",(req,res)=>{
//     res.send("test successfull");
// });


















// app.use(cookieParser());

// app.get("/greet",(req,res)=>{
//     let {name="anonymous"}= req.cookies;
//     res.send(`Hi ,${name}`);

// })

// app.get("/getcookies",(req,res)=>{
//     res.cookie("name","Suryansh");
//     res.cookie("greet","hello");
//     res.cookie("madein","namaste");
//     res.send("sent you a cookies");
// })


// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hi i am root!");
// })
app.listen("3000",()=>{
    console.log("server is listenning at 3000");
});