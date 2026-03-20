import React, { useState, useEffect } from 'react';

export default function App() {
    const [activeApp, setActiveApp] = useState(null); 
    const [sidebarTab, setSidebarTab] = useState('overview');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
    const [hoveredBlockId, setHoveredBlockId] = useState(null);
    const [selectedBlock, setSelectedBlock] = useState(null); 

    // MACRO-ECONOMY
    const [eWb, setEWb] = useState(42851.50); 
    const [sov, setSov] = useState(18450.00); 
    const [gov, setGov] = useState(850); 
    const [btc, setBtc] = useState(24.505); 
    const [epoch, setEpoch] = useState(2020);
    
    // DATA
    const [blocks, setBlocks] = useState(Array.from({length: 12}, (_, i) => ({ 
        id: i, angle: i * 30, radius: 350, type: i % 4 === 0 ? 'rwa' : 'core' 
    })));
    const [telemetry, setTelemetry] = useState(["[SYS] Bitopia Core Synchronized."]);
    const [actionBeam, setActionBeam] = useState(false);

    // ENGINE LOOP & MOUSE TRACKING
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);

        const interval = setInterval(() => {
            setEWb(p => +(p + 4.5).toFixed(2));
            setEpoch(p => p + 1);
            if(Math.random() > 0.7) setTelemetry(prev => [...prev.slice(-12), `[EPOCH ${epoch}] Hashrate nominal. Orbit stable.`]);
        }, 2000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, [epoch]);

    // DEEP SPACE CANVAS RENDER LOOP
    useEffect(() => {
        const canvas = document.getElementById('deep-space-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth * 1.1; 
            canvas.height = window.innerHeight * 1.1;
        };
        window.addEventListener('resize', resize);
        resize();

        const stars = Array.from({ length: 150 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            glow: Math.random() > 0.9 
        }));

        const nebulas = [
            { x: canvas.width * 0.3, y: canvas.height * 0.4, r: 600, color: 'rgba(70, 40, 180, 0.04)' },
            { x: canvas.width * 0.7, y: canvas.height * 0.6, r: 700, color: 'rgba(0, 240, 255, 0.03)' },
        ];

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            nebulas.forEach(neb => {
                const gradient = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.r);
                gradient.addColorStop(0, neb.color);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });

            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                if (star.glow) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#00F0FF';
                } else {
                    ctx.shadowBlur = 0;
                }
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();
                
                star.alpha += (Math.random() - 0.5) * 0.02;
                if(star.alpha < 0.1) star.alpha = 0.1;
                if(star.alpha > 0.9) star.alpha = 0.9;
            });

            animationFrameId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const triggerBeam = () => {
        setActionBeam(true);
        setTimeout(() => setActionBeam(false), 800);
    };

    const handleBlockClick = (e, block) => {
        e.stopPropagation(); 
        setSelectedBlock(block);
        setTelemetry(prev => [...prev.slice(-12), `[SYS] Inspecting Node Hash #${block.id.toString().padStart(4, '0')}`]);
    };

    // SVGs
    const IconIdentity = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
    const IconBank = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>;
    const IconSenate = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M4 21V7M20 21V7M7 21v-4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4M12 7v10M12 3v4"></path></svg>;
    const IconForge = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"></path></svg>;

    const renderAppContent = () => {
        return <div className="p-8 text-center text-gray-400 font-mono mt-20">SYSTEM DATA ROUTING...<br/><br/>(Explore the Sovereign Apps)</div>;
    };

    const openApp = (app) => { setActiveApp(app === activeApp ? null : app); };
    
    const parallaxStyle = { transform: `rotateX(${mousePos.y * -8}deg) rotateY(${mousePos.x * 8}deg) translateZ(50px)` };
    const bgParallaxStyle = { transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` };

    return (
        <div className="h-screen w-full relative overflow-hidden">
            
            {/* THE SPACE ABYSS BACKGROUND */}
            <div className="void-bg" style={bgParallaxStyle}>
                <canvas id="deep-space-canvas" className="w-full h-full"></canvas>
            </div>
            
            {/* PARALLAX 3D UNIVERSE */}
            <div className="parallax-wrapper" style={parallaxStyle}>
                <div className="bitopia-planet">
                    <div className="planet-grid"></div>
                </div>
                
                <div className="axiom-swarm-framework">
                    {blocks.map(b => {
                        const rad = (b.angle * Math.PI) / 180;
                        const x = Math.cos(rad) * b.radius; 
                        const y = Math.sin(rad) * b.radius;
                        
                        return (
                            <div key={`pos-${b.id}`} className="block-orbit-position" style={{ transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0)` }}>
                                <div className="block-local-rotation" style={{ transform: `rotateZ(${-b.angle}deg)` }}>
                                    <div 
                                        className={`block-interactive ${hoveredBlockId === b.id ? 'hovered' : ''}`}
                                        onMouseEnter={() => setHoveredBlockId(b.id)} onMouseLeave={() => setHoveredBlockId(null)}
                                        onClick={(e) => handleBlockClick(e, b)}
                                    >
                                        <div className="cube-3d">
                                            <div className={`cube-face ${b.type === 'rwa' ? 'gold-top' : 'face-top'}`}></div>
                                            <div className={`cube-face ${b.type === 'rwa' ? 'gold-front' : 'face-front'}`}></div>
                                            <div className={`cube-face ${b.type === 'rwa' ? 'gold-right' : 'face-right'}`}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`cryptographic-uplink ${hoveredBlockId === b.id ? 'active' : ''}`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* TOP UNIFIED PILL BAR (RESTORED) */}
            <div className="dasos-glass dasos-topbar">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 100 100">
                            <ellipse cx="50" cy="65" rx="40" ry="12" fill="none" stroke="#fff" strokeWidth="4" transform="rotate(-15 50 65)"/>
                            <ellipse cx="50" cy="65" rx="35" ry="10" fill="none" stroke="#00F0FF" strokeWidth="4" transform="rotate(15 50 65)"/>
                        </svg>
                        <span className="font-bold text-white tracking-widest text-sm">BLOCKS</span>
                    </div>
                    <span className="text-gray-500 border-l border-white/10 pl-6 text-xs">{activeApp ? activeApp.toUpperCase() : 'DESKTOP'}</span>
                </div>
                <div className="flex items-center gap-8 text-gray-400 font-mono text-xs">
                    <span className="text-cyan-400 flex flex-col items-end"><span className="text-[8px] text-gray-500">KINETIC FUEL</span>{eWb.toLocaleString('en-US', {minimumFractionDigits: 2})} EW</span>
                    <span className="text-green-400 flex flex-col items-end"><span className="text-[8px] text-gray-500">STABLE RESERVE</span>{sov.toLocaleString('en-US', {minimumFractionDigits: 2})} SOV</span>
                    <span className="text-purple-400 flex flex-col items-end"><span className="text-[8px] text-gray-500">VOTING POWER</span>{gov.toFixed(0)} GOV</span>
                </div>
            </div>

            {/* TOP RIGHT EPOCH & CIV BOX (RESTORED) */}
            <div className="dasos-glass epoch-box">
                <div className="flex flex-col items-end mr-4 border-r border-white/10 pr-4">
                    <span className="text-[8px] text-gray-500 font-mono uppercase tracking-widest mb-1">Space-Time Epoch</span>
                    <span className="text-xl font-bold text-white font-mono leading-none">{epoch.toString().padStart(6, '0')}</span>
                </div>
                <div className="flex flex-col items-start min-w-[60px]">
                    <span className="text-[8px] text-gray-500 font-mono uppercase tracking-widest mb-1">Civ Status</span>
                    <span className="text-[10px] text-emerald-400 font-mono uppercase flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#10B981]"></div> Synced
                    </span>
                </div>
            </div>

            {/* DYNAMIC ACTION BEAM */}
            {actionBeam && <div className="action-beam" style={{ animation: 'beam-up 0.8s ease-out forwards' }}></div>}

            {/* OS WINDOW */}
            <div className={`dasos-glass dasos-window ${activeApp ? 'open' : ''}`}>
                <div className="window-titlebar">
                    <div className="window-title">dasOS // {activeApp}</div>
                    <div className="window-controls">
                        <div className="win-btn" onClick={() => setActiveApp(null)}>_</div>
                        <div className="win-btn">□</div>
                        <div className="win-btn" onClick={() => setActiveApp(null)}>✕</div>
                    </div>
                </div>
                <div className="window-content">
                    {activeApp && renderAppContent()}
                </div>
            </div>

            {/* THE BOTTOM COMMAND STREAM BAR (RESTORED) */}
            <div className="widget-panel-left">
                <div className="dasos-glass telemetry-bar font-mono text-[10px] space-x-6">
                    <p className="text-cyan-400 font-bold uppercase tracking-[0.2em] border-r border-white/10 pr-6 pb-0 self-center">LIVE COMMAND STREAM</p>
                    <div className="flex-1 overflow-x-auto scroll-hide space-x-4 flex items-center">
                        {telemetry.slice().reverse().map((log, i) => (
                            <div key={i} className="text-gray-300 leading-snug border-l-2 border-cyan-500/50 pl-3 whitespace-nowrap">{log}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BOTTOM DOCK (RESTORED) */}
            <div className="dasos-glass dasos-dock">
                <div className={`dock-icon ${activeApp === 'identity' ? 'active' : ''}`} onClick={() => openApp('identity')} title="Sovereign Identity"><IconIdentity /></div>
                <div className="w-px h-6 bg-white/10 self-center mx-1"></div>
                <div className={`dock-icon ${activeApp === 'treasury' ? 'active' : ''}`} onClick={() => openApp('treasury')} title="Central Bank"><IconBank /></div>
                <div className={`dock-icon ${activeApp === 'senate' ? 'active' : ''}`} onClick={() => openApp('senate')} title="Planetary Senate"><IconSenate /></div>
                <div className={`dock-icon ${activeApp === 'forge' ? 'active' : ''}`} onClick={() => openApp('forge')} title="Civ Forge"><IconForge /></div>
            </div>

            {/* NODE INSPECTOR MODAL */}
            <div className={`node-inspector-overlay ${selectedBlock ? 'active' : ''}`} onClick={() => setSelectedBlock(null)}>
                {selectedBlock && (
                    <div className="dasos-glass p-8 rounded-2xl w-80 pointer-events-auto border-t-2 border-cyan-500 relative" onClick={e => e.stopPropagation()}>
                        <button className="absolute top-5 right-5 text-gray-500 hover:text-white" onClick={() => setSelectedBlock(null)}>✕</button>
                        <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest mb-1">Cryptographic Node</p>
                        <h2 className="text-2xl font-bold text-white mb-6 font-mono">Block #{selectedBlock.id.toString().padStart(4, '0')}</h2>
                        
                        <div className="space-y-4">
                            <div className="bg-black/40 border border-white/10 p-4 rounded-xl">
                                <p className="text-[9px] text-gray-500 uppercase tracking-widest">Node Architecture</p>
                                <p className={`text-sm font-bold mt-1 uppercase ${selectedBlock.type === 'rwa' ? 'text-[#D4AF37]' : 'text-cyan-400'}`}>
                                    {selectedBlock.type === 'rwa' ? 'Corporate RWA Anchor' : 'Bitopia Habitat Core'}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black/40 border border-white/10 p-4 rounded-xl">
                                    <p className="text-[9px] text-gray-500 uppercase tracking-widest">Orbital Vector</p>
                                    <p className="text-sm text-white font-mono mt-1">{selectedBlock.angle}°</p>
                                </div>
                                <div className="bg-black/40 border border-white/10 p-4 rounded-xl">
                                    <p className="text-[9px] text-gray-500 uppercase tracking-widest">Network Yield</p>
                                    <p className="text-sm text-emerald-400 font-mono mt-1">
                                        {selectedBlock.type === 'rwa' ? '+ BTC Fee' : '+ EW Flow'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
