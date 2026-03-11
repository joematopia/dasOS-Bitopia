import React, { useState, useEffect } from 'react';

// Reusable Glassmorphism Wrapper for ultra-clean UI
const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transition-all hover:border-[#00F0FF]/30 ${className}`}>
    {children}
  </div>
);

const CitizenDashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [citizenId, setCitizenId] = useState('');
  
  // Simulated Live Telemetry Data
  const [pings, setPings] = useState({ meo: 12, uae: 45, slv: 28 });

  // Simulate network breathing/fluctuating pings
  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => {
      setPings({
        meo: Math.floor(Math.random() * (15 - 8 + 1) + 8),
        uae: Math.floor(Math.random() * (50 - 40 + 1) + 40),
        slv: Math.floor(Math.random() * (35 - 25 + 1) + 25),
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isConnected]);

  const connectWallet = () => {
    setIsConnected(true);
    setCitizenId('Sovereign ID: zk-SNARK Verified');
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-gray-200 font-sans relative overflow-hidden flex flex-col justify-between">
      
      {/* Ambient Starlight Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00F0FF] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600 opacity-[0.02] blur-[100px] rounded-full pointer-events-none"></div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full p-8 z-10 flex-grow">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            {/* Minimalist Logo Representation */}
            <div className="w-10 h-10 rounded-full border border-[#00F0FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <div className="w-4 h-4 bg-[#00F0FF] rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-widest text-white">BITOPIA</h1>
              <p className="text-xs text-[#00F0FF]/70 tracking-widest uppercase">The Digital Soul of a New Era</p>
            </div>
          </div>
          
          {!isConnected ? (
            <button 
              onClick={connectWallet}
              className="px-6 py-2 rounded-full border border-[#00F0FF]/50 text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 font-medium tracking-wide">
              Initialize Connection
            </button>
          ) : (
            <div className="text-right flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
              <p className="font-mono text-xs text-gray-300">{citizenId}</p>
            </div>
          )}
        </header>

        {/* Dashboard Content */}
        {isConnected && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
            
            {/* SOV Treasury Card */}
            <GlassCard>
              <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Liquid Treasury</h2>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-light text-white">$1,450.</span>
                <span className="text-xl text-gray-500 font-mono">50</span>
                <span className="text-xs text-[#00F0FF] ml-2">SOV</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm transition-colors border border-white/5">Send</button>
                <button className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm transition-colors border border-white/5">Receive</button>
              </div>
            </GlassCard>

            {/* GOV Influence Card */}
            <GlassCard>
              <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Network Influence</h2>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-light text-white">42</span>
                <span className="text-xs text-purple-400 ml-2">GOV</span>
              </div>
              <div className="w-full bg-black/40 h-2 rounded-full mb-2 overflow-hidden border border-white/5">
                <div className="bg-purple-500 w-[42%] h-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
              </div>
              <p className="text-xs text-gray-500 font-mono">Voting Weight: √42 = 6.48</p>
            </GlassCard>

            {/* E-Watt Physics Card */}
            <GlassCard>
              <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Thermodynamic Utility</h2>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-light text-white">310.2</span>
                <span className="text-xs text-yellow-400 ml-2">E-WATT</span>
              </div>
              <button className="w-full bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/30 py-2 rounded-lg text-sm transition-colors shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                Allocate Orbital Compute
              </button>
            </GlassCard>

          </div>
        )}
      </div>

      {/* The Telemetry Bar (Bottom HUD) */}
      <div className="w-full border-t border-white/10 bg-black/60 backdrop-blur-2xl py-3 px-8 flex justify-between items-center z-20">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span className="text-xs font-mono text-gray-400">MEO Swarm: <span className="text-white">{pings.meo}ms</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            <span className="text-xs font-mono text-gray-400">UAE Legal Node: <span className="text-white">{pings.uae}ms</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            <span className="text-xs font-mono text-gray-400">Volcanic Energy Node: <span className="text-white">{pings.slv}ms</span></span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-xs font-mono text-gray-500 hover:text-[#00F0FF] transition-colors uppercase tracking-widest">
            Protocol Logs
          </button>
          <span className="text-gray-700">|</span>
          <button className="text-xs font-mono text-gray-500 hover:text-[#00F0FF] transition-colors uppercase tracking-widest">
            Global Settings
          </button>
        </div>
      </div>

    </div>
  );
};

export default CitizenDashboard;
