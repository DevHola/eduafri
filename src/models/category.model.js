import mongoose from "mongoose";
const CategoryModel = new mongoose.Schema({
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
export default mongoose.model('categories', CategoryModel)