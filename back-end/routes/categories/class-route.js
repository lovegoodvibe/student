const router = require('express-promise-router')();
const classController = require('../../controllers/categories/class-controller');
const resources = require('../../utils/resources');
const classValidate = require('../../validates/categories/class-validate');
const validate = require('../../middlewares/validate');


router.route('/').get( classController.getClass);

router.route('/insert').post(
    validate(classValidate.insertClass), (req, res, next) => {
        classController.insertClass(req, res, next);
    });
router.route('/update').put(
    validate(classValidate.updateClass), (req, res, next) => {
        classController.updateClass(req, res, next);
    });
router.route('/delete').delete(
    validate(classValidate.deleteClass), (req, res, next) => {
        classController.deleteClass(req, res, next);
    });




module.exports = router;
