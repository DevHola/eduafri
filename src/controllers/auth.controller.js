import { reusableMail } from "../config/mail.js"
import { validationResult } from "express-validator"
import { authtoken, compareAuthObject, createUser, forgetAndVerify, getUserByEmail, resetPassword, resetAndVerify, verify } from "../services/user.js"
import { Resetpasswordmail, verificationmail } from "../middlewares/reusable.js"

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
export const verifyRequest = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }
    try {
        const email = req.body.email
        const user = await forgetAndVerify(email)
        if(user.verified === true) return res.status(200).json({message: 'account already verified'})
        const token = await resetAndVerify(user)
        console.log(token)
        const maildata = await verificationmail(token, user.email)
        await reusableMail(maildata)
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

export const forgetPassword = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }
    try {
        const email = req.body.email
        const user = await forgetAndVerify(email)
        const token = await resetAndVerify(user)
        console.log(token)
        const maildata = await Resetpasswordmail(token, user.email)
        await reusableMail(maildata)
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
export const verifyAndResetPassword = async (req, res, next) => {
    
    try {
        const user = req.user
        const { password } = req.body
        const updated = await resetPassword(user.id, password)
        console.log(updated)
        res.status(200).json({
            message: 'Reset Successful'
        })

    } catch (error) {
        next()
    }
    
} 
export const ResetPassword = async (req, res, next) => {
    
    try {
        const user = req.user
        const { password } = req.body
        await resetPassword(user.id, password)
        // revoke refresh & access token
        res.status(200).json({
            message: 'Reset Successful'
        })

    } catch (error) {
        next()
    }
    
}
export const verifynow = async (req, res, next) => {
    try {
        const user = req.user
        const updated = await verify(user.id)
        console.log(updated)
        res.status(200).json({
            message: 'Verification Successful'
        })
        
    } catch (error) {
        next(error)
    }
    
}

// test course routes all