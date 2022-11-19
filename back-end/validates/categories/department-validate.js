const Joi = require('joi');

const getDepartments = {
    query: {
        currentPage: Joi.number().integer().allow('', null),
        pageSize: Joi.number().integer().allow('', null),
        search: Joi.string().trim().max(255).allow('', null),
        departmentId: Joi.number().min(1).max(1000000000).allow(null, ''),
        pagination: Joi.any().allow(null, '')
    },
};

const insertDepartment = {
    body: {
        departmentName: Joi.string().trim()
            .regex(/^[-A-Z0-9]+$/)
            .max(100).required(),
        internal: Joi.number()
            .required()
            .min(0)
            .max(2),
        description: Joi.string()
            .allow('', null)
            .max(255),
    },
};

const updateDepartment = {
    body: {
        departmentId: Joi.number()
            .integer()
            .min(1)
            .max(1000000000)
            .required(),
        departmentName: Joi.string().trim()
            .regex(/^[-A-Z0-9]+$/)
            .max(100).required(),
        internal: Joi.number()
            .required()
            .min(0)
            .max(2),
        description: Joi.string()
            .allow('', null)
            .max(255),
    },
};

const deleteDepartment = {
    query: {
        departmentId: Joi.number()
            .integer()
            .min(1)
            .max(1000000000)
            .required()
    },
};
const standardized = {
    body: {
        dataImport: Joi.array().items(
            Joi.object({
                sheetName: Joi.string().regex(/^[-_() a-zA-Z0-9]{1,45}$/).required(),
                codeRoom: Joi.string().min(1).max(50).required(),
                rackName: Joi.string().min(1).max(50).required(),
                deviceNameLocal: Joi.string().min(1).max(255).required(),
                positionU: Joi.number().min(1).max(47).required(),
                position: Joi.string().valid("front", "rear").min(1).max(20).required(),
                height: Joi.number().min(1).max(47).required(),
                deviceTypeName: Joi.string().min(1).max(255).required(),
                deviceTemplateName: Joi.string().min(1).max(255).required(),
                contractId: Joi.string().min(1).max(255).valid("NOC-NET", "NOC-OTS").required(),
                internal: Joi.number().valid(1).required(),
            })
        ).min(1).required()
    },
}

module.exports = {getDepartments, insertDepartment, updateDepartment, deleteDepartment, standardized};
