import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // التأكد من وجود توكن قديم عند فتح التطبيق لأول مرة
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) setUserToken(token);
      } catch (e) {
        console.log('خطأ في جلب التوكن المحفوظ:', e);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrapAsync();
  }, []);

  // دالة تسجيل الدخول وحفظ التوكن
  const login = async (token) => {
    setUserToken(token);
    await SecureStore.setItemAsync('userToken', token);
  };

  // دالة تسجيل الخروج ومسح التوكن
  const logout = async () => {
    setUserToken(null);
    await SecureStore.deleteItemAsync('userToken');
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};