import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
const FULL_DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const HOURS = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

const clases = [
  { dia: 'Lunes', horaInicio: 7, horaFin: 8, materia: 'Español', color: '#e3f2fd', colorDark: '#1565c0', profesor: 'Mtra. María López', aula: 'Aula 1', descripcion: 'Lectura y escritura, comprensión de textos.' },
  { dia: 'Lunes', horaInicio: 9, horaFin: 10, materia: 'Matemáticas', color: '#fce4ec', colorDark: '#c62828', profesor: 'Mtro. Juan Pérez', aula: 'Aula 3', descripcion: 'Operaciones básicas y resolución de problemas.' },
  { dia: 'Lunes', horaInicio: 11, horaFin: 12, materia: 'Ed. Física', color: '#e8f5e9', colorDark: '#2e7d32', profesor: 'Mtro. Roberto Torres', aula: 'Gimnasio', descripcion: 'Actividades deportivas y coordinación.' },
  { dia: 'Martes', horaInicio: 7, horaFin: 8, materia: 'Matemáticas', color: '#fce4ec', colorDark: '#c62828', profesor: 'Mtro. Juan Pérez', aula: 'Aula 3', descripcion: 'Operaciones básicas y resolución de problemas.' },
  { dia: 'Martes', horaInicio: 9, horaFin: 10, materia: 'C. Naturales', color: '#f3e5f5', colorDark: '#6a1b9a', profesor: 'Mtra. Ana Gómez', aula: 'Aula 2', descripcion: 'Experimentos y el mundo natural.' },
  { dia: 'Martes', horaInicio: 11, horaFin: 13, materia: 'Historia', color: '#fff8e1', colorDark: '#e65100', profesor: 'Mtro. Pedro Ruiz', aula: 'Aula 4', descripcion: 'Historia de México y el mundo.' },
  { dia: 'Miércoles', horaInicio: 7, horaFin: 9, materia: 'Español', color: '#e3f2fd', colorDark: '#1565c0', profesor: 'Mtra. María López', aula: 'Aula 1', descripcion: 'Lectura y escritura, comprensión de textos.' },
  { dia: 'Miércoles', horaInicio: 10, horaFin: 11, materia: 'Matemáticas', color: '#fce4ec', colorDark: '#c62828', profesor: 'Mtro. Juan Pérez', aula: 'Aula 3', descripcion: 'Operaciones básicas y resolución de problemas.' },
  { dia: 'Miércoles', horaInicio: 12, horaFin: 13, materia: 'Arte', color: '#fff3e0', colorDark: '#bf360c', profesor: 'Mtra. Lucia Ramos', aula: 'Taller', descripcion: 'Dibujo, pintura y manualidades.' },
  { dia: 'Jueves', horaInicio: 7, horaFin: 8, materia: 'C. Naturales', color: '#f3e5f5', colorDark: '#6a1b9a', profesor: 'Mtra. Ana Gómez', aula: 'Aula 2', descripcion: 'Experimentos y el mundo natural.' },
  { dia: 'Jueves', horaInicio: 9, horaFin: 10, materia: 'Historia', color: '#fff8e1', colorDark: '#e65100', profesor: 'Mtro. Pedro Ruiz', aula: 'Aula 4', descripcion: 'Historia de México y el mundo.' },
  { dia: 'Jueves', horaInicio: 11, horaFin: 12, materia: 'Inglés', color: '#e0f7fa', colorDark: '#00695c', profesor: 'Miss Karen White', aula: 'Aula 5', descripcion: 'Vocabulario básico y pronunciación.' },
  { dia: 'Viernes', horaInicio: 7, horaFin: 8, materia: 'Ed. Física', color: '#e8f5e9', colorDark: '#2e7d32', profesor: 'Mtro. Roberto Torres', aula: 'Gimnasio', descripcion: 'Actividades deportivas y coordinación.' },
  { dia: 'Viernes', horaInicio: 9, horaFin: 11, materia: 'Español', color: '#e3f2fd', colorDark: '#1565c0', profesor: 'Mtra. María López', aula: 'Aula 1', descripcion: 'Lectura y escritura, comprensión de textos.' },
  { dia: 'Viernes', horaInicio: 12, horaFin: 13, materia: 'Arte', color: '#fff3e0', colorDark: '#bf360c', profesor: 'Mtra. Lucia Ramos', aula: 'Taller', descripcion: 'Dibujo, pintura y manualidades.' },
];

const HOUR_H = 60;
const TIME_W = 52;
const DAY_W = 100;

export default function Horario() {
  const [selected, setSelected] = useState(null);

  const startHour = 7;

  return (
    <View style={styles.container}>
      {/* Day headers */}
      <View style={styles.headerRow}>
        <View style={{ width: TIME_W }} />
        {DAYS.map((d, i) => (
          <View key={d} style={styles.dayHeader}>
            <Text style={styles.dayHeaderText}>{d}</Text>
          </View>
        ))}
      </View>

      {/* Grid */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row' }}>
            {/* Time column */}
            <View style={{ width: TIME_W }}>
              {HOURS.map(h => (
                <View key={h} style={styles.timeCell}>
                  <Text style={styles.timeText}>{h}</Text>
                </View>
              ))}
            </View>

            {/* Day columns */}
            {FULL_DAYS.map(dia => (
              <View key={dia} style={{ width: DAY_W }}>
                {HOURS.map((h, hi) => {
                  const hr = startHour + hi;
                  const clase = clases.find(c => c.dia === dia && c.horaInicio === hr);
                  const isCovered = clases.some(c => c.dia === dia && c.horaInicio < hr && c.horaFin > hr);

                  if (isCovered) return null;

                  const span = clase ? clase.horaFin - clase.horaInicio : 1;

                  return (
                    <TouchableOpacity
                      key={h}
                      activeOpacity={clase ? 0.7 : 1}
                      onPress={() => clase && setSelected(clase)}
                      style={[
                        styles.cell,
                        { height: HOUR_H * span },
                        clase && { backgroundColor: clase.color, borderLeftWidth: 3, borderLeftColor: clase.colorDark },
                      ]}>
                      {clase && (
                        <>
                          <Text style={[styles.claseName, { color: clase.colorDark }]} numberOfLines={2}>{clase.materia}</Text>
                          <Text style={[styles.claseHora, { color: clase.colorDark }]}>{clase.horaInicio}:00–{clase.horaFin}:00</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>

      {/* Modal */}
      <Modal transparent animationType="fade" visible={!!selected} onRequestClose={() => setSelected(null)}>
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            {selected && (
              <>
                <View style={[styles.modalAccent, { backgroundColor: selected.colorDark }]} />
                <View style={styles.modalBody}>
                  <Text style={[styles.modalTitle, { color: selected.colorDark }]}>{selected.materia}</Text>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Horario</Text>
                    <Text style={styles.modalValue}>{selected.horaInicio}:00 – {selected.horaFin}:00</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Profesor</Text>
                    <Text style={styles.modalValue}>{selected.profesor}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Aula</Text>
                    <Text style={styles.modalValue}>{selected.aula}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Descripción</Text>
                    <Text style={styles.modalValue}>{selected.descripcion}</Text>
                  </View>
                  <TouchableOpacity style={[styles.closeBtn, { backgroundColor: selected.colorDark }]} onPress={() => setSelected(null)}>
                    <Text style={styles.closeBtnText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#002f6c',
    paddingVertical: 10,
    paddingLeft: 0,
  },
  dayHeader: { width: DAY_W, alignItems: 'center' },
  dayHeaderText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  timeCell: {
    height: HOUR_H,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  timeText: { fontSize: 11, color: '#999' },
  cell: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e0e0e0',
    padding: 4,
    justifyContent: 'center',
  },
  claseName: { fontSize: 11, fontWeight: 'bold', flexWrap: 'wrap' },
  claseHora: { fontSize: 10, marginTop: 2, opacity: 0.8 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { backgroundColor: '#fff', borderRadius: 20, width: '85%', overflow: 'hidden', elevation: 10 },
  modalAccent: { height: 6 },
  modalBody: { padding: 22 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  modalRow: { marginBottom: 12 },
  modalLabel: { fontSize: 11, color: '#999', fontWeight: '600', marginBottom: 2 },
  modalValue: { fontSize: 15, color: '#333' },
  closeBtn: { paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  closeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
