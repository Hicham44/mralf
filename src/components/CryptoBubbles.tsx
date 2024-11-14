import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export const CryptoBubbles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const bubblesRef = useRef<any[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    // Create renderer
    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
      }
    });

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    World.add(engine.world, mouseConstraint);

    // Create boundaries
    const wallThickness = 60;
    const walls = [
      Bodies.rectangle(window.innerWidth/2, -wallThickness/2, window.innerWidth, wallThickness, { 
        isStatic: true,
        render: { fillStyle: 'transparent' }
      }),
      Bodies.rectangle(window.innerWidth/2, window.innerHeight + wallThickness/2, window.innerWidth, wallThickness, { 
        isStatic: true,
        render: { fillStyle: 'transparent' }
      }),
      Bodies.rectangle(-wallThickness/2, window.innerHeight/2, wallThickness, window.innerHeight, { 
        isStatic: true,
        render: { fillStyle: 'transparent' }
      }),
      Bodies.rectangle(window.innerWidth + wallThickness/2, window.innerHeight/2, wallThickness, window.innerHeight, { 
        isStatic: true,
        render: { fillStyle: 'transparent' }
      })
    ];
    
    World.add(engine.world, walls);

    // Start the engine and renderer
    Engine.run(engine);
    Render.run(render);

    // Cleanup
    return () => {
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
};