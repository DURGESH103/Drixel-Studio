import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { id: 1, title: 'Banking App', image: '/api/placeholder/400/600', tags: ['Finance', 'iOS'] },
  { id: 2, title: 'Food Delivery', image: '/api/placeholder/400/600', tags: ['Food', 'Android'] },
  { id: 3, title: 'Fitness Tracker', image: '/api/placeholder/400/600', tags: ['Health', 'Wearable'] },
  { id: 4, title: 'Social Media', image: '/api/placeholder/400/600', tags: ['Social', 'Chat'] },
  { id: 5, title: 'E-learning App', image: '/api/placeholder/400/600', tags: ['Education', 'Kids'] },
  { id: 6, title: 'Travel Planner', image: '/api/placeholder/400/600', tags: ['Travel', 'Maps'] }
];

const Mobile = () => {
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
          gsap.fromTo('.mobile-card',
            { y: 100, opacity: 0, rotateY: 20 },
            { y: 0, opacity: 1, rotateY: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out' }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-space-black pt-24">
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-neon-blue/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-electric-purple/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="relative z-10">
        <section ref={heroRef} className="px-6 py-20 text-center">
          <h1 className="hero-title text-7xl font-bold text-gradient mb-6">
            Mobile
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Mobile experiences that users love
          </p>
        </section>

        <section ref={gridRef} className="px-6 pb-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="mobile-card group cursor-pointer mx-auto"
                whileHover={{ scale: 1.08, rotateY: -5 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative w-64 h-96 rounded-3xl overflow-hidden glass glow-border">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gradient-to-r from-neon-blue/30 to-electric-purple/30 rounded-full text-xs backdrop-blur-sm border border-white/10">
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

export default Mobile;