import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const landingPages = [
  {
    id: 1,
    title: 'AI SaaS Platform',
    problem: 'Complex AI tools needed simple, intuitive interface',
    solution: 'Created clean dashboard with guided onboarding flow',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
  },
  {
    id: 2,
    title: 'Crypto Exchange',
    problem: 'Users overwhelmed by trading complexity',
    solution: 'Simplified trading interface with real-time analytics',
    tech: ['Next.js', 'WebSocket', 'GSAP'],
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=800&fit=crop',
  },
  {
    id: 3,
    title: 'Design Agency',
    problem: 'Portfolio needed to showcase creative work',
    solution: 'Interactive grid with smooth transitions',
    tech: ['React', 'Three.js', 'Lenis'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop',
  },
];

const LandingShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="landing-pages" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Landing <span className="text-gradient">Pages</span>
          </h2>
          <p className="text-xl text-gray-400">
            High-converting pages that tell compelling stories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {landingPages.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="glass rounded-2xl overflow-hidden cursor-pointer group glow-border"
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.problem}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs glass border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Content */}
              <h2 className="text-4xl font-bold mb-6">{selectedProject.title}</h2>

              <div className="mb-8">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-hot-pink">Problem</h3>
                  <p className="text-gray-400">{selectedProject.problem}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-neon-blue">Solution</h3>
                  <p className="text-gray-400">{selectedProject.solution}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full glass border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LandingShowcase;
