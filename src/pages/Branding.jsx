import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { id: 1, title: 'Tech Startup Brand', image: '/api/placeholder/600/400', tags: ['Logo', 'Identity'], featured: true, demo: true, description: 'Complete brand identity for AI startup with modern appeal' },
  { id: 2, title: 'Restaurant Branding', image: '/api/placeholder/600/400', tags: ['Food', 'Local'], demo: true, description: 'Warm, inviting brand for family restaurant chain' },
  { id: 3, title: 'Fashion Brand', image: '/api/placeholder/600/400', tags: ['Luxury', 'Fashion'], demo: true, description: 'Luxury fashion brand with minimalist aesthetic' },
  { id: 4, title: 'Fitness Brand', image: '/api/placeholder/600/400', tags: ['Health', 'Active'], demo: true, description: 'Energetic brand identity for fitness community' },
  { id: 5, title: 'Coffee Shop Brand', image: '/api/placeholder/600/400', tags: ['Cafe', 'Artisan'], demo: true, description: 'Artisan coffee brand with handcrafted feel' },
  { id: 6, title: 'Agency Rebrand', image: '/api/placeholder/600/400', tags: ['Creative', 'Modern'], demo: true, description: 'Creative agency rebrand with bold personality' }
];

const brandElements = [
  { title: 'Logo Design', desc: 'Memorable brand marks', icon: '✨', color: 'from-electric-purple to-hot-pink' },
  { title: 'Color Palette', desc: 'Strategic color systems', icon: '🎨', color: 'from-hot-pink to-soft-cyan' },
  { title: 'Typography', desc: 'Custom font pairings', icon: '🔤', color: 'from-neon-blue to-electric-purple' }
];

const tools = ['Illustrator', 'Photoshop', 'Figma', 'After Effects', 'InDesign', 'Sketch'];

const Branding = () => {
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const demoRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [logoVariation, setLogoVariation] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation with logo reveal
      const heroTl = gsap.timeline();
      heroTl.fromTo('.hero-word', 
        { y: 120, opacity: 0, rotateX: 90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, stagger: 0.2, ease: 'power3.out' }
      )
      .fromTo('.brand-logo',
        { scale: 0, rotation: 180 },
        { scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.7)' },
        '-=0.8'
      );

      // Logo variation cycling
      const logoInterval = setInterval(() => {
        setLogoVariation(prev => (prev + 1) % 4);
      }, 2000);

      // Brand elements reveal
      ScrollTrigger.create({
        trigger: demoRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.brand-element',
            { y: 100, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.2, ease: 'back.out(1.7)' }
          );
        }
      });

      // Grid animation
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.brand-card',
            { y: 80, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
          );
        }
      });

      return () => clearInterval(logoInterval);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-space-black pt-24 overflow-hidden">
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/5 w-80 h-80 bg-hot-pink/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-electric-purple/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* 1. Hero with Logo Animation */}
        <section ref={heroRef} className="px-4 sm:px-6 py-20 sm:py-32 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="hero-word block">Building Powerful</span>
            <span className="hero-word block text-gradient">Brand Identities</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 sm:mb-16">
            Creating memorable brand experiences that connect with audiences and drive business success through strategic design.
          </p>
          
          {/* Animated Logo Showcase */}
          <div ref={logoRef} className="max-w-md mx-auto">
            <div className="brand-logo w-32 h-32 sm:w-40 sm:h-40 mx-auto glass rounded-3xl flex items-center justify-center glow-border">
              <AnimatePresence mode="wait">
                <motion.div
                  key={logoVariation}
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -180 }}
                  className="text-4xl sm:text-6xl"
                >
                  {['✨', '🎨', '🔥', '✨'][logoVariation]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 2. Featured Project */}
        <section className="px-4 sm:px-6 mb-20 sm:mb-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass glow-border group cursor-pointer"
            >
              <img 
                src="/api/placeholder/1200/600" 
                alt="Featured Brand"
                className="w-full h-64 sm:h-96 md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8">
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 sm:mb-4">Tech Startup Rebrand</h3>
                <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6">Complete brand transformation increasing recognition by 60%</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm backdrop-blur-sm">Logo</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm backdrop-blur-sm">Identity</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm backdrop-blur-sm">Guidelines</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Brand Elements Demo */}
        <section ref={demoRef} className="px-4 sm:px-6 py-20 sm:py-32 bg-dark-surface/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-12 sm:mb-16 text-gradient">
              Brand Elements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {brandElements.map((element, index) => (
                <motion.div
                  key={element.title}
                  className="brand-element glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 glow-border group cursor-pointer text-center"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl sm:text-6xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {element.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{element.title}</h3>
                  <p className="text-gray-400 mb-4">{element.desc}</p>
                  <div className={`w-full h-2 bg-gradient-to-r ${element.color} rounded-full`} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Project Grid */}
        <section ref={gridRef} className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-12 sm:mb-16 text-gradient">
              Brand Portfolio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="brand-card group cursor-pointer"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => project.demo && setSelectedDemo(project)}
                >
                  <div className="relative rounded-2xl overflow-hidden glass glow-border h-64 sm:h-80">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-300 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2 sm:px-3 py-1 bg-gradient-to-r from-hot-pink/30 to-electric-purple/30 rounded-full text-xs backdrop-blur-sm border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.demo && (
                        <button className="px-3 sm:px-4 py-2 bg-gradient-to-r from-electric-purple to-hot-pink rounded-full text-xs sm:text-sm font-semibold">
                          View Brand Guide
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Tools */}
        <section className="px-4 sm:px-6 py-20 sm:py-32 bg-dark-surface/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 sm:mb-16 text-gradient">
              Design Tools
            </h2>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {tools.map((tool, index) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="px-4 sm:px-6 py-2 sm:py-3 glass rounded-full text-sm sm:text-lg font-semibold border border-white/10"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CTA */}
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 text-gradient">
              Ready to Rebrand?
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12">
              Let's create a brand identity that stands out and drives growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-electric-purple to-hot-pink rounded-full text-white font-semibold text-sm sm:text-lg"
              >
                Start Branding
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 glass rounded-full text-white font-semibold text-sm sm:text-lg border border-white/20"
              >
                Brand Guidelines
              </motion.button>
            </div>
          </div>
        </section>
      </div>

      {/* Demo Modal */}
      <AnimatePresence>
        {selectedDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedDemo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 glow-border max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white">{selectedDemo.title}</h3>
                <button 
                  onClick={() => setSelectedDemo(null)}
                  className="w-8 sm:w-10 h-8 sm:h-10 glass rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-4 sm:mb-6 flex items-center justify-center">
                <motion.div 
                  className="text-3xl sm:text-4xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  ✨
                </motion.div>
              </div>
              <p className="text-gray-400 mb-4">{selectedDemo.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedDemo.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Branding;