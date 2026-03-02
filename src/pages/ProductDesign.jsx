import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { id: 1, title: 'FinTech Dashboard', image: '/api/placeholder/600/400', tags: ['UI/UX', 'Dashboard'], featured: true, demo: true, description: 'Complete banking interface with real-time analytics' },
  { id: 2, title: 'E-commerce App', image: '/api/placeholder/600/400', tags: ['Mobile', 'Shopping'], demo: true, description: 'Seamless shopping experience with AR try-on' },
  { id: 3, title: 'SaaS Platform', image: '/api/placeholder/600/400', tags: ['Web', 'Enterprise'], demo: true, description: 'Enterprise workflow management system' },
  { id: 4, title: 'Health Tracker', image: '/api/placeholder/600/400', tags: ['Mobile', 'Health'], demo: true, description: 'Personal wellness and fitness tracking' },
  { id: 5, title: 'Banking App', image: '/api/placeholder/600/400', tags: ['Mobile', 'Finance'], demo: true, description: 'Next-gen mobile banking experience' },
  { id: 6, title: 'CRM System', image: '/api/placeholder/600/400', tags: ['Web', 'Business'], demo: true, description: 'Customer relationship management platform' }
];

const process = [
  { step: '01', title: 'Research', description: 'User interviews, market analysis, and competitive research', icon: '🔍' },
  { step: '02', title: 'Strategy', description: 'Information architecture and user journey mapping', icon: '🎯' },
  { step: '03', title: 'Design', description: 'Wireframing, prototyping, and visual design', icon: '🎨' },
  { step: '04', title: 'Test', description: 'Usability testing and iterative improvements', icon: '🧪' }
];

const tools = ['Figma', 'Sketch', 'Adobe XD', 'Principle', 'Framer', 'InVision'];

const ProductDesign = () => {
  const heroRef = useRef(null);
  const demoRef = useRef(null);
  const processRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [activeProcess, setActiveProcess] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced hero animation
      const heroTl = gsap.timeline();
      heroTl.fromTo('.hero-word', 
        { y: 120, opacity: 0, rotateX: 90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, stagger: 0.2, ease: 'power3.out' }
      )
      .fromTo('.hero-subtitle',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo('.floating-mockup',
        { y: 100, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.5'
      );

      // Process section pinning
      ScrollTrigger.create({
        trigger: processRef.current,
        start: 'top center',
        end: 'bottom center',
        pin: '.process-content',
        onUpdate: (self) => {
          const newActive = Math.floor(self.progress * process.length);
          if (newActive !== activeProcess && newActive < process.length) {
            setActiveProcess(newActive);
          }
        }
      });

      // Demo section animation
      ScrollTrigger.create({
        trigger: demoRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.demo-feature',
            { y: 80, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
          );
        }
      });

      // Grid animation with device parallax
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.product-card',
            { y: 100, opacity: 0, rotateY: 15 },
            { y: 0, opacity: 1, rotateY: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out' }
          );
        }
      });

      // Floating mockups animation
      gsap.to('.floating-mockup', {
        y: -20,
        duration: 3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });
    });

    return () => ctx.revert();
  }, [activeProcess]);

  return (
    <div className="min-h-screen bg-space-black pt-24 overflow-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-electric-purple/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-blue/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-electric-purple/10 via-transparent to-neon-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* 1. Cinematic Hero */}
        <section ref={heroRef} className="px-4 sm:px-6 py-20 sm:py-32 text-center relative">
          {/* Floating Product Mockups */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="floating-mockup absolute top-1/4 left-[10%] w-16 sm:w-24 h-20 sm:h-32 glass rounded-xl flex items-center justify-center">
              <div className="w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-electric-purple to-neon-blue rounded-lg" />
            </div>
            <div className="floating-mockup absolute top-1/3 right-[15%] w-20 sm:w-28 h-12 sm:h-16 glass rounded-2xl flex items-center justify-center">
              <div className="w-12 sm:w-16 h-2 bg-gradient-to-r from-hot-pink to-soft-cyan rounded-full" />
            </div>
            <div className="floating-mockup absolute bottom-1/3 left-[20%] w-12 sm:w-16 h-16 sm:h-20 glass rounded-full flex items-center justify-center">
              <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-neon-blue to-electric-purple rounded-full" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="hero-word block">Designing</span>
            <span className="hero-word block">Scalable</span>
            <span className="hero-word block text-gradient">Digital Products</span>
          </h1>
          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
            Creating user-centered digital experiences that solve real problems and drive business growth through systematic design thinking.
          </p>
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
                alt="Featured Product"
                className="w-full h-64 sm:h-96 md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8">
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 sm:mb-4">Enterprise SaaS Dashboard</h3>
                <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6">Complete redesign increasing user productivity by 40%</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm backdrop-blur-sm">UI/UX</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm backdrop-blur-sm">Dashboard</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm backdrop-blur-sm">Enterprise</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Interactive Demo */}
        <section ref={demoRef} className="px-4 sm:px-6 py-20 sm:py-32 bg-dark-surface/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-12 sm:mb-16 text-gradient">
              Product Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                { title: 'Analytics Dashboard', desc: 'Real-time data visualization', icon: '📈' },
                { title: 'User Management', desc: 'Role-based access control', icon: '👥' },
                { title: 'API Integration', desc: 'Seamless third-party connections', icon: '🔗' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="demo-feature glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 glow-border group cursor-pointer"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl sm:text-6xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Process Section (Pinned) */}
        <section ref={processRef} className="relative h-[400vh] bg-space-black">
          <div className="process-content sticky top-0 h-screen flex items-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 sm:mb-12 text-gradient">
                    Design Process
                  </h2>
                  <div className="space-y-6 sm:space-y-8">
                    {process.map((item, index) => (
                      <motion.div
                        key={item.step}
                        className={`p-4 sm:p-6 rounded-2xl transition-all duration-500 ${
                          index === activeProcess ? 'glass glow-border' : 'bg-white/5'
                        }`}
                        animate={{
                          scale: index === activeProcess ? 1.05 : 1,
                          opacity: index === activeProcess ? 1 : 0.6
                        }}
                      >
                        <div className="flex items-center gap-4 sm:gap-6">
                          <div className="text-3xl sm:text-4xl">{item.icon}</div>
                          <div>
                            <div className="text-2xl sm:text-3xl font-bold text-gradient mb-2">{item.step}</div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400">{item.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-electric-purple/20 to-neon-blue/20 rounded-3xl glass flex items-center justify-center">
                    <motion.div
                      className="text-6xl sm:text-8xl"
                      animate={{ rotate: activeProcess * 90 }}
                      transition={{ duration: 0.5 }}
                    >
                      {process[activeProcess]?.icon}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Project Grid */}
        <section ref={gridRef} className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-12 sm:mb-16 text-gradient">
              Product Portfolio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="product-card group cursor-pointer"
                  whileHover={{ y: -15, rotateX: 5 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => project.demo && setSelectedDemo(project)}
                >
                  <div className="relative rounded-2xl overflow-hidden glass glow-border h-64 sm:h-80">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-300 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2 sm:px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.demo && (
                        <button className="px-3 sm:px-4 py-2 bg-gradient-to-r from-electric-purple to-neon-blue rounded-full text-xs sm:text-sm font-semibold">
                          View Demo
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Tools & Skills */}
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

        {/* 7. CTA */}
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 text-gradient">
              Ready to Build?
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12">
              Let's create a product that users love and businesses need
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-electric-purple to-neon-blue rounded-full text-white font-semibold text-sm sm:text-lg"
              >
                Start Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 glass rounded-full text-white font-semibold text-sm sm:text-lg border border-white/20"
              >
                View Case Studies
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
                  className="w-8 sm:w-10 h-8 sm:h-10 glass rounded-full flex items-center justify-center text-sm sm:text-base"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-4 sm:mb-6 flex items-center justify-center">
                <motion.div 
                  className="text-3xl sm:text-4xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📱
                </motion.div>
              </div>
              <p className="text-gray-400 mb-4 text-sm sm:text-base">{selectedDemo.description}</p>
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

export default ProductDesign;