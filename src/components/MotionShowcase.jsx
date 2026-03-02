import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MotionShowcase = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.motion-card', {
        scrollTrigger: {
          trigger: '.motion-grid',
          start: 'top center',
        },
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="motion" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Motion & <span className="text-gradient">Animation</span>
          </h2>
          <p className="text-xl text-gray-400">
            Bringing interfaces to life with purposeful motion
          </p>
        </motion.div>

        <div className="motion-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimationCard
            title="Micro Interactions"
            description="Subtle feedback that delights users"
            icon="✨"
          />
          <AnimationCard
            title="Page Transitions"
            description="Smooth navigation between views"
            icon="🔄"
          />
          <AnimationCard
            title="Loading States"
            description="Engaging wait experiences"
            icon="⏳"
          />
          <AnimationCard
            title="Scroll Animations"
            description="Content reveals on scroll"
            icon="📜"
          />
          <AnimationCard
            title="Hover Effects"
            description="Interactive element responses"
            icon="👆"
          />
          <AnimationCard
            title="Data Visualization"
            description="Animated charts and graphs"
            icon="📊"
          />
        </div>
      </div>
    </section>
  );
};

const AnimationCard = ({ title, description, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="motion-card glass rounded-2xl p-8 relative overflow-hidden group cursor-pointer"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at center, rgba(124, 58, 237, 0.2), transparent 70%)',
        }}
      />

      {/* Icon */}
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
        className="text-6xl mb-6"
      >
        {icon}
      </motion.div>

      {/* Content */}
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(90deg, #7C3AED, #06B6D4, #EC4899, #7C3AED)',
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
      >
        <div className="absolute inset-[2px] rounded-2xl bg-dark-surface" />
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10">
        <div className="text-6xl mb-6">{icon}</div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

export default MotionShowcase;
