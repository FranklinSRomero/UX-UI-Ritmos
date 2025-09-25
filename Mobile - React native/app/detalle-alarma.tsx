import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { RitmosColors, RitmosComponents, RitmosElevation, RitmosSpacing, RitmosTypography } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Share, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetalleAlarmaScreen() {
  const [isActive, setIsActive] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareNotes, setShareNotes] = useState(true);

  // Datos estáticos de la primera alarma (Centro Comercial)
  const alarmaData = {
    id: 1,
    titulo: '# 1 Centro Comercial',
    descripcion: 'Camiseta para mi hija de 80k pesos',
    ubicacion: 'Centro Comercial Principal',
    coordenadas: { lat: -34.6037, lng: -58.3816 }, // Coordenadas de ejemplo
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleToggleActive = (value: boolean) => {
    setIsActive(value);
    console.log(`Alarma ${value ? 'activada' : 'desactivada'}`);
  };

  const handleEditar = () => {
    Alert.alert(
      'Editar Alarma',
      '¿Deseas editar esta alarma?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Editar',
          onPress: () => {
            console.log('Navegar a editar alarma');
            // TODO: Implementar navegación a pantalla de edición
          }
        }
      ]
    );
  };

  const handleEliminar = () => {
    Alert.alert(
      'Eliminar Alarma',
      '¿Estás seguro que deseas eliminar esta alarma? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            console.log('Eliminando alarma...');
            Alert.alert('Alarma eliminada', 'La alarma ha sido eliminada exitosamente');
            router.back();
          }
        }
      ]
    );
  };

  const handleCompartir = async () => {
    setShowShareModal(true);
  };

  const handleCloseModal = () => {
    setShowShareModal(false);
  };

  const handleEnlace = async () => {
    try {
      const result = await Share.share({
        message: `¡Mira mi alarma de Ritmos! 📍\n\n${alarmaData.titulo}\n${shareNotes ? alarmaData.descripcion + '\n\n' : ''}Ubicación: ${alarmaData.ubicacion}\n\n🔗 https://ritmos.app/alarma/${alarmaData.id}`,
        title: 'Compartir Alarma'
      });

      if (result.action === Share.sharedAction) {
        console.log('Enlace compartido exitosamente');
        setShowShareModal(false);
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      Alert.alert('Error', 'No se pudo compartir el enlace');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <IconSymbol size={24} name="chevron.left" color={RitmosColors.surface} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Detalle Alarma</Text>
          <View style={styles.backButton} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Título y Toggle */}
          <View style={styles.titleSection}>
            <Text style={styles.alarmTitle}>{alarmaData.titulo}</Text>
            <Switch
              value={isActive}
              onValueChange={handleToggleActive}
              trackColor={{ false: RitmosColors.outline, true: RitmosColors.primary }}
              thumbColor={isActive ? RitmosColors.surface : RitmosColors.surfaceVariant}
              ios_backgroundColor={RitmosColors.outline}
              style={styles.toggleSwitch}
            />
          </View>

          {/* Descripción */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{alarmaData.descripcion}</Text>
          </View>

          {/* Sección de Ubicación */}
          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Ubicación</Text>

            {/* Mini Mapa */}
            <View style={styles.miniMapContainer}>
              <View style={styles.miniMap}>
                {/* Simular mapa con patrón */}
                <View style={styles.mapPattern}>
                  {/* Marcador en el centro */}
                  <View style={styles.mapMarker}>
                    <View style={styles.markerDot} />
                  </View>
                </View>
              </View>
            </View>

            {/* Botones de Acción */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity style={styles.actionButton} onPress={handleEditar}>
                <IconSymbol size={16} name="pencil" color={RitmosColors.text.onSurface} />
                <Text style={styles.actionButtonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleEliminar}>
                <IconSymbol size={16} name="trash" color={RitmosColors.error} />
                <Text style={styles.actionButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Botón Compartir */}
          <View style={styles.shareSection}>
            <TouchableOpacity style={styles.shareButton} onPress={handleCompartir}>
              <IconSymbol size={20} name="square.and.arrow.up" color={RitmosColors.text.onSurface} />
              <Text style={styles.shareButtonText}>Compartir</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Modal de Compartir */}
        <Modal
          visible={showShareModal}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Header del Modal */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{alarmaData.titulo}</Text>
                <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                  <IconSymbol size={24} name="xmark" color={RitmosColors.text.onSurface} />
                </TouchableOpacity>
              </View>

              {/* Código QR */}
              <View style={styles.qrContainer}>
                <View style={styles.qrCode}>
                  {/* Simulación de código QR con patrón de cuadrados */}
                  <View style={styles.qrPattern}>
                    {Array.from({ length: 15 }, (_, row) =>
                      Array.from({ length: 15 }, (_, col) => (
                        <View
                          key={`${row}-${col}`}
                          style={[
                            styles.qrPixel,
                            {
                              backgroundColor: (row + col) % 3 === 0 ? '#000' : '#fff',
                            },
                          ]}
                        />
                      ))
                    )}
                  </View>
                </View>
              </View>

              {/* Toggle Compartir Notas */}
              <View style={styles.shareToggleContainer}>
                <Text style={styles.shareToggleLabel}>Compartir las Notas</Text>
                <Switch
                  value={shareNotes}
                  onValueChange={setShareNotes}
                  trackColor={{ false: RitmosColors.outline, true: RitmosColors.primary }}
                  thumbColor={shareNotes ? RitmosColors.surface : RitmosColors.surfaceVariant}
                  ios_backgroundColor={RitmosColors.outline}
                />
              </View>

              {/* Botón Enlace */}
              <TouchableOpacity style={styles.linkButton} onPress={handleEnlace}>
                <IconSymbol size={20} name="link" color={RitmosColors.text.onSurface} />
                <Text style={styles.linkButtonText}>Enlace</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RitmosColors.background,
  },
  header: {
    ...RitmosComponents.screenHeader,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    ...RitmosComponents.screenHeaderText,
  },
  content: {
    flex: 1,
    paddingHorizontal: RitmosSpacing.lg,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: RitmosSpacing.lg,
  },
  alarmTitle: {
    ...RitmosComponents.headingLarge,
    flex: 1,
  },
  toggleSwitch: {
    marginLeft: RitmosSpacing.md,
  },
  descriptionContainer: {
    backgroundColor: RitmosColors.surfaceVariant,
    borderRadius: RitmosSpacing.lg,
    padding: RitmosSpacing.lg,
    marginBottom: RitmosSpacing.xl - RitmosSpacing.xs,
    ...RitmosElevation.level1,
  },
  descriptionText: {
    ...RitmosComponents.bodyText,
    lineHeight: 22,
  },
  locationSection: {
    marginBottom: RitmosSpacing.xl - RitmosSpacing.xs,
  },
  sectionTitle: {
    ...RitmosComponents.headingMedium,
    marginBottom: RitmosSpacing.lg,
  },
  miniMapContainer: {
    marginBottom: RitmosSpacing.lg,
  },
  miniMap: {
    height: 200,
    borderRadius: RitmosSpacing.md,
    overflow: 'hidden',
    backgroundColor: RitmosColors.surfaceVariant,
    ...RitmosElevation.level1,
  },
  mapPattern: {
    flex: 1,
    backgroundColor: RitmosColors.surfaceVariant,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: RitmosColors.error,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: RitmosColors.surface,
    ...RitmosElevation.level2,
  },
  markerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: RitmosColors.surface,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: RitmosSpacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RitmosColors.surfaceVariant,
    paddingVertical: RitmosSpacing.sm + 4,
    paddingHorizontal: RitmosSpacing.lg,
    borderRadius: RitmosSpacing.lg + RitmosSpacing.sm,
    gap: RitmosSpacing.xs,
    ...RitmosElevation.level1,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: RitmosColors.error,
  },
  actionButtonText: {
    fontSize: RitmosTypography.scale.bodyMedium.fontSize,
    color: RitmosColors.text.onSurface,
    fontWeight: RitmosTypography.scale.labelMedium.fontWeight,
    fontFamily: RitmosTypography.fonts.primary,
  },
  shareSection: {
    paddingBottom: 40,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    gap: 10,
  },
  shareButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  // Estilos del Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrContainer: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  qrCode: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    padding: 10,
  },
  qrPattern: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  qrPixel: {
    width: '6.67%',
    height: '6.67%',
    margin: 0,
  },
  shareToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  shareToggleLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    gap: 8,
    width: '100%',
  },
  linkButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});