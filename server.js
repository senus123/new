require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Simple health check
app.get('/', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'dev' }));

// Exchange authorization code for access token and return LinkedIn profile
app.post('/auth/linkedin/token', async (req, res) => {
  try {
    const { code, redirect_uri, code_verifier } = req.body;
    if (!code || !redirect_uri) {
      return res.status(400).json({ error: 'Missing code or redirect_uri' });
    }

    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: 'Server not configured with LinkedIn client credentials' });
    }

    const tokenParams = new URLSearchParams();
    tokenParams.append('grant_type', 'authorization_code');
    tokenParams.append('code', code);
    tokenParams.append('redirect_uri', redirect_uri);
    tokenParams.append('client_id', clientId);
    tokenParams.append('client_secret', clientSecret);
    if (code_verifier) tokenParams.append('code_verifier', code_verifier);

    const tokenResp = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: tokenParams.toString()
    });

    if (!tokenResp.ok) {
      const errText = await tokenResp.text();
      return res.status(502).json({ error: 'Failed to get access token', details: errText });
    }

    const tokenJson = await tokenResp.json();
    const accessToken = tokenJson.access_token;

    // Fetch basic profile
    const profileResp = await fetch('https://api.linkedin.com/v2/me', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    const profile = profileResp.ok ? await profileResp.json() : null;

    // Fetch email address
    const emailResp = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const emailJson = emailResp.ok ? await emailResp.json() : null;

    res.json({ token: tokenJson, profile, email: emailJson });

  } catch (error) {
    console.error('LinkedIn token exchange error', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`LinkedIn helper server listening on port ${PORT}`));
