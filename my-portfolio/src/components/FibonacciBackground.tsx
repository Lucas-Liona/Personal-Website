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
  const didSignalCompleteRef = useRef(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();

    const params = new URLSearchParams(window.location.search);
    const forceAnimate = (params.get('bgAnimate') ?? localStorage.getItem('bgAnimate') ?? '1') === '1';
    const reduceMotion = !forceAnimate && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

    const getMode = (): { motion: 'uniform' | 'wave'; direction: 'radial' | 'angular' } => {
      const motionParam = params.get('bgMotion');
      const directionParam = params.get('bgDir');

      const storedMotion = localStorage.getItem('bgMotion');
      const storedDirection = localStorage.getItem('bgDir');

      const motionValue = motionParam ?? storedMotion ?? 'wave';
      const motion = motionValue === 'wave' ? 'wave' : 'uniform';
      const direction = (directionParam || storedDirection) === 'angular' ? 'angular' : 'radial';

      return { motion, direction };
    };

    const mode = getMode();
    
    // Function to calculate more extreme exponential dot size
    const calculateDotSize = (normalizedPos: number, maxSize: number): number => {
      const minSize = 0.6;
      
      const exponent = 5;
      
      // Adjusted exponential function that grows very slowly at first, then explodes
      const factor = Math.pow(normalizedPos, exponent);
      
      // Calculate size with the new parameters
      return minSize + factor * (maxSize - minSize);
    };
    
    const drawDot = (x: number, y: number, size: number, color: string, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawThinSpiralLine = (points: Array<{ x: number; y: number }>, strokeStyle: string, alpha: number) => {
      if (points.length < 2) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = 1;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }

      const last = points[points.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
      ctx.restore();
    };

    const buildSpiralPoints = () => {
      const primaryColor = theme === 'dark' ? 'rgba(8, 145, 178, 1)' : 'rgba(14, 116, 144, 1)';
      const secondaryColor = theme === 'dark' ? 'rgba(6, 182, 212, 1)' : 'rgba(6, 182, 212, 1)';

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const maxTheta = 12 * Math.PI;

      const diagonalLength = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2));
      const sizeFactor = diagonalLength * 1.3;

      const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
      const b = Math.log(phi) / (Math.PI / 2);
      const a = sizeFactor / Math.exp(b * maxTheta);

      const zoomFactor = 0.28;
      const rotation = Math.PI;

      const dotSegments = 180;
      const lineSegments = 900;
      const thetaStepDots = maxTheta / dotSegments;
      const thetaStepLine = maxTheta / lineSegments;

      const primary: Array<{ theta: number; r0: number; x0: number; y0: number; normalizedPos: number }> = [];
      const secondary: Array<{ theta: number; r0: number; x0: number; y0: number; normalizedPos: number }> = [];
      const primaryLine: Array<{ theta: number; x0: number; y0: number }> = [];
      const secondaryLine: Array<{ theta: number; x0: number; y0: number }> = [];

      const project = (theta: number, phase: number) => {
        const r0 = a * Math.exp(b * theta);
        const x = centerX + r0 * Math.cos(theta + phase);
        const y = centerY + r0 * Math.sin(theta + phase);

        const cx = x - centerX;
        const cy = y - centerY;
        const rx = cx * Math.cos(rotation) - cy * Math.sin(rotation);
        const ry = cx * Math.sin(rotation) + cy * Math.cos(rotation);

        return {
          r0,
          x0: centerX + rx * zoomFactor,
          y0: centerY + ry * zoomFactor,
        };
      };

      for (let i = 0; i < dotSegments; i++) {
        const theta = i * thetaStepDots;
        const normalizedPos = i / dotSegments;

        const p = project(theta, 0);
        const s = project(theta, Math.PI);
        primary.push({ theta, r0: p.r0, x0: p.x0, y0: p.y0, normalizedPos });
        secondary.push({ theta, r0: s.r0, x0: s.x0, y0: s.y0, normalizedPos });
      }

      for (let i = 0; i < lineSegments; i++) {
        const theta = i * thetaStepLine;
        const p = project(theta, 0);
        const s = project(theta, Math.PI);
        primaryLine.push({ theta, x0: p.x0, y0: p.y0 });
        secondaryLine.push({ theta, x0: s.x0, y0: s.y0 });
      }

      return { primaryColor, secondaryColor, primary, secondary, primaryLine, secondaryLine };
    };

    let cached = buildSpiralPoints();
    
    const render = (tMs: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const t = tMs / 1000;
      const baseDotAlpha = theme === 'dark' ? 0.28 : 0.18;
      const baseLineAlpha = theme === 'dark' ? 0.20 : 0.14;

      const epsilon = mode.motion === 'uniform' ? 0.12 : 0.13; // Increased breathing amplitude
      const omega = mode.motion === 'uniform' ? (2 * Math.PI) / 8 : (2 * Math.PI) / 8;
      const k = 0.9;

      const wavePhase = (theta: number) => {
        if (mode.motion === 'uniform') return omega * t;
        if (mode.direction === 'radial') return omega * t - k * theta;
        return omega * t - k * theta - 0.8;
      };

      const waveValueAt = (theta: number) => Math.sin(wavePhase(theta));

      const linePointsPrimary: Array<{ x: number; y: number }> = [];
      const linePointsSecondary: Array<{ x: number; y: number }> = [];

      const waveLineAlpha = mode.motion === 'uniform'
        ? baseLineAlpha
        : baseLineAlpha * (0.15 + 0.85 * Math.abs(waveValueAt(cached.primary[cached.primary.length - 1]?.theta ?? 0)));

      const shouldDrawLine = mode.motion === 'uniform' || mode.motion === 'wave';

      for (let i = 0; i < cached.primary.length; i++) {
        const p = cached.primary[i];
        const s = cached.secondary[i];

        const pWave = waveValueAt(p.theta);
        const sWave = waveValueAt(s.theta);

        const pScale = 1 + epsilon * pWave;
        const sScale = 1 + epsilon * sWave;

        const px = (p.x0 - window.innerWidth / 2) * pScale + window.innerWidth / 2;
        const py = (p.y0 - window.innerHeight / 2) * pScale + window.innerHeight / 2;

        const sx = (s.x0 - window.innerWidth / 2) * sScale + window.innerWidth / 2;
        const sy = (s.y0 - window.innerHeight / 2) * sScale + window.innerHeight / 2;

        linePointsPrimary.push({ x: px, y: py });
        linePointsSecondary.push({ x: sx, y: sy });

        const pSize = calculateDotSize(p.normalizedPos, 6.2);
        const sSize = calculateDotSize(s.normalizedPos, 5.0);

        drawDot(px, py, pSize, cached.primaryColor, baseDotAlpha);
        drawDot(sx, sy, sSize, cached.secondaryColor, baseDotAlpha * 0.9);
      }

      if (cached.primaryLine && cached.secondaryLine) {
        for (let i = 0; i < cached.primaryLine.length; i++) {
          const p = cached.primaryLine[i];
          const s = cached.secondaryLine[i];

          const pWave = waveValueAt(p.theta);
          const sWave = waveValueAt(s.theta);

          const pScale = 1 + epsilon * pWave;
          const sScale = 1 + epsilon * sWave;

          const px = (p.x0 - window.innerWidth / 2) * pScale + window.innerWidth / 2;
          const py = (p.y0 - window.innerHeight / 2) * pScale + window.innerHeight / 2;

          const sx = (s.x0 - window.innerWidth / 2) * sScale + window.innerWidth / 2;
          const sy = (s.y0 - window.innerHeight / 2) * sScale + window.innerHeight / 2;

          linePointsPrimary.push({ x: px, y: py });
          linePointsSecondary.push({ x: sx, y: sy });
        }
      }

      if (shouldDrawLine) {
        const lineAlpha = mode.motion === 'uniform' ? baseLineAlpha : waveLineAlpha;
        drawThinSpiralLine(linePointsPrimary, cached.primaryColor, lineAlpha);
        drawThinSpiralLine(linePointsSecondary, cached.secondaryColor, lineAlpha * 0.85);
      }

      if (!didSignalCompleteRef.current) {
        didSignalCompleteRef.current = true;
        if (onAnimationComplete) onAnimationComplete();
      }

      if (!reduceMotion) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    // First paint is immediately in the final composition, then we animate subtly.
    if (!reduceMotion) {
      animationFrameRef.current = requestAnimationFrame(render);
    } else {
      render(0);
    }
    
    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        setCanvasSize();
        cached = buildSpiralPoints();
        didSignalCompleteRef.current = false;
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        setCanvasSize();
        cached = buildSpiralPoints();
        didSignalCompleteRef.current = false;
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (!reduceMotion) {
          animationFrameRef.current = requestAnimationFrame(render);
        } else {
          render(0);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme, onAnimationComplete]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-100 dark:opacity-50 pointer-events-none"
    />
  );
};

export default FibonacciBackground;