import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { id: 1, title: 'FinTech Dashboard', image: '/api/placeholder/600/400', tags: ['UI/UX', 'Dashboard'] },
  { id: 2, title: 'E-commerce App', image: '/api/placeholder/600/400', tags: ['Mobile', 'Shopping'] },
  { id: 3, title: 'SaaS Platform', image: '/api/placeholder/600/400', tags: ['Web', 'Enterprise'] },
  { id: 4, title: 'Health Tracker', image: '/api/placeholder/600/400', tags: ['Mobile', 'Health'] },
  { id: 5, title: 'Banking App', image: '/api/placeholder/600/400', tags: ['Mobile', 'Finance'] },
  { id: 6, title: 'CRM System', image: '/api/placeholder/600/400', tags: ['Web', 'Business'] }
];

const ProductDesign = () => {
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
      );

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.project-card',
            { y: 80, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-space-black pt-24">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-electric-purple/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-blue/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section ref={heroRef} className="px-6 py-20 text-center">
          <h1 className="hero-title text-7xl font-bold text-gradient mb-6">
            Product Design
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Crafting intuitive digital experiences that solve real problems
          </p>
        </section>

        {/* Projects Grid */}
        <section ref={gridRef} className="px-6 pb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="project-card group cursor-pointer"
                whileHover={{ y: -15, rotateX: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-2xl overflow-hidden glass glow-border">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDesign;