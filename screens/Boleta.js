import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';

const TABS = ['Evaluación', 'Inasistencias'];

const subjects = [
  { name: 'Español', scores: [9, 10, 9, 10, 10], comment: 'Excelente desempeño en lectura y escritura.', profesor: 'Mtra. María López', aula: 'Aula 1' },
  { name: 'Matemáticas', scores: [8, 9, 10, 9, 10], comment: 'Buen manejo de operaciones básicas.', profesor: 'Mtro. Juan Pérez', aula: 'Aula 3' },
  { name: 'C. Naturales', scores: [10, 10, 9, 10, 9], comment: 'Gran participación en experimentos.', profesor: 'Mtra. Ana Gómez', aula: 'Aula 2' },
  { name: 'Historia', scores: [9, 8, 9, 9, 10], comment: 'Muy buena comprensión de los temas.', profesor: 'Mtro. Pedro Ruiz', aula: 'Aula 4' },
  { name: 'Ed. Física', scores: [10, 10, 10, 10, 10], comment: 'Excelente actitud y participación.', profesor: 'Mtro. Roberto Torres', aula: 'Gimnasio' },
];

const inasistencias = [
  { materia: 'Español', total: 2, justificadas: 1, noJustificadas: 1 },
  { materia: 'Matemáticas', total: 1, justificadas: 1, noJustificadas: 0 },
  { materia: 'C. Naturales', total: 0, justificadas: 0, noJustificadas: 0 },
  { materia: 'Historia', total: 3, justificadas: 2, noJustificadas: 1 },
  { materia: 'Ed. Física', total: 1, justificadas: 0, noJustificadas: 1 },
];

const periods = ['1er', '2do', '3er', '4to', '5to'];
const MAX_FALTAS = 6;

const getScoreColor = (score) => {
  if (score >= 9) return '#2e7d32';
  if (score >= 7) return '#f57c00';
  return '#c62828';
};

export default function Boleta() {
  const [activeTab, setActiveTab] = useState('Evaluación');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const overall = subjects.reduce((sum, s) => {
    const avg = s.scores.reduce((a, b) => a + b, 0) / s.scores.length;
    return sum + avg;
  }, 0) / subjects.length;

  return (
    <View style={styles.container}>
      {/* Summary card */}
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryName}>Renata García</Text>
          <Text style={styles.summaryGrade}>1° B — Primaria · Ciclo 2025-2026</Text>
        </View>
        <View style={styles.summaryAvgCircle}>
          <Text style={styles.summaryAvgNumber}>{overall.toFixed(1)}</Text>
          <Text style={styles.summaryAvgLabel}>Promedio</Text>
        </View>
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

      {activeTab === 'Evaluación' && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.table}>
              {/* Header */}
              <View style={styles.tableRowHeader}>
                <Text style={[styles.cellHeader, styles.cellMateria]}>Materia</Text>
                {periods.map(p => <Text key={p} style={styles.cellHeader}>{p}</Text>)}
                <Text style={styles.cellHeader}>Prom.</Text>
              </View>
              {/* Rows */}
              {subjects.map(subject => {
                const avg = (subject.scores.reduce((a, b) => a + b, 0) / subject.scores.length).toFixed(1);
                return (
                  <TouchableOpacity
                    key={subject.name}
                    style={styles.tableRow}
                    onPress={() => { setSelectedSubject(subject); setModalVisible(true); }}>
                    <Text style={[styles.cell, styles.cellMateria, styles.cellMateriaText]}>{subject.name}</Text>
                    {subject.scores.map((score, i) => (
                      <Text key={i} style={[styles.cell, { color: getScoreColor(score), fontWeight: '600' }]}>{score}</Text>
                    ))}
                    <Text style={[styles.cell, { color: getScoreColor(parseFloat(avg)), fontWeight: 'bold' }]}>{avg}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          <Text style={styles.tapHint}>* Toca una materia para ver detalles del profesor</Text>
          {/* Comentario */}
          <View style={styles.commentCard}>
            <Text style={styles.commentTitle}>💬 Comentario del período</Text>
            <Text style={styles.commentText}>{subjects[0].comment}</Text>
          </View>
          <TouchableOpacity style={styles.downloadBtn}>
            <Text style={styles.downloadBtnText}>⬇ Descargar boleta</Text>
          </TouchableOpacity>
          <View style={{ height: 20 }} />
        </ScrollView>
      )}

      {activeTab === 'Inasistencias' && (
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 16 }}>
          <Text style={styles.inasistenciasTitle}>Registro de faltas por materia</Text>
          {inasistencias.map(item => {
            const pct = item.total / MAX_FALTAS;
            return (
              <View key={item.materia} style={styles.faltaCard}>
                <View style={styles.faltaHeader}>
                  <Text style={styles.faltaMateria}>{item.materia}</Text>
                  <Text style={[styles.faltaTotal, { color: item.total >= 3 ? '#c62828' : item.total >= 1 ? '#f57c00' : '#2e7d32' }]}>
                    {item.total} {item.total === 1 ? 'falta' : 'faltas'}
                  </Text>
                </View>
                {/* Barra de progreso */}
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, {
                    width: `${Math.min(pct * 100, 100)}%`,
                    backgroundColor: item.total >= 3 ? '#c62828' : item.total >= 1 ? '#f57c00' : '#2e7d32',
                  }]} />
                </View>
                <View style={styles.faltaDetalle}>
                  <View style={styles.faltaBadge}>
                    <View style={[styles.faltaDot, { backgroundColor: '#2e7d32' }]} />
                    <Text style={styles.faltaBadgeText}>Justificadas: {item.justificadas}</Text>
                  </View>
                  <View style={styles.faltaBadge}>
                    <View style={[styles.faltaDot, { backgroundColor: '#c62828' }]} />
                    <Text style={styles.faltaBadgeText}>No justificadas: {item.noJustificadas}</Text>
                  </View>
                </View>
              </View>
            );
          })}
          <View style={styles.faltaLimite}>
            <Text style={styles.faltaLimiteText}>⚠️ Límite permitido: {MAX_FALTAS} faltas por materia</Text>
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>
      )}

      {/* Modal detalle materia */}
      <Modal transparent animationType="fade" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {selectedSubject && (
              <>
                <Text style={styles.modalTitle}>{selectedSubject.name}</Text>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Profesor</Text>
                  <Text style={styles.modalValue}>{selectedSubject.profesor}</Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Aula</Text>
                  <Text style={styles.modalValue}>{selectedSubject.aula}</Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Comentario</Text>
                  <Text style={styles.modalValue}>{selectedSubject.comment}</Text>
                </View>
                <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalCloseText}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const CELL_W = 68;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  summaryCard: {
    backgroundColor: '#002f6c',
    margin: 16,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  summaryName: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  summaryGrade: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  summaryAvgCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryAvgNumber: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  summaryAvgLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)' },
  tabsRow: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 12, gap: 8 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#e8eaf0', alignItems: 'center' },
  tabActive: { backgroundColor: '#002f6c' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#888' },
  tabTextActive: { color: '#fff' },
  table: { marginLeft: 16, marginBottom: 4 },
  tableRowHeader: { flexDirection: 'row', backgroundColor: '#002f6c', borderRadius: 8, overflow: 'hidden', marginBottom: 2 },
  tableRow: { flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, borderRadius: 6 },
  cellHeader: { width: CELL_W, padding: 10, color: '#fff', fontWeight: 'bold', fontSize: 12, textAlign: 'center' },
  cell: { width: CELL_W, padding: 10, textAlign: 'center', fontSize: 13, color: '#333' },
  cellMateria: { width: 100 },
  cellMateriaText: { textAlign: 'left', color: '#002f6c', fontWeight: '600' },
  tapHint: { fontSize: 11, color: '#aaa', marginLeft: 16, marginTop: 6, marginBottom: 12 },
  commentCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
    elevation: 2,
    marginBottom: 12,
  },
  commentTitle: { fontSize: 14, fontWeight: 'bold', color: '#002f6c', marginBottom: 6 },
  commentText: { fontSize: 14, color: '#555', lineHeight: 20 },
  downloadBtn: {
    backgroundColor: '#002f6c',
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  downloadBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  inasistenciasTitle: { fontSize: 15, fontWeight: '600', color: '#444', marginBottom: 14 },
  faltaCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  faltaHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  faltaMateria: { fontSize: 16, fontWeight: 'bold', color: '#1a1a2e' },
  faltaTotal: { fontSize: 15, fontWeight: 'bold' },
  barBackground: { height: 8, backgroundColor: '#eee', borderRadius: 4, marginBottom: 10 },
  barFill: { height: 8, borderRadius: 4 },
  faltaDetalle: { flexDirection: 'row', gap: 16 },
  faltaBadge: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  faltaDot: { width: 9, height: 9, borderRadius: 5 },
  faltaBadgeText: { fontSize: 12, color: '#555' },
  faltaLimite: {
    backgroundColor: '#fff8e1',
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f57c00',
  },
  faltaLimiteText: { fontSize: 13, color: '#5d4037' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { backgroundColor: '#fff', borderRadius: 20, padding: 24, width: '85%', elevation: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#002f6c', marginBottom: 16, textAlign: 'center' },
  modalRow: { marginBottom: 12 },
  modalLabel: { fontSize: 12, color: '#999', fontWeight: '600', marginBottom: 2 },
  modalValue: { fontSize: 15, color: '#333' },
  modalClose: { backgroundColor: '#002f6c', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 16 },
  modalCloseText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
