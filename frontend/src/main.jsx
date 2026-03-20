import React from 'react'
import ReactDOM from 'react-dom/client'
import CitizenDashboard from './components/CitizenDashboard'
// import StakingTerminal from './components/StakingTerminal' // Ready for Phase 3
import './index.css' // Ensure your Tailwind/Global styles are loaded

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* dasOS Entry Point: Defaulting to the Sovereign Dashboard */}
    <CitizenDashboard />
    
    {/* To switch to the Vault, simply swap <CitizenDashboard /> with <StakingTerminal /> */}
  </React.StrictMode>,
)
