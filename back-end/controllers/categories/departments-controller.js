'use strict';
const i18 = require('i18n');
const departmentModel = require('../../databases/mysql/models/categories/department-model');

async function getDepartments(req, res) {
    try {
        const {query} = req;
        const data = await departmentModel.getDepartmentList(query);
        res.json(data)
    } catch (error) {
        return res.sendError(error, 'categories/departments-controller', 'getDepartments');
    }
}

async function insertDepartment(req, res) {
    try {
        const {body} = req;
        const createdDate = new Date();
        await departmentModel.insertDepartment({
            ...body, createdDate
        });
        res.json({message: i18.__('insert_success')});
    } catch (error) {
        res.status(400).json(error);
    }
}

async function updateDepartment(req, res) {
    try {
        const {body} = req;
        await departmentModel.updateDepartment({
            ...body
        });
        res.json({message: i18.__('update_success')});
    } catch (error) {
        res.status(400).json(error);
    }
}

async function deleteDepartment(req, res) {
    try {
        const {query} = req;
        await departmentModel.deleteDepartment({
            ...query
        });
        res.json({message: i18.__('delete_success')});
    } catch (error) {
        res.status(400).json(error);
    }
}


module.exports = {
    getDepartments,
    insertDepartment,
    updateDepartment,
    deleteDepartment,
};
