const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// دالة لجلب بيانات الملف الشخصي للمستخدم الحالي
exports.getProfile = async (req, res) => {
    try {
        // الـ Middleware قام بوضع بيانات التوكن داخل req.user
        // سنستخدم الـ userId للبحث في قاعدة البيانات
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { id: true, name: true, email: true, role: true } // نختار الحقول التي نريد إرجاعها فقط (بدون الباسورد)
        });

        if (!user) return res.status(404).json({ error: "المستخدم غير موجود" });

        res.json({ message: "مرحباً بك في ملفك الشخصي", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "خطأ في السيرفر" });
    }
};