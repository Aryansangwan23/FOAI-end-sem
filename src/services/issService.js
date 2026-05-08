import { apiClient } from './api';

const OPEN_NOTIFY_BASE = 'http://api.open-notify.org';

export const issService = {
  /**
   * Get current ISS location
   */
  async getCurrentLocation() {
    try {
      const response = await apiClient.get(`${OPEN_NOTIFY_BASE}/iss-now.json`);
      if (response.data && response.data.message === 'success') {
        return {
          latitude: parseFloat(response.data.iss_position.latitude),
          longitude: parseFloat(response.data.iss_position.longitude),
          timestamp: response.data.timestamp,
        };
      }
      throw new Error('Failed to parse ISS location');
    } catch (error) {
      console.error('Error fetching ISS location:', error);
      throw error;
    }
  },

  /**
   * Get people currently in space
   */
  async getPeopleInSpace() {
    try {
      const response = await apiClient.get(`${OPEN_NOTIFY_BASE}/astros.json`);
      if (response.data && response.data.message === 'success') {
        return response.data.people;
      }
      throw new Error('Failed to parse astronauts data');
    } catch (error) {
      console.error('Error fetching people in space:', error);
      throw error;
    }
  },
  
  /**
   * Get nearest location using reverse geocoding
   */
  async getNearestLocation(lat, lon) {
    try {
      // Using BigDataCloud free reverse geocoding API which doesn't require an API key
      const response = await apiClient.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
      
      if (response.data) {
        if (response.data.city || response.data.locality || response.data.countryName) {
           return `${response.data.city || response.data.locality || 'Unknown Area'}, ${response.data.countryName || 'Unknown Country'}`;
        } else {
           return 'Over Ocean / Uninhabited';
        }
      }
      return 'Unknown Location';
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return 'Location data unavailable';
    }
  }
};
