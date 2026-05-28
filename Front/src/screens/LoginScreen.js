import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';

// استدعاء دالة تسجيل الدخول من مجلد الـ API
import { loginUser } from '../api/auth';
import { ScrollView } from 'react-native';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // لإظهار حالة التحميل أثناء الاتصال بالسيرفر
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('تنبيه', 'يرجى إدخال البريد الإلكتروني وكلمة المرور');
            return;
        }

        setLoading(true);
        try {
            // الاتصال بالباك إند
            const data = await loginUser(email, password);

            // إذا نجح الاتصال، سنطبع التوكن في الكونسول كنتيجة مبدئية
            console.log('🎉 نجاح! البيانات القادمة من السيرفر:', data);
            // Alert.alert('نجاح', 'تم تسجيل الدخول بنجاح! راجع الـ Terminal.');

            // الخطوة القادمة ستكون: حفظ التوكن والانتقال للشاشة الرئيسية
            if (data.token) {
                await login(data.token);
            } else {
                Alert.alert('خطأ', 'لم يتم إرسال التوكن من السيرفر بشكل صحيح');
            }

        } catch (error) {
            console.log('❌ خطأ:', error.message);
            Alert.alert('خطأ', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            {/* ScrollView تضمن سلاسة الحركة وتمنع أي تعليق في الواجهة */}
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled" // لإغلاق الكيبورد عند الضغط في أي مكان فارغ
            >
                <View style={styles.formContainer}>
                    <Text style={styles.headerTitle}>مرحباً بعودتك 👋</Text>
                    <Text style={styles.subTitle}>سجل دخولك للوصول إلى دروسك ومساراتك</Text>

                    <CustomInput
                        label="البريد الإلكتروني"
                        placeholder="student@example.com"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <CustomInput
                        label="كلمة المرور"
                        placeholder="أدخل كلمة المرور"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />

                    <CustomButton title={loading ? "جاري التحميل..." : "تسجيل الدخول"} onPress={handleLogin} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6f9', // لون خلفية هادئ
        justifyContent: 'center'
    },
    formContainer: {
        padding: 24,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 16,
        // إعدادات الظل لتبدو البطاقة بارزة قليلاً
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: 8
    },
    subTitle: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        marginBottom: 32
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});