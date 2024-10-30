import jwt from 'jsonwebtoken'
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
      const decoded = jwt.verify(token, process.env.RESET_PUBLIC_SECRET, { algorithm: 'RS256' })
      req.user = decoded
      next()
    } catch (error) {
      next(error)
    }
}
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
export const Resetpasswordmail = async (resettoken, email) => {
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