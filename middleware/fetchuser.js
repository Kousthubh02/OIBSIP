const jwt=require('jsonwebtoken')
const JWT_SECRET = "kosu is a bad boy";

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        return res.status(401).send({message:'Access Denied!'})
    }
   try{
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user
    next()
   }
   catch(error){
    res.status(401).send({error:"Token invalid"})
   }

}

module.exports=fetchuser