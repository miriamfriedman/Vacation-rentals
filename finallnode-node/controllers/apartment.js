
import Advertiser from "../models/advertiser.js"
import City from "../models/city.js"
import Category from "../models/category.js"
import Apartment from "../models/apartment.js"
//שליפת כל הדירות
export const getAllApartments = (req, res) => {
    Apartment.find()
        .populate({ path: "category", select: 'name' })
        .populate({ path: "city", select: 'name' })
        .populate({ path: "advertiser", select: 'email phone' })
        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//שליפת דירה עי קוד
export const getApartmentsById = (req, res) => {
    Apartment.findById(req.params.id)
        .populate({ path: 'category', select: 'name' })
        .populate({ path: "city", select: 'name' })
        .populate({ path: "advertiser", select: 'email' })
        .then(apartments => {
            if (!apartments) {
                return res.status(404).send({ error: `Apartments not found!` })
            }
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//שליפת דירות לפי קוד קטגוריה
export const getApartmentsBycategoryId = (req, res) => {
    Apartment.find().where(
        { category: { $eq: req.params.category } })
        .populate({ path: 'category', select: 'name' })
        .populate({ path: "city", select: 'name' })
        .populate({ path: "advertiser", select: 'email' })
        .then(apartments => {
            if (!apartments) {
                return res.status(404).send({ error: `Apartments not found!` })
            }

            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

//שליפת דירות לפי קוד מפרסם
export const getApartmentsByAdvertiser = (req, res) => {
    Apartment.find().where(
        { advertiser: { $eq: req.params.advertiser } })
        .populate({ path: 'category', select: 'name' })
        .populate({ path: "city", select: 'name' })
        .populate({ path: "advertiser", select: 'email phone' })
        .then(apartments => {
            if (!apartments) {
                return res.status(404).send({ error: `Apartments not found!` })
            }
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

//שליפת דירות לפי קוד עיר
export const getApartmentsBycityId = (req, res) => {
    Apartment.find().where(
        { city: { $eq: req.params.city } })
        .populate({ path: 'category', select: 'name' })
        .populate({ path: "city", select: 'name' })
        .populate({ path: "advertiser", select: 'email' })
        .then(apartments => {
            if (!apartments) {
                return res.status(404).send({ error: `Apartments not found!` })
            }

            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//הוספת דירה
export const addApartment = (req, res) => {
    const { name, picture, address, numBeds, more, price,
        advertiser, city, category } = req.body
    const newApartment = new Apartment({
        name,
        picture,
        address,
        numBeds,
        more,
        price,
        advertiser,
        city,
        category,

    })

    newApartment.save()
        .then(async apartment => {
            let x = await Category.findByIdAndUpdate(category, { $push: { aprtmentsArr: apartment._id } })
            let y = await City.findByIdAndUpdate(city, { $push: { aprtmentsArr: apartment._id } })
            let z = await Advertiser.findByIdAndUpdate(advertiser, { $push: { aprtmentsArr: apartment._id } })
            if (z && y && x) {
                return res.status(200).send({ message: `create apartment ${apartment._id} succeed!` })
            }
            res.status(200).send({ message: `create apartment ${apartment._id} succeed! updates arr failed!` })

        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

//עדכון דירה
export const updateApartment = (req, res) => {

    const { id } = req.params
    Apartment.findByIdAndUpdate(id, req.body, { new: true })
        .then(apartment => {
            res.status(200).send({ message: `update apartment ${apartment._id} succeed!`, apartment })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}
//מחיקת דירה
export const removeApartment = (req, res) => {

    const { id } = req.params

    Apartment.findByIdAndDelete(id)
        .then(async apartment => {
            let x = await Category.findByIdAndUpdate(apartment.category, { $pull: { aprtmentsArr: apartment._id } })
            let y = await City.findByIdAndUpdate(apartment.city, { $pull: { aprtmentsArr: apartment._id } })
            let z = await Advertiser.findByIdAndUpdate(apartment.advertiser, { $pull: { aprtmentsArr: apartment._id } })

            if (z && y && x) {
                return res.status(200).send({ message: `delete apartment ${apartment._id} succeed!` })
            }
            res.status(200).send({ message: `delete apartment ${apartment._id} succeed! updates arr failed!` })

        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}


// שליפת דירה עי כמות מיטות שגדולה מ...
export const getBigNumBeds = (req, res) => {
    Apartment.find()
        .populate({ path: 'category', select: 'title' })
        .populate({ path: "city", select: 'name' })
        .populate({ path: "advertiser", select: 'email' })
        .where(
            { numBeds: { $gt: req.params.numBeds } }
        )
        .then(apartments => {
            if (!apartments) {
                return res.status(404).send({ error: `Apartments not found!` })
            }
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

// שליפת דירה עי כמות מיטות ששווה ל...
export const getNumBeds = (req, res) => {
    Apartment.find()
        .populate({ path: 'category', select: 'title' })
        .populate({ path: "city", select: 'name' })
        .populate({ path: "advertiser", select: 'email' })
        .where(
            { numBeds: { $eq: req.params.numBeds } }
        )
        .then(apartments => {
            if (!apartments) {
                return res.status(404).send({ error: `Apartments not found!` })
            }
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
// שליפת דירה עי כמות מיטות קטן או שווה ...
export const getSmallNumBeds = (req, res) => {
    Apartment.find()
        .populate({ path: 'category', select: 'title' })
        .populate({ path: "city", select: 'name' })
        .populate({ path: "advertiser", select: 'email' })
        .where(
            { numBeds: { $lte: req.params.numBeds } }
        )
        .then(apartments => {
            if (!apartments) {
                return res.status(404).send({ error: `Apartments not found!` })
            }
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//שליפת דירות לפי מחיר גדול מ
export const getByBigPrice = (req, res) => {
    Apartment.find()
        .populate({ path: 'category', select: 'name' })
        .populate({ path: "city", select: 'name' })
        .populate({ path: "advertiser", select: 'email' })
        .where(
            { price: { $gt: req.params.price } }
        )
        .then(apartments => {
            if (!apartments) {
                return res.status(404).send({ error: `Apartments not found!` })
            }
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//שליפת דירות לפי מחיר קטן מ 
export const getBySmallPrice = (req, res) => {
    Apartment.find()
        .populate({ path: 'category', select: 'name' })
        .populate({ path: "city", select: 'name' })
        .populate({ path: "advertiser", select: 'email' })
        .where(
            { price: { $lte: req.params.price } }
        )
        .then(apartments => {
            if (!apartments) {
                return res.status(404).send({ error: `Apartments not found!` })
            }
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}