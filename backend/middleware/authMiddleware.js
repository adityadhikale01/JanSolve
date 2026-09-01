import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next) => {

  console.log("Inside authmiddleware",req.body);
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token",
    });
  }

  const token =
    authHeader.split(" ")[1];

  try {
    //jwt.verify is used to verify the token
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
  
    const user = {
      id: decoded.id,
    };
    req.user = user;
    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;