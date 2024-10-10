import React, { useEffect } from 'react';

interface Point {
  x: number;
  y: number;
}

interface PathCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  path: Point[];
  progress: number;
}

const PathCanvas: React.FC<PathCanvasProps> = ({ canvasRef, path, progress }) => {
  // Function to draw the path
  const drawPath = (progress: number) => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear previous paths
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);

    const totalPoints = Math.floor((path.length - 1) * (progress / 100));
    for (let i = 0; i <= totalPoints; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.stroke();
  };

  useEffect(() => {
    drawPath(progress);
  }, [progress]); // Re-draw path when progress changes

  return null;
};

export default PathCanvas;
