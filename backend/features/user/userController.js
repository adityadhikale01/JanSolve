import User from "./users.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/tokenUtils.js";

export async function loginUser(req, res) {
  
        const { email, password } = req.body;

        // validation

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        // find user

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found!"
            });
        }

        // compare password

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid  password."
            });
        }

        // generate tokens

        const accessToken = generateAccessToken(user);

        const refreshToken = generateRefreshToken(user);

        // cookie for production 
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });


        //dev ok
        res.cookie("refreshToken", refreshToken, {

        });

        // response

        return res.status(200).json({

            accessToken,

            user: {

                _id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            },
            message: "Login successful ! ",
            success: true

        });

}

export async function refreshAccessToken(req, res) {
  console.log("reached here");
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      message: "Access token refreshed successfully",
      success: true,    
      accessToken,
    });


}

export  async function registerUser (req, res) {
    console.log("In Register Route");
    const { name, email, password } = req.body;
    console.log(req.body);
    const existingUser =await User.findOne({ email });
    console.log("In Register Route");
    //Staus code 400 indicates validation errors, so we handle it separately    
    if (existingUser) {
        return res.status(400).json({
        success: false,
        message: "User already exists with that email",
     });
    }
     if(!existingUser){
        console.log("creating user");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("createing user");
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        console.log("saveing user:",newUser); 
        await newUser.save();
        console.log("user save");
        return res.status(201).json({
            message: "User registered successfully",
        });
     
      }
}

export function logoutUser(req, res) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
}
