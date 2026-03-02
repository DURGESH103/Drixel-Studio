import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { id: 1, title: 'Agency Portfolio', image: '/api/placeholder/600/400', tags: ['Landing', 'Creative'] },
  { id: 2, title: 'E-commerce Store', image: '/api/placeholder/600/400', tags: ['Shop', 'Retail'] },
  { id: 3, title: 'SaaS Website', image: '/api/placeholder/600/400', tags: ['Business', 'Tech'] },
  { id: 4, title: 'Restaurant Site', image: '/api/placeholder/600/400', tags: ['Food', 'Local'] },
  { id: 5, title: 'Portfolio Site', image: '/api/placeholder/600/400', tags: ['Personal', 'Creative'] },
  { id: 6, title: 'Corporate Site', image: '/api/placeholder/600/400', tags: ['Business', 'Professional'] }
];

const WebDesign = () => {
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
          gsap.fromTo('.web-card',
            { y: 80, opacity: 0, rotateY: 15 },
            { y: 0, opacity: 1, rotateY: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-space-black pt-24">
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-hot-pink/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-soft-cyan/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10">
        <section ref={heroRef} className="px-6 py-20 text-center">
          <h1 className="hero-title text-7xl font-bold text-gradient mb-6">
            Web Design
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Modern websites that captivate and convert
          </p>
        </section>

        <section ref={gridRef} className="px-6 pb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="web-card group cursor-pointer"
                whileHover={{ scale: 1.05, rotateY: -5 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative rounded-2xl overflow-hidden glass glow-border h-96">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gradient-to-r from-electric-purple/30 to-neon-blue/30 rounded-full text-sm backdrop-blur-sm border border-white/10">
                          {tag}
                        </span>
                      ))}
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

export default WebDesign;