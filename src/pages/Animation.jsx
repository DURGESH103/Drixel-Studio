import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { id: 1, title: 'Logo Animation', image: '/api/placeholder/600/400', tags: ['Motion', 'Branding'] },
  { id: 2, title: 'UI Transitions', image: '/api/placeholder/600/400', tags: ['Interface', 'Micro'] },
  { id: 3, title: 'Explainer Video', image: '/api/placeholder/600/400', tags: ['Video', 'Story'] },
  { id: 4, title: 'Loading Animations', image: '/api/placeholder/600/400', tags: ['UI', 'Loader'] },
  { id: 5, title: '3D Motion', image: '/api/placeholder/600/400', tags: ['3D', 'Cinema'] },
  { id: 6, title: 'Scroll Effects', image: '/api/placeholder/600/400', tags: ['Web', 'Scroll'] }
];

const Animation = () => {
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title', 
        { y: 100, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.8, ease: 'back.out(1.7)' }
      );

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.anim-card',
            { y: 100, opacity: 0, rotation: 5 },
            { y: 0, opacity: 1, rotation: 0, duration: 1.2, stagger: 0.1, ease: 'back.out(1.7)' }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-space-black pt-24">
      <div className="fixed inset-0 opacity-25">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-electric-purple/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-hot-pink/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10">
        <section ref={heroRef} className="px-6 py-20 text-center">
          <h1 className="hero-title text-7xl font-bold text-gradient mb-6">
            Animation
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Bringing designs to life with smooth motion
          </p>
        </section>

        <section ref={gridRef} className="px-6 pb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="anim-card group cursor-pointer"
                whileHover={{ 
                  scale: 1.08, 
                  rotateX: 10,
                  rotateY: index % 2 === 0 ? 5 : -5
                }}
                transition={{ duration: 0.5, ease: 'back.out(1.7)' }}
              >
                <div className="relative rounded-2xl overflow-hidden glass glow-border h-80">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/20 via-transparent to-neon-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-electric-purple to-hot-pink rounded-full animate-pulse" />
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

export default Animation;