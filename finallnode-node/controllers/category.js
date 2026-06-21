import Category from "../models/category.js"

//שליפת כל הקטגוריות
export const getAllCategorys = (req, res) => {

    Category.find()
        .then(categories => {
            res.status(200).send({ categories })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

//הוספת קטגוריה
export const createCategory = (req, res) => {

    const { name, aprtmentsArr } = req.body

    const newCategory = new Category({
        name,
        aprtmentsArr
    })

    newCategory.save()
        .then(category => {
            res.status(200).send({ message: `create category ${category._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

