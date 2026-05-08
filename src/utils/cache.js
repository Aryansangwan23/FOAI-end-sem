/**
 * Store data in localStorage with an expiration time
 *
 * @param {string} key - The localStorage key
 * @param {any} data - Data to store
 * @param {number} expirationMinutes - Time in minutes until cache expires
 */
export const setCache = (key, data, expirationMinutes = 15) => {
  const now = new Date();
  const item = {
    data: data,
    timestamp: now.getTime(),
    expiration: now.getTime() + expirationMinutes * 60000,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

/**
 * Get data from localStorage if it exists and hasn't expired
 *
 * @param {string} key - The localStorage key
 * @returns {any|null} The cached data or null if expired/not found
 */
export const getCache = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = new Date();
    
    // Check if expired
    if (now.getTime() > item.expiration) {
      localStorage.removeItem(key);
      return null;
    }
    return item.data;
  } catch (error) {
    localStorage.removeItem(key);
    return null;
  }
};

/**
 * Clear specific cache or all cache
 * 
 * @param {string} [key] - Optional key to clear. Clears all if omitted.
 */
export const clearCache = (key) => {
  if (key) {
    localStorage.removeItem(key);
  } else {
    localStorage.clear();
  }
};
