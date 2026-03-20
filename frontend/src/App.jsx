import React, { useState, useEffect } from 'react';
// Later, you will import CitizenDashboard here to render it inside your windows!

export default function App() {
    const [activeApp, setActiveApp] = useState(null); 
    const [sidebarTab, setSidebarTab] = useState('overview');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
    const [hoveredBlockId, setHoveredBlockId] = useState(null);
    const [selectedBlock, setSelectedBlock] = useState(null); 

    // MACRO-ECONOMY
    const [eWb, setEWb] = useState(38450.50); // Updated to EWB
    const [sov, setSov] = useState(18450.00); 
    const [gov, setGov] = useState(850); 
    const [btc, setBtc] = useState(24.505); 
    const [epoch, setEpoch] = useState(1042);
    
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

    // DEEP SPACE CANVAS RENDER LOOP (Your masterpiece, untouched)
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

    const forgeBlock = () => {
        if(eWb < 1500) return;
        triggerBeam();
        setEWb(p => p - 1500);
        const newAngle = blocks.length * 15;
        setBlocks(p => [...p, { id: p.length + 1, angle: newAngle, radius: 350, type: 'core' }]);
        setTelemetry(prev => [...prev.slice(-6), `[FORGE] Physical matter synthesized on Ledger.`]);
    };

    const executeThermodynamicParity = () => {
        if(eWb < 1000) return;
        triggerBeam();
        setEWb(p => p - 1000);
        setSov(p => p + 1000);
        setTelemetry(prev => [...prev.slice(-6), `[TREASURY] Thermodynamic Parity Executed. 1,000 $SOV minted.`]);
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
        // NOTE: Here is where you will eventually put <CitizenDashboard /> or <StakingTerminal />
        if (activeApp === 'forge') return (
            <div className="flex h-full w-full text-white p-8">
                <h2>Orbital Forge Systems Online</h2>
                {/* Your forge JSX goes here */}
            </div>
        );
        if (activeApp === 'treasury') return (
            <div className="flex h-full w-full text-white p-8">
                <h2>Treasury Systems Online</h2>
                {/* Your treasury JSX goes here */}
            </div>
        );
        return <div className="p-8 text-center text-gray-400 font-mono mt-20">SYSTEM DATA ROUTING...<br/><br/>(Explore the Sovereign Apps)</div>;
    };

    const openApp = (app) => { setActiveApp(app === activeApp ? null : app); };
    
    const parallaxStyle = { transform: `rotateX(${mousePos.y * -8}deg) rotateY(${mousePos.x * 8}deg) translateZ(50px)` };
    const bgParallaxStyle = { transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` };

    return (
        <div className="h-screen w-full relative overflow-hidden bg-[#020308]">
            
            <div className="void-bg" style={bgParallaxStyle}>
                <canvas id="deep-space-canvas" className="w-full h-full"></canvas>
            </div>
            
            <div className="parallax-wrapper" style={parallaxStyle}>
                <div className="bitopia-planet">
                    <div className="planet-grid"></div>
                </div>
                
                <div className="dyson-ring-framework">
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

            {/* TOP BAR */}
            <div className="dasos-glass dasos-topbar">
                <div className="flex items-center gap-6">
                    <span className="font-bold text-white tracking-widest text-sm">dasOS CORE</span>
                </div>
                <div className="flex items-center gap-8 text-gray-400 font-mono text-xs">
                    <span className="text-cyan-400 flex flex-col items-end"><span className="text-[8px] text-gray-500">THERMO YIELD</span>{eWb.toLocaleString('en-US', {minimumFractionDigits: 2})} EWB</span>
                </div>
            </div>

            {/* DOCK */}
            <div className="dasos-glass dasos-dock">
                <div className={`dock-icon ${activeApp === 'identity' ? 'active' : ''}`} onClick={() => openApp('identity')} title="Sovereign Identity"><IconIdentity /></div>
                <div className={`dock-icon ${activeApp === 'treasury' ? 'active' : ''}`} onClick={() => openApp('treasury')} title="Central Bank"><IconBank /></div>
                <div className={`dock-icon ${activeApp === 'forge' ? 'active' : ''}`} onClick={() => openApp('forge')} title="Civ Forge"><IconForge /></div>
            </div>

            {/* WINDOW */}
            <div className={`dasos-glass dasos-window ${activeApp ? 'open' : ''}`}>
                <div className="window-titlebar">
                    <div className="window-title">dasOS // {activeApp}</div>
                    <div className="window-controls">
                        <div className="win-btn" onClick={() => setActiveApp(null)}>✕</div>
                    </div>
                </div>
                <div className="window-content">
                    {activeApp && renderAppContent()}
                </div>
            </div>

        </div>
    );
}
