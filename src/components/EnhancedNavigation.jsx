import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Lottie from 'lottie-react';

const searchIcon = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 30,
  w: 20,
  h: 20,
  nm: 'Search',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Circle',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [10, 10, 0] },
        s: { a: 1, k: [{ t: 0, s: [100, 100], e: [110, 110] }, { t: 15, s: [110, 110], e: [100, 100] }, { t: 30 }] },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'el',
              s: { a: 0, k: [12, 12] },
              p: { a: 0, k: [0, 0] },
            },
            {
              ty: 'st',
              c: { a: 0, k: [0.6, 0.6, 0.6, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 2 },
            },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] } },
          ],
        },
      ],
    },
  ],
};

const EnhancedNavigation = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-gradient cursor-pointer"
          >
            Durgesh Studio
          </motion.div>

          {/* Search Bar */}
          <motion.div
            animate={{ width: searchExpanded ? 400 : 200 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="hidden md:flex items-center gap-3 glass rounded-full px-4 py-2 border border-white/10"
          >
            <Lottie animationData={searchIcon} loop style={{ width: 20, height: 20 }} />
            <input
              type="text"
              placeholder="Search designs..."
              onFocus={() => setSearchExpanded(true)}
              onBlur={() => setSearchExpanded(false)}
              className="bg-transparent outline-none text-white placeholder-gray-500 w-full"
            />
          </motion.div>

          {/* Dropdown Menu */}
          <div className="relative hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 hover:border-white/20 transition-colors"
            >
              <span>Menu</span>
              <motion.svg
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 glass rounded-2xl border border-white/10 overflow-hidden"
                >
                  {['About', 'Services', 'Blog', 'Contact'].map((item, i) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', x: 5 }}
                      className="block px-4 py-3 text-gray-300 hover:text-white transition-colors"
                    >
                      {item}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
          >
            <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }} className="w-6 h-0.5 bg-white" />
            <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1 }} className="w-6 h-0.5 bg-white" />
            <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }} className="w-6 h-0.5 bg-white" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-white/5"
          >
            <div className="px-6 py-4 space-y-4">
              <input
                type="text"
                placeholder="Search designs..."
                className="w-full glass rounded-full px-4 py-2 bg-transparent outline-none text-white placeholder-gray-500 border border-white/10"
              />
              {['About', 'Services', 'Blog', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ x: 5 }}
                  className="block text-lg font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default EnhancedNavigation;
