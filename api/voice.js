// Serverless function: returns TwiML telling Twilio to dial the number
// the browser passed as the "To" parameter.

const twilio = require('twilio');

module.exports = (req, res) => {
  // Vercel doesn't parse form bodies by default; handle both
  const body = req.body || {};
  const to = body.To || (req.query && req.query.To);

  const twiml = new twilio.twiml.VoiceResponse();
  const callerId = process.env.TWILIO_CALLER_ID;

  if (!to) {
    twiml.say('No destination number was provided.');
  } else {
    const dial = twiml.dial({
      callerId: callerId,
      answerOnBridge: true,
    });
    // If it looks like a phone number, dial it as PSTN. Otherwise treat as SIP client.
    if (/^[\d\+\-\(\)\s]+$/.test(to)) {
      dial.number(to.replace(/[^\d+]/g, ''));
    } else {
      dial.client(to);
    }
  }

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
};
