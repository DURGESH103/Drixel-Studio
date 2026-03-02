import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { id: 1, title: 'Business Cards', image: '/api/placeholder/600/400', tags: ['Cards', 'Corporate'] },
  { id: 2, title: 'Magazine Layout', image: '/api/placeholder/600/400', tags: ['Magazine', 'Editorial'] },
  { id: 3, title: 'Packaging Design', image: '/api/placeholder/600/400', tags: ['Package', 'Product'] },
  { id: 4, title: 'Book Cover', image: '/api/placeholder/600/400', tags: ['Book', 'Cover'] },
  { id: 5, title: 'Poster Series', image: '/api/placeholder/600/400', tags: ['Poster', 'Campaign'] },
  { id: 6, title: 'Brochure Design', image: '/api/placeholder/600/400', tags: ['Brochure', 'Marketing'] }
];

const Print = () => {
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
          gsap.fromTo('.print-card',
            { y: 80, opacity: 0, rotateX: 15 },
            { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-space-black pt-24">
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-soft-cyan/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-hot-pink/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10">
        <section ref={heroRef} className="px-6 py-20 text-center">
          <h1 className="hero-title text-7xl font-bold text-gradient mb-6">
            Print
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tangible designs that make lasting impressions
          </p>
        </section>

        <section ref={gridRef} className="px-6 pb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="print-card group cursor-pointer"
                whileHover={{ scale: 1.05, rotateY: 3 }}
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
                        <span key={tag} className="px-3 py-1 bg-gradient-to-r from-soft-cyan/30 to-hot-pink/30 rounded-full text-sm backdrop-blur-sm border border-white/10">
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

export default Print;