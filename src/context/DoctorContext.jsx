import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { doctorsData } from '../data/doctorsData.js';
import { getDoctorsList, getDoctorById, bookOpdAppointment } from '../services/doctorService.js';

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

  // Synchronous lookup from memory
  const getDoctor = useCallback((idOrSlug) => {
    if (!idOrSlug) return null;
    const target = String(idOrSlug).toLowerCase().trim();

    return doctors.find(d => {
      if (d.id && String(d.id).toLowerCase() === target) return true;
      if (d.doctorId && String(d.doctorId).toLowerCase() === target) return true;
      if (d._id && String(d._id).toLowerCase() === target) return true;
      const cleanName = d.name.toLowerCase().replace(/^(dr\.|dr|prof\.|prof|\(dr\.\))\s*/i, '').trim();
      const cleanSlug = cleanName.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      return cleanSlug === target;
    }) || null;
  }, [doctors]);

  // Asynchronous fetch (checks memory first, then API)
  const fetchDoctor = useCallback(async (idOrSlug) => {
    const existing = getDoctor(idOrSlug);
    if (existing) return existing;

    try {
      const fetched = await getDoctorById(idOrSlug);
      if (fetched) {
        setDoctors(prev => {
          const exists = prev.some(d => d.id === fetched.id || d._id === fetched._id);
          return exists ? prev : [fetched, ...prev];
        });
        return fetched;
      }
    } catch (e) {
      console.warn('fetchDoctor failed for', idOrSlug, e);
    }
    return null;
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
