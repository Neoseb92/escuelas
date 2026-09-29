import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, StatusBar, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';

const Registro = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!correo.trim()) newErrors.correo = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(correo)) newErrors.correo = 'Ingresa un correo válido';
    if (!contrasena.trim()) newErrors.contrasena = 'La contraseña es requerida';
    else if (contrasena.length < 6) newErrors.contrasena = 'Mínimo 6 caracteres';
    if (!confirmar.trim()) newErrors.confirmar = 'Confirma tu contraseña';
    else if (confirmar !== contrasena) newErrors.confirmar = 'Las contraseñas no coinciden';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegistro = () => {
    if (!validate()) return;
    // Mock registro — navega al login
    navigation.navigate('Login');
  };

  const Field = ({ label, value, onChangeText, errorKey, placeholder, secure, keyboard }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errors[errorKey] && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={text => { onChangeText(text); setErrors(e => ({ ...e, [errorKey]: null })); }}
        secureTextEntry={secure}
        keyboardType={keyboard || 'default'}
        autoCapitalize="none"
      />
      {errors[errorKey] ? <Text style={styles.errorText}>{errors[errorKey]}</Text> : null}
    </View>
  );

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
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>

          <Field label="Nombre completo" value={nombre} onChangeText={setNombre} errorKey="nombre" placeholder="Juan Pérez" />
          <Field label="Correo electrónico" value={correo} onChangeText={setCorreo} errorKey="correo" placeholder="ejemplo@correo.com" keyboard="email-address" />
          <Field label="Contraseña" value={contrasena} onChangeText={setContrasena} errorKey="contrasena" placeholder="Mínimo 6 caracteres" secure />
          <Field label="Confirmar contraseña" value={confirmar} onChangeText={setConfirmar} errorKey="confirmar" placeholder="Repite tu contraseña" secure />

          <TouchableOpacity style={styles.registerButton} onPress={handleRegistro}>
            <Text style={styles.registerButtonText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
            <Text style={styles.loginLinkText}>¿Ya tienes cuenta? <Text style={styles.loginLinkBold}>Inicia sesión</Text></Text>
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
  backButton: { alignSelf: 'flex-start' },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 15 },
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
  title: { fontSize: 26, fontWeight: 'bold', color: '#002f6c', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  fieldContainer: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 6 },
  input: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  inputError: { borderColor: '#e53935', backgroundColor: '#fff5f5' },
  errorText: { color: '#e53935', fontSize: 12, marginTop: 4 },
  registerButton: {
    backgroundColor: '#002f6c',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    elevation: 3,
  },
  registerButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  loginLink: { marginTop: 20, alignItems: 'center' },
  loginLinkText: { color: '#888', fontSize: 14 },
  loginLinkBold: { color: '#002f6c', fontWeight: 'bold' },
});

export default Registro;
