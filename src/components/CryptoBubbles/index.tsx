import React from 'react';
import { PhysicsEngine } from './PhysicsEngine';
import { CryptoBubble } from './CryptoBubble';
import { CryptoPopup } from './CryptoPopup';
import { useCryptoData } from './hooks/useCryptoData';

export const CryptoBubbles: React.FC = () => {
  const { cryptoData, loading, error } = useCryptoData();

  if (loading) return <div className="absolute inset-0 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="absolute inset-0 flex items-center justify-center">Error: {error}</div>;

  return (
    <PhysicsEngine>
      {cryptoData.map((crypto) => (
        <React.Fragment key={crypto.id}>
          <CryptoBubble crypto={crypto} />
          <CryptoPopup crypto={crypto} />
        </React.Fragment>
      ))}
    </PhysicsEngine>
  );
};