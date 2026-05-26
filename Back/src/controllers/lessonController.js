const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. إضافة درس جديد لكورس معين
exports.createLesson = async (req, res) => {
  try {
    // 💡 تحويل القيمة القادمة من الرابط إلى عدد صحيح فوراً لمنع تعارض الأنواع
    const courseId = parseInt(req.params.courseId, 10);
    const { title, content, videoUrl } = req.body;
    const teacherId = req.user.id; // القادم من دالة الحماية (Protect Middleware)

    // التحقق من أن التحويل تم بنجاح ولم يعطِ نتيجة غير رقمية
    if (isNaN(courseId)) {
      return res.status(400).json({ message: "معرف الكورس يجب أن يكون رقماً صحيحاً" });
    }

    // التحقق من وجود الكورس وأن المستخدم الحالي هو المدرس الفعلي له
    const course = await prisma.course.findUnique({
      where: { 
        id: courseId // 👈 الآن تم التمرير كـ Int بنجاح (2 بدلاً من "2")
      }
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // السماح للمدرس صاحب الكورس أو الـ ADMIN بإضافة الدرس
    if (course.teacherId !== teacherId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: "Not authorized to add lessons to this course" });
    }

    // إنشاء الدرس
    const newLesson = await prisma.lesson.create({
      data: {
        title,
        content,
        videoUrl,
        courseId // 👈 سيمر هنا كـ Int بشكل سليم تماماً
      }
    });

    res.status(201).json({ message: "Lesson created successfully", lesson: newLesson });
  } catch (error) {
    console.log("خطأ أثناء إنشاء الدرس:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. جلب جميع دروس كورس معين (متاح للطلاب والمدرسين)
exports.getCourseLessons = async (req, res) => {
    try {
  
// 💡 تحويل القيمة القادمة من الرابط إلى عدد صحيح فوراً
    const courseId = parseInt(req.params.courseId, 10);

    // التحقق من أن التحويل تم بنجاح ولم يعطِ نتيجة غير رقمية (NaN)
    if (isNaN(courseId)) {
      return res.status(400).json({ message: "معرف الكورس يجب أن يكون رقماً صحيحاً" });
    }

        const lessons = await prisma.lesson.findMany({
            where: { courseId },
            orderBy: { createdAt: 'asc' } // ترتيب الدروس من الأقدم للأحدث
        });

        res.status(200).json(lessons);
    } catch (error) {
        console.error("Error fetching course lessons:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};