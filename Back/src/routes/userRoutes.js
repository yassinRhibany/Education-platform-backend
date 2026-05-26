const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// استدعاء حارس الأمن (Middleware)
// ✅ التعديل الصحيح
const { protect } = require('../middlewares/authMiddleware');

// نضع الحارس في المنتصف قبل دالة الـ Controller
// ✅ بعد (الصحيح):
router.get('/profile', protect, userController.getProfile);

module.exports = router;