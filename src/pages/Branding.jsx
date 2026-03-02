import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: 1, 
    title: 'Nexus AI', 
    image: '/api/placeholder/600/400', 
    category: 'AI Technology', 
    tags: ['Logo', 'Identity', 'Guidelines'], 
    featured: true, 
    colors: ['#7C3AED', '#06B6D4', '#EC4899'],
    clientType: 'Startup',
    year: '2024',
    role: 'Brand Strategy, Logo, Visual Identity',
    description: 'Revolutionary AI platform brand identity with neural network inspired logo',
    metrics: { recognition: '+85%', engagement: '+120%', conversion: '+45%' },
    deliverables: ['Logo Design', 'Brand Guidelines', 'Website Design', 'Marketing Materials']
  },
  { 
    id: 2, 
    title: 'FinFlow', 
    image: '/api/placeholder/600/400', 
    category: 'Fintech', 
    tags: ['Logo', 'App Design'], 
    colors: ['#10B981', '#059669', '#047857'],
    clientType: 'Fintech',
    year: '2024',
    role: 'Brand Strategy, Logo, Visual Identity',
    description: 'Modern fintech brand with trust-focused visual language',
    metrics: { recognition: '+70%', engagement: '+95%', conversion: '+38%' },
    deliverables: ['Logo System', 'App Interface', 'Brand Guidelines', 'Marketing Kit']
  },
  { 
    id: 3, 
    title: 'CloudSync Pro', 
    image: '/api/placeholder/600/400', 
    category: 'SaaS Platform', 
    tags: ['Identity', 'Dashboard'], 
    colors: ['#3B82F6', '#1D4ED8', '#1E40AF'],
    clientType: 'SaaS',
    year: '2024',
    role: 'Brand Strategy, Logo, UI Design',
    description: 'Enterprise cloud solution with professional, scalable brand system',
    metrics: { recognition: '+92%', engagement: '+110%', conversion: '+52%' },
    deliverables: ['Logo Design', 'Dashboard UI', 'Brand System', 'Documentation']
  },
  { 
    id: 4, 
    title: 'EcoVibe', 
    image: '/api/placeholder/600/400', 
    category: 'Sustainability', 
    tags: ['Logo', 'Packaging'], 
    colors: ['#22C55E', '#16A34A', '#15803D'],
    clientType: 'Startup',
    year: '2023',
    role: 'Brand Strategy, Packaging Design',
    description: 'Eco-friendly brand with nature-inspired visual identity',
    metrics: { recognition: '+78%', engagement: '+88%', conversion: '+41%' },
    deliverables: ['Logo Design', 'Packaging System', 'Brand Guidelines', 'Website']
  },
  { 
    id: 5, 
    title: 'TechFlow', 
    image: '/api/placeholder/600/400', 
    category: 'Development Tools', 
    tags: ['Identity', 'Platform'], 
    colors: ['#8B5CF6', '#7C3AED', '#6D28D9'],
    clientType: 'SaaS',
    year: '2024',
    role: 'Brand Strategy, Logo, Platform Design',
    description: 'Developer-focused platform with modern, technical aesthetic',
    metrics: { recognition: '+89%', engagement: '+105%', conversion: '+47%' },
    deliverables: ['Logo System', 'Platform UI', 'Developer Tools', 'Documentation']
  },
  { 
    id: 6, 
    title: 'MedCore', 
    image: '/api/placeholder/600/400', 
    category: 'Healthcare Tech', 
    tags: ['Rebrand', 'Medical'], 
    colors: ['#EF4444', '#DC2626', '#B91C1C'],
    clientType: 'Fintech',
    year: '2023',
    role: 'Complete Rebrand, Logo, Medical UI',
    description: 'Healthcare technology rebrand with trust and innovation focus',
    metrics: { recognition: '+95%', engagement: '+125%', conversion: '+58%' },
    deliverables: ['Complete Rebrand', 'Medical Interface', 'Brand Guidelines', 'Marketing']
  }
];

const filters = ['Popular', 'Latest', 'Case Studies', 'Logo Systems'];

const Branding = () => {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('Popular');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleFilterChange = useCallback((filter) => {
    setIsLoading(true);
    setActiveFilter(filter);
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline();
      heroTl.fromTo('.hero-title', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      )
      .fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo('.project-card',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-space-black pt-16 sm:pt-24">
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 bg-electric-purple/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/5 w-64 h-64 bg-hot-pink/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <section ref={heroRef} className="px-4 sm:px-6 py-12 sm:py-20 text-center">
          <h1 className="hero-title text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-gradient">Brand Identity</span>
            <br />
            <span className="text-white">& Logo Design</span>
          </h1>
          <p className="hero-subtitle text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-12">
            Crafting memorable brand systems that drive growth
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-16">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'text-white bg-electric-purple/20 border border-electric-purple/50' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {filter}
                {isLoading && activeFilter === filter && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </section>

        <section ref={gridRef} className="px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {projects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  onClick={() => setSelectedProject(project)}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectCard = ({ project, index, onClick, prefersReducedMotion }) => {
  return (
    <motion.div
      className="project-card group cursor-pointer"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={prefersReducedMotion ? {} : { y: -5 }}
      onClick={onClick}
    >
      <div className="relative rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-1 bg-electric-purple/20 text-electric-purple rounded text-xs font-medium">
              {project.clientType}
            </span>
            <span className="text-gray-400 text-xs">{project.year}</span>
          </div>
          
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {project.colors.slice(0, 3).map((color, i) => (
                <div 
                  key={i}
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-green-400 text-xs font-medium">
              {project.metrics.recognition}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose, prefersReducedMotion }) => {
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0 }}
      animate={prefersReducedMotion ? {} : { opacity: 1 }}
      exit={prefersReducedMotion ? {} : { opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={prefersReducedMotion ? {} : { scale: 0.9, opacity: 0 }}
        animate={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
        exit={prefersReducedMotion ? {} : { scale: 0.9, opacity: 0 }}
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gray-900/95 backdrop-blur-md rounded-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
          
          <img 
            src={project.image}
            alt={project.title}
            className="w-full h-48 sm:h-64 object-cover"
          />
          
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-electric-purple/20 text-electric-purple rounded-full text-sm font-medium">
                {project.clientType}
              </span>
              <span className="text-gray-400 text-sm">{project.year}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{project.title}</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Role</h3>
                <p className="text-gray-400 text-sm">{project.role}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Category</h3>
                <p className="text-gray-400 text-sm">{project.category}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-3">Success Metrics</h3>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-green-400 font-bold text-sm">{value}</div>
                    <div className="text-gray-400 text-xs capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-electric-purple hover:bg-electric-purple/80 rounded-lg text-white font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Branding;