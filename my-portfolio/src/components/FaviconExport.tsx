import { useMemo, useState } from 'react';

type ThemeMode = 'light' | 'dark';

const renderFaviconPng = async (mode: ThemeMode, size: number): Promise<Blob> => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Unable to get 2D context');

  const bg = mode === 'dark' ? '#020617' : '#ffffff';
  const primary = mode === 'dark' ? 'rgba(6, 182, 212, 1)' : 'rgba(14, 116, 144, 1)';
  const secondary = mode === 'dark' ? 'rgba(8, 145, 178, 1)' : 'rgba(6, 182, 212, 1)';

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;

  const pad = size * 0.08;
  const radius = size / 2 - pad;

  const maxTheta = 8 * Math.PI;
  const phi = (1 + Math.sqrt(5)) / 2;
  const b = Math.log(phi) / (Math.PI / 2);

  const a = radius / Math.exp(b * maxTheta);

  const project = (theta: number, phase: number) => {
    const r = a * Math.exp(b * theta);
    const x = cx + r * Math.cos(theta + phase);
    const y = cy + r * Math.sin(theta + phase);
    return { x, y, r };
  };

  const buildPoints = (phase: number, segments: number) => {
    const points: Array<{ x: number; y: number; t: number }>
      = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const theta = t * maxTheta;
      const p = project(theta, phase);
      points.push({ x: p.x, y: p.y, t });
    }
    return points;
  };

  const drawSmoothLine = (points: Array<{ x: number; y: number }>, strokeStyle: string, lineWidth: number, alpha: number) => {
    if (points.length < 2) return;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
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

  const drawDot = (x: number, y: number, r: number, color: string, alpha: number) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const lineSegments = 260;
  const dotSegments = 70;

  const pLine = buildPoints(0, lineSegments);
  const sLine = buildPoints(Math.PI, lineSegments);

  const pDots = buildPoints(0, dotSegments);
  const sDots = buildPoints(Math.PI, dotSegments);

  const lineWidth = Math.max(2, Math.floor(size * 0.012));

  drawSmoothLine(pLine, primary, lineWidth, 0.85);
  drawSmoothLine(sLine, secondary, Math.max(2, Math.floor(lineWidth * 0.9)), 0.75);

  for (let i = 0; i < pDots.length; i++) {
    const t = pDots[i].t;
    const dotR = Math.max(1.25, (size * 0.006) + Math.pow(t, 2.6) * (size * 0.018));
    drawDot(pDots[i].x, pDots[i].y, dotR, primary, 0.9);
  }

  for (let i = 0; i < sDots.length; i++) {
    const t = sDots[i].t;
    const dotR = Math.max(1.1, (size * 0.0055) + Math.pow(t, 2.6) * (size * 0.015));
    drawDot(sDots[i].x, sDots[i].y, dotR, secondary, 0.85);
  }

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to export PNG'));
        return;
      }
      resolve(blob);
    }, 'image/png');
  });
};

const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const FaviconExport: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [exporting, setExporting] = useState(false);

  const size = useMemo(() => 512, []);

  const exportBoth = async () => {
    setExporting(true);
    try {
      const [lightBlob, darkBlob] = await Promise.all([
        renderFaviconPng('light', size),
        renderFaviconPng('dark', size),
      ]);

      downloadBlob(lightBlob, 'favicon-light.png');
      downloadBlob(darkBlob, 'favicon-dark.png');
    } finally {
      setExporting(false);
      setIsVisible(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isVisible ? (
        <div className="bg-white dark:bg-dark-100 p-4 rounded-lg shadow-lg">
          <p className="mb-2 text-slate-600 dark:text-slate-300">
            Export theme-aware favicons?
          </p>
          <div className="flex space-x-2">
            <button
              onClick={exportBoth}
              disabled={exporting}
              className={`px-3 py-1 bg-primary text-white rounded hover:bg-secondary ${
                exporting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {exporting ? 'Exporting...' : 'Export PNGs'}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              disabled={exporting}
              className={`px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded ${
                exporting ? 'opacity-50 cursor-not-allowed' : ''
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
          title="Export Favicons"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default FaviconExport;
