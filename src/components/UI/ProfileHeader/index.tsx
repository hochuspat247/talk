import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ProfileHeaderProps, NavigationProp } from './types';
import { styles } from './styled';
import { formatPhoneNumber, formatRating, getInitial } from './utils';
import { SIZES, PREMIUM_BADGE } from './constants';








const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, rating, phoneNumber, avatarUrl }) => {
  const navigation = useNavigation<NavigationProp>();

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
        onPress={() => navigation.navigate('ProfileSettings')}
        accessibilityLabel="Перейти к настройкам профиля"
      >
        <Ionicons name="chevron-forward" size={SIZES.ICON_SIZE} color="black" style={styles.backIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;