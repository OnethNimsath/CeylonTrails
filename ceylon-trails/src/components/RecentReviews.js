// src/components/RecentReviews.js

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, where, limit } from 'firebase/firestore';

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch the 3 most recent approved reviews
    const q = query(
      collection(db, 'reviews'),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc'),
      limit(3)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const reviewsData = [];
        querySnapshot.forEach((doc) => {
          reviewsData.push({ id: doc.id, ...doc.data() });
        });
        setReviews(reviewsData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching recent reviews:', err);
        setError('Unable to load reviews right now.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const StarDisplay = ({ rating }) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
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

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently';
    try {
      const date = timestamp.toDate();
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);

      if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return minutes <= 1 ? 'Just now' : `${minutes} minutes ago`;
      }
      if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      }
      if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
      }
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  // Don't render the section at all if there's nothing to show yet,
  // so it doesn't create an awkward empty gap on the home page.
  if (!loading && (error || reviews.length === 0)) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a2e24] mb-3 px-2">
            What Our Travelers Say
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Fresh stories from travelers who just got back from Sri Lanka
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6a9772]"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 pr-2">
                      <h3 className="text-base sm:text-lg font-bold text-[#1a2e24] truncate">
                        {review.touristName}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {review.destination}
                      </p>
                    </div>
                    <StarDisplay rating={review.rating} />
                  </div>

                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 line-clamp-3">
                    {review.feedback}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-400 pt-3 border-t border-gray-100">
                    {formatDate(review.createdAt)}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8 sm:mt-10"
            >
              <Link to="/reviews">
                <button className="px-6 py-2.5 sm:px-8 sm:py-3 bg-[#6a9772] text-white rounded-full hover:bg-[#3a6042] transition-all duration-300 hover:scale-105 active:scale-95 font-semibold shadow-md hover:shadow-lg text-sm sm:text-base">
                  Read All Reviews
                </button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default RecentReviews;