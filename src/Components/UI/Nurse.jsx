import React, { useState } from 'react';
import { FaUserNurse, FaIdCard, FaGraduationCap, FaFileAlt, FaCamera, FaCheckCircle, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const NurseRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    dob: '',
    aadharNumber: '',
    instituteName: '',
    experienceYears: '',
    academicMarks: '',
    resume: null,
    aadharFront: null,
    aadharBack: null,
    marksheet: null,
    trainingCertificate: null,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
      if (!formData.fullName) newErrors.fullName = 'Full Name is required';
      if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Valid 10-digit phone number required';
      }
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Valid email required';
      }
      if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    }
    
    if (step === 2) {
      if (!formData.aadharNumber || !/^\d{12}$/.test(formData.aadharNumber)) {
        newErrors.aadharNumber = 'Valid 12-digit Aadhar number required';
      }
      if (!formData.aadharFront) newErrors.aadharFront = 'Aadhar front photo required';
      if (!formData.aadharBack) newErrors.aadharBack = 'Aadhar back photo required';
    }
    
    if (step === 3) {
      if (!formData.instituteName) newErrors.instituteName = 'Institute name required';
      if (!formData.experienceYears || isNaN(formData.experienceYears) || formData.experienceYears < 2) {
        newErrors.experienceYears = 'Valid experience required (minimum 2 years)';
      }
      if (!formData.academicMarks) newErrors.academicMarks = 'Academic marks required';
      if (!formData.marksheet) newErrors.marksheet = 'Marksheet photo required';
      if (!formData.trainingCertificate) {
        newErrors.trainingCertificate = 'Training certificate required';
      }
    }
    
    if (step === 4) {
      if (!formData.profilePhoto) newErrors.profilePhoto = 'Profile photo required';
      if (!formData.resume) newErrors.resume = 'Resume required';
      if (!formData.preferredLocation) newErrors.preferredLocation = 'Preferred location required';
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept terms';
      if (!formData.documentVerification) newErrors.documentVerification = 'You must authorize verification';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const renderStep = () => {
    if (isSubmitted) {
      return (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <FaCheckCircle className="text-5xl text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Thank you for registering with Mr. Care. Our team will review your application and contact you within 2-3 business days.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
              setFormData({
                fullName: '',
                phoneNumber: '',
                email: '',
                dob: '',
                aadharNumber: '',
                instituteName: '',
                experienceYears: '',
                academicMarks: '',
                resume: null,
                aadharFront: null,
                aadharBack: null,
                marksheet: null,
                trainingCertificate: null,
                profilePhoto: null,
                workHours: 'Full-time',
                preferredLocation: '',
                immediateJoining: 'No',
                termsAccepted: false,
                documentVerification: false
              });
            }}
            className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-800 flex items-center">
              <FaUserNurse className="mr-2" /> Personal Information
            </h2>
            
            <div>
              <label className="block text-gray-700 mb-1">Full Name*</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Phone Number*</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="10-digit mobile number"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Email Address*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Date of Birth*</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-800 flex items-center">
              <FaIdCard className="mr-2" /> Aadhar Verification
            </h2>
            
            <div>
              <label className="block text-gray-700 mb-1">Aadhar Card Number*</label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.aadharNumber ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="12-digit Aadhar number"
              />
              {errors.aadharNumber && <p className="text-red-500 text-sm mt-1">{errors.aadharNumber}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Aadhar Front Photo*</label>
                <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${errors.aadharFront ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-purple-400 bg-gray-50'}`}>
                  <label className="cursor-pointer">
                    <FaCamera className="mx-auto text-3xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload front side</p>
                    <input
                      type="file"
                      name="aadharFront"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                  {formData.aadharFront && (
                    <p className="text-sm text-green-600 mt-2">{formData.aadharFront.name}</p>
                  )}
                </div>
                {errors.aadharFront && <p className="text-red-500 text-sm mt-1">{errors.aadharFront}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Aadhar Back Photo*</label>
                <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${errors.aadharBack ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-purple-400 bg-gray-50'}`}>
                  <label className="cursor-pointer">
                    <FaCamera className="mx-auto text-3xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload back side</p>
                    <input
                      type="file"
                      name="aadharBack"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                  {formData.aadharBack && (
                    <p className="text-sm text-green-600 mt-2">{formData.aadharBack.name}</p>
                  )}
                </div>
                {errors.aadharBack && <p className="text-red-500 text-sm mt-1">{errors.aadharBack}</p>}
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-800 flex items-center">
              <FaGraduationCap className="mr-2" /> Education & Experience
            </h2>
            
            <div>
              <label className="block text-gray-700 mb-1">Nursing Institute Name*</label>
              <input
                type="text"
                name="instituteName"
                value={formData.instituteName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.instituteName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Name of your nursing institute"
              />
              {errors.instituteName && <p className="text-red-500 text-sm mt-1">{errors.instituteName}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Years of Experience* (Minimum 2 years required)</label>
              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                min="2"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.experienceYears ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Years of nursing experience"
              />
              {errors.experienceYears && <p className="text-red-500 text-sm mt-1">{errors.experienceYears}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Academic Marks/Grades*</label>
              <input
                type="text"
                name="academicMarks"
                value={formData.academicMarks}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.academicMarks ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Your academic marks or grades"
              />
              {errors.academicMarks && <p className="text-red-500 text-sm mt-1">{errors.academicMarks}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Marksheet Photo*</label>
              <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${errors.marksheet ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-purple-400 bg-gray-50'}`}>
                <label className="cursor-pointer">
                  <FaFileAlt className="mx-auto text-3xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload marksheet</p>
                  <input
                    type="file"
                    name="marksheet"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
                {formData.marksheet && (
                  <p className="text-sm text-green-600 mt-2">{formData.marksheet.name}</p>
                )}
              </div>
              {errors.marksheet && <p className="text-red-500 text-sm mt-1">{errors.marksheet}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Training Certificate*</label>
              <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${errors.trainingCertificate ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-purple-400 bg-gray-50'}`}>
                <label className="cursor-pointer">
                  <FaFileAlt className="mx-auto text-3xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload training certificate</p>
                  <input
                    type="file"
                    name="trainingCertificate"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
                {formData.trainingCertificate && (
                  <p className="text-sm text-green-600 mt-2">{formData.trainingCertificate.name}</p>
                )}
              </div>
              {errors.trainingCertificate && <p className="text-red-500 text-sm mt-1">{errors.trainingCertificate}</p>}
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-800 flex items-center">
              <FaUserNurse className="mr-2" /> Profile Completion
            </h2>
            
            <div>
              <label className="block text-gray-700 mb-1">Profile Photo*</label>
              <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${errors.profilePhoto ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-purple-400 bg-gray-50'}`}>
                <label className="cursor-pointer">
                  <FaCamera className="mx-auto text-3xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload your professional photo</p>
                  <p className="text-xs text-gray-500 mt-1">(Clear face visible, preferably in uniform)</p>
                  <input
                    type="file"
                    name="profilePhoto"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
                {formData.profilePhoto && (
                  <p className="text-sm text-green-600 mt-2">{formData.profilePhoto.name}</p>
                )}
              </div>
              {errors.profilePhoto && <p className="text-red-500 text-sm mt-1">{errors.profilePhoto}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Resume/CV* (PDF preferred)</label>
              <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${errors.resume ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-purple-400 bg-gray-50'}`}>
                <label className="cursor-pointer">
                  <FaFileAlt className="mx-auto text-3xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload your resume</p>
                  <p className="text-xs text-gray-500 mt-1">(Include all relevant certifications and experience)</p>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                </label>
                {formData.resume && (
                  <p className="text-sm text-green-600 mt-2">{formData.resume.name}</p>
                )}
              </div>
              {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
            </div>
            
            <div className="space-y-6 border-t pt-6">
              <h3 className="text-xl font-semibold text-purple-700 flex items-center">
                <FaClock className="mr-2" /> Availability
              </h3>
              
              <div>
                <label className="block text-gray-700 mb-1">Preferred Work Hours*</label>
                <select
                  name="workHours"
                  value={formData.workHours}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Shift-based">Shift-based</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Preferred Working Location/Area*</label>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.preferredLocation ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Preferred city or area"
                  />
                </div>
                {errors.preferredLocation && <p className="text-red-500 text-sm mt-1">{errors.preferredLocation}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Immediate Joining?*</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="immediateJoining"
                      value="Yes"
                      checked={formData.immediateJoining === 'Yes'}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="immediateJoining"
                      value="No"
                      checked={formData.immediateJoining === 'No'}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mt-6">
              <h3 className="font-bold text-purple-800 mb-2">Consent & Declaration</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                    className={`mt-1 mr-2 ${errors.termsAccepted ? 'border-red-500' : ''}`}
                    required
                  />
                  <label className="text-sm text-gray-700">
                    I accept the terms & conditions and privacy policy.
                  </label>
                </div>
                {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    name="documentVerification"
                    checked={formData.documentVerification}
                    onChange={(e) => setFormData({...formData, documentVerification: e.target.checked})}
                    className={`mt-1 mr-2 ${errors.documentVerification ? 'border-red-500' : ''}`}
                    required
                  />
                  <label className="text-sm text-gray-700">
                    I confirm all details are true to the best of my knowledge.
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    name="documentVerification"
                    checked={formData.documentVerification}
                    onChange={(e) => setFormData({...formData, documentVerification: e.target.checked})}
                    className={`mt-1 mr-2 ${errors.documentVerification ? 'border-red-500' : ''}`}
                    required
                  />
                  <label className="text-sm text-gray-700">
                    I authorize MR.Care to verify my documents.
                  </label>
                </div>
                {errors.documentVerification && <p className="text-red-500 text-sm mt-1">{errors.documentVerification}</p>}
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                After submission, our team will verify your documents. This process typically takes 2-3 business days.
                You'll receive an email notification once your profile is approved.
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Progress Bar with Steps */}
        <div className="bg-gray-100 px-6 py-4">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-purple-700 text-white' : 'bg-gray-300 text-gray-600'}`}
                >
                  {step}
                </div>
                <span className={`text-xs mt-1 ${currentStep >= step ? 'text-purple-700 font-medium' : 'text-gray-500'}`}>
                  {step === 1 && 'Personal'}
                  {step === 2 && 'Aadhar'}
                  {step === 3 && 'Education'}
                  {step === 4 && 'Profile'}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-purple-700 h-2 transition-all duration-300 ease-out" 
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="p-6 sm:p-8">
          {!isSubmitted && (
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-purple-800 mb-2">Nurse Registration</h1>
              <p className="text-gray-600">Join Mr. Care's network of professional healthcare providers</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {renderStep()}
            
            {!isSubmitted && (
              <div className="flex justify-between mt-10">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 text-white rounded-lg transition-colors ${isSubmitting ? 'bg-purple-500' : 'bg-purple-700 hover:bg-purple-800'}`}
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