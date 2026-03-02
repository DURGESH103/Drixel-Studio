import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { id: 1, title: 'Custom Typeface', image: '/api/placeholder/600/400', tags: ['Font', 'Custom'] },
  { id: 2, title: 'Logo Typography', image: '/api/placeholder/600/400', tags: ['Logo', 'Brand'] },
  { id: 3, title: 'Editorial Layout', image: '/api/placeholder/600/400', tags: ['Magazine', 'Layout'] },
  { id: 4, title: 'Web Typography', image: '/api/placeholder/600/400', tags: ['Web', 'System'] },
  { id: 5, title: 'Poster Design', image: '/api/placeholder/600/400', tags: ['Poster', 'Event'] },
  { id: 6, title: 'Book Typography', image: '/api/placeholder/600/400', tags: ['Book', 'Reading'] }
];

const Typography = () => {
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title', 
        { y: 100, opacity: 0, letterSpacing: '0.5em' },
        { y: 0, opacity: 1, letterSpacing: '0.1em', duration: 2, ease: 'power3.out' }
      );

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.typo-card',
            { y: 80, opacity: 0, skewY: 5 },
            { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-space-black pt-24">
      <div className="fixed inset-0 opacity-15">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-electric-purple/40 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">
        <section ref={heroRef} className="px-6 py-20 text-center">
          <h1 className="hero-title text-7xl font-bold text-gradient mb-6 font-serif">
            Typography
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The art of arranging type to make language visible
          </p>
        </section>

        <section ref={gridRef} className="px-6 pb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="typo-card group cursor-pointer"
                whileHover={{ scale: 1.03, skewY: -1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-2xl overflow-hidden glass glow-border h-80">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-3 font-serif">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
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

export default Typography;