import { motion } from 'framer-motion';
import { useState } from 'react';

const projects = [
  { id: 1, title: 'Crypto Dashboard', category: 'Landing Page', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop', color: '#7C3AED' },
  { id: 2, title: 'Luxury Brand', category: 'Branding', image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=800&fit=crop', color: '#EC4899' },
  { id: 3, title: 'SaaS Platform', category: 'Landing Page', image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop', color: '#06B6D4' },
  { id: 4, title: 'Fashion Studio', category: 'Branding', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop', color: '#22D3EE' },
  { id: 5, title: 'AI Product', category: 'Landing Page', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop', color: '#7C3AED' },
  { id: 6, title: 'Tech Startup', category: 'Branding', image: 'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=800&h=800&fit=crop', color: '#EC4899' },
];

const WorkGrid = () => {
  return (
    <section id="work" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Selected <span className="text-gradient">Work</span>
          </h2>
          <p className="text-xl text-gray-400">
            Crafting digital experiences that push boundaries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl overflow-hidden glass glow-border cursor-pointer group gpu-accelerate ${
        index % 3 === 1 ? 'md:mt-12' : ''
      }`}
      style={{
        aspectRatio: index % 4 === 1 ? '3/4' : '4/3',
      }}
    >
      {/* Image */}
      <motion.img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ delay: 0.1 }}
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
            style={{ backgroundColor: `${project.color}40`, color: project.color }}
          >
            {project.category}
          </span>
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <button className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
            View Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${project.color}20, transparent 70%)`,
        }}
      />
    </motion.div>
  );
};

export default WorkGrid;
