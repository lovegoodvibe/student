const Joi = require('joi');

const getClass = {
    query: {
        currentPage: Joi.number().integer().allow('', null),
        pageSize: Joi.number().integer().allow('', null),
        search: Joi.string().trim().max(255).allow('', null),
        departmentId: Joi.number().min(1).max(1000000000).allow(null, ''),
        pagination: Joi.any().allow(null, '')
    },
};

const insertClass = {
    body: {
        className: Joi.string().trim()
            .min(1)
            .max(45).required(),
        description: Joi.string()
            .allow('', null)
            .max(255),
        score: Joi.number()
            .required()
            .min(0)
            .max(100),
        quantity:Joi.number()
            .min(1)
            .max(400)
            .required()
    },
};
const updateClass = {
    body: {
        className: Joi.string().trim()
            .min(1)
            .max(45).required(),
        deleteStatus: Joi.number()
            .required()
            .valid(0,1),
        description: Joi.string()
            .allow('', null)
            .max(255),
        quantity:Joi.number()
            .min(1)
            .max(400)
            .required(),
        score: Joi.number()
            .required()
            .min(0)
            .max(100)
    },
};
const deleteClass = {
    query: {
        className: Joi.string().trim()
            .min(1)
            .max(45).required()
    },
};

module.exports = {getClass, insertClass, updateClass, deleteClass};
