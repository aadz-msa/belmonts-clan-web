import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Members from './components/Members/Members';
import Gallery from './components/Gallery/Gallery';
import CastleWallGallery from './components/Gallery/CastleWallGallery';
import Timeline from './components/Timeline/Timeline';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import MobileMenu from './components/MobileMenu/MobileMenu';
import MemberDetail from './pages/MemberDetail';
import Legends from './pages/Legends';
import Treasure from './pages/Treasure';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import './App.css';

function HomePage() {
  useSmoothScroll();

  return (
    <div className="app">
      <MobileMenu />
      <Hero />
      <About />
      <Members />
      <Gallery />
      <Timeline />
      <CastleWallGallery />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/member/:memberId" element={<MemberDetail />} />
        <Route path="/member/leader/:leaderId" element={<MemberDetail />} />
        <Route path="/legends" element={<Legends />} />
        <Route path="/treasure" element={<Treasure />} />
      </Routes>
    </Router>
  );
}

export default App;
