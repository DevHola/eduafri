import { Strategy as JWTStrategy } from 'passport-jwt';
import GoogleStrategy from 'passport-google-oauth20'
import { authtoken, findOrCreate, getUserByID } from '../services/user.js';
import passport from 'passport'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({path: path.join(__dirname, '../', '.env')})

const authExtractor = function(req) {
    let token = null;
    if (req && req.headers.authorization != null) {
        token = req.headers.authorization.split(' ')[1];
    }
    return token;
}

export const JStrategy = new JWTStrategy(
    {
      jwtFromRequest: authExtractor,
      secretOrKey: process.env.AUTH_ACCESS_PUBLIC_SECRET,
      algorithms: ['RS256']
    }, async (payload, done) => {
      try {
        const user = await getUserByID(payload.id)
        if (user !== null) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (error) {
        done(error, false)
      }
    }
  )
export const GGstrategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/auth/google/callback",
    passReqToCallback   : true
},  async function(request, accessToken, refreshToken, profile, done) {
    const data = {
    provider: profile.provider,
    provider_id: profile.id,
    name: profile.displayName,
    email: profile.emails[0].value }
    const user = await findOrCreate(data)
    const token = await authtoken(user)
    return done(null, {access: token});
})
