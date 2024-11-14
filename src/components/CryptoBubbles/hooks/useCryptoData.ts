import { useState, useEffect } from 'react';
import { CryptoData } from '../types';

export const useCryptoData = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch crypto data');
        }

        const data = await response.json();
        setCryptoData(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return { cryptoData, loading, error };
};