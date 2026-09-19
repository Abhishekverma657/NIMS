import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Topbar from './components/common/Topbar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import BookingDrawer from './components/booking/BookingDrawer';
import PackageBookingModal from './components/booking/PackageBookingModal';
import VacanciesModal from './components/vacancies/VacanciesModal';

import Home from './pages/Home';
import About from './pages/About';
import Specialities from './pages/Specialities';
import SpecialityDetail from './pages/SpecialityDetail';
import HealthPackages from './pages/HealthPackages';
import PhotoGallery from './pages/PhotoGallery';
import LoyaltyCard from './pages/LoyaltyCard';
import PatientPortal from './pages/PatientPortal';
import Vacancies from './pages/Vacancies';
import Contact from './pages/Contact';

import { PhoneCall } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function RouteProgressBar() {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 450);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isNavigating) return null;
  return <div className="route-progress-bar" />;
}

function AnimatedPageContent({ onOpenBooking, onOpenPackageBooking }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home onOpenBooking={onOpenBooking} />} />
          <Route path="/about" element={<About onOpenBooking={onOpenBooking} />} />
          <Route path="/founder-and-chancellor" element={<About initialTab="founder" onOpenBooking={onOpenBooking} />} />
          <Route path="/our-purpose" element={<About initialTab="purpose" onOpenBooking={onOpenBooking} />} />
          <Route path="/specialities" element={<Specialities onOpenBooking={onOpenBooking} />} />
          <Route path="/specialities/:id" element={<SpecialityDetail onOpenBooking={onOpenBooking} />} />
          <Route path="/health-packages" element={<HealthPackages onOpenBooking={onOpenBooking} onOpenPackageBooking={onOpenPackageBooking} />} />
          <Route path="/photo-gallery" element={<PhotoGallery />} />
          <Route path="/loyalty-card" element={<LoyaltyCard onOpenBooking={onOpenBooking} />} />
          <Route path="/patient-portal" element={<PatientPortal />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/careers" element={<Vacancies />} />
          <Route path="/contact-us" element={<Contact />} />
          {/* Fallback redirect */}
          <Route path="*" element={<Home onOpenBooking={onOpenBooking} />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState(null);
  const [vacanciesOpen, setVacanciesOpen] = useState(false);
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleOpenPackageBooking = (pkg) => {
    setSelectedPackage(pkg || null);
    setPackageModalOpen(true);
  };

  const handleOpenBooking = (prefillData) => {
    // If a package object was passed into generic booking, route to package booking
    if (prefillData && (prefillData.tests || prefillData.testsCount || prefillData.isPackage)) {
      handleOpenPackageBooking(prefillData);
      return;
    }

    if (prefillData) {
      if (typeof prefillData === 'string') {
        setBookingPrefill({ speciality: prefillData });
      } else if (prefillData.id && (prefillData.specialityId || prefillData.department)) {
        setBookingPrefill({
          doctor: prefillData,
          speciality: prefillData.specialityId || undefined
        });
      } else {
        setBookingPrefill(prefillData);
      }
    } else {
      setBookingPrefill(null);
    }
    setBookingOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <RouteProgressBar />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        {/* Top Utility Bar */}
        <Topbar onOpenVacancies={() => setVacanciesOpen(true)} />

        {/* Sticky Clean Single-Line Navbar (No Call button clutter, Logo = Home) */}
        <Navbar onOpenBooking={() => handleOpenBooking()} />

        {/* Main Routed Content with Smooth Page Switch Animation */}
        <main style={{ flex: 1 }}>
          <AnimatedPageContent 
            onOpenBooking={handleOpenBooking} 
            onOpenPackageBooking={handleOpenPackageBooking}
          />
        </main>

        {/* Mega Footer */}
        <Footer
          onOpenBooking={() => handleOpenBooking()}
          onOpenVacancies={() => setVacanciesOpen(true)}
        />

        {/* 3-Step Slide-Over Appointment Booking Drawer (For OPD Doctor Visits) */}
        <BookingDrawer
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          prefill={bookingPrefill}
        />

        {/* Dedicated Modern Health Package Booking Modal (For Diagnostic Tests & Scans) */}
        <PackageBookingModal
          isOpen={packageModalOpen}
          onClose={() => setPackageModalOpen(false)}
          initialPackage={selectedPackage}
        />

        {/* Vacancies / Careers Modal */}
        <VacanciesModal
          isOpen={vacanciesOpen}
          onClose={() => setVacanciesOpen(false)}
        />

        {/* Floating 24x7 Helpline Hub with Modern Motion */}
        <motion.a
          href="tel:0141-2388999"
          className="floating-helpline-hub"
          title="24x7 Emergency & OPD Helpline"
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, y: -3, boxShadow: '0 16px 36px rgba(244, 117, 33, 0.35)' }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        >
          <div
            className="hub-icon-circle"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-surface-strong)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
              flexShrink: 0
            }}
          >
            <PhoneCall size={19} />
          </div>
          <div className="hub-text-wrap" style={{ textAlign: 'left', lineHeight: 1.15 }}>
            <div
              className="hub-sub-label"
              style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--nims-gold)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              <span className="pulse-dot pulse-dot-orange" style={{ marginRight: '5px', verticalAlign: 'middle' }} />
              24×7 EMERGENCY &amp; OPD
            </div>
            <div
              className="hub-num"
              style={{ fontSize: '1.02rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.02em' }}
            >
              0141-23 88 999
            </div>
          </div>
        </motion.a>
      </div>
    </Router>
  );
}
