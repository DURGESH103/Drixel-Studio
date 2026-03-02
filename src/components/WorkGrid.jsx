import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: 1, 
    title: 'Crypto Dashboard', 
    category: 'Landing Page', 
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop', 
    color: '#7C3AED',
    tech: ['React', 'D3.js', 'WebSocket'],
    metrics: { conversion: '+187%', users: '50K+', rating: '4.9/5' },
    description: 'Real-time crypto trading platform with advanced analytics'
  },
  { 
    id: 2, 
    title: 'Luxury Brand', 
    category: 'Branding', 
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=800&fit=crop', 
    color: '#EC4899',
    tech: ['Brand Strategy', 'Logo Design', 'Guidelines'],
    metrics: { recognition: '+156%', engagement: '+89%', sales: '+234%' },
    description: 'Premium lifestyle brand with sophisticated visual identity'
  },
  { 
    id: 3, 
    title: 'SaaS Platform', 
    category: 'Landing Page', 
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop', 
    color: '#06B6D4',
    tech: ['Next.js', 'Tailwind', 'Framer Motion'],
    metrics: { conversion: '+145%', signups: '25K+', retention: '92%' },
    description: 'Enterprise SaaS solution with intuitive user experience'
  },
  { 
    id: 4, 
    title: 'Fashion Studio', 
    category: 'Branding', 
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop', 
    color: '#22D3EE',
    tech: ['Visual Identity', 'Photography', 'Print Design'],
    metrics: { brand_lift: '+178%', awareness: '+134%', sales: '+167%' },
    description: 'High-fashion brand with editorial-inspired aesthetics'
  },
  { 
    id: 5, 
    title: 'AI Product', 
    category: 'Landing Page', 
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop', 
    color: '#7C3AED',
    tech: ['React', 'Three.js', 'AI Integration'],
    metrics: { adoption: '+298%', accuracy: '99.2%', satisfaction: '4.8/5' },
    description: 'AI-powered platform with machine learning capabilities'
  },
  { 
    id: 6, 
    title: 'Tech Startup', 
    category: 'Branding', 
    image: 'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=800&h=800&fit=crop', 
    color: '#EC4899',
    tech: ['Brand Strategy', 'Web Design', 'Marketing'],
    metrics: { funding: '$2.5M', growth: '+456%', valuation: '$15M' },
    description: 'Innovative startup brand with disruptive market approach'
  },
];

const WorkGrid = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced title animation
      gsap.fromTo('.work-title-char', 
        { y: 100, opacity: 0, rotateX: -90 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 1.2, 
          stagger: 0.05, 
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Masonry grid with physics
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.work-card', 
            { 
              y: 150, 
              opacity: 0, 
              scale: 0.8,
              rotateY: -30,
              z: -100
            },
            { 
              y: 0, 
              opacity: 1, 
              scale: 1,
              rotateY: 0,
              z: 0,
              duration: 1.8, 
              stagger: {
                each: 0.12,
                from: 'random'
              },
              ease: 'elastic.out(1, 0.6)'
            }
          );
        }
      });

      // Floating background elements
      gsap.to('.work-bg-element', {
        y: -25,
        x: 15,
        rotation: 180,
        scale: 1.2,
        duration: 10,
        ease: 'easeInOut',
        yoyo: true,
        repeat: -1,
        stagger: 1.5
      });
    });

    return () => ctx.revert();
  }, []);
  return (
    <section ref={containerRef} id="work" className="py-32 px-6 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="work-bg-element absolute rounded-full blur-3xl opacity-10"
            style={{
              width: `${80 + i * 25}px`,
              height: `${80 + i * 25}px`,
              background: `radial-gradient(circle, ${['#7C3AED', '#EC4899', '#06B6D4', '#22D3EE', '#10B981'][i]}50, transparent)`,
              left: `${20 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 overflow-hidden" style={{ perspective: '1000px' }}>
            {'Selected Work'.split('').map((char, i) => (
              <span key={i} className="work-title-char inline-block" style={{ transformOrigin: '50% 100%' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-400"
          >
            Crafting digital experiences that push boundaries and drive results
          </motion.p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
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
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // 3D tilt effect
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(card, {
        rotateX: y * 0.05,
        rotateY: x * 0.05,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`work-card relative rounded-2xl overflow-hidden glass cursor-pointer group ${
        index % 3 === 1 ? 'md:mt-12' : ''
      }`}
      style={{
        aspectRatio: index % 4 === 1 ? '3/4' : '4/3',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Enhanced Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div 
          className="absolute inset-0 blur-xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${project.color}40, transparent 70%)`
          }}
        />
      </div>

      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span 
          className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
          style={{ backgroundColor: `${project.color}40`, color: project.color }}
        >
          {project.category}
        </span>
      </div>

      {/* Metrics on Hover */}
      <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 text-xs">
          <div className="text-green-400 font-bold">
            {Object.values(project.metrics)[0]}
          </div>
          <div className="text-gray-400">
            {Object.keys(project.metrics)[0]}
          </div>
        </div>
      </div>

      {/* Image */}
      <motion.img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.15 : 1 }}
        transition={{ duration: 0.8, ease: 'power2.out' }}
      />

      {/* Enhanced Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end p-6"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 30, opacity: isHovered ? 1 : 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 2).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/10 rounded text-xs backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 2 && (
              <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400">
                +{project.tech.length - 2}
              </span>
            )}
          </div>
          
          {/* Metrics */}
          <div className="flex justify-between items-center mb-4 text-xs">
            {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="font-bold" style={{ color: project.color }}>{value}</div>
                <div className="text-gray-400 capitalize">{key.replace('_', ' ')}</div>
              </div>
            ))}
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05, x: 5 }}
            className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            View Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WorkGrid;
