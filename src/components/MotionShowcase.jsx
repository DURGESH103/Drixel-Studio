import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const motionTypes = [
  {
    title: 'Micro Interactions',
    description: 'Subtle feedback that delights users and enhances usability',
    icon: '✨',
    color: '#7C3AED',
    examples: ['Button hover states', 'Form validation', 'Loading indicators'],
    impact: '+45% engagement'
  },
  {
    title: 'Page Transitions',
    description: 'Smooth navigation between views that maintains context',
    icon: '🔄',
    color: '#EC4899',
    examples: ['Route animations', 'Modal reveals', 'Tab switching'],
    impact: '+32% retention'
  },
  {
    title: 'Loading States',
    description: 'Engaging wait experiences that reduce perceived load time',
    icon: '⏳',
    color: '#06B6D4',
    examples: ['Skeleton screens', 'Progress bars', 'Spinners'],
    impact: '+28% satisfaction'
  },
  {
    title: 'Scroll Animations',
    description: 'Content reveals on scroll that guide user attention',
    icon: '📜',
    color: '#22D3EE',
    examples: ['Parallax effects', 'Reveal animations', 'Progress tracking'],
    impact: '+67% scroll depth'
  },
  {
    title: 'Hover Effects',
    description: 'Interactive element responses that provide clear feedback',
    icon: '👆',
    color: '#10B981',
    examples: ['Card interactions', 'Button states', 'Image overlays'],
    impact: '+52% click-through'
  },
  {
    title: 'Data Visualization',
    description: 'Animated charts and graphs that tell compelling stories',
    icon: '📊',
    color: '#F59E0B',
    examples: ['Chart animations', 'Counter effects', 'Progress rings'],
    impact: '+89% comprehension'
  },
];

const MotionShowcase = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced title animation
      gsap.fromTo('.motion-title-char', 
        { y: 120, opacity: 0, rotateX: -90 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 1.5, 
          stagger: 0.06, 
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Enhanced grid animation
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.motion-card', 
            { 
              y: 100, 
              opacity: 0, 
              scale: 0.7,
              rotateY: -45
            },
            { 
              y: 0, 
              opacity: 1, 
              scale: 1,
              rotateY: 0,
              duration: 2, 
              stagger: 0.15,
              ease: 'elastic.out(1, 0.8)'
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="motion" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 overflow-hidden">
            {'Motion &'.split('').map((char, i) => (
              <span key={i} className="motion-title-char inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
            <br />
            <span className="text-gradient">
              {'Animation'.split('').map((char, i) => (
                <span key={i} className="motion-title-char inline-block">
                  {char}
                </span>
              ))}
            </span>
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Bringing interfaces to life with purposeful motion
          </motion.p>
        </div>

        <div ref={gridRef} className="motion-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {motionTypes.map((item, index) => (
            <AnimationCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const AnimationCard = ({ item, index }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="motion-card glass rounded-2xl p-8 relative overflow-hidden group cursor-pointer"
    >
      {/* Enhanced Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div 
          className="absolute inset-0 blur-xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${item.color}40, transparent 70%)`
          }}
        />
      </div>

      {/* Impact Badge */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1 text-xs">
          <div className="font-bold" style={{ color: item.color }}>{item.impact}</div>
        </div>
      </div>

      {/* Animated Icon */}
      <motion.div
        className="text-6xl mb-6"
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3 + index * 0.5,
          repeat: Infinity,
          repeatDelay: 2,
        }}
        whileHover={{
          scale: 1.2,
          rotate: 15,
          transition: { duration: 0.3 }
        }}
      >
        {item.icon}
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
        <p className="text-gray-400 mb-4 leading-relaxed">{item.description}</p>
        
        {/* Examples */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Examples:</p>
          <div className="flex flex-wrap gap-1">
            {item.examples.map((example, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
        
        {/* Impact Metric */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Impact:</span>
          <span className="font-bold text-sm" style={{ color: item.color }}>
            {item.impact}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MotionShowcase;
