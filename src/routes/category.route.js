import express from 'express'
import passport from 'passport'
import { create_Category, getCategoryByid, getCategoryByname, editCategoryByid } from '../controllers/category.controller.js'
const caterouter = express.Router()
caterouter.post('/', passport.authenticate('jwt', { session: false }), create_Category)
caterouter.get('/:id', passport.authenticate('jwt', { session: false }), getCategoryByid)
caterouter.get('/:name', passport.authenticate('jwt', { session: false }), getCategoryByname)
caterouter.patch('/:id', passport.authenticate('jwt', { session: false }),  editCategoryByid)
export default caterouter
