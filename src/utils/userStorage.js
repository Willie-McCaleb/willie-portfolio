const USER_DATA_KEY = 'willie_portfolio_user';
const EXPIRATION_DAYS = 30;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const isDataExpired = (userData) => {
  const now = Date.now();
  const age = now - userData.firstVisit;
  return age > (EXPIRATION_DAYS * MS_PER_DAY);
};

export const getUserData = () => {
  try {
    const data = localStorage.getItem(USER_DATA_KEY);
    if (!data) return null;

    const userData = JSON.parse(data);

    // Validate structure
    if (!userData.name || !userData.firstVisit || !userData.lastVisit) {
      clearUserData();
      return null;
    }

    // Check expiration
    if (isDataExpired(userData)) {
      clearUserData();
      return null;
    }

    return userData;
  } catch (error) {
    console.warn('Error reading user data:', error);
    return null;
  }
};

export const saveUserData = (name) => {
  try {
    const now = Date.now();
    const userData = {
      name: name.trim(),
      firstVisit: now,
      lastVisit: now
    };
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  } catch (error) {
    console.warn('Error saving user data:', error);
  }
};

export const updateLastVisit = () => {
  try {
    const userData = getUserData();
    if (userData) {
      userData.lastVisit = Date.now();
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    }
  } catch (error) {
    console.warn('Error updating last visit:', error);
  }
};

export const clearUserData = () => {
  try {
    localStorage.removeItem(USER_DATA_KEY);
  } catch (error) {
    console.warn('Error clearing user data:', error);
  }
};
