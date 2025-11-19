import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

// Design variation showcase for HomePage, BestiesPage, and ProfilePage
// 5 themes: Soft Pastel, Bold Vibrant, Minimal Clean, Playful Cards, Magazine Editorial

const PageDesignVariations = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('home');
  const [activeVariation, setActiveVariation] = useState(1);

  const pages = [
    { id: 'home', name: 'HomePage', icon: '🏠' },
    { id: 'besties', name: 'BestiesPage', icon: '💜' },
    { id: 'profile', name: 'ProfilePage', icon: '👤' },
  ];

  const variations = [
    { id: 1, name: 'Soft Pastel Dream', description: 'Light gradients, extra rounded, lots of white space' },
    { id: 2, name: 'Bold Vibrant', description: 'Saturated pinks/purples, high contrast, bigger text' },
    { id: 3, name: 'Minimal Clean', description: 'Simplified layout, breathing room, subtle accents' },
    { id: 4, name: 'Playful Cards', description: 'Heavy card use, layered effects, playful spacing' },
    { id: 5, name: 'Magazine Editorial', description: 'Split panels, bold typography, structured grid' },
  ];

  return (
    <div className="min-h-screen bg-pattern">
      <Header />

      <div className="max-w-6xl mx-auto p-4 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display text-gradient mb-4">Page Design Variations</h1>
          <p className="text-text-secondary">Explore 5 visual themes for each page</p>
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
          {/* HomePage Variations */}
          {activePage === 'home' && <HomePageVariations variation={activeVariation} />}

          {/* BestiesPage Variations */}
          {activePage === 'besties' && <BestiesPageVariations variation={activeVariation} />}

          {/* ProfilePage Variations */}
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
    case 1:
      return <HomePageSoftPastel />;
    case 2:
      return <HomePageBoldVibrant />;
    case 3:
      return <HomePageMinimalClean />;
    case 4:
      return <HomePagePlayfulCards />;
    case 5:
      return <HomePageMagazine />;
    default:
      return <HomePageSoftPastel />;
  }
};

// Variation 1: Soft Pastel Dream
const HomePageSoftPastel = () => (
  <div className="p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-[600px]">
    {/* Welcome Section */}
    <div className="mb-8 animate-fade-in">
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-sm">
        <h1 className="text-4xl font-display text-gray-700 mb-3">
          Hey Sarah! 👋
        </h1>
        <p className="text-lg text-gray-500">
          Your besties have your back! 💜
        </p>
      </div>
    </div>

    {/* Quick Buttons */}
    <div className="grid grid-cols-3 gap-4 mb-8">
      {['15 min', '30 min', '1 hour'].map((time, i) => (
        <button
          key={i}
          className="py-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all border border-pink-100"
        >
          <div className="text-2xl mb-2">{['⚡', '☕', '🌟'][i]}</div>
          <div className="text-sm font-semibold text-gray-600">{time}</div>
        </button>
      ))}
    </div>

    {/* Main CTA */}
    <button className="w-full py-5 bg-gradient-to-r from-pink-200 to-purple-200 rounded-2xl font-semibold text-gray-700 shadow-sm hover:shadow-md transition-all mb-8">
      ✨ Create Custom Check-In
    </button>

    {/* Stats Card */}
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm">
      <h3 className="font-display text-lg text-gray-700 mb-4">Your Safety Stats</h3>
      <div className="grid grid-cols-3 gap-4">
        {[
          { num: '12', label: 'Safe Check-ins', color: 'pink' },
          { num: '5', label: 'Besties', color: 'purple' },
          { num: '0', label: 'Active Now', color: 'blue' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className={`text-3xl font-display text-${stat.color}-400`}>{stat.num}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 2: Bold Vibrant
const HomePageBoldVibrant = () => (
  <div className="p-8 bg-gradient-to-br from-fuchsia-600 via-purple-600 to-pink-600 min-h-[600px]">
    {/* Welcome Section */}
    <div className="mb-8">
      <h1 className="text-5xl font-black text-white mb-3 drop-shadow-lg">
        Hey Sarah! 👋
      </h1>
      <p className="text-xl text-pink-100 font-semibold">
        Your besties have your back! 💜
      </p>
    </div>

    {/* Quick Buttons */}
    <div className="grid grid-cols-3 gap-4 mb-8">
      {['15 min', '30 min', '1 hour'].map((time, i) => (
        <button
          key={i}
          className="py-6 bg-white rounded-2xl shadow-xl hover:scale-105 transition-transform border-4 border-pink-300"
        >
          <div className="text-3xl mb-2">{['⚡', '☕', '🌟'][i]}</div>
          <div className="text-sm font-black text-fuchsia-600">{time}</div>
        </button>
      ))}
    </div>

    {/* Main CTA */}
    <button className="w-full py-6 bg-yellow-400 rounded-2xl font-black text-xl text-gray-900 shadow-xl hover:scale-105 transition-transform mb-8">
      ✨ CREATE CHECK-IN
    </button>

    {/* Stats Card */}
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-pink-300">
      <h3 className="font-black text-xl text-fuchsia-600 mb-4">YOUR STATS</h3>
      <div className="grid grid-cols-3 gap-4">
        {[
          { num: '12', label: 'Check-ins', color: 'pink' },
          { num: '5', label: 'Besties', color: 'purple' },
          { num: '0', label: 'Active', color: 'fuchsia' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className={`text-4xl font-black text-${stat.color}-600`}>{stat.num}</div>
            <div className="text-xs font-bold text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 3: Minimal Clean
const HomePageMinimalClean = () => (
  <div className="p-12 bg-gray-50 min-h-[600px]">
    {/* Welcome Section */}
    <div className="mb-12">
      <h1 className="text-3xl font-light text-gray-800 mb-2">
        Hey Sarah
      </h1>
      <p className="text-gray-400">
        Your besties have your back
      </p>
    </div>

    {/* Quick Buttons */}
    <div className="flex gap-6 mb-12">
      {['15m', '30m', '1h'].map((time, i) => (
        <button
          key={i}
          className="flex-1 py-8 bg-white rounded-xl hover:shadow-md transition-shadow"
        >
          <div className="text-sm text-gray-400 mb-1">{['Quick', 'Medium', 'Long'][i]}</div>
          <div className="text-lg font-semibold text-gray-700">{time}</div>
        </button>
      ))}
    </div>

    {/* Main CTA */}
    <button className="w-full py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors mb-12">
      Create Check-In
    </button>

    {/* Stats */}
    <div className="border-t pt-8">
      <div className="flex justify-between">
        {[
          { num: '12', label: 'Check-ins' },
          { num: '5', label: 'Besties' },
          { num: '0', label: 'Active' }
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-2xl font-semibold text-gray-800">{stat.num}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 4: Playful Cards
const HomePagePlayfulCards = () => (
  <div className="p-8 bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 min-h-[600px]">
    {/* Welcome Card */}
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-pink-200 rounded-3xl transform rotate-2"></div>
      <div className="absolute inset-0 bg-purple-200 rounded-3xl transform -rotate-1"></div>
      <div className="relative bg-white rounded-3xl p-6 shadow-lg">
        <h1 className="text-3xl font-display text-gray-800 mb-2">
          Hey Sarah! 👋
        </h1>
        <p className="text-gray-600">
          Your besties have your back! 💜
        </p>
      </div>
    </div>

    {/* Quick Buttons - Staggered */}
    <div className="space-y-3 mb-8">
      {[
        { time: '15 min', emoji: '⚡', color: 'pink', rotate: '1deg' },
        { time: '30 min', emoji: '☕', color: 'purple', rotate: '-1deg' },
        { time: '1 hour', emoji: '🌟', color: 'blue', rotate: '0.5deg' }
      ].map((item, i) => (
        <button
          key={i}
          className={`w-full py-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all flex items-center gap-4 px-6`}
          style={{ transform: `rotate(${item.rotate})` }}
        >
          <span className="text-2xl">{item.emoji}</span>
          <span className="font-semibold text-gray-700">{item.time}</span>
        </button>
      ))}
    </div>

    {/* Main CTA */}
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl transform rotate-1"></div>
      <button className="relative w-full py-5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-semibold shadow-lg">
        ✨ Create Custom Check-In
      </button>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-3 gap-3">
      {[
        { num: '12', label: 'Safe', emoji: '✅', color: 'green' },
        { num: '5', label: 'Besties', emoji: '💜', color: 'purple' },
        { num: '0', label: 'Active', emoji: '🔔', color: 'blue' }
      ].map((stat, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 shadow-md text-center transform hover:scale-105 transition-transform">
          <div className="text-xl mb-1">{stat.emoji}</div>
          <div className={`text-2xl font-display text-${stat.color}-500`}>{stat.num}</div>
          <div className="text-xs text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

// Variation 5: Magazine Editorial
const HomePageMagazine = () => (
  <div className="min-h-[600px]">
    {/* Hero Split */}
    <div className="grid md:grid-cols-2">
      {/* Left - Bold Typography */}
      <div className="bg-gray-900 p-12 flex flex-col justify-center">
        <div className="text-pink-400 text-sm font-bold tracking-widest mb-4">WELCOME BACK</div>
        <h1 className="text-5xl font-black text-white leading-tight mb-4">
          Hey<br />Sarah
        </h1>
        <div className="w-16 h-1 bg-pink-500 mb-4"></div>
        <p className="text-gray-400">Your safety squad is ready</p>
      </div>

      {/* Right - Quick Actions */}
      <div className="bg-pink-50 p-12">
        <div className="text-xs font-bold text-gray-500 tracking-widest mb-6">QUICK CHECK-IN</div>
        <div className="space-y-4">
          {['15 min', '30 min', '1 hour'].map((time, i) => (
            <button
              key={i}
              className="w-full py-4 bg-white border-l-4 border-pink-500 text-left px-6 hover:bg-pink-100 transition-colors"
            >
              <span className="font-bold text-gray-800">{time}</span>
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Stats Bar */}
    <div className="bg-white border-t-4 border-pink-500 p-8">
      <div className="grid grid-cols-3 divide-x">
        {[
          { num: '12', label: 'COMPLETED' },
          { num: '5', label: 'BESTIES' },
          { num: '0', label: 'ACTIVE' }
        ].map((stat, i) => (
          <div key={i} className="text-center px-4">
            <div className="text-3xl font-black text-gray-900">{stat.num}</div>
            <div className="text-xs font-bold text-gray-400 tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="p-8 bg-gray-100">
      <button className="w-full py-4 bg-gray-900 text-white font-bold tracking-wide hover:bg-gray-800 transition-colors">
        CREATE CUSTOM CHECK-IN →
      </button>
    </div>
  </div>
);

// ============================================
// BESTIES PAGE VARIATIONS
// ============================================

const BestiesPageVariations = ({ variation }) => {
  switch (variation) {
    case 1:
      return <BestiesPageSoftPastel />;
    case 2:
      return <BestiesPageBoldVibrant />;
    case 3:
      return <BestiesPageMinimalClean />;
    case 4:
      return <BestiesPagePlayfulCards />;
    case 5:
      return <BestiesPageMagazine />;
    default:
      return <BestiesPageSoftPastel />;
  }
};

// Variation 1: Soft Pastel Dream
const BestiesPageSoftPastel = () => (
  <div className="p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-[600px]">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-display text-gray-700 mb-2">💜 Your Besties</h1>
      <p className="text-gray-500">Your safety squad activity hub</p>
    </div>

    {/* Filters */}
    <div className="flex gap-2 mb-6">
      {['All', '💜 Circle', '🔔 Active'].map((filter, i) => (
        <button
          key={i}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            i === 0 ? 'bg-pink-200 text-pink-800' : 'bg-white/80 text-gray-600'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>

    {/* Activity Feed */}
    <div className="mb-6">
      <h2 className="text-lg font-display text-gray-700 mb-4">📰 Activity Feed</h2>
      <div className="space-y-3">
        {[
          { name: 'Emma', action: 'completed check-in safely ✅', time: '5 min ago' },
          { name: 'Sophie', action: 'is currently checked in 🔔', time: '15 min ago' },
          { name: 'Lily', action: 'earned a badge! 🏆', time: '1 hour ago' }
        ].map((activity, i) => (
          <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
            <div className="font-semibold text-gray-700">
              <span className="text-pink-500">{activity.name}</span> {activity.action}
            </div>
            <div className="text-sm text-gray-500">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Besties Grid */}
    <div className="grid grid-cols-2 gap-3">
      {['Emma', 'Sophie', 'Lily', 'Mia'].map((name, i) => (
        <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mx-auto mb-2 flex items-center justify-center text-lg">
            {name[0]}
          </div>
          <div className="font-semibold text-gray-700 text-sm">{name}</div>
        </div>
      ))}
    </div>
  </div>
);

// Variation 2: Bold Vibrant
const BestiesPageBoldVibrant = () => (
  <div className="p-8 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 min-h-[600px]">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-4xl font-black text-white mb-2 drop-shadow-lg">💜 YOUR BESTIES</h1>
      <p className="text-pink-100 font-semibold">Your safety squad</p>
    </div>

    {/* Filters */}
    <div className="flex gap-2 mb-6">
      {['ALL', '💜 CIRCLE', '🔔 ACTIVE'].map((filter, i) => (
        <button
          key={i}
          className={`px-4 py-2 rounded-full text-xs font-black ${
            i === 0 ? 'bg-yellow-400 text-gray-900' : 'bg-white/20 text-white'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>

    {/* Activity Feed */}
    <div className="mb-6">
      <h2 className="text-xl font-black text-white mb-4">📰 ACTIVITY</h2>
      <div className="space-y-3">
        {[
          { name: 'Emma', status: 'SAFE', color: 'green' },
          { name: 'Sophie', status: 'ACTIVE', color: 'blue' },
          { name: 'Lily', status: 'BADGE', color: 'yellow' }
        ].map((activity, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-xl border-4 border-pink-300">
            <div className="flex items-center justify-between">
              <span className="font-black text-fuchsia-600">{activity.name}</span>
              <span className={`px-3 py-1 bg-${activity.color}-100 text-${activity.color}-700 text-xs font-black rounded-full`}>
                {activity.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Besties Grid */}
    <div className="grid grid-cols-2 gap-4">
      {['Emma', 'Sophie', 'Lily', 'Mia'].map((name, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 text-center shadow-xl border-4 border-pink-300 transform hover:scale-105 transition-transform">
          <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-full mx-auto mb-2 flex items-center justify-center text-xl text-white font-black">
            {name[0]}
          </div>
          <div className="font-black text-fuchsia-600">{name}</div>
        </div>
      ))}
    </div>
  </div>
);

// Variation 3: Minimal Clean
const BestiesPageMinimalClean = () => (
  <div className="p-12 bg-white min-h-[600px]">
    {/* Header */}
    <div className="mb-12">
      <h1 className="text-2xl font-light text-gray-800 mb-1">Your Besties</h1>
      <p className="text-sm text-gray-400">4 connections</p>
    </div>

    {/* Filters */}
    <div className="flex gap-4 mb-8 border-b pb-4">
      {['All', 'Circle', 'Active'].map((filter, i) => (
        <button
          key={i}
          className={`text-sm ${
            i === 0 ? 'text-gray-900 font-semibold' : 'text-gray-400'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>

    {/* Activity List */}
    <div className="mb-8">
      <div className="text-xs text-gray-400 uppercase tracking-widest mb-4">Recent Activity</div>
      <div className="space-y-4">
        {[
          { name: 'Emma', action: 'Checked in safely', time: '5m' },
          { name: 'Sophie', action: 'Currently active', time: '15m' },
          { name: 'Lily', action: 'Earned badge', time: '1h' }
        ].map((activity, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <span className="font-medium text-gray-800">{activity.name}</span>
              <span className="text-gray-400 ml-2">{activity.action}</span>
            </div>
            <span className="text-sm text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Besties List */}
    <div>
      <div className="text-xs text-gray-400 uppercase tracking-widest mb-4">All Besties</div>
      <div className="space-y-3">
        {['Emma', 'Sophie', 'Lily', 'Mia'].map((name, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
              {name[0]}
            </div>
            <span className="font-medium text-gray-700">{name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 4: Playful Cards
const BestiesPagePlayfulCards = () => (
  <div className="p-8 bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 min-h-[600px]">
    {/* Header Card */}
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-purple-200 rounded-3xl transform rotate-2"></div>
      <div className="relative bg-white rounded-3xl p-6 shadow-lg">
        <h1 className="text-2xl font-display text-gray-800">💜 Your Besties</h1>
        <p className="text-gray-600">Your safety squad</p>
      </div>
    </div>

    {/* Champions Card */}
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-yellow-200 rounded-3xl transform -rotate-1"></div>
      <div className="relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 shadow-lg">
        <h2 className="text-lg font-display text-gray-800 mb-3">🏆 Champions</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: 'Most Reliable', emoji: '💖' },
            { title: 'Fastest', emoji: '✨' }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-3 shadow-sm">
              <div className="text-xl mb-1">{item.emoji}</div>
              <div className="text-xs font-semibold text-gray-600">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Besties Cards */}
    <div className="grid grid-cols-2 gap-4">
      {[
        { name: 'Emma', color: 'pink' },
        { name: 'Sophie', color: 'purple' },
        { name: 'Lily', color: 'blue' },
        { name: 'Mia', color: 'green' }
      ].map((bestie, i) => (
        <div key={i} className="relative">
          <div className={`absolute inset-0 bg-${bestie.color}-200 rounded-2xl transform ${i % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}></div>
          <div className="relative bg-white rounded-2xl p-4 text-center shadow-md">
            <div className={`w-12 h-12 bg-gradient-to-br from-${bestie.color}-300 to-${bestie.color}-400 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold`}>
              {bestie.name[0]}
            </div>
            <div className="font-semibold text-gray-700 text-sm">{bestie.name}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Variation 5: Magazine Editorial
const BestiesPageMagazine = () => (
  <div className="min-h-[600px]">
    {/* Hero Header */}
    <div className="bg-gray-900 p-8">
      <div className="text-pink-400 text-xs font-bold tracking-widest mb-2">YOUR NETWORK</div>
      <h1 className="text-4xl font-black text-white">Besties</h1>
      <div className="w-12 h-1 bg-pink-500 mt-4"></div>
    </div>

    {/* Filters */}
    <div className="bg-white border-b p-4">
      <div className="flex gap-6">
        {['ALL', 'CIRCLE', 'ACTIVE'].map((filter, i) => (
          <button
            key={i}
            className={`text-xs font-bold tracking-widest ${
              i === 0 ? 'text-pink-600 border-b-2 border-pink-600 pb-2' : 'text-gray-400'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>

    {/* Activity Section */}
    <div className="p-8 bg-gray-50">
      <div className="text-xs font-bold text-gray-500 tracking-widest mb-4">RECENT ACTIVITY</div>
      <div className="space-y-4">
        {[
          { name: 'Emma', action: 'Safe check-in', status: 'COMPLETED' },
          { name: 'Sophie', action: 'Active now', status: 'IN PROGRESS' },
          { name: 'Lily', action: 'New badge earned', status: 'ACHIEVEMENT' }
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 border-l-4 border-pink-500">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-500">{item.action}</div>
              </div>
              <div className="text-xs font-bold text-pink-600">{item.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Besties Grid */}
    <div className="p-8 bg-white">
      <div className="text-xs font-bold text-gray-500 tracking-widest mb-4">ALL BESTIES</div>
      <div className="grid grid-cols-4 gap-4">
        {['Emma', 'Sophie', 'Lily', 'Mia'].map((name, i) => (
          <div key={i} className="text-center">
            <div className="w-16 h-16 bg-gray-900 text-white rounded-none mx-auto mb-2 flex items-center justify-center text-xl font-bold">
              {name[0]}
            </div>
            <div className="text-xs font-bold text-gray-600 tracking-wide">{name.toUpperCase()}</div>
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
    case 1:
      return <ProfilePageSoftPastel />;
    case 2:
      return <ProfilePageBoldVibrant />;
    case 3:
      return <ProfilePageMinimalClean />;
    case 4:
      return <ProfilePagePlayfulCards />;
    case 5:
      return <ProfilePageMagazine />;
    default:
      return <ProfilePageSoftPastel />;
  }
};

// Variation 1: Soft Pastel Dream
const ProfilePageSoftPastel = () => (
  <div className="p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-[600px]">
    {/* Profile Header */}
    <div className="text-center mb-8">
      <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl shadow-sm">
        S
      </div>
      <h1 className="text-2xl font-display text-gray-700 mb-1">Sarah Smith</h1>
      <p className="text-gray-500 italic">"Living my best life safely"</p>
    </div>

    {/* Profile Completion */}
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display text-gray-700">Profile Completion</span>
        <span className="text-pink-400 font-semibold">4/5</span>
      </div>
      <div className="w-full h-3 bg-white rounded-full overflow-hidden">
        <div className="h-full w-4/5 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full"></div>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[
        { num: '5', label: 'Besties', emoji: '💜' },
        { num: '12', label: 'Check-ins', emoji: '✅' },
        { num: '3', label: 'Badges', emoji: '🏆' }
      ].map((stat, i) => (
        <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm">
          <div className="text-lg mb-1">{stat.emoji}</div>
          <div className="text-2xl font-display text-gray-700">{stat.num}</div>
          <div className="text-xs text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>

    {/* Featured Badges */}
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm">
      <h2 className="font-display text-gray-700 mb-4">Featured Badges</h2>
      <div className="flex justify-center gap-4">
        {['🛡️', '⭐', '🔥'].map((badge, i) => (
          <div key={i} className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center text-xl shadow-sm">
            {badge}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 2: Bold Vibrant
const ProfilePageBoldVibrant = () => (
  <div className="p-8 bg-gradient-to-br from-fuchsia-600 via-purple-600 to-pink-600 min-h-[600px]">
    {/* Profile Header */}
    <div className="text-center mb-8">
      <div className="w-28 h-28 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-black text-fuchsia-600 border-4 border-yellow-400 shadow-xl">
        S
      </div>
      <h1 className="text-3xl font-black text-white mb-2 drop-shadow-lg">SARAH SMITH</h1>
      <p className="text-pink-100 font-semibold">"Living my best life safely"</p>
    </div>

    {/* Profile Completion */}
    <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl border-4 border-pink-300">
      <div className="flex items-center justify-between mb-3">
        <span className="font-black text-fuchsia-600">COMPLETION</span>
        <span className="text-2xl font-black text-fuchsia-600">80%</span>
      </div>
      <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full w-4/5 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full"></div>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[
        { num: '5', label: 'BESTIES', color: 'purple' },
        { num: '12', label: 'CHECK-INS', color: 'pink' },
        { num: '3', label: 'BADGES', color: 'yellow' }
      ].map((stat, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 text-center shadow-xl border-4 border-pink-300">
          <div className={`text-3xl font-black text-${stat.color}-600`}>{stat.num}</div>
          <div className="text-xs font-black text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>

    {/* Featured Badges */}
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-400">
      <h2 className="font-black text-fuchsia-600 mb-4">🏆 FEATURED</h2>
      <div className="flex justify-center gap-4">
        {['🛡️', '⭐', '🔥'].map((badge, i) => (
          <div key={i} className="w-14 h-14 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full flex items-center justify-center text-2xl shadow-lg transform hover:scale-110 transition-transform">
            {badge}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 3: Minimal Clean
const ProfilePageMinimalClean = () => (
  <div className="p-12 bg-white min-h-[600px]">
    {/* Profile Header */}
    <div className="text-center mb-12">
      <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-gray-600">
        S
      </div>
      <h1 className="text-xl font-medium text-gray-800 mb-1">Sarah Smith</h1>
      <p className="text-sm text-gray-400">Living my best life safely</p>
    </div>

    {/* Profile Completion */}
    <div className="mb-12">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">Profile completion</span>
        <span className="text-sm text-gray-800 font-semibold">80%</span>
      </div>
      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full w-4/5 bg-gray-800 rounded-full"></div>
      </div>
    </div>

    {/* Stats */}
    <div className="flex justify-between mb-12 border-t border-b py-6">
      {[
        { num: '5', label: 'Besties' },
        { num: '12', label: 'Check-ins' },
        { num: '3', label: 'Badges' }
      ].map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-2xl font-semibold text-gray-800">{stat.num}</div>
          <div className="text-xs text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>

    {/* Badges */}
    <div>
      <div className="text-xs text-gray-400 uppercase tracking-widest mb-4">Featured Badges</div>
      <div className="flex gap-3">
        {['🛡️', '⭐', '🔥'].map((badge, i) => (
          <div key={i} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-lg">
            {badge}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Variation 4: Playful Cards
const ProfilePagePlayfulCards = () => (
  <div className="p-8 bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 min-h-[600px]">
    {/* Profile Header Card */}
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-pink-200 rounded-3xl transform rotate-2"></div>
      <div className="absolute inset-0 bg-purple-200 rounded-3xl transform -rotate-1"></div>
      <div className="relative bg-white rounded-3xl p-6 shadow-lg text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl text-white font-bold shadow-md">
          S
        </div>
        <h1 className="text-xl font-display text-gray-800 mb-1">Sarah Smith</h1>
        <p className="text-gray-600 italic text-sm">"Living my best life safely"</p>
      </div>
    </div>

    {/* Completion Card */}
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-green-200 rounded-2xl transform -rotate-1"></div>
      <div className="relative bg-white rounded-2xl p-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-700">Completion</span>
          <span className="text-green-500 font-bold">80%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full w-4/5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
        </div>
      </div>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[
        { num: '5', label: 'Besties', color: 'purple', rotate: '1deg' },
        { num: '12', label: 'Check-ins', color: 'pink', rotate: '-1deg' },
        { num: '3', label: 'Badges', color: 'yellow', rotate: '0.5deg' }
      ].map((stat, i) => (
        <div key={i} className="relative">
          <div className={`absolute inset-0 bg-${stat.color}-200 rounded-xl`} style={{ transform: `rotate(${stat.rotate})` }}></div>
          <div className="relative bg-white rounded-xl p-3 text-center shadow-sm">
            <div className={`text-xl font-display text-${stat.color}-500`}>{stat.num}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Badges Card */}
    <div className="relative">
      <div className="absolute inset-0 bg-orange-200 rounded-2xl transform rotate-1"></div>
      <div className="relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 shadow-md">
        <h2 className="font-semibold text-gray-700 mb-3">🏆 Featured</h2>
        <div className="flex justify-center gap-3">
          {['🛡️', '⭐', '🔥'].map((badge, i) => (
            <div key={i} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-sm transform hover:scale-110 transition-transform">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Variation 5: Magazine Editorial
const ProfilePageMagazine = () => (
  <div className="min-h-[600px]">
    {/* Hero Header */}
    <div className="bg-gray-900 p-8 text-center">
      <div className="w-24 h-24 bg-white text-gray-900 mx-auto mb-4 flex items-center justify-center text-3xl font-black">
        S
      </div>
      <h1 className="text-3xl font-black text-white tracking-tight">SARAH SMITH</h1>
      <div className="w-12 h-1 bg-pink-500 mx-auto mt-4 mb-3"></div>
      <p className="text-gray-400 text-sm">"Living my best life safely"</p>
    </div>

    {/* Completion Bar */}
    <div className="bg-pink-500 p-4">
      <div className="flex items-center justify-between text-white">
        <span className="text-xs font-bold tracking-widest">PROFILE COMPLETION</span>
        <span className="font-black">80%</span>
      </div>
      <div className="w-full h-2 bg-pink-300 mt-2">
        <div className="h-full w-4/5 bg-white"></div>
      </div>
    </div>

    {/* Stats */}
    <div className="bg-white p-8">
      <div className="grid grid-cols-3 divide-x">
        {[
          { num: '5', label: 'BESTIES' },
          { num: '12', label: 'CHECK-INS' },
          { num: '3', label: 'BADGES' }
        ].map((stat, i) => (
          <div key={i} className="text-center px-4">
            <div className="text-3xl font-black text-gray-900">{stat.num}</div>
            <div className="text-xs font-bold text-gray-400 tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Featured Badges */}
    <div className="bg-gray-100 p-8">
      <div className="text-xs font-bold text-gray-500 tracking-widest mb-4">FEATURED BADGES</div>
      <div className="flex gap-4">
        {['🛡️', '⭐', '🔥'].map((badge, i) => (
          <div key={i} className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center text-xl">
            {badge}
          </div>
        ))}
      </div>
    </div>

    {/* Settings */}
    <div className="p-8 bg-white border-t">
      <button className="w-full py-3 bg-gray-900 text-white font-bold tracking-wide">
        SETTINGS →
      </button>
    </div>
  </div>
);

export default PageDesignVariations;
