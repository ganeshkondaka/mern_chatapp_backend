const jwt = require("jsonwebtoken");
const get_validation=(req,res,next)=>{
    const auth=req.headers["authorization"];
    // console.log(req.headers["authorization"])
    if (!auth){
        return res.status(403).json({
            msg:"Unauthorized request , JWT token is require"
        })
    }
    try {
        const deoceduser= jwt.verify(auth,process.env.JWT_SECREAT);
        req.user=deoceduser;
        next();
    } catch (error) {
        return res.status(403).json({
            msg:"Unauthorized request or JWT token is wrong or expired"
        })
    }
}
module.exports={get_validation}