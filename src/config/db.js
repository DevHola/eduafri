import mongoose from "mongoose";
 export const connection = async () => {
    return await mongoose.connect(process.env.MONGO).then(()=>{
        console.log('connected')
    }).catch((error)=> {
        console.log(`Connection failed: ${error}`)
    })
}