// import jwt from "jsonwebtoken";

// const authMiddleware = (req,res,next) => {

//   console.log("Inside authmiddleware",req.body);
//   const authHeader =
//     req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({
//       message: "No token",
//     });
//   }

//   const token =
//     authHeader.split(" ")[1];

//   try {
//     //jwt.verify is used to verify the token
//     const decoded = jwt.verify(
//       token,
//       process.env.ACCESS_TOKEN_SECRET
//     );
  
//     const user = {
//       id: decoded.id,
//       role: decoded.role,
//     };
//     req.user = user;
//     next();

//   } catch (err) {
//     return res.status(401).json({
//       message: "Invalid token",
//     });
//   }
// };

// export default authMiddleware;
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization token is required.",
    });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      success: false,
      message: "Invalid authorization format.",
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;