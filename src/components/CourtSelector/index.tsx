import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styled';

interface CourtSelectorProps {
  selectedCourt: string;
  onCourtSelect: (court: string) => void;
  courts: string[]; // Список доступных кортов
}

const CourtSelector: React.FC<CourtSelectorProps> = ({ selectedCourt, onCourtSelect, courts }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderCourtItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.courtItem}
      onPress={() => {
        onCourtSelect(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.courtItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Текущий корт</Text>
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedCourtText}>{selectedCourt}</Text>
        <Ionicons name="chevron-down" size={20} color="#000" />
      </TouchableOpacity>

      {/* Модальное окно для выбора корта */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={courts}
              renderItem={renderCourtItem}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CourtSelector;