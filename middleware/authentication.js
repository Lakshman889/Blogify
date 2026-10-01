const {verifyToken}=require("../services/authentication.js");


function checkForAuthenticationCookie(tokenName){
    return async (req,res,next)=>{
       
        const tokenvalue=req.cookies[tokenName];
        if(!tokenvalue) return next();

        try{
            const userPayload=await verifyToken(tokenvalue);
            req.user=userPayload;
        }catch(er){ }
        next();}
}

module.exports=checkForAuthenticationCookie;