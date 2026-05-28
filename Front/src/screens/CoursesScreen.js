import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// 1. بيانات تجريبية مسبقة للكورسات التي اشترك بها الطالب
const MY_COURSES_DATA = [
  {
    id: '1',
    title: 'تطوير تطبيقات الهاتف باستخدام React Native و Expo',
    instructor: 'د. عاصم خالد',
    completedLessons: 12,
    totalLessons: 20,
    progress: 60,
    tag: 'برمجة الموبايل',
    themeColor: '#E8F0FE',
    accentColor: '#1A73E8'
  },
  {
    id: '2',
    title: 'بناء الواجهات الخلفية وقواعد البيانات بواسطة Node.js & MySQL',
    instructor: 'م. عمر الشريف',
    completedLessons: 4,
    totalLessons: 16,
    progress: 25,
    tag: 'الباك إند',
    themeColor: '#FEF7E0',
    accentColor: '#B06000'
  },
  {
    id: '3',
    title: 'أساسيات ومبادئ التصميم وتجربة المستخدم UI/UX',
    instructor: 'م. سارة علي',
    completedLessons: 15,
    totalLessons: 15,
    progress: 100,
    tag: 'التصميم',
    themeColor: '#E6F4EA',
    accentColor: '#137333'
  }
];

export default function CoursesScreen() {

  // 2. دالة رسم البطاقة الواحدة (Render Item)
  const renderCourseCard = ({ item }) => {
    const isCompleted = item.progress === 100;

    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.8}>
        
        {/* الترويسة الداخلية للبطاقة */}
        <View style={styles.cardHeader}>
          <View style={[styles.tagBadge, { backgroundColor: item.themeColor }]}>
            <Text style={[styles.tagText, { color: item.accentColor }]}>{item.tag}</Text>
          </View>
          {isCompleted && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeText}>مكتمل ✓</Text>
            </View>
          )}
        </View>

        {/* تفاصيل الكورس */}
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.instructorName}>المحاضر: {item.instructor}</Text>

        {/* قسم الدروس المكتملة */}
        <View style={styles.lessonsInfoRow}>
          <Text style={styles.lessonsCount}>{item.completedLessons} / {item.totalLessons} درس</Text>
          <Text style={styles.lessonsLabel}>التقدم الحالي:</Text>
        </View>

        {/* شريط التقدم اللامع */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${item.progress}%`, backgroundColor: item.accentColor }]} />
          </View>
          <Text style={[styles.progressPercentage, { color: item.accentColor }]}>{item.progress}%</Text>
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* القائمة الذكية */}
      <FlatList
        data={MY_COURSES_DATA}
        renderItem={renderCourseCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.headerSection}>
            <Text style={styles.mainTitle}>مسيرتك التعليمية 🚀</Text>
            <Text style={styles.subTitle}>تابع تقدمك في الدبلومات والكورسات المشترك بها</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  listContainer: { padding: 20, paddingBottom: 40 },
  
  headerSection: { marginBottom: 20, alignItems: 'flex-end' },
  mainTitle: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', textAlign: 'right' },
  subTitle: { fontSize: 14, color: '#666', textAlign: 'right', marginTop: 5 },

  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 18, marginBottom: 20, borderWidth: 1, borderColor: '#EEE', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.04, shadowRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  
  tagBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tagText: { fontSize: 12, fontWeight: 'bold' },
  
  completedBadge: { backgroundColor: '#E6F4EA', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#34A853' },
  completedBadgeText: { color: '#137333', fontSize: 12, fontWeight: 'bold' },
  
  courseTitle: { fontSize: 16, fontWeight: 'bold', color: '#202124', textAlign: 'right', marginBottom: 6, lineHeight: 24 },
  instructorName: { fontSize: 13, color: '#5F6368', textAlign: 'right', marginBottom: 15 },
  
  lessonsInfoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  lessonsLabel: { fontSize: 13, color: '#777' },
  lessonsCount: { fontSize: 13, fontWeight: 'bold', color: '#333' },
  
  progressContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressBg: { flex: 1, height: 8, backgroundColor: '#EFEFEF', borderRadius: 4, overflow: 'hidden', marginRight: 10, direction: 'rtl' },
  progressFill: { height: '100%', borderRadius: 4, alignSelf: 'flex-end' },
  progressPercentage: { fontSize: 13, fontWeight: 'bold', minWidth: 35, textAlign: 'left' }
});