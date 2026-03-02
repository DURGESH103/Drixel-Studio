import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PremiumNavbar from './components/PremiumNavbar';
import Hero from './components/Hero';
import WorkGrid from './components/WorkGrid';
import BrandingShowcase from './components/BrandingShowcase';
import LandingShowcase from './components/LandingShowcase';
import MotionShowcase from './components/MotionShowcase';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ProductDesign from './pages/ProductDesign';
import WebDesign from './pages/WebDesign';
import Animation from './pages/Animation';
import Branding from './pages/Branding';
import Illustration from './pages/Illustration';
import Mobile from './pages/Mobile';
import Typography from './pages/Typography';
import Print from './pages/Print';
import './styles/index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove();
    };
  }, []);

  return (
    <Router>
      <div className="relative">
        <CustomCursor />
        <PremiumNavbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <WorkGrid />
              <BrandingShowcase />
              <LandingShowcase />
              <MotionShowcase />
              <Footer />
            </>
          } />
          <Route path="/product-design" element={<ProductDesign />} />
          <Route path="/web-design" element={<WebDesign />} />
          <Route path="/animation" element={<Animation />} />
          <Route path="/branding" element={<Branding />} />
          <Route path="/illustration" element={<Illustration />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/typography" element={<Typography />} />
          <Route path="/print" element={<Print />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
