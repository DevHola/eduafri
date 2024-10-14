import { reusableMail } from "../config/mail.js"
import { validationResult } from "express-validator"
import { authtoken, compareAuthObject, createUser, forget, getUserByEmail } from "../services/user.js"

export const Register = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }
    try {
        const { name, email, role, password } = req.body
        const checkexist = await getUserByEmail(email)
        if(checkexist) {
            return res.status(401).json({
                message: 'Email already exists'
            })
        }
        const data = {
            name, email, role, password
        }
        const user = await createUser(data)
        const token = await authtoken(user)
        res.status(200).json({
            message: 'Registration successful',
            token,
            registered: true
        })
    } catch (error) {
        next(error)
    }

}
export const login = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }
    try {
        const { email, password } = req.body
        const user = await compareAuthObject(email, password)
        const token = await authtoken(user)
        res.status(200).json({
            token: token
        })
        
    } catch (error) {
        if (error.message === 'incorrect credential'){
            res.status(401).json({
                message: 'incorrect credential'
              })
        } else {
            next(error)
        }
        
    }
}
export const authuser = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }
    try {
        if(req.user){
            res.status(200).json({
                user: req.user
                })
        }         
    } catch (error) {
        next(error)
    }
    
}
export const forgetPassword = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }
    try {
        const email = req.body.email
        const user = await forget(email)
        // mail & reset token function
        await reusableMail()
        return res.status(200).json({
            message: `a mail has been sent to ${user.email}`
        })
        
    } catch (error) {
        if(error.message === 'User not found'){
            return res.status(404).json({
                message: 'user account not found'
            })
        } else if (error.message === 'mailing failed'){
            return res.status(500).json({
                message: 'Mail sending failed'
            })
        }
        next(error)
    }

}
// verify reset token
// reset password