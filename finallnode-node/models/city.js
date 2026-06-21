import mongoose from "mongoose";
//עיר
const citySchema = new mongoose.Schema({
    //שם עיר
    name: {
        type: String,
        require: true,
        maxLength: 50
    },
    //מערך דירות
    aprtmentsArr: [{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }],

})

export default mongoose.model('City', citySchema)