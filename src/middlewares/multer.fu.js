import multer from "multer";
import fs from 'fs'
const target_folder = './temp/thrillers'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(!fs.existsSync(target_folder)) {
            fs.mkdir(target_folder, error => error ? console.log(error) : console.log('You have created the target_directory'))
        }
        cb(null, target_folder)
    },
    filename: function (req, file, cb) {
        const suffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname + '_' + suffix)
    }
})
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['video/mp4', 'video/webm', 'video/mpeg'];
    if(allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Unsupported file type'), false)
    }

} 
const upload = multer({storage,fileFilter})
export default upload