const express=require("express");
const path=require("path");
const mongoose=require("mongoose");
const userRouter=require("./Routes/user.js");
const blogRouter=require("./Routes/blog.js")
require("dotenv").config();
const cookieParser=require("cookie-parser");
const checkForAuthenticationCookie = require("./middleware/authentication.js");
const Blog = require("./model/blog.js");
const Comment = require("./model/comment.js");
const commentroute=require("./Routes/comment.js");


const app=express();
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("mongoDB connected..."))
.catch((err)=>console.log("error:",err));

app.use(express.static(path.resolve("./public")));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));


app.use("/user",userRouter);
app.use("/blog",blogRouter);
app.use("/comment",commentroute);
app.use("/",async (req,res)=>{
   if(!req.user) return res.render("home");
    const blogs=await Blog.find({});

    return res.render("home",{user:req.user,blogs:blogs});
});


console.log(process.env.PORT);
app.listen(process.env.PORT,()=>console.log("server started..."))