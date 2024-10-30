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
    thriller:[ {
        type: String,
        required: true
    }],
    image: {
        type: String,
        required: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    isfree: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    isPublished: {
        type: Boolean,
        default: false
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
    instructors: [
        {
            type: Object,
            required: true
        }
    ],
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

        }],
    is_periodic: {
        type: Boolean,
        default: boolean
    }
    
}, {timestamps: true}) 
export default mongoose.model('courses', CourseModel)