// src/components/ReviewsDisplay.js

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';

const ReviewsDisplay = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(9);

  useEffect(() => {
    // Real-time listener for reviews
    const q = query(
      collection(db, 'reviews'),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const reviewsData = [];
        querySnapshot.forEach((doc) => {
          reviewsData.push({ id: doc.id, ...doc.data() });
        });
        setReviews(reviewsData);
        setLoading(false);
        setError(null);
      }, 
      (error) => {
        // Log only the error code/type — never review content — to aid debugging
        // without exposing any customer data in the console.
        if (process.env.NODE_ENV !== 'production') {
          console.error('Reviews listener error:', error.code);
        }
        
        let errorMessage = 'Failed to load reviews. Please try again later.';
        
        if (error.code === 'permission-denied') {
          errorMessage = 'Permission denied. Please check Firestore security rules.';
        } else if (error.code === 'unavailable') {
          errorMessage = 'Service temporarily unavailable. Please try again later.';
        } else if (error.code === 'failed-precondition') {
          errorMessage = 'Database index required. Please check the Firebase console.';
        }
        
        setError(errorMessage);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const StarDisplay = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    try {
      const date = timestamp.toDate();
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      if (diffInSeconds < 60) return 'Just now';
      
      if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
      }
      
      if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      }
      
      if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
      }
      
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      return 'Recently';
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Loading State
  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#6a9772]"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600">Loading reviews...</p>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center py-8 sm:py-12 bg-red-50 rounded-xl sm:rounded-2xl border border-red-200 max-w-2xl mx-auto">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-red-500 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2 px-4">Failed to Load Reviews</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors font-semibold text-sm sm:text-base"
            >
              <span className="flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retry
              </span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty State
  if (reviews.length === 0) {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-xl sm:rounded-2xl max-w-2xl mx-auto">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2 px-4">No Reviews Yet</h3>
            <p className="text-sm sm:text-base text-gray-600 px-4">Be the first to share your experience!</p>
          </div>
        </div>
      </section>
    );
  }

  const displayedReviews = reviews.slice(0, displayCount);
  const hasMore = reviews.length > displayCount;
  const averageRating = calculateAverageRating();

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a2e24] mb-3 sm:mb-4 px-2">
            What Our Travelers Say
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-base sm:text-lg">
            <div className="flex items-center space-x-2">
              <StarDisplay rating={Math.round(averageRating)} />
              <span className="text-xl sm:text-2xl font-bold text-gray-800">{averageRating}</span>
            </div>
            <span className="hidden sm:inline text-gray-400">|</span>
            <p className="text-gray-600 text-sm sm:text-base">
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#1a2e24] mb-1 truncate">
                    {review.touristName}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 flex items-center truncate">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{review.destination}</span>
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <StarDisplay rating={review.rating} />
                </div>
              </div>

              {/* Feedback */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4 line-clamp-4">
                {review.feedback}
              </p>

              {/* Date */}
              <div className="pt-3 sm:pt-4 border-t border-gray-100 flex items-center text-xs sm:text-sm text-gray-500">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDate(review.createdAt)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 sm:mt-12"
          >
            <button
              onClick={() => setDisplayCount(prev => prev + 6)}
              className="px-6 py-2.5 sm:px-8 sm:py-3 bg-[#6a9772] text-white rounded-lg hover:bg-[#5a8662] active:bg-[#4a7552] transition-colors font-semibold shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              Load More Reviews ({reviews.length - displayCount} remaining)
            </button>
          </motion.div>
        )}

        {/* Show All Reviews Button (when all are loaded) */}
        {!hasMore && reviews.length > 9 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 sm:mt-12"
          >
            <button
              onClick={() => setDisplayCount(9)}
              className="px-6 py-2.5 sm:px-8 sm:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 active:bg-gray-400 transition-colors font-semibold text-sm sm:text-base"
            >
              Show Less
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ReviewsDisplay;