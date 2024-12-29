import { addProduct, getProducts } from "../controllers/proudct.controller.js";
import { Router } from "express";
import { upload } from "../middelwares/multer.middleare.js"
import { get } from "http";

const router = Router();

router.route("/addProduct").post(
    upload.single("productImage"),
    addProduct
)

router.route("/addProduct").get(getProducts);

export default router;