import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const brandingProjects = [
  {
    id: 1,
    name: 'Quantum',
    tagline: 'Future of Finance',
    colors: ['#7C3AED', '#EC4899', '#06B6D4'],
    logo: 'Q',
    description: 'Revolutionary fintech brand with quantum-inspired visual identity',
    metrics: { conversion: '+127%', engagement: '+89%', recognition: '+156%' },
    industry: 'Fintech',
    year: '2024'
  },
  {
    id: 2,
    name: 'Luxe',
    tagline: 'Premium Lifestyle',
    colors: ['#EC4899', '#F59E0B', '#EF4444'],
    logo: 'L',
    description: 'Luxury lifestyle brand with sophisticated visual language',
    metrics: { conversion: '+98%', engagement: '+145%', recognition: '+112%' },
    industry: 'Luxury',
    year: '2024'
  },
  {
    id: 3,
    name: 'Nexus',
    tagline: 'Tech Innovation',
    colors: ['#06B6D4', '#22D3EE', '#7C3AED'],
    logo: 'N',
    description: 'AI-powered platform with neural network inspired branding',
    metrics: { conversion: '+134%', engagement: '+167%', recognition: '+189%' },
    industry: 'AI/Tech',
    year: '2024'
  },
  {
    id: 4,
    name: 'Aura',
    tagline: 'Wellness & Beauty',
    colors: ['#EC4899', '#A855F7', '#7C3AED'],
    logo: 'A',
    description: 'Holistic wellness brand with ethereal design approach',
    metrics: { conversion: '+87%', engagement: '+123%', recognition: '+145%' },
    industry: 'Wellness',
    year: '2023'
  },
  {
    id: 5,
    name: 'Vertex',
    tagline: 'Data Analytics',
    colors: ['#10B981', '#059669', '#047857'],
    logo: 'V',
    description: 'Enterprise analytics platform with clean, data-driven aesthetics',
    metrics: { conversion: '+156%', engagement: '+134%', recognition: '+178%' },
    industry: 'SaaS',
    year: '2024'
  },
];

const BrandingShowcase = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;
    const title = titleRef.current;

    if (!container || !scroll) return;

    const ctx = gsap.context(() => {
      // Enhanced title animation with morphing text
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
        }
      });
      
      titleTl.fromTo('.brand-title-char', 
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.05, ease: 'back.out(1.7)' }
      );

      // Horizontal scroll with enhanced easing
      const scrollWidth = scroll.scrollWidth - window.innerWidth;
      const horizontalTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollWidth + 500}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Dynamic background color shift
            const progress = self.progress;
            const hue = 250 + (progress * 60);
            gsap.to(container, {
              backgroundColor: `hsl(${hue}, 70%, 5%)`,
              duration: 0.3
            });
          }
        },
      });

      horizontalTl.to(scroll, {
        x: -scrollWidth,
        ease: 'none',
      });

      // Parallax cards with 3D rotation
      gsap.utils.toArray('.brand-card').forEach((card, i) => {
        gsap.fromTo(card, 
          { rotateY: -45, z: -200, opacity: 0 },
          {
            rotateY: 0,
            z: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'left right',
              end: 'right left',
              containerAnimation: horizontalTl,
              scrub: 1
            }
          }
        );
      });

      // Floating elements animation
      gsap.to('.floating-brand-element', {
        y: -30,
        x: 15,
        rotation: 360,
        scale: 1.1,
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 1.5,
          from: 'random'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-space-black">
      {/* Enhanced floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-brand-element absolute rounded-full blur-2xl opacity-20"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              background: `radial-gradient(circle, ${['#7C3AED', '#EC4899', '#06B6D4', '#22D3EE'][i % 4]}60, transparent)`,
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div ref={titleRef} className="absolute top-20 left-6 z-10">
        <h2 className="text-5xl md:text-7xl font-bold overflow-hidden">
          {'Brand Identity'.split('').map((char, i) => (
            <span key={i} className="brand-title-char inline-block" style={{ transformOrigin: '50% 100%' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
          <br />
          <span className="text-gradient">
            {'Showcase'.split('').map((char, i) => (
              <span key={i} className="brand-title-char inline-block" style={{ transformOrigin: '50% 100%' }}>
                {char}
              </span>
            ))}
          </span>
        </h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-gray-400 mt-4 max-w-md"
        >
          Premium brand identities that drive business growth and customer connection
        </motion.p>
      </div>

      <div ref={scrollRef} className="flex items-center h-full gap-12 pl-6">
        {brandingProjects.map((brand, index) => (
          <BrandCard key={brand.id} brand={brand} index={index} />
        ))}
        
        {/* End CTA Card */}
        <motion.div className="flex-shrink-0 w-[400px] h-[600px] glass rounded-3xl p-8 flex flex-col items-center justify-center text-center">
          <h3 className="text-4xl font-bold mb-4 text-gradient">Ready to Build Your Brand?</h3>
          <p className="text-gray-400 mb-8">Let's create something extraordinary together</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(124, 58, 237, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-electric-purple to-neon-blue rounded-full font-semibold"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const BrandCard = ({ brand, index }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Magnetic hover effect
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(card, {
        x: x * 0.1,
        y: y * 0.1,
        rotateX: y * 0.05,
        rotateY: x * 0.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="brand-card flex-shrink-0 w-[500px] h-[600px] glass rounded-3xl p-8 relative overflow-hidden group cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700"
        style={{
          background: `linear-gradient(135deg, ${brand.colors[0]}, ${brand.colors[1]}, ${brand.colors[2]})`,
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div 
          className="absolute inset-0 blur-xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${brand.colors[0]}40, transparent 70%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Industry & Year Badge */}
        <div className="flex justify-between items-center mb-6">
          <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium backdrop-blur-sm">
            {brand.industry}
          </span>
          <span className="text-gray-400 text-sm">{brand.year}</span>
        </div>

        {/* Animated Logo */}
        <motion.div
          whileHover={{ 
            scale: 1.15, 
            rotate: [0, -5, 5, 0],
            boxShadow: `0 0 30px ${brand.colors[0]}60`
          }}
          transition={{ duration: 0.6, ease: 'back.out(1.7)' }}
          className="w-32 h-32 rounded-3xl flex items-center justify-center text-6xl font-bold mb-8 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${brand.colors[0]}, ${brand.colors[1]})`,
          }}
        >
          <span className="relative z-10">{brand.logo}</span>
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Brand Info */}
        <div className="mb-6">
          <h3 className="text-4xl font-bold mb-2">{brand.name}</h3>
          <p className="text-gray-400 mb-3">{brand.tagline}</p>
          <p className="text-gray-500 text-sm leading-relaxed">{brand.description}</p>
        </div>

        {/* Success Metrics */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-3">Success Metrics</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-green-500/20 rounded-lg p-2">
              <div className="text-green-400 font-bold text-sm">{brand.metrics.conversion}</div>
              <div className="text-xs text-gray-400">Conversion</div>
            </div>
            <div className="bg-blue-500/20 rounded-lg p-2">
              <div className="text-blue-400 font-bold text-sm">{brand.metrics.engagement}</div>
              <div className="text-xs text-gray-400">Engagement</div>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-2">
              <div className="text-purple-400 font-bold text-sm">{brand.metrics.recognition}</div>
              <div className="text-xs text-gray-400">Recognition</div>
            </div>
          </div>
        </div>

        {/* Enhanced Color Palette */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-3">Color System</p>
          <div className="flex gap-3">
            {brand.colors.map((color, i) => (
              <motion.div
                key={i}
                whileHover={{ 
                  scale: 1.3, 
                  y: -8,
                  boxShadow: `0 8px 25px ${color}60`
                }}
                className="w-16 h-16 rounded-xl cursor-pointer relative overflow-hidden"
                style={{ backgroundColor: color }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/30"
                  initial={{ scale: 0, borderRadius: '50%' }}
                  whileHover={{ scale: 1, borderRadius: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: `0 0 25px ${brand.colors[0]}60`
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-auto px-6 py-3 rounded-full glass border border-white/20 hover:border-white/40 transition-all duration-300 font-medium"
        >
          View Brand Guidelines
        </motion.button>
      </div>
    </div>
  );
};

export default BrandingShowcase;
