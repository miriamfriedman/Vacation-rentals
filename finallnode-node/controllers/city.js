import City from "../models/city.js"

//שליפת כל הערים
export const getAllCitys = (req, res) => {

    City.find()
        .then(citys => {
            res.status(200).send({ citys })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

//הוספת עיר
export const addCity = (req, res) => {

    const { name, aprtmentsArr } = req.body

    const newCity = new City({
        name,
        aprtmentsArr
    })

    newCity.save()
        .then(city => {
            res.status(200).send({ message: `add city ${city._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

