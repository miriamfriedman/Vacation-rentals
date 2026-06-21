import Advertiser from "../models/advertiser.js"
import jwt from 'jsonwebtoken'



//כניסת מפרסם
export const login = (req, res) => {
    const { email, password } = req.body
    Advertiser.find()
        .where({
            $and: [
                { email: { $eq: email } },
                { password: { $eq: password } }
            ]
        })
        .then(async advertisers => {
            if (advertisers.length == 0) {
                console.log('email not found!');
                return res.status(404).send({ error: `email and password are not match!` })
            }
            let [advertiser] = advertisers
            if (advertiser.password !== password) {
                console.log('password is not match!');
                return res.status(404).send({ error: `email and password are not match!` })
            }

            // create token
            // מקבלת שלשה פרמטרים:
            // 1. נתונים של המשתמש שנכנס
            // 2. מחרוזת יחודית למערכת
            // 3. אובייקט אפשרויות - ניתן להגדיר תוקף לטוקן
            // בשביל לתפוס את הטוקן שנוצר שלא יחזור אובייקט ריק await הגדרנו 
            // async מסיבה זו הוצרכנו להגדיר על הפונקציה החיצונית - שמפעילה את יצירת הטוקן
            const token = await jwt.sign(
                { email, advertiser: advertiser.email },
                process.env.SECRET,
                {
                    expiresIn: '1hr', // hours
                    // expiresIn: '10m', // minutes
                    // expiresIn: '30d', // days
                    // expiresIn: '20ms', // mili seconds
                    // expiresIn: '20s' // seconds
                }
            )

            res.status(200).send({ advertiser, token })

        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//הוספת מפרסם
export const addAdvertiser = (req, res) => {

    const { email, password, phone, 
        // additional_phone 
    } = req.body

    Advertiser.find()
        .where({ email: { $eq: email } })
        .then(advertisers => {
            if (advertisers.length > 0) {
                console.log(email);
                return res.status(400).send({ error: 'email exists!' })

            }

            const newAdvertiser = new Advertiser({
                email,
                password,
                phone,
                // additional_phone
            })

            newAdvertiser.save()
                .then(async advertiser => {
                    const token = await jwt.sign(
                        { email, password: advertiser.email },
                        process.env.SECRET,
                        {
                            expiresIn: '1hr', // hours
                            // expiresIn: '10m', // minutes
                            // expiresIn: '30d', // days
                            // expiresIn: '20ms', // mili seconds
                            // expiresIn: '60s' // seconds
                        }
                    )

                    res.status(200).send({ advertiser, token })
                })
                .catch(err => {
                    res.status(500).send({ error: err.message })
                })
        })
}

//get-לא נדרש
export const getAllAdvertisers = (req, res) => {

    Advertiser.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}