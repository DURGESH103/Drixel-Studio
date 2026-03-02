import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const brandingProjects = [
  {
    id: 1,
    name: 'Quantum',
    tagline: 'Future of Finance',
    colors: ['#7C3AED', '#EC4899', '#06B6D4'],
    logo: 'Q',
  },
  {
    id: 2,
    name: 'Luxe',
    tagline: 'Premium Lifestyle',
    colors: ['#EC4899', '#F59E0B', '#EF4444'],
    logo: 'L',
  },
  {
    id: 3,
    name: 'Nexus',
    tagline: 'Tech Innovation',
    colors: ['#06B6D4', '#22D3EE', '#7C3AED'],
    logo: 'N',
  },
  {
    id: 4,
    name: 'Aura',
    tagline: 'Wellness & Beauty',
    colors: ['#EC4899', '#A855F7', '#7C3AED'],
    logo: 'A',
  },
];

const BrandingShowcase = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;

    if (!container || !scroll) return;

    const scrollWidth = scroll.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(scroll, {
      x: -scrollWidth,
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="branding" className="relative h-screen overflow-hidden">
      <div className="absolute top-20 left-6 z-10">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold"
        >
          Brand <span className="text-gradient">Identity</span>
        </motion.h2>
      </div>

      <div ref={scrollRef} className="flex items-center h-full gap-12 pl-6">
        {brandingProjects.map((brand, index) => (
          <BrandCard key={brand.id} brand={brand} index={index} />
        ))}
      </div>
    </section>
  );
};

const BrandCard = ({ brand, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="flex-shrink-0 w-[500px] h-[600px] glass rounded-3xl p-8 relative overflow-hidden group"
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${brand.colors[0]}, ${brand.colors[1]}, ${brand.colors[2]})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-32 h-32 rounded-3xl flex items-center justify-center text-6xl font-bold mb-8"
          style={{
            background: `linear-gradient(135deg, ${brand.colors[0]}, ${brand.colors[1]})`,
          }}
        >
          {brand.logo}
        </motion.div>

        {/* Brand Name */}
        <h3 className="text-4xl font-bold mb-2">{brand.name}</h3>
        <p className="text-gray-400 mb-8">{brand.tagline}</p>

        {/* Color Palette */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-3">Color Palette</p>
          <div className="flex gap-3">
            {brand.colors.map((color, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, y: -5 }}
                className="w-16 h-16 rounded-xl cursor-pointer"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-3">Typography</p>
          <div className="space-y-2">
            <p className="text-3xl font-bold">Aa</p>
            <p className="text-sm text-gray-400">Inter Display</p>
          </div>
        </div>

        {/* View Case Study */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-auto px-6 py-3 rounded-full glass border border-white/20 hover:border-white/40 transition-colors"
        >
          View Guidelines
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BrandingShowcase;
