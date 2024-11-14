import React, { useState, useEffect } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';
import { CryptoData } from './types';

interface CryptoPopupProps {
  crypto: CryptoData;
}

export const CryptoPopup: React.FC<CryptoPopupProps> = ({ crypto }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chart, setChart] = useState<IChartApi | null>(null);

  useEffect(() => {
    if (!isOpen || !crypto.id) return;

    const chartElement = document.getElementById(`tradingChart-${crypto.symbol.toLowerCase()}`);
    if (!chartElement) return;

    const newChart = createChart(chartElement, {
      width: chartElement.clientWidth,
      height: 300,
      layout: {
        background: { type: 'solid', color: 'rgba(26,8,78,0.95)' },
        textColor: '#ffffff',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    });

    setChart(newChart);

    return () => {
      newChart.remove();
      setChart(null);
    };
  }, [isOpen, crypto.id]);

  return (
    <div className={`crypto-popup fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'active' : 'hidden'}`}>
      <div className="bg-[#1a1a2e] p-6 rounded-xl border border-white/10 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
          <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">×</button>
        </div>
        <div id={`tradingChart-${crypto.symbol.toLowerCase()}`} className="w-full h-[300px] mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-sm text-white/60">Market Cap</div>
            <div className="text-lg">${crypto.market_cap.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-sm text-white/60">24h Volume</div>
            <div className="text-lg">${crypto.total_volume.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};