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