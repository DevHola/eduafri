import mongoose from "mongoose";
const Ordermodel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    },
    ref: {
        type: String
    }
})

export default mongoose.model('order', Ordermodel)