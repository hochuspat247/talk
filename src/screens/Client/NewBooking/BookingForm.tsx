import React from 'react';
import { View } from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';
import Input from '@components/UI/Input';
import AvailabilityCalendar from '@components/UI/AvailabilityCalendar';
import ClientFilter from '@components/UI/ClientFilter';
import Button from '@components/UI/Button';
import TimeSlots from './TimeSlots';
import styles from '@styles/NewBookingScreen.styles';
import { FormState, Location } from '@types/booking.types';

interface BookingFormProps {
  formState: FormState;
  setFormState: (state: FormState) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedSlot: string | null;
  setSelectedSlot: (slot: string | null) => void;
  availability: any;
  onConfirm: () => void;
  onOpenMap: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  formState,
  setFormState,
  selectedDate,
  setSelectedDate,
  selectedSlot,
  setSelectedSlot,
  availability,
  onConfirm,
  onOpenMap,
}) => {
  const handleFullNameChange = (text: string) => {
    setFormState({ ...formState, fullName: text });
  };

  const handleServiceNameChange = (text: string) => {
    setFormState({ ...formState, serviceName: text });
  };

  const handleAddressChange = (text: string) => {
    setFormState({ ...formState, address: text });
  };

  const handleCommentChange = (text: string) => {
    setFormState({ ...formState, comment: text });
  };

  const handleClientFiltersChange = (filters: any) => {
    setFormState({ ...formState, clientFilters: filters });
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <Input
          value={formState.fullName}
          onChangeText={handleFullNameChange}
          variant="user"
          placeholder="Клиент"
        />
      </View>

      <View style={styles.inputContainer}>
        <Input
          value={formState.serviceName}
          onChangeText={handleServiceNameChange}
          variant="search"
          placeholder="Введите название услуги"
        />
      </View>

      <View style={styles.inputContainer}>
        <Input
          value={formState.address}
          onChangeText={handleAddressChange}
          variant="search"
          placeholder="Адрес"
          onFocus={onOpenMap}
        />
      </View>

      <View style={styles.inputContainer}>
        <AvailabilityCalendar
          availability={availability}
          selectedDate={moment(selectedDate).format('YYYY-MM-DD')}
          onDatePress={(iso) => setSelectedDate(moment(iso, 'YYYY-MM-DD').toDate())}
        />
      </View>

      <View style={styles.inputContainer}>
        <TimeSlots
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
      </View>

      <View style={styles.inputContainer}>
        <ClientFilter
          onChange={handleClientFiltersChange}
          initialValues={formState.clientFilters}
          isNewBooking
        />
      </View>

      <View style={styles.inputContainer}>
        <Input
          value={formState.comment}
          onChangeText={handleCommentChange}
          variant="description"
          placeholder="Комментарий"
        />
      </View>

      <View style={styles.inputContainer}>
        <Button
          title="Да, все верно"
          onPress={onConfirm}
          variant="accent"
        />
      </View>
    </>
  );
};

export default BookingForm;