import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, Animated } from 'react-native';
import { styles } from './styled';
import moment from 'moment';
import CalendarEventCard from '@components/UI/CalendarEventCard';
import CalendarEventList from '@components/UI/CalendarEventList';
import 'moment/locale/ru';
import { FONTS } from '@constants/Fonts';

// Принудительно устанавливаем локализацию на русский язык
moment.locale('ru');

interface TimeSlot {
  start: string;
  end: string;
  isBooked: boolean;
  events?: Array<{
    salonName: string;
    service: string;
    masterName: string;
    rating: number;
    time: string;
    duration: string;
    avatarUri?: string;
    status: 'confirmed' | 'active';
  }>;
}

interface TimePickerProps {
  onSelectionChange?: (selectedSlots: string[]) => void;
  bookedSlots?: TimeSlot[];
  date?: string; // формат YYYY-MM-DD
}

const TimePicker: React.FC<TimePickerProps> = ({ onSelectionChange, bookedSlots = [], date }) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEvents, setModalEvents] = useState<TimeSlot['events']>([]);
  const [modalSlot, setModalSlot] = useState<TimeSlot | null>(null);
  const [scrollOffset, setScrollOffset] = useState<number>(0); // Для отслеживания прокрутки
  const positionAnim = useRef(new Animated.Value(0)).current; // Анимация позиции линии
  const scrollViewRef = useRef<ScrollView>(null); // Ссылка на ScrollView

  const currentDate = date ? moment(date, 'YYYY-MM-DD') : moment();
  const isToday = date ? moment(date, 'YYYY-MM-DD').isSame(moment(), 'day') : true;
  const startHour = 8;

  // Фиксированные значения высот
  const timeTextHeight = 20; // Высота текста времени
  const standardSlotHeight = 60; // Стандартная высота слота (без карточек)
  const largeCardHeight = 138; // Высота для единичной карточки (isMini={false})
  const smallCardHeight = 70; // Высота для маленьких карточек (isMini={true})

  useEffect(() => {
    const updateSlots = () => {
      const slots: TimeSlot[] = [];

      for (let hour = startHour; hour < 23; hour++) {
        const start = `${String(hour).padStart(2, '0')}:00`;
        const end = `${String(hour + 1).padStart(2, '0')}:00`;

        const bookedSlot = bookedSlots.find((bs) => bs.start === start && bs.end === end);
        const isBooked = bookedSlot?.isBooked || bookedSlot?.is_booked;

        slots.push({
          start,
          end,
          isBooked: isBooked || false,
          events: bookedSlot?.events,
        });
      }

      setTimeSlots(slots);
    };

    updateSlots();
    const timer = setInterval(updateSlots, 60000);
    return () => clearInterval(timer);
  }, [bookedSlots]);

  useEffect(() => {
    const updatePosition = () => {
      const now = new Date();
      const localMoment = moment(now);
      const currentHour = localMoment.hour();
      const currentMinute = localMoment.minute();

      console.log('Current Time in updatePosition:', localMoment.format('YYYY-MM-DD HH:mm:ss'), 'Hour:', currentHour, 'Minute:', currentMinute);

      // Определяем, должен ли отображаться индикатор текущего времени
      const isWithinRange = isToday && (currentHour >= startHour || (currentHour < startHour && localMoment.isSame(currentDate, 'day')));

      if (!isWithinRange) {
        Animated.spring(positionAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        return;
      }

      // Индекс слота (от 8:00 до 23:00)
      // Если время меньше startHour, позиционируем на первом слоте
      const effectiveHour = currentHour < startHour ? startHour : currentHour;
      const slotIndex = Math.min(Math.max(effectiveHour - startHour, 0), timeSlots.length - 1);

      // Делим слот на 5 секций (по 12 минут)
      const minutesPerSection = 12;
      const sectionIndex = Math.floor(currentMinute / minutesPerSection); // 0–4

      // Рассчитываем позицию на основе высот слотов
      let position = 0;
      for (let i = 0; i < slotIndex; i++) {
        const slot = timeSlots[i];
        let slotHeight = standardSlotHeight; // Стандартная высота по умолчанию
        if (slot.events && slot.events.length > 0) {
          slotHeight = slot.events.length === 1 ? largeCardHeight : smallCardHeight;
        }
        position += timeTextHeight + slotHeight;
      }
      // Добавляем высоту текста времени текущего слота
      position += timeTextHeight;

      // Смещение внутри текущего слота
      const currentSlot = timeSlots[slotIndex];
      let currentSlotHeight = standardSlotHeight;
      if (currentSlot.events && currentSlot.events.length > 0) {
        currentSlotHeight = currentSlot.events.length === 1 ? largeCardHeight : smallCardHeight;
      }
      const sectionOffset = (sectionIndex * currentSlotHeight) / 5;

      position += sectionOffset;

      // Корректируем позицию с учётом прокрутки
      const adjustedPosition = position - scrollOffset;

      console.log(
        'Slot Index:', slotIndex,
        'Section Index:', sectionIndex,
        'Scroll Offset:', scrollOffset,
        'Current Slot Height:', currentSlotHeight,
        'Calculated position:', position,
        'Adjusted position:', adjustedPosition
      );

      // Анимируем позицию линии
      Animated.spring(positionAnim, {
        toValue: adjustedPosition,
        useNativeDriver: true,
      }).start();

      // Прокручиваем ScrollView к текущему времени (только при первом рендеринге)
      if (scrollOffset === 0 && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: position - 100, animated: true }); // Прокручиваем с небольшим отступом сверху
      }
    };

    updatePosition();
    const timer = setInterval(updatePosition, 1000); // Обновляем каждую секунду
    return () => clearInterval(timer);
  }, [isToday, timeSlots, scrollOffset]);

  const handleMorePress = (slotEvents: TimeSlot['events'], slot: TimeSlot) => {
    setModalEvents(slotEvents);
    setModalSlot(slot);
    setModalVisible(true);
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollOffset(offsetY);
  };

  const renderModalTitle = useMemo(() => {
    if (!modalSlot) return null;
    const dayOfWeek = currentDate.format('dddd').toUpperCase();
    return (
      <View style={styles.modalTitleContainer}>
        <View style={styles.dateContainer}>
          <View style={styles.dateBlock}>
            <Text style={[styles.modalTitleTime, { color: '#007AFF' }]}>{modalSlot.start.slice(0, 2)}</Text>
          </View>
          <Text style={[styles.modalTitleDay, { color: '#000000' }]}>{dayOfWeek}</Text>
        </View>
        <View style={styles.timeBlock}>
          <Text style={[styles.modalTitleTime, { color: '#007AFF' }]}>{modalSlot.end}</Text>
        </View>
      </View>
    );
  }, [modalSlot]);

  return (
    <View style={styles.container}>
      <View style={styles.timePickerWrapper}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.slotsContainer}>
            {timeSlots.map((slot, index) => (
              <React.Fragment key={index}>
                <Text style={styles.timeText}>{slot.start}</Text>
                <View style={styles.slotWrapper}>
                  {slot.isBooked && slot.events && slot.events.length > 0 ? (
                    slot.events.length === 1 ? (
                      <CalendarEventList
                        events={slot.events}
                        onMorePress={() => handleMorePress(slot.events, slot)}
                        isMini={false}
                      />
                    ) : (
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.eventListContent}
                      >
                        <View style={styles.eventListWrapper}>
                          <CalendarEventList
                            events={slot.events}
                            onMorePress={() => handleMorePress(slot.events, slot)}
                            isMini={true}
                          />
                        </View>
                      </ScrollView>
                    )
                  ) : (
                    <View style={styles.emptySlot} />
                  )}
                </View>
              </React.Fragment>
            ))}
            <Text style={styles.timeText}>23:00</Text>
          </View>
        </ScrollView>

        {(isToday || moment().isSame(currentDate, 'day')) && (
          <Animated.View
            style={[styles.currentTimeLine, { transform: [{ translateY: positionAnim }] }]}
          >
            <View style={styles.currentTimeDot} />
            <View style={styles.currentTimeLineBar} />
          </Animated.View>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {renderModalTitle}
            <ScrollView style={styles.modalScroll}>
              {modalEvents.map((event, index) => (
                <View key={index} style={styles.modalEvent}>
                  <CalendarEventCard
                    salonName={event.salonName}
                    service={event.service}
                    masterName={event.masterName}
                    rating={event.rating}
                    time={event.time}
                    duration={event.duration}
                    avatarUri={event.avatarUri}
                    status={event.status}
                    isMini={false}
                  />
                </View>
              ))}
            </ScrollView>
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

export default TimePicker;