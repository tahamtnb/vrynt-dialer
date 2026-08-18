// Serverless function: generates a Twilio Access Token for the browser Voice SDK.
// The browser never sees your Account SID or API secret — only a short-lived token.

const twilio = require('twilio');

module.exports = (req, res) => {
  try {
    const AccessToken = twilio.jwt.AccessToken;
    const VoiceGrant = AccessToken.VoiceGrant;

    const {
      TWILIO_ACCOUNT_SID,
      TWILIO_API_KEY,
      TWILIO_API_SECRET,
      TWIML_APP_SID,
    } = process.env;

    if (!TWILIO_ACCOUNT_SID || !TWILIO_API_KEY || !TWILIO_API_SECRET || !TWIML_APP_SID) {
      return res.status(500).json({
        error: 'Missing environment variables. Check Vercel settings.',
      });
    }

    // Identity is just a label for this browser session
    const identity = 'vrynt-dialer-' + Math.random().toString(36).slice(2, 8);

    const token = new AccessToken(
      TWILIO_ACCOUNT_SID,
      TWILIO_API_KEY,
      TWILIO_API_SECRET,
      { identity, ttl: 3600 } // 1 hour
    );

    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: TWIML_APP_SID,
      incomingAllow: false, // set to true if you want inbound calls too
    });
    token.addGrant(voiceGrant);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      identity,
      token: token.toJwt(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
