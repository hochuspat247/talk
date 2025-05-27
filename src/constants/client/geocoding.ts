import axios from 'axios';

export const geocodeWithNominatim = async (latitude: number, longitude: number): Promise<string> => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'MyBookingApp/1.0 (your.email@example.com)',
        },
      }
    );
    return response.data.display_name || 'Адрес не найден';
  } catch (err) {
    console.error('Ошибка геокодирования через Nominatim:', err);
    return `Координаты: ${latitude}, ${longitude}`;
  }
};