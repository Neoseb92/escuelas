import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, StatusBar, Alert, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';

const Login = ({ navigation }) => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!correo.trim()) newErrors.correo = 'El correo es requerido';
    if (!contrasena.trim()) newErrors.contrasena = 'La contraseña es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;
    // Mock login — navega directo al menú principal
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor="#002f6c" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>← Regresar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Iniciar sesión</Text>
          <Text style={styles.subtitle}>Bienvenido de vuelta</Text>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={[styles.input, errors.correo && styles.inputError]}
              placeholder="ejemplo@correo.com"
              placeholderTextColor="#aaa"
              value={correo}
              onChangeText={text => { setCorreo(text); setErrors(e => ({ ...e, correo: null })); }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.correo ? <Text style={styles.errorText}>{errors.correo}</Text> : null}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={[styles.input, errors.contrasena && styles.inputError]}
              placeholder="Tu contraseña"
              placeholderTextColor="#aaa"
              value={contrasena}
              onChangeText={text => { setContrasena(text); setErrors(e => ({ ...e, contrasena: null })); }}
              secureTextEntry
            />
            {errors.contrasena ? <Text style={styles.errorText}>{errors.contrasena}</Text> : null}
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Ingresar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Registro')} style={styles.registerLink}>
            <Text style={styles.registerLinkText}>¿No tienes cuenta? <Text style={styles.registerLinkBold}>Regístrate</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#002f6c',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  topBar: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#002f6c',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: '#e53935',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#e53935',
    fontSize: 12,
    marginTop: 4,
  },
  loginButton: {
    backgroundColor: '#002f6c',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    elevation: 3,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerLinkText: {
    color: '#888',
    fontSize: 14,
  },
  registerLinkBold: {
    color: '#002f6c',
    fontWeight: 'bold',
  },
});

export default Login;
