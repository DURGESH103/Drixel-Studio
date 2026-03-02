import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

const featuredProject = {
  id: 'featured',
  title: 'Nexus AI - Complete Brand System',
  description: 'A comprehensive brand identity for an AI startup, featuring logo design, color systems, typography, and brand guidelines that reflect innovation and trust.',
  image: '/api/placeholder/1200/600',
  category: 'Tech Branding',
  year: '2024',
  client: 'Nexus AI Technologies'
};

const Branding = () => {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const gridRef = useRef(null);
  const sliderRef = useRef(null);
  const logoRef = useRef(null);
  const beforeAfterRef = useRef(null);
  const brandSystemRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('Popular');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroTl = gsap.timeline();
      heroTl.fromTo('.hero-title', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
      )
      .fromTo('.hero-subtitle',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo('.filter-tab',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.5'
      );

      // Floating shapes
      gsap.to('.floating-shape', {
        y: -20,
        duration: 4,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

      // Featured project scroll zoom
      ScrollTrigger.create({
        trigger: featuredRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to('.featured-image', {
            scale: 1 + progress * 0.1,
            duration: 0.3
          });
        }
      });

      // Grid stagger animation
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.project-card',
            { y: 80, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }
          );
        }
      });

      // Logo animation demo
      const logoTl = gsap.timeline({ paused: true });
      logoTl.fromTo('.logo-stroke', 
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 2, ease: 'power2.out' }
      )
      .fromTo('.logo-mark',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.5'
      )
      .fromTo('.logo-text',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.3'
      );

      ScrollTrigger.create({
        trigger: logoRef.current,
        start: 'top 70%',
        onEnter: () => logoTl.play()
      });

      // Brand system animations
      ScrollTrigger.create({
        trigger: brandSystemRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.color-swatch',
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }
          );
          gsap.fromTo('.font-weight',
            { fontWeight: 100, opacity: 0 },
            { fontWeight: 900, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power2.out' }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-space-black pt-24 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-15">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-electric-purple/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-hot-pink/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="floating-shape absolute top-1/3 right-1/4 w-32 h-32 bg-neon-blue/20 rounded-full blur-2xl" />
        <div className="floating-shape absolute bottom-1/3 left-1/3 w-24 h-24 bg-soft-cyan/20 rounded-full blur-xl" />
      </div>

      <div className="relative z-10">
        {/* 1. Hero Section */}
        <section ref={heroRef} className="px-4 sm:px-6 py-16 sm:py-24 text-center">
          <h1 className="hero-title text-5xl sm:text-7xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="text-gradient">Brand Identity</span>
            <br />
            <span className="text-white">& Logo Design</span>
          </h1>
          <p className="hero-subtitle text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
            Crafting bold, scalable, and memorable brand systems that drive business growth and customer connection.
          </p>
          
          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`filter-tab relative px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-colors ${
                  activeFilter === filter ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-full border border-electric-purple/50"
                    style={{ boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </section>

        {/* 2. Featured Project */}
        <section ref={featuredRef} className="px-4 sm:px-6 mb-20 sm:mb-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="relative rounded-3xl overflow-hidden glass border border-white/10 group cursor-pointer"
              whileHover={{ scale: 1.01 }}
              onClick={() => setShowCaseStudy(true)}
            >
              <div className="relative h-64 sm:h-96 md:h-[600px] overflow-hidden">
                <img 
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="featured-image w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, stagger: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-electric-purple/30 rounded-full text-sm font-medium backdrop-blur-sm">
                      {featuredProject.category}
                    </span>
                    <span className="text-gray-400 text-sm">{featuredProject.year}</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
                    {featuredProject.title}
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-3xl">
                    {featuredProject.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-electric-purple to-neon-blue rounded-full text-white font-semibold text-lg"
                  >
                    View Case Study
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Project Grid */}
        <section ref={gridRef} className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl sm:text-6xl font-bold text-center mb-16 text-gradient">
              Featured Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="project-card group cursor-pointer"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl">
                    <div className="relative h-64 sm:h-80 overflow-hidden">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      
                      {/* Hover Metrics */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2">
                          <div className="text-green-400 text-xs font-bold">+{project.metrics.recognition.replace('+', '')} Recognition</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Metadata */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-electric-purple/30 rounded text-xs font-medium">
                            {project.clientType}
                          </span>
                          <span className="text-gray-400 text-xs">{project.year}</span>
                        </div>
                        <div className="flex gap-1">
                          {project.colors.slice(0, 3).map((color, index) => (
                            <div 
                              key={index}
                              className="w-3 h-3 rounded-full border border-white/20"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                      <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                      <p className="text-gray-400 text-xs mb-3">{project.role}</p>
                      
                      {/* Deliverables Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.deliverables.slice(0, 2).map((deliverable, index) => (
                          <span key={index} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                            {deliverable}
                          </span>
                        ))}
                        {project.deliverables.length > 2 && (
                          <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400">
                            +{project.deliverables.length - 2}
                          </span>
                        )}
                      </div>
                      
                      {/* Success Metrics */}
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400">{project.metrics.recognition} Recognition</span>
                        <span className="text-blue-400">{project.metrics.engagement} Engagement</span>
                        <span className="text-purple-400">{project.metrics.conversion} Conversion</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 2️⃣ Logo Animation Demo */}
        <section ref={logoRef} className="px-4 sm:px-6 py-20 sm:py-32 bg-dark-surface/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-6xl font-bold text-center mb-16 text-gradient">
              Logo Creation Process
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Animated Logo Demo */}
              <div className="relative h-80 flex items-center justify-center glass rounded-3xl border border-white/10">
                <svg width="300" height="200" viewBox="0 0 300 200" className="overflow-visible">
                  {/* Neural Network Pattern */}
                  <g className="logo-stroke">
                    <path d="M50 100 L100 60 L150 100 L200 60 L250 100" stroke="url(#logoGradient)" strokeWidth="2" fill="none" strokeDasharray="500" strokeDashoffset="500" />
                    <path d="M50 100 L100 140 L150 100 L200 140 L250 100" stroke="url(#logoGradient)" strokeWidth="2" fill="none" strokeDasharray="500" strokeDashoffset="500" />
                    <path d="M100 60 L150 100 L200 140" stroke="url(#logoGradient)" strokeWidth="1" fill="none" strokeDasharray="300" strokeDashoffset="300" />
                  </g>
                  
                  {/* Logo Nodes */}
                  <circle className="logo-mark" cx="100" cy="60" r="8" fill="url(#logoGradient)" opacity="0" />
                  <circle className="logo-mark" cx="150" cy="100" r="12" fill="url(#logoGradient)" opacity="0" />
                  <circle className="logo-mark" cx="200" cy="140" r="8" fill="url(#logoGradient)" opacity="0" />
                  
                  {/* Central Mark */}
                  <circle className="logo-mark" cx="150" cy="100" r="20" fill="none" stroke="url(#logoGradient)" strokeWidth="2" opacity="0" />
                  
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="50%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="logo-text absolute bottom-8 text-3xl font-bold text-gradient opacity-0">
                  NEXUS AI
                </div>
              </div>
              
              {/* Logo Variations */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Logo Variations</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { bg: 'bg-white', text: 'Light Version', color: 'text-gray-900' },
                    { bg: 'bg-gray-900', text: 'Dark Version', color: 'text-white' },
                    { bg: 'bg-gradient-to-r from-electric-purple to-neon-blue', text: 'Gradient', color: 'text-white' },
                    { bg: 'bg-gray-100', text: 'Monochrome', color: 'text-gray-600' }
                  ].map((variant, index) => (
                    <motion.div
                      key={index}
                      className={`h-24 ${variant.bg} rounded-lg flex items-center justify-center border border-white/10`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`w-8 h-8 rounded-full ${variant.color === 'text-white' ? 'bg-white/20' : 'bg-gray-400'} mr-2`} />
                      <span className={`text-sm font-medium ${variant.color}`}>{variant.text}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Logo Construction */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Construction Grid</h4>
                  <div className="h-32 glass rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      {/* Grid Lines */}
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="absolute border-l border-electric-purple/30" style={{ left: `${(i + 1) * 12.5}%`, height: '100%' }} />
                      ))}
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="absolute border-t border-electric-purple/30" style={{ top: `${(i + 1) * 25}%`, width: '100%' }} />
                      ))}
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-r from-electric-purple to-neon-blue rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3️⃣ Before / After Section */}
        <section ref={beforeAfterRef} className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-6xl font-bold text-center mb-16 text-gradient">
              Before & After
            </h2>
            
            <div className="relative rounded-3xl overflow-hidden glass border border-white/10">
              <div className="relative h-96 flex">
                {/* Before */}
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-gray-800"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-600 rounded-lg mb-4 mx-auto flex items-center justify-center">
                      <span className="text-gray-400 text-lg">OLD</span>
                    </div>
                    <p className="text-gray-400">Before Redesign</p>
                  </div>
                </div>
                
                {/* After */}
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-electric-purple/20 to-neon-blue/20"
                  style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                >
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-electric-purple to-neon-blue rounded-lg mb-4 mx-auto flex items-center justify-center">
                      <span className="text-white text-lg font-bold">NEW</span>
                    </div>
                    <p className="text-white">After Redesign</p>
                  </div>
                </div>
                
                {/* Slider */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                  onMouseDown={(e) => {
                    const rect = e.currentTarget.parentElement.getBoundingClientRect();
                    const handleMouseMove = (e) => {
                      const x = e.clientX - rect.left;
                      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                      setSliderPosition(percentage);
                    };
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                >
                  <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <div className="w-1 h-4 bg-gray-400 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Applications Demo */}
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl sm:text-6xl font-bold text-center mb-16 text-gradient">
              Brand Applications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Business Cards */}
              <motion.div 
                className="glass rounded-2xl p-6 border border-white/10"
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3)' }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Business Cards</h3>
                <div className="space-y-3">
                  <div className="h-20 bg-gradient-to-r from-electric-purple to-neon-blue rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">NEXUS AI</span>
                  </div>
                  <div className="h-20 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-sm">NEXUS AI</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Mobile App */}
              <motion.div 
                className="glass rounded-2xl p-6 border border-white/10"
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3)' }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Mobile App</h3>
                <div className="bg-gray-900 rounded-xl p-4 h-40">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-electric-purple to-neon-blue rounded" />
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-white rounded-full" />
                      <div className="w-1 h-1 bg-white rounded-full" />
                      <div className="w-1 h-1 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-700 rounded" />
                    <div className="h-2 bg-gray-700 rounded w-3/4" />
                    <div className="h-8 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded" />
                  </div>
                </div>
              </motion.div>
              
              {/* Website */}
              <motion.div 
                className="glass rounded-2xl p-6 border border-white/10"
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)' }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Website</h3>
                <div className="bg-gray-900 rounded-xl p-3 h-40">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gradient-to-r from-electric-purple to-neon-blue rounded" />
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-16 bg-gray-700 rounded" />
                      <div className="h-16 bg-gray-700 rounded" />
                      <div className="h-16 bg-gray-700 rounded" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4️⃣ Brand System Showcase */}
        <section ref={brandSystemRef} className="px-4 sm:px-6 py-20 sm:py-32 bg-dark-surface/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-6xl font-bold text-center mb-16 text-gradient">
              Complete Brand System
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Color Palette Animation */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-8">Color Psychology</h3>
                <div className="space-y-4">
                  {[
                    { color: '#7C3AED', name: 'Electric Purple', meaning: 'Innovation & Creativity', usage: 'Primary Brand' },
                    { color: '#06B6D4', name: 'Neon Blue', meaning: 'Trust & Technology', usage: 'Secondary Actions' },
                    { color: '#EC4899', name: 'Hot Pink', meaning: 'Energy & Passion', usage: 'Accent & CTA' },
                    { color: '#22D3EE', name: 'Soft Cyan', meaning: 'Clarity & Focus', usage: 'Highlights' }
                  ].map((swatch, index) => (
                    <motion.div
                      key={index}
                      className="color-swatch flex items-center gap-4 p-4 glass rounded-lg border border-white/10"
                      whileHover={{ scale: 1.02, x: 10 }}
                    >
                      <div 
                        className="w-16 h-16 rounded-lg border border-white/20 flex-shrink-0"
                        style={{ backgroundColor: swatch.color }}
                      />
                      <div>
                        <h4 className="text-white font-semibold">{swatch.name}</h4>
                        <p className="text-gray-400 text-sm">{swatch.meaning}</p>
                        <p className="text-gray-500 text-xs">{swatch.usage}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Typography Hierarchy */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-8">Typography Scale</h3>
                <div className="space-y-6">
                  {[
                    { size: 'text-5xl', weight: 'font-black', text: 'Hero Title', desc: '48px / Bold' },
                    { size: 'text-3xl', weight: 'font-bold', text: 'Section Header', desc: '32px / Bold' },
                    { size: 'text-xl', weight: 'font-semibold', text: 'Card Title', desc: '20px / Semibold' },
                    { size: 'text-base', weight: 'font-medium', text: 'Body Text', desc: '16px / Medium' },
                    { size: 'text-sm', weight: 'font-normal', text: 'Caption', desc: '14px / Regular' }
                  ].map((font, index) => (
                    <motion.div 
                      key={index} 
                      className="font-weight"
                      whileHover={{ x: 10 }}
                    >
                      <div className={`${font.size} ${font.weight} text-white mb-1`}>
                        {font.text}
                      </div>
                      <p className="text-gray-400 text-xs">{font.desc}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Spacing System */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Spacing System</h4>
                  <div className="space-y-2">
                    {[4, 8, 16, 24, 32, 48].map((space, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div 
                          className="bg-electric-purple/30 h-4"
                          style={{ width: `${space}px` }}
                        />
                        <span className="text-gray-400 text-sm">{space}px</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. More Projects Slider */}
        <section ref={sliderRef} className="py-20 sm:py-32 bg-dark-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-4xl sm:text-6xl font-bold mb-16 text-gradient">
              More Branding Projects
            </h2>
            
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {projects.concat(projects).map((project, index) => (
                <motion.div
                  key={`${project.id}-${index}`}
                  className="flex-shrink-0 w-80 h-60 rounded-2xl overflow-hidden glass border border-white/10 group cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(124, 58, 237, 0.3)' }}
                >
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CTA Section */}
        <section className="px-4 sm:px-6 py-20 sm:py-32 text-center relative">
          <div className="floating-shape absolute top-1/4 left-1/6 w-20 h-20 bg-electric-purple/20 rounded-full blur-xl" />
          <div className="floating-shape absolute bottom-1/4 right-1/6 w-16 h-16 bg-hot-pink/20 rounded-full blur-lg" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.h2 
              className="text-5xl sm:text-7xl font-bold mb-8 text-gradient"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            >
              Ready to Build Your Brand?
            </motion.h2>
            <p className="text-xl sm:text-2xl text-gray-400 mb-12">
              Let's create a brand identity that stands out and drives growth
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(124, 58, 237, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-electric-purple to-neon-blue rounded-full text-white font-semibold text-lg"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(124, 58, 237, 0.4)',
                    '0 0 40px rgba(124, 58, 237, 0.6)',
                    '0 0 20px rgba(124, 58, 237, 0.4)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Start Your Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass rounded-full text-white font-semibold text-lg border border-white/20"
              >
                View Portfolio
              </motion.button>
            </div>
          </div>
        </section>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      {/* Case Study Modal */}
      <AnimatePresence>
        {showCaseStudy && (
          <CaseStudyModal 
            project={featuredProject} 
            onClose={() => setShowCaseStudy(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Project Detail Modal Component
const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto glass rounded-3xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            ✕
          </button>
          
          <img 
            src={project.image}
            alt={project.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
          
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-electric-purple/30 rounded-full text-sm font-medium">
                {project.category}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{project.title}</h2>
            
            {/* Color Palette */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Color Palette</h3>
              <div className="flex gap-3">
                {project.colors.map((color, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-12 h-12 rounded-lg border border-white/20 mb-2"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-gray-400">{color}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Typography Preview */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Typography</h3>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">Aa Bb Cc</div>
                <div className="text-lg text-gray-300">The quick brown fox jumps</div>
              </div>
            </div>
            
            {/* Logo Variations */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">Logo Variations</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 glass rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-electric-purple to-neon-blue rounded" />
                  </div>
                ))}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-electric-purple to-neon-blue rounded-full text-white font-semibold"
            >
              View Full Case Study
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Case Study Modal Component
const CaseStudyModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-space-black overflow-y-auto"
    >
      <div className="min-h-screen">
        <button 
          onClick={onClose}
          className="fixed top-6 right-6 z-10 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          ✕
        </button>
        
        {/* Hero */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <img 
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl sm:text-7xl font-bold text-white mb-4"
            >
              {project.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300"
            >
              {project.description}
            </motion.p>
          </div>
        </div>
        
        {/* Content Sections */}
        <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">
          {/* Brand Strategy */}
          <motion.section
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gradient mb-8">Brand Strategy</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our approach focused on creating a modern, trustworthy identity that would resonate with tech-savvy audiences while maintaining approachability for broader market appeal.
            </p>
          </motion.section>
          
          {/* Logo Construction */}
          <motion.section
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gradient mb-8">Logo Construction</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-64 glass rounded-2xl flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-electric-purple to-neon-blue rounded-lg" />
              </div>
              <div className="h-64 glass rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">Golden Ratio</div>
                  <div className="text-gray-400">Perfect proportions</div>
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* Results */}
          <motion.section
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gradient mb-8">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { metric: '60%', label: 'Brand Recognition Increase' },
                { metric: '40%', label: 'Customer Engagement' },
                { metric: '25%', label: 'Market Share Growth' }
              ].map((stat, index) => (
                <div key={index} className="text-center glass rounded-2xl p-6">
                  <div className="text-4xl font-bold text-gradient mb-2">{stat.metric}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default Branding;