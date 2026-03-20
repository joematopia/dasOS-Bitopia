import React, { useState, useEffect } from 'react';

const CitizenDashboard = () => {
  const [logs, setLogs] = useState([
    "INITIATING dasOS BOOT SEQUENCE...",
    "ZK-PROOF VERIFIED. CLEARANCE LEVEL: 1",
    "AXIOM-C HARDWARE ENCLAVE SECURED."
  ]);
  const [eWb, setEWb] = useState(12450.75);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [govStake, setGovStake] = useState(100); // Amount of $GOV to use for vote
  const citizenGovBalance = 4250; // Total $GOV owned

  // Quadratic Voting Math
  const votingPower = Math.sqrt(govStake).toFixed(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setEWb(prev => +(prev + 0.12).toFixed(2));
      const newLogs = [
        `[TELEMETRY] Axiom Node 001 Ping. Status: ACTIVE`,
        `[ATTEST] Physical MWh verified by Axiom-C Enclave...`,
        `[MESH] Merkle Root Updated: 0x${Math.random().toString(16).substr(2, 8).toUpperCase()}`,
        `[ORACLE] Terrestrial Solar Farm verified. Minting +0.12 $EWB`
      ];
      const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];
      setLogs(prev => [...prev.slice(-6), randomLog]); 
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleCastVote = () => {
    const logEntry = `[VOTE] BIP-42: Confirmed. Power: ${votingPower} V (Stake: ${govStake} $GOV)`;
    setLogs(prev => [...prev.slice(-6), logEntry]);
    setIsVoteModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-emerald-400 font-mono p-6 tracking-wide overflow-hidden relative">
      {/* SCANLINE EFFECT */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-50"></div>

      {/* HEADER */}
      <header className="border-b-2 border-emerald-500/30 pb-4 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-widest text-emerald-300 italic">dasOS // BITOPIA</h1>
          <p className="text-sm text-emerald-600 uppercase font-bold">Sovereign Space Habitat // Axiom Swarm V.1.0.0</p>
        </div>
        <div className="text-right">
          <p className="animate-pulse text-emerald-500 font-bold">🟢 NETWORK: ORBITAL ONLINE</p>
          <p className="text-xs text-emerald-700">LATENCY: 14ms (MESH RELAY)</p>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        
        {/* PANEL 1: CITIZEN REPUTATION */}
        <div className="bg-black/50 border border-emerald-500/20 p-5 rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.1)] flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold border-b border-emerald-500/20 mb-3 pb-1 uppercase">Reputation</h2>
            <div className="space-y-4">
               <div className="space-y-1 text-sm">
                  <p><span className="text-emerald-600 text-xs uppercase">ZK-ID:</span> 0x8F9A...3B2C</p>
                  <p><span className="text-emerald-600 text-xs uppercase">Rank:</span> Pioneer Architect</p>
               </div>
               <div>
                  <p className="text-xs text-emerald-600 uppercase">Soul-Bound Merit</p>
                  <p className="text-2xl text-emerald-300">{citizenGovBalance.toLocaleString()} <span className="text-sm text-emerald-600 font-bold">$GOV</span></p>
               </div>
            </div>
          </div>
          <button 
            onClick={() => setIsVoteModalOpen(true)}
            className="mt-4 w-full border border-emerald-500 py-2 hover:bg-emerald-500/20 transition-all uppercase text-xs font-bold tracking-tighter"
          >
            Open Legislative Ballot
          </button>
        </div>

        {/* PANEL 2: TREASURY ($SOV & $EWB) */}
        <div className="bg-black/50 border border-emerald-500/20 p-5 rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <h2 className="text-lg font-bold border-b border-emerald-500/20 mb-3 pb-1 uppercase">Sovereign Vault</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-emerald-600 uppercase font-bold">Liquid Currency</p>
              <p className="text-2xl text-emerald-300">10,400.00 <span className="text-sm text-emerald-600">$SOV</span></p>
            </div>
            <div>
              <p className="text-xs text-yellow-600 uppercase font-bold text-[10px]">Thermodynamic Energy Blocks</p>
              <p className="text-2xl text-yellow-400 font-bold">{eWb.toLocaleString()} <span className="text-sm text-yellow-600 font-normal">$EWB</span></p>
            </div>
          </div>
        </div>

        {/* PANEL 3: AXIOM-C TELEMETRY */}
        <div className="bg-black/50 border border-emerald-500/20 p-5 rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <h2 className="text-lg font-bold border-b border-emerald-500/20 mb-3 pb-1 uppercase">Axiom-C Telemetry</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center border-b border-emerald-900 pb-1">
              <span>TERRESTRIAL SOLAR 01</span>
              <span className="text-emerald-300 text-xs font-bold">[ACTIVE]</span>
            </div>
            <p><span className="text-emerald-600 uppercase text-[10px]">Hardware:</span> Axiom_C_774</p>
            <p><span className="text-emerald-600 uppercase text-[10px]">Capacity:</span> 15.0 MWh</p>
            <p className="text-[10px] bg-emerald-900/20 p-1 border border-emerald-500/10 text-center uppercase tracking-tighter text-emerald-300">
               Axiom-C Hardware Seal: VALID 🛡️
            </p>
          </div>
        </div>

        {/* PANEL 4: LIVE TERMINAL */}
        <div className="md:col-span-3 bg-black border border-emerald-500/30 p-4 rounded-sm relative">
          <h2 className="text-[10px] font-bold text-emerald-600 mb-2 uppercase tracking-[0.3em]">Live Swarm Mesh Uplink // Encrypted</h2>
          <div className="h-40 overflow-y-auto font-mono text-xs text-emerald-400 space-y-1 relative z-20 scrollbar-hide">
            {logs.map((log, i) => (
              <p key={i} className="opacity-80 leading-relaxed"><span className="text-emerald-800">[{new Date().toLocaleTimeString()}]</span> {'>'} {log}</p>
            ))}
            <p className="animate-pulse text-emerald-300">{'>'} _SYSTEM_IDLE_AWAITING_QUORUM</p>
          </div>
        </div>
      </div>

      {/* QUADRATIC VOTING MODAL */}
      {isVoteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="w-full max-w-md border-2 border-emerald-500 bg-gray-950 p-6 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            <h2 className="text-xl font-bold text-emerald-300 mb-1 italic">BIP-42: ORBITAL SOLAR EXPANSION</h2>
            <p className="text-[10px] text-emerald-700 mb-6 uppercase tracking-widest">Article V Protocol // Milestone Funding</p>
            
            <div className="space-y-6">
              <div className="bg-emerald-950/20 p-4 border border-emerald-500/20">
                <label className="block text-xs text-emerald-600 mb-2 uppercase font-bold">Stake $GOV Reputation:</label>
                <input 
                  type="range" 
                  min="1" 
                  max={citizenGovBalance} 
                  value={govStake} 
                  onChange={(e) => setGovStake(parseInt(e.target.value))}
                  className="w-full h-1 bg-emerald-900 appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between mt-2 text-[10px]">
                  <span>1 $GOV</span>
                  <span className="text-emerald-300 font-bold">{govStake.toLocaleString()} $GOV SELECTED</span>
                </div>
              </div>

              <div className="text-center py-4 border-y border-emerald-500/10">
                <p className="text-xs text-emerald-600 uppercase">Calculated Voting Power</p>
                <p className="text-4xl font-bold text-emerald-300 tracking-tighter">
                  {votingPower} <span className="text-sm italic">V</span>
                </p>
                <p className="text-[9px] text-emerald-800 mt-1 italic italic">Theorem: V = √S (Quadratic Consensus)</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsVoteModalOpen(false)}
                  className="border border-red-900/50 text-red-500 py-2 text-xs uppercase hover:bg-red-500/10 transition-all"
                >
                  Abstain
                </button>
                <button 
                  onClick={handleCastVote}
                  className="bg-emerald-600 text-black py-2 text-xs font-bold uppercase hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                >
                  Cast Sovereign Vote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenDashboard;
