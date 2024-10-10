import React, { useEffect, useRef, useState } from 'react';
import PathCanvas from '../PathCanvas/PathCanvas';
import './MapContainer.scss';
import LOTRmap from '../../imgs/MiddleEarth.jpg'

interface Point {
  x: number;
  y: number;
}

const MapContainer: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const mapRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Example path coordinates
  const path: Point[] = [
    { x: 50, y: 50 },
    { x: 200, y: 150 },
    { x: 400, y: 300 },
    { x: 600, y: 500 },
  ];

  // Resize canvas to match the image size
  const resizeCanvas = () => {
    if (canvasRef.current && mapRef.current) {
      canvasRef.current.width = mapRef.current.clientWidth;
      canvasRef.current.height = mapRef.current.clientHeight;
    }
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <div className="map-container">
      <img
        ref={mapRef}
        id="map"
        src={LOTRmap}
        alt="Map"
        className="map-image"
      />
      <canvas ref={canvasRef} className="path-canvas"></canvas>

      <PathCanvas canvasRef={canvasRef} path={path} progress={progress} />

      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="progress-bar"
      />
    </div>
  );
};

export default MapContainer;
