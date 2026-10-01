const {Router}=require("express");
const Comment=require("../model/comment.js");
const User = require("../model/user.js");
const Blog = require("../model/blog.js");


const router=Router();

router.post("/:id",async (req,res)=>{
    await Comment.create({
        comment:req.body.comment,
        blogId:req.params.id,
        createdBy:req.user._id,
    });
    return res.redirect(`/blog/${req.params.id}`);
})
module.exports=router;