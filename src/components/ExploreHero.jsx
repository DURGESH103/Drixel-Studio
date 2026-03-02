import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExploreHero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      ref={heroRef}
      style={{ y, opacity }}
      className="relative h-[40vh] flex items-center justify-center overflow-hidden"
    >
      <div ref={textRef} className="relative z-10 text-center px-6">
        <h1 className="hero-title text-5xl md:text-7xl font-bold mb-4">
          Explore <span className="text-gradient">Creative Work</span>
        </h1>
        <p className="hero-subtitle text-xl text-gray-400">
          Discover inspiring designs from talented creators
        </p>
      </div>
    </motion.section>
  );
};

export default ExploreHero;
