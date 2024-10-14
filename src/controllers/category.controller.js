import { validationResult } from "express-validator"
import { createCategory, editCategoryByID, getCategoryByID, getCategoryByName } from "../services/category"
export const create_Category = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            errors: error.array()
        })
    }
    try {
        const { name, desc } = req.body
        const data = {
            name,
            desc
        }
        await createCategory(data)
        res.status(200).json({
            message: `${name} created`
        })
        
    } catch (error) {
        next(error)
    }
}
export const getCategoryByname = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            errrors: error.array()
        })
    }
    try {
        const name = req.params.name
        const category = await getCategoryByName(name)
        return res.status(200).json(category)
    } catch (error) {
        next(error)
    }
    
}
export const getCategoryByid = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            errrors: error.array()
        })
    }
    try {
        const id = req.params.id
        const category = await getCategoryByID(id)
        return res.status(200).json(category)
    } catch (error) {
        next(error)
    }
    
}
export const editCategoryByid = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            errrors: error.array()
        })
    }
    try {
        const id = req.params.id
        const { name, desc } = req.body
        const data = {
            name,
            desc
        }
        const category = await editCategoryByID(id, data )
        return res.status(200).json({
            message: 'Category updated'
        })
    } catch (error) {
        next(error)
    }
    
}