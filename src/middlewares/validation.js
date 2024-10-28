import { body } from "express-validator";
export const register_validation = [
    body('name')
    .isString()
    .withMessage('name should be a string')
    .notEmpty()
    .withMessage('name is required'),
    body('email')
    .isEmail()
    .withMessage('provide valid email')
    .notEmpty()
    .withMessage('email is required'),
    body('role')
    .notEmpty()
    .withMessage('role is required'),
    body('password')
    .isString()
    .withMessage('password should be string')
    .notEmpty()
    .withMessage('password is required')
]
export const login_validation = [
    body('email')
    .isEmail()
    .withMessage('provide valid email')
    .notEmpty()
    .withMessage('email is required'),
    body('password')
    .isString()
    .withMessage('password should be string')
    .notEmpty()
    .withMessage('password is required')
]
export const forget_validation = [
    body('email')
    .isEmail()
    .withMessage('provide valid email')
    .notEmpty()
    .withMessage('email is required')
]
