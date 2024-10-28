import UserModel from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({path: path.join(__dirname, '../', '.env')})
console.log(process.env.AUTH_ACCESS_TOKEN_EXPIRY)
export const getUserByEmail = async(email) => {
    return await UserModel.findOne({email})
}
export const getUserByID = async(id) => {
    return await UserModel.findOne({_id:id})
}
export const getUserByProviderid = async(id, provider) => {
  return await UserModel.findOne({provider:provider, provider_id:id})
}
export const createUser = async (data) => {
    const user = await UserModel.create(data)
    await user.save()
    return user
}
export const findOrCreate = async (data) => {
  let user = await getUserByProviderid(data.provider_id, data.provider)
  if(!user) {
    user = await createUser(data)
    await user.save()
    return user
  }
  return user
}
export const compareAuthObject = async (email, password) => {
    const user = await UserModel.findandValidate(email, password)
    if (!user) {
        throw new Error('incorrect credential')
      }
      return user;
}
export const authtoken = async (user) => {
     const token = await jwt.sign({id: user._id, email: user.email}, process.env.AUTH_ACCESS_PRIVATE_SECRET, { algorithm: 'RS256', expiresIn: parseInt(process.env.AUTH_ACCESS_TOKEN_EXPIRY, 10) })
     return token
}
export const resetAndVerify = async (user) => {
  const token = await jwt.sign({id: user._id}, process.env.RESET_PRIVATE_SECRET, { algorithm: 'RS256', expiresIn: parseInt(process.env.RESET_TOKEN_EXPIRY, 10) })
  return token
}
export const forgetAndVerify = async (email) => {
  const user = await UserModel.findOne({email, provider: 'local'})
  if(!user) {
    throw new Error('User not found')
  }
  return user
}
export const resetPassword = async (id, newpassword) => {
  return await UserModel.findByIdAndUpdate(id, { password: newpassword }, { new: true})
}  
export const verify = async (id) => {
  return await UserModel.findOneAndUpdate(id, { verified: true }, { new: true })
}
