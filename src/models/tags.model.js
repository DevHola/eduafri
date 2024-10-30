import mongoose from "mongoose";
const TagsModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    desc: {
        type: String,
        required: true
    }

}, {timestamps: true})
export default mongoose.model('tags', TagsModel)