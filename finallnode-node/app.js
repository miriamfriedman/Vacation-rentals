import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import categoryRouter from './routers/category.js'
import cityRouter from './routers/city.js'
import apartmentRouter from './routers/apartment.js';
import advertiserRouter from './routers/advertiser.js';
import dotenv from 'dotenv'

const app = express()
const port = 7000

//מכיר את משתני הסביבה
dotenv.config()
app.use(bodyParser.json())
app.use(cors())
//התחברות למסד נתונים
mongoose.connect(process.env.LOCAL_URI)
    .then(() => {
        console.log('you are connected❤️  !!!!!!');
    })
    .catch(err => {
        console.log({ error: err.message });
    })

//routs
app.use('/category', categoryRouter)
app.use('/city', cityRouter)
app.use('/apartment', apartmentRouter)
app.use('/advertiser', advertiserRouter)

//ריצת הפרויקט
app.listen(port, () => {
    console.log(`my application is listening on http://localhost:${port}`);
})