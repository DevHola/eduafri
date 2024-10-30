import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({path: path.join(__dirname, '../../', '.env')})

import { connection } from "../../config/db.js";
import mongoose from "mongoose";
import categoryModel from "../category.model.js";
import tagsModel from '../tags.model.js'
const category = [
    {
        name: 'Graphic Design',
        desc: 'Courses on visual design principles, Adobe Creative Suite, typography, branding, and logo design.'
    },
    {
        name: 'UX/UI Design',
        desc: 'Programs focusing on user experience design, user interface design, wireframing, prototyping, and usability testing.'
    },
    {
        name: 'Web Development',
        desc: 'Courses covering HTML, CSS, JavaScript, front-end frameworks (React, Angular), and back-end development (Node.js, Django).'
    },
    {
        name: 'Mobile App Development',
        desc: 'Training on building mobile applications for iOS and Android using Swift, Kotlin, React Native, and Flutter.'
    },
    {
        name: 'Data Science',
        desc: 'Programs on data analysis, machine learning, data visualization, Python, R, and data manipulation tools.'
    },
    {
        name: 'Cybersecurity',
        desc: 'Courses on network security, ethical hacking, penetration testing, and information security management.'
    },
    {
        name: 'Financial Management',
        desc: 'Training on budgeting, financial planning, investment strategies, and corporate finance.'
    },
    {
        name: 'Accounting',
        desc: 'Courses covering bookkeeping, financial statements, tax accounting, and auditing principles.'
    },
    {
        name: 'Content Writing',
        desc: 'Programs focused on writing for blogs, articles, SEO content, and digital marketing.'
    },
    {
        name: 'Copywriting',
        desc: 'Courses aimed at persuasive writing for advertisements, sales pages, email marketing, and social media campaigns.'
    },
    {
        name: 'Digital Marketing',
        desc: 'Training on SEO, SEM, social media marketing, content marketing, and email marketing strategies.'
    },
    {
        name: 'Project Management',
        desc: 'Courses on project planning, Agile methodologies, Scrum, risk management, and project leadership.'
    },
    {
        name: 'Business Analysis',
        desc: 'Programs on requirements gathering, process modeling, business process improvement, and stakeholder management.'
    }
];
const tags = []

const seed = async (category) => {
    await connection()
    try {
    await categoryModel.deleteMany()
    await tagsModel.deleteMany()
    await categoryModel.insertMany(category)
    await tagsModel.insertMany(tags)
    
    console.log('Data seeded successfully.')
    mongoose.connection.close()
        
    } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
    }
}
seed(category)