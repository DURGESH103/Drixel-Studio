import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { id: 1, title: 'Digital Artwork', image: '/api/placeholder/600/400', tags: ['Digital', 'Art'] },
  { id: 2, title: 'Character Design', image: '/api/placeholder/600/400', tags: ['Character', 'Concept'] },
  { id: 3, title: 'Icon Set', image: '/api/placeholder/600/400', tags: ['Icons', 'UI'] },
  { id: 4, title: 'Book Illustration', image: '/api/placeholder/600/400', tags: ['Book', 'Story'] },
  { id: 5, title: 'Editorial Art', image: '/api/placeholder/600/400', tags: ['Editorial', 'Magazine'] },
  { id: 6, title: 'Concept Art', image: '/api/placeholder/600/400', tags: ['Concept', 'Game'] }
];

const Illustration = () => {
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
          gsap.fromTo('.illus-card',
            { y: 80, opacity: 0, rotateX: 20 },
            { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-space-black pt-24">
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-soft-cyan/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-hot-pink/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10">
        <section ref={heroRef} className="px-6 py-20 text-center">
          <h1 className="hero-title text-7xl font-bold text-gradient mb-6">
            Illustration
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Creative visuals that inspire and communicate
          </p>
        </section>

        <section ref={gridRef} className="px-6 pb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="illus-card group cursor-pointer"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative rounded-2xl overflow-hidden glass glow-border h-96">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
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
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Illustration;