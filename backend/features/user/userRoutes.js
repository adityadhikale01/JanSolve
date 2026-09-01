import express from 'express';
import validateUser from "./validateUser.js";
import  {WrapAsync}  from "../../utils/WrapAsync.js";
import { loginUser,refreshAccessToken,registerUser,logoutUser} from "./userController.js";

const router = express.Router();

router.post("/register",validateUser,WrapAsync( registerUser));

router.post("/login",WrapAsync(loginUser));
router.post("/logout",logoutUser);
router.post("/refresh",WrapAsync( refreshAccessToken));

export default router;