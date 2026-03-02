import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { id: 1, title: 'Logo Animation', image: '/api/placeholder/600/400', tags: ['Motion', 'Branding'], featured: true, demo: true },
  { id: 2, title: 'UI Transitions', image: '/api/placeholder/600/400', tags: ['Interface', 'Micro'], demo: true },
  { id: 3, title: 'Explainer Video', image: '/api/placeholder/600/400', tags: ['Video', 'Story'], demo: true },
  { id: 4, title: 'Loading Animations', image: '/api/placeholder/600/400', tags: ['UI', 'Loader'], demo: true },
  { id: 5, title: '3D Motion', image: '/api/placeholder/600/400', tags: ['3D', 'Cinema'], demo: true },
  { id: 6, title: 'Scroll Effects', image: '/api/placeholder/600/400', tags: ['Web', 'Scroll'], demo: true }
];

const tools = ['After Effects', 'Lottie', 'GSAP', 'Framer Motion', 'Cinema 4D', 'Principle'];

const Animation = () => {
  const heroRef = useRef(null);
  const demoRef = useRef(null);
  const gridRef = useRef(null);
  const timelineRef = useRef(null);
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic hero animation
      const heroTl = gsap.timeline();
      heroTl.fromTo('.hero-word', 
        { y: 120, opacity: 0, rotateX: 90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, stagger: 0.2, ease: 'power3.out' }
      )
      .fromTo('.floating-element',
        { scale: 0, rotation: 180 },
        { scale: 1, rotation: 0, duration: 1, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=1'
      );

      // Timeline scrub animation
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: 'top center',
        end: 'bottom center',
        pin: true,
        onUpdate: (self) => {
          setTimelineProgress(self.progress);
          gsap.to('.timeline-element', {
            x: self.progress * 300,
            rotation: self.progress * 360,
            duration: 0.3
          });
        }
      });

      // Demo section animation
      ScrollTrigger.create({
        trigger: demoRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.demo-card',
            { y: 100, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.15, ease: 'back.out(1.7)' }
          );
        }
      });

      // Project grid animation
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.anim-card',
            { y: 100, opacity: 0, rotation: 10 },
            { y: 0, opacity: 1, rotation: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out' }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-space-black pt-24 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-electric-purple/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-hot-pink/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-blue/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* 1. Cinematic Hero Section */}
        <section ref={heroRef} className="px-6 py-32 text-center relative">
          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="floating-element absolute top-1/4 left-1/6 w-16 h-16 bg-gradient-to-r from-electric-purple/30 to-hot-pink/30 rounded-full blur-sm" />
            <div className="floating-element absolute top-1/3 right-1/5 w-12 h-12 bg-gradient-to-r from-neon-blue/30 to-soft-cyan/30 rounded-lg blur-sm" />
            <div className="floating-element absolute bottom-1/3 left-1/4 w-20 h-20 bg-gradient-to-r from-hot-pink/30 to-electric-purple/30 rounded-full blur-sm" />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="hero-word block">Motion That</span>
            <span className="hero-word block text-gradient">Tells a Story</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
            Creating dynamic animations that captivate users and enhance digital experiences through purposeful motion design.
          </p>
        </section>

        {/* 2. Featured Project Highlight */}
        <section className="px-6 mb-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden glass glow-border group cursor-pointer"
            >
              <img 
                src="/api/placeholder/1200/600" 
                alt="Featured Animation"
                className="w-full h-96 md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Interactive Logo Animation</h3>
                <p className="text-xl text-gray-300 mb-6">Award-winning motion design for tech startup rebrand</p>
                <div className="flex gap-3">
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">Motion</span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">Branding</span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">Interactive</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Interactive Demo Section */}
        <section ref={demoRef} className="px-6 py-32 bg-dark-surface/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-gradient">
              Animation Breakdown
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="demo-card glass rounded-3xl p-8 glow-border">
                <h3 className="text-2xl font-bold text-white mb-4">Before Animation</h3>
                <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                  <div className="w-16 h-16 bg-electric-purple rounded-lg" />
                </div>
              </div>
              <div className="demo-card glass rounded-3xl p-8 glow-border">
                <h3 className="text-2xl font-bold text-white mb-4">After Animation</h3>
                <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-electric-purple to-neon-blue rounded-lg"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Timeline Scrub Section */}
        <section ref={timelineRef} className="px-6 py-32 bg-space-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-16 text-gradient">
              Animation Timeline
            </h2>
            <div className="relative h-32 bg-dark-surface/50 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="timeline-element w-16 h-16 bg-gradient-to-r from-electric-purple to-hot-pink rounded-full" />
              <div className="absolute bottom-4 left-4 text-sm text-gray-400">
                Progress: {Math.round(timelineProgress * 100)}%
              </div>
            </div>
            <p className="text-gray-400 mt-4">Scroll to control animation timeline</p>
          </div>
        </section>

        {/* 5. Project Grid */}
        <section ref={gridRef} className="px-6 py-32">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-gradient">
              Motion Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="anim-card group cursor-pointer"
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: index % 2 === 0 ? 5 : -5
                  }}
                  transition={{ duration: 0.4 }}
                  onClick={() => project.demo && setSelectedDemo(project)}
                >
                  <div className="relative rounded-2xl overflow-hidden glass glow-border h-80">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                      <div className="flex gap-2 mb-3">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.demo && (
                        <button className="px-4 py-2 bg-gradient-to-r from-electric-purple to-neon-blue rounded-full text-sm font-semibold">
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
        <section className="px-6 py-32 bg-dark-surface/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-16 text-gradient">
              Animation Tools
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {tools.map((tool, index) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="px-6 py-3 glass rounded-full text-lg font-semibold border border-white/10"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CTA Section */}
        <section className="px-6 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gradient">
              Ready to Animate?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Let's bring your ideas to life with compelling motion design
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-electric-purple to-neon-blue rounded-full text-white font-semibold text-lg"
              >
                Start Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass rounded-full text-white font-semibold text-lg border border-white/20"
              >
                View Reel
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
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedDemo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full glass rounded-3xl p-8 glow-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">{selectedDemo.title}</h3>
                <button 
                  onClick={() => setSelectedDemo(null)}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-6 flex items-center justify-center">
                <motion.div 
                  className="text-4xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  🎬
                </motion.div>
              </div>
              <p className="text-gray-400 mb-4">Interactive animation demo showcasing smooth transitions and micro-interactions.</p>
              <div className="flex gap-2">
                {selectedDemo.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-sm">
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

export default Animation;