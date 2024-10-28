import { reusableMail } from "../config/mail.js"
import { validationResult } from "express-validator"
import { authtoken, compareAuthObject, createUser, forgetAndVerify, getUserByEmail, resetPassword, resetAndVerify, verify } from "../services/user.js"

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

export const verificationmail = async (verifytoken, email) => {
    const url = `${process.env.FRONTEND_URL}/auth/token=${verifytoken}`
    const content = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
                background-color: #007bff;
                color: #ffffff;
            }
            .content {
                padding: 20px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                color: #ffffff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 4px;
                text-align: center;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                background-color: #f4f4f4;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Email Verification</h1>
            </div>
            <div class="content">
                <p>Hello,</p>
                <p>Thank you for registering with us. Please click the button below to verify your email address:</p>
                <p>
                    <a href="${url}" class="button">Verify Email</a>
                </p>
                <p>If you did not sign up for this account, please ignore this email or contact support if you have questions.</p>
                <p>Thank you,<br>The Team</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`
    const subject = 'ACCOUNT VERIFICATION'
    const from = process.env.FROM ?? 'no-reply@yourcompany.com'
    const data = {
      to: email,
      content,
      subject,
      from
    }
    return data
}
const Resetpasswordmail = async (resettoken, email) => {
    const url = `${process.env.FRONTEND_URL}/auth/token=${resettoken}`
    const content = `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Reset</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      margin: 0;
                      padding: 0;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #ffffff;
                      padding: 20px;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  }
                  .header {
                      text-align: center;
                      padding: 10px 0;
                      background-color: #007bff;
                      color: #ffffff;
                  }
                  .content {
                      padding: 20px;
                  }
                  .button {
                      display: inline-block;
                      padding: 10px 20px;
                      color: #ffffff;
                      background-color: #007bff;
                      text-decoration: none;
                      border-radius: 4px;
                      text-align: center;
                  }
                  .footer {
                      text-align: center;
                      padding: 10px 0;
                      background-color: #f4f4f4;
                      color: #777777;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1>Password Reset Request</h1>
                  </div>
                  <div class="content">
                      <p>Hello,</p>
                      <p>We received a request to reset your password. Click the button below to reset your password:</p>
                      <p>
                          <a href="${url}" class="button">Reset Password</a>
                      </p>
                      <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                      <p>Thank you,<br>The Team</p>
                  </div>
                  <div class="footer">
                      <p>&copy; 2024 Your Company. All rights reserved.</p>
                  </div>
              </div>
          </body>
          </html>`
    const subject = 'ACCOUNT PASSWORD RESET'
    const from = process.env.FROM ?? 'no-reply@yourcompany.com'
    const data = {
      to: email,
      content,
      subject,
      from
    }
    return data
  }