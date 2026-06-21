import express from 'express';

import {
    addAdvertiser,
    login,
    getAllAdvertisers

} from "../controllers/advertiser.js"
import { checkAuth } from '../middlewares/middlewares.js';

const router = express.Router();

router.post('/add', addAdvertiser)
router.get('', getAllAdvertisers)
router.post('/login', login)

export default router;