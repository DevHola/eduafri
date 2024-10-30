import mongoose from "mongoose";
const ContentModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    url: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    resources: {
        type: String
    }

}, {timestamps: true})
export default mongoose.model('contents', ContentModel)