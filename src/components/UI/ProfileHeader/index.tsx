import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ProfileHeaderProps, NavigationProp } from './types';
import { formatPhoneNumber, formatRating, getInitial } from './utils';

// Константы для стилей (перенесены из constants.ts)
const SIZES = {
  AVATAR: 70,
  PLACEHOLDER_AVATAR: 50,
  AVATAR_BORDER_RADIUS: 35,
  PREMIUM_BADGE_HEIGHT: 20,
  PREMIUM_BADGE_WIDTH: 52,
  ICON_SIZE: 25,
  STAR_SIZE: 16,
};

const FONT_SIZES = {
  NAME: 15,
  RATING: 11,
  PHONE: 14,
  PLACEHOLDER: 28,
  PREMIUM_TEXT: 8,
};

const PADDINGS = {
  CONTAINER: 10,
  AVATAR_CONTAINER: 5,
  MARGINS: {
    AVATAR_RIGHT: 15,
    NAME_RIGHT: 10,
    RATING_VERTICAL: 2,
    PREMIUM_STAR_RIGHT: 3,
    BACK_ICON_RIGHT: 10,
    NAME_AND_RATING_BOTTOM: 2,
  },
};

const COLORS = {
  PLACEHOLDER_AVATAR: '#ccc',
  PREMIUM_BADGE: '#FF69B4',
  PREMIUM_BORDER: '#fff',
  NAME: '#000',
  RATING_STAR: '#FFD700',
  PHONE: '#666',
  PREMIUM_TEXT: '#fff',
  BACK_ICON: '#000',
};

const PREMIUM_BADGE = {
  BORDER_WIDTH: 2,
  BORDER_RADIUS: 7,
  STAR_SIZE: 10,
};

// Стили (перенесены из styled.ts)
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: PADDINGS.MARGINS.AVATAR_RIGHT,
    borderRadius: SIZES.AVATAR_BORDER_RADIUS + PADDINGS.AVATAR_CONTAINER,
    padding: PADDINGS.AVATAR_CONTAINER,
  },
  avatar: {
    width: SIZES.AVATAR,
    height: SIZES.AVATAR,
    borderRadius: SIZES.AVATAR_BORDER_RADIUS,
  },
  placeholderAvatar: {
    width: SIZES.PLACEHOLDER_AVATAR,
    height: SIZES.PLACEHOLDER_AVATAR,
    borderRadius: SIZES.AVATAR_BORDER_RADIUS,
    backgroundColor: COLORS.PLACEHOLDER_AVATAR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: FONT_SIZES.PLACEHOLDER,
    color: COLORS.PREMIUM_TEXT,
    fontWeight: 'bold',
  },
  premiumBadge: {
    position: 'absolute',
    bottom: -5,
    left: '50%',
    transform: [{ translateX: -SIZES.PREMIUM_BADGE_WIDTH / 2 }],
    backgroundColor: COLORS.PREMIUM_BADGE,
    borderRadius: PREMIUM_BADGE.BORDER_RADIUS,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: PREMIUM_BADGE.BORDER_WIDTH,
    borderColor: COLORS.PREMIUM_BORDER,
    height: SIZES.PREMIUM_BADGE_HEIGHT,
  },
  premiumStar: {
    marginRight: PADDINGS.MARGINS.PREMIUM_STAR_RIGHT,
  },
  premiumText: {
    color: COLORS.PREMIUM_TEXT,
    fontSize: FONT_SIZES.PREMIUM_TEXT,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  nameAndRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: PADDINGS.MARGINS.NAME_AND_RATING_BOTTOM,
  },
  name: {
    fontSize: FONT_SIZES.NAME,
    fontWeight: 'bold',
    flexShrink: 1,
    marginRight: PADDINGS.MARGINS.NAME_RIGHT,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: PADDINGS.MARGINS.RATING_VERTICAL,
  },
  rating: {
    marginLeft: 5,
    fontSize: FONT_SIZES.RATING,
  },
  phoneNumber: {
    fontSize: FONT_SIZES.PHONE,
    color: COLORS.PHONE,
  },
  backIcon: {
    marginRight: PADDINGS.MARGINS.BACK_ICON_RIGHT,
  },
});

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, rating, phoneNumber, avatarUrl }) => {
  const navigation = useNavigation<NavigationProp>();

  console.log('[ProfileHeader] Rendering with name:', name);
  console.log('[ProfileHeader] styles:', styles);
  console.log('[ProfileHeader] styles.container:', styles?.container);

  // Защитная проверка (оставляем для надёжности)
  if (!styles || !styles.container) {
    console.warn('[ProfileHeader] styles or styles.container is undefined! Using fallback style.');
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <View style={{ marginRight: 15 }}>
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              style={{ width: 70, height: 70, borderRadius: 35 }}
            />
          ) : (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold' }}>
                {getInitial(name)}
              </Text>
            </View>
          )}
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{name}</Text>
          <Text style={{ fontSize: 11, color: '#FFD700' }}>{formatRating(rating)} ★</Text>
          <Text style={{ fontSize: 14, color: '#666' }}>{formatPhoneNumber(phoneNumber)}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('[ProfileHeader] Navigating to ProfileSettings');
            navigation.navigate('ProfileSettings');
          }}
        >
          <Ionicons name="chevron-forward" size={25} color="black" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholderAvatar}>
              <Text style={styles.placeholderText}>{getInitial(name)}</Text>
            </View>
          )}
          <View style={styles.premiumBadge}>
            <Ionicons
              name="star"
              size={PREMIUM_BADGE.STAR_SIZE}
              color="white"
              style={styles.premiumStar}
            />
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.nameAndRatingContainer}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{formatRating(rating)}</Text>
            </View>
          </View>
          <Text style={styles.phoneNumber}>{formatPhoneNumber(phoneNumber)}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log('[ProfileHeader] Navigating to ProfileSettings');
          navigation.navigate('ProfileSettings');
        }}
        accessibilityLabel="Перейти к настройкам профиля"
      >
        <Ionicons name="chevron-forward" size={SIZES.ICON_SIZE} color="black" style={styles.backIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;