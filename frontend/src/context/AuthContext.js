import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('/api/profile', {
            headers: { Authorization: `Bearer ${JSON.parse(token)}` },
          });
          setUser(res.data);
        } catch (err) {
          toast.error(err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/api/login', { email, password });
    localStorage.setItem('token', JSON.stringify(res.data.token));
    setUser(res.data);
  };

  const register = async (firstName,lastName, email, password) => {
    await axios.post('/api/signup', { firstName,lastName, email, password });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
