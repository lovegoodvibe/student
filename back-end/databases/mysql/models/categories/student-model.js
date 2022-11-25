const knex = require('../../knex-raca');
const _ = require('lodash');
const {UserError} = require("../../../../utils/custom-errors");
const i18 = require('i18n');
const moment = require("moment");
const inside = require("../../../../configs/inside.cfg")

async function getStudentList() {
    return knex('tbl_student').where('deleteStatus',0)
}


async function insertStudent(params) {
    const trx = await knex.transaction();
    const createdDate = new Date();
    try {
        const {name, age, email, classId, address, score, createdDate, createdBy, description, deleteStatus, password } = params;
        ///check duplicate
        const classCheck = await trx('tbl_student').where({name});
        if (_.size(classCheck) > 0) {
            throw new UserError('INSERT_FAILED', ` ${name}: ${i18.__('is_exits')}`);
        }
        const data = { name, age, email, address, classId, score, createdDate, createdBy, description, password };
        await trx('tbl_student').insert(data);
        await trx.commit();
    } catch (e) {
        trx.rollback();
        throw e;
    }
}
async function updateStudent(params) {
    const trx = await knex.transaction();
    try {
        const {id, name, age, email, classId, address, score, updatedDate, updatedBy, description, deleteStatus, password} = params;
        ///check duplicate
        // const classCheck = await trx('tbl_student').where({classId});
        // if (_.size(classCheck) === 0) {
        //     throw new UserError('UPDATE_FAILED', ` ${classId}: ${i18.__('is_exits')}`);
        // }
        const data = {id, name, age, email, classId, address, score, updatedDate, updatedBy, description, password};
        await trx('tbl_student').update(data).where("id",id);
        await trx.commit();
    } catch (e) {
        trx.rollback();
        throw e;
    }
}
async function deleteStudent(params) {
    const trx = await knex.transaction();
    const createdDate = new Date();
    try {
        const {id} = params;
        ///check duplicate
        const classCheck = await trx('tbl_student').where({id});
        if (_.size(classCheck) === 0) {
            throw new UserError('DELETE_FAILED', ` ${id}: ${i18.__('is_exits')}`);
        }
        /******
         * XOA CUNG
         * ******/
        // await trx('tbl_student').del().where('classId',classId);
        /******
         * XOA mem
         * ******/
        await trx('tbl_student').update({
            deleteStatus: 1,
            updatedDate: new Date(),
            updatedBy:"test"
        }).where('id',id);
        await trx.commit();
    } catch (e) {
        trx.rollback();
        throw e;
    }
}

module.exports = {
    getStudentList,
    insertStudent,
    updateStudent,
    deleteStudent
};
