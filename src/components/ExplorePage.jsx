import { useState } from 'react';
import { motion } from 'framer-motion';
import PremiumNavbar from './PremiumNavbar';
import CategoryFilter from './CategoryFilter';
import MasonryGrid from './MasonryGrid';
import ExploreHero from './ExploreHero';
import GlowingCursor from './GlowingCursor';
import AnimatedGrid from './AnimatedGrid';

const ExplorePage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="min-h-screen relative grain">
      <GlowingCursor />
      <AnimatedGrid />
      
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-electric-purple/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-hot-pink/15 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <PremiumNavbar />
        <div className="pt-20">
          <ExploreHero />
          <CategoryFilter onCategoryChange={setActiveCategory} />
          <MasonryGrid activeCategory={activeCategory} />
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
