const router = require('express').Router();
//categories
router.use('/departments', require('./categories/departments-route'));
router.use('/class', require('./categories/class-route'));
router.use('/student', require('./categories/student-route'));
module.exports = router;
