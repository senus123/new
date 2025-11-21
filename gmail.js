// YOUR CLIENT ID - REPLACE THIS!
const CLIENT_ID = '781392619499-j23upgudedi9ngdipc11ih769inj7n78.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;
let autoRefreshTimer = null;

console.log('📧 Gmail.js loaded - waiting for Google APIs...');

// Initialize Google API
function gapiLoaded() {
    console.log('📍 gapiLoaded() called');
    if (!window.gapi) {
        console.error('❌ window.gapi is not available');
        return;
    }
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    try {
        console.log('📍 initializeGapiClient() starting...');
        await gapi.client.init({
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
        });
        gapiInited = true;
        console.log('✅ Gmail API initialized');
    } catch (error) {
        console.error('❌ Error initializing Gmail API:', error);
        alert('Failed to initialize Gmail API. Please refresh the page.');
    }
}

// Initialize Google Identity Services
function gisLoaded() {
    console.log('📍 gisLoaded() called');
    try {
        if (!window.google) {
            console.error('❌ window.google is not available');
            return;
        }
        
        if (!google.accounts || !google.accounts.oauth2) {
            console.error('❌ Google Identity Services not loaded');
            return;
        }
        
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '',
        });
        gisInited = true;
        console.log('✅ Google Identity initialized');
    } catch (error) {
        console.error('❌ Error initializing Google Identity:', error);
        alert('Failed to initialize Google Authentication. Please refresh the page.');
    }
}

// Sign in
function handleAuthClick() {
    console.log('🔐 handleAuthClick() called');
    console.log('gapiInited:', gapiInited);
    console.log('gisInited:', gisInited);
    console.log('tokenClient:', tokenClient ? 'exists' : 'null');
    
    if (!tokenClient) {
        console.error('❌ Token client not initialized');
        alert('Authentication service not ready. Please refresh the page and wait for initialization.');
        return;
    }
    
    if (!gapi.client.getToken()) {
        console.log('📍 No token exists, requesting new access token with consent prompt');
    } else {
        console.log('📍 Token exists, requesting access token without consent prompt');
    }
    
    tokenClient.callback = async (resp) => {
        console.log('📍 tokenClient callback received:', resp);
        
        if (resp.error !== undefined) {
            console.error('❌ Auth error:', resp.error);
            alert('Authentication failed: ' + resp.error);
            return;
        }
        
        console.log('✅ Authenticated successfully!');
        const authBtn = document.getElementById('authorizeButton');
        if (authBtn) {
            authBtn.style.display = 'none';
            console.log('✅ Auth button hidden');
        } else {
            console.warn('⚠️ Authorize button not found');
        }
        
        await loadGmailEmails();
        startAutoRefresh();
    };

    if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
        tokenClient.requestAccessToken({prompt: ''});
    }
}

// Sign out
function handleSignoutClick() {
    console.log('🚪 Signing out');
    stopAutoRefresh();
    
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        const authBtn = document.getElementById('authorizeButton');
        if (authBtn) {
            authBtn.style.display = 'block';
        }
        location.reload();
    }
}

// Load emails
async function loadGmailEmails() {
    try {
        // Check if APIs are initialized
        if (!gapiInited) {
            console.error('❌ Gmail API not initialized');
            alert('Gmail API not ready. Please refresh the page.');
            return;
        }
        
        console.log('📧 Fetching emails...');
        
        const response = await gapi.client.gmail.users.messages.list({
            'userId': 'me',
            'maxResults': 25,
            'q': 'in:inbox is:unread newer_than:7d'
        });

        const messages = response.result.messages;
        
        if (!messages || messages.length === 0) {
            console.log('📭 No emails found');
            alert('No unread emails in last 7 days');
            return;
        }

        console.log(`📬 Found ${messages.length} emails`);
        fakeEmails.length = 0;
        
        for (let i = 0; i < messages.length; i++) {
            const emailData = await gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': messages[i].id
            });
            
            const email = parseGmailMessage(emailData.result, i + 1);
            fakeEmails.push(email);
        }
        
        console.log('✅ Emails loaded!');
        displayEmailsWithSearch();
        alert(`✅ Loaded ${fakeEmails.length} emails!`);
        
    } catch (error) {
        console.error('❌ Error:', error);
        alert('Error: ' + error.message);
    }
}

// Auto-refresh
function startAutoRefresh() {
    console.log('⏰ Auto-refresh started (30 min)');
    if (autoRefreshTimer) clearInterval(autoRefreshTimer);
    
    autoRefreshTimer = setInterval(async function() {
        console.log('🔄 Auto-refreshing...');
        try {
            await loadGmailEmails();
            showNotification('✅ Emails refreshed!');
        } catch (error) {
            console.error('❌ Refresh failed:', error);
        }
    }, 30 * 60 * 1000);
}

function stopAutoRefresh() {
    if (autoRefreshTimer) {
        clearInterval(autoRefreshTimer);
        autoRefreshTimer = null;
        console.log('⏸️ Auto-refresh stopped');
    }
}

function showNotification(text) {
    const notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;top:20px;right:20px;background:#10B981;color:white;padding:15px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-weight:bold;z-index:9999;';
    notif.textContent = text;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// Parse email
function parseGmailMessage(message, id) {
    const headers = message.payload.headers;
    const subject = getHeader(headers, 'Subject') || '(No Subject)';
    const from = getHeader(headers, 'From') || 'Unknown';
    const date = getHeader(headers, 'Date') || '';
    
    let senderName = from;
    let senderEmail = from;
    const emailMatch = from.match(/<(.+)>/);
    if (emailMatch) {
        senderEmail = emailMatch[1];
        senderName = from.replace(emailMatch[0], '').trim().replace(/['"]/g, '');
    }
    
    let preview = getEmailBody(message.payload);
    if (preview.length > 150) preview = preview.substring(0, 150) + '...';
    
    const emailDate = new Date(date);
    const diffDays = Math.ceil(Math.abs(new Date() - emailDate) / (1000 * 60 * 60 * 24));
    
    let timeDisplay;
    if (diffDays === 0) {
        timeDisplay = emailDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true});
    } else if (diffDays === 1) {
        timeDisplay = 'Yesterday';
    } else {
        timeDisplay = `${diffDays} days ago`;
    }
    
    const isLead = detectIfLead(subject, preview);
    
    return {
        id: id,
        from: senderName || senderEmail,
        email: senderEmail,
        subject: subject,
        preview: preview,
        time: timeDisplay,
        isLead: isLead,
        done: false
    };
}

function getHeader(headers, name) {
    const h = headers.find(h => h.name.toLowerCase() === name.toLowerCase());
    return h ? h.value : null;
}

function getEmailBody(payload) {
    let body = '';
    if (payload.body.data) {
        body = atob(payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
    } else if (payload.parts) {
        for (let part of payload.parts) {
            if (part.mimeType === 'text/plain' && part.body.data) {
                body = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
                break;
            }
        }
    }
    return body.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function detectIfLead(subject, body) {
    const keywords = ['demo', 'meeting', 'call', 'interested', 'partnership', 'pricing', 'quote', 'inquiry', 'schedule', 'discuss', 'opportunity', 'proposal'];
    const text = (subject + ' ' + body).toLowerCase();
    return keywords.some(k => text.includes(k));
}

// Attach event listeners
console.log('📧 Gmail script loaded');

function attachGmailListeners() {
    const authBtn = document.getElementById('authorizeButton');
    
    if (authBtn) {
        authBtn.addEventListener('click', handleAuthClick);
        console.log('✅ Auth button ready');
        
        // Add a status check
        const checkStatus = setInterval(() => {
            if (gapiInited && gisInited) {
                console.log('✅ Both Google APIs initialized');
                authBtn.disabled = false;
                clearInterval(checkStatus);
            } else {
                console.log('⏳ Waiting for APIs... gapi:', gapiInited, 'gis:', gisInited);
                authBtn.disabled = true;
                authBtn.title = 'Initializing Google APIs...';
            }
        }, 500);
        
        // Timeout after 10 seconds
        setTimeout(() => {
            if (!gapiInited || !gisInited) {
                console.error('❌ Google APIs failed to initialize after 10 seconds');
                clearInterval(checkStatus);
                authBtn.disabled = true;
                authBtn.title = 'Error: Google APIs failed to load. Please refresh.';
            }
        }, 10000);
    } else {
        console.warn('⚠️ Authorize button not found');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachGmailListeners);
} else {
    attachGmailListeners();
}