import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const eventos = [
  { id: '1', titulo: 'Festival de Primavera', fecha: '15/abr/2026', hora: '12:00 p.m.', descripcion: 'Celebra la llegada de la primavera con música, flores y actividades para toda la familia.', imagen: 'https://images.unsplash.com/photo-1490750967868-88df5691cc93?w=500' },
  { id: '2', titulo: 'Día del Niño', fecha: '30/abr/2026', hora: '10:00 a.m.', descripcion: 'Un día especial para todos los niños con juegos, sorpresas y regalos.', imagen: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500' },
  { id: '3', titulo: 'Kermés Escolar', fecha: '20/may/2026', hora: '11:00 a.m.', descripcion: 'Gran kermés con juegos, comida típica y presentaciones artísticas.', imagen: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=500' },
];

const comunicados = [
  { id: '1', titulo: 'Nuevo horario de actividades', descripcion: 'A partir del 6 de abril se implementa el nuevo horario de actividades extracurriculares.', detalles: 'Lunes: Fútbol 3:00 - 4:00 pm\nMiércoles: Natación 3:00 - 4:00 pm\nViernes: Arte 2:00 - 3:00 pm', fecha: '01/abr/2026', hora: '09:00', tieneImagen: false },
  { id: '2', titulo: 'Reunión de padres de familia', descripcion: 'Se les convoca a la reunión bimestral de padres de familia el próximo viernes.', detalles: 'Fecha: Viernes 10 de abril 2026\nHora: 6:00 p.m.\nLugar: Auditorio principal\nTema: Resultados del primer bimestre.', fecha: '28/mar/2026', hora: '14:00', tieneImagen: false },
  { id: '3', titulo: 'Semana Cultural 2026', descripcion: 'Del 27 al 31 de abril se llevará a cabo la Semana Cultural con diversas actividades.', detalles: 'Lunes: Exposición de arte\nMartes: Concurso de oratoria\nMiércoles: Obra de teatro\nJueves: Feria de ciencias\nViernes: Clausura y premiación', fecha: '15/mar/2026', hora: '11:30', tieneImagen: false },
];

export default function Comunicacion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedEvent, setExpandedEvent] = useState({});
  const [expanded, setExpanded] = useState({});

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (width * 0.85 + 20));
    setActiveIndex(index);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Eventos carousel */}
      <Text style={styles.sectionTitle}>Eventos</Text>
      <FlatList
        data={eventos}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        snapToInterval={width * 0.85 + 16}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Image source={{ uri: item.imagen }} style={styles.eventImage} />
            <View style={styles.eventBody}>
              <Text style={styles.eventTitle}>{item.titulo}</Text>
              <View style={styles.eventMeta}>
                <Text style={styles.metaText}>📅 {item.fecha}</Text>
                <Text style={styles.metaText}>🕐 {item.hora}</Text>
              </View>
              {expandedEvent[item.id] && (
                <Text style={styles.eventDesc}>{item.descripcion}</Text>
              )}
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => setExpandedEvent(prev => ({ ...prev, [item.id]: !prev[item.id] }))}>
                <Text style={styles.moreButtonText}>
                  {expandedEvent[item.id] ? 'Mostrar menos ▲' : 'Más información ▼'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {eventos.map((_, i) => (
          <View key={i} style={[styles.dot, activeIndex === i && styles.dotActive]} />
        ))}
      </View>

      {/* Comunicados */}
      <Text style={styles.sectionTitle}>Comunicados</Text>
      {comunicados.map(item => (
        <View key={item.id} style={styles.comunicadoCard}>
          <View style={styles.comunicadoHeader}>
            <View style={styles.comunicadoBadge}>
              <Text style={styles.comunicadoBadgeText}>📌 Comunicado</Text>
            </View>
            <Text style={styles.comunicadoDate}>{item.fecha} · {item.hora}</Text>
          </View>
          <Text style={styles.comunicadoTitle}>{item.titulo}</Text>
          <Text style={styles.comunicadoDesc}>{item.descripcion}</Text>
          {expanded[item.id] && (
            <View style={styles.comunicadoDetails}>
              <Text style={styles.comunicadoDetailsText}>{item.detalles}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => setExpanded(prev => ({ ...prev, [item.id]: !prev[item.id] }))}>
            <Text style={styles.moreButtonText}>
              {expanded[item.id] ? 'Mostrar menos ▲' : 'Ver detalles ▼'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002f6c',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  eventCard: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  eventImage: { width: '100%', height: 160 },
  eventBody: { padding: 14 },
  eventTitle: { fontSize: 16, fontWeight: 'bold', color: '#002f6c', marginBottom: 8 },
  eventMeta: { flexDirection: 'row', gap: 16, marginBottom: 8 },
  metaText: { fontSize: 13, color: '#666' },
  eventDesc: { fontSize: 14, color: '#555', lineHeight: 20, marginBottom: 8 },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 12, gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#ccc' },
  dotActive: { backgroundColor: '#002f6c', width: 20 },
  comunicadoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  comunicadoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  comunicadoBadge: { backgroundColor: '#e8f0fe', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  comunicadoBadgeText: { fontSize: 12, color: '#002f6c', fontWeight: '600' },
  comunicadoDate: { fontSize: 12, color: '#999' },
  comunicadoTitle: { fontSize: 16, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 6 },
  comunicadoDesc: { fontSize: 14, color: '#666', lineHeight: 20 },
  comunicadoDetails: {
    backgroundColor: '#f4f6fb',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  comunicadoDetailsText: { fontSize: 13, color: '#444', lineHeight: 20 },
  moreButton: { marginTop: 10, alignSelf: 'flex-start' },
  moreButtonText: { color: '#007bff', fontSize: 13, fontWeight: '600' },
});
