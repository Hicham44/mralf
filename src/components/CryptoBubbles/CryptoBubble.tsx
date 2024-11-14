import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { CryptoData } from './types';

interface CryptoBubbleProps {
  crypto: CryptoData;
}

export const CryptoBubble: React.FC<CryptoBubbleProps> = ({ crypto }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<Matter.Body>();

  useEffect(() => {
    if (!bubbleRef.current) return;

    const size = calculateSize(crypto.market_cap);
    const x = Math.random() * (window.innerWidth - size);
    const y = Math.random() * (window.innerHeight - size);

    const body = Matter.Bodies.circle(x, y, size/2, {
      frictionAir: 0.06,
      restitution: 0.7,
      density: 0.001,
      mass: 1
    });

    bodyRef.current = body;
    Matter.World.add(Matter.Engine.allEngines[0].world, body);

    return () => {
      if (bodyRef.current) {
        Matter.World.remove(Matter.Engine.allEngines[0].world, bodyRef.current);
      }
    };
  }, [crypto.market_cap]);

  useEffect(() => {
    const updatePosition = () => {
      if (!bubbleRef.current || !bodyRef.current) return;
      
      const { position, size } = bodyRef.current;
      bubbleRef.current.style.left = `${position.x - size.width/2}px`;
      bubbleRef.current.style.top = `${position.y - size.height/2}px`;
      
      requestAnimationFrame(updatePosition);
    };

    updatePosition();
  }, []);

  const calculateSize = (marketCap: number): number => {
    const maxMarketCap = 1000000000000; // 1 trillion
    const minSize = 100;
    const maxSize = 250;
    return Math.max(minSize, Math.min(maxSize, (marketCap / maxMarketCap) * (maxSize - minSize) + minSize));
  };

  return (
    <div 
      ref={bubbleRef}
      className="crypto-bubble absolute flex flex-col items-center justify-center text-center"
      style={{ width: calculateSize(crypto.market_cap), height: calculateSize(crypto.market_cap) }}
    >
      <div className="btc-symbol">{crypto.symbol.toUpperCase()}</div>
      <div className="price">${crypto.current_price.toLocaleString()}</div>
      <div className={`price-change ${crypto.price_change_percentage_1h_in_currency >= 0 ? 'positive' : 'negative'}`}>
        {crypto.price_change_percentage_1h_in_currency?.toFixed(2) || '0.00'}%
      </div>
    </div>
  );
};