import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Modal, KeyboardAvoidingView, Platform,
} from 'react-native';

const TABS = ['Diarias', 'Semanales', 'Mensuales'];

const initialTareas = {
  Diarias: [
    { id: '1', titulo: 'Repasar tabla del 3', materia: 'Matemáticas', vencimiento: 'Hoy', completada: false },
    { id: '2', titulo: 'Leer páginas 12-15', materia: 'Español', vencimiento: 'Hoy', completada: true },
    { id: '3', titulo: 'Dibujar un animal', materia: 'Arte', vencimiento: 'Hoy', completada: false },
  ],
  Semanales: [
    { id: '4', titulo: 'Proyecto de ciencias: plantas', materia: 'C. Naturales', vencimiento: 'Vie 3/abr', completada: false },
    { id: '5', titulo: 'Ejercicios de inglés pág. 20', materia: 'Inglés', vencimiento: 'Jue 2/abr', completada: false },
    { id: '6', titulo: 'Resumen de historia', materia: 'Historia', vencimiento: 'Mié 1/abr', completada: true },
  ],
  Mensuales: [
    { id: '7', titulo: 'Maqueta del sistema solar', materia: 'C. Naturales', vencimiento: '30/abr', completada: false },
    { id: '8', titulo: 'Exposición: animales en peligro', materia: 'Español', vencimiento: '25/abr', completada: false },
    { id: '9', titulo: 'Álbum de personajes históricos', materia: 'Historia', vencimiento: '28/abr', completada: true },
  ],
};

const MATERIAS = ['Matemáticas', 'Español', 'C. Naturales', 'Historia', 'Ed. Física', 'Inglés', 'Arte'];

const materiaColor = (materia) => {
  const map = {
    'Matemáticas': '#fce4ec',
    'Español': '#e3f2fd',
    'C. Naturales': '#f3e5f5',
    'Historia': '#fff8e1',
    'Ed. Física': '#e8f5e9',
    'Inglés': '#e0f7fa',
    'Arte': '#fff3e0',
  };
  return map[materia] || '#f4f6fb';
};

const materiaDark = (materia) => {
  const map = {
    'Matemáticas': '#c62828',
    'Español': '#1565c0',
    'C. Naturales': '#6a1b9a',
    'Historia': '#e65100',
    'Ed. Física': '#2e7d32',
    'Inglés': '#00695c',
    'Arte': '#bf360c',
  };
  return map[materia] || '#002f6c';
};

export default function Tareas() {
  const [activeTab, setActiveTab] = useState('Diarias');
  const [tareas, setTareas] = useState(initialTareas);
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [materia, setMateria] = useState(MATERIAS[0]);
  const [vencimiento, setVencimiento] = useState('');

  const toggle = (id) => {
    setTareas(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(t => t.id === id ? { ...t, completada: !t.completada } : t),
    }));
  };

  const addTarea = () => {
    if (!titulo.trim()) return;
    const newTarea = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      materia,
      vencimiento: vencimiento.trim() || '—',
      completada: false,
    };
    setTareas(prev => ({ ...prev, [activeTab]: [newTarea, ...prev[activeTab]] }));
    setTitulo('');
    setVencimiento('');
    setMateria(MATERIAS[0]);
    setModalVisible(false);
  };

  const pendientes = tareas[activeTab].filter(t => !t.completada).length;
  const total = tareas[activeTab].length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Tareas</Text>
          <Text style={styles.headerSub}>{pendientes} pendiente{pendientes !== 1 ? 's' : ''} de {total}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.addBtnText}>+ Nueva</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Task list */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingTop: 8 }}>
        {tareas[activeTab].length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✅</Text>
            <Text style={styles.emptyText}>Sin tareas en esta categoría</Text>
          </View>
        )}
        {tareas[activeTab].map(tarea => (
          <TouchableOpacity key={tarea.id} style={styles.card} onPress={() => toggle(tarea.id)} activeOpacity={0.8}>
            <View style={[styles.checkbox, tarea.completada && styles.checkboxDone]}>
              {tarea.completada && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, tarea.completada && styles.cardTitleDone]} numberOfLines={2}>
                {tarea.titulo}
              </Text>
              <View style={styles.cardMeta}>
                <View style={[styles.materiaBadge, { backgroundColor: materiaColor(tarea.materia) }]}>
                  <Text style={[styles.materiaBadgeText, { color: materiaDark(tarea.materia) }]}>{tarea.materia}</Text>
                </View>
                <Text style={styles.vencimiento}>📅 {tarea.vencimiento}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Add modal */}
      <Modal transparent animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Nueva tarea</Text>

            <Text style={styles.fieldLabel}>Título</Text>
            <TextInput
              style={styles.input}
              placeholder="Describe la tarea..."
              placeholderTextColor="#aaa"
              value={titulo}
              onChangeText={setTitulo}
            />

            <Text style={styles.fieldLabel}>Materia</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
              {MATERIAS.map(m => (
                <TouchableOpacity
                  key={m}
                  onPress={() => setMateria(m)}
                  style={[styles.materiaChip, { backgroundColor: materiaColor(m), borderColor: materiaDark(m), borderWidth: materia === m ? 2 : 0 }]}>
                  <Text style={[styles.materiaChipText, { color: materiaDark(m) }]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.fieldLabel}>Fecha de entrega</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Hoy, Vie 3/abr, 30/abr..."
              placeholderTextColor="#aaa"
              value={vencimiento}
              onChangeText={setVencimiento}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={addTarea}>
                <Text style={styles.saveBtnText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  header: {
    backgroundColor: '#002f6c',
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  addBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  tabsRow: { flexDirection: 'row', marginHorizontal: 16, marginTop: 16, marginBottom: 4, gap: 8 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#e8eaf0', alignItems: 'center' },
  tabActive: { backgroundColor: '#002f6c' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#888' },
  tabTextActive: { color: '#fff' },
  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 15, color: '#aaa' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#002f6c',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxDone: { backgroundColor: '#002f6c', borderColor: '#002f6c' },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '600', color: '#1a1a2e', marginBottom: 8 },
  cardTitleDone: { color: '#aaa', textDecorationLine: 'line-through' },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  materiaBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  materiaBadgeText: { fontSize: 11, fontWeight: '600' },
  vencimiento: { fontSize: 12, color: '#999' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 36 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#002f6c', marginBottom: 20 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6 },
  input: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fafafa',
    marginBottom: 16,
  },
  materiaChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, marginRight: 8 },
  materiaChipText: { fontSize: 13, fontWeight: '600' },
  modalButtons: { flexDirection: 'row', gap: 12, marginTop: 4 },
  cancelBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, backgroundColor: '#f0f0f0', alignItems: 'center' },
  cancelBtnText: { fontWeight: '600', color: '#666' },
  saveBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, backgroundColor: '#002f6c', alignItems: 'center', elevation: 2 },
  saveBtnText: { fontWeight: 'bold', color: '#fff', fontSize: 15 },
});
