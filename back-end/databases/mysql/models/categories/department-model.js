const knex = require('../../knex-raca');
const _ = require('lodash');
const {UserError} = require("../../../../utils/custom-errors");
const i18 = require('i18n');
const moment = require("moment");
const inside = require("../../../../configs/inside.cfg")

async function getDepartmentList(params) {
    let {currentPage = 1, pageSize = 10, search = '', names, departmentId} = params;
    pageSize = Number(pageSize);
    currentPage = Number(currentPage);
    currentPage = currentPage > 0 ? currentPage - 1 : 0;
    let query = knex('tbl_Departments');
    let result;
    //search
    if (search) {
        query.andWhere('departmentName', 'like', `%${search}%`);
    }
    if (names && _.isArray(names)) query.whereIn('departmentName', names);

    const dataQuery = query.clone().select('departmentId', 'departmentName', 'internal', 'description', 'createdDate', 'departmentKey');
    if (pageSize !== -1 && !departmentId) {
        let count = await query.clone().count('*', {as: 'total'});
        const total = count[0]['total'];
        const offset = currentPage * pageSize;
        const data = await dataQuery.limit(pageSize).offset(offset).orderBy('createdDate', 'desc');
        const totalPages = Math.ceil(total / pageSize);
        result = {
            total,
            totalPages,
            data,
        };
    } else {
        result = await dataQuery;
    }
    return result;
}


async function insertDepartment(params) {
    const trx = await knex.transaction();
    const createdDate = new Date();
    try {
        const {departmentName, internal} = params;
        ///check duplicate
        const department = await knex('tbl_Departments').where({departmentName});
        if (_.size(department) > 0) {
            throw new UserError('INSERT_FAILED', `${i18.__('departmentName')} ${departmentName}: ${i18.__('is_exits')}`);
        }
        const data = {departmentName, createdDate, internal};
        await trx('tbl_Departments').insert(data);
        await trx.commit();
    } catch (e) {
        trx.rollback();
        throw e;
    }
}

async function updateDepartment(params) {
    const trx = await knex.transaction();
    try {
        const {departmentId, departmentName, updatedDate, internal, description} = params;

        const _department = await knex('tbl_Departments').where({departmentId});
        if (_.size(_department) < 0) {
            throw new UserError('UPDATE_FAILED', `${i18.__('departmentId')} ${departmentId}: ${i18.__('not_exits')}`);
        }
        //check duplicate
        const department = await knex('tbl_Departments').where({departmentName}).andWhere('departmentId', '!=', departmentId);
        if (_.size(department) > 0) {
            throw new UserError('UPDATE_FAILED', `${i18.__('departmentName')} ${departmentName}: ${i18.__('is_exits')}`)
        }

        const data = {departmentName, updatedDate, internal, description};
        await trx('tbl_Departments').update(data).where({departmentId});

        await trx.commit();
    } catch (e) {
        trx.rollback();
        throw e;
    }
}

async function deleteDepartment(params) {
    const trx = await knex.transaction();
    try {
        const {departmentId} = params;
        //check exists
        const _department = await knex('tbl_Departments').where({departmentId});
        if (_.size(_department) < 0) {
            throw new UserError('DELETE_FAILED', `${i18.__('departmentId')} ${departmentId}: ${i18.__('not_exits')}`)
        }
        await trx('tbl_Departments').where({departmentId}).del();
        await trx.commit();
    } catch (e) {
        trx.rollback();
        throw e;
    }
}

module.exports = {
    getDepartmentList,
    insertDepartment,
    updateDepartment,
    deleteDepartment,

};
