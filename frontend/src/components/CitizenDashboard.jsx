import React, { useState } from 'react';
import StakingTerminal from './StakingTerminal';

export default function CitizenDashboard() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [passkey, setPasskey] = useState("");

  // 🛡️ THE AIRLOCK: Prevents rendering classified UI until authorized
  if (!accessGranted) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center font-mono p-4">
        <div className="w-full max-w-md border border-green-900 p-8 rounded bg-gray-900 shadow-[0_0_30px_rgba(0,255,0,0.1)]">
          <h1 className="text-green-500 text-xl mb-6 tracking-widest text-center uppercase">Bitopia // Secure Uplink</h1>
          <p className="text-gray-500 text-xs mb-4 text-center">UNAUTHORIZED ACCESS IS PROHIBITED</p>
          <input 
            type="password" 
            placeholder="ENTER PASSKEY" 
            value={passkey}
            className="w-full bg-black border border-green-800 text-green-500 p-3 mb-4 text-center outline-none focus:border-green-400"
            onChange={(e) => setPasskey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (passkey === "BITOPIA_2026" ? setAccessGranted(true) : alert("INVALID CREDENTIALS"))}
          />
          <button 
            onClick={() => passkey === "BITOPIA_2026" ? setAccessGranted(true) : alert("INVALID CREDENTIALS")}
            className="w-full bg-green-900/20 border border-green-500 text-green-500 py-3 uppercase tracking-tighter hover:bg-green-500 hover:text-black transition-all"
          >
            Authenticate
          </button>
        </div>
      </div>
    );
  }

  // 🛰️ THE ACTUAL DASHBOARD (Only visible after BITOPIA_2026 is entered)
  return (
    <div className="bg-black text-green-400 min-h-screen p-8 font-mono">
      <header className="mb-8 border-b border-green-800 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-widest uppercase">Bitopia // Citizen Terminal</h1>
          <p className="text-sm text-gray-500 uppercase mt-2">dasOS Core Layer 1 - Live Swarm Telemetry</p>
        </div>
        <button onClick={() => setAccessGranted(false)} className="text-xs border border-red-900 text-red-900 px-2 py-1 hover:bg-red-900 hover:text-white">DISCONNECT</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* PANEL 1: Swarm Telemetry */}
        <div className="border border-green-700 p-4 rounded bg-gray-900 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
          <h2 className="text-xl mb-4 border-b border-green-900 pb-2 uppercase">🛰️ Swarm Status</h2>
          <ul className="space-y-2">
            <li className="flex justify-between"><span>Active Nodes:</span> <span className="text-white">142</span></li>
            <li className="flex justify-between"><span>Solar Efficiency:</span> <span className="text-white">92%</span></li>
            <li className="flex justify-between"><span>Avg Thermal Load:</span> <span className="text-white">68%</span></li>
          </ul>
        </div>

        {/* PANEL 2: Economic Engine */}
        <div className="border border-green-700 p-4 rounded bg-gray-900 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
          <h2 className="text-xl mb-4 border-b border-green-900 pb-2 uppercase">⚡ Economic Engine</h2>
          <ul className="space-y-2">
            <li className="flex justify-between"><span>E-Watt Spot:</span> <span className="text-yellow-400">1.25 $SOV</span></li>
            <li className="flex justify-between"><span>Sovereign Vault:</span> <span className="text-yellow-400">5000 $SOV</span></li>
          </ul>
        </div>

        {/* PANEL 3: Jurisdiction */}
        <div className="border border-green-700 p-4 rounded bg-gray-900 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
          <h2 className="text-xl mb-4 border-b border-green-900 pb-2 uppercase">🏛️ Jurisdiction</h2>
          <ul className="space-y-2">
            <li className="flex justify-between"><span>Registered DAOs:</span> <span className="text-white">47</span></li>
            <li className="flex justify-between"><span>RWA Minted:</span> <span className="text-white">1,200,000</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-green-900 pt-8">
        <h2 className="text-center text-2xl font-bold tracking-widest text-gray-500 mb-4 uppercase text-sm">// Uplink: Sovereign Treasury //</h2>
        <StakingTerminal />
      </div>
    </div>
  );
}
