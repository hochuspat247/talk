import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CalendarEventCardProps {
  salonName: string;
  service: string;
  masterName: string;
  rating: number;
  time: string;
  duration: string;
  avatarUri?: string;
  status?: 'confirmed' | 'active';
  isMini?: boolean;
}

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
  const [isSalonTruncated, setIsSalonTruncated] = useState(false); // Новое состояние для обрезки salonName

  const handleServiceTextLayout = (e: any) => {
    const { lines } = e.nativeEvent;
    if (lines.length > 0 && lines[0].width > 0) {
      setIsServiceTruncated(lines.length === 1 && lines[0].text !== service);
    }
  };

  const handleSalonTextLayout = (e: any) => {
    const { lines } = e.nativeEvent;
    if (lines.length > 0 && lines[0].width > 0) {
      setIsSalonTruncated(lines.length === 1 && lines[0].text !== salonName);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim();
  };

  const maxLength = isMini ? 10 : 20;

  const statusText = status === 'confirmed' ? 'Подтверждено' : 'Активно';
  const statusStyles = {
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
            source={avatarUri ? { uri: avatarUri } : require('@assets/images/default-avatar.png')}
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
            source={avatarUri ? { uri: avatarUri } : require('@assets/images/default-avatar.png')}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEF2F6',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 4,
    width: '100%', // Занимает всю доступную ширину
    maxWidth: 300, // Ограничиваем максимальную ширину
  },
  containerMini: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    width: 107,
    height: 120,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerMini: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statusContainer: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
  },
  statusContainerMini: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
  },
  symbolContainer: {
    borderRadius: 6,
    paddingVertical: 4,
    width: 18,
    alignItems: 'center',
  },
  symbolContainerMini: {
    borderRadius: 4,
    paddingVertical: 2,
    width: 14,
    alignItems: 'center',
  },
  statusText: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 12,
  },
  statusTextMini: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 8,
  },
  statusSymbol: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 12,
  },
  statusSymbolMini: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 10,
  },
  salonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  salonName: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 12,
    color: Colors.text,
    marginLeft: 4,
    flexShrink: 1,
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceContainerMini: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  service: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 16,
    color: Colors.text,
    flexShrink: 1,
  },
  serviceMini: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 12,
    color: Colors.text,
    flexShrink: 1,
  },
  serviceSuffix: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 16,
    color: Colors.text,
    marginLeft: 4,
  },
  serviceSuffixMini: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 12,
    color: Colors.text,
    marginLeft: 4,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  masterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  masterInfoMini: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginBottom: 4,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarMini: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  masterDetailsMini: {
    flexShrink: 1,
  },
  masterName: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 10,
    color: Colors.text,
  },
  masterNameMini: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 8,
    color: Colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  ratingContainerMini: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  rating: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 7,
    color: Colors.text,
  },
  ratingMini: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 6,
    color: Colors.text,
  },
  timeAndIconContainerMini: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  timeContainerMini: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexShrink: 1,
  },
  time: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 12,
    color: Colors.text,
  },
  timeMini: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 12,
    color: Colors.text,
  },
  duration: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 12,
    color: Colors.text,
  },
  durationMini: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 12,
    color: Colors.text,
  },
  timeLabelMini: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 5,
    color: '#999999',
  },
  iconContainer: {
    backgroundColor: '#9999991A',
    borderRadius: 10,
    padding: 4,
  },
  iconContainerMini: {
    backgroundColor: '#9999991A',
    borderRadius: 8,
    padding: 2,
  },
});

export default CalendarEventCard;