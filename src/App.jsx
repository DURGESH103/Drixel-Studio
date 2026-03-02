import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PremiumNavbar from './components/PremiumNavbar';
import Hero from './components/Hero';
import WorkGrid from './components/WorkGrid';
import BrandingShowcase from './components/BrandingShowcase';
import LandingShowcase from './components/LandingShowcase';
import MotionShowcase from './components/MotionShowcase';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
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
    <div className="relative">
      <CustomCursor />
      <PremiumNavbar />
      <Hero />
      <WorkGrid />
      <BrandingShowcase />
      <LandingShowcase />
      <MotionShowcase />
      <Footer />
    </div>
  );
}

export default App;
