import express from 'express';

import {
    addApartment,
    updateApartment,
    removeApartment,
    getAllApartments,
    getApartmentsById,
    getApartmentsBycategoryId,
    getBigNumBeds,
    getNumBeds,
    getSmallNumBeds,
    getByBigPrice,
    getBySmallPrice,
    getApartmentsBycityId,
    getApartmentsByAdvertiser


} from "../controllers/apartment.js"
import { checkAuth } from '../middlewares/middlewares.js';

const router = express.Router();

router.post('', addApartment)
router.patch('/:id', updateApartment);
router.delete('/:id', removeApartment);
router.get('', getAllApartments)
router.get('/:id', getApartmentsById)
router.get('/getbycategory/:category', getApartmentsBycategoryId)
router.get('/getBigNumBeds/:numBeds', getBigNumBeds)
router.get('/getSmallNumBeds/:numBeds', getSmallNumBeds)
router.get('/getNumBeds/:numBeds', getNumBeds)
router.get('/getBigPrice/:price', getByBigPrice)
router.get('/getSmallPrice/:price', getBySmallPrice)
router.get('/getByCity/:city', getApartmentsBycityId)
router.get('/getBySdvertiser/:advertiser', getApartmentsByAdvertiser)

export default router;