import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import {upload} from "../middelwares/multer.middleare.js";
import { verifyJWT } from "../middelwares/auth.middelware.js"


const router = Router();

router.route("/register").post( 
   upload.none(),
registerUser);

router.route("/login").post(loginUser);

//secure router

router.route("/logout").post(verifyJWT, logoutUser);

export default router;