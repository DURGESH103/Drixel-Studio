import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const exploreItems = [
  { section: 'Featured', items: ['Popular', 'New and Noteworthy'] },
  { 
    section: 'Categories', 
    items: ['Product Design', 'Web Design', 'Animation', 'Branding', 'Illustration', 'Mobile', 'Typography', 'Print'] 
  },
];

const PremiumNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') setActiveDropdown(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-gradient cursor-pointer"
          >
            Durgesh Studio
          </motion.div>

          {/* Center Nav - Desktop */}
          <div className="hidden lg:flex items-center gap-8" ref={dropdownRef}>
            <NavItem 
              label="Explore" 
              isActive={activeDropdown === 'explore'}
              onClick={() => setActiveDropdown(activeDropdown === 'explore' ? null : 'explore')}
            />
            <NavItem 
              label="Hire Talent" 
              isActive={activeDropdown === 'hire'}
              onClick={() => setActiveDropdown(activeDropdown === 'hire' ? null : 'hire')}
            />
            <NavItem 
              label="Get Hired" 
              isActive={activeDropdown === 'hired'}
              onClick={() => setActiveDropdown(activeDropdown === 'hired' ? null : 'hired')}
            />
            <NavItem 
              label="Community" 
              isActive={activeDropdown === 'community'}
              onClick={() => setActiveDropdown(activeDropdown === 'community' ? null : 'community')}
            />
          </div>

          {/* Right Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              className="px-6 py-2 rounded-full text-white hover:text-gray-300 transition-colors"
            >
              Sign Up
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(124, 58, 237, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-electric-purple to-neon-blue text-white font-semibold"
              style={{ boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' }}
            >
              Log In
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
          >
            <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }} className="w-6 h-0.5 bg-white" />
            <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1 }} className="w-6 h-0.5 bg-white" />
            <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }} className="w-6 h-0.5 bg-white" />
          </motion.button>
        </div>

        {/* Dropdown Menus */}
        <AnimatePresence>
          {activeDropdown === 'explore' && (
            <ExploreDropdown onClose={() => setActiveDropdown(null)} />
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavItem = ({ label, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouse}
      className="relative flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      {label}
      <motion.svg
        animate={{ rotate: isActive ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </motion.svg>
      
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-purple to-neon-blue"
          style={{ boxShadow: '0 0 10px rgba(124, 58, 237, 0.6)' }}
        />
      )}
      
      {isHovered && !isActive && (
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
        />
      )}
    </motion.button>
  );
};

const ExploreDropdown = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="absolute left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-space-black/95 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden"
      style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(124, 58, 237, 0.3)' }}
    >
      <div className="p-6">
        {exploreItems.map((section, sectionIndex) => (
          <div key={section.section}>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">{section.section}</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {section.items.map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => {
                    window.location.href = `/${item.toLowerCase().replace(' ', '-')}`;
                    onClose();
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (sectionIndex * section.items.length + index) * 0.03 }}
                  whileHover={{ x: 5, backgroundColor: 'rgba(124, 58, 237, 0.1)' }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:text-electric-purple transition-colors hover:bg-white/10 w-full text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-purple/20 to-neon-blue/20 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </motion.button>
              ))}
            </div>
            {sectionIndex < exploreItems.length - 1 && (
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const MobileMenu = ({ onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed inset-0 top-[73px] bg-space-black z-40 overflow-y-auto"
    >
      <div className="p-6 space-y-4">
        {['Explore', 'Hire Talent', 'Get Hired', 'Community'].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => setOpenSubmenu(openSubmenu === item ? null : item)}
              className="w-full flex items-center justify-between text-xl font-medium text-white py-3"
            >
              {item}
              <motion.svg
                animate={{ rotate: openSubmenu === item ? 180 : 0 }}
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            
            <AnimatePresence>
              {openSubmenu === item && item === 'Explore' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pl-4 pt-2 space-y-2">
                    {exploreItems[1].items.map((subItem) => (
                      <button
                        key={subItem}
                        onClick={() => window.location.href = `/${subItem.toLowerCase().replace(' ', '-')}`}
                        className="block py-2 text-gray-400 hover:text-white transition-colors w-full text-left"
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        <div className="pt-6 space-y-3">
          <button 
            onClick={() => navigate('/register')}
            className="w-full px-6 py-3 rounded-full glass text-white font-semibold"
          >
            Sign Up
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-electric-purple to-neon-blue text-white font-semibold"
          >
            Log In
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumNavbar;
