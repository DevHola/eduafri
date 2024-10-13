import express from 'express'
import passport from 'passport'
import upload from '../middlewares/multer.fu'
import { AllCourses, create_Course, EditCourseById, GetByAuthor, GetCourseById, GetCourseByTags, GetCourseByTitle, GetCoursesByCate } from '../controllers/course.controller'
const courserouter = express.Router()
courserouter.post('/', upload.array("thriller", 3) , passport.authenticate('jwt', {session: false}), create_Course)
courserouter.get('/', passport.authenticate('jwt', { session: false }), AllCourses)
courserouter.get('/:id', passport.authenticate('jwt', {session: false}), GetCourseById)
courserouter.get('/title', passport.authenticate('jwt', { session: false }), GetCourseByTitle)
courserouter.get('/tags', passport.authenticate('jwt', { session: false }), GetCourseByTags)
courserouter.get('/categories', passport.authenticate('jwt', { session: false }), GetCoursesByCate)
courserouter.get('/author', passport.authenticate('jwt', { session: false }), GetByAuthor)
courserouter.patch('/:id',  passport.authenticate('jwt', { session: false }), EditCourseById)
export default courserouter