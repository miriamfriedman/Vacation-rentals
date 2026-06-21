import mongoose from "mongoose";
//קטגוריה 
const categorySchema = new mongoose.Schema({
    //שם
    name: {
        type: String,
        require: true,
        maxLength: 50
    },
    // מערך דירות
    aprtmentsArr: [{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }],

})

export default mongoose.model('Category', categorySchema)