import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Members from './components/Members/Members';
import Gallery from './components/Gallery/Gallery';
import Timeline from './components/Timeline/Timeline';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import MobileMenu from './components/MobileMenu/MobileMenu';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import './App.css';

function App() {
  useSmoothScroll();

  return (
    <div className="app">
      <MobileMenu />
      <Hero />
      <About />
      <Members />
      <Gallery />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
