import { validationResult } from "express-validator";
import { createCourse, editCourse, getAllCourses, getCoursebyAuthor, getCourseByCategory, getCoursebyid, getCourseByTags, getCoursebytitle } from "../services/course";
export const create_Course = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) return res.status(400).json({errors: error.array()})
    try {
        const { title, desc, level, price, thriller, languages_supported, categories, tags } = req.body
        const user = req.user._id
        const data = {
            title,
            desc,
            level,
            price,
            thriller,
            user,
            languages_supported,
            categories,
            tags
        }
        const course = await createCourse(data)
        if(course){
            return res.status(200).json({
                message: `course-${course._id}`,
                status: 'created'

            })
        }
    } catch (error) {
        if(error.message === 'Unsupported file type') {

        } else {
            next(error)
        }
    }   
}

export const GetCourseById = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    }
    try {
        const { id } = req.params
        const course = await getCoursebyid(id)
        if(!course) {
            throw new Error('course not found')
        }
        return res.status(200).json(course)
        
    } catch (error) {
        if (error.message === 'course not found'){
            res.status(404).json({
                message: 'course not found'
            })
        } else {
            next(error)
        }
    }
}
export const GetCourseByTitle = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    try {
        const { title } = req.body
        const course = await getCoursebytitle(title)
        if(!course) {
            throw new Error('course not found')
        }
        return res.status(200).json(course)
        
    } catch (error) {
        if (error.message === 'course not found'){
            res.status(404).json({
                message: 'course not found'
            })
        } else {
            next(error)
        }
    }
    
}
export const GetCourseByTags = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }
    try {
        const { tags } = req.body
        const courses = await getCourseByTags(tags)
        if(courses.length < 0 ) {
            throw new Error('Zero Found')
        }
        return res.status(200).json(courses)
        
    } catch (error) {
        if (error.message === 'Zero Found'){
            res.status(404).json({
                message: '0 Courses found based on tags'
            })
        } else {
            next(error)
        }
    }
    
}
export const GetCoursesByCate = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }
    try {
        const { categories } = req.body
        const courses = await getCourseByCategory(categories)
        if(courses.length < 0){
            throw new Error('Zero Found')
        }
        return res.status(200).json(courses)
        
    } catch (error) {
        if (error.message === 'Zero Found'){
            res.status(404).json({
                message: '0 Courses found based on tags'
            })
        } else {
            next(error)
        }
    }
}
export const GetByAuthor = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }
    try {
        const { _id } = req.body
        const courses = await getCoursebyAuthor(_id)
        if(courses.length < 0 ){
            throw new Error('Zero Found')
        }
        return res.status(200).json(courses)
        
    } catch (error) {
        if (error.message === 'Zero Found'){
            res.status(404).json({
                message: '0 Courses found based on tags'
            })
        } else {
            next(error)
        }
    }   
}
export const EditCourseById = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(200).json({ errors: error.array()})
    }
    try {
        const id = req.params.id
        const { desc, level, price, thriller, categories, tags, languages_supported } = req.body
        const data = {
            desc,
            level,
            price,
            categories,
            tags,
            languages_supported
        }
        const course = await editCourse(data, _id)
        if(course){
            return res.status(200).json({ message: 'course updated' })
        }
        
    } catch (error) {
        next(error)
    }   
}
export const AllCourses = async (req, res , next) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            errors: error.array()
        })
    }
    try {
        const courses = await getAllCourses()
        res.status(200).json(courses)
    } catch (error) {
        next()
    }
    
}