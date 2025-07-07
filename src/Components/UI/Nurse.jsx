import React, { useState } from 'react';
import { FaUserNurse, FaIdCard, FaGraduationCap, FaFileAlt, FaCamera, FaCheckCircle, FaClock, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';

const NurseRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    dob: '',
    services: [],
    aadharNumber: '',
    higherEducationInstitute: '',
    experienceYears: '',
    highestEducationMarks: '',
    resume: null,
    aadharFront: null,
    aadharBack: null,
    experienceCertificate: null,
    policeVerification: null,
    profilePhoto: null,
    workHours: 'Full-time',
    preferredLocation: '',
    immediateJoining: 'No',
    termsAccepted: false,
    documentVerification: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableServices = [
    "Ryle's Tube Insertion",
    "Wound Dressing",
    "ECG at Home",
    "IV Injection",
    "IM Injection",
    "GRBS Monitoring",
    "All Vaccinations",
    "IV Infusion",
    "IV Cannula",
    "Enema",
    "Suture Removal",
    "Colostomy Care",
    "Foley Catheter",
    "ABG Collection",
    "Chemo-Port Care",
    "IV Fluids",
    "ICU Care",
    "NICU Care",
    "Nebulization"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleServiceChange = (service) => {
    const updatedServices = formData.services.includes(service)
      ? formData.services.filter(s => s !== service)
      : [...formData.services, service];
    
    setFormData({
      ...formData,
      services: updatedServices
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = 'Required';
      if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Invalid number';
      }
      if (!formData.dob) newErrors.dob = 'Required';
      if (formData.services.length === 0) newErrors.services = 'Select at least one';
    }
    
    if (step === 2) {
      if (!formData.aadharNumber || !/^\d{12}$/.test(formData.aadharNumber)) {
        newErrors.aadharNumber = 'Invalid Aadhar';
      }
      if (!formData.aadharFront) newErrors.aadharFront = 'Required';
      if (!formData.aadharBack) newErrors.aadharBack = 'Required';
    }
    
    if (step === 3) {
      if (!formData.experienceYears || isNaN(formData.experienceYears)) {
        newErrors.experienceYears = 'Required';
      }
      if (!formData.experienceCertificate) newErrors.experienceCertificate = 'Required';
    }
    
    if (step === 4) {
      if (!formData.profilePhoto) newErrors.profilePhoto = 'Required';
      if (!formData.resume) newErrors.resume = 'Required';
      if (!formData.preferredLocation) newErrors.preferredLocation = 'Required';
      if (!formData.termsAccepted) newErrors.termsAccepted = 'Required';
      if (!formData.documentVerification) newErrors.documentVerification = 'Required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      const form = new FormData();

      // Append fields
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          form.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] instanceof File) {
          form.append(key, formData[key]);
        } else {
          form.append(key, formData[key]);
        }
      });

      try {
        const response = await fetch('http://localhost:10000/api/nurse/kyc', {
          method: 'POST',
          body: form,
        });

        const result = await response.json();
        if (result.success) {
          setIsSubmitted(true);
        } else {
          alert('Submission failed!');
        }
      } catch (error) {
        console.error('Submission error:', error);
        alert('Error submitting form.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const RequiredLabel = ({ children }) => (
    <span className="flex items-center">
      {children} <span className="text-red-500 ml-1">*</span>
    </span>
  );

  const renderStep = () => {
    if (isSubmitted) {
      return (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <FaCheckCircle className="text-4xl text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6 text-sm max-w-md mx-auto">
            Thank you for registering. We'll review your application and contact you within 2-3 business days.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
              setFormData({
                fullName: '',
                phoneNumber: '',
                dob: '',
                services: [],
                aadharNumber: '',
                higherEducationInstitute: '',
                experienceYears: '',
                highestEducationMarks: '',
                resume: null,
                aadharFront: null,
                aadharBack: null,
                experienceCertificate: null,
                policeVerification: null,
                profilePhoto: null,
                workHours: 'Full-time',
                preferredLocation: '',
                immediateJoining: 'No',
                termsAccepted: false,
                documentVerification: false
              });
            }}
            className="px-5 py-2 text-sm text-white rounded-lg hover:bg-[#7a276d] transition-colors"
            style={{ backgroundColor: '#8D2E7D' }}
          >
            Back to Home
          </button>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center" style={{ color: '#8D2E7D' }}>
              <FaUserNurse className="mr-2 text-lg" /> Personal Info
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <RequiredLabel>Full Name</RequiredLabel>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full p-2 text-sm border rounded focus:ring-1 ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#8D2E7D]'}`}
                  placeholder="Your full name"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <RequiredLabel>Phone</RequiredLabel>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full p-2 text-sm border rounded focus:ring-1 ${errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#8D2E7D]'}`}
                  placeholder="10-digit number"
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <RequiredLabel>DOB</RequiredLabel>
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full p-2 text-sm border rounded focus:ring-1 ${errors.dob ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#8D2E7D]'}`}
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm text-gray-700 mb-1">
                <RequiredLabel>Services</RequiredLabel>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {availableServices.map((service) => (
                  <div key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`service-${service}`}
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceChange(service)}
                      className="h-3 w-3 rounded focus:ring-[#8D2E7D]"
                      style={{ color: '#8D2E7D' }}
                    />
                    <label htmlFor={`service-${service}`} className="ml-2 text-xs text-gray-700">
                      {service}
                    </label>
                  </div>
                ))}
              </div>
              {errors.services && <p className="text-red-500 text-xs mt-1">{errors.services}</p>}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center" style={{ color: '#8D2E7D' }}>
              <FaIdCard className="mr-2 text-lg" /> Aadhar Verification
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <RequiredLabel>Aadhar Number</RequiredLabel>
                </label>
                <input
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  className={`w-full p-2 text-sm border rounded focus:ring-1 ${errors.aadharNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#8D2E7D]'}`}
                  placeholder="12-digit number"
                />
                {errors.aadharNumber && <p className="text-red-500 text-xs mt-1">{errors.aadharNumber}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <RequiredLabel>Front Photo</RequiredLabel>
                </label>
                <div className={`border border-dashed rounded p-4 text-center transition-colors ${errors.aadharFront ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-[#8D2E7D] bg-gray-50'}`}>
                  <label className="cursor-pointer flex flex-col items-center">
                    <FaCamera className="text-2xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Upload front side</p>
                    <p className="text-xs text-gray-500 mt-1">(JPG, PNG, max 5MB)</p>
                    <input
                      type="file"
                      name="aadharFront"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                  {formData.aadharFront && (
                    <p className="text-xs text-green-600 mt-2 truncate">{formData.aadharFront.name}</p>
                  )}
                </div>
                {errors.aadharFront && <p className="text-red-500 text-xs mt-1">{errors.aadharFront}</p>}
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <RequiredLabel>Back Photo</RequiredLabel>
                </label>
                <div className={`border border-dashed rounded p-4 text-center transition-colors ${errors.aadharBack ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-[#8D2E7D] bg-gray-50'}`}>
                  <label className="cursor-pointer flex flex-col items-center">
                    <FaCamera className="text-2xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Upload back side</p>
                    <p className="text-xs text-gray-500 mt-1">(JPG, PNG, max 5MB)</p>
                    <input
                      type="file"
                      name="aadharBack"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                  {formData.aadharBack && (
                    <p className="text-xs text-green-600 mt-2 truncate">{formData.aadharBack.name}</p>
                  )}
                </div>
                {errors.aadharBack && <p className="text-red-500 text-xs mt-1">{errors.aadharBack}</p>}
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center" style={{ color: '#8D2E7D' }}>
              <FaGraduationCap className="mr-2 text-lg" /> Education & Experience
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Higher Education Institute</label>
                <input
                  type="text"
                  name="higherEducationInstitute"
                  value={formData.higherEducationInstitute}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#8D2E7D]"
                  placeholder="Name of your highest education institute"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <RequiredLabel>Experience (Years)</RequiredLabel>
                </label>
                <input
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  className={`w-full p-2 text-sm border rounded focus:ring-1 ${errors.experienceYears ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#8D2E7D]'}`}
                  placeholder="Years of experience"
                />
                {errors.experienceYears && <p className="text-red-500 text-xs mt-1">{errors.experienceYears}</p>}
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">Highest Education Marks/Grades</label>
                <input
                  type="text"
                  name="highestEducationMarks"
                  value={formData.highestEducationMarks}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#8D2E7D]"
                  placeholder="Marks/grades from your highest education"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <RequiredLabel>Bihar Nursing Council Certificate</RequiredLabel>
                </label>
                <div className={`border border-dashed rounded p-4 text-center transition-colors ${errors.experienceCertificate ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-[#8D2E7D] bg-gray-50'}`}>
                  <label className="cursor-pointer flex flex-col items-center">
                    <FaFileAlt className="text-2xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Upload certificate</p>
                    <p className="text-xs text-gray-500 mt-1">(PDF, JPG, PNG, max 5MB)</p>
                    <input
                      type="file"
                      name="experienceCertificate"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                  </label>
                  {formData.experienceCertificate && (
                    <p className="text-xs text-green-600 mt-2 truncate">{formData.experienceCertificate.name}</p>
                  )}
                </div>
                {errors.experienceCertificate && <p className="text-red-500 text-xs mt-1">{errors.experienceCertificate}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Police Verification</label>
                <div className="border border-dashed border-gray-300 rounded p-4 text-center transition-colors hover:border-[#8D2E7D] bg-gray-50">
                  <label className="cursor-pointer flex flex-col items-center">
                    <FaShieldAlt className="text-2xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Upload verification</p>
                    <p className="text-xs text-gray-500 mt-1">(PDF, JPG, PNG, max 5MB)</p>
                    <input
                      type="file"
                      name="policeVerification"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                  </label>
                  {formData.policeVerification && (
                    <p className="text-xs text-green-600 mt-2 truncate">{formData.policeVerification.name}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center" style={{ color: '#8D2E7D' }}>
              <FaUserNurse className="mr-2 text-lg" /> Profile Completion
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <RequiredLabel>Profile Photo</RequiredLabel>
                </label>
                <div className={`border border-dashed rounded p-4 text-center transition-colors ${errors.profilePhoto ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-[#8D2E7D] bg-gray-50'}`}>
                  <label className="cursor-pointer flex flex-col items-center">
                    <FaCamera className="text-2xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Upload professional photo</p>
                    <p className="text-xs text-gray-500 mt-1">(JPG, PNG, max 5MB)</p>
                    <input
                      type="file"
                      name="profilePhoto"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                  {formData.profilePhoto && (
                    <p className="text-xs text-green-600 mt-2 truncate">{formData.profilePhoto.name}</p>
                  )}
                </div>
                {errors.profilePhoto && <p className="text-red-500 text-xs mt-1">{errors.profilePhoto}</p>}
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <RequiredLabel>Resume</RequiredLabel>
                </label>
                <div className={`border border-dashed rounded p-4 text-center transition-colors ${errors.resume ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-[#8D2E7D] bg-gray-50'}`}>
                  <label className="cursor-pointer flex flex-col items-center">
                    <FaFileAlt className="text-2xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Upload your resume</p>
                    <p className="text-xs text-gray-500 mt-1">(PDF, DOC, DOCX, max 5MB)</p>
                    <input
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                  {formData.resume && (
                    <p className="text-xs text-green-600 mt-2 truncate">{formData.resume.name}</p>
                  )}
                </div>
                {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <RequiredLabel>Work Hours</RequiredLabel>
                </label>
                <select
                  name="workHours"
                  value={formData.workHours}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#8D2E7D]"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Shift-based">Shift-based</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <RequiredLabel>Preferred Location</RequiredLabel>
                </label>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 mr-2 text-sm" />
                  <input
                    type="text"
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    className={`w-full p-2 text-sm border rounded focus:ring-1 ${errors.preferredLocation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#8D2E7D]'}`}
                    placeholder="City or area where you want to work"
                  />
                </div>
                {errors.preferredLocation && <p className="text-red-500 text-xs mt-1">{errors.preferredLocation}</p>}
              </div>
            </div>
            
            <div className="pt-2">
              <label className="block text-sm text-gray-700 mb-1">Immediate Joining?*</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="immediateJoining"
                    value="Yes"
                    checked={formData.immediateJoining === 'Yes'}
                    onChange={handleChange}
                    className="h-4 w-4"
                    style={{ color: '#8D2E7D' }}
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="immediateJoining"
                    value="No"
                    checked={formData.immediateJoining === 'No'}
                    onChange={handleChange}
                    className="h-4 w-4"
                    style={{ color: '#8D2E7D' }}
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div className="p-4 rounded border mt-4 text-sm" style={{ backgroundColor: '#F3F3F3', borderColor: '#8D2E7D' }}>
              <h3 className="font-bold mb-2" style={{ color: '#8D2E7D' }}>Consent & Declaration</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                    className={`mt-1 mr-2 ${errors.termsAccepted ? 'border-red-500' : ''}`}
                    style={{ color: '#8D2E7D' }}
                    required
                  />
                  <label className="text-sm text-gray-700">
                    <RequiredLabel>I accept the terms & conditions of service</RequiredLabel>
                  </label>
                </div>
                {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>}
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    name="documentVerification"
                    checked={formData.documentVerification}
                    onChange={(e) => setFormData({...formData, documentVerification: e.target.checked})}
                    className={`mt-1 mr-2 ${errors.documentVerification ? 'border-red-500' : ''}`}
                    style={{ color: '#8D2E7D' }}
                    required
                  />
                  <label className="text-sm text-gray-700">
                    <RequiredLabel>I confirm all details provided are accurate and verifiable</RequiredLabel>
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    name="documentVerification"
                    checked={formData.documentVerification}
                    onChange={(e) => setFormData({...formData, documentVerification: e.target.checked})}
                    className={`mt-1 mr-2 ${errors.documentVerification ? 'border-red-500' : ''}`}
                    style={{ color: '#8D2E7D' }}
                    required
                  />
                  <label className="text-sm text-gray-700">
                    <RequiredLabel>I authorize the verification of all submitted documents</RequiredLabel>
                  </label>
                </div>
                {errors.documentVerification && <p className="text-red-500 text-xs mt-1">{errors.documentVerification}</p>}
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                Verification process typically takes 2-3 business days. You'll receive email confirmation once your application is approved.
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F3F3F3' }}>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4" style={{ backgroundColor: '#F3F3F3' }}>
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step ? 'text-white' : 'bg-gray-300 text-gray-600'}`}
                  style={{ backgroundColor: currentStep >= step ? '#8D2E7D' : '' }}
                >
                  {step}
                </div>
                <span className={`text-xs mt-1 ${currentStep >= step ? 'font-medium' : 'text-gray-500'}`}
                  style={{ color: currentStep >= step ? '#8D2E7D' : '' }}
                >
                  {step === 1 && 'Personal Info'}
                  {step === 2 && 'Aadhar Details'}
                  {step === 3 && 'Education & Experience'}
                  {step === 4 && 'Profile Setup'}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="h-2 transition-all duration-300 ease-out" 
              style={{ width: `${((currentStep - 1) / 3) * 100}%`, backgroundColor: '#8D2E7D' }}
            ></div>
          </div>
        </div>
        
        <div className="p-6">
          {!isSubmitted && (
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2" style={{ color: '#8D2E7D' }}>Nurse Registration Form</h1>
              <p className="text-gray-600 text-sm">Join our network of professional healthcare providers</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {renderStep()}
            
            {!isSubmitted && (
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Previous
                  </button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 text-sm text-white rounded-lg hover:bg-[#7a276d] transition-colors"
                    style={{ backgroundColor: '#8D2E7D' }}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 text-sm text-white rounded-lg transition-colors ${isSubmitting ? 'bg-[#a85a9a]' : 'hover:bg-[#7a276d]'}`}
                    style={{ backgroundColor: '#8D2E7D' }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NurseRegistrationForm;