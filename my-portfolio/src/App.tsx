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
import FibonacciBackground from './components/FibonacciBackground';
import AnimationReset from './components/AnimationReset';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  // Control whether content is shown
  const [showContent, setShowContent] = useState(false);
  
  // Control whether loading is shown
  const [showLoading, setShowLoading] = useState(true);
  
  useEffect(() => {
    // Check if we've seen the animation before
    const hasSeenAnimation = localStorage.getItem('hasSeenSpiralAnimation');
    
    if (hasSeenAnimation) {
      // If animation has been seen before, show content immediately
      console.log("Animation seen before, showing content immediately");
      setShowLoading(false);
      setShowContent(true);
    } else {
      // If this is the first visit, show animation and wait
      console.log("First visit, showing animation");
      
      // Hide loading screen after a short delay
      setTimeout(() => {
        setShowLoading(false);
      }, 800);
      
      // Force content to show after max animation time
      setTimeout(() => {
        console.log("Maximum wait time reached, forcing content to show");
        setShowContent(true);
      }, 6000); // Animation (5s) + buffer
    }
  }, []);
  
  // Callback for when animation completes
  const handleAnimationComplete = () => {
    console.log("Animation complete callback triggered");
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