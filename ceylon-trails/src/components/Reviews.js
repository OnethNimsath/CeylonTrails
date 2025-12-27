// src/components/Reviews.js

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import heroImage from '../images/srilankanbeauty.jpg';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import ReviewsDisplay from './ReviewsDisplay';

const Reviews = () => {
  const [formData, setFormData] = useState({
    touristName: '',
    destination: '',
    rating: 5,
    feedback: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(0);

  const destinations = [
    'Colombo',
    'Kandy',
    'Galle',
    'Sigiriya',
    'Ella',
    'Nuwara Eliya',
    'Anuradhapura',
    'Polonnaruwa',
    'Trincomalee',
    'Bentota',
    'Mirissa',
    'Yala National Park',
    'Udawalawe',
    'Arugam Bay',
    'Dambulla',
    'Jaffna',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Test Firebase Connection Function
  const testFirebaseConnection = async () => {
    console.log('=== TESTING FIREBASE CONNECTION ===');
    console.log('DB object:', db);
    
    try {
      console.log('Attempting to write test document...');
      
      // Simpler test with timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout after 10 seconds')), 10000)
      );
      
      const writePromise = addDoc(collection(db, 'test'), {
        message: 'Test from CeylonTrails',
        timestamp: new Date(),
        testField: 'Hello World'
      });
      
      const testDoc = await Promise.race([writePromise, timeoutPromise]);
      
      console.log('✓ SUCCESS! Test document created with ID:', testDoc.id);
      alert('✓ Firebase connection works! Check Firebase Console for "test" collection');
      
    } catch (error) {
      console.error('❌ TEST FAILED!');
      console.error('Error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error name:', error.name);
      
      if (error.message.includes('timeout')) {
        alert('❌ Request timed out! Check:\n1. Is Firestore database created?\n2. Are security rules set?\n3. Internet connection working?');
      } else {
        alert('❌ Firebase test failed! Error: ' + error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form Data:', formData);
    
    // Validation before submission
    if (formData.feedback.trim().length < 20) {
      console.error('Validation failed: Feedback too short');
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please write at least 20 characters in your feedback.' 
      });
      return;
    }

    if (!formData.touristName.trim()) {
      console.error('Validation failed: No name');
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please enter your name.' 
      });
      return;
    }

    if (!formData.destination) {
      console.error('Validation failed: No destination');
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please select a destination.' 
      });
      return;
    }

    // Check if online
    if (!navigator.onLine) {
      console.error('Validation failed: Offline');
      setSubmitStatus({ 
        type: 'error', 
        message: 'No internet connection. Please check your network and try again.' 
      });
      return;
    }

    console.log('✓ All validations passed');
    console.log('Firebase db object:', db);
    console.log('Attempting to write to Firestore...');
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Add review to Firestore
      const reviewData = {
        touristName: formData.touristName.trim(),
        destination: formData.destination,
        rating: Number(formData.rating),
        feedback: formData.feedback.trim(),
        createdAt: serverTimestamp(),
        status: 'approved'
      };
      
      console.log('Review data to be saved:', reviewData);
      
      const docRef = await addDoc(collection(db, 'reviews'), reviewData);

      console.log('✓ SUCCESS! Review written with ID:', docRef.id);

      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for your review! Your feedback has been submitted successfully.' 
      });
      
      // Reset form
      setFormData({
        touristName: '',
        destination: '',
        rating: 5,
        feedback: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

      // Scroll to reviews section after successful submission
      setTimeout(() => {
        document.getElementById('reviews-display')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 1000);

    } catch (error) {
      console.error('Error submitting review:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      let errorMessage = 'Failed to submit review. Please try again.';
      
      if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please check Firestore security rules.';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Service temporarily unavailable. Please try again later.';
      } else if (error.code === 'unauthenticated') {
        errorMessage = 'Authentication required. Please refresh the page.';
      } else if (!navigator.onLine) {
        errorMessage = 'No internet connection. Please check your network.';
      }
      
      setSubmitStatus({ 
        type: 'error', 
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = () => {
    return (
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            className="transition-transform duration-200 hover:scale-110 focus:outline-none"
            aria-label={`Rate ${star} stars`}
          >
            <svg
              className={`w-10 h-10 transition-colors duration-200 ${
                star <= (hoveredStar || formData.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
        <span className="ml-3 text-xl font-semibold text-gray-700">{formData.rating} / 5</span>
      </div>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-r from-[#1a2e24] to-[#3a6042] text-white py-20 md:py-28"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            Share Your Experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
          >
            Your feedback helps us create better experiences for future travelers
          </motion.p>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-[#6a9772]/10 rounded-full mb-4">
                  <svg className="w-12 h-12 text-[#6a9772]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e24] mb-2">
                  Write Your Review
                </h2>
                <p className="text-gray-600 text-lg">
                  Tell us about your Sri Lankan adventure
                </p>
              </div>

              {/* Status Message */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl flex items-start space-x-3 ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {submitStatus.type === 'success' ? (
                    <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{submitStatus.message}</span>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Test Firebase Button */}
                <div className="mb-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <button 
                    type="button"
                    onClick={testFirebaseConnection}
                    className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold transition-colors"
                  >
                    🧪 Test Firebase Connection
                  </button>
                  <p className="text-xs text-blue-600 mt-2 text-center">
                    Click this button first to test if Firebase is working
                  </p>
                </div>

                {/* Tourist Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="touristName"
                    value={formData.touristName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6a9772] focus:border-transparent transition-all text-lg"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Destination Visited <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6a9772] focus:border-transparent transition-all text-lg appearance-none cursor-pointer bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="">Select a destination</option>
                    {destinations.map((dest) => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Your Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                    <StarRating />
                    <p className="text-sm text-gray-500 mt-3">
                      {formData.rating === 5 && '⭐ Excellent - Exceeded expectations!'}
                      {formData.rating === 4 && '⭐ Very Good - Highly recommend!'}
                      {formData.rating === 3 && '⭐ Good - Worth the visit'}
                      {formData.rating === 2 && '⭐ Fair - Could be better'}
                      {formData.rating === 1 && '⭐ Poor - Needs improvement'}
                    </p>
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Your Feedback <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6a9772] focus:border-transparent transition-all resize-none text-lg"
                    placeholder="Share your experience... What did you love? What could be improved? Any tips for future travelers?"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className={`text-sm ${formData.feedback.length < 20 ? 'text-red-500' : 'text-green-600'}`}>
                      {formData.feedback.length} characters
                    </p>
                    <p className="text-sm text-gray-400">
                      Minimum 20 characters
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || formData.feedback.length < 20}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 shadow-lg ${
                    isSubmitting || formData.feedback.length < 20
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#f59e0b] hover:bg-[#fbbf24] hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting Your Review...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Submit Review
                    </span>
                  )}
                </motion.button>

              </form>

              {/* Privacy Notice */}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Privacy & Terms</p>
                    <p>Your review may be displayed publicly on our website. We respect your privacy and will only use your information to improve our services.</p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Review Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-[#1a2e24] mb-12">
              Why Your Review Matters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-block p-4 bg-[#6a9772]/10 rounded-full mb-4">
                  <svg className="w-10 h-10 text-[#6a9772]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#1a2e24] mb-2">Help Others</h4>
                <p className="text-gray-600">Your experience guides future travelers in planning their perfect trip</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="inline-block p-4 bg-[#6a9772]/10 rounded-full mb-4">
                  <svg className="w-10 h-10 text-[#6a9772]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#1a2e24] mb-2">Improve Services</h4>
                <p className="text-gray-600">Your feedback helps us enhance and deliver better experiences</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="inline-block p-4 bg-[#6a9772]/10 rounded-full mb-4">
                  <svg className="w-10 h-10 text-[#6a9772]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#1a2e24] mb-2">Share the Love</h4>
                <p className="text-gray-600">Celebrate the beauty of Sri Lanka and inspire others to visit</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Reviews Display */}
      <div id="reviews-display">
        <ReviewsDisplay />
      </div>
    </>
  );
};

export default Reviews;