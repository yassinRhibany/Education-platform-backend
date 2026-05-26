const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// استدعاء الحراس
// ✅ التعديل الصحيح
const { protect } = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// رابط جلب الكورسات: محمي بالتوكن، ومتاح لأي دور (Student أو Teacher)
router.get('/', protect, courseController.getAllCourses);

// رابط إنشاء كورس: محمي بالتوكن + يجب أن يكون دوره TEACHER حصراً
router.post('/', protect, roleMiddleware(['TEACHER']), courseController.createCourse);

module.exports = router;