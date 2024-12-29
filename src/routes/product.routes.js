import { addProduct } from "../controllers/proudct.controller.js";
import { Router } from "express";
import { upload } from "../middelwares/multer.middleare.js"

const router = Router();

router.route("/addProduct").post(
    upload.single("productImage"),
    addProduct
)

export default router;