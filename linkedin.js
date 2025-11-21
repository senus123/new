// LinkedIn OAuth starter (front-end) - creates PKCE challenge and opens auth popup
// NOTE: LinkedIn token exchange typically requires a server. This script initiates
// the Authorization Code flow with PKCE and posts the received code back to the opener.

const LINKEDIN_CLIENT_ID = 'REPLACE_WITH_LINKEDIN_CLIENT_ID';
const LINKEDIN_SCOPES = 'r_liteprofile r_emailaddress';

function generateRandomString(length = 64) {
    const array = new Uint8Array(length / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

function base64UrlEncode(arrayBuffer) {
    // Convert the ArrayBuffer to base64url
    const uint8 = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < uint8.byteLength; i++) {
        binary += String.fromCharCode(uint8[i]);
    }
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return digest;
}

async function createPKCECodes() {
    const verifier = generateRandomString(128);
    const digest = await sha256(verifier);
    const challenge = base64UrlEncode(digest);
    return { verifier, challenge };
}

function buildAuthUrl({ clientId, redirectUri, scope, state, codeChallenge }) {
    const params = new URLSearchParams();
    params.set('response_type', 'code');
    params.set('client_id', clientId);
    params.set('redirect_uri', redirectUri);
    params.set('scope', scope);
    params.set('state', state);
    params.set('code_challenge', codeChallenge);
    params.set('code_challenge_method', 'S256');
    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}

async function startLinkedInAuth() {
    if (!LINKEDIN_CLIENT_ID || LINKEDIN_CLIENT_ID.includes('REPLACE')) {
        alert('Please set your LinkedIn client id in linkedin.js (LINKEDIN_CLIENT_ID)');
        return;
    }

    const redirectUri = `${window.location.origin}/linkedin-callback.html`;
    const state = generateRandomString(16);
    const { verifier, challenge } = await createPKCECodes();

    // store verifier and state for later verification
    sessionStorage.setItem('linkedin_pkce_verifier', verifier);
    sessionStorage.setItem('linkedin_oauth_state', state);

    const authUrl = buildAuthUrl({
        clientId: LINKEDIN_CLIENT_ID,
        redirectUri,
        scope: LINKEDIN_SCOPES,
        state,
        codeChallenge: challenge
    });

    // open popup
    const width = 600, height = 700;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    const popup = window.open(authUrl, 'linkedin_oauth', `width=${width},height=${height},top=${top},left=${left}`);

    // Wait for message from callback
    function handleMessage(e) {
        if (!e.data || e.data.source !== 'linkedin_oauth') return;
        window.removeEventListener('message', handleMessage);

        const { code, state: returnedState, error } = e.data;
        if (error) {
            console.error('LinkedIn OAuth error:', error);
            alert('LinkedIn authentication failed: ' + error);
            return;
        }

        const expectedState = sessionStorage.getItem('linkedin_oauth_state');
        if (returnedState !== expectedState) {
            console.error('State mismatch', returnedState, expectedState);
            alert('LinkedIn authentication state mismatch. Aborting.');
            return;
        }

            // We have the authorization `code` and the PKCE verifier in sessionStorage
            // Attempt to POST to helper server to exchange the code for tokens + profile
            console.log('✅ LinkedIn authorization code received:', code);
            const serverBase = window.LINKEDIN_SERVER_BASE || 'http://localhost:4000';
            try {
                const verifierStored = sessionStorage.getItem('linkedin_pkce_verifier');
                const resp = await fetch(serverBase + '/auth/linkedin/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code, redirect_uri: `${window.location.origin}/linkedin-callback.html`, code_verifier: verifierStored })
                });
                const json = await resp.json();
                if (!resp.ok) {
                    console.error('Server token exchange failed', json);
                    alert('Server token exchange failed: ' + (json.error || JSON.stringify(json)));
                    return;
                }
                console.log('✅ Server returned LinkedIn profile:', json.profile || json);
                // Store profile/email locally for app use
                localStorage.setItem('linkedin_profile', JSON.stringify(json.profile || {}));
                localStorage.setItem('linkedin_email', JSON.stringify(json.email || {}));
                localStorage.setItem('linkedin_token_resp', JSON.stringify(json.token || {}));
                alert('LinkedIn connected successfully.');
            } catch (e) {
                console.error('Error contacting token server', e);
                alert('LinkedIn connected but token exchange failed: ' + e.message);
            }
    }

    window.addEventListener('message', handleMessage);
}

function attachLinkedInListeners() {
    const linkBtn = document.getElementById('linkedinButton');
    const signupBtn = document.getElementById('linkedinSignupBtn');
    if (linkBtn) linkBtn.addEventListener('click', startLinkedInAuth);
    if (signupBtn) signupBtn.addEventListener('click', (e) => { e.preventDefault(); startLinkedInAuth(); });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachLinkedInListeners);
} else {
    attachLinkedInListeners();
}

console.log('🔗 linkedin.js loaded - LinkedIn UI integration ready');
