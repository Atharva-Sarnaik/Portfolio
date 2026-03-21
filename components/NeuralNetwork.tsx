"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  layer: number;
  id: string;
  hover: number; // 0 to 1 for smooth transition
  offset: number; // For rhythmic pulsing
}

interface Connection {
  source: Node;
  target: Node;
  progress: number;
  speed: number;
  offset: number;
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, v: 0 }); // v is mouse velocity factor

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const layerCounts = [3, 5, 4, 5, 2];
    let time = 0;

    const setup = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);

      const nodes: Node[] = [];
      const connections: Connection[] = [];
      
      layerCounts.forEach((count, layerIndex) => {
        // Original division-based distribution
        const x = (layerIndex + 1) * (W / (layerCounts.length + 1));
        
        for (let i = 0; i < count; i++) {
          const y = (i + 1) * (H / (count + 1));
          
          const node: Node = {
            x,
            y,
            layer: layerIndex,
            id: `${layerIndex}-${i}`,
            hover: 0,
            offset: Math.random() * Math.PI * 2,
          };
          nodes.push(node);
        }
      });

      // Connections between adjacent layers
      for (let i = 0; i < layerCounts.length - 1; i++) {
        const currentLayerNodes = nodes.filter(n => n.layer === i);
        const nextLayerNodes = nodes.filter(n => n.layer === i + 1);
        
        currentLayerNodes.forEach(source => {
          nextLayerNodes.forEach(target => {
            connections.push({
              source,
              target,
              progress: -Math.random() * 2,
              speed: 0.003 + Math.random() * 0.004,
              offset: Math.random(),
            });
          });
        });
      }

      nodesRef.current = nodes;
      connectionsRef.current = connections;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const dx = x - mouseRef.current.x;
      const dy = y - mouseRef.current.y;
      const velocity = Math.sqrt(dx*dx + dy*dy);
      
      mouseRef.current = { x, y, v: velocity * 0.002 };
    };

    const animate = () => {
      time += 0.016;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const nodes = nodesRef.current;
      const connections = connectionsRef.current;
      const { x: mx, y: my, v: mv } = mouseRef.current;

      // 1. Draw Connections Base Lines
      ctx.strokeStyle = "rgba(160, 155, 148, 0.15)";
      ctx.lineWidth = 0.8;
      connections.forEach(conn => {
        ctx.beginPath();
        ctx.moveTo(conn.source.x, conn.source.y);
        ctx.lineTo(conn.target.x, conn.target.y);
        ctx.stroke();
      });

      // 2. Draw Traveling Pulse Dots + Trails
      connections.forEach(conn => {
        // Update progress including mouse influence
        conn.progress += conn.speed + mv;
        if (conn.progress > 1.2) {
          conn.progress = -Math.random() * 0.5;
        }

        if (conn.progress > 0 && conn.progress < 1) {
          const px = conn.source.x + (conn.target.x - conn.source.x) * conn.progress;
          const py = conn.source.y + (conn.target.y - conn.source.y) * conn.progress;

          // Trail
          const trailStart = Math.max(0, conn.progress - 0.12);
          const tx1 = conn.source.x + (conn.target.x - conn.source.x) * trailStart;
          const ty1 = conn.source.y + (conn.target.y - conn.source.y) * trailStart;

          ctx.beginPath();
          ctx.strokeStyle = "rgba(37, 99, 235, 0.25)";
          ctx.lineWidth = 1.6;
          ctx.moveTo(tx1, ty1);
          ctx.lineTo(px, py);
          ctx.stroke();

          // Dot
          ctx.fillStyle = "rgba(37, 99, 235, 0.8)";
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. Draw Nodes (Rings + Circles + Centers)
      nodes.forEach(node => {
        const dx = mx - node.x;
        const dy = my - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isHovered = dist < 45;

        // Smoothly lerp hover state
        node.hover += (isHovered ? 1 : 0 - node.hover) * 0.1;
        const h = node.hover;

        // Outer Pulsing Ring
        const pulse = Math.sin(time * 3 + node.offset) * 2;
        const ringRadius = (12 + h * 6) + pulse;
        
        ctx.strokeStyle = h > 0.1 
          ? `rgba(37, 99, 235, ${0.15 + h * 0.2})` 
          : "rgba(160, 155, 148, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner Circle
        const innerRadius = 6 + h * 4;
        ctx.fillStyle = h > 0.1 ? "#2563EB" : "#a8a49e";
        ctx.beginPath();
        ctx.arc(node.x, node.y, innerRadius, 0, Math.PI * 2);
        ctx.fill();

        // Center Dot
        ctx.fillStyle = "#f5f3ee";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Decay velocity factor
      mouseRef.current.v *= 0.95;

      requestAnimationFrame(animate);
    };

    setup();
    window.addEventListener("resize", setup);
    window.addEventListener("mousemove", handleMouseMove);
    const anim = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setup);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(anim);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-crosshair">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
