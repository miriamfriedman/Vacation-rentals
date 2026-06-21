import mongoose from "mongoose";
//דירה
const apartmentSchema = new mongoose.Schema({
    // שם
    name:{
    type:String,
    require:false,
    },
    description: String,
    //תמונה
    picture: {
        type: String,
    },
    //כתובת
    address: {
        type: String,
        require: true,
    },
    //כמות מיטות
    numBeds: {
        type: Number,
        maxLength: 10
    },
    //תוספים
    more: {
        type: String,
        maxLength: 100
    },
    //מחיר
    price: {
        type: Number,
        require: true,
    },
    //קוד מפרסם
    advertiser: {
        type: mongoose.Types.ObjectId,
        ref: 'Advertiser',
        require: true
    },
    //קוד עיר
    city: {
        type: mongoose.Types.ObjectId,
        ref: 'City',
        require: true
    },
    //קוד קטגוריה
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        require: true
    }

})

export default mongoose.model('Apartment',apartmentSchema)


