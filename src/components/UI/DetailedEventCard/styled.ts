import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
    flexWrap: 'wrap',
    marginRight: 8,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  statusBadgeActive: {
    backgroundColor: '#E0F0FF',
  },
  statusTextActive: {
    color: '#007AFF',
  },
  statusBadgeConfirmed: {
    backgroundColor: '#E6F7E6',
  },
  statusTextConfirmed: {
    color: '#1CB37C',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '500',
  },
  priceBadge: {
    backgroundColor: '#E6F7E6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  priceText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#1CB37C',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  timeText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#333',
    marginRight: 8,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  locationText: {
    fontSize: 10,
    color: '#999',
    marginLeft: 4,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});