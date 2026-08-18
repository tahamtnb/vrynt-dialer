# Vrynt Dialer

A minimal browser dialer built on Twilio's Voice JavaScript SDK. No caps, no plugins, no extensions. You own it.

## What you need

- Twilio account (you have this)
- Twilio phone number, voice-capable (you have this)
- Vercel account — free, sign up at https://vercel.com with your GitHub
- GitHub account — free, https://github.com

## One-time setup (15 minutes)

### 1. Push this folder to GitHub

1. Go to https://github.com/new → create a new repo called `vrynt-dialer` → keep it private
2. In your terminal:
   ```
   cd C:\Users\DELL\Documents\vrynt-dialer
   git init
   git add .
   git commit -m "initial dialer"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/vrynt-dialer.git
   git push -u origin main
   ```

### 2. Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your `vrynt-dialer` repo
3. Framework Preset: **Other**
4. Leave everything else default
5. Click **Deploy**

After ~30 seconds you get a URL like `https://vrynt-dialer.vercel.app`. Don't open it yet — you need env vars first.

### 3. Add environment variables in Vercel

In your Vercel project → **Settings** → **Environment Variables**, add all four:

| Name | Value |
|---|---|
| `TWILIO_ACCOUNT_SID` | Your Account SID (starts with `AC`) |
| `TWILIO_API_KEY` | Your API Key SID (starts with `SK`) — you already made one earlier |
| `TWILIO_API_SECRET` | The Secret for that API Key |
| `TWIML_APP_SID` | Your TwiML App SID (starts with `AP`) — created in step 4 below |
| `TWILIO_CALLER_ID` | Your Twilio phone number in E.164 format, e.g. `+13125551234` |

**Where to find these:**
- Account SID: https://console.twilio.com (main dashboard)
- API Key + Secret: https://console.twilio.com/us1/account/keys-credentials/api-keys — if you don't have the secret anymore, create a new key
- Caller ID: https://console.twilio.com/us1/develop/phone-numbers/manage/active

### 4. Create the TwiML App

1. Go to https://console.twilio.com/us1/develop/voice/manage/twiml-apps
2. Click **Create new TwiML App**
3. Friendly name: `Vrynt Dialer`
4. **Voice Request URL:** `https://YOUR-VERCEL-URL.vercel.app/api/voice` (use your actual Vercel URL from step 2)
5. HTTP method: **POST**
6. Save
7. Copy the **SID** (starts with `AP`) and paste it into the `TWIML_APP_SID` env var in Vercel

### 5. Redeploy so env vars take effect

In Vercel → **Deployments** → click the `...` menu on the latest → **Redeploy**.

### 6. Open the dialer

Go to your Vercel URL. Allow microphone access. Dial a number. Done.

## Usage tips

- Enter numbers in E.164 format for international: `+14155551234`
- Hold `0` to type `+`
- Backspace or the ⌫ button deletes the last digit
- Enter key places the call

## Costs

You pay Twilio directly at wholesale rates:
- US outbound: ~$0.014/min
- Number rental: ~$1.15/month
- No middleman, no per-call cap

## Troubleshooting

- **"Setup failed" on load** → check env vars in Vercel; redeploy after adding them
- **"Error: JWT..." / token error** → API Key/Secret mismatch, recreate them
- **Call rings but drops immediately** → TwiML App voice URL is wrong; must be `https://.../api/voice`
- **Trial account** → you can only call verified numbers until you add payment method
