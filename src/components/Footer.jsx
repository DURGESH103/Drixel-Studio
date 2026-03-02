import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { name: 'Dribbble', url: '#' },
    { name: 'Behance', url: '#' },
    { name: 'GitHub', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: 'Twitter', url: '#' },
  ];

  return (
    <footer id="contact" className="relative py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Let's Create
              <br />
              <span className="text-gradient">Something Amazing</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Available for freelance projects and full-time opportunities
            </p>
            <motion.a
              href="mailto:hello@drixel.studio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-electric-purple to-neon-blue text-white font-semibold"
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-end"
          >
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-4">Follow Me</p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    whileHover={{ y: -5 }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm">
            © 2024 Drixel Studio. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Designed & Developed with 💜
          </p>
        </motion.div>
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-electric-purple/20 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
};

export default Footer;
