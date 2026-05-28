import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button, Dimensions } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { logout } = useContext(AuthContext);

  // بيانات تجريبية للطالب
  const studentInfo = {
    name: "أحمد محمد المبرمج",
    email: "ahmed.dev2026@gmail.com",
    joinedDate: "يناير 2026"
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 1. بطاقة الهوية العلوية */}
      <View style={styles.profileHeaderCard}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarText}>{studentInfo.name[0]}</Text>
        </View>
        <Text style={styles.studentName}>{studentInfo.name}</Text>
        <Text style={styles.studentEmail}>{studentInfo.email}</Text>
        <Text style={styles.joinDate}>عضو منذ {studentInfo.joinedDate}</Text>
      </View>

      {/* 2. لوحة الإنجازات والأرقام */}
      <View style={styles.achievementsRow}>
        <View style={styles.achieveCard}>
          <Text style={styles.achieveNumber}>🥇 2</Text>
          <Text style={styles.achieveLabel}>شهادات مكتملة</Text>
        </View>
        <View style={styles.achieveCard}>
          <Text style={styles.achieveNumber}>⚡ 45</Text>
          <Text style={styles.achieveLabel}>ساعة تدريبية</Text>
        </View>
      </View>

      {/* 3. قائمة الإعدادات والخيارات */}
      <View style={styles.menuContainer}>
        
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Text style={styles.menuItemArrow}>‹</Text>
          <Text style={styles.menuItemText}>تعديل بيانات الحساب</Text>
          <Text style={styles.menuItemIcon}>⚙️</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Text style={styles.menuItemArrow}>‹</Text>
          <Text style={styles.menuItemText}>شهاداتي المعتمدة</Text>
          <Text style={styles.menuItemIcon}>📜</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Text style={styles.menuItemArrow}>‹</Text>
          <Text style={styles.menuItemText}>إعدادات التنبيهات</Text>
          <Text style={styles.menuItemIcon}>🔔</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Text style={styles.menuItemArrow}>‹</Text>
          <Text style={styles.menuItemText}>الدعم الفني والمساعدة</Text>
          <Text style={styles.menuItemIcon}>💬</Text>
        </TouchableOpacity>

      </View>

      {/* 4. زر تسجيل الخروج الأنيق */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.8}>
        <Text style={styles.logoutButtonText}>تسجيل الخروج</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', padding: 20 },
  
  profileHeaderCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 25, alignItems: 'center', borderWidth: 1, borderColor: '#EEE', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2, marginBottom: 20 },
  avatarLarge: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#0056D2', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarText: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
  studentName: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 4 },
  studentEmail: { fontSize: 14, color: '#666', marginBottom: 12 },
  joinDate: { fontSize: 12, color: '#999', backgroundColor: '#F5F5F5', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  
  achievementsRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 25 },
  achieveCard: { width: (width - 55) / 2, backgroundColor: '#FFF', padding: 15, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
  achieveNumber: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  achieveLabel: { fontSize: 12, color: '#666', marginTop: 5 },
  
  menuContainer: { backgroundColor: '#FFF', borderRadius: 20, paddingVertical: 10, borderWidth: 1, borderColor: '#EEE', marginBottom: 25 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  menuItemIcon: { fontSize: 18, marginLeft: 12 },
  menuItemText: { flex: 1, fontSize: 15, color: '#333', textAlign: 'right', fontWeight: '500' },
  menuItemArrow: { fontSize: 20, color: '#CCC', fontWeight: '300' },
  
  logoutButton: { backgroundColor: '#FFF0F0', borderWidth: 1, borderColor: '#FFD2D2', borderRadius: 16, paddingVertical: 15, alignItems: 'center', marginBottom: 40 },
  logoutButtonText: { color: '#D93025', fontSize: 16, fontWeight: 'bold' }
});