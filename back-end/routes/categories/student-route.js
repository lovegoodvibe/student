const router = require('express-promise-router')();
const studentController = require('../../controllers/categories/student-controller');
const resources = require('../../utils/resources');
const studentValidate = require('../../validates/categories/student-validate');
const validate = require('../../middlewares/validate');


router.route('/').get( studentController.getStudent);

router.route('/insert').post(
    validate(studentValidate.insertStudent), (req, res, next) => {
        studentController.insertStudent(req, res, next);
    });
router.route('/update').put(
    validate(studentValidate.updateStudent), (req, res, next) => {
        studentController.updateStudent(req, res, next);
    });
router.route('/delete').delete(
    validate(studentValidate.deleteStudent), (req, res, next) => {
        studentController.deleteStudent(req, res, next);
    });

module.exports = router;