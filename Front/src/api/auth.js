import apiClient from './client';

export const loginUser = async (email, password) => {
  try {
    // سيقوم بإرسال POST إلى http://192.168.X.X:3000/api/auth/login
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    
    // إرجاع البيانات (التي ستحتوي غالباً على التوكن وبيانات المستخدم)
    return response.data; 
  } catch (error) {
    // التقاط الخطأ وإرجاع رسالة واضحة
    if (error.response) {
      throw new Error(error.response.data.message || 'حدث خطأ في تسجيل الدخول');
    }
    throw new Error('لا يمكن الاتصال بالسيرفر، تأكد من الشبكة');
  }
};