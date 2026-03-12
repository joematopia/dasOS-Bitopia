import React, { useState, useEffect } from 'react';
import StakingTerminal from './StakingTerminal'; // 🔌 THE NEW WIRE

export default function CitizenDashboard() {
  const [telemetry, setTelemetry] = useState({ activeNodes: 142, averageThermal: 68, solarEfficiency: 92 });
  const [market, setMarket] = useState({ eWattPrice: 1.25, vaultFee: 5000 });
  const [registry, setRegistry] = useState({ totalDaos: 47, rwaMinted: 1200000 });

  return (
    <div className="bg-black text-green-400 min-h-screen p-8 font-mono">
      <header className="mb-8 border-b border-green-800 pb-4">
        <h1 className="text-3xl font-bold tracking-widest">BITOPIA // CITIZEN TERMINAL</h1>
        <p className="text-sm text-gray-500 uppercase mt-2">dasOS Core Layer 1 - Live Swarm Telemetry</p>
      </header>

      {/* THE THREE TELEMETRY PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* PANEL 1: Swarm Telemetry */}
        <div className="border border-green-700 p-4 rounded bg-gray-900 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
          <h2 className="text-xl mb-4 border-b border-green-900 pb-2">🛰️ SWARM STATUS</h2>
          <ul className="space-y-2">
            <li className="flex justify-between"><span>Active Nodes:</span> <span className="text-white">{telemetry.activeNodes}</span></li>
            <li className="flex justify-between"><span>Solar Efficiency:</span> <span className="text-white">{telemetry.solarEfficiency}%</span></li>
            <li className="flex justify-between">
              <span>Avg Thermal Load:</span> 
              <span className={telemetry.averageThermal > 75 ? "text-red-500 animate-pulse" : "text-white"}>
                {telemetry.averageThermal}%
              </span>
            </li>
          </ul>
        </div>

        {/* PANEL 2: Compute Market */}
        <div className="border border-green-700 p-4 rounded bg-gray-900 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
          <h2 className="text-xl mb-4 border-b border-green-900 pb-2">⚡ ECONOMIC ENGINE</h2>
          <ul className="space-y-2">
            <li className="flex justify-between"><span>E-Watt Spot Price:</span> <span className="text-yellow-400">{market.eWattPrice} $SOV</span></li>
            <li className="flex justify-between"><span>Sovereign Vault:</span> <span className="text-yellow-400">{market.vaultFee} $SOV/yr</span></li>
          </ul>
        </div>

        {/* PANEL 3: Galactic Registry */}
        <div className="border border-green-700 p-4 rounded bg-gray-900 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
          <h2 className="text-xl mb-4 border-b border-green-900 pb-2">🏛️ JURISDICTION</h2>
          <ul className="space-y-2">
            <li className="flex justify-between"><span>Registered DAOs:</span> <span className="text-white">{registry.totalDaos}</span></li>
            <li className="flex justify-between"><span>RWA Tokens Minted:</span> <span className="text-white">{registry.rwaMinted.toLocaleString()}</span></li>
          </ul>
        </div>
      </div>

      {/* 🔌 THE STAKING TERMINAL MOUNTED BELOW */}
      <div className="border-t border-green-900 pt-8">
        <h2 className="text-center text-2xl font-bold tracking-widest text-gray-500 mb-4">// UPLINK: SOVEREIGN TREASURY //</h2>
        <StakingTerminal />
      </div>

    </div>
  );
}
