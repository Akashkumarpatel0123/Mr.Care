import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Pages and Components
import NurseProcedurePage from './Pages/NurseProceduresPage';
import SplashScreen from './Components/splash-screen';
import OnboardingScreen from './Components/onboading-screen';
import Header from './Components/Header';
import Footer from './Components/Footer';

import IVInjection from './Pages/IVInjection';
import RylesTube from './Pages/Ryles';
import Wound from './Pages/Wound';
import ECG from './Pages/ECG';
import GRBS from './Pages/GRBS';
import Vaccination from './Pages/vaccination';
import Infusion from './Pages/INFUSION';
import Cannula from './Pages/Cannula';
import IMInjection from './Pages/IMInjection';
import Enema from './Pages/Enema';
import Suture from './Pages/Suture';
import Colostomy from './Pages/Colostomy';
import Foley from './Pages/Foley';
import ABG from './Pages/ABG';
import Chemo from './Pages/Chemo';
import Fluids from './Pages/Ivfluids';
import Icu from './Pages/Icu';
import NICU from './Pages/NICU';
import { AuthContext } from './AuthContext';

import Legacy from './Components/UI/Legacy';
import Leadership from './Components/UI/Leadership';
import Vision from './Components/UI/Vision';
import Pillars from './Components/UI/Pillars';

import NurseRegistrationForm from './Components/UI/Nurse';
import Login from './Components/UI/Login';
import Register from './Components/UI/Register';
import ForgotPassword from './Components/UI/ForgotPassword';
import NurseLogin from './Nurse/Nurselogin';
import NurseRegister from './Nurse/NurseRegister';
const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const authRoutes = ['/login', '/signup', '/forgot-password'];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <>
      {/* Always show Navbar/Footer for home and onboarding */}
      {['/home', '/'].includes(location.pathname) && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<OnboardingScreen />} />
        <Route path="/home" element={<NurseProcedurePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Nurse-login" element={<NurseLogin />} />
        <Route path="/Nurse-signup" element={<NurseRegister />} />

        {/* Protected Routes */}
        {user && (
          <>
            <Route path="/IVInjection" element={<IVInjection />} />
            <Route path="/ryles-tube" element={<RylesTube />} />
            <Route path="/wound-dressing" element={<Wound />} />
            <Route path="/ecg" element={<ECG />} />
            <Route path="/grbs" element={<GRBS />} />
            <Route path="/sc-injection" element={<Vaccination />} />
            <Route path="/iv-infusion" element={<Infusion />} />
            <Route path="/iv-cannula" element={<Cannula />} />
            <Route path="/im-injection" element={<IMInjection />} />
            <Route path="/enema" element={<Enema />} />
            <Route path="/suture-removal" element={<Suture />} />
            <Route path="/colostomy" element={<Colostomy />} />
            <Route path="/foley-cath" element={<Foley />} />
            <Route path="/chemo-port" element={<Chemo />} />
            <Route path="/iv-fluids" element={<Fluids />} />
            <Route path="/icu-specialist" element={<Icu />} />
            <Route path="/nicu-specialist" element={<NICU />} />
            <Route path="/abg" element={<ABG />} />
            <Route path="/legacy" element={<Legacy />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/pillars" element={<Pillars />} />
            <Route path="/nurse-kyc" element={<NurseRegistrationForm />} />
          </>
        )}

        {/* Fallback to onboarding */}
        <Route path="*" element={<OnboardingScreen />} />
      </Routes>

      {['/home', '/'].includes(location.pathname) && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
