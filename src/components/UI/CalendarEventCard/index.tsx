import React, { useState } from 'react';
import { View, Text, Image, LayoutChangeEvent } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './styled';
import { CalendarEventCardProps, StatusStyles } from './types';
import { DEFAULT_AVATAR, MAX_LENGTH_MINI, MAX_LENGTH_FULL } from './constants';
import { Colors } from '@constants/Colors';
import { truncateText } from './utils';

/**
 * Компонент карточки события в календаре.
 * Отображает информацию о событии с адаптивным дизайном в зависимости от размера (мини или полный).
 *
 * @param {CalendarEventCardProps} props - Пропсы компонента.
 * @returns {JSX.Element} Компонент карточки события.
 */
const CalendarEventCard: React.FC<CalendarEventCardProps> = ({
  salonName,
  service,
  masterName,
  rating,
  time,
  duration,
  avatarUri,
  status = 'confirmed',
  isMini = false,
}) => {
  const [isServiceTruncated, setIsServiceTruncated] = useState(false);
  const [isSalonTruncated, setIsSalonTruncated] = useState(false);

  const handleServiceTextLayout = (e: LayoutChangeEvent) => {
    const { lines } = e.nativeEvent;
    if (lines.length > 0 && lines[0].width > 0) {
      setIsServiceTruncated(lines.length === 1 && lines[0].text !== service);
    }
  };

  const handleSalonTextLayout = (e: LayoutChangeEvent) => {
    const { lines } = e.nativeEvent;
    if (lines.length > 0 && lines[0].width > 0) {
      setIsSalonTruncated(lines.length === 1 && lines[0].text !== salonName);
    }
  };

  const maxLength = isMini ? MAX_LENGTH_MINI : MAX_LENGTH_FULL;

  const statusText = status === 'confirmed' ? 'Подтверждено' : 'Активно';
  const statusStyles: StatusStyles = {
    container: {
      ...(isMini ? styles.statusContainerMini : styles.statusContainer),
      backgroundColor: status === 'confirmed' ? '#DCEDE4' : '#8097F01A',
    },
    text: {
      ...(isMini ? styles.statusTextMini : styles.statusText),
      color: status === 'confirmed' ? '#36BC3F' : '#8097F0',
    },
    symbolContainer: {
      ...(isMini ? styles.symbolContainerMini : styles.symbolContainer),
      backgroundColor: status === 'confirmed' ? '#DCEDE4' : '#8097F01A',
    },
    symbol: {
      ...(isMini ? styles.statusSymbolMini : styles.statusSymbol),
      color: status === 'confirmed' ? '#36BC3F' : '#8097F0',
    },
  };

  if (isMini) {
    return (
      <View style={styles.containerMini}>
        <View style={styles.headerMini}>
          <View style={statusStyles.container}>
            <Text style={statusStyles.text}>{statusText}</Text>
          </View>
        </View>

        <View style={styles.serviceContainerMini}>
          <Text
            style={styles.serviceMini}
            numberOfLines={1}
            onTextLayout={handleServiceTextLayout}
          >
            {isServiceTruncated ? truncateText(service, maxLength) : service}
          </Text>
          {isServiceTruncated && <Text style={styles.serviceSuffixMini}>+1</Text>}
        </View>

        <View style={styles.masterInfoMini}>
          <Image
            source={avatarUri ? { uri: avatarUri } : DEFAULT_AVATAR}
            style={styles.avatarMini}
          />
          <View style={styles.masterDetailsMini}>
            <View style={styles.ratingContainerMini}>
              <Ionicons name="star" size={8} color={Colors.text} />
              <Text style={styles.ratingMini}> {rating}</Text>
            </View>
            <Text style={styles.masterNameMini}>{masterName}</Text>
          </View>
        </View>

        <View style={styles.timeAndIconContainerMini}>
          <View style={styles.timeContainerMini}>
            <Text style={styles.timeMini}>{duration}</Text>
            <Text style={styles.timeLabelMini}>до следующего клиента</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statusWrapper}>
          <View style={statusStyles.container}>
            <Text style={statusStyles.text}>{statusText}</Text>
          </View>
          {status === 'confirmed' && (
            <View style={statusStyles.symbolContainer}>
              <Text style={statusStyles.symbol}>₽</Text>
            </View>
          )}
        </View>
        <View style={styles.salonContainer}>
          <Ionicons name="location-outline" size={16} color={Colors.text} />
          <Text
            style={styles.salonName}
            numberOfLines={1}
            onTextLayout={handleSalonTextLayout}
          >
            {isSalonTruncated ? truncateText(salonName, 20) : salonName}
          </Text>
        </View>
      </View>

      <View style={styles.serviceContainer}>
        <Text
          style={styles.service}
          numberOfLines={1}
          onTextLayout={handleServiceTextLayout}
        >
          {isServiceTruncated ? truncateText(service, maxLength) : service}
        </Text>
        {isServiceTruncated && <Text style={styles.serviceSuffix}>+1</Text>}
      </View>

      <View style={styles.details}>
        <View style={styles.masterInfo}>
          <Image
            source={avatarUri ? { uri: avatarUri } : DEFAULT_AVATAR}
            style={styles.avatar}
          />
          <View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={10} color={Colors.text} />
              <Text style={styles.rating}> {rating}</Text>
            </View>
            <Text style={styles.masterName}>{masterName}</Text>
          </View>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.time}>
            {time} <Text style={styles.duration}>≈ {duration}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CalendarEventCard;