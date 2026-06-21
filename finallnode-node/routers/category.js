import express from "express";
// import {categoryExists
//  } from "../middlewares/middlewares.js"
import {
    createCategory,
    getAllCategorys,
} from "../controllers/category.js";
import { checkAuth } from "../middlewares/middlewares.js";


const router = express.Router()

router.get('', getAllCategorys)
//הוספה מחייבת התחברות!!!!!!!!!!!!!!!
router.post('', createCategory)

export default router