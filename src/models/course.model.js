import mongoose from "mongoose";
const CourseModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    desc: {
        type: String,
        required: true,
        lowercase: true
    },
    level: {
        type: String,
        required: true,
        lowercase: true
    },
    total_ratings: {
        type: Number,
        required: true,
        default:0
    },
    total_enrolled: {
        type: Number,
        required: true,
        default:0
    },
    price: {
        type: Number,
        required: true
    },
    thriller: {
        type: String,
        required
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    languages_supported: [
        {
            type: String,
            required: true,
            lowercase: true
        }
    ],
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'categories'

        }
    ],
    tags: [
        {
            type: String,
            required: true,
            lowercase: true

        }]
}, {timestamps: true}) 
export default mongoose.model('courses', CourseModel)