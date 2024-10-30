import { validationResult } from "express-validator";
import { createCourse, editCourse, getAllCourses, getCoursebyAuthor, getCourseByCategory, getCoursebyid, getCourseByTags, getCoursebytitle } from "../services/course.js";
export const create_Course = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) return res.status(400).json({errors: error.array()})
    try {
        const { title, desc, level, price, thriller, languages_supported, categories, tags } = req.body
        const user = req.user._id
        let filearray = []
        for (let i = 0; i < req.files.length; i++){
            filearray.push(req.files[i].path)
        }
        const data = {
            title,
            desc,
            level,
            price,
            thriller: filearray,
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
        const { page, perPage } = req.query;
        page = parseInt(page, 10) || 1;
        perPage = parseInt(perPage, 10) || 10;
        const { tags } = req.body
        const courses = await getCourseByTags(tags, page, perPage)
        return res.status(200).json({
            courses,
            currentPage:page,
            perPage
        })
        
    } catch (error) {
       
            next(error)
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
        const { page, perPage } = req.query;
        page = parseInt(page, 10) || 1;
        perPage = parseInt(perPage, 10) || 10;
        const { categories } = req.body
        const courses = await getCourseByCategory(categories, page, perPage)
        return res.status(200).json({
            courses,
            currentPage: page,
            perPage: perPage
        })
        
    } catch (error) {
            next(error)
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
        const { page, perPage } = req.query;
        page = parseInt(page, 10) || 1;
        perPage = parseInt(perPage, 10) || 10;
        const { author } = req.body
        const courses = await getCoursebyAuthor(author, page, perPage)
        return res.status(200).json({
            courses,
            currentPage: page,
            perPage: perPage
        })
        
    } catch (error) {
            next(error)
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
        const course = await editCourse(data, id)
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
        const { page, perPage } = req.query;
        page = parseInt(page, 10) || 1;
        perPage = parseInt(perPage, 10) || 10;
        const courses = await getAllCourses(page, perPage)
        res.status(200).json({
            courses,
            currentPage: page,
            perPage,
        })
    } catch (error) {
        next()
    }
    
}