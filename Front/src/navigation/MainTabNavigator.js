import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import StudentDashboardScreen from '../screens/StudentDashboardScreen'; // الشاشة القديمة
import CoursesScreen from '../screens/CoursesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: '#0056D2',
                tabBarInactiveTintColor: '#888',
                tabBarStyle: { height: 60, paddingBottom: 8 },
                tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' }
            }}
        >

            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{ title: 'الرئيسية' }}
            />

            <Tab.Screen
                name="DashboardTab"
                component={StudentDashboardScreen} // الشاشة التي صممناها سابقاً
                options={{ title: 'لوحتي' }}
            />

            <Tab.Screen
                name="CoursesTab"
                component={CoursesScreen}
                options={{ title: 'موادي' }}
            />




            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{ title: 'حسابي' }}
            />
        </Tab.Navigator>
    );
}