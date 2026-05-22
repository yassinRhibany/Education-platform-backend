// نمرر الأدوار المسموح لها بالدخول كمعامل (Arguments)
module.exports = (allowedRoles) => {
    return (req, res, next) => {
        // التأكد أولاً أن الحارس الأول قام بحقن بيانات المستخدم
        if (!req.user) {
            return res.status(500).json({ error: "خطأ في السيرفر: لم يتم التحقق من الهوية أولاً" });
        }

        // التحقق هل دور المستخدم الحالي موجود ضمن الأدوار المسموح لها؟
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: "غير مسموح لك بالوصول: هذه الصلاحية للمدرسين فقط!" });
        }

        next(); // السماح بالمرور للـ Controller
    };
};