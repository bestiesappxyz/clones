import React from 'react';

/**
 * Custom SVG Graphics for Magical Onboarding
 * Beautiful, animated illustrations
 */

// ==================== ANIMATED HEART ====================

export const AnimatedHeart = ({ size = 100, className = '', animate = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    style={{ filter: 'drop-shadow(0 4px 12px rgba(255,105,180,0.3))' }}
  >
    <defs>
      <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF1493" />
        <stop offset="100%" stopColor="#FF69B4" />
      </linearGradient>
      {animate && (
        <animate
          attributeName="opacity"
          values="1;0.6;1"
          dur="2s"
          repeatCount="indefinite"
        />
      )}
    </defs>
    <path
      d="M50,85 C50,85 20,65 20,45 C20,30 30,25 40,30 C45,32 50,40 50,40 C50,40 55,32 60,30 C70,25 80,30 80,45 C80,65 50,85 50,85 Z"
      fill="url(#heartGradient)"
      className={animate ? 'animate-pulse' : ''}
    />
    <path
      d="M35,40 Q40,38 42,42"
      stroke="white"
      strokeWidth="2"
      fill="none"
      opacity="0.6"
    />
  </svg>
);

// ==================== SAFETY SHIELD ====================

export const SafetyShield = ({ size = 120, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className={className}>
    <defs>
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9370DB" />
        <stop offset="100%" stopColor="#FF69B4" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Shield */}
    <path
      d="M60,10 L100,30 L100,60 C100,80 60,110 60,110 C60,110 20,80 20,60 L20,30 Z"
      fill="url(#shieldGradient)"
      filter="url(#glow)"
      className="animate-pulse"
    />

    {/* Checkmark */}
    <path
      d="M45,60 L55,70 L75,45"
      stroke="white"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-bounce-slow"
    />

    {/* Sparkles */}
    {[...Array(3)].map((_, i) => (
      <g key={i} className="animate-spin-slow" style={{ transformOrigin: `${30 + i * 30}px 25px` }}>
        <line x1={30 + i * 30} y1="20" x2={30 + i * 30} y2="30" stroke="#FFD700" strokeWidth="2" />
        <line x1={25 + i * 30} y1="25" x2={35 + i * 30} y2="25" stroke="#FFD700" strokeWidth="2" />
      </g>
    ))}
  </svg>
);

// ==================== FRIENDS CIRCLE ====================

export const FriendsCircle = ({ size = 150, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 150 150" className={className}>
    <defs>
      <linearGradient id="personGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF69B4" />
        <stop offset="100%" stopColor="#FFB6C1" />
      </linearGradient>
      <linearGradient id="personGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9370DB" />
        <stop offset="100%" stopColor="#DDA0DD" />
      </linearGradient>
    </defs>

    {/* Center person (user) */}
    <g className="animate-bounce-slow">
      <circle cx="75" cy="75" r="15" fill="url(#personGradient1)" />
      <circle cx="75" cy="100" r="18" fill="url(#personGradient1)" />
      {/* Crown */}
      <path d="M65,60 L75,55 L85,60 L83,65 L67,65 Z" fill="#FFD700" />
      <circle cx="75" cy="55" r="3" fill="#FFD700" />
    </g>

    {/* Surrounding friends */}
    {[0, 72, 144, 216, 288].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 75 + Math.cos(rad) * 50;
      const y = 75 + Math.sin(rad) * 50;

      return (
        <g key={i} className="animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
          <circle cx={x} cy={y} r="10" fill="url(#personGradient2)" />
          <circle cx={x} cy={y + 15} r="12" fill="url(#personGradient2)" />
        </g>
      );
    })}

    {/* Connecting hearts */}
    {[0, 72, 144, 216, 288].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 75 + Math.cos(rad) * 30;
      const y = 75 + Math.sin(rad) * 30;

      return (
        <path
          key={`heart-${i}`}
          d={`M${x},${y} l-3,-3 q-3,-3 0,-6 q3,-3 6,0 q3,-3 6,0 q3,3 0,6 l-3,3 Z`}
          fill="#FF1493"
          opacity="0.6"
          className="animate-pulse"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      );
    })}
  </svg>
);

// ==================== PHONE WITH NOTIFICATION ====================

export const PhoneNotification = ({ size = 100, className = '' }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 100 150" className={className}>
    <defs>
      <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f8f9fa" />
        <stop offset="100%" stopColor="#e9ecef" />
      </linearGradient>
    </defs>

    {/* Phone body */}
    <rect
      x="20" y="10" width="60" height="130"
      rx="8"
      fill="url(#phoneGradient)"
      stroke="#dee2e6"
      strokeWidth="2"
    />

    {/* Screen */}
    <rect
      x="25" y="20" width="50" height="100"
      rx="4"
      fill="#fff"
      stroke="#dee2e6"
    />

    {/* Notification */}
    <g className="animate-bounce">
      <rect
        x="30" y="30" width="40" height="25"
        rx="6"
        fill="#FF69B4"
        filter="drop-shadow(0 4px 8px rgba(255,105,180,0.4))"
      />
      <text
        x="50" y="42"
        fontSize="8"
        fill="white"
        textAnchor="middle"
        fontWeight="bold"
      >
        Sarah
      </text>
      <text
        x="50" y="50"
        fontSize="6"
        fill="white"
        textAnchor="middle"
      >
        Are you safe?
      </text>
    </g>

    {/* Alert badge */}
    <circle
      cx="70" cy="25" r="8"
      fill="#FF4444"
      className="animate-pulse"
    />
    <text
      x="70" y="28"
      fontSize="10"
      fill="white"
      textAnchor="middle"
      fontWeight="bold"
    >
      !
    </text>

    {/* Sound waves */}
    {[1, 2, 3].map((i) => (
      <path
        key={i}
        d={`M ${85 + i * 8} 25 Q ${90 + i * 8} 15, ${85 + i * 8} 5`}
        stroke="#FF69B4"
        strokeWidth="2"
        fill="none"
        opacity={1 - i * 0.25}
        className="animate-pulse"
        style={{ animationDelay: `${i * 0.1}s` }}
      />
    ))}

    {/* Home button */}
    <circle cx="50" cy="130" r="4" fill="#dee2e6" />
  </svg>
);

// ==================== TIMER CLOCK ====================

export const TimerClock = ({ size = 100, className = '', progress = 0.75 }) => {
  const circumference = 2 * Math.PI * 35;
  const offset = circumference - (progress * circumference);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9370DB" />
          <stop offset="100%" stopColor="#FF69B4" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle
        cx="50" cy="50" r="40"
        fill="none"
        stroke="#f0f0f0"
        strokeWidth="8"
      />

      {/* Progress ring */}
      <circle
        cx="50" cy="50" r="35"
        fill="none"
        stroke="url(#timerGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)"
        className="transition-all duration-1000"
      />

      {/* Center */}
      <circle
        cx="50" cy="50" r="25"
        fill="white"
        filter="drop-shadow(0 2px 8px rgba(0,0,0,0.1))"
      />

      {/* Clock hands */}
      <line
        x1="50" y1="50" x2="50" y2="30"
        stroke="url(#timerGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        className="animate-spin-slow"
        style={{ transformOrigin: '50px 50px' }}
      />
      <line
        x1="50" y1="50" x2="65" y2="50"
        stroke="url(#timerGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Center dot */}
      <circle cx="50" cy="50" r="4" fill="url(#timerGradient)" />

      {/* Timer decorations */}
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * 38;
        const y = 50 + Math.sin(rad) * 38;
        return (
          <circle key={i} cx={x} cy={y} r="2" fill="#9370DB" />
        );
      })}
    </svg>
  );
};

// ==================== SCENARIO ILLUSTRATIONS ====================

export const DateScenario = ({ size = 150, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 150 150" className={className}>
    <defs>
      <linearGradient id="tableGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#654321" />
      </linearGradient>
    </defs>

    {/* Table */}
    <ellipse cx="75" cy="100" rx="50" ry="15" fill="url(#tableGradient)" />
    <rect x="25" y="70" width="100" height="30" fill="url(#tableGradient)" />

    {/* Candle */}
    <rect x="70" y="60" width="10" height="15" rx="2" fill="#FF6B6B" />
    <ellipse cx="75" cy="60" rx="6" ry="3" fill="#FFD93D" className="animate-pulse" />

    {/* Wine glasses */}
    <g>
      <path d="M 50,65 L 50,55 L 45,50 L 55,50 L 50,55 Z" fill="#FFB6C1" opacity="0.6" />
      <rect x="48" y="65" width="4" height="8" fill="#DDA0DD" />

      <path d="M 100,65 L 100,55 L 95,50 L 105,50 L 100,55 Z" fill="#FFB6C1" opacity="0.6" />
      <rect x="98" y="65" width="4" height="8" fill="#DDA0DD" />
    </g>

    {/* Hearts floating */}
    {[1, 2, 3].map((i) => (
      <path
        key={i}
        d={`M${30 + i * 25},${35 - i * 5} l-3,-3 q-3,-3 0,-6 q3,-3 6,0 q3,-3 6,0 q3,3 0,6 l-3,3 Z`}
        fill="#FF1493"
        opacity="0.4"
        className="animate-float"
        style={{ animationDelay: `${i * 0.4}s` }}
      />
    ))}

    {/* Checkmark overlay */}
    <circle cx="120" cy="30" r="20" fill="#4CAF50" className="animate-bounce" />
    <path
      d="M 112,30 L 117,35 L 128,24"
      stroke="white"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export const WalkingScenario = ({ size = 150, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 150 150" className={className}>
    {/* Moon */}
    <circle cx="120" cy="30" r="15" fill="#FFE66D" opacity="0.8" />
    <circle cx="125" cy="28" r="15" fill="#1a1a2e" opacity="0.3" />

    {/* Stars */}
    {[...Array(5)].map((_, i) => (
      <g key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
        <line
          x1={20 + i * 25} y1={15 + i * 5}
          x2={20 + i * 25} y2={25 + i * 5}
          stroke="#FFE66D" strokeWidth="1"
        />
        <line
          x1={15 + i * 25} y1={20 + i * 5}
          x2={25 + i * 25} y2={20 + i * 5}
          stroke="#FFE66D" strokeWidth="1"
        />
      </g>
    ))}

    {/* Walking path */}
    <path
      d="M 10,120 Q 50,100 75,110 Q 100,120 140,100"
      stroke="#9370DB"
      strokeWidth="3"
      fill="none"
      strokeDasharray="5,5"
    />

    {/* Person walking */}
    <g className="animate-bounce-slow">
      <circle cx="75" cy="70" r="12" fill="#FF69B4" />
      <circle cx="75" cy="95" r="15" fill="#FF69B4" />
      <line x1="75" y1="82" x2="65" y2="100" stroke="#FF69B4" strokeWidth="4" strokeLinecap="round" />
      <line x1="75" y1="95" x2="70" y2="115" stroke="#FF69B4" strokeWidth="4" strokeLinecap="round" />
      <line x1="75" y1="95" x2="80" y2="110" stroke="#FF69B4" strokeWidth="4" strokeLinecap="round" />
    </g>

    {/* Phone in hand */}
    <rect x="62" y="90" width="8" height="12" rx="2" fill="#fff" stroke="#333" strokeWidth="1" />
    <circle cx="66" cy="96" r="1" fill="#4CAF50" className="animate-pulse" />

    {/* Location marker */}
    <g transform="translate(110, 85)">
      <path
        d="M 0,0 L -8,15 L 0,12 L 8,15 Z"
        fill="#FF1493"
        className="animate-bounce"
      />
      <circle cx="0" cy="0" r="5" fill="#FF1493" />
      <circle cx="0" cy="0" r="2" fill="white" />
    </g>
  </svg>
);

export const PartyScenario = ({ size = 150, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 150 150" className={className}>
    {/* Disco ball */}
    <g transform="translate(75, 40)">
      <circle cx="0" cy="0" r="20" fill="#C0C0C0" />
      {[...Array(8)].map((_, i) => (
        <rect
          key={i}
          x="-2" y="-20"
          width="4" height="40"
          fill={i % 2 === 0 ? '#E0E0E0' : '#A0A0A0'}
          transform={`rotate(${i * 45})`}
        />
      ))}
      <circle cx="0" cy="0" r="20" fill="url(#shineGradient)" opacity="0.3" />
    </g>

    {/* Light rays */}
    {[...Array(6)].map((_, i) => (
      <line
        key={i}
        x1="75" y1="40"
        x2={75 + Math.cos((i * 60 * Math.PI) / 180) * 60}
        y2={40 + Math.sin((i * 60 * Math.PI) / 180) * 60}
        stroke="#FFD93D"
        strokeWidth="2"
        opacity="0.3"
        className="animate-pulse"
        style={{ animationDelay: `${i * 0.2}s` }}
      />
    ))}

    {/* Dancing people */}
    {[30, 75, 120].map((x, i) => (
      <g key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
        <circle cx={x} cy="90" r="10" fill={i === 1 ? '#FF69B4' : '#9370DB'} />
        <circle cx={x} cy="110" r="12" fill={i === 1 ? '#FF69B4' : '#9370DB'} />
        <line x1={x} y1="100" x2={x - 8} y2="115" stroke={i === 1 ? '#FF69B4' : '#9370DB'} strokeWidth="3" />
        <line x1={x} y1="100" x2={x + 8} y2="105" stroke={i === 1 ? '#FF69B4' : '#9370DB'} strokeWidth="3" />
      </g>
    ))}

    {/* Music notes */}
    {[1, 2, 3].map((i) => (
      <text
        key={i}
        x={20 + i * 35}
        y={70 - i * 5}
        fontSize="20"
        fill="#9370DB"
        className="animate-float"
        style={{ animationDelay: `${i * 0.3}s` }}
      >
        ♪
      </text>
    ))}

    <defs>
      <radialGradient id="shineGradient">
        <stop offset="0%" stopColor="white" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>
  </svg>
);

// ==================== SUCCESS CELEBRATION ====================

export const SuccessCelebration = ({ size = 200, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4CAF50" />
        <stop offset="100%" stopColor="#8BC34A" />
      </linearGradient>
      <filter id="successGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Large checkmark circle */}
    <circle
      cx="100" cy="100" r="60"
      fill="url(#successGradient)"
      filter="url(#successGlow)"
      className="animate-scale-up"
    />

    {/* Checkmark */}
    <path
      d="M 70,100 L 90,120 L 130,75"
      stroke="white"
      strokeWidth="8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-bounce"
    />

    {/* Confetti */}
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const distance = 80;
      const x = 100 + Math.cos(angle) * distance;
      const y = 100 + Math.sin(angle) * distance;
      const colors = ['#FF69B4', '#9370DB', '#FFD93D', '#4CAF50'];

      return (
        <rect
          key={i}
          x={x - 3}
          y={y - 3}
          width="6"
          height="6"
          fill={colors[i % colors.length]}
          transform={`rotate(${i * 30} ${x} ${y})`}
          className="animate-spin-slow"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      );
    })}

    {/* Stars */}
    {[1, 2, 3, 4].map((i) => (
      <g
        key={i}
        transform={`translate(${50 + i * 30}, ${30}) rotate(${i * 20})`}
        className="animate-pulse"
        style={{ animationDelay: `${i * 0.15}s` }}
      >
        <polygon
          points="0,-10 2,-3 10,-3 4,2 6,10 0,5 -6,10 -4,2 -10,-3 -2,-3"
          fill="#FFD93D"
        />
      </g>
    ))}
  </svg>
);

// ==================== XP BAR GRAPHIC ====================

export const XPBar = ({ progress = 0, level = 1, className = '' }) => {
  return (
    <svg width="300" height="60" viewBox="0 0 300 60" className={className}>
      <defs>
        <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9370DB" />
          <stop offset="50%" stopColor="#FF69B4" />
          <stop offset="100%" stopColor="#FFD93D" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect
        x="50" y="15" width="240" height="30"
        rx="15"
        fill="#f0f0f0"
        stroke="#dee2e6"
        strokeWidth="2"
      />

      {/* Progress fill */}
      <rect
        x="52" y="17" width={Math.max(0, (progress * 236))} height="26"
        rx="13"
        fill="url(#xpGradient)"
        className="transition-all duration-500"
      />

      {/* Level badge */}
      <circle cx="30" cy="30" r="25" fill="url(#xpGradient)" />
      <text
        x="30" y="27"
        fontSize="10"
        fill="white"
        textAnchor="middle"
        fontWeight="bold"
      >
        LVL
      </text>
      <text
        x="30" y="39"
        fontSize="16"
        fill="white"
        textAnchor="middle"
        fontWeight="bold"
      >
        {level}
      </text>

      {/* Sparkles on progress */}
      {progress > 0 && (
        <g className="animate-pulse">
          <circle cx={52 + progress * 236} cy="30" r="4" fill="white" opacity="0.8" />
          <circle cx={52 + progress * 236 - 10} cy="25" r="2" fill="white" opacity="0.6" />
          <circle cx={52 + progress * 236 - 10} cy="35" r="2" fill="white" opacity="0.6" />
        </g>
      )}
    </svg>
  );
};

const SVGGraphics = {
  AnimatedHeart,
  SafetyShield,
  FriendsCircle,
  PhoneNotification,
  TimerClock,
  DateScenario,
  WalkingScenario,
  PartyScenario,
  SuccessCelebration,
  XPBar
};

export default SVGGraphics;
