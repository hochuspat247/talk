import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, Animated } from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';
import CalendarEventCard from '@components/UI/CalendarEventCard';
import CalendarEventList from '@components/UI/CalendarEventList';
import { styles } from './styled';
import { TimePickerProps, TimeSlot } from './types';
import { calculatePosition, initializeTimeSlots } from './utils';
import { START_HOUR, TIME_TEXT_HEIGHT, STANDARD_SLOT_HEIGHT, LARGE_CARD_HEIGHT, SMALL_CARD_HEIGHT } from './constants';

moment.locale('ru');








const TimePicker: React.FC<TimePickerProps> = ({ onSelectionChange, bookedSlots = [], date }) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEvents, setModalEvents] = useState<TimeSlot['events']>([]);
  const [modalSlot, setModalSlot] = useState<TimeSlot | null>(null);
  const [scrollOffset, setScrollOffset] = useState<number>(0);
  const positionAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const currentDate = date ? moment(date, 'YYYY-MM-DD') : moment();
  const isToday = date ? moment(date, 'YYYY-MM-DD').isSame(moment(), 'day') : true;

  
  useEffect(() => {
    const updateSlots = () => {
      const slots = initializeTimeSlots(bookedSlots, START_HOUR);
      setTimeSlots(slots);
    };

    updateSlots();
    const timer = setInterval(updateSlots, 60000);
    return () => clearInterval(timer);
  }, [bookedSlots]);

  
  useEffect(() => {
    const updatePosition = () => {
      const positionData = calculatePosition({
        timeSlots,
        currentDate,
        isToday,
        startHour: START_HOUR,
        scrollOffset,
        timeTextHeight: TIME_TEXT_HEIGHT,
        standardSlotHeight: STANDARD_SLOT_HEIGHT,
        largeCardHeight: LARGE_CARD_HEIGHT,
        smallCardHeight: SMALL_CARD_HEIGHT,
      });

      if (!positionData.isWithinRange) {
        Animated.spring(positionAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        return;
      }

      Animated.spring(positionAnim, {
        toValue: positionData.adjustedPosition,
        useNativeDriver: true,
      }).start();

      if (scrollOffset === 0 && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: positionData.position - 100, animated: true });
      }
    };

    updatePosition();
    const timer = setInterval(updatePosition, 1000);
    return () => clearInterval(timer);
  }, [isToday, timeSlots, scrollOffset]);

  const handleMorePress = (slotEvents: TimeSlot['events'], slot: TimeSlot) => {
    if (!slot || !slotEvents) {
      return;
    }
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
            {timeSlots.map((slot, index) => {
              if (!slot) return null;
              return (
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
              );
            })}
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
              {(modalEvents || []).map((event, index) => {
                if (!event) return null;
                return (
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
                );
              })}
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