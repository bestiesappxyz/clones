/**
 * Complete Interactive Tour Configuration
 * Shows users the ACTUAL app interface step by step
 */

export const tourSteps = [
  // WELCOME & DASHBOARD
  {
    path: '/',
    element: '[data-tour="header-logo"]',
    title: 'Welcome to Besties! 💕',
    description: 'Let me show you around! This quick tour will help you understand how everything works. You can skip anytime.',
    emoji: '👋',
    tip: 'This tour shows you the real app - not just pictures!'
  },

  // HOMEPAGE - ACTIVE CHECK-INS AREA
  {
    path: '/',
    element: '[data-tour="active-checkins"]', // We'll add this data attribute
    title: 'Your Safety Dashboard',
    description: 'This is your home base! Here you\'ll see all your active check-ins, with countdown timers and quick actions.',
    emoji: '🏠',
    tip: 'Active check-ins show up here in real-time with countdown timers'
  },

  // QUICK BUTTONS
  {
    path: '/',
    element: '[data-tour="quick-buttons"]',
    title: 'Quick Check-In Buttons',
    description: 'Need to start a check-in fast? These buttons let you create a 15, 30, or 60 minute check-in instantly!',
    emoji: '⚡',
    tip: 'Perfect when you\'re in a hurry and just need quick safety monitoring'
  },

  // EMERGENCY SOS BUTTON
  {
    path: '/',
    element: '[data-tour="emergency-sos"]',
    title: 'Emergency SOS Button',
    description: 'If you ever feel unsafe, press and hold this button. After 5 seconds, all your besties will be alerted with your location.',
    emoji: '🆘',
    tip: 'You can cancel within 10 seconds if pressed by accident'
  },

  // CREATE CHECK-IN - NAVIGATION
  {
    path: '/create',
    element: '[data-tour="create-form"]',
    title: 'Creating a Check-In',
    description: 'Here\'s where the magic happens! Let\'s walk through creating your first check-in step by step.',
    emoji: '✨'
  },

  // LOCATION INPUT
  {
    path: '/create',
    element: '[data-tour="location-input"]',
    title: 'Where Are You Going?',
    description: 'Type in your destination - it could be a restaurant, friend\'s house, or just "walking home". Your location helps your besties know where you are.',
    emoji: '📍',
    tip: 'The app uses Google Maps to find and save your location'
  },

  // DURATION SELECTION
  {
    path: '/create',
    element: '[data-tour="duration-buttons"]',
    title: 'How Long Will You Be?',
    description: 'Choose how long until you need to check in as safe. You\'ll get friendly reminders before time runs out.',
    emoji: '⏰',
    tip: 'Can\'t decide? 30 minutes is perfect for most situations'
  },

  // BESTIE SELECTION
  {
    path: '/create',
    element: '[data-tour="bestie-selector"]',
    title: 'Who Should Know?',
    description: 'Select which besties should be notified if you don\'t check in. They\'ll only get an alert if something seems wrong.',
    emoji: '👥',
    tip: 'You can select multiple besties for extra safety'
  },

  // PHOTO UPLOAD
  {
    path: '/create',
    element: '[data-tour="photo-upload"]',
    title: 'Share Your Vibe (Optional)',
    description: 'Want to share what you\'re up to? Add a photo! Your besties will see it when they check on you.',
    emoji: '📸',
    tip: 'Photos are totally optional but help your friends feel connected'
  },

  // NOTES SECTION
  {
    path: '/create',
    element: '[data-tour="notes-input"]',
    title: 'Add Extra Details',
    description: 'Meeting someone new? Add notes like "First date with Alex from Hinge" or "Dinner at Mario\'s on 5th". Super helpful context for your besties!',
    emoji: '📝',
    tip: 'The more context you give, the better your besties can help if needed'
  },

  // CREATE BUTTON
  {
    path: '/create',
    element: '[data-tour="create-submit"]',
    title: 'Start Your Check-In!',
    description: 'Once you\'ve filled everything out, tap this button to activate your check-in. The countdown starts immediately!',
    emoji: '🚀'
  },

  // BESTIES PAGE - NAVIGATION
  {
    path: '/besties',
    element: '[data-tour="besties-list"]',
    title: 'Your Safety Circle',
    description: 'These are your besties - the people who have your back! Here you can see all your connections and their recent activity.',
    emoji: '💝'
  },

  // ADD BESTIE BUTTON
  {
    path: '/besties',
    element: '[data-tour="add-bestie-button"]',
    title: 'Invite Your Friends',
    description: 'Tap here to add a new bestie! Just enter their phone number and name, and we\'ll send them an invite.',
    emoji: '➕',
    tip: 'The more besties you have, the safer you\'ll be!'
  },

  // ACTIVITY FEED
  {
    path: '/besties',
    element: '[data-tour="activity-feed"]',
    title: 'Stay Connected',
    description: 'See what your besties are up to! Their check-ins, alerts, and safety updates all show up here.',
    emoji: '📱',
    tip: 'You\'ll get notified when a bestie needs you'
  },

  // PROFILE PAGE
  {
    path: '/profile',
    element: '[data-tour="profile-avatar"]',
    title: 'Your Profile',
    description: 'This is your profile! Add a photo, write a bio, and customize your look. Your besties will see this when they check on you.',
    emoji: '⭐'
  },

  // BADGES SECTION
  {
    path: '/profile',
    element: '[data-tour="badges-section"]',
    title: 'Earn Achievements!',
    description: 'Complete check-ins and milestones to unlock badges! Track your progress and show off your safety streak.',
    emoji: '🏆',
    tip: 'You can display your favorite 3 badges on your profile'
  },

  // STATS SECTION
  {
    path: '/profile',
    element: '[data-tour="profile-stats"]',
    title: 'Your Safety Stats',
    description: 'See how many check-ins you\'ve completed, how many besties you have, and more! Track your safety journey.',
    emoji: '📊'
  },

  // SETTINGS - NAVIGATION
  {
    path: '/settings',
    element: '[data-tour="notification-settings"]',
    title: 'Notification Settings',
    description: 'Control how you get notified! You can enable push notifications, SMS reminders, or email alerts.',
    emoji: '🔔',
    tip: 'We recommend keeping notifications on so you never miss a reminder'
  },

  // PASSCODE SETTINGS
  {
    path: '/settings',
    element: '[data-tour="passcode-section"]',
    title: 'Safety vs Duress Passcode',
    description: 'Super important! Set two different passcodes: one that marks you safe, and one that secretly alerts your besties that you\'re in danger.',
    emoji: '🔐',
    tip: 'The duress passcode looks normal but sends a silent alert'
  },

  // SMS SETTINGS
  {
    path: '/settings',
    element: '[data-tour="sms-settings"]',
    title: 'SMS Backup (Optional)',
    description: 'Want SMS reminders as backup? You can enable text message notifications for extra peace of mind.',
    emoji: '💬',
    tip: 'SMS counts are limited - use push notifications to save your texts'
  },

  // HEADER NAVIGATION
  {
    path: '/',
    element: '[data-tour="header-nav"]',
    title: 'Quick Navigation',
    description: 'Use these buttons to quickly jump between Home, Besties, and Profile. Everything is just one tap away!',
    emoji: '🧭'
  },

  // NOTIFICATION BELL
  {
    path: '/',
    element: '[data-tour="notification-bell"]',
    title: 'Your Notifications',
    description: 'This bell shows all your notifications! Check-in reminders, bestie alerts, and more appear here.',
    emoji: '🔔',
    tip: 'The number shows how many unread notifications you have'
  },

  // FINAL STEP - Back to home
  {
    path: '/',
    element: '[data-tour="header-logo"]',
    title: 'You\'re All Set! 🎉',
    description: 'That\'s the complete tour! You now know how to create check-ins, manage your besties, and stay safe. Ready to get started?',
    emoji: '✨',
    tip: 'Remember: Your besties are here for you, and we\'ve got your back!'
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
