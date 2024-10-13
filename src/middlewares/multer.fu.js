import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './temp/thrillers')
    },
    filename: function (req, file, cb) {
        const suffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        cb(null, file.filename + '_' + suffix)
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
export default upload = multer({storage,fileFilter})