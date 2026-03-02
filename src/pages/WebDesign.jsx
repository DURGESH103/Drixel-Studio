import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { id: 1, title: 'Agency Portfolio', image: '/api/placeholder/600/400', tags: ['Landing', 'Creative'], featured: true, demo: true, description: 'Award-winning creative agency website with smooth animations' },
  { id: 2, title: 'E-commerce Store', image: '/api/placeholder/600/400', tags: ['Shop', 'Retail'], demo: true, description: 'High-converting online store with seamless checkout' },
  { id: 3, title: 'SaaS Website', image: '/api/placeholder/600/400', tags: ['Business', 'Tech'], demo: true, description: 'Modern SaaS landing page with 40% conversion rate' },
  { id: 4, title: 'Restaurant Site', image: '/api/placeholder/600/400', tags: ['Food', 'Local'], demo: true, description: 'Local restaurant with online ordering system' },
  { id: 5, title: 'Portfolio Site', image: '/api/placeholder/600/400', tags: ['Personal', 'Creative'], demo: true, description: 'Creative professional portfolio with case studies' },
  { id: 6, title: 'Corporate Site', image: '/api/placeholder/600/400', tags: ['Business', 'Professional'], demo: true, description: 'Enterprise website with lead generation focus' }
];

const features = [
  { title: 'Performance', desc: '90+ PageSpeed scores', icon: '⚡', metric: '0.8s load time' },
  { title: 'Conversion', desc: 'Optimized user journeys', icon: '📈', metric: '35% increase' },
  { title: 'Responsive', desc: 'Mobile-first design', icon: '📱', metric: '100% devices' }
];

const tools = ['Figma', 'Webflow', 'React', 'Next.js', 'Tailwind', 'Framer'];

const WebDesign = () => {
  const heroRef = useRef(null);
  const browserRef = useRef(null);
  const demoRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [browserContent, setBrowserContent] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroTl = gsap.timeline();
      heroTl.fromTo('.hero-word', 
        { y: 120, opacity: 0, rotateX: 90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, stagger: 0.2, ease: 'power3.out' }
      )
      .fromTo('.browser-mockup',
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)' },
        '-=0.8'
      );

      // Browser content cycling
      const contentInterval = setInterval(() => {
        setBrowserContent(prev => (prev + 1) % 3);
      }, 3000);

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

      // Grid animation
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.web-card',
            { y: 100, opacity: 0, rotateY: 15 },
            { y: 0, opacity: 1, rotateY: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out' }
          );
        }
      });

      return () => clearInterval(contentInterval);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-space-black pt-24 overflow-hidden">
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-hot-pink/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-soft-cyan/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10">
        {/* 1. Hero with Browser Mockup */}
        <section ref={heroRef} className="px-4 sm:px-6 py-20 sm:py-32 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="hero-word block">High-Performance</span>
            <span className="hero-word block text-gradient">Modern Websites</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 sm:mb-16">
            Creating fast, conversion-focused websites that deliver exceptional user experiences and drive business growth.
          </p>
          
          {/* Browser Mockup */}
          <div ref={browserRef} className="browser-mockup max-w-4xl mx-auto">
            <div className="glass rounded-2xl overflow-hidden glow-border">
              <div className="bg-dark-surface/80 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="flex-1 mx-4 bg-white/10 rounded-full px-4 py-1 text-sm text-gray-400">
                  https://example.com
                </div>
              </div>
              <div className="h-64 sm:h-80 bg-gradient-to-br from-electric-purple/20 to-neon-blue/20 flex items-center justify-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={browserContent}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <div className="text-4xl sm:text-6xl mb-4">
                      {['🚀', '💼', '🎨'][browserContent]}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {['Fast Loading', 'Business Growth', 'Beautiful Design'][browserContent]}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>
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
                alt="Featured Website"
                className="w-full h-64 sm:h-96 md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8">
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 sm:mb-4">Creative Agency Website</h3>
                <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6">Award-winning design with 95 PageSpeed score</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm backdrop-blur-sm">Landing</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm backdrop-blur-sm">Creative</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm backdrop-blur-sm">Performance</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Performance Demo */}
        <section ref={demoRef} className="px-4 sm:px-6 py-20 sm:py-32 bg-dark-surface/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-12 sm:mb-16 text-gradient">
              Website Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="demo-feature glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 glow-border group cursor-pointer text-center"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl sm:text-6xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.desc}</p>
                  <div className="text-2xl sm:text-3xl font-bold text-gradient">{feature.metric}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Project Grid */}
        <section ref={gridRef} className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-12 sm:mb-16 text-gradient">
              Web Portfolio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="web-card group cursor-pointer"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => project.demo && setSelectedDemo(project)}
                >
                  <div className="relative rounded-2xl overflow-hidden glass glow-border h-64 sm:h-80">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-300 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2 sm:px-3 py-1 bg-gradient-to-r from-electric-purple/30 to-neon-blue/30 rounded-full text-xs backdrop-blur-sm border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.demo && (
                        <button className="px-3 sm:px-4 py-2 bg-gradient-to-r from-hot-pink to-soft-cyan rounded-full text-xs sm:text-sm font-semibold">
                          View Live Site
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
              Web Technologies
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
              Ready to Launch?
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12">
              Let's create a website that converts visitors into customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-hot-pink to-soft-cyan rounded-full text-white font-semibold text-sm sm:text-lg"
              >
                Start Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 glass rounded-full text-white font-semibold text-sm sm:text-lg border border-white/20"
              >
                View Live Sites
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
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌐
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

export default WebDesign;