import React, { useState } from 'react';

export default function StakingTerminal() {
  const [stakeAmount, setStakeAmount] = useState(0);
  
  // Mock zk-ID and Ledger Data
  const citizenID = "zk-ID: 0x8F9...3A1";
  const walletBalance = 24500; 
  const currentStaked = 10000;
  const apy = 14.2; // Yield derived from E-Watt/Registry taxes

  const handleStake = () => {
    alert(`TRANSMITTING COMMAND: Locking ${stakeAmount} $SOV into Orbital Treasury.`);
    // Production: Triggers L1 Smart Contract
  };

  return (
    <div className="bg-black text-gray-300 min-h-screen p-8 font-mono flex justify-center items-center">
      
      <div className="w-full max-w-2xl border border-gray-800 bg-gray-900 rounded-lg p-8 shadow-[0_0_30px_rgba(0,255,100,0.05)]">
        
        {/* HEADER: Digital Identity */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-6 mb-6">
          <div>
            <h1 className="text-2xl font-light text-white tracking-widest">SOVEREIGN TREASURY</h1>
            <p className="text-sm text-green-500 mt-1">Status: SECURE | {citizenID}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase">Network Yield (APY)</p>
            <p className="text-3xl font-bold text-green-400">{apy}%</p>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="flex justify-between mb-8 space-x-4">
          <div className="flex-1 bg-black border border-gray-800 p-4 rounded text-center">
            <p className="text-xs text-gray-500 uppercase mb-1">Liquid $SOV</p>
            <p className="text-xl text-white">{walletBalance.toLocaleString()}</p>
          </div>
          <div className="flex-1 bg-black border border-gray-800 p-4 rounded text-center shadow-[inset_0_0_10px_rgba(0,255,100,0.05)]">
            <p className="text-xs text-gray-500 uppercase mb-1">Actively Staked</p>
            <p className="text-xl text-green-400">{currentStaked.toLocaleString()}</p>
          </div>
        </div>

        {/* INTERACTION ZONE */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Lock Allocation</span>
            <span className="text-gray-400">{stakeAmount.toLocaleString()} $SOV</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max={walletBalance} 
            value={stakeAmount}
            onChange={(e) => setStakeAmount(Number(e.target.value))}
            className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <div className="flex justify-between text-xs mt-2 text-gray-600">
            <span>0%</span>
            <span>50%</span>
            <span>100% (Max)</span>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <button 
          onClick={handleStake}
          disabled={stakeAmount === 0}
          className={`w-full py-4 text-sm tracking-widest uppercase transition-all duration-300 rounded ${
            stakeAmount > 0 
            ? 'bg-green-900/40 text-green-400 border border-green-500 hover:bg-green-800/60 hover:shadow-[0_0_15px_rgba(0,255,100,0.2)]' 
            : 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-800'
          }`}
        >
          {stakeAmount > 0 ? 'Engage Protocol' : 'Select Amount'}
        </button>

        <p className="text-center text-xs text-gray-600 mt-6">
          Funds are locked in L1 smart contracts. Yield is distributed in real-time from orbital telemetry taxes.
        </p>

      </div>
    </div>
  );
}
