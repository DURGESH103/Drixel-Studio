import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const Hero = () => {
  const ref = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Advanced split text animation
      const chars = gsap.utils.toArray('.hero-char');
      gsap.set(chars, { y: 100, opacity: 0, rotateX: -90 });
      
      const heroTl = gsap.timeline({ delay: 0.5 });
      heroTl.to(chars, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: {
          each: 0.03,
          from: 'random'
        },
        ease: 'back.out(1.7)'
      })
      .fromTo('.hero-subtitle', 
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo('.hero-buttons', 
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' },
        '-=0.5'
      );

      // Typewriter effect for subtitle
      gsap.to('.typewriter-text', {
        text: 'UI/UX Designer & Full Stack Developer crafting premium digital experiences with motion, emotion, and precision.',
        duration: 3,
        delay: 2,
        ease: 'none'
      });

      // Enhanced floating shapes with physics
      gsap.to('.floating-shape', {
        y: '+=40',
        x: '+=20',
        rotation: '+=15',
        scale: 1.1,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.8,
          from: 'random'
        }
      });

      // Magnetic cursor effect
      const cursor = cursorRef.current;
      if (cursor) {
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        
        const moveCursor = (e) => {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: 'power2.out'
          });
        };
        
        window.addEventListener('mousemove', moveCursor);
      }

      // Scroll-triggered background morphing
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to('.morph-bg', {
            scale: 1 + progress * 0.5,
            rotation: progress * 45,
            opacity: 0.8 - progress * 0.3,
            duration: 0.3
          });
        }
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain safe-area-padding"
    >
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-electric-purple to-neon-blue rounded-full pointer-events-none z-50 mix-blend-difference opacity-80 hidden sm:block"
      />
      
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="morph-bg absolute top-1/4 left-1/4 w-96 h-96 bg-electric-purple/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 120, 0],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="morph-bg absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/40 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [120, 0, 120],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="morph-bg absolute top-1/2 left-1/2 w-64 h-64 bg-hot-pink/30 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Enhanced Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape absolute rounded-full blur-2xl"
            style={{
              width: `${60 + i * 15}px`,
              height: `${60 + i * 15}px`,
              background: `radial-gradient(circle, ${
                ['#7C3AED', '#EC4899', '#06B6D4', '#22D3EE'][i % 4]
              }50, transparent)`,
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1 ref={textRef} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-tight" style={{ perspective: '1000px' }}>
          {'Designing Interfaces'.split('').map((char, i) => (
            <span key={i} className="hero-char inline-block" style={{ transformOrigin: '50% 100%' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
          <br />
          <span className="text-gradient">
            {'That Feel Alive'.split('').map((char, i) => (
              <span key={i} className="hero-char inline-block" style={{ transformOrigin: '50% 100%' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto min-h-[3rem] leading-relaxed">
          <span className="typewriter-text"></span>
        </p>

        <div className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <MagneticButton text="View My Work" primary />
          <MagneticButton text="Explore Branding" />
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-12 border-2 border-white/40 rounded-full flex justify-center p-2 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-2 h-2 bg-gradient-to-b from-electric-purple to-neon-blue rounded-full"
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

  useEffect(() => {
    const button = ref.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold overflow-hidden text-sm sm:text-base touch-target ${
        primary
          ? 'bg-gradient-to-r from-electric-purple to-neon-blue text-white'
          : 'glass text-white border border-white/20'
      }`}
    >
      <span className="relative z-10">{text}</span>
      {isHovered && (
        <motion.div
          layoutId={`button-glow-${primary ? 'primary' : 'secondary'}`}
          className="absolute inset-0 bg-gradient-to-r from-hot-pink/30 to-electric-purple/30 blur-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.8 }}
        />
      )}
    </motion.button>
  );
};

export default Hero;
