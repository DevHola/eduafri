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
export const forget = async (email) => {
  const user = await UserModel.findOne({email, provider: 'local'})
  if(!user) {
    throw new Error('User not found')
  }
  return user

}  
export const verify = (req, res, next) => {
    let token = null;
    if (req && req.headers.authorization != null) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      res.status(401).json({
        message: 'Missing Access Credentials'
      })
    }
    try {
      const decoded = jwt.verify(token, process.env.AUTH_ACCESS_PUBLIC_SECRET, { algorithm: 'RS256' })
      req.user = decoded
      next()
    } catch (error) {
      next(error)
    }
}