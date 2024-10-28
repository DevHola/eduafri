import { Register, ResetPassword, authuser, forgetPassword, login, verifyAndResetPassword, verifyRequest, verifynow } from "../controllers/auth.controller.js";
import express from 'express'
import passport from 'passport'
import { login_validation, register_validation } from "../middlewares/validation.js";
import { verify } from "../middlewares/reusable.js";
const router = express.Router()

router.post('/login', login_validation, login)
router.post('/register', register_validation, Register)
router.get('/auth/user', passport.authenticate('jwt', { session: false }),  authuser)
router.patch('/auth/password', passport.authenticate('jwt', { session: false}), ResetPassword)
router.post('/forget', forgetPassword)
router.post('/verify', verifyRequest)
router.patch('/verify', verify, verifynow)
router.patch('/reset/password', verify, verifyAndResetPassword)

router.get('/', (req, res) => {
    res.send("<button><a href='/api/auth/google'>Login With Google</a></button>")
});
router.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ]
  }));
router.get('/auth/google/callback', passport.authenticate( 'google', {
     session: false,
     failureRedirect: '/auth/callback/failure'
  }), (req, res) => {
    res.json({
        accesstoken: req.user.access
    })
  });
router.get('/auth/callback/failure' , (req , res) => {
    res.status(401).json({
        message: 'Authentication failed'
    });
})
export default router