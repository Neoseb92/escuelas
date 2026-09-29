import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const alumnos = [
  { id: '1', nombre: 'Renata García', grado: '1B', nivel: 'Primaria', edad: 7, turno: 'Matutino' },
  { id: '2', nombre: 'Mónica García', grado: '5A', nivel: 'Primaria', edad: 11, turno: 'Matutino' },
];

const iniciales = (nombre) => nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

const colores = ['#002f6c', '#007bff', '#b4004e', '#2e7d32'];

export default function Alumnos() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis hijos registrados</Text>
      <FlatList
        data={alumnos}
        keyExtractor={item => item.id}
        contentContainerStyle={{ gap: 14 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.85}>
            <View style={[styles.avatar, { backgroundColor: colores[index % colores.length] }]}>
              <Text style={styles.avatarText}>{iniciales(item.nombre)}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.detalle}>Grado: <Text style={styles.bold}>{item.grado}</Text>  ·  {item.nivel}</Text>
              <Text style={styles.detalle}>Turno: {item.turno}  ·  {item.edad} años</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.grado}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb', padding: 16 },
  header: { fontSize: 16, color: '#666', marginBottom: 16, fontWeight: '500' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  info: { flex: 1 },
  nombre: { fontSize: 17, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 4 },
  detalle: { fontSize: 13, color: '#777', marginTop: 2 },
  bold: { fontWeight: '600', color: '#444' },
  badge: {
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: { color: '#002f6c', fontWeight: 'bold', fontSize: 13 },
});
