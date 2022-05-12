import jwt from 'jsonwebtoken'
const verifyToken=(req,res,next)=>{
    console.log('cookies from req:',req.cookies.access_token)
    const token=req.cookies.access_token

    if (!token) {
        return res.status(403).send("A token is required for authentication");
      }
      try {
        const decoded = jwt.verify(token,process.env.TOKEN_KEY);
        req.userId = decoded.user_id;
        console.log('decoded:',decoded)
        return next()
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
      
}
export default verifyToken