import mongoose from "mongoose";
//מפרסם
const advertiserSchema = new mongoose.Schema({
    //אימייל
    email: {
        type: String,
        require: true,
        maxLength: 50,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    //סיסמה
    password: {
        type: String,
        require: true,
        minLength: 6
    },
    //טלפון
    phone: {
        type: Number,
        require: true,
        maxLength: 10
    },
    //טלפון נוסף – לא חובה
    additional_phone: {
        type: Number,
        maxLength: 10
    },
    // מערך דירות
    aprtmentsArr: [{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
})


export default mongoose.model('Advertiser', advertiserSchema)