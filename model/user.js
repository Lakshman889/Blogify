const {Schema,model}=require("mongoose");
const bcrypt=require("bcrypt")
const {createToken,verifyToken}=require("../services/authentication.js")

const userSchema=new Schema(
    {
        fullName:{
            type:String,
            required:true,
        },email:{
            type:String,
            required:true,
            unique:true,
        },password:{
            type:String,
            required:true,
        },role:{
            type:String,
            Enumerator:["USER","ADMIN"],
            default:"USER",
        },profileImageUrl:{
            type:String,
            default:"/images/user_avatar.jpg",
        }
    },
    {timestamps:true}
);

userSchema.pre("save",async function(){
    
    if(!this.isModified("password")) {
        return;
    }
    this.password=await bcrypt.hash(this.password,10);
});

userSchema.static("checkPasswordAndCreateToken",async function(email,password){
    const user=await User.findOne({email});
    if(!user)  throw new Error("User not found");
    
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) throw new Error("Invalid password");

    const token=await createToken(user);
    return token;
})

const User=model("user",userSchema);

module.exports=User;