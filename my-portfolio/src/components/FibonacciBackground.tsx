import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface FibonacciBackgroundProps {
  onAnimationComplete?: () => void;
}

const FibonacciBackground: React.FC<FibonacciBackgroundProps> = ({ 
  onAnimationComplete 
}) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    console.log("FibonacciBackground useEffect initialization");
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Function to calculate more extreme exponential dot size
    const calculateDotSize = (normalizedPos: number, maxSize: number): number => {
      // Start with much smaller dots (0.3px instead of 1px)
      const minSize = 0.3;
      
      // Use a higher exponent for more extreme growth curve
      const exponent = 8; // Much higher exponent = more dramatic curve
      
      // Adjusted exponential function that grows very slowly at first, then explodes
      const factor = Math.pow(normalizedPos, exponent);
      
      // Calculate size with the new parameters
      return minSize + factor * (maxSize - minSize);
    };
    
    // Function to draw glowing dot with correct color handling
    const drawGlowingDot = (x: number, y: number, size: number, color: string, glowIntensity: number = 0.7) => {
      // Handle color parsing properly
      let r = 0, g = 0, b = 0, a = 0;
      
      // Parse colors carefully to avoid errors
      if (color.startsWith('rgba')) {
        const parts = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (parts) {
          r = parseInt(parts[1]);
          g = parseInt(parts[2]);
          b = parseInt(parts[3]);
          a = parseFloat(parts[4]);
        }
      } else if (color.startsWith('rgb')) {
        const parts = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (parts) {
          r = parseInt(parts[1]);
          g = parseInt(parts[2]);
          b = parseInt(parts[3]);
          a = 1;
        }
      }
      
      // Draw outer glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
      
      // Create safe color values
      const glowColor = `rgba(${r}, ${g}, ${b}, ${a * glowIntensity})`;
      const midColor = `rgba(${r}, ${g}, ${b}, ${a * 0.3})`;
      const outerColor = `rgba(${r}, ${g}, ${b}, 0)`;
      
      gradient.addColorStop(0, glowColor);
      gradient.addColorStop(0.5, midColor);
      gradient.addColorStop(1, outerColor);
      
      // Draw glow
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(x, y, size * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw main dot
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    };
    
    // Function to draw the static final spiral with dots
    const drawStaticSpiral = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Choose colors based on theme
      const primaryColor = theme === 'dark' ? 'rgba(8, 145, 178, 0.8)' : 'rgba(14, 116, 144, 0.7)';
      const secondaryColor = theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(6, 182, 212, 0.5)';
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxTheta = 12 * Math.PI;
      
      const diagonalLength = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2));
      const sizeFactor = diagonalLength * 1.2; 
      
      const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
      const b = Math.log(phi) / (Math.PI / 2);
      const a = sizeFactor / (Math.exp(b * maxTheta));
      
      // Make zoom 15% larger
      const zoomFactor = 0.115;
      
      // Draw final state
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(Math.PI);
      ctx.scale(zoomFactor, zoomFactor);
      ctx.translate(-centerX, -centerY);
      
      // For static view, draw individual dots with more extreme size growth
      const segments = 500; // More segments for smoother spiral
      const thetaStep = maxTheta / segments;
      
      // Primary spiral - even larger max size (40px)
      for (let i = 0; i < segments; i++) {
        const theta = i * thetaStep;
        
        // Calculate normalized position in the spiral (0 to 1)
        const normalizedPos = i / segments;
        
        // More extreme size growth from 0.3 to 40
        const dotSize = calculateDotSize(normalizedPos, 40);
        
        // Calculate the current point on the spiral
        const r = a * Math.exp(b * theta);
        const x = centerX + r * Math.cos(theta);
        const y = centerY + r * Math.sin(theta);
        
        // Draw a glowing dot at this point
        const glowIntensity = 0.4 + (normalizedPos * 0.6); // Glow intensity increases with size
        drawGlowingDot(x, y, dotSize, primaryColor, glowIntensity);
      }
      
      // Secondary spiral - even larger max size (35px)
      for (let i = 0; i < segments; i++) {
        const theta = i * thetaStep;
        
        // Calculate normalized position in the spiral (0 to 1)
        const normalizedPos = i / segments;
        
        // More extreme size growth from 0.3 to 35
        const dotSize = calculateDotSize(normalizedPos, 35);
        
        // Calculate the current point on the spiral
        const r = a * Math.exp(b * theta);
        const x = centerX + r * Math.cos(theta + Math.PI);
        const y = centerY + r * Math.sin(theta + Math.PI);
        
        // Draw a glowing dot at this point
        const glowIntensity = 0.4 + (normalizedPos * 0.6); // Glow intensity increases with size
        drawGlowingDot(x, y, dotSize, secondaryColor, glowIntensity);
      }
      
      ctx.restore();
      
      // Draw horizontal line across the screen
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = primaryColor;
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      
      console.log("Drawing final Fibonacci spiral");
    };
    
    // Check if animation has been seen before
    const hasSeenAnimation = localStorage.getItem('hasSeenSpiralAnimation');
    
    if (hasSeenAnimation) {
      // Just draw the static spiral
      console.log("Drawing final Fibonacci spiral - already seen");
      drawStaticSpiral();
      if (onAnimationComplete) onAnimationComplete();
    } else {
      console.log("Starting Fibonacci animation");
      
      // Animation parameters
      let startTime: number | null = null;
      // Reduced animation duration by another 5 seconds (from 10 to 5)
      const animationDuration = 5000; // 5 seconds
      
      // Parameters for the spiral
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Choose colors based on theme
      const primaryColor = theme === 'dark' ? 'rgba(8, 145, 178, 0.8)' : 'rgba(14, 116, 144, 0.7)';
      const secondaryColor = theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(6, 182, 212, 0.5)';
      
      const maxTheta = 12 * Math.PI;
      
      const diagonalLength = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2));
      const sizeFactor = diagonalLength * 1.2;
      
      const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
      const b = Math.log(phi) / (Math.PI / 2);
      const a = sizeFactor / (Math.exp(b * maxTheta));
      
      const finalZoomFactor = 0.115;
      
      // Animation loop
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Animation phases with adjusted timings
        let drawProgress1 = 0; 
        let drawProgress2 = 0; 
        let zoomFactor = 1;    
        let rotation = 0;      
        let drawHorizontalLine = 0;
        
        if (progress < 0.25) {
          // Draw first spiral - 25% of animation
          drawProgress1 = progress / 0.25;
        } else if (progress < 0.5) {
          // Draw second spiral - 25% of animation
          drawProgress1 = 1;
          drawProgress2 = (progress - 0.25) / 0.25;
        } else if (progress < 0.7) {
          // Rotation phase - 20% of animation
          drawProgress1 = 1;
          drawProgress2 = 1;
          rotation = ((progress - 0.5) / 0.2) * Math.PI;
        } else if (progress < 0.97) {
          // Zoom phase - 27% of animation
          drawProgress1 = 1;
          drawProgress2 = 1;
          zoomFactor = 1 - ((progress - 0.7) / 0.27) * (1 - finalZoomFactor);
          rotation = Math.PI;
        } else {
          // Horizontal line - nearly instant (3% of animation)
          drawProgress1 = 1;
          drawProgress2 = 1;
          zoomFactor = finalZoomFactor;
          rotation = Math.PI;
          // Make the line appear almost instantly
          drawHorizontalLine = (progress - 0.97) / 0.03;
        }
        
        // Apply transforms
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);
        ctx.scale(zoomFactor, zoomFactor);
        ctx.translate(-centerX, -centerY);
        
        // Calculate pulse for glow animation - faster pulse rate
        const pulseRate = Date.now() / 500; // Faster pulsing (was 1000)
        const pulseFactor = (Math.sin(pulseRate) + 1) * 0.25 + 0.5; // Oscillate between 0.5 and 1.0
        
        // Draw first spiral using individual dots with more extreme size growth
        if (drawProgress1 > 0) {
          // Reduce segments for faster drawing
          const segments = 400; // Was 500
          const visibleSegments = Math.ceil(drawProgress1 * segments);
          const thetaStep = maxTheta / segments;
          
          // Draw each dot individually
          for (let i = 0; i < visibleSegments; i++) {
            const theta = i * thetaStep;
            
            // Calculate normalized position in the spiral (0 to 1)
            const normalizedPos = i / segments;
            
            // More extreme size growth from 0.3 to 40
            const dotSize = calculateDotSize(normalizedPos, 40);
            
            // Calculate the current point
            const r = a * Math.exp(b * theta);
            const x = centerX + r * Math.cos(theta);
            const y = centerY + r * Math.sin(theta);
            
            // Create varying glow effect
            const glowIntensity = 0.4 + (normalizedPos * 0.6 * pulseFactor); 
            drawGlowingDot(x, y, dotSize, primaryColor, glowIntensity);
          }
        }
        
        // Draw second spiral using individual dots with more extreme size growth
        if (drawProgress2 > 0) {
          // Reduce segments for faster drawing
          const segments = 400; // Was 500
          const visibleSegments = Math.ceil(drawProgress2 * segments);
          const thetaStep = maxTheta / segments;
          
          // Draw each dot individually
          for (let i = 0; i < visibleSegments; i++) {
            const theta = i * thetaStep;
            
            // Calculate normalized position in the spiral (0 to 1)
            const normalizedPos = i / segments;
            
            // More extreme size growth from 0.3 to 35
            const dotSize = calculateDotSize(normalizedPos, 35);
            
            // Calculate the current point
            const r = a * Math.exp(b * theta);
            const x = centerX + r * Math.cos(theta + Math.PI);
            const y = centerY + r * Math.sin(theta + Math.PI);
            
            // Create varying glow effect with slight offset phase
            const glowIntensity = 0.4 + (normalizedPos * 0.6 * (1 - pulseFactor)); 
            drawGlowingDot(x, y, dotSize, secondaryColor, glowIntensity);
          }
        }
        
        ctx.restore();
        
        // Draw horizontal line in final phase with glow effect
        if (drawHorizontalLine > 0) {
          const lineY = canvas.height / 2;
          const startX = 0;
          const endX = canvas.width * drawHorizontalLine;
          
          // Draw glow effect first (wider, semi-transparent line)
          ctx.beginPath();
          ctx.lineWidth = 12;
          
          // Parse primary color and create glow color
          let r = 8, g = 145, b = 178, a = 0.8;
          if (primaryColor.startsWith('rgba')) {
            const parts = primaryColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
            if (parts) {
              r = parseInt(parts[1]);
              g = parseInt(parts[2]);
              b = parseInt(parts[3]);
              a = parseFloat(parts[4]);
            }
          }
          
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a * 0.3})`;
          ctx.moveTo(startX, lineY);
          ctx.lineTo(endX, lineY);
          ctx.stroke();
          
          // Draw main line on top
          ctx.beginPath();
          ctx.lineWidth = 4;
          ctx.strokeStyle = primaryColor;
          ctx.moveTo(startX, lineY);
          ctx.lineTo(endX, lineY);
          ctx.stroke();
        }
        
        // Continue or complete
        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Animation is complete
          localStorage.setItem('hasSeenSpiralAnimation', 'true');
          if (onAnimationComplete) onAnimationComplete();
        }
      };
      
      // Start animation
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    
    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        if (localStorage.getItem('hasSeenSpiralAnimation')) {
          drawStaticSpiral();
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme, onAnimationComplete]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-90"
    />
  );
};

export default FibonacciBackground;