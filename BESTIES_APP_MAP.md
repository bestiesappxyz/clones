# BESTIES APP - COMPLETE SYSTEM MAP

Everything explained in simple English.

---

## HOW THE APP WORKS - THE BIG PICTURE

Besties is a safety app. Users create "check-ins" before going somewhere. They pick how long they'll be gone and who to notify. If they don't mark themselves safe in time, their besties get alerted.

---

## MAIN USER FLOWS

### 1. SIGNING UP
**What happens:**
- User opens app → sees login page
- They sign in with Google, email/password, or phone number
- If they came from an invite link, the app remembers who invited them
- New users go to onboarding

**What fires:**
- `LoginPage` → Firebase Auth → `AuthContext` creates user document in Firestore

---

### 2. ONBOARDING (First Time Setup)
**What happens:**
- User sees intro slides explaining the app
- They enter their name
- They upload a profile photo (optional)
- They see their bestie circle (empty at first)
- They can set a safety passcode
- They finish and go to home page

**What fires:**
- `OnboardingPage` → updates user document → sets `onboardingCompleted: true`

---

### 3. CREATING A CHECK-IN
**What happens:**
- User taps "Create Check-In" on home page
- They enter where they're going (with map)
- They pick how long (15 min to 3 hours)
- They choose which besties to notify (1-5 people)
- They can add notes or photos
- They tap "Create" and check-in starts

**What fires:**
- `CreateCheckInPage` → creates document in `checkins` collection
- Status = "active"
- `alertTime` = current time + duration chosen
- Selected besties are stored in the check-in

---

### 4. MARKING YOURSELF SAFE
**What happens:**
- User returns to app while check-in is active
- They see "I'm Safe" button on their check-in card
- If they have a safety passcode, they enter it
- Check-in becomes "completed"
- Besties get notified user is safe

**What fires:**
- `CheckInCard` → calls `completeCheckIn` cloud function
- Status changes from "active" to "completed"
- Notifications sent to besties

---

### 5. MISSING A CHECK-IN (ALERT)
**What happens:**
- Timer runs out, user hasn't marked safe
- Check-in becomes "alerted" (red warning)
- ALL selected besties get notifications instantly
- Email, SMS, push notifications go out
- Besties see red alert on their Besties page
- They can call/text to check on user

**What fires:**
- Cloud function monitors check-ins
- When `alertTime` passes → status = "alerted"
- `notificationService` sends alerts to all besties
- Email/SMS sent via cloud functions

---

### 6. ADDING A BESTIE
**What happens:**
- User goes to Besties page
- Taps "Add Bestie"
- Enters friend's name and phone/email
- Sends invite link
- Friend clicks link, signs up
- Both become connected automatically
- Both see celebration screen

**What fires:**
- `AddBestieModal` → creates document in `besties` collection
- Status = "pending" until accepted
- When friend signs up, `AuthContext` checks for pending invites
- Status → "accepted"
- `bestie_celebrations` document created for animation

---

### 7. REQUESTING ATTENTION
**What happens:**
- User is having rough time
- Taps "Request Attention" on home page
- Picks type: "needs to vent", "rough day", "wants to chat", etc.
- All besties get notification
- Purple badge appears on user's profile everywhere
- Besties can tap to text them

**What fires:**
- `HomePage` → updates user document with `requestAttention` object
- `notificationService.notifyRequestAttention()` sends to all besties

---

### 8. EMERGENCY SOS
**What happens:**
- User taps red SOS button (always visible at bottom)
- Confirmation appears
- All besties immediately notified
- Location shared if available

**What fires:**
- `EmergencySOSButton` → calls `triggerEmergencySOS` cloud function
- Sends urgent notifications to ALL besties (not just selected ones)

---

## PAGES - WHAT EACH ONE DOES

### LoginPage
**Purpose:** Let users sign in or create account
**Actions:** Google sign-in, email/password, phone verification
**Goes to:** Home (existing user) or Onboarding (new user)

### OnboardingPage
**Purpose:** Set up new users
**Actions:** Name, photo, intro slides, safety passcode
**Goes to:** Home page when done

### HomePage
**Purpose:** Main dashboard - daily hub
**Shows:** Active check-ins, quick check-in buttons, stats, request attention
**Actions:** Create check-in, mark safe, request attention

### CreateCheckInPage
**Purpose:** Create a new safety check-in
**Shows:** Map, location search, duration picker, bestie selector, notes
**Actions:** Pick location, set time, choose besties, add notes, create

### BestiesPage
**Purpose:** Manage besties and see their activity
**Shows:** Activity feed, besties list, missed check-in alerts, attention requests
**Actions:** Add bestie, filter list, react to check-ins, call/text besties

### ProfilePage
**Purpose:** User's own profile and stats
**Shows:** Photo, name, bio, stats, badges, bestie circle
**Actions:** Edit profile, change photo, feature badges, share profile

### ViewUserProfilePage
**Purpose:** View someone else's profile
**Shows:** Their photo, name, bio, stats (if allowed), featured badges
**Actions:** View only

### EditProfilePage
**Purpose:** Edit profile details
**Actions:** Change name, bio, photo, contact info

### SettingsPage
**Purpose:** App settings and preferences
**Shows:** Notification settings, security options, privacy, subscription
**Actions:** Toggle notifications, set passcodes, manage privacy, upgrade

### BadgesPage
**Purpose:** View all badges
**Shows:** Earned badges, unearned badges, how to earn them
**Actions:** Feature badges on profile

### CheckInHistoryPage
**Purpose:** View past check-ins
**Shows:** All check-ins with status (completed/alerted)
**Actions:** Filter, paginate, view details

### TemplatesPage
**Purpose:** Save reusable check-in settings
**Shows:** Saved templates
**Actions:** Create template, edit, delete, use for quick check-in

### LocationFavoritesPage
**Purpose:** Save favorite locations
**Shows:** Saved places
**Actions:** Add, edit, delete favorites

### AlertViewPage
**Purpose:** View specific check-in alert
**Shows:** Alert details, location, user info
**Actions:** View only (for non-users who received alert)

### AboutBestiesPage
**Purpose:** About the app
**Shows:** Mission, team, features, how to help
**Actions:** Learn about app

### PrivacyPolicyPage / TermsOfServicePage
**Purpose:** Legal pages
**Shows:** Policy text
**Actions:** Read

### SubscriptionSuccessPage / SubscriptionCancelPage
**Purpose:** After payment
**Shows:** Success or cancellation message
**Actions:** Return to app

### MonitoringDashboard / ErrorDashboard / DevAnalyticsPage
**Purpose:** Admin tools
**Shows:** System stats, errors, user analytics
**Actions:** Admin monitoring only

---

## COMPONENTS - WHAT EACH ONE DOES

### Header
**Purpose:** Top navigation bar
**Shows:** Logo, profile link, notification bell, navigation

### NotificationBell
**Purpose:** Show notification count
**Shows:** Bell icon with red badge if unread notifications
**Taps:** Opens notification dropdown

### EmergencySOSButton
**Purpose:** Emergency alert button
**Shows:** Red floating button at bottom of screen
**Taps:** Triggers emergency alert to all besties

### CheckInCard
**Purpose:** Display a check-in
**Shows:** Location, time remaining, status, actions
**Actions:** Mark safe, extend time, cancel

### QuickButtons
**Purpose:** Fast check-in creation
**Shows:** 15min, 30min, 1hr, 2hr buttons
**Taps:** Goes to create page with time pre-filled

### BestieCard
**Purpose:** Show one bestie
**Shows:** Name, photo, role (guardian/added)
**Taps:** View profile, call, text

### BestieCircle
**Purpose:** Visual circle of top 5 besties
**Shows:** Profile photos in a circle
**Taps:** Manage circle

### BestieRequestCard
**Purpose:** Show pending bestie request
**Shows:** Who sent it, accept/decline buttons
**Actions:** Accept or decline

### AddBestieModal
**Purpose:** Add new bestie form
**Shows:** Name, phone, email fields, send button
**Actions:** Enter info, send invite

### TemplateSelector
**Purpose:** Pick from saved templates
**Shows:** Template cards
**Taps:** Use template for new check-in

### DonationCard
**Purpose:** Ask for donations
**Shows:** Donation info, amount buttons
**Taps:** Start Stripe checkout

### ConfettiCelebration / CelebrationScreen / BestieCelebrationModal
**Purpose:** Fun celebrations
**Shows:** Confetti, animation, message
**Triggers:** New bestie, badge earned

### CountUp
**Purpose:** Animated number counter
**Shows:** Number that counts up from 0
**Used in:** Stats displays

### ErrorBoundary
**Purpose:** Catch errors gracefully
**Shows:** Error message if something breaks
**Prevents:** App from crashing completely

### AdminRoute
**Purpose:** Protect admin pages
**Shows:** Page if admin, redirect if not
**Checks:** User's isAdmin flag

### ScrollToTop
**Purpose:** Auto-scroll to top
**Triggers:** On page navigation

---

## SERVICES - WHAT EACH ONE DOES

### firebase.js
**Purpose:** Connect to Firebase
**Provides:** Auth, database, storage, messaging
**Used by:** Everything

### api.js
**Purpose:** Call backend functions
**Functions:**
- `extendCheckIn` - Add more time to check-in
- `completeCheckIn` - Mark safe
- `sendBestieInvite` - Send invite
- `acceptBestieRequest` - Accept request
- `declineBestieRequest` - Decline request
- `triggerEmergencySOS` - Emergency alert
- `createCheckoutSession` - Start payment
- `sendTestAlert` - Test notifications

### notificationService.js
**Purpose:** Create in-app notifications
**Stores:** Notifications in Firestore
**Types:** bestie_request, check_in_alert, missed_check_in, request_attention, badge_earned

### notifications.js
**Purpose:** Browser push notifications
**Does:** Request permission, register service worker, get FCM token
**Shows:** Toast when notification received while app open

### errorTracking.js
**Purpose:** Track errors and performance
**Stores:** Errors, page views, performance metrics in Firestore
**Used for:** Debugging and analytics

---

## CONTEXTS - SHARED STATE

### AuthContext
**Purpose:** Manage logged-in user
**Stores:** currentUser, userData, loading state
**Listens:** Firebase auth changes, user document changes
**Used by:** Everything that needs user info

### DarkModeContext
**Purpose:** Theme switching
**Stores:** isDarkMode boolean
**Saves:** To localStorage

---

## DATABASE COLLECTIONS

### users
**What it stores:** User profiles
**Fields:** name, email, phone, photo, stats, settings, preferences
**Created:** When user signs up
**Updated:** When user changes settings, stats increase

### checkins
**What it stores:** All check-ins
**Fields:** userId, location, duration, bestieIds, status, alertTime, notes, photos
**Created:** When user creates check-in
**Updated:** When marked safe, extended, or alerted

### besties
**What it stores:** Bestie connections
**Fields:** requesterId, recipientId, status, names, phones
**Created:** When invite sent
**Updated:** When accepted/declined

### notifications
**What it stores:** In-app notifications
**Fields:** userId, type, title, message, read, createdAt
**Created:** When events happen
**Updated:** When marked as read

### badges
**What it stores:** User badges
**Fields:** userId, badges array (id, name, icon, earnedAt)
**Created:** When user earns first badge
**Updated:** When new badge earned

### templates
**What it stores:** Saved check-in templates
**Fields:** userId, name, location, duration, bestieIds, notes
**Created:** When user saves template
**Updated:** When user edits template

### bestie_celebrations
**What it stores:** Celebration triggers
**Fields:** userId, bestieId, bestieName, seen
**Created:** When new bestie connection
**Deleted:** After animation shown

---

## NOTIFICATION CHANNELS

### Email
**When sent:** Always (most reliable)
**Content:** Alert details, link to app
**Provider:** SendGrid via Cloud Functions

### SMS
**When sent:** If enabled and within limit
**Limit:** 5/week free, 20/month premium ($1)
**Provider:** Twilio via Cloud Functions

### Push
**When sent:** If browser permission granted
**Content:** Title and brief message
**Provider:** Firebase Cloud Messaging

### In-App
**When shown:** Always
**Appears:** In notification bell dropdown
**Stored:** In notifications collection

---

## PAYMENT FLOW

### SMS Premium ($1/month)
1. User hits SMS limit (5/week)
2. Sees upgrade prompt
3. Taps "Upgrade"
4. `createCheckoutSession` called
5. Redirected to Stripe
6. Pays $1/month
7. Redirected to `/subscription-success`
8. Can send 20 SMS/month now

### Donations ($1, $5, $10/month)
1. User goes to Settings
2. Taps "Support Besties"
3. Picks amount
4. `createCheckoutSession` called
5. Stripe checkout
6. Recurring monthly charge
7. Gets donation badge on profile

---

## SECURITY FEATURES

### Safety Passcode
**Purpose:** Prevent accidental "I'm safe" taps
**Setup:** In settings or onboarding
**Used:** When marking safe, must enter 4-digit code

### Duress Code
**Purpose:** Secret alert when forced to cancel
**Setup:** In settings
**Used:** Enter this code instead of real passcode
**Effect:** Looks like normal cancel BUT alerts all besties

### Privacy Settings
**Options:**
- Show stats to besties: on/off
- Check-in visibility: all besties / circle only / alerts only
- Data retention: keep / delete after 24h

---

## BACKEND - IF THIS THEN THAT

Everything the server does, explained simply.

### USER ACTIONS → WHAT HAPPENS ON SERVER

**If user signs up →**
- Create their user document with default settings
- Create empty badges document
- Add 1 to total users count

**If user creates check-in →**
- Save check-in with status "active"
- Add 1 to their check-in count
- Schedule alert for when timer runs out

**If user marks safe →**
- Change status to "completed"
- Add 1 to their completed count
- Send "they're safe" notification to all selected besties

**If user extends time →**
- Calculate new alert time
- Update the check-in
- No notifications sent

**If user sends bestie invite →**
- Create bestie document with status "pending"
- Send SMS invite via Twilio (max 20/day limit)

**If bestie accepts request →**
- Change status to "accepted"
- Add 1 to both users' bestie counts
- Check if either earned a badge (3, 5, or 10 besties)
- Award badges if earned

**If bestie declines request →**
- Change status to "declined"
- Remove from pending count

**If user triggers SOS →**
- Create emergency_sos document
- Find ALL their accepted besties
- Send SMS + WhatsApp + Email + Push to everyone
- Message says "EMERGENCY" with location

**If user uses duress code →**
- Create alert with type "duress_code_used"
- Find only their FAVORITE besties (inner circle)
- Send MAXIMUM alert via ALL channels
- Message says "DURESS CODE" - this is serious

**If user starts payment →**
- Create Stripe checkout session
- Save their Stripe customer ID
- Redirect to Stripe

**If Stripe payment completes →**
- If SMS subscription: activate their SMS plan
- If donation: record the donation amount
- Award subscriber or donor badge

**If subscription cancelled →**
- Deactivate SMS plan or donation status
- Remove related badges

### AUTOMATIC THINGS (SCHEDULED)

**Every 1 minute:**
- Check for expired check-ins (alertTime passed)
- If found: change status to "alerted"
- Send notifications to all selected besties
- Via WhatsApp first (free), then SMS (paid), then email

**Every 1 minute:**
- Check for check-ins expiring in 5 minutes
- If found and reminder not sent yet: send push notification
- Mark reminder as sent

**Every day at 3am:**
- Find users WITHOUT "hold data" enabled
- Delete their check-ins older than 24 hours
- Delete their emergency SOS records older than 24 hours
- Delete associated photos from storage

**Every 24 hours:**
- Count yesterday's check-ins
- Save totals to daily_stats for history

### ERROR MONITORING

**If error logged →**
- Check if it's a system error (database, Firebase issues)
- Check if multiple users affected (2+ in 5 minutes)
- If yes to either: email admin with details
- If just one user's error: ignore (no spam)

### NOTIFICATION PRIORITY

When sending alerts, server tries in this order:
1. **WhatsApp** (free, full message)
2. **SMS** (costs money, short message)
3. **Email** (free, full message)
4. **Push** (free, requires permission)

WhatsApp and email always sent.
SMS only if user has SMS enabled and within limit.
Push only if user granted permission.

### BADGE AWARDS

**Safety badges (check-ins completed):**
- 5 completed → Safety Starter
- 25 completed → Safety Pro
- 50 completed → Safety Master

**Bestie badges (connections accepted):**
- 3 besties → Friend Squad
- 5 besties → Safety Circle
- 10 besties → Safety Network

**Guardian badges (people who added YOU):**
- 1 person → Helper
- 3 people → Protector
- 5 people → Guardian
- 10 people → Guardian Angel
- 25 people → Safety Queen

**Subscriber badge:**
- Active SMS subscription → SMS Supporter

**Donor badges:**
- Any donation → Donor
- More donations → Champion, Hero, Legend

### DATA STORAGE

**Where things go:**
- User info → `users` collection
- Check-ins → `checkins` collection
- Connections → `besties` collection
- Badges earned → `badges` collection
- Alert logs → `alerts` collection
- SOS events → `emergency_sos` collection
- In-app notifications → `notifications` collection
- Saved templates → `templates` collection
- Photos → Cloud Storage buckets

**Who can see what:**
- You can see your own stuff
- You can see besties' check-ins (based on their privacy setting)
- Admins can see everything
- Nobody can modify other people's data

### EXTERNAL SERVICES

**Twilio** = sends SMS and WhatsApp messages
**SendGrid** = sends emails
**Stripe** = processes payments
**Firebase Cloud Messaging** = sends push notifications
**Cloud Storage** = stores photos

---

## HOW DATA FLOWS

### Creating Check-In:
```
User fills form
  → CreateCheckInPage validates
    → Writes to Firestore checkins collection
      → Cloud function schedules alert for alertTime
        → HomePage shows active check-in
```

### Marking Safe:
```
User taps "I'm Safe"
  → CheckInCard calls completeCheckIn
    → Cloud function updates status
      → Sends notifications to besties
        → Card shows "Completed" status
```

### Alert Triggering:
```
Cloud function checks checkins
  → Finds expired active check-in
    → Updates status to "alerted"
      → notificationService creates notifications
        → Cloud function sends emails/SMS
          → Besties see red alert
```

### Adding Bestie:
```
User fills AddBestieModal
  → Creates bestie document (pending)
    → Sends invite link
      → Friend signs up
        → AuthContext finds pending request
          → Auto-accepts
            → Both get celebration
```

---

## REAL-TIME UPDATES

The app uses **Firestore listeners** so changes appear instantly:

- **User document** - Profile changes sync everywhere
- **Check-ins** - Status updates show immediately
- **Besties list** - New connections appear right away
- **Notifications** - New alerts show without refresh
- **Activity feed** - Bestie check-ins appear live

---

## ERROR HANDLING

### ErrorBoundary component
- Wraps entire app
- Catches crashes
- Shows friendly error message
- Logs to errorTracking service

### errorTracking service
- Tracks all errors
- Logs page views
- Records performance
- Stores in Firestore for debugging

---

# PRE-LAUNCH TESTING CHECKLIST

Every single action that needs to be tested before launch.

---

## AUTHENTICATION TESTS

### Sign Up
- [ ] Sign up with email/password works
- [ ] Sign up with Google works
- [ ] Sign up with phone number works
- [ ] Verification code arrives for phone
- [ ] Error shows for invalid email format
- [ ] Error shows for weak password
- [ ] Error shows for mismatched passwords
- [ ] "Already have account" link works

### Sign In
- [ ] Sign in with email/password works
- [ ] Sign in with Google works
- [ ] Sign in with phone works
- [ ] "Forgot password" sends reset email
- [ ] Password reset email arrives
- [ ] Reset link works and allows new password
- [ ] Error shows for wrong password
- [ ] Error shows for non-existent account

### Sign Out
- [ ] Sign out button works
- [ ] User redirected to login
- [ ] Can't access protected pages after sign out

### Invite Links
- [ ] Invite link opens app
- [ ] Invite code saved before sign up
- [ ] After sign up, auto-connects with inviter
- [ ] Both users see celebration

---

## ONBOARDING TESTS

### Flow
- [ ] Intro slides show
- [ ] Can swipe through slides
- [ ] Skip button works
- [ ] Name entry field works
- [ ] Name validation (not empty)
- [ ] Photo upload works
- [ ] Photo preview shows
- [ ] Can skip photo
- [ ] Bestie circle intro shows
- [ ] Safety passcode optional
- [ ] Can set 4-digit passcode
- [ ] Finish redirects to home
- [ ] Can't go back to onboarding after complete

---

## HOME PAGE TESTS

### Display
- [ ] User name shows correctly
- [ ] Welcome message shows
- [ ] Stats display correctly
- [ ] Quick check-in buttons visible

### Quick Buttons
- [ ] 15 min button goes to create page
- [ ] 30 min button goes to create page
- [ ] 1 hour button goes to create page
- [ ] 2 hour button goes to create page
- [ ] Time is pre-filled on create page

### Request Attention
- [ ] Button shows when no active check-in
- [ ] Modal opens with tag options
- [ ] Each tag option selectable
- [ ] Can cancel modal
- [ ] Can send request
- [ ] Purple badge appears after sending
- [ ] Besties get notification
- [ ] Can remove active request

### Active Check-In Display
- [ ] Card shows when check-in active
- [ ] Location displays correctly
- [ ] Time remaining counts down
- [ ] Progress bar moves
- [ ] Status indicator correct

---

## CHECK-IN CREATION TESTS

### Location
- [ ] Map loads
- [ ] Current location detected (with permission)
- [ ] Can search for location
- [ ] Search results appear
- [ ] Can select from results
- [ ] Pin shows on map
- [ ] Can drag pin to adjust
- [ ] Location saves correctly

### Duration
- [ ] Duration picker shows
- [ ] Can select 15, 30, 45, 60, 90, 120, 180 min
- [ ] Custom time input works
- [ ] Alert time calculated correctly

### Bestie Selection
- [ ] Bestie list shows
- [ ] Can select 1-5 besties
- [ ] Can't select more than 5
- [ ] Must select at least 1
- [ ] Selected besties highlighted
- [ ] Count shows "3/5 selected" etc.

### Notes & Photos
- [ ] Can add text notes
- [ ] Can attach photo from camera
- [ ] Can attach photo from gallery
- [ ] Photo preview shows
- [ ] Can remove photo
- [ ] Multiple photos allowed

### Creating
- [ ] Create button works
- [ ] Validation errors show (no location, no besties)
- [ ] Success message shows
- [ ] Redirects to home
- [ ] Check-in appears as active

---

## ACTIVE CHECK-IN TESTS

### Display
- [ ] Card shows on home page
- [ ] Location correct
- [ ] Time remaining accurate
- [ ] Countdown updates every minute
- [ ] Status shows "Active"

### Mark Safe
- [ ] "I'm Safe" button visible
- [ ] If passcode set, passcode prompt appears
- [ ] Correct passcode works
- [ ] Wrong passcode rejected
- [ ] Status changes to "Completed"
- [ ] Success message shows
- [ ] Besties notified (check their notifications)

### Extend Time
- [ ] Extend button visible
- [ ] Can add 15, 30, 60 min
- [ ] New alert time calculated
- [ ] Time remaining updates
- [ ] Besties not notified of extension

### Cancel
- [ ] Cancel button visible
- [ ] Confirmation prompt shows
- [ ] Can cancel check-in
- [ ] Check-in removed from home

---

## ALERT TESTS (CRITICAL)

### Triggering
- [ ] Create check-in with short duration (1 min for testing)
- [ ] Wait for timer to expire
- [ ] Status changes to "Alerted"
- [ ] Red warning appears

### Notifications
- [ ] Email sent to all selected besties
- [ ] Email contains location and user info
- [ ] SMS sent (if enabled and within limit)
- [ ] Push notification sent (if enabled)
- [ ] In-app notification created
- [ ] Notification bell shows count

### Bestie Experience
- [ ] Alert shows on Besties page
- [ ] Red card with pulsing animation
- [ ] Location visible
- [ ] Call button works
- [ ] Text button works

### Post-Alert
- [ ] User can still mark safe (late)
- [ ] Status shows "Completed" after late mark safe
- [ ] Check-in goes to history with "Alerted" status

---

## BESTIES PAGE TESTS

### Display
- [ ] Header shows
- [ ] Filters work (All, Circle, Active)
- [ ] Activity feed loads
- [ ] Besties grid shows
- [ ] Empty state shows if no besties

### Activity Feed
- [ ] Shows bestie check-ins
- [ ] Shows completed check-ins (green)
- [ ] Shows active check-ins (blue)
- [ ] Shows alerted check-ins (red)
- [ ] Time ago shows correctly
- [ ] Can react to check-ins
- [ ] Reactions save

### Attention Requests
- [ ] Purple cards show for attention requests
- [ ] Tag displays correctly
- [ ] "Reach Out" button works
- [ ] Opens SMS app

### Missed Check-Ins
- [ ] Red cards show for alerts
- [ ] "Call Now" button works
- [ ] Opens phone app

### Adding Besties
- [ ] "Add" button opens modal
- [ ] Can enter name
- [ ] Can enter phone
- [ ] Can enter email
- [ ] "Send Invite" works
- [ ] Success message shows
- [ ] Invite link copied to clipboard

### Pending Requests
- [ ] Incoming requests show
- [ ] Accept button works
- [ ] Decline button works
- [ ] Requester name shows
- [ ] After accept, bestie appears in list

### Bestie Cards
- [ ] Shows name and photo
- [ ] Call button works
- [ ] Text button works
- [ ] Tap goes to profile

---

## PROFILE PAGE TESTS

### Display
- [ ] Profile photo shows (or initial)
- [ ] Name shows
- [ ] Bio shows (if set)
- [ ] Stats show correctly
- [ ] Featured badges show
- [ ] Bestie circle shows

### Edit Profile
- [ ] Edit button works
- [ ] Can change photo
- [ ] Can change name
- [ ] Can change bio
- [ ] Save button works
- [ ] Changes persist

### Profile Completion
- [ ] Progress bar shows
- [ ] Tasks list shows
- [ ] Completed tasks checked
- [ ] "Go" buttons navigate correctly
- [ ] 100% shows celebration

### Featured Badges
- [ ] "Choose 3" button works
- [ ] Badge selector opens
- [ ] Can select up to 3
- [ ] Can't select more than 3
- [ ] Selection saves
- [ ] Featured badges display

### Share Profile
- [ ] Share buttons work
- [ ] Facebook share opens
- [ ] Twitter share opens
- [ ] WhatsApp share opens
- [ ] Copy link works
- [ ] Link is correct

### Color Picker
- [ ] Color button opens picker
- [ ] Can select colors
- [ ] Background changes
- [ ] Selection saves

---

## SETTINGS TESTS

### Account
- [ ] Email displays
- [ ] Can update email
- [ ] Phone displays
- [ ] Can update phone

### Notifications
- [ ] Email toggle works
- [ ] SMS toggle works
- [ ] Push toggle works
- [ ] WhatsApp toggle works (if available)
- [ ] Settings save

### Security
- [ ] Safety passcode toggle works
- [ ] Can set 4-digit code
- [ ] Duress code toggle works
- [ ] Can set duress code

### Privacy
- [ ] Show stats toggle works
- [ ] Check-in visibility selector works
- [ ] Data retention options work

### Test Alert
- [ ] Send Test Alert button works
- [ ] Receive test notification

### Subscription
- [ ] Shows current plan
- [ ] Upgrade button works (if free)
- [ ] Manage button works (if premium)

### Sign Out
- [ ] Sign out button works
- [ ] Confirmation shows
- [ ] Redirects to login

---

## BADGES PAGE TESTS

- [ ] Shows all badges
- [ ] Earned badges highlighted
- [ ] Unearned badges greyed
- [ ] Badge descriptions show
- [ ] "How to earn" info shows
- [ ] Feature badge from this page works

---

## HISTORY PAGE TESTS

- [ ] All check-ins load
- [ ] Pagination works
- [ ] Filter by status works
- [ ] Check-in details show
- [ ] Location shows
- [ ] Date/time shows
- [ ] Status shows correctly (completed/alerted)

---

## TEMPLATES PAGE TESTS

- [ ] Can create template
- [ ] Template saves
- [ ] Can edit template
- [ ] Can delete template
- [ ] Using template pre-fills create form
- [ ] All fields carry over

---

## EMERGENCY SOS TESTS

- [ ] SOS button visible on all pages
- [ ] Tap shows confirmation
- [ ] Can cancel
- [ ] Confirming triggers alert
- [ ] ALL besties notified (not just selected)
- [ ] Notifications say "EMERGENCY"

---

## NOTIFICATION TESTS

### In-App
- [ ] Bell icon shows
- [ ] Unread count badge shows
- [ ] Dropdown opens
- [ ] Notifications list correctly
- [ ] Marking as read works
- [ ] Count decreases

### Email
- [ ] Receives check-in alerts
- [ ] Receives bestie requests
- [ ] Receives attention requests
- [ ] Email formatting correct
- [ ] Links in email work

### SMS
- [ ] Receives check-in alerts
- [ ] SMS limit tracking works (5/week)
- [ ] Counter resets Monday
- [ ] Premium removes limit

### Push
- [ ] Permission prompt shows
- [ ] Can grant permission
- [ ] Receives notifications
- [ ] Clicking notification opens app
- [ ] Notification shows correct content

---

## PAYMENT TESTS

### SMS Upgrade
- [ ] Limit message shows at 5 SMS
- [ ] "Upgrade" button works
- [ ] Stripe checkout loads
- [ ] Can complete payment (test mode)
- [ ] Success page shows
- [ ] Plan updated to premium
- [ ] Can send more SMS

### Donation
- [ ] Donation card shows
- [ ] Amount buttons work
- [ ] Stripe checkout loads
- [ ] Can complete donation (test mode)
- [ ] Success page shows
- [ ] Donation badge earned

### Subscription Management
- [ ] "Manage Subscription" opens portal
- [ ] Can cancel subscription
- [ ] Can update payment method
- [ ] Changes reflect in app

---

## MOBILE RESPONSIVENESS TESTS

- [ ] Login page looks good on mobile
- [ ] Home page looks good on mobile
- [ ] Check-in creation works on mobile
- [ ] Map works on mobile
- [ ] Besties page looks good on mobile
- [ ] Profile page looks good on mobile
- [ ] Settings page looks good on mobile
- [ ] All modals fit on mobile screens
- [ ] Buttons are tap-friendly size

---

## BROWSER COMPATIBILITY TESTS

Test on:
- [ ] Chrome (desktop)
- [ ] Chrome (mobile)
- [ ] Safari (desktop)
- [ ] Safari (mobile/iOS)
- [ ] Firefox
- [ ] Edge

---

## EDGE CASE TESTS

### No Internet
- [ ] App shows offline message
- [ ] Graceful degradation
- [ ] Reconnects when online

### Slow Internet
- [ ] Loading states show
- [ ] App doesn't freeze
- [ ] Operations complete eventually

### Many Besties
- [ ] 20+ besties doesn't break UI
- [ ] List scrolls properly

### Long Text
- [ ] Long names don't break layout
- [ ] Long notes don't break layout
- [ ] Text truncates appropriately

### Multiple Tabs
- [ ] Changes sync across tabs
- [ ] No duplicate operations

### Page Refresh
- [ ] Data persists after refresh
- [ ] User stays logged in
- [ ] Active check-ins still show

---

## SECURITY TESTS

### Authentication
- [ ] Can't access app without login
- [ ] Protected routes redirect to login
- [ ] Admin pages only for admins
- [ ] Token expires and re-auth required

### Data Access
- [ ] Can't see other users' check-ins
- [ ] Can't modify other users' data
- [ ] API validates user ownership

### Passcodes
- [ ] Safety passcode required when set
- [ ] Duress code triggers alert secretly
- [ ] Can't bypass passcode

---

## PERFORMANCE TESTS

- [ ] App loads in < 3 seconds
- [ ] Page transitions smooth
- [ ] Map loads quickly
- [ ] Images don't block loading
- [ ] No memory leaks on long sessions

---

## ADMIN TESTS (if applicable)

- [ ] Admin can access monitoring dashboard
- [ ] Admin can access error dashboard
- [ ] Admin can access analytics
- [ ] Non-admin can't access these pages

---

## LEGAL PAGES

- [ ] Privacy policy loads
- [ ] Terms of service loads
- [ ] Links work from settings/footer
- [ ] Content is current and accurate

---

## FINAL CHECKS

- [ ] All console errors resolved
- [ ] No broken images
- [ ] All links work
- [ ] Favicon shows
- [ ] Page titles correct
- [ ] Meta descriptions set (for SEO)
- [ ] Analytics tracking works
- [ ] Error tracking works

---

## TESTING ACCOUNTS NEEDED

1. **Primary test user** - Full testing
2. **Bestie test user** - Receive notifications, accept requests
3. **New user account** - Test onboarding flow
4. **Admin account** - Test admin features

---

## TEST DATA TO CLEAN UP

After testing:
- [ ] Remove test check-ins
- [ ] Remove test besties
- [ ] Clear test notifications
- [ ] Remove test templates
- [ ] Cancel test subscriptions

---

**Total Items: 300+**

Go through each section systematically. Check off items as you test them. If something fails, note the issue and fix before launch.
