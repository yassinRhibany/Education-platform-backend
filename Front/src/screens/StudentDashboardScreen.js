import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function StudentDashboardScreen() {
  // بيانات تجريبية مؤقتة سنربطها بالباك إند لاحقاً
  const studentName = "أحمد محمد";
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 1. قسم الترحيب العلوي */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>مرحباً بك مجدداً 👋</Text>
          <Text style={styles.studentName}>{studentName}</Text>
        </View>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarLetter}>{studentName[0]}</Text>
        </View>
      </View>

      {/* 2. قسم الإحصائيات السريعة */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>كورسات نشطة</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#E6F4EA' }]}>
          <Text style={[styles.statNumber, { color: '#137333' }]}>12</Text>
          <Text style={styles.statLabel}>درس مكتمل</Text>
        </View>
      </View>

      {/* 3. قسم متابعة التعلم (آخر كورس مفتوح) */}
      <Text style={styles.sectionTitle}>تابع التعلم من حيث توقفت</Text>
      <TouchableOpacity style={styles.continueCard} activeOpacity={0.8}>
        <View style={styles.courseBadge}>
          <Text style={styles.badgeText}>مادة الرياضيات</Text>
        </View>
        <Text style={styles.courseTitle}>الوحدة الثانية :فيزياء الحركة</Text>
        <Text style={styles.lessonTitle}>الدرس الاول السرعة و التسارع </Text>
        
        {/* شريط التقدم الوهمي */}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: '65%' }]} />
        </View>
        <Text style={styles.progressText}>اكتمل 65%</Text>
      </TouchableOpacity>

      {/* 4. قسم الكورسات المقترحة */}
      <Text style={styles.sectionTitle}>كورسات مقترحة لك</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        <TouchableOpacity style={styles.suggestedCard}>
          <Text style={styles.suggestedTitle}>اللغة الانكليزية</Text>
          <Text style={styles.suggestedInstructor}>م. سارة علي</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.suggestedCard, { backgroundColor: '#FFF0F0' }]}>
          <Text style={[styles.suggestedTitle, { color: '#C5221F' }]}>الكيمياء</Text>
          <Text style={styles.suggestedInstructor}>م. حمزة خالد</Text>
        </TouchableOpacity>
      </ScrollView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', padding: 20 },
  header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 25 },
  welcomeText: { fontSize: 16, color: '#666', textAlign: 'right', fontFamily: 'System' },
  studentName: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', textAlign: 'right', marginTop: 4 },
  avatarCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#0056D2', justifyContent: 'center', alignItems: 'center' },
  avatarLetter: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  
  statsContainer: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 25 },
  statCard: { width: (width - 55) / 2, backgroundColor: '#E8F0FE', padding: 15, borderRadius: 14, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#1A73E8' },
  statLabel: { fontSize: 14, color: '#5F6368', marginTop: 5 },
  
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A', textAlign: 'right', marginBottom: 15, marginTop: 10 },
  
  continueCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#EEE', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2, marginBottom: 20 },
  courseBadge: { alignSelf: 'flex-end', backgroundColor: '#FFF3E0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 10 },
  badgeText: { color: '#E65100', fontSize: 12, fontWeight: 'bold' },
  courseTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', textAlign: 'right', marginBottom: 6 },
  lessonTitle: { fontSize: 13, color: '#666', textAlign: 'right', marginBottom: 15 },
  progressBg: { height: 6, backgroundColor: '#EEE', borderRadius: 3, overflow: 'hidden', direction: 'rtl' },
  progressFill: { height: '100%', backgroundColor: '#0056D2', alignSelf: 'flex-end' },
  progressText: { fontSize: 11, color: '#888', textAlign: 'left', marginTop: 6 },
  
  horizontalScroll: { flexDirection: 'row-reverse', paddingBottom: 30 },
  suggestedCard: { width: width * 0.6, backgroundColor: '#F6F9FF', padding: 15, borderRadius: 14, marginLeft: 15, borderWidth: 1, borderColor: '#E1E8ED', height: 110, justifyContent: 'center' },
  suggestedTitle: { fontSize: 15, fontWeight: 'bold', color: '#0056D2', textAlign: 'right', marginBottom: 5 },
  suggestedInstructor: { fontSize: 13, color: '#666', textAlign: 'right' }
});