/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Play,
  Menu,
  X,
  Maximize2,
  RotateCcw,
  Zap,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const GAMES = [
  {
    id: 'retro-bowl',
    name: 'Retro Bowl',
    url: 'https://retrobowl.me',
    description: 'Experience the ultimate 8-bit football management sim. Lead your team to glory in the most addictive sports game on the web.',
    tagline: 'Gridiron Classic Reborn',
    icon: Gamepad2
  },
  {
    id: 'veck',
    name: 'Veck',
    url: 'https://veck.io',
    description: 'A fast-paced, neon-infused arcade experience. Test your reflexes in this high-octane digital arena.',
    tagline: 'Neon Arcade Protocol',
    icon: Zap
  },
  {
    id: 'solar-smash',
    name: 'Solar Smash',
    url: 'https://solarsmash.co',
    description: 'A planet destruction simulator that allows you to use a variety of different weapons to destroy the planet.',
    tagline: 'Planetary Destruction Protocol',
    icon: Globe
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedGame, setSelectedGame] = useState(GAMES[0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePlayGame = (game: typeof GAMES[0]) => {
    setSelectedGame(game);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white flex flex-col">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-red-900/50 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-600 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">
              Noah's <span className="text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]">Games</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setIsPlaying(false)} className={`text-sm font-bold uppercase tracking-widest transition-colors ${!isPlaying ? 'text-red-500' : 'hover:text-red-500'}`}>Home</button>
            {GAMES.map(game => (
              <button 
                key={game.id}
                onClick={() => handlePlayGame(game)} 
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${isPlaying && selectedGame.id === game.id ? 'text-red-500' : 'hover:text-red-500'}`}
              >
                {game.name}
              </button>
            ))}
          </div>

          <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl w-full relative z-10 text-center">
          <AnimatePresence mode="wait">
            {!isPlaying ? (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <div className="max-w-4xl mx-auto mb-20">
                  <div className="mb-12 relative inline-block">
                    <div className="absolute -inset-4 bg-red-600/20 blur-2xl rounded-full animate-pulse" />
                    <Gamepad2 className="w-24 h-24 text-red-600 mx-auto relative z-10 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]" />
                  </div>
                  
                  <h2 className="text-6xl md:text-8xl font-black uppercase italic mb-6 tracking-tighter leading-none">
                    Neon <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">Vault</span>
                  </h2>
                  
                  <div className="flex items-center justify-center gap-4 mb-10">
                    <div className="h-px w-12 bg-red-900" />
                    <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">Select Your Protocol</p>
                    <div className="h-px w-12 bg-red-900" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {GAMES.map((game) => (
                    <motion.div 
                      key={game.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-8 rounded-[2.5rem] text-left group cursor-pointer hover:border-red-600/50 transition-colors"
                      onClick={() => handlePlayGame(game)}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="p-4 bg-zinc-800 rounded-2xl group-hover:bg-red-600 transition-colors">
                          <game.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="px-4 py-1 bg-red-600/10 border border-red-600/20 rounded-full text-[10px] font-black uppercase tracking-widest text-red-600">
                          Ready
                        </div>
                      </div>
                      <h3 className="text-3xl font-black uppercase italic mb-2 tracking-tighter">{game.name}</h3>
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">{game.tagline}</p>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-8 line-clamp-2">
                        {game.description}
                      </p>
                      <div className="flex items-center gap-2 text-red-600 font-black uppercase italic text-sm group-hover:gap-4 transition-all">
                        Launch Game <Play className="w-4 h-4 fill-current" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="game"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex flex-col gap-6"
              >
                {/* Game Header */}
                <div className="flex items-center justify-between bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-red-600 rounded-lg">
                      <selectedGame.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-black uppercase italic tracking-wider">{selectedGame.name}</h3>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Live Session</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
                        if (iframe) iframe.src = iframe.src;
                      }}
                      className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors text-zinc-400 hover:text-white"
                      title="Reload Game"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setIsPlaying(false)}
                      className="px-6 py-3 bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white border border-red-600/20 rounded-xl font-black uppercase italic text-xs transition-all"
                    >
                      Exit Game
                    </button>
                  </div>
                </div>

                {/* Game Container */}
                <div className="relative aspect-video w-full bg-zinc-950 rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-2xl group">
                  <div className="absolute -inset-1 bg-red-600/10 blur opacity-0 group-hover:opacity-100 transition duration-1000" />
                  <iframe 
                    id="game-iframe"
                    src={selectedGame.url} 
                    className="w-full h-full relative z-10"
                    frameBorder="0"
                    allowFullScreen
                    title={selectedGame.name}
                  />
                </div>

                <div className="flex items-center justify-center gap-8 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Secure Connection
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize2 className="w-3 h-3" />
                    Full Screen Supported
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-black tracking-tighter uppercase italic">
                Noah's <span className="text-red-600">Games</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-8 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-red-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-red-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-red-500 transition-colors">Support</a>
            </div>

            <div className="flex items-center gap-3 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
              <span className="text-zinc-800">Platform v1.2.0</span>
              <span className="w-1 h-1 bg-red-600 rounded-full" />
              <span>No AI Features</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
