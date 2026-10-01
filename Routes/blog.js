const {Router}=require("express");
const Blog=require("../model/blog.js");
const Comment=require("../model/comment.js");
const multer=require("multer");

const router=Router();
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/uploads");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
});

const upload=multer({
    storage,
    fileFilter:function(req,file,cb){
        console.log(file);
        if(file.mimetype==="image/jpeg"||file.mimetype==="image/png"){
            console.log("hh")
            cb(null,true);
        }
        else{
        cb(new Error("only jpeg and png file allowed..."));
        }
    },
    limits:{
        fileSize:5*1024*1024,
    }
});


router.get("/addBlog",(req,res)=>{
    console.log("request..")
    return res.render("addBlog",{user:req.user});
})
router.post("/addBlog",upload.single("coverImageURL"),async (req,res)=>{
    const {title,body}=req.body;
    console.log(req.file);
    const blog=await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImageURL:"/uploads/"+req.file.filename,
    })
    return res.redirect(`/blog/${blog._id}`);
});

router.get("/:id",async (req,res)=>{
     const blog=await Blog.findOne({_id:req.params.id}).populate("createdBy");
         const comments=await Comment.find({blogId:req.params.id}).populate("createdBy");
     return res.render("blog",{blog:blog,user:req.user,comments:comments});
})
module.exports=router;
