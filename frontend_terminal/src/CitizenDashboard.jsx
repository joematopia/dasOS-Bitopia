import React, { useState, useEffect } from 'react';

// Reusable Glass Card with hover-glow for interactive feel
const GlassCard = ({ children, className = "", noHover = false }) => (
  <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl ${noHover ? '' : 'transition-all duration-300 hover:border-[#00F0FF]/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]'} ${className}`}>
    {children}
  </div>
);

const CitizenDashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [networkPulse, setNetworkPulse] = useState({ blocks: 14209, globalWatts: 8400.5 });
  const [pings, setPings] = useState({ meo: 12, uae: 45, slv: 28 });

  // Simulate the "Beating Artery" of the network
  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => {
      setPings({
        meo: Math.floor(Math.random() * (15 - 8 + 1) + 8),
        uae: Math.floor(Math.random() * (50 - 40 + 1) + 40),
        slv: Math.floor(Math.random() * (35 - 25 + 1) + 25),
      });
      // Simulate blocks being forged by the Swarm
      setNetworkPulse(prev => ({
        blocks: prev.blocks + (Math.random() > 0.7 ? 1 : 0),
        globalWatts: prev.globalWatts + (Math.random() * 0.5)
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-gray-200 font-sans relative overflow-hidden flex flex-col justify-between">
      
      {/* Deep Space Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00F0FF] opacity-[0.02] blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto w-full p-6 lg:p-10 z-10 flex-grow flex flex-col gap-8">
        
        {/* TOP NAV: Identity & Connection */}
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-full border-2 border-[#00F0FF]/30 flex items-center justify-center group-hover:border-[#00F0FF] transition-colors shadow-[0_0_20px_rgba(0,240,255,0.15)] relative">
              <div className="w-5 h-5 bg-[#00F0FF] rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-widest text-white">BITOPIA</h1>
              <p className="text-xs text-[#00F0FF] tracking-widest uppercase opacity-80">MEO Network State</p>
            </div>
          </div>
          
          {!isConnected ? (
            <button onClick={() => setIsConnected(true)} className="px-8 py-3 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/50 text-[#00F0FF] hover:bg-[#00F0FF]/20 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300 font-bold tracking-wide">
              Connect Identity
            </button>
          ) : (
            <div className="flex items-center gap-4 bg-white/5 pr-6 pl-2 py-2 rounded-full border border-white/10">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Bitopia" alt="Avatar" className="w-10 h-10 rounded-full bg-black/50" />
              <div>
                <p className="font-mono text-sm text-white font-semibold">zk-ID: 0x8F...3A1</p>
                <p className="text-[10px] text-purple-400 uppercase tracking-widest">Civic Rank: Architect</p>
              </div>
            </div>
          )}
        </header>

        {isConnected && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
            
            {/* LEFT COLUMN: The Tri-Token Economy (Personal) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Personal Treasury</h3>
              
              <GlassCard className="flex justify-between items-center group">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Liquid Capital ($SOV)</p>
                  <p className="text-2xl font-light text-white">$1,450.<span className="text-sm text-gray-500">50</span></p>
                </div>
                <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00F0FF]/20 group-hover:text-[#00F0FF] transition-all">+</button>
              </GlassCard>

              <GlassCard className="flex justify-between items-center group">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Civic Influence ($GOV)</p>
                  <p className="text-2xl font-light text-white">42 <span className="text-xs text-purple-400 tracking-widest">WEIGHT: 6.48</span></p>
                </div>
                <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-all">⚖️</button>
              </GlassCard>

              <GlassCard className="flex justify-between items-center group">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Orbital Physics (E-Watt)</p>
                  <p className="text-2xl font-light text-white">310.2 <span className="text-xs text-yellow-400 tracking-widest">READY</span></p>
                </div>
                <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-yellow-500/20 group-hover:text-yellow-400 transition-all">⚡</button>
              </GlassCard>
            </div>

            {/* RIGHT COLUMN: The Beating Artery & Directives */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* The Network Pulse */}
              <GlassCard noHover className="bg-gradient-to-br from-white/5 to-[#00F0FF]/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F0FF]/10 blur-[80px] rounded-full"></div>
                <h3 className="text-xs uppercase tracking-widest text-[#00F0FF] font-semibold mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping"></span> Global Network Pulse
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Blocks Forged</p>
                    <p className="text-2xl font-mono text-white">{networkPulse.blocks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Global Swarm Output</p>
                    <p className="text-2xl font-mono text-yellow-400">{(networkPulse.globalWatts / 1000).toFixed(2)} kW</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Active Citizens</p>
                    <p className="text-2xl font-mono text-white">2,841</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Treasury Backing</p>
                    <p className="text-2xl font-mono text-green-400">184.2 BTC</p>
                  </div>
                </div>
              </GlassCard>

              {/* Actionable Directives (Gamification/Utility) */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">Active Directives</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs tracking-wide">VOTE REQUIRED</span>
                      <h4 className="text-white font-medium mt-2">Ratify Orbital Slot Claim #84</h4>
                      <p className="text-xs text-gray-400 mt-1">Requires 75% Quadratic Supermajority.</p>
                    </div>
                    <button className="mt-4 text-xs font-bold text-[#00F0FF] text-left hover:text-white transition-colors">CAST VOTE →</button>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs tracking-wide">COMPUTE DEMAND</span>
                      <h4 className="text-white font-medium mt-2">Render AI Payload for Terrestrial Node</h4>
                      <p className="text-xs text-gray-400 mt-1">Bounty: +2.5 $SOV per E-Watt allocated.</p>
                    </div>
                    <button className="mt-4 text-xs font-bold text-yellow-400 text-left hover:text-white transition-colors">ALLOCATE E-WATTS →</button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* The Telemetry Bar (Simplified & Cleaner) */}
      <div className="w-full border-t border-white/5 bg-black/80 backdrop-blur-md py-2 px-8 flex justify-between items-center text-[10px] font-mono tracking-widest text-gray-500 uppercase z-20">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full"></span> MEO Swarm [{pings.meo}ms]</span>
          <span className="flex items-center gap-2 hidden sm:flex"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> El Salvador [{pings.slv}ms]</span>
          <span className="flex items-center gap-2 hidden md:flex"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> UAE Node [{pings.uae}ms]</span>
        </div>
        <div>L1: RUST_PQC_ENGINE_ACTIVE</div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
