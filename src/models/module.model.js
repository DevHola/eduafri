import mongoose from "mongoose";
const ModuleModel = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    contents: [] // url, title, duration, resources for sub modules 
}, {timestamps: true})
export default mongoose.model('modules', ModuleModel)