
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // يسمح للسيرفر بفهم البيانات القادمة بصيغة JSON

// --- رابط إنشاء حساب جديد (Register) ---
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // 1. التحقق من عدم وجود المستخدم مسبقاً (بناءً على خاصية unique في Prisma)
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "الإيميل مسجل مسبقاً!" });
    }

    // 2. تشفير كلمة المرور (فائدة أمنية كبرى)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. حفظ المستخدم في قاعدة البيانات (داخل Docker)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'STUDENT', // إذا لم يحدد دور، يكون طالب تلقائياً
      },
    });

    res.status(201).json({
      message: "تم إنشاء الحساب بنجاح!",
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "حدث خطأ في الخادم أثناء التسجيل" });
  }
});

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_super_secret_key_123'; // في المشاريع الحقيقية نضع هذا في ملف .env

// --- رابط تسجيل الدخول (Login) ---
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. البحث عن المستخدم بواسطة الإيميل
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "المستخدم غير موجود!" });
    }

    // 2. مقارنة كلمة المرور المدخلة مع المشفرة في قاعدة البيانات
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "كلمة المرور غير صحيحة!" });
    }

    // 3. إنشاء "توكن" (Token) يحتوي على بيانات المستخدم الأساسية
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' } // التوكن صالح لمدة يوم واحد
    );

    res.json({
      message: "تم تسجيل الدخول بنجاح!",
      token: token,
      user: { id: user.id, name: user.name, role: user.role }
    });

  } catch (error) {
    res.status(500).json({ error: "حدث خطأ في الخادم" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

