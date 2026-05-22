const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// إنشاء حساب جديد
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {

        // 1. التحقق من عدم وجود المستخدم مسبقاً (بناءً على خاصية unique في Prisma)
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) return res.status(400).json({ error: "الإيميل مسجل مسبقاً!" });

        // 2. تشفير كلمة المرور (فائدة أمنية كبرى)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. حفظ المستخدم في قاعدة البيانات (داخل Docker)
        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword, role: role || 'STUDENT' }
        });

        res.status(201).json({ message: "تم إنشاء الحساب بنجاح", user: { id: newUser.id, name: newUser.name } });
    } catch (error) {
        res.status(500).json({ error: "خطأ في السيرفر أثناء التسجيل" });
    }
};

// تسجيل الدخول
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. البحث عن المستخدم بواسطة الإيميل
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ error: "المستخدم غير موجود" });

        // 2. مقارنة كلمة المرور المدخلة مع المشفرة في قاعدة البيانات
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "بيانات الدخول غير صحيحة" });

        // 3. إنشاء "توكن" (Token) يحتوي على بيانات المستخدم الأساسية
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });// التوكن صالح لمدة يوم واحد

        res.json({ message: "تم الدخول بنجاح", token, user: { id: user.id, name: user.name, role: user.role } });
    } catch (error) {
        console.error("🔴 تفاصيل خطأ تسجيل الدخول:", error); // هذا السطر سيكشف السر
        res.status(500).json({ error: "خطأ في السيرفر أثناء الدخول" });
    }
};