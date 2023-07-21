// useAuth.js
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Get the token from local storage (if available)
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const isAuthenticated = () => {
    // Check if the token is present and not expired
    return token !== null;
  };

  const setAuthToken = (newToken) => {
    // Save the token in local storage and state
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const removeAuthToken = () => {
    // Remove the token from local storage and state
    localStorage.removeItem('token');
    setToken(null);
  };

  return {
    token,
    isAuthenticated,
    setAuthToken,
    removeAuthToken,
  };
};

export default useAuth;
