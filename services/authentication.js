const JWT=require("jsonwebtoken");

async function createToken(user){
    const payload={
        _id:user._id,
        profleImageUrl:user.profleImageUrl,
        role:user.role,
        fullName:user.fullName
    };
    const token=await JWT.sign(payload,process.env.JWT_SECRET_KEY);
    return token;
}

async function verifyToken(token){
    const user=await JWT.verify(token,process.env.JWT_SECRET_KEY);
    return user;
}

module.exports={createToken,verifyToken}