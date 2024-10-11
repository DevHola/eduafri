import mongoose from "mongoose";
const reviewModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    rating: {
        type: Number,
        default: 0,

    },
    text: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses'
    }

}, {timestamps: true})
export default mongoose.model('reviews', reviewModel)