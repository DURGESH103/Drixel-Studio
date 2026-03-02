import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      gsap.to('.floating-shape', {
        y: '+=30',
        rotation: '+=10',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-purple/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/30 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape absolute w-32 h-32 rounded-full blur-2xl"
            style={{
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? '#7C3AED' : '#EC4899'
              }40, transparent)`,
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h1 className="hero-text text-6xl md:text-8xl font-bold mb-6 leading-tight">
          Designing Interfaces
          <br />
          <span className="text-gradient">That Feel Alive</span>
        </motion.h1>

        <motion.p className="hero-text text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
          UI/UX Designer & Full Stack Developer crafting premium digital experiences
          with motion, emotion, and precision.
        </motion.p>

        <motion.div className="hero-text flex flex-wrap gap-6 justify-center">
          <MagneticButton text="View My Work" primary />
          <MagneticButton text="Explore Branding" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

const MagneticButton = ({ text, primary }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.4, y: y * 0.4 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouse}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-8 py-4 rounded-full font-semibold overflow-hidden gpu-accelerate ${
        primary
          ? 'bg-gradient-to-r from-electric-purple to-neon-blue text-white'
          : 'glass text-white'
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      <span className="relative z-10">{text}</span>
      {isHovered && (
        <motion.div
          layoutId="button-glow"
          className="absolute inset-0 bg-gradient-to-r from-hot-pink/50 to-electric-purple/50 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.button>
  );
};

export default Hero;
