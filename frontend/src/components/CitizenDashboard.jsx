import React, { useState, useEffect } from 'react';

const CitizenDashboard = () => {
  const [logs, setLogs] = useState([
    "INITIATING dasOS BOOT SEQUENCE...",
    "ZK-PROOF VERIFIED. CLEARANCE LEVEL: 1",
    "UPLINK TO AXIOM SWARM ESTABLISHED."
  ]);
  const [eWatts, setEWatts] = useState(12450.75);

  // Simulating the live Swarm Mesh and E-Watt generation
  useEffect(() => {
    const interval = setInterval(() => {
      setEWatts(prev => +(prev + 0.12).toFixed(2));
      
      const newLogs = [
        `[TELEMETRY] Axiom Node 001 Ping. Status: ACTIVE`,
        `[FORGE] Mining Block with Hardware ZK-Seal...`,
        `[MESH] Merkle Root Updated: 0x${Math.random().toString(16).substr(2, 8).toUpperCase()}`,
        `[ORACLE] Terrestrial Solar Farm verified. Minting +0.12 $E-WATT`
      ];
      const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];
      
      setLogs(prev => [...prev.slice(-6), randomLog]); // Keep last 7 logs
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-emerald-400 font-mono p-6 tracking-wide">
      {/* HEADER */}
      <header className="border-b-2 border-emerald-500/30 pb-4 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-widest text-emerald-300">dasOS // BITOPTIA</h1>
          <p className="text-sm text-emerald-600">SOVEREIGN SPACE HABITAT // V.1.0.0</p>
        </div>
        <div className="text-right">
          <p className="animate-pulse text-emerald-500">🟢 NETWORK: ONLINE</p>
          <p className="text-xs text-emerald-700">LATENCY: 14ms (ORBITAL MESH)</p>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* PANEL 1: CITIZEN IDENTITY */}
        <div className="bg-black/50 border border-emerald-500/20 p-5 rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <h2 className="text-lg font-bold border-b border-emerald-500/20 mb-3 pb-1">CITIZEN PROFILE</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-emerald-600">ZK-HASH:</span> 0x8F9A...3B2C</p>
            <p><span className="text-emerald-600">SECTOR:</span> AXIOM_RING_A</p>
            <p><span className="text-emerald-600">CLEARANCE:</span> LEVEL 1</p>
            <p><span className="text-emerald-600">STATUS:</span> <span className="text-emerald-300">VERIFIED</span></p>
          </div>
        </div>

        {/* PANEL 2: TREASURY & ASSETS */}
        <div className="bg-black/50 border border-emerald-500/20 p-5 rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <h2 className="text-lg font-bold border-b border-emerald-500/20 mb-3 pb-1">SOVEREIGN VAULT</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-emerald-600">GOVERNANCE STAKE</p>
              <p className="text-2xl text-emerald-300">100,000.00 <span className="text-sm text-emerald-600">$SOV</span></p>
            </div>
            <div>
              <p className="text-xs text-emerald-600">PHYSICAL ENERGY BACKING</p>
              <p className="text-2xl text-yellow-400">{eWatts} <span className="text-sm text-yellow-600">$E-WATT</span></p>
            </div>
          </div>
        </div>

        {/* PANEL 3: PHYSICAL INFRASTRUCTURE (DePIN) */}
        <div className="bg-black/50 border border-emerald-500/20 p-5 rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <h2 className="text-lg font-bold border-b border-emerald-500/20 mb-3 pb-1">DER TELEMETRY</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center border-b border-emerald-900 pb-1">
              <span>TERRESTRIAL SOLAR 01</span>
              <span className="text-emerald-300">ACTIVE</span>
            </div>
            <p><span className="text-emerald-600">HW-ID:</span> AXIOM_HW_774</p>
            <p><span className="text-emerald-600">CAPACITY:</span> 15.0 kW/h</p>
            <p><span className="text-emerald-600">ENCLAVE SEAL:</span> VALID 🛡️</p>
          </div>
        </div>

        {/* PANEL 4: THE NERVOUS SYSTEM (TERMINAL) */}
        <div className="md:col-span-3 bg-black border border-emerald-500/30 p-4 rounded-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
          <h2 className="text-sm font-bold text-emerald-600 mb-2">LIVE SWARM MESH UPLINK</h2>
          <div className="h-40 overflow-y-auto font-mono text-xs text-emerald-400 space-y-1 relative z-20">
            {logs.map((log, i) => (
              <p key={i}>{'>'} {log}</p>
            ))}
            <p className="animate-pulse">{'>'} _</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CitizenDashboard;
