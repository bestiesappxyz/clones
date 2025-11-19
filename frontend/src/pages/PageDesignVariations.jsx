import React, { useState } from 'react';
import Header from '../components/Header';

// Design variation showcase for HomePage, BestiesPage, and ProfilePage
// Each variation is a completely different design philosophy

const PageDesignVariations = () => {
  const [activePage, setActivePage] = useState('home');
  const [activeVariation, setActiveVariation] = useState(1);

  const pages = [
    { id: 'home', name: 'HomePage', icon: '🏠' },
    { id: 'besties', name: 'BestiesPage', icon: '💜' },
    { id: 'profile', name: 'ProfilePage', icon: '👤' },
  ];

  const variations = [
    { id: 1, name: 'Dreamy Cloud', description: 'Ethereal, soft, cloud-like with floating elements' },
    { id: 2, name: 'Neon Nights', description: 'Cyberpunk vibes, glowing accents, dark mode energy' },
    { id: 3, name: 'Swiss Minimal', description: 'Grid-based, typographic hierarchy, stark contrast' },
    { id: 4, name: 'Kawaii Sticker', description: 'Cute Japanese aesthetic, stickers, notebook feel' },
    { id: 5, name: 'Luxury Editorial', description: 'High fashion magazine, serif fonts, sophisticated' },
  ];

  return (
    <div className="min-h-screen bg-pattern">
      <Header />

      <div className="max-w-6xl mx-auto p-4 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display text-gradient mb-4">Page Design Variations</h1>
          <p className="text-text-secondary">5 completely different design philosophies</p>
        </div>

        {/* Page Selector */}
        <div className="flex justify-center gap-3 mb-6">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activePage === page.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              {page.icon} {page.name}
            </button>
          ))}
        </div>

        {/* Variation Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {variations.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVariation(v.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeVariation === v.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {v.id}. {v.name}
            </button>
          ))}
        </div>

        {/* Current Selection Info */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500">
            {variations.find(v => v.id === activeVariation)?.description}
          </p>
        </div>

        {/* Design Preview */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {activePage === 'home' && <HomePageVariations variation={activeVariation} />}
          {activePage === 'besties' && <BestiesPageVariations variation={activeVariation} />}
          {activePage === 'profile' && <ProfilePageVariations variation={activeVariation} />}
        </div>
      </div>
    </div>
  );
};

// ============================================
// HOMEPAGE VARIATIONS
// ============================================

const HomePageVariations = ({ variation }) => {
  switch (variation) {
    case 1: return <HomePageDreamyCloud />;
    case 2: return <HomePageNeonNights />;
    case 3: return <HomePageSwissMinimal />;
    case 4: return <HomePageKawaiiSticker />;
    case 5: return <HomePageLuxuryEditorial />;
    default: return <HomePageDreamyCloud />;
  }
};

// Variation 1: Dreamy Cloud - Ethereal, soft, floating
const HomePageDreamyCloud = () => (
  <div className="relative p-8 min-h-[700px] overflow-hidden" style={{ background: 'linear-gradient(180deg, #fef7ff 0%, #fdf4ff 50%, #fae8ff 100%)' }}>
    {/* Floating cloud decorations */}
    <div className="absolute top-10 left-10 w-40 h-20 bg-white/60 rounded-full blur-xl"></div>
    <div className="absolute top-32 right-8 w-32 h-16 bg-pink-100/60 rounded-full blur-xl"></div>
    <div className="absolute bottom-40 left-20 w-48 h-24 bg-purple-100/50 rounded-full blur-2xl"></div>
    <div className="absolute bottom-20 right-16 w-36 h-18 bg-white/70 rounded-full blur-xl"></div>

    {/* Content */}
    <div className="relative z-10">
      {/* Welcome - Floating card */}
      <div className="mb-10 transform hover:-translate-y-1 transition-transform">
        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 shadow-[0_8px_32px_rgba(236,72,153,0.15)] border border-white/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl animate-bounce">✨</span>
            <span className="text-sm text-pink-400 font-medium tracking-wide">WELCOME BACK</span>
          </div>
          <h1 className="text-4xl font-light text-gray-700 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Hello, <span className="font-normal text-pink-500">Sarah</span>
          </h1>
          <p className="text-gray-400 italic">float through your day safely...</p>
        </div>
      </div>

      {/* Quick actions - Cloud buttons */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { time: '15 min', icon: '🌸', label: 'quick' },
          { time: '30 min', icon: '🌷', label: 'medium' },
          { time: '1 hour', icon: '🌺', label: 'long' }
        ].map((item, i) => (
          <button
            key={i}
            className="group bg-white/70 backdrop-blur-sm rounded-[1.5rem] p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-white/50"
          >
            <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
            <div className="text-lg font-medium text-gray-600">{item.time}</div>
            <div className="text-xs text-pink-300 uppercase tracking-wider">{item.label}</div>
          </button>
        ))}
      </div>

      {/* Main CTA - Gradient pill */}
      <button className="w-full py-5 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all mb-10 relative overflow-hidden">
        <span className="relative z-10">✨ Create Check-In</span>
        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
      </button>

      {/* Stats - Floating bubbles */}
      <div className="flex justify-center gap-6">
        {[
          { num: '12', label: 'safe arrivals', color: 'pink' },
          { num: '5', label: 'besties', color: 'purple' },
          { num: '7', label: 'day streak', color: 'fuchsia' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className={`w-20 h-20 bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 rounded-full flex items-center justify-center shadow-lg mb-2`}>
              <span className={`text-2xl font-light text-${stat.color}-500`}>{stat.num}</span>
            </div>
            <span className="text-xs text-gray-400">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 2: Neon Nights - Cyberpunk, dark mode, glowing
const HomePageNeonNights = () => (
  <div className="p-8 min-h-[700px] bg-gray-900 relative overflow-hidden">
    {/* Grid background */}
    <div className="absolute inset-0 opacity-10">
      <div className="h-full w-full" style={{
        backgroundImage: 'linear-gradient(#ec4899 1px, transparent 1px), linear-gradient(90deg, #ec4899 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>
    </div>

    {/* Glow effects */}
    <div className="absolute top-0 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

    <div className="relative z-10">
      {/* Welcome */}
      <div className="mb-8">
        <div className="inline-block px-4 py-1 bg-pink-500/20 rounded-full border border-pink-500/50 mb-4">
          <span className="text-pink-400 text-sm font-mono">STATUS: ONLINE</span>
        </div>
        <h1 className="text-5xl font-black text-white mb-2">
          Hey <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">Sarah</span>
        </h1>
        <p className="text-gray-400 font-mono text-sm">// your squad is watching out</p>
      </div>

      {/* Quick actions - Neon buttons */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { time: '15m', color: 'pink' },
          { time: '30m', color: 'purple' },
          { time: '1h', color: 'cyan' }
        ].map((item, i) => (
          <button
            key={i}
            className={`py-6 bg-gray-800 border-2 border-${item.color}-500/50 rounded-lg hover:border-${item.color}-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all relative overflow-hidden group`}
          >
            <div className={`absolute inset-0 bg-${item.color}-500/10 group-hover:bg-${item.color}-500/20 transition-colors`}></div>
            <span className={`relative text-${item.color}-400 font-mono font-bold text-lg`}>{item.time}</span>
          </button>
        ))}
      </div>

      {/* Main CTA */}
      <button className="w-full py-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg font-bold text-white mb-8 relative overflow-hidden group">
        <span className="relative z-10 font-mono">[ CREATE CHECK-IN ]</span>
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
      </button>

      {/* Stats - Terminal style */}
      <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700 font-mono">
        <div className="text-gray-500 text-xs mb-3">$ stats --user sarah</div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'check_ins', value: '12', color: 'green' },
            { label: 'besties', value: '5', color: 'pink' },
            { label: 'streak', value: '7', color: 'yellow' }
          ].map((stat, i) => (
            <div key={i}>
              <div className={`text-${stat.color}-400 text-2xl font-bold`}>{stat.value}</div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Variation 3: Swiss Minimal - Grid-based, typographic, stark
const HomePageSwissMinimal = () => (
  <div className="p-0 min-h-[700px] bg-white">
    {/* Top bar */}
    <div className="h-2 bg-black"></div>

    <div className="p-8">
      {/* Welcome - Strong typography */}
      <div className="mb-12">
        <div className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Dashboard / Home</div>
        <h1 className="text-6xl font-black text-black leading-none mb-4">
          Sarah.
        </h1>
        <div className="w-16 h-1 bg-black"></div>
      </div>

      {/* Quick actions - Grid system */}
      <div className="grid grid-cols-3 gap-px bg-black mb-12">
        {['15', '30', '60'].map((num, i) => (
          <button
            key={i}
            className="bg-white p-8 hover:bg-gray-50 transition-colors text-left"
          >
            <div className="text-4xl font-black text-black">{num}</div>
            <div className="text-xs uppercase tracking-widest text-gray-400 mt-2">minutes</div>
          </button>
        ))}
      </div>

      {/* Main CTA */}
      <button className="w-full py-6 bg-black text-white font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors mb-12">
        Create Check-In
      </button>

      {/* Stats - Strict grid */}
      <div className="border-t-2 border-black pt-8">
        <div className="grid grid-cols-3">
          {[
            { num: '12', label: 'Completed' },
            { num: '05', label: 'Connections' },
            { num: '07', label: 'Day Streak' }
          ].map((stat, i) => (
            <div key={i} className={`${i > 0 ? 'border-l-2 border-black pl-6' : ''}`}>
              <div className="text-4xl font-black text-black">{stat.num}</div>
              <div className="text-xs uppercase tracking-widest text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Variation 4: Kawaii Sticker - Cute, playful, notebook aesthetic
const HomePageKawaiiSticker = () => (
  <div className="p-6 min-h-[700px] relative" style={{ background: '#fff9f9' }}>
    {/* Notebook lines */}
    <div className="absolute inset-0 opacity-30" style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, #ffccd5 28px)',
      backgroundSize: '100% 28px'
    }}></div>

    {/* Doodle decorations */}
    <div className="absolute top-4 right-4 text-4xl transform rotate-12">⭐</div>
    <div className="absolute top-20 left-4 text-3xl transform -rotate-6">🌈</div>
    <div className="absolute bottom-40 right-8 text-3xl transform rotate-6">💖</div>

    <div className="relative z-10">
      {/* Welcome - Sticker style */}
      <div className="mb-8">
        <div className="inline-block bg-pink-100 px-4 py-2 rounded-full transform -rotate-2 mb-4">
          <span className="text-pink-500 font-bold">✿ welcome back!</span>
        </div>
        <h1 className="text-4xl font-black text-gray-800 mb-2">
          Hi Sarah~ <span className="text-2xl">(*´▽`*)</span>
        </h1>
        <p className="text-gray-500">let's stay safe today! ♪</p>
      </div>

      {/* Quick actions - Sticker buttons */}
      <div className="space-y-3 mb-8">
        {[
          { time: '15 min', emoji: '🍓', color: 'red', rotate: '-1deg' },
          { time: '30 min', emoji: '🍰', color: 'pink', rotate: '1deg' },
          { time: '1 hour', emoji: '🧁', color: 'purple', rotate: '-0.5deg' }
        ].map((item, i) => (
          <button
            key={i}
            className={`w-full flex items-center gap-4 bg-${item.color}-50 p-4 rounded-2xl border-2 border-${item.color}-200 border-dashed hover:border-solid transition-all`}
            style={{ transform: `rotate(${item.rotate})` }}
          >
            <span className="text-3xl">{item.emoji}</span>
            <span className={`font-bold text-${item.color}-400`}>{item.time}</span>
            <span className="ml-auto text-gray-300">→</span>
          </button>
        ))}
      </div>

      {/* Main CTA - Tape effect */}
      <div className="relative mb-8">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-200/80 transform -rotate-2"></div>
        <button className="w-full py-5 bg-pink-400 rounded-xl text-white font-bold shadow-[4px_4px_0_0_#f472b6]">
          ✧ Create Check-In ✧
        </button>
      </div>

      {/* Stats - Badge stickers */}
      <div className="flex justify-center gap-4">
        {[
          { num: '12', label: 'safe!', emoji: '✓' },
          { num: '5', label: 'besties', emoji: '♡' },
          { num: '7', label: 'streak', emoji: '★' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="w-16 h-16 bg-white rounded-full border-4 border-dashed border-pink-300 flex items-center justify-center mb-1 shadow-sm">
              <div>
                <div className="text-lg font-black text-pink-500">{stat.num}</div>
                <div className="text-xs text-pink-300">{stat.emoji}</div>
              </div>
            </div>
            <span className="text-xs text-gray-400">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 5: Luxury Editorial - High fashion, sophisticated, serif
const HomePageLuxuryEditorial = () => (
  <div className="min-h-[700px]">
    {/* Hero Section */}
    <div className="relative h-72 bg-stone-900 flex items-end p-8">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="relative">
        <div className="text-stone-400 text-xs tracking-[0.5em] uppercase mb-2">Welcome</div>
        <h1 className="text-5xl text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Sarah
        </h1>
        <div className="w-20 h-px bg-white/50"></div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="p-8 bg-stone-50">
      <div className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Quick Check-In</div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { time: '15', unit: 'min' },
          { time: '30', unit: 'min' },
          { time: '60', unit: 'min' }
        ].map((item, i) => (
          <button
            key={i}
            className="py-8 bg-white border border-stone-200 hover:border-stone-900 transition-colors text-center"
          >
            <div className="text-3xl text-stone-900" style={{ fontFamily: 'Georgia, serif' }}>{item.time}</div>
            <div className="text-xs text-stone-400 tracking-wider uppercase">{item.unit}</div>
          </button>
        ))}
      </div>
    </div>

    {/* Main CTA */}
    <div className="px-8 py-6 bg-white">
      <button className="w-full py-5 bg-stone-900 text-white text-sm tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors">
        Create Check-In
      </button>
    </div>

    {/* Stats */}
    <div className="p-8 bg-white border-t border-stone-100">
      <div className="grid grid-cols-3 gap-px">
        {[
          { num: '12', label: 'Completed' },
          { num: '5', label: 'Connections' },
          { num: '7', label: 'Streak' }
        ].map((stat, i) => (
          <div key={i} className="text-center py-4">
            <div className="text-3xl text-stone-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>{stat.num}</div>
            <div className="text-xs tracking-[0.2em] uppercase text-stone-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom accent */}
    <div className="h-1 bg-gradient-to-r from-stone-200 via-stone-900 to-stone-200"></div>
  </div>
);

// ============================================
// BESTIES PAGE VARIATIONS
// ============================================

const BestiesPageVariations = ({ variation }) => {
  switch (variation) {
    case 1: return <BestiesPageDreamyCloud />;
    case 2: return <BestiesPageNeonNights />;
    case 3: return <BestiesPageSwissMinimal />;
    case 4: return <BestiesPageKawaiiSticker />;
    case 5: return <BestiesPageLuxuryEditorial />;
    default: return <BestiesPageDreamyCloud />;
  }
};

// Variation 1: Dreamy Cloud
const BestiesPageDreamyCloud = () => (
  <div className="relative p-8 min-h-[700px] overflow-hidden" style={{ background: 'linear-gradient(180deg, #f5f3ff 0%, #faf5ff 50%, #fdf4ff 100%)' }}>
    {/* Floating clouds */}
    <div className="absolute top-20 right-10 w-32 h-16 bg-purple-100/60 rounded-full blur-xl"></div>
    <div className="absolute bottom-32 left-10 w-40 h-20 bg-pink-100/50 rounded-full blur-xl"></div>

    <div className="relative z-10">
      {/* Header */}
      <div className="mb-8">
        <div className="text-purple-300 text-sm tracking-wide mb-2">✨ your circle</div>
        <h1 className="text-3xl font-light text-gray-700" style={{ fontFamily: 'Georgia, serif' }}>
          Your <span className="text-purple-400">Besties</span>
        </h1>
      </div>

      {/* Activity */}
      <div className="mb-8">
        <div className="text-xs text-purple-300 uppercase tracking-widest mb-4">recent moments</div>
        {[
          { name: 'Emma', action: 'arrived safely', emoji: '🌸', time: '5 min' },
          { name: 'Sophie', action: 'out exploring', emoji: '🦋', time: '20 min' }
        ].map((item, i) => (
          <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.emoji}</span>
              <div className="flex-1">
                <span className="text-purple-400">{item.name}</span>
                <span className="text-gray-500"> {item.action}</span>
              </div>
              <span className="text-xs text-gray-300">{item.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Besties */}
      <div className="grid grid-cols-2 gap-4">
        {['Emma', 'Sophie', 'Lily', 'Mia'].map((name, i) => (
          <div key={i} className="bg-white/60 backdrop-blur-sm rounded-[1.5rem] p-6 text-center shadow-sm hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mx-auto mb-3 flex items-center justify-center text-xl text-white shadow-md">
              {name[0]}
            </div>
            <div className="text-gray-600 font-medium">{name}</div>
            <div className="text-xs text-purple-300">online</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 2: Neon Nights
const BestiesPageNeonNights = () => (
  <div className="p-8 min-h-[700px] bg-gray-900 relative overflow-hidden">
    {/* Glow effects */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>

    <div className="relative z-10">
      {/* Header */}
      <div className="mb-8">
        <div className="text-cyan-400 text-xs font-mono mb-2">[ NETWORK STATUS: ACTIVE ]</div>
        <h1 className="text-4xl font-black text-white">BESTIES</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 mt-2"></div>
      </div>

      {/* Activity feed - Terminal style */}
      <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700 mb-8 font-mono text-sm">
        <div className="text-gray-500 mb-2">$ activity --recent</div>
        {[
          { name: 'EMMA', status: 'SAFE', color: 'green' },
          { name: 'SOPHIE', status: 'ACTIVE', color: 'cyan' }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 py-1">
            <span className={`w-2 h-2 bg-${item.color}-400 rounded-full animate-pulse`}></span>
            <span className="text-gray-300">{item.name}</span>
            <span className={`text-${item.color}-400 ml-auto`}>{item.status}</span>
          </div>
        ))}
      </div>

      {/* Besties grid */}
      <div className="grid grid-cols-2 gap-3">
        {['Emma', 'Sophie', 'Lily', 'Mia'].map((name, i) => (
          <div
            key={i}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold">
              {name[0]}
            </div>
            <div className="text-white font-mono">{name}</div>
            <div className="text-xs text-green-400">● online</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 3: Swiss Minimal
const BestiesPageSwissMinimal = () => (
  <div className="min-h-[700px] bg-white">
    <div className="h-2 bg-black"></div>

    <div className="p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Network / Besties</div>
        <h1 className="text-5xl font-black text-black">Besties.</h1>
        <div className="w-12 h-1 bg-black mt-4"></div>
      </div>

      {/* Activity */}
      <div className="border-t-2 border-black pt-8 mb-12">
        <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">Activity</div>
        {[
          { name: 'Emma', action: 'Safe arrival', time: '5m' },
          { name: 'Sophie', action: 'Currently active', time: '20m' }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <span className="font-bold">{item.name}</span>
              <span className="text-gray-400 ml-2">{item.action}</span>
            </div>
            <span className="text-xs text-gray-400">{item.time}</span>
          </div>
        ))}
      </div>

      {/* Besties grid */}
      <div className="grid grid-cols-2 gap-px bg-black">
        {['Emma', 'Sophie', 'Lily', 'Mia'].map((name, i) => (
          <div key={i} className="bg-white p-6 text-center">
            <div className="w-12 h-12 bg-black text-white mx-auto mb-2 flex items-center justify-center font-bold">
              {name[0]}
            </div>
            <div className="font-bold text-sm uppercase tracking-wider">{name}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 4: Kawaii Sticker
const BestiesPageKawaiiSticker = () => (
  <div className="p-6 min-h-[700px] relative" style={{ background: '#f5f0ff' }}>
    {/* Doodles */}
    <div className="absolute top-4 left-4 text-3xl transform -rotate-12">💫</div>
    <div className="absolute top-16 right-6 text-2xl transform rotate-6">🎀</div>

    <div className="relative z-10">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-block bg-purple-100 px-3 py-1 rounded-full transform rotate-1 mb-3">
          <span className="text-purple-400 text-sm font-bold">♡ your besties ♡</span>
        </div>
        <h1 className="text-3xl font-black text-gray-800">
          Besties~ <span className="text-xl">(◕‿◕)</span>
        </h1>
      </div>

      {/* Activity */}
      <div className="mb-6">
        <div className="text-xs text-purple-300 mb-3">recent news! ★</div>
        {[
          { name: 'Emma', emoji: '🌟', text: 'is safe!', color: 'green' },
          { name: 'Sophie', emoji: '🌸', text: 'is out~', color: 'pink' }
        ].map((item, i) => (
          <div key={i} className={`bg-${item.color}-50 rounded-xl p-3 mb-2 border-2 border-${item.color}-200 border-dashed`}>
            <span className="text-lg mr-2">{item.emoji}</span>
            <span className="font-bold text-gray-700">{item.name}</span>
            <span className="text-gray-500"> {item.text}</span>
          </div>
        ))}
      </div>

      {/* Besties - Sticker collection */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { name: 'Emma', emoji: '🐰', color: 'pink' },
          { name: 'Sophie', emoji: '🐱', color: 'purple' },
          { name: 'Lily', emoji: '🐻', color: 'yellow' },
          { name: 'Mia', emoji: '🐼', color: 'green' }
        ].map((bestie, i) => (
          <div
            key={i}
            className={`bg-white rounded-2xl p-4 text-center border-4 border-dashed border-${bestie.color}-200 shadow-[3px_3px_0_0_#fecdd3]`}
          >
            <div className="text-3xl mb-2">{bestie.emoji}</div>
            <div className="font-bold text-gray-700">{bestie.name}</div>
            <div className="text-xs text-green-400">online ✓</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 5: Luxury Editorial
const BestiesPageLuxuryEditorial = () => (
  <div className="min-h-[700px]">
    {/* Hero */}
    <div className="bg-stone-900 p-8">
      <div className="text-stone-400 text-xs tracking-[0.5em] uppercase mb-2">Network</div>
      <h1 className="text-4xl text-white" style={{ fontFamily: 'Georgia, serif' }}>Besties</h1>
      <div className="w-16 h-px bg-white/30 mt-4"></div>
    </div>

    {/* Activity */}
    <div className="p-8 bg-stone-50">
      <div className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Recent Activity</div>
      {[
        { name: 'Emma', action: 'Arrived safely', time: '5 min' },
        { name: 'Sophie', action: 'Currently active', time: '20 min' }
      ].map((item, i) => (
        <div key={i} className="py-4 border-b border-stone-200">
          <div className="flex justify-between">
            <div>
              <span className="font-semibold text-stone-900">{item.name}</span>
              <span className="text-stone-500"> — {item.action}</span>
            </div>
            <span className="text-xs text-stone-400">{item.time}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Besties grid */}
    <div className="p-8 bg-white">
      <div className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Your Circle</div>
      <div className="grid grid-cols-4 gap-4">
        {['Emma', 'Sophie', 'Lily', 'Mia'].map((name, i) => (
          <div key={i} className="text-center">
            <div className="w-16 h-16 bg-stone-900 text-white mx-auto mb-3 flex items-center justify-center text-xl" style={{ fontFamily: 'Georgia, serif' }}>
              {name[0]}
            </div>
            <div className="text-xs tracking-[0.15em] uppercase text-stone-600">{name}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="h-1 bg-gradient-to-r from-stone-200 via-stone-900 to-stone-200"></div>
  </div>
);

// ============================================
// PROFILE PAGE VARIATIONS
// ============================================

const ProfilePageVariations = ({ variation }) => {
  switch (variation) {
    case 1: return <ProfilePageDreamyCloud />;
    case 2: return <ProfilePageNeonNights />;
    case 3: return <ProfilePageSwissMinimal />;
    case 4: return <ProfilePageKawaiiSticker />;
    case 5: return <ProfilePageLuxuryEditorial />;
    default: return <ProfilePageDreamyCloud />;
  }
};

// Variation 1: Dreamy Cloud
const ProfilePageDreamyCloud = () => (
  <div className="relative p-8 min-h-[700px] overflow-hidden" style={{ background: 'linear-gradient(180deg, #fff1f2 0%, #fdf2f8 50%, #faf5ff 100%)' }}>
    {/* Floating elements */}
    <div className="absolute top-10 right-10 w-40 h-20 bg-pink-100/50 rounded-full blur-xl"></div>
    <div className="absolute bottom-20 left-10 w-32 h-16 bg-purple-100/40 rounded-full blur-xl"></div>

    <div className="relative z-10">
      {/* Profile header */}
      <div className="text-center mb-10">
        <div className="relative inline-block mb-4">
          <div className="w-28 h-28 bg-gradient-to-br from-pink-200 via-purple-200 to-pink-200 rounded-full flex items-center justify-center text-4xl shadow-lg">
            S
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
            ✨
          </div>
        </div>
        <h1 className="text-2xl font-light text-gray-700 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Sarah Smith</h1>
        <p className="text-gray-400 italic text-sm">"floating through life safely"</p>
      </div>

      {/* Stats - Floating bubbles */}
      <div className="flex justify-center gap-6 mb-10">
        {[
          { num: '5', label: 'besties' },
          { num: '12', label: 'check-ins' },
          { num: '7', label: 'streak' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md mb-1">
              <span className="text-xl font-light text-pink-400">{stat.num}</span>
            </div>
            <span className="text-xs text-gray-400">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="bg-white/60 backdrop-blur-sm rounded-[1.5rem] p-6 shadow-sm">
        <div className="text-xs text-purple-300 uppercase tracking-widest mb-4">achievements</div>
        <div className="flex justify-center gap-4">
          {['🛡️', '⭐', '🔥'].map((badge, i) => (
            <div key={i} className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center text-xl shadow-sm">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Variation 2: Neon Nights
const ProfilePageNeonNights = () => (
  <div className="p-8 min-h-[700px] bg-gray-900 relative overflow-hidden">
    {/* Glow effects */}
    <div className="absolute top-0 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

    <div className="relative z-10">
      {/* Profile header */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="w-28 h-28 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center text-4xl text-white font-black shadow-[0_0_30px_rgba(236,72,153,0.5)]">
            S
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-400 rounded flex items-center justify-center text-sm font-bold">
            7
          </div>
        </div>
        <h1 className="text-3xl font-black text-white">SARAH</h1>
        <p className="text-gray-400 font-mono text-sm">// status: protected</p>
      </div>

      {/* Stats - Terminal style */}
      <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700 font-mono mb-8">
        <div className="text-gray-500 text-xs mb-3">$ stats --profile</div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { num: '5', label: 'connections', color: 'pink' },
            { num: '12', label: 'check_ins', color: 'green' },
            { num: '7', label: 'streak', color: 'yellow' }
          ].map((stat, i) => (
            <div key={i}>
              <div className={`text-${stat.color}-400 text-2xl font-bold`}>{stat.num}</div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
        <div className="text-cyan-400 text-xs font-mono mb-3">[ ACHIEVEMENTS ]</div>
        <div className="flex justify-center gap-3">
          {['🛡️', '⭐', '🔥'].map((badge, i) => (
            <div key={i} className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-xl hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-shadow">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Variation 3: Swiss Minimal
const ProfilePageSwissMinimal = () => (
  <div className="min-h-[700px] bg-white">
    <div className="h-2 bg-black"></div>

    <div className="p-8">
      {/* Profile header */}
      <div className="mb-12">
        <div className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8">Profile / Sarah</div>
        <div className="flex items-end gap-6 mb-6">
          <div className="w-20 h-20 bg-black text-white flex items-center justify-center text-3xl font-black">
            S
          </div>
          <div>
            <h1 className="text-4xl font-black text-black leading-none">Sarah</h1>
            <h1 className="text-4xl font-black text-black leading-none">Smith.</h1>
          </div>
        </div>
        <div className="w-12 h-1 bg-black"></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 border-t-2 border-black pt-8 mb-12">
        {[
          { num: '05', label: 'Besties' },
          { num: '12', label: 'Check-ins' },
          { num: '07', label: 'Streak' }
        ].map((stat, i) => (
          <div key={i} className={`${i > 0 ? 'border-l-2 border-black pl-6' : ''}`}>
            <div className="text-3xl font-black text-black">{stat.num}</div>
            <div className="text-xs uppercase tracking-widest text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">Badges</div>
        <div className="flex gap-2">
          {['🛡️', '⭐', '🔥'].map((badge, i) => (
            <div key={i} className="w-12 h-12 bg-gray-100 flex items-center justify-center text-xl">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Variation 4: Kawaii Sticker
const ProfilePageKawaiiSticker = () => (
  <div className="p-6 min-h-[700px] relative" style={{ background: '#fff5f5' }}>
    {/* Doodles */}
    <div className="absolute top-4 right-4 text-3xl transform rotate-12">🌟</div>
    <div className="absolute bottom-32 left-4 text-2xl transform -rotate-6">✿</div>

    <div className="relative z-10">
      {/* Profile header */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 bg-pink-100 rounded-full border-4 border-dashed border-pink-300 flex items-center justify-center text-3xl shadow-[3px_3px_0_0_#fecdd3]">
            🌸
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-100 rounded-full border-2 border-dashed border-yellow-300 flex items-center justify-center text-sm">
            7✨
          </div>
        </div>
        <h1 className="text-2xl font-black text-gray-800 mb-1">
          Sarah~ <span className="text-xl">(｡◕‿◕｡)</span>
        </h1>
        <p className="text-gray-500 text-sm">staying safe & cute! ♪</p>
      </div>

      {/* Stats - Badge stickers */}
      <div className="flex justify-center gap-3 mb-8">
        {[
          { num: '5', label: 'besties', color: 'pink' },
          { num: '12', label: 'safe!', color: 'green' },
          { num: '7', label: 'streak', color: 'yellow' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className={`w-14 h-14 bg-${stat.color}-50 rounded-full border-4 border-dashed border-${stat.color}-200 flex items-center justify-center shadow-sm`}>
              <span className={`text-lg font-black text-${stat.color}-400`}>{stat.num}</span>
            </div>
            <span className="text-xs text-gray-400">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl p-4 border-4 border-dashed border-pink-200 shadow-[3px_3px_0_0_#fecdd3]">
        <div className="text-xs text-pink-300 mb-3">★ achievements ★</div>
        <div className="flex justify-center gap-3">
          {['🛡️', '⭐', '🔥'].map((badge, i) => (
            <div key={i} className="w-10 h-10 bg-yellow-50 rounded-full border-2 border-dashed border-yellow-200 flex items-center justify-center text-lg">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Variation 5: Luxury Editorial
const ProfilePageLuxuryEditorial = () => (
  <div className="min-h-[700px]">
    {/* Hero */}
    <div className="relative h-64 bg-stone-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-white text-stone-900 mx-auto mb-4 flex items-center justify-center text-3xl" style={{ fontFamily: 'Georgia, serif' }}>
          S
        </div>
        <h1 className="text-3xl text-white" style={{ fontFamily: 'Georgia, serif' }}>Sarah Smith</h1>
        <div className="w-12 h-px bg-white/30 mx-auto mt-4"></div>
      </div>
    </div>

    {/* Stats */}
    <div className="p-8 bg-white border-t border-stone-100">
      <div className="grid grid-cols-3 gap-px">
        {[
          { num: '5', label: 'Connections' },
          { num: '12', label: 'Check-ins' },
          { num: '7', label: 'Streak' }
        ].map((stat, i) => (
          <div key={i} className="text-center py-4">
            <div className="text-3xl text-stone-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>{stat.num}</div>
            <div className="text-xs tracking-[0.2em] uppercase text-stone-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Badges */}
    <div className="p-8 bg-stone-50">
      <div className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Achievements</div>
      <div className="flex gap-4">
        {['🛡️', '⭐', '🔥'].map((badge, i) => (
          <div key={i} className="w-14 h-14 bg-stone-900 text-white flex items-center justify-center text-xl">
            {badge}
          </div>
        ))}
      </div>
    </div>

    <div className="h-1 bg-gradient-to-r from-stone-200 via-stone-900 to-stone-200"></div>
  </div>
);

export default PageDesignVariations;
