const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// استدعاء حارس الأمن (Middleware)
const authMiddleware = require('../middlewares/authMiddleware');

// نضع الحارس في المنتصف قبل دالة الـ Controller
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;