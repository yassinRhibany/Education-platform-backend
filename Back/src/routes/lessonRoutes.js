const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { protect, restrictTo } = require('../middlewares/authMiddleware'); // افترضنا أن هذا اسم ملف الحماية لديك

// مسار إضافة درس: يجب أن يكون مسجلاً ودوره TEACHER
router.post('/create/:courseId', protect, restrictTo('TEACHER'), lessonController.createLesson);

// مسار جلب الدروس: يكفي أن يكون المستخدم مسجلاً (STUDENT أو TEACHER)
router.get('/getAll/:courseId', protect, lessonController.getCourseLessons);

module.exports = router;