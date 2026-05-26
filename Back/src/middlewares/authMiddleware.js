const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. دالة حماية المسارات والتحقق من الـ Token (protect)
exports.protect = async (req, res, next) => {
  try {
    let token;

    // التحقق من وجود الـ Token في الـ Headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: "You are not logged in. Please log in to get access." });
    }

    // التحقق من صحة الـ Token (Verify Token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // التحقق من وجود المستخدم في قاعدة البيانات
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!currentUser) {
      return res.status(401).json({ message: "The user belonging to this token no longer exists." });
    }

    // تمرير بيانات المستخدم بالكامل للطلب (req.user) لتستفيد منها بقية الدوال
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token or expired.", error: error.message });
  }
};

// 2. دالة التحقق من الأدوار مع منح الـ ADMIN صلاحية مطلقة (restrictTo)
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // 💡 السحر هنا: إذا كان المستخدم الحالي ADMIN، اسمح له بالمرور فوراً وتجاوز كل القيود
    if (req.user.role === 'ADMIN') {
      return next();
    }

    // التحقق مما إذا كان دور المستخدم (مثل TEACHER أو STUDENT) مصرحاً له بدخول المسار
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to perform this action." 
      });
    }

    next();
  };
};