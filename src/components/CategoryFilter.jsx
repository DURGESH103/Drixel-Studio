import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const categories = [
  'All',
  'Branding',
  'UI/UX',
  'Web Design',
  'Mobile App',
  'Illustration',
  'Animation',
  '3D Design',
  'Typography',
];

const CategoryFilter = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="sticky top-20 z-40 glass border-b border-white/5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="relative overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 min-w-max">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryClick(category)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                  activeCategory === category
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 border border-electric-purple/50"
                    style={{
                      boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
