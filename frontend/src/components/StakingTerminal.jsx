import React, { useState } from 'react';

export default function StakingTerminal() {
  const [stakeAmount, setStakeAmount] = useState(0);
  
  // Unified Bitopia Context
  const citizenID = "zk-ID: 0x8F9A...3B2C";
  const walletBalance = 24500.00; 
  const currentStaked = 10000.00;
  const apy = 14.2; // Derived from $EWB Telemetry & Galactic Registry Fees

  const handleStake = () => {
    // Immersion: Mimicking dasOS Command Transmission
    const timestamp = new Date().getTime();
    console.log(`[dasOS] COMMITTING STAKE: ${stakeAmount} $SOV | TX_HASH: 0x${timestamp}AZ...`);
    alert(`COMMAND BROADCAST: Locking ${stakeAmount.toLocaleString()} $SOV into the Axiom Sovereign Trust.`);
  };

  return (
    <div className="bg-gray-950 text-emerald-400 min-h-screen p-8 font-mono flex justify-center items-center relative overflow-hidden">
      
      {/* SCANLINE OVERLAY */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-50"></div>

      <div className="w-full max-w-2xl border border-emerald-500/30 bg-black rounded-sm p-8 shadow-[0_0_40px_rgba(16,185,129,0.1)] relative z-10">
        
        {/* HEADER: Sovereign Identity */}
        <div className="flex justify-between items-center border-b border-emerald-900 pb-6 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-emerald-300 tracking-[0.2em] italic uppercase">Axiom Staking Terminal</h1>
            <p className="text-[10px] text-emerald-600 mt-1 uppercase tracking-widest italic font-bold">Protocol: dasOS v1.0 | {citizenID}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-emerald-700 uppercase font-bold">Thermodynamic Yield</p>
            <p className="text-3xl font-bold text-yellow-400">{apy}% <span className="text-xs text-yellow-700 font-normal">APY</span></p>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-black border border-emerald-900/50 p-4 rounded-sm text-center">
            <p className="text-[10px] text-emerald-700 uppercase mb-1 font-bold">Available $SOV</p>
            <p className="text-xl text-emerald-300">{walletBalance.toLocaleString()}</p>
          </div>
          <div className="bg-black border border-emerald-900/50 p-4 rounded-sm text-center shadow-[inset_0_0_15px_rgba(16,185,129,0.05)]">
            <p className="text-[10px] text-emerald-700 uppercase mb-1 font-bold">Actively Committed</p>
            <p className="text-xl text-emerald-300 font-bold">{currentStaked.toLocaleString()}</p>
          </div>
        </div>

        {/* INTERACTION ZONE */}
        <div className="mb-8 p-4 border border-emerald-500/10 bg-emerald-950/5">
          <div className="flex justify-between text-[10px] mb-4 uppercase tracking-wider">
            <span className="text-emerald-700 font-bold">Allocation Amount</span>
            <span className="text-emerald-300">{stakeAmount.toLocaleString()} $SOV</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max={walletBalance} 
            value={stakeAmount}
            onChange={(e) => setStakeAmount(Number(e.target.value))}
            className="w-full h-1 bg-emerald-900 appearance-none cursor-pointer accent-emerald-400"
          />
          <div className="flex justify-between text-[9px] mt-4 text-emerald-800 uppercase font-bold tracking-tighter">
            <span>Minimum</span>
            <span>50% Commitment</span>
            <span>Full Sovereignty (Max)</span>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <button 
          onClick={handleStake}
          disabled={stakeAmount === 0}
          className={`w-full py-4 text-xs tracking-[0.3em] font-bold uppercase transition-all duration-300 rounded-sm border ${
            stakeAmount > 0 
            ? 'bg-emerald-600/10 text-emerald-400 border-emerald-400 hover:bg-emerald-400 hover:text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]' 
            : 'bg-black text-emerald-900 cursor-not-allowed border-emerald-950'
          }`}
        >
          {stakeAmount > 0 ? 'Anchor Assets to Swarm' : 'Select Allocation'}
        </button>

        {/* FOOTER LOGIC */}
        <div className="mt-8 pt-4 border-t border-emerald-900/30">
            <div className="flex items-start space-x-3">
               <div className="text-emerald-500 mt-1">🛡️</div>
               <p className="text-[9px] text-emerald-800 leading-relaxed uppercase tracking-tight">
                Funds are locked via <span className="text-emerald-600 underline">dasOS Milestone-Based Contracts</span>. Yield is derived from verified Axiom-C hardware telemetry and $EWB transaction fees. Early withdrawal subject to Article V governance penalty.
               </p>
            </div>
        </div>

      </div>
    </div>
  );
}
