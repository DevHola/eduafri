import CourseModel from "../models/course.model.js";
export const createCourse = async (data) => {
    const course = await CourseModel.create(data)
    await course.save()
    return course
}
export const getCoursebyid = async (id) => {
    return await CourseModel.findById(id).populate(['categories', 'user']).exec()
}
export const getAllCourses = async (page, perPage) => {
    return await CourseModel.find().populate(['categories', 'user']).skip((page - 1) * perPage ).limit(perPage).exec()
}
export const getCoursebytitle = async (title) => {
    return await CourseModel.findOne(title).populate(['categories', 'user']).exec()
}
export const getCoursebyAuthor = async (data, page, perPage) => {
    return await CourseModel.find({user: data}).populate(['categories', 'user']).skip((page -1 ) * perPage).limit(perPage).exec()
}
export const getCourseByTags = async (data, page, perPage) => {
    return await CourseModel.find({ tags: { $all: data }}).populate(['categories', 'user']).skip((page -1 ) * perPage).limit(perPage).exec()
}
export const getCourseByCategory = async (data, page, perPage) => {
    return await CourseModel.find({categories: { $all: data }}).populate(['categories', 'user']).skip((page -1 ) * perPage).limit(perPage).exec()
}
export const editCourse = async (data, id) => {
    return await CourseModel.findOneAndUpdate({_id:id}, data, {
        new: true
    })
}
export const deleteCourse = async (data) => {
    return await CourseModel.deleteOne({_id: data._id})
}