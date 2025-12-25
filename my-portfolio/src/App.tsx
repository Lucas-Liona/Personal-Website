import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Now from './pages/Now';
import NowArchive from './pages/NowArchive';
import NowEntry from './pages/NowEntry';
import Moc from './pages/Moc';
import MocEntry from './pages/MocEntry';
import FibonacciBackground from './components/FibonacciBackground';
import AnimationReset from './components/AnimationReset';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  // Control whether content is shown
  const [showContent, setShowContent] = useState(true);
  
  // Control whether loading is shown
  const [showLoading, setShowLoading] = useState(false);
  
  useEffect(() => {
    setShowLoading(false);
    setShowContent(true);
  }, []);
  
  // Callback for when animation completes
  const handleAnimationComplete = () => {
    setShowContent(true);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          {/* Loading overlay */}
          {showLoading && (
            <div className="fixed inset-0 bg-light dark:bg-dark z-50 flex items-center justify-center transition-opacity duration-1000 opacity-50">
              <div className="text-3xl font-bold text-primary animate-pulse">
                Loading...
              </div>
            </div>
          )}
          
          {/* Fibonacci background with animation */}
          <FibonacciBackground onAnimationComplete={handleAnimationComplete} />
          
          {/* Main content */}
          <div 
            className={`transition-opacity duration-1000 ${
              showContent ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/docs" element={<Blog />} />
                <Route path="/docs/:slug" element={<BlogPost />} />
                <Route path="/now" element={<Now />} />
                <Route path="/now/archive" element={<NowArchive />} />
                <Route path="/now/:slug" element={<NowEntry />} />
                <Route path="/moc" element={<Moc />} />
                <Route path="/moc/:slug" element={<MocEntry />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
          
          {/* Development tool to reset animation */}
          <AnimationReset />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;