const {Router}=require("express");
const User=require("../model/user.js");

const router=Router();

router.get("/signup",(req,res)=>{
    return res.render("signup")
});

router.get("/login",(req,res)=>{
    return res.render("login")
});

router.post("/signup",async (req,res)=>{
    const {fullName,email,password}=req.body;
    console.log(fullName,email,password)
   const result= await User.create({fullName,email,password});
   console.log(result);
   return res.send("User Created...")
});


router.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try{
   const token=await User.checkPasswordAndCreateToken(email,password);
      return res.cookie("token",token).redirect("/");
    }catch(e){
        console.log(e);
        res.render("login",{error:e.message});
    }
});

router.get("/logout",(req,res)=>{
    return res.clearCookie("token").redirect("/");
})

module.exports=router;