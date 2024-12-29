import { Router } from "express";
import {addCategory, getAllCategory} from "../controllers/category.controller.js"

const router = Router();

router.route("/addCategory").post(addCategory);
router.route("/getAllCategory").get(getAllCategory);

export default router;