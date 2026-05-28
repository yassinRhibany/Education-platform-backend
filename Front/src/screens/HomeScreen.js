import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// 1. بيانات المدرسين التجريبية
const TEACHERS_DATA = [
  { id: '1', name: 'أ. محمود', subject: 'رياضيات', color: '#E8F0FE' },
  { id: '2', name: 'أ. فاطمة', subject: 'لغة عربية', color: '#FCE8E6' },
  { id: '3', name: 'أ. خالد', subject: 'علوم', color: '#E6F4EA' },
  { id: '4', name: 'أ. سارة', subject: 'لغة إنجليزية', color: '#FEF7E0' },
  { id: '5', name: 'أ. رامي', subject: 'فيزياء', color: '#F3E8FD' },
];

// 2. بيانات المواد الدراسية التجريبية (للصف السابع مثلاً)
const GRADE_7_SUBJECTS = [
  { id: '1', title: 'الرياضيات - الجزء الأول', icon: '📐' },
  { id: '2', title: 'اللغة العربية - قواعد', icon: '📖' },
  { id: '3', title: 'العلوم العامة', icon: '🔬' },
  { id: '4', title: 'اللغة الإنجليزية', icon: '🔤' },
];

const GRADE_8_SUBJECTS = [
  { id: '1', title: 'الفيزياء الأساسية', icon: '⚡' },
  { id: '2', title: 'الجبر والهندسة', icon: '📏' },
  { id: '3', title: 'التاريخ والجغرافيا', icon: '🌍' },
];

export default function HomeScreen() {

  // مكون فرعي لرسم قسم كل صف دراسي (لتجنب تكرار الكود)
  const GradeSection = ({ gradeTitle, subjects }) => (
    <View style={styles.gradeSectionContainer}>
      <View style={styles.sectionHeader}>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>عرض الكل</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>{gradeTitle}</Text>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {subjects.map((subject) => (
          <TouchableOpacity key={subject.id} style={styles.subjectCard} activeOpacity={0.8}>
            <Text style={styles.subjectIcon}>{subject.icon}</Text>
            <Text style={styles.subjectTitle}>{subject.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* قسم كادر المدرسين */}
      <View style={styles.teachersSection}>
        <Text style={styles.mainTitle}>نخبة المدرسين 👨‍🏫</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {TEACHERS_DATA.map((teacher) => (
            <TouchableOpacity key={teacher.id} style={styles.teacherItem}>
              <View style={[styles.teacherAvatar, { backgroundColor: teacher.color }]}>
                <Text style={styles.avatarText}>{teacher.name[3]}</Text> 
              </View>
              <Text style={styles.teacherName}>{teacher.name}</Text>
              <Text style={styles.teacherSubject}>{teacher.subject}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* أقسام الصفوف الدراسية */}
      <GradeSection gradeTitle="مواد الصف السابع" subjects={GRADE_7_SUBJECTS} />
      <GradeSection gradeTitle="مواد الصف الثامن" subjects={GRADE_8_SUBJECTS} />
      <GradeSection gradeTitle="مواد الصف التاسع" subjects={GRADE_7_SUBJECTS} /> {/* بيانات مكررة للتجربة */}

      <View style={{ height: 40 }} /> {/* مساحة فارغة أسفل الشاشة */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  
  horizontalScroll: { paddingHorizontal: 15, flexDirection: 'row-reverse' },
  
  // تنسيق قسم المدرسين
  teachersSection: { marginTop: 20, marginBottom: 10 },
  mainTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A', textAlign: 'right', marginRight: 20, marginBottom: 15 },
  teacherItem: { alignItems: 'center', marginLeft: 20, width: 70 },
  teacherAvatar: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 8, borderWidth: 1, borderColor: '#EEE' },
  avatarText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  teacherName: { fontSize: 13, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  teacherSubject: { fontSize: 11, color: '#666', textAlign: 'center', marginTop: 2 },

  // تنسيق أقسام الصفوف
  gradeSectionContainer: { marginTop: 25 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  seeAllText: { fontSize: 14, color: '#0056D2', fontWeight: 'bold' },
  
  subjectCard: { width: width * 0.4, backgroundColor: '#FFF', padding: 15, borderRadius: 16, marginLeft: 15, borderWidth: 1, borderColor: '#EEE', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
  subjectIcon: { fontSize: 32, marginBottom: 10 },
  subjectTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', textAlign: 'center', lineHeight: 22 }
});