const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. إنشاء كورس جديد (خاص بالمدرس)
exports.createCourse = async (req, res) => {
    // 1. استقبال الحقول من الطلب بما فيها الـ subject
    const { title, description, price, subject } = req.body;

    // 2. التحقق من الحقول الإجبارية
    if (!title || !subject) {
        return res.status(400).json({ error: "عنوان الكورس والمادة الدراسية حقول إجبارية" });
    }

    try {
        const newCourse = await prisma.course.create({
            data: {
                title,
                description,
                price: price ? parseFloat(price) : 0.0, // تأمين تحويل السعر لرقم عشري
                subject, // تمرير قيمة الـ Enum مباشرة هنا (مثل "MATH")
                teacher: {
                    connect: { id: req.user.userId } // ربط المدرس القادم من الـ Token بأمان
                }
            }
        });

        res.status(201).json({ message: "تم إنشاء الكورس بنجاح ", course: newCourse });
    } catch (error) {
        console.error("🔴 خطأ أثناء إنشاء الكورس:", error);
        res.status(500).json({ error: "خطأ في السيرفر أثناء إنشاء الكورس" });
    }
};

// 2. جلب جميع الكورسات (متاح للجميع: طلاب ومدرسين)
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await prisma.course.findMany({
            include: { teacher: { select: { name: true, email: true } } } // جلب اسم المدرس مع الكورس
        });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: "خطأ في السيرفر" });
    }
};