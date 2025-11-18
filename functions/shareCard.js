const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Generate dynamic share card HTML with custom meta tags
exports.generateShareCard = functions.https.onRequest(async (req, res) => {
  try {
    const inviteId = req.query.invite;

    if (!inviteId) {
      // No invite parameter - show default card
      return res.send(getDefaultHTML());
    }

    // Fetch user data from Firestore
    const userDoc = await admin.firestore().collection('users').doc(inviteId).get();

    if (!userDoc.exists) {
      // User not found - show default card
      return res.send(getDefaultHTML());
    }

    const userData = userDoc.data();
    const userName = userData.displayName || 'A friend';
    const userPhoto = userData.photoURL || 'https://bestiesapp.web.app/logo192.png';
    const inviteUrl = `https://bestiesapp.web.app/?invite=${inviteId}`;

    // Generate custom HTML with dynamic meta tags
    const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Dynamic Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${inviteUrl}" />
    <meta property="og:title" content="${userName} invited you to Besties!" />
    <meta property="og:description" content="Join ${userName}'s safety network. Keep each other safe with Besties! 💜" />
    <meta property="og:image" content="${userPhoto}" />

    <!-- Dynamic Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${inviteUrl}" />
    <meta property="twitter:title" content="${userName} invited you to Besties!" />
    <meta property="twitter:description" content="Join ${userName}'s safety network. Keep each other safe! 💜" />
    <meta property="twitter:image" content="${userPhoto}" />

    <title>${userName} invited you to Besties!</title>

    <!-- Redirect to main app -->
    <meta http-equiv="refresh" content="0;url=${inviteUrl}" />
  </head>
  <body>
    <p>Redirecting to Besties...</p>
    <p>If you are not redirected, <a href="${inviteUrl}">click here</a>.</p>
  </body>
</html>
    `;

    res.status(200).send(html);
  } catch (error) {
    console.error('Error generating share card:', error);
    res.status(500).send(getDefaultHTML());
  }
});

function getDefaultHTML() {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://bestiesapp.web.app/" />
    <meta property="og:title" content="Besties - Your Safety Network" />
    <meta property="og:description" content="Join Besties! Keep each other safe. 💜" />
    <meta property="og:image" content="https://bestiesapp.web.app/social-card.png" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://bestiesapp.web.app/" />
    <meta property="twitter:title" content="Besties - Your Safety Network" />
    <meta property="twitter:description" content="Join Besties! Keep each other safe. 💜" />
    <meta property="twitter:image" content="https://bestiesapp.web.app/social-card.png" />

    <title>Besties - Your Safety Network</title>

    <meta http-equiv="refresh" content="0;url=https://bestiesapp.web.app/" />
  </head>
  <body>
    <p>Redirecting to Besties...</p>
    <p>If you are not redirected, <a href="https://bestiesapp.web.app/">click here</a>.</p>
  </body>
</html>
  `;
}
