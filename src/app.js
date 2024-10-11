import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import helmet from 'helmet'
import passport from 'passport'
import { JStrategy } from './middlewares/passport.js'
import { GGstrategy } from './middlewares/passport.js'
import { fileURLToPath } from 'url'
import router from './routes/index.route.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({path: path.join(__dirname, '.env')})

const app = express()
app.use(helmet())
app.disable('x-powered-by')
app.use(cors())
app.use(morgan('dev'))
app.use(passport.initialize());
passport.use(JStrategy)
passport.use(GGstrategy)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use((error, req, res, next)=> {
    const isProduction = process.env.NODE_ENV === 'production'
    return res.status(500).json({
        message: isProduction ? 'An unexpected error occurred.' : error.message,
        ...(isProduction ? null : { stack: error.stack })
      })
})
app.use('/api', router)

export default app