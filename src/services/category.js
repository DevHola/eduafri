import CategoryModel from "../models/category.model.js";
export const createCategory = async (data) => {
    const category = await CategoryModel.create(data)
    await category.save()
    return category
}
export const getCategoryByName = async (name) => {
    return await CategoryModel.findOne({name})
}
export const getCategoryByID = async (id) => {
    return await CategoryModel.findById(id)
}
export const editCategoryByID = async (id, data) => {
    return await CategoryModel.findByIdAndUpdate({_id:id}, data, {
        new: true
    })    
}