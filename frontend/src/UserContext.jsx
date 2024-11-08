// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL || '/api';
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading status

    useEffect(() => {
        fetch(`${API_URL}/profile`, {
          credentials: 'include'
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Not authenticated');
        })
        .then(userInfos => {
          setUserInfo(userInfos);
          setLoading(false);
        })
        .catch(() => {
          setUserInfo(null);
          setLoading(false);
        });
      }, []);

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;