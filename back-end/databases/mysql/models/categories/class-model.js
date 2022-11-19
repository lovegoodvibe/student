const knex = require('../../knex-raca');
const _ = require('lodash');
const {UserError} = require("../../../../utils/custom-errors");
const i18 = require('i18n');
const moment = require("moment");
const inside = require("../../../../configs/inside.cfg")

async function getClassList() {
     return knex('tbl_class').where('deleteStatus',0)
}


async function insertClass(params) {
    const trx = await knex.transaction();
    const createdDate = new Date();
    try {
        const {classId, className, createdDate, createdBy, description, deleteStatus, quantity, score } = params;
        ///check duplicate
        const classCheck = await trx('tbl_class').where({className});
        if (_.size(classCheck) > 0) {
            throw new UserError('INSERT_FAILED', ` ${className}: ${i18.__('is_exits')}`);
        }
        const data = {
            className,
            description,
            createdDate,
            createdBy,
            deleteStatus,
            quantity,
            score
        };
        await trx('tbl_class').insert(data);
        await trx.commit();
    } catch (e) {
        trx.rollback();
        throw e;
    }
}
async function updateClass(params) {
    const trx = await knex.transaction();
    try {
        const {className, updatedDate, updatedBy, description, deleteStatus, quantity } = params;
        ///check duplicate
        // const classCheck = await trx('tbl_class').where({classId});
        // if (_.size(classCheck) === 0) {
        //     throw new UserError('UPDATE_FAILED', ` ${classId}: ${i18.__('is_exits')}`);
        // }
        const data = {
            className,
            updatedDate,
            updatedBy,
            description,
            deleteStatus,
            quantity
        };
        await trx('tbl_class').update(data).where("className",className);
        await trx.commit();
    } catch (e) {
        trx.rollback();
        throw e;
    }
}
async function deleteClass(params) {
    const trx = await knex.transaction();
    const createdDate = new Date();
    try {
        const {className } = params;
        ///check duplicate
        const classCheck = await trx('tbl_class').where({className});
        if (_.size(classCheck) === 0) {
            throw new UserError('DELETE_FAILED', ` ${className}: ${i18.__('is_exits')}`);
        }
      /******
       * XOA CUNG
       * ******/
        // await trx('tbl_class').del().where('classId',classId);
        /******
         * XOA mem
         * ******/
        await trx('tbl_class').update({
            deleteStatus: 1,
            updatedDate: new Date(),
            updatedBy:"test"
        }).where('className',className);
        await trx.commit();
    } catch (e) {
        trx.rollback();
        throw e;
    }
}

module.exports = {
    getClassList,
    insertClass,
    updateClass,
    deleteClass
};
