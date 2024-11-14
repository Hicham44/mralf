import React, { useEffect, useRef } from 'react';
import { CryptoBubbles } from './components/CryptoBubbles';
import { Rocket, Sparkles, Target } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a15] to-[#1a1a2e] text-white">
      {/* Hero Section with Bubbles */}
      <section className="relative h-screen">
        <CryptoBubbles />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center p-8 backdrop-blur-lg bg-black/30 rounded-xl border border-white/10">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#00f3ff] to-[#b537fa] text-transparent bg-clip-text">
              PRESTAXE
            </h1>
            <p className="text-xl mb-8 text-gray-300">The Future of Blockchain Technology</p>
            <button className="px-8 py-3 bg-gradient-to-r from-[#00f3ff] to-[#b537fa] rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10">
            <Rocket className="w-12 h-12 mb-4 text-[#00f3ff]" />
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">Experience blazing fast transactions with our next-gen blockchain.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10">
            <Sparkles className="w-12 h-12 mb-4 text-[#b537fa]" />
            <h3 className="text-xl font-semibold mb-2">Smart Contracts</h3>
            <p className="text-gray-400">Deploy and execute smart contracts with ease.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10">
            <Target className="w-12 h-12 mb-4 text-[#ff2e89]" />
            <h3 className="text-xl font-semibold mb-2">Cross-Chain</h3>
            <p className="text-gray-400">Seamlessly interact with multiple blockchain networks.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;