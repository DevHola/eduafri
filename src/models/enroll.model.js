import mongoose, { mongo } from "mongoose";
const EnrollModel = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    start_date: [{
        type: Date,
        required: true,
        default: Date.now()
    }],
    type: {
        type: String,
        required: true
    },
    expected_expire_date: [{
        type: Date
    }],
    is_available: {
        type: Boolean,
        default: false,
        required: true
    }

}, {timestamps: true})
export default mongoose.model('enrollments', EnrollModel)