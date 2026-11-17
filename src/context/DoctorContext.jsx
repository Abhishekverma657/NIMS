import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { doctorsData } from '../data/doctorsData.js';
import { getDoctorsList, getDoctorById, bookOpdAppointment } from '../services/doctorService.js';
import { isDoctorMatch, getDoctorSlug } from '../utils/doctorSlug.js';

export { getDoctorSlug, isDoctorMatch, DoctorContext };

const DoctorContext = createContext({
  doctors: doctorsData,
  loading: false,
  error: null,
  refreshDoctors: () => {},
  getDoctor: () => null,
  fetchDoctor: async () => null,
  bookAppointment: async () => ({ success: false })
});

export function DoctorProvider({ children }) {
  const [doctors, setDoctors] = useState(doctorsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await getDoctorsList();
      if (Array.isArray(list) && list.length > 0) {
        setDoctors(list);
      }
    } catch (err) {
      console.error('Error loading doctors in DoctorContext:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);

  const doctorsRef = React.useRef(doctors);
  useEffect(() => {
    doctorsRef.current = doctors;
  }, [doctors]);

  // Synchronous lookup from memory using robust slug & ID matching (stable reference)
  const getDoctor = useCallback((idOrSlug) => {
    if (!idOrSlug) return null;
    return doctorsRef.current.find(d => isDoctorMatch(d, idOrSlug)) || null;
  }, []);

  // Asynchronous fetch (fetches fresh from API to capture latest admin updates)
  const fetchDoctor = useCallback(async (idOrSlug) => {
    try {
      const fetched = await getDoctorById(idOrSlug);
      if (fetched) {
        setDoctors(prev => {
          const idx = prev.findIndex(d => isDoctorMatch(d, idOrSlug) || d.id === fetched.id || d._id === fetched._id);
          if (idx !== -1) {
            const next = [...prev];
            next[idx] = { ...next[idx], ...fetched };
            return next;
          }
          return [fetched, ...prev];
        });
        return fetched;
      }
    } catch (e) {
      console.warn('fetchDoctor failed for', idOrSlug, e);
    }
    return getDoctor(idOrSlug);
  }, [getDoctor]);

  const handleBookAppointment = useCallback(async (bookingData) => {
    return await bookOpdAppointment(bookingData);
  }, []);

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        loading,
        error,
        refreshDoctors: loadDoctors,
        getDoctor,
        fetchDoctor,
        bookAppointment: handleBookAppointment
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctors() {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctors must be used within a DoctorProvider');
  }
  return context;
}
