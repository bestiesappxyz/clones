/**
 * Complete Interactive Tour Configuration
 * Shows users the ACTUAL app interface step by step
 * Enhanced with WHY not just WHERE - explaining the purpose and value
 */

export const tourSteps = [
  // WELCOME & INTRODUCTION
  {
    path: '/',
    element: '[data-tour="header-logo"]',
    title: 'Welcome to Besties! 💕',
    description: 'I\'m going to show you around your new safety companion! This quick interactive tour will walk you through the REAL app - every button, every feature, and why it matters for your safety.',
    emoji: '👋',
    tip: 'You can skip any time or use the back button to review previous steps'
  },

  // HOMEPAGE - OVERVIEW
  {
    path: '/',
    element: '[data-tour="header-nav"]',
    title: 'Your Safety Dashboard',
    description: 'This is your home base! The navigation makes it easy to jump between Home (where you manage check-ins), Besties (your safety circle), and Profile (your personal settings and achievements).',
    emoji: '🏠',
    tip: 'Everything is designed to be just one tap away when you need it'
  },

  // QUICK CHECK-IN BUTTONS
  {
    path: '/',
    element: '[data-tour="quick-buttons"]',
    title: 'Quick Safety Check-Ins',
    description: 'Going on a coffee date, dinner, or night out? These preset buttons let you start a safety check-in instantly! Just tap one and your chosen besties will be quietly watching out for you.',
    emoji: '⚡',
    tip: 'Perfect for those "just in case" moments when you want someone to know where you are'
  },

  // EMERGENCY SOS
  {
    path: '/',
    element: '[data-tour="emergency-sos"]',
    title: 'Emergency SOS Button',
    description: 'Your panic button. If you ever feel unsafe, press and hold this for 5 seconds. It immediately alerts ALL your besties with your exact location, even if you don\'t have an active check-in.',
    emoji: '🆘',
    tip: 'This works 24/7 - you don\'t need an active check-in to use it. You have 10 seconds to cancel if pressed accidentally'
  },

  // CREATE CHECK-IN - INTRODUCTION
  {
    path: '/create',
    element: '[data-tour="create-form"]',
    title: 'Creating a Custom Check-In',
    description: 'Here\'s where you set up personalized check-ins! Think of this as telling your besties: "I\'m going here, I\'ll be back by this time, and if I don\'t check in, please reach out."',
    emoji: '✨',
    tip: 'Custom check-ins give you full control over timing, location sharing, and who gets notified'
  },

  // LOCATION WITH MAP
  {
    path: '/create',
    element: '[data-tour="location-input"]',
    title: 'Where Are You Going?',
    description: 'Type your destination - a restaurant, friend\'s address, "walking home", anything! The map shows your location in real-time, and your besties will see exactly where you are if they need to find you.',
    emoji: '📍',
    tip: 'Being specific helps! Instead of "downtown", try "Mario\'s Pizza on 5th Street"'
  },

  // DURATION
  {
    path: '/create',
    element: '[data-tour="duration-buttons"]',
    title: 'Set Your Safety Window',
    description: 'How long will you be out? Choose 15 mins for a quick errand, 60 mins for dinner, or 2 hours for a movie. We\'ll send you gentle reminders at 10, 5, and 1 minute before time\'s up.',
    emoji: '⏰',
    tip: 'Better to overestimate! You can always check in early, but checking in late triggers an alert'
  },

  // BESTIE SELECTION
  {
    path: '/create',
    element: '[data-tour="bestie-selector"]',
    title: 'Choose Your Safety Net',
    description: 'Select 1-5 besties to watch over you. They\'ll ONLY get alerted if you don\'t check in on time - otherwise they won\'t even know you started a check-in. Perfect balance of safety and privacy!',
    emoji: '💜',
    tip: 'Pick people who are usually available and will actually respond if something seems wrong'
  },

  // NOTES
  {
    path: '/create',
    element: '[data-tour="notes-input"]',
    title: 'Add Context (Super Important!)',
    description: 'This is your "just in case" note. Add details like "First date with Alex from Hinge - meeting at Starbucks" or "Going to John\'s house party, might be loud." Helps your besties know what\'s normal vs concerning.',
    emoji: '📝',
    tip: 'Include names, meeting spots, and any "if X happens, it\'s fine" context'
  },

  // PHOTO UPLOAD
  {
    path: '/create',
    element: '[data-tour="photo-upload"]',
    title: 'Share Your Scene (Optional)',
    description: 'Snap a photo of who you\'re with, where you are, or what you\'re wearing. If your besties need to find you or provide info to authorities, these photos could be crucial.',
    emoji: '📸',
    tip: 'Photos are optional but recommended for first dates or unfamiliar places'
  },

  // CREATE SUBMIT
  {
    path: '/create',
    element: '[data-tour="create-submit"]',
    title: 'Activate Your Safety Net',
    description: 'Tap this to start your check-in! The countdown begins immediately, your selected besties are on standby, and you\'ll get friendly reminders when it\'s time to check back in.',
    emoji: '🚀',
    tip: 'Your check-in is active until you mark yourself safe or the timer expires'
  },

  // BESTIES PAGE - INTRODUCTION
  {
    path: '/besties',
    element: '[data-tour="besties-list"]',
    title: 'Your Safety Circle',
    description: 'These are your besties - the people you trust with your safety! See who\'s in your circle, their recent activity, and manage your connections. This is your personal safety network.',
    emoji: '👯‍♀️',
    tip: 'Quality over quantity! 3-5 trusted people is better than 20 acquaintances'
  },

  // ADD BESTIE
  {
    path: '/besties',
    element: '[data-tour="add-bestie-button"]',
    title: 'Grow Your Circle',
    description: 'Add friends, roommates, family - anyone you trust! They\'ll get a warm invitation to join your safety network. The more besties you have, the safer you\'ll be.',
    emoji: '➕',
    tip: 'Start with your closest friends, then add people you see regularly'
  },

  // ACTIVITY FEED
  {
    path: '/besties',
    element: '[data-tour="activity-feed"]',
    title: 'Stay Connected',
    description: 'See when your besties are active, their recent check-ins, and any safety alerts. It\'s like a mini social feed, but focused entirely on keeping each other safe!',
    emoji: '📱',
    tip: 'Check this regularly to know who\'s available to watch over you'
  },

  // PROFILE - AVATAR
  {
    path: '/profile',
    element: '[data-tour="profile-avatar"]',
    title: 'Your Profile Identity',
    description: 'Add a clear profile photo so your besties can easily identify you. If they need to show your photo to venue staff or authorities, having a recent photo here matters!',
    emoji: '⭐',
    tip: 'Use a clear, recent photo where your face is visible'
  },

  // BADGES
  {
    path: '/profile',
    element: '[data-tour="badges-section"]',
    title: 'Earn Safety Achievements',
    description: 'Complete check-ins, build your circle, and maintain streaks to unlock badges! It\'s a fun way to stay engaged with your safety habits. Display your top 3 badges with pride!',
    emoji: '🏆',
    tip: 'The "First Check-In" badge is yours after completing one check-in!'
  },

  // STATS
  {
    path: '/profile',
    element: '[data-tour="profile-stats"]',
    title: 'Your Safety Journey',
    description: 'Track your impact! See how many check-ins you\'ve completed, how many times friends picked you as their emergency contact, your login streak, and more. You\'re making the world safer!',
    emoji: '📊',
    tip: 'Celebrate the milestones - every check-in matters!'
  },

  // SETTINGS - NOTIFICATIONS
  {
    path: '/settings',
    element: '[data-tour="notification-settings"]',
    title: 'How You Get Notified',
    description: 'Choose how you want check-in reminders and emergency alerts: email, push notifications, SMS, or all three! We recommend enabling at least two channels so you never miss a critical alert.',
    emoji: '🔔',
    tip: 'Email is reliable and free. SMS costs money to send, so we limit it to 5 per week'
  },

  // PASSCODES
  {
    path: '/settings',
    element: '[data-tour="passcode-section"]',
    title: 'Safety vs Duress Passcode (Critical!)',
    description: 'Set TWO different passcodes: Safety Passcode marks you safe. Duress Code looks identical but SECRETLY alerts your besties you\'re in danger. Use duress if someone forces you to cancel an alert.',
    emoji: '🔐',
    tip: 'This could save your life. The duress code triggers a silent alarm your besties will see'
  },

  // SMS SETTINGS
  {
    path: '/settings',
    element: '[data-tour="sms-settings"]',
    title: 'SMS Alerts (Optional Backup)',
    description: 'Want text message reminders as extra backup? Enable SMS! You get 5 free SMS alerts per week. After that, consider upgrading to premium for unlimited texts.',
    emoji: '💬',
    tip: 'Use email or push notifications to save your SMS quota for true emergencies'
  },

  // NOTIFICATION BELL
  {
    path: '/',
    element: '[data-tour="notification-bell"]',
    title: 'Your Notification Center',
    description: 'Click here to see all your notifications! Check-in reminders, bestie alerts, safety warnings, and system updates all appear here. The number shows unread notifications.',
    emoji: '🔔',
    tip: 'Turn on browser notifications so you get alerts even when the app isn\'t open'
  },

  // FINAL STEP - COMPLETION
  {
    path: '/',
    element: '[data-tour="header-logo"]',
    title: 'You\'re Ready to Stay Safe! 🎉',
    description: 'That\'s everything! You now know how to create check-ins, manage your safety circle, set up emergency alerts, and use all the features. Your besties have your back, and we\'ve got you covered!',
    emoji: '✨',
    tip: 'Start with one check-in today! The first one is always the most important. Stay safe out there! 💜'
  }
];

// Helper function to add tour data attributes to elements
export const addTourAttributes = () => {
  const attributeMap = {
    // HomePage elements
    '.check-in-card': 'active-checkins',
    '.quick-buttons': 'quick-buttons',
    '.emergency-sos-button': 'emergency-sos',

    // CreateCheckInPage elements
    '.create-checkin-form': 'create-form',
    'input[placeholder*="location"]': 'location-input',
    'input[placeholder*="Location"]': 'location-input',
    '.duration-buttons': 'duration-buttons',
    '.bestie-selector': 'bestie-selector',
    '.photo-upload': 'photo-upload',
    'textarea[placeholder*="notes"]': 'notes-input',
    'textarea[placeholder*="Notes"]': 'notes-input',
    'button[type="submit"]': 'create-submit',

    // BestiesPage elements
    '.besties-list': 'besties-list',
    '.add-bestie-button': 'add-bestie-button',
    '.activity-feed': 'activity-feed',

    // ProfilePage elements
    '.profile-avatar': 'profile-avatar',
    '.badges-section': 'badges-section',
    '.profile-stats': 'profile-stats',

    // SettingsPage elements
    '.notification-settings': 'notification-settings',
    '.passcode-section': 'passcode-section',
    '.sms-settings': 'sms-settings',

    // Header elements
    '.header-navigation': 'header-nav',
    '.notification-bell': 'notification-bell',
    '.create-button': 'create-button-header'
  };

  Object.entries(attributeMap).forEach(([selector, tourId]) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.setAttribute('data-tour', tourId);
    });
  });
};
