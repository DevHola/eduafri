import { Register, authuser, login } from "../controllers/auth.controller.js";
import express from 'express'
import passport from 'passport'
const router = express.Router()

router.post('/login',  login)
router.post('/register', Register)
router.get('/auth/user', passport.authenticate('jwt', { session: false }),  authuser)
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