const router = require('express-promise-router')();
const departmentController = require('../../controllers/categories/departments-controller');
const resources = require('../../utils/resources');
const departmentValidate = require('../../validates/categories/department-validate');
const validate = require('../../middlewares/validate');


router.route('/').get(
    validate(departmentValidate.getDepartments), departmentController.getDepartments);

router.route('/insert').post(
    validate(departmentValidate.insertDepartment), (req, res, next) => {
        departmentController.insertDepartment(req, res, next);
    });

router.route('/update').put(
    validate(departmentValidate.updateDepartment), (req, res, next) => {
        departmentController.updateDepartment(req, res, next);
    });

router.route('/delete').delete(
    validate(departmentValidate.deleteDepartment), (req, res, next) => {
        departmentController.deleteDepartment(req, res, next);
    });


module.exports = router;
