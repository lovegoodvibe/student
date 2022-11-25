'use strict';
const i18 = require('i18n');
const studentModel = require('../../databases/mysql/models/categories/student-model');

async function getStudent(req, res) {
    try {
        const data = await studentModel.getStudentList();
        res.json(data)
    } catch (error) {
        return res.json({
            status:500,
            message:"Lay du lieu that bai"
        })
        // return res.sendError(error, 'categories/student-controller', 'getDepartments');
    }
}

async function insertStudent(req, res) {
    try {
        const {body} = req;
        const createdDate = new Date();
        const createdBy = 'BOT';
        await studentModel.insertStudent({
            ...body, createdDate, createdBy
        });
        res.json({message: i18.__('insert_success')});
    } catch (error) {
        res.status(400).json(error);
    }
}
async function deleteStudent(req, res) {
    try {
        const {body} = req;
        const updatedDate = new Date();
        const updatedBy = 'DeletedBot';
        await studentModel.deleteStudent({
            ...body, updatedDate, updatedBy
        });
        res.json({message: i18.__('delete_success')});
    } catch (error) {
        res.status(400).json(error);
    }
}
async function updateStudent(req, res) {
    try {
        const {body} = req;
        const updatedDate = new Date();
        const updatedBy = 'UpdatedBot';
        await studentModel.updateStudent({
            ...body, updatedDate, updatedBy
        });
        res.json({message: i18.__('update_success')});
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
    getStudent,
    insertStudent,
    updateStudent,
    deleteStudent

};