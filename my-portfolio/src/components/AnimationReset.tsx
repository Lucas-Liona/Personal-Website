import { useState } from 'react';

const AnimationReset: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [resetting, setResetting] = useState(false);
  
  const resetAnimation = () => {
    setResetting(true);
    
    // Log before removing
    console.log("Before reset - hasSeenSpiralAnimation:", 
      localStorage.getItem('hasSeenSpiralAnimation'));
    
    // Remove the animation seen flag
    localStorage.removeItem('hasSeenSpiralAnimation');
    
    // Log after removing
    console.log("After reset - hasSeenSpiralAnimation:", 
      localStorage.getItem('hasSeenSpiralAnimation'));
    
    // Force page reload to restart the animation
    setTimeout(() => {
      console.log("Reloading page...");
      window.location.reload();
    }, 500);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isVisible ? (
        <div className="bg-white dark:bg-dark-100 p-4 rounded-lg shadow-lg">
          <p className="mb-2 text-slate-600 dark:text-slate-300">
            Reset the Fibonacci animation?
          </p>
          <div className="flex space-x-2">
            <button
              onClick={resetAnimation}
              disabled={resetting}
              className={`px-3 py-1 bg-primary text-white rounded hover:bg-secondary ${
                resetting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {resetting ? 'Resetting...' : 'Reset'}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              disabled={resetting}
              className={`px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded ${
                resetting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsVisible(true)}
          className="p-3 bg-primary/10 dark:bg-primary/20 text-primary rounded-full hover:bg-primary/20 shadow-lg"
          title="Reset Fibonacci Animation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 4v6h-6"></path>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default AnimationReset;