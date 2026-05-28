import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

export default function CustomInput({ label, placeholder, value, onChangeText, secureTextEntry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry} // لإخفاء كلمة المرور
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginBottom: 15, 
    width: '100%' 
  },
  label: { 
    fontSize: 16, 
    marginBottom: 8, 
    color: '#333', 
    fontWeight: '600' 
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
});