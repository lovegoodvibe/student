'use strict';
const i18 = require('i18n');
const classModel = require('../../databases/mysql/models/categories/class-model');

async function getClass(req, res) {
    try {
        const data = await classModel.getClassList();
        res.json(data)
    } catch (error) {
        return res.json({
            status:500,
            message:"Lay du lieu that bai"
        })
        // return res.sendError(error, 'categories/class-controller', 'getDepartments');
    }
}

async function insertClass(req, res) {
    try {
        const {body} = req;
        const createdDate = new Date();
        const createdBy = 'BOT';
        await classModel.insertClass({
            ...body, createdDate, createdBy
        });
        res.json({message: i18.__('insert_success')});
    } catch (error) {
        res.status(400).json(error);
    }
}
async function deleteClass(req, res) {
    try {
        const {query} = req;
        const updatedDate = new Date();
        const updatedBy = 'BOT';
        await classModel.deleteClass({
            ...query, updatedDate, updatedBy
        });
        res.json({message: i18.__('delete_success')});
    } catch (error) {
        res.status(400).json(error);
    }
}
async function updateClass(req, res) {
    try {
        const {body} = req;
        const updatedDate = new Date();
        const updatedBy = 'BOT';
        await classModel.updateClass({
            ...body, updatedDate, updatedBy
        });
        res.json({message: i18.__('update_success')});
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
    getClass,
    insertClass,
    updateClass,
    deleteClass

};
