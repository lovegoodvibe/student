const Joi = require('joi');

const getStudent = {
    query: {
        currentPage: Joi.number().integer().allow('', null),
        pageSize: Joi.number().integer().allow('', null),
        search: Joi.string().trim().max(255).allow('', null),
        departmentId: Joi.number().min(1).max(1000000000).allow(null, ''),
        pagination: Joi.any().allow(null, '')
    },
};

const insertStudent = {
    body: {
        name: Joi.string().trim()
            .min(1)
            .max(45).required(),
        email: Joi.string().trim()
            .min(1)
            .max(255).required(),
        age: Joi.number()
            .min(1)
            .max(45).required(),
        address: Joi.string().trim()
            .min(1)
            .max(255).required(),
        classId: Joi.number()
            .min(1)
            .max(45).required(),
        description: Joi.string()
            .allow('', null)
            .max(255),
        score:Joi.number()
            .min(1)
            .max(100).required()
    },
};
const updateStudent = {
    body: {
        id: Joi.number()
            .min(1)
            .max(45).required(),
        name: Joi.string().trim()
            .min(1)
            .max(45).required(),
        email: Joi.string().trim()
            .min(1)
            .max(255).required(),
        age: Joi.number()
            .min(1)
            .max(45).required(),
        address: Joi.string().trim()
            .min(1)
            .max(255).required(),
        classId: Joi.number()
            .min(1)
            .max(45).required(),
        description: Joi.string()
            .allow('', null)
            .max(255),
        score:Joi.number()
            .min(1)
            .max(100).required()
    },
};
const deleteStudent = {
    query: {
        id: Joi.number()
            .min(1)
            .max(45).required(),
    },
};

module.exports = {getStudent, insertStudent, updateStudent, deleteStudent};
