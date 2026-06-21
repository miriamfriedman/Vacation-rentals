import express from "express";

import {
    addCity,
    getAllCitys,
} from "../controllers/city.js";
import { checkAuth } from "../middlewares/middlewares.js";


const router = express.Router()

router.get('', getAllCitys)
//הוספה מחייבת התחברות!!!!!!!!!!!!!!!
router.post('', addCity)

export default router