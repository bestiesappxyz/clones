import React, { useState } from 'react';
import Header from '../components/Header';

// Design variation showcase for HomePage, BestiesPage, and ProfilePage
// Each variation has distinct visual styling while maintaining consistent messaging

const PageDesignVariations = () => {
  const [activePage, setActivePage] = useState('home');
  const [activeVariation, setActiveVariation] = useState(1);

  const pages = [
    { id: 'home', name: 'HomePage', icon: '🏠' },
    { id: 'besties', name: 'BestiesPage', icon: '💜' },
    { id: 'profile', name: 'ProfilePage', icon: '👤' },
  ];

  const variations = [
    { id: 1, name: 'Dreamy Cloud', description: 'Soft gradients, floating elements, ethereal feel' },
    { id: 2, name: 'Dark Mode', description: 'Sleek dark theme with colorful accents' },
    { id: 3, name: 'Clean Modern', description: 'Lots of whitespace, clean typography' },
    { id: 4, name: 'Playful Pop', description: 'Fun colors, rounded shapes, sticker-like elements' },
    { id: 5, name: 'Elegant', description: 'Sophisticated feel, refined typography' },
  ];

  return (
    <div className="min-h-screen bg-pattern">
      <Header />

      <div className="max-w-6xl mx-auto p-4 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display text-gradient mb-4">Page Design Variations</h1>
          <p className="text-text-secondary">5 visual themes for each page</p>
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
    case 2: return <HomePageDarkMode />;
    case 3: return <HomePageCleanModern />;
    case 4: return <HomePagePlayfulPop />;
    case 5: return <HomePageElegant />;
    default: return <HomePageDreamyCloud />;
  }
};

// Variation 1: Dreamy Cloud - Soft and ethereal
const HomePageDreamyCloud = () => (
  <div className="relative p-8 min-h-[600px] overflow-hidden" style={{ background: 'linear-gradient(180deg, #fef7ff 0%, #fdf4ff 50%, #fae8ff 100%)' }}>
    {/* Floating decorations */}
    <div className="absolute top-10 left-10 w-32 h-16 bg-white/60 rounded-full blur-xl"></div>
    <div className="absolute top-20 right-8 w-24 h-12 bg-pink-100/60 rounded-full blur-xl"></div>
    <div className="absolute bottom-32 left-16 w-40 h-20 bg-purple-100/50 rounded-full blur-2xl"></div>

    <div className="relative z-10">
      {/* Welcome */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <h1 className="text-3xl font-display text-gray-700 mb-2">
            Hey Sarah! 👋
          </h1>
          <p className="text-gray-500">Your besties have your back! 💜</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {['15 min', '30 min', '1 hour'].map((time, i) => (
          <button key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md hover:shadow-lg transition-all">
            <div className="text-xl mb-2">{['⚡', '☕', '🌟'][i]}</div>
            <div className="text-sm font-semibold text-gray-600">{time}</div>
          </button>
        ))}
      </div>

      {/* Main CTA */}
      <button className="w-full py-4 bg-gradient-to-r from-pink-300 to-purple-300 rounded-2xl text-white font-semibold shadow-lg mb-6">
        ✨ Create Custom Check-In
      </button>

      {/* Stats */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md">
        <h3 className="font-display text-gray-700 mb-3">Your Safety Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { num: '12', label: 'Safe Check-ins' },
            { num: '5', label: 'Besties' },
            { num: '0', label: 'Active Now' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-display text-pink-500">{stat.num}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Variation 2: Dark Mode - Sleek and modern
const HomePageDarkMode = () => (
  <div className="p-8 min-h-[600px] bg-gray-900">
    {/* Welcome */}
    <div className="mb-8">
      <h1 className="text-3xl font-display text-white mb-2">
        Hey Sarah! 👋
      </h1>
      <p className="text-gray-400">Your besties have your back! 💜</p>
    </div>

    {/* Quick actions */}
    <div className="grid grid-cols-3 gap-3 mb-6">
      {['15 min', '30 min', '1 hour'].map((time, i) => (
        <button key={i} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-pink-500/50 transition-all">
          <div className="text-xl mb-2">{['⚡', '☕', '🌟'][i]}</div>
          <div className="text-sm font-semibold text-gray-300">{time}</div>
        </button>
      ))}
    </div>

    {/* Main CTA */}
    <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-white font-semibold mb-6">
      ✨ Create Custom Check-In
    </button>

    {/* Stats */}
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
      <h3 className="font-display text-white mb-3">Your Safety Stats</h3>
      <div className="grid grid-cols-3 gap-4">
        {[
          { num: '12', label: 'Safe Check-ins', color: 'pink' },
          { num: '5', label: 'Besties', color: 'purple' },
          { num: '0', label: 'Active Now', color: 'cyan' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className={`text-2xl font-display text-${stat.color}-400`}>{stat.num}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 3: Clean Modern - Minimal and spacious
const HomePageCleanModern = () => (
  <div className="p-10 min-h-[600px] bg-gray-50">
    {/* Welcome */}
    <div className="mb-10">
      <h1 className="text-3xl font-display text-gray-800 mb-2">
        Hey Sarah! 👋
      </h1>
      <p className="text-gray-500">Your besties have your back! 💜</p>
    </div>

    {/* Quick actions */}
    <div className="flex gap-4 mb-8">
      {['15 min', '30 min', '1 hour'].map((time, i) => (
        <button key={i} className="flex-1 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <div className="text-xl mb-2">{['⚡', '☕', '🌟'][i]}</div>
          <div className="text-sm font-semibold text-gray-700">{time}</div>
        </button>
      ))}
    </div>

    {/* Main CTA */}
    <button className="w-full py-4 bg-gray-900 rounded-xl text-white font-semibold mb-8">
      ✨ Create Custom Check-In
    </button>

    {/* Stats */}
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-display text-gray-800 mb-4">Your Safety Stats</h3>
      <div className="grid grid-cols-3 gap-4">
        {[
          { num: '12', label: 'Safe Check-ins' },
          { num: '5', label: 'Besties' },
          { num: '0', label: 'Active Now' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl font-display text-gray-800">{stat.num}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 4: Playful Pop - Fun and energetic
const HomePagePlayfulPop = () => (
  <div className="p-6 min-h-[600px] bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
    {/* Welcome */}
    <div className="mb-6">
      <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-pink-200">
        <h1 className="text-3xl font-display text-gray-800 mb-2">
          Hey Sarah! 👋
        </h1>
        <p className="text-gray-600">Your besties have your back! 💜</p>
      </div>
    </div>

    {/* Quick actions */}
    <div className="space-y-3 mb-6">
      {[
        { time: '15 min', emoji: '⚡', color: 'pink' },
        { time: '30 min', emoji: '☕', color: 'purple' },
        { time: '1 hour', emoji: '🌟', color: 'blue' }
      ].map((item, i) => (
        <button
          key={i}
          className={`w-full flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md border-2 border-${item.color}-200 hover:border-${item.color}-400 transition-all`}
        >
          <span className="text-2xl">{item.emoji}</span>
          <span className="font-semibold text-gray-700">{item.time}</span>
        </button>
      ))}
    </div>

    {/* Main CTA */}
    <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl text-white font-bold shadow-lg mb-6">
      ✨ Create Custom Check-In
    </button>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-3">
      {[
        { num: '12', label: 'Safe', color: 'pink' },
        { num: '5', label: 'Besties', color: 'purple' },
        { num: '0', label: 'Active', color: 'blue' }
      ].map((stat, i) => (
        <div key={i} className={`bg-white rounded-2xl p-4 text-center shadow-md border-2 border-${stat.color}-200`}>
          <div className={`text-2xl font-display text-${stat.color}-500`}>{stat.num}</div>
          <div className="text-xs text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

// Variation 5: Elegant - Sophisticated and refined
const HomePageElegant = () => (
  <div className="min-h-[600px]">
    {/* Hero */}
    <div className="bg-gradient-to-br from-stone-100 to-stone-200 p-8">
      <h1 className="text-3xl font-display text-stone-800 mb-2">
        Hey Sarah! 👋
      </h1>
      <p className="text-stone-600">Your besties have your back! 💜</p>
    </div>

    {/* Quick actions */}
    <div className="p-8 bg-white">
      <div className="grid grid-cols-3 gap-4">
        {['15 min', '30 min', '1 hour'].map((time, i) => (
          <button key={i} className="py-6 bg-stone-50 rounded-xl border border-stone-200 hover:border-stone-400 transition-all">
            <div className="text-xl mb-2">{['⚡', '☕', '🌟'][i]}</div>
            <div className="text-sm font-semibold text-stone-700">{time}</div>
          </button>
        ))}
      </div>
    </div>

    {/* Main CTA */}
    <div className="px-8 pb-8 bg-white">
      <button className="w-full py-4 bg-stone-900 rounded-xl text-white font-semibold">
        ✨ Create Custom Check-In
      </button>
    </div>

    {/* Stats */}
    <div className="p-8 bg-stone-50 border-t border-stone-200">
      <h3 className="font-display text-stone-800 mb-4">Your Safety Stats</h3>
      <div className="grid grid-cols-3 gap-4">
        {[
          { num: '12', label: 'Safe Check-ins' },
          { num: '5', label: 'Besties' },
          { num: '0', label: 'Active Now' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl font-display text-stone-800">{stat.num}</div>
            <div className="text-xs text-stone-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ============================================
// BESTIES PAGE VARIATIONS
// ============================================

const BestiesPageVariations = ({ variation }) => {
  switch (variation) {
    case 1: return <BestiesPageDreamyCloud />;
    case 2: return <BestiesPageDarkMode />;
    case 3: return <BestiesPageCleanModern />;
    case 4: return <BestiesPagePlayfulPop />;
    case 5: return <BestiesPageElegant />;
    default: return <BestiesPageDreamyCloud />;
  }
};

// Variation 1: Dreamy Cloud
const BestiesPageDreamyCloud = () => (
  <div className="relative p-8 min-h-[600px] overflow-hidden" style={{ background: 'linear-gradient(180deg, #f5f3ff 0%, #faf5ff 50%, #fdf4ff 100%)' }}>
    <div className="absolute top-16 right-8 w-24 h-12 bg-purple-100/60 rounded-full blur-xl"></div>
    <div className="absolute bottom-24 left-12 w-32 h-16 bg-pink-100/50 rounded-full blur-xl"></div>

    <div className="relative z-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display text-gray-700 mb-1">💜 Your Besties</h1>
        <p className="text-gray-500">Your safety squad activity hub</p>
      </div>

      {/* Activity */}
      <div className="mb-6">
        <h2 className="text-lg font-display text-gray-700 mb-3">📰 Activity Feed</h2>
        {[
          { name: 'Emma', action: 'completed check-in safely ✅', time: '5 min ago' },
          { name: 'Sophie', action: 'is currently checked in 🔔', time: '15 min ago' }
        ].map((item, i) => (
          <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-3 shadow-sm">
            <div className="font-semibold text-gray-700">
              <span className="text-pink-500">{item.name}</span> {item.action}
            </div>
            <div className="text-sm text-gray-500">{item.time}</div>
          </div>
        ))}
      </div>

      {/* Besties grid */}
      <div className="grid grid-cols-2 gap-3">
        {['Emma', 'Sophie', 'Lily', 'Mia'].map((name, i) => (
          <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mx-auto mb-2 flex items-center justify-center text-lg">
              {name[0]}
            </div>
            <div className="font-semibold text-gray-700 text-sm">{name}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 2: Dark Mode
const BestiesPageDarkMode = () => (
  <div className="p-8 min-h-[600px] bg-gray-900">
    {/* Header */}
    <div className="mb-6">
      <h1 className="text-2xl font-display text-white mb-1">💜 Your Besties</h1>
      <p className="text-gray-400">Your safety squad activity hub</p>
    </div>

    {/* Activity */}
    <div className="mb-6">
      <h2 className="text-lg font-display text-white mb-3">📰 Activity Feed</h2>
      {[
        { name: 'Emma', action: 'completed check-in safely ✅', time: '5 min ago' },
        { name: 'Sophie', action: 'is currently checked in 🔔', time: '15 min ago' }
      ].map((item, i) => (
        <div key={i} className="bg-gray-800 rounded-xl p-4 mb-3 border border-gray-700">
          <div className="font-semibold text-gray-200">
            <span className="text-pink-400">{item.name}</span> {item.action}
          </div>
          <div className="text-sm text-gray-500">{item.time}</div>
        </div>
      ))}
    </div>

    {/* Besties grid */}
    <div className="grid grid-cols-2 gap-3">
      {['Emma', 'Sophie', 'Lily', 'Mia'].map((name, i) => (
        <div key={i} className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
            {name[0]}
          </div>
          <div className="font-semibold text-gray-200 text-sm">{name}</div>
        </div>
      ))}
    </div>
  </div>
);

// Variation 3: Clean Modern
const BestiesPageCleanModern = () => (
  <div className="p-10 min-h-[600px] bg-gray-50">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-2xl font-display text-gray-800 mb-1">💜 Your Besties</h1>
      <p className="text-gray-500">Your safety squad activity hub</p>
    </div>

    {/* Activity */}
    <div className="mb-8">
      <h2 className="text-lg font-display text-gray-800 mb-4">📰 Activity Feed</h2>
      {[
        { name: 'Emma', action: 'completed check-in safely ✅', time: '5 min ago' },
        { name: 'Sophie', action: 'is currently checked in 🔔', time: '15 min ago' }
      ].map((item, i) => (
        <div key={i} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
          <div className="font-semibold text-gray-700">
            <span className="text-pink-600">{item.name}</span> {item.action}
          </div>
          <div className="text-sm text-gray-500">{item.time}</div>
        </div>
      ))}
    </div>

    {/* Besties grid */}
    <div className="grid grid-cols-2 gap-4">
      {['Emma', 'Sophie', 'Lily', 'Mia'].map((name, i) => (
        <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center text-gray-700 font-bold">
            {name[0]}
          </div>
          <div className="font-semibold text-gray-700 text-sm">{name}</div>
        </div>
      ))}
    </div>
  </div>
);

// Variation 4: Playful Pop
const BestiesPagePlayfulPop = () => (
  <div className="p-6 min-h-[600px] bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
    {/* Header */}
    <div className="mb-6">
      <div className="bg-white rounded-3xl p-4 shadow-lg border-4 border-purple-200 inline-block mb-2">
        <h1 className="text-2xl font-display text-gray-800">💜 Your Besties</h1>
      </div>
      <p className="text-gray-600">Your safety squad activity hub</p>
    </div>

    {/* Activity */}
    <div className="mb-6">
      <h2 className="text-lg font-display text-gray-700 mb-3">📰 Activity Feed</h2>
      {[
        { name: 'Emma', action: 'completed check-in safely ✅', time: '5 min ago', color: 'green' },
        { name: 'Sophie', action: 'is currently checked in 🔔', time: '15 min ago', color: 'blue' }
      ].map((item, i) => (
        <div key={i} className={`bg-white rounded-2xl p-4 mb-3 shadow-md border-2 border-${item.color}-200`}>
          <div className="font-semibold text-gray-700">
            <span className="text-pink-500">{item.name}</span> {item.action}
          </div>
          <div className="text-sm text-gray-500">{item.time}</div>
        </div>
      ))}
    </div>

    {/* Besties grid */}
    <div className="grid grid-cols-2 gap-3">
      {[
        { name: 'Emma', color: 'pink' },
        { name: 'Sophie', color: 'purple' },
        { name: 'Lily', color: 'blue' },
        { name: 'Mia', color: 'green' }
      ].map((bestie, i) => (
        <div key={i} className={`bg-white rounded-2xl p-4 text-center shadow-md border-2 border-${bestie.color}-200`}>
          <div className={`w-12 h-12 bg-gradient-to-br from-${bestie.color}-300 to-${bestie.color}-400 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold`}>
            {bestie.name[0]}
          </div>
          <div className="font-semibold text-gray-700 text-sm">{bestie.name}</div>
        </div>
      ))}
    </div>
  </div>
);

// Variation 5: Elegant
const BestiesPageElegant = () => (
  <div className="min-h-[600px]">
    {/* Header */}
    <div className="bg-gradient-to-br from-stone-100 to-stone-200 p-8">
      <h1 className="text-2xl font-display text-stone-800 mb-1">💜 Your Besties</h1>
      <p className="text-stone-600">Your safety squad activity hub</p>
    </div>

    {/* Activity */}
    <div className="p-8 bg-white">
      <h2 className="text-lg font-display text-stone-800 mb-4">📰 Activity Feed</h2>
      {[
        { name: 'Emma', action: 'completed check-in safely ✅', time: '5 min ago' },
        { name: 'Sophie', action: 'is currently checked in 🔔', time: '15 min ago' }
      ].map((item, i) => (
        <div key={i} className="py-4 border-b border-stone-100">
          <div className="font-semibold text-stone-700">
            <span className="text-stone-900">{item.name}</span> {item.action}
          </div>
          <div className="text-sm text-stone-500">{item.time}</div>
        </div>
      ))}
    </div>

    {/* Besties grid */}
    <div className="p-8 bg-stone-50">
      <div className="grid grid-cols-4 gap-4">
        {['Emma', 'Sophie', 'Lily', 'Mia'].map((name, i) => (
          <div key={i} className="text-center">
            <div className="w-14 h-14 bg-stone-800 text-white mx-auto mb-2 rounded-full flex items-center justify-center text-lg font-semibold">
              {name[0]}
            </div>
            <div className="font-semibold text-stone-700 text-sm">{name}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ============================================
// PROFILE PAGE VARIATIONS
// ============================================

const ProfilePageVariations = ({ variation }) => {
  switch (variation) {
    case 1: return <ProfilePageDreamyCloud />;
    case 2: return <ProfilePageDarkMode />;
    case 3: return <ProfilePageCleanModern />;
    case 4: return <ProfilePagePlayfulPop />;
    case 5: return <ProfilePageElegant />;
    default: return <ProfilePageDreamyCloud />;
  }
};

// Variation 1: Dreamy Cloud
const ProfilePageDreamyCloud = () => (
  <div className="relative p-8 min-h-[600px] overflow-hidden" style={{ background: 'linear-gradient(180deg, #fff1f2 0%, #fdf2f8 50%, #faf5ff 100%)' }}>
    <div className="absolute top-10 right-10 w-32 h-16 bg-pink-100/50 rounded-full blur-xl"></div>
    <div className="absolute bottom-20 left-10 w-24 h-12 bg-purple-100/40 rounded-full blur-xl"></div>

    <div className="relative z-10">
      {/* Profile header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl shadow-lg">
          S
        </div>
        <h1 className="text-2xl font-display text-gray-700 mb-1">Sarah Smith</h1>
        <p className="text-gray-500 italic text-sm">"Living my best life safely"</p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6 mb-8">
        {[
          { num: '5', label: 'Besties' },
          { num: '12', label: 'Check-ins' },
          { num: '3', label: 'Badges' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="w-14 h-14 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md mb-1">
              <span className="text-xl font-display text-pink-500">{stat.num}</span>
            </div>
            <span className="text-xs text-gray-500">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-sm">
        <h2 className="font-display text-gray-700 mb-3">Featured Badges</h2>
        <div className="flex justify-center gap-3">
          {['🛡️', '⭐', '🔥'].map((badge, i) => (
            <div key={i} className="w-11 h-11 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center text-lg shadow-sm">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Variation 2: Dark Mode
const ProfilePageDarkMode = () => (
  <div className="p-8 min-h-[600px] bg-gray-900">
    {/* Profile header */}
    <div className="text-center mb-8">
      <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl text-white font-bold">
        S
      </div>
      <h1 className="text-2xl font-display text-white mb-1">Sarah Smith</h1>
      <p className="text-gray-400 italic text-sm">"Living my best life safely"</p>
    </div>

    {/* Stats */}
    <div className="bg-gray-800 rounded-xl p-5 mb-6 border border-gray-700">
      <div className="grid grid-cols-3 gap-4">
        {[
          { num: '5', label: 'Besties', color: 'pink' },
          { num: '12', label: 'Check-ins', color: 'green' },
          { num: '3', label: 'Badges', color: 'yellow' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className={`text-2xl font-display text-${stat.color}-400`}>{stat.num}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Badges */}
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
      <h2 className="font-display text-white mb-3">Featured Badges</h2>
      <div className="flex justify-center gap-3">
        {['🛡️', '⭐', '🔥'].map((badge, i) => (
          <div key={i} className="w-11 h-11 bg-gray-700 rounded-full flex items-center justify-center text-lg">
            {badge}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 3: Clean Modern
const ProfilePageCleanModern = () => (
  <div className="p-10 min-h-[600px] bg-gray-50">
    {/* Profile header */}
    <div className="text-center mb-10">
      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl text-gray-600">
        S
      </div>
      <h1 className="text-xl font-display text-gray-800 mb-1">Sarah Smith</h1>
      <p className="text-gray-500 text-sm">"Living my best life safely"</p>
    </div>

    {/* Stats */}
    <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
      <div className="grid grid-cols-3 gap-4">
        {[
          { num: '5', label: 'Besties' },
          { num: '12', label: 'Check-ins' },
          { num: '3', label: 'Badges' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl font-display text-gray-800">{stat.num}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Badges */}
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h2 className="font-display text-gray-800 mb-3">Featured Badges</h2>
      <div className="flex justify-center gap-3">
        {['🛡️', '⭐', '🔥'].map((badge, i) => (
          <div key={i} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
            {badge}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 4: Playful Pop
const ProfilePagePlayfulPop = () => (
  <div className="p-6 min-h-[600px] bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
    {/* Profile header */}
    <div className="text-center mb-6">
      <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-pink-200 inline-block">
        <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl text-white font-bold">
          S
        </div>
        <h1 className="text-xl font-display text-gray-800 mb-1">Sarah Smith</h1>
        <p className="text-gray-600 text-sm">"Living my best life safely"</p>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[
        { num: '5', label: 'Besties', color: 'pink' },
        { num: '12', label: 'Check-ins', color: 'green' },
        { num: '3', label: 'Badges', color: 'purple' }
      ].map((stat, i) => (
        <div key={i} className={`bg-white rounded-2xl p-4 text-center shadow-md border-2 border-${stat.color}-200`}>
          <div className={`text-2xl font-display text-${stat.color}-500`}>{stat.num}</div>
          <div className="text-xs text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>

    {/* Badges */}
    <div className="bg-white rounded-2xl p-5 shadow-md border-2 border-yellow-200">
      <h2 className="font-display text-gray-700 mb-3">Featured Badges</h2>
      <div className="flex justify-center gap-3">
        {['🛡️', '⭐', '🔥'].map((badge, i) => (
          <div key={i} className="w-10 h-10 bg-yellow-50 rounded-full border-2 border-yellow-200 flex items-center justify-center text-lg">
            {badge}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 5: Elegant
const ProfilePageElegant = () => (
  <div className="min-h-[600px]">
    {/* Hero */}
    <div className="bg-gradient-to-br from-stone-100 to-stone-200 p-8 text-center">
      <div className="w-20 h-20 bg-stone-800 text-white mx-auto mb-3 rounded-full flex items-center justify-center text-2xl font-semibold">
        S
      </div>
      <h1 className="text-xl font-display text-stone-800 mb-1">Sarah Smith</h1>
      <p className="text-stone-600 text-sm">"Living my best life safely"</p>
    </div>

    {/* Stats */}
    <div className="p-8 bg-white">
      <div className="grid grid-cols-3 gap-4">
        {[
          { num: '5', label: 'Besties' },
          { num: '12', label: 'Check-ins' },
          { num: '3', label: 'Badges' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl font-display text-stone-800">{stat.num}</div>
            <div className="text-xs text-stone-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Badges */}
    <div className="p-8 bg-stone-50">
      <h2 className="font-display text-stone-800 mb-4">Featured Badges</h2>
      <div className="flex gap-3">
        {['🛡️', '⭐', '🔥'].map((badge, i) => (
          <div key={i} className="w-12 h-12 bg-stone-800 text-white rounded-full flex items-center justify-center text-lg">
            {badge}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PageDesignVariations;
