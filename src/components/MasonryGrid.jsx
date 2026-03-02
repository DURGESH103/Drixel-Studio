import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const designs = [
  { id: 1, title: 'Crypto Wallet App', author: 'Durgesh', likes: 234, views: '12.5k', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop', category: 'UI/UX' },
  { id: 2, title: 'Luxury Brand Identity', author: 'Durgesh', likes: 456, views: '18.2k', image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=800&fit=crop', category: 'Branding' },
  { id: 3, title: 'AI Dashboard', author: 'Durgesh', likes: 789, views: '25.1k', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop', category: 'Web Design' },
  { id: 4, title: 'Fashion E-commerce', author: 'Durgesh', likes: 321, views: '15.8k', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop', category: 'Mobile App' },
  { id: 5, title: 'Music Player UI', author: 'Durgesh', likes: 567, views: '20.3k', image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&h=600&fit=crop', category: 'UI/UX' },
  { id: 6, title: 'Tech Startup Branding', author: 'Durgesh', likes: 432, views: '17.6k', image: 'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=800&h=800&fit=crop', category: 'Branding' },
  { id: 7, title: '3D Product Showcase', author: 'Durgesh', likes: 654, views: '22.4k', image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop', category: '3D Design' },
  { id: 8, title: 'Fitness App Design', author: 'Durgesh', likes: 398, views: '16.9k', image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=1000&fit=crop', category: 'Mobile App' },
  { id: 9, title: 'Typography Poster', author: 'Durgesh', likes: 512, views: '19.7k', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop', category: 'Typography' },
];

const MasonryGrid = ({ activeCategory }) => {
  const filteredDesigns = activeCategory === 'All' 
    ? designs 
    : designs.filter(d => d.category === activeCategory);

  return (
    <motion.div layout className="max-w-7xl mx-auto px-6 py-12">
      <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredDesigns.map((design, index) => (
            <DesignCard key={design.id} design={design} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const DesignCard = ({ design, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ 
        scale: window.innerWidth > 768 ? 1.05 : 1,
        rotateX: window.innerWidth > 768 ? 5 : 0,
        rotateY: window.innerWidth > 768 ? 5 : 0,
        z: 50
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="break-inside-avoid mb-6 cursor-pointer"
      style={{ perspective: 1000 }}
      data-cursor-hover
    >
      <div className="relative rounded-2xl overflow-hidden bg-dark-surface shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Animated Gradient Border */}
        {isHovered && (
          <motion.div
            className="absolute -inset-0.5 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4, #EC4899, #7C3AED)',
              backgroundSize: '300% 300%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Card Content */}
        <div className="relative bg-dark-surface rounded-2xl overflow-hidden">
          {/* Light Reflection Effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 80%)`,
              }}
            />
          )}

          {/* Image */}
          <div className="relative overflow-hidden">
            {!imageLoaded && (
              <div className="w-full h-64 bg-dark-surface animate-pulse" />
            )}
            <motion.img
              src={design.image}
              alt={design.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className="w-full h-auto object-cover"
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
            
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-6"
            >
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.1 }}
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 w-fit"
                style={{
                  background: 'rgba(124, 58, 237, 0.3)',
                  color: '#7C3AED',
                  border: '1px solid rgba(124, 58, 237, 0.5)',
                  boxShadow: '0 0 15px rgba(124, 58, 237, 0.4)',
                }}
              >
                {design.category}
              </motion.span>
              
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.15 }}
                className="text-xl font-bold text-white mb-2"
              >
                {design.title}
              </motion.h3>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-electric-purple to-neon-blue text-white text-sm font-semibold w-fit"
              >
                Quick Preview
              </motion.button>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <div className="p-4 flex items-center justify-between bg-dark-surface/80 backdrop-blur-sm">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1, color: '#EC4899' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>{design.likes}</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>{design.views}</span>
              </motion.div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-electric-purple/20 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MasonryGrid;
