# 🔐 Authentication Guide - Mini Inbox

Complete guide for login system and Gmail OAuth integration.

---

## 🎯 **What's New**

### **Option 3: Both Login Page + Gmail OAuth**

You now have a complete authentication system with:

1. ✅ **Beautiful Login Page** (login.html)
2. ✅ **Signup/Registration Page** (signup.html)
3. ✅ **Session Management** (remembers your login)
4. ✅ **Gmail OAuth Integration** (connects to your Gmail)
5. ✅ **Logout Functionality**

---

## 🔗 LinkedIn OAuth Integration (Frontend scaffolding)

This project now includes a front-end integration scaffold for LinkedIn OAuth using the Authorization Code flow with PKCE.

Important notes:
- LinkedIn token exchange typically must run on a server (token endpoint often blocks CORS). The provided front-end starts the flow, generates PKCE code verifier/challenge, and receives the authorization code in `linkedin-callback.html`.
- After receiving the `code` you must perform the server-side exchange to get an access token using the saved `code_verifier`.

Quick steps to try locally (development):

1. Open: `http://localhost:8000/signup.html` and click **Continue with LinkedIn** (you must set the `LINKEDIN_CLIENT_ID` in `linkedin.js`).
2. The popup will redirect to `linkedin-callback.html` which posts a message back to the opener with the `code` and `state`.
3. On the server, exchange the `code` for an access token by calling LinkedIn's token endpoint with the `code_verifier` (from `sessionStorage`).

Server-side example (pseudo):

```
POST https://www.linkedin.com/oauth/v2/accessToken
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=RECEIVED_CODE
&redirect_uri=https://yourdomain.com/linkedin-callback.html
&client_id=YOUR_LINKEDIN_CLIENT_ID
&code_verifier=THE_VERIFIER_YOU_GENERATED
```

4. Save the returned access token on the server and use it to call LinkedIn APIs (e.g., to fetch profile and email).

Security:
- Do not publish your LinkedIn client secret in the browser. Use server-side exchange when possible.
- Use HTTPS in production and register redirect URIs in LinkedIn developer console.

### Server helper (optional)

This repo includes `server.js` (Node/Express) as a local helper to perform the LinkedIn token exchange and fetch profile/email. Usage:

1. Copy `.env.example` to `.env` and set `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`.
2. Install dependencies and start the server (from project root):

```powershell
cd 'c:\Users\senus\mini-inbox-1\mini-inbox'
npm install
npm start
```

3. The server listens on `http://localhost:4000` by default. After a successful authorization, the client will POST the `code` + `code_verifier` to `http://localhost:4000/auth/linkedin/token` and receive the LinkedIn profile and email in response.

4. For production, implement a proper backend with secure storage of client secret and HTTPS.


---

## 🚀 **How to Use**

### **Step 1: Start the Application**

**IMPORTANT:** Gmail OAuth requires a web server!

Run this command in your project folder:

```bash
python3 -m http.server 8080
```

Then open: **http://localhost:8080/login.html**

❌ **DON'T** open `file:///path/to/index.html`
✅ **DO** open `http://localhost:8080/login.html`

---

### **Step 2: Create an Account or Login**

#### **Option A: Traditional Login (Demo Mode)**

1. Go to: **http://localhost:8080/signup.html**
2. Fill in the form:
   - Full Name: Your name
   - Email: any email (demo@example.com)
   - Password: any password (min 8 chars)
3. Click "Create Account"
4. You'll be redirected to the app!

#### **Option B: Google OAuth**

1. Go to: **http://localhost:8080/login.html**
2. Click "Continue with Google"
3. Sign in with your Google account
4. You'll be redirected to the app!

---

## 🔧 **Fixing Gmail OAuth Error**

### **Problem:** "Authentication Error" when clicking Gmail button

### **Root Cause:**

Gmail OAuth doesn't work when:
- ❌ Opening file directly (`file://`)
- ❌ No web server running
- ❌ Wrong OAuth configuration

### **Solution:**

#### **Step 1: Run a Web Server**

```bash
# Navigate to project folder
cd /path/to/mini-inbox

# Start Python server
python3 -m http.server 8080

# OR if python3 doesn't work:
python -m http.server 8080
```

#### **Step 2: Open in Browser**

```
http://localhost:8080/login.html
```

#### **Step 3: Login First**

- Use the login page (demo mode works!)
- Then you'll be redirected to the main app

#### **Step 4: Connect Gmail (Optional)**

- Once in the app, click "🔐 Connect Gmail"
- Google OAuth popup will appear
- Sign in and grant permissions
- Your real emails will load!

---

## 📋 **Authentication Flow**

```
┌─────────────┐
│             │
│  login.html │  ← Start here
│             │
└──────┬──────┘
       │ Login/Signup
       ▼
┌─────────────┐
│             │
│ index.html  │  ← Main app (requires login)
│             │
└──────┬──────┘
       │ Optional: Connect Gmail
       ▼
┌─────────────┐
│             │
│ Gmail OAuth │  ← Load real emails
│             │
└─────────────┘
```

---

## 🎨 **Features of New Login System**

### **Login Page (login.html)**

- ✨ 2025 Modern Design with glassmorphism
- 🌈 Cyan → Purple gradient theme
- 🔐 Email/Password login
- 📧 "Continue with Google" button
- 💾 "Remember me" checkbox
- 🔗 Link to signup page

### **Signup Page (signup.html)**

- ✨ Purple → Pink gradient theme
- 📝 Full name, email, password fields
- 🔒 Password strength indicator
- ✓ Real-time password validation
- 🔗 Link to login page

### **Main App (index.html)**

- ✅ Auto-redirect to login if not logged in
- 👤 Displays your name/email
- 🚪 Logout button
- 🔐 Optional Gmail connection

---

## 💡 **Usage Examples**

### **Example 1: First-Time User**

```
1. Open: http://localhost:8080/signup.html
2. Create account with:
   - Name: John Doe
   - Email: john@example.com
   - Password: SecurePass123
3. ✅ Automatically logged in
4. See the main app with sample emails
```

### **Example 2: Returning User**

```
1. Open: http://localhost:8080/login.html
2. Enter your credentials
3. Check "Remember me" (optional)
4. ✅ Logged in
5. Your session is saved
```

### **Example 3: Connect Real Gmail**

```
1. Login to the app
2. Click "🔐 Connect Gmail"
3. Google OAuth popup appears
4. Sign in with Google
5. Grant permissions
6. ✅ Real emails load!
```

---

## 🔒 **Security Features**

### **Session Management**

- ✅ **LocalStorage**: Persists across browser sessions (Remember me)
- ✅ **SessionStorage**: Clears when browser closes
- ✅ **Auto-redirect**: Protects main app from unauthorized access

### **Password Requirements**

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- Real-time strength indicator

### **Logout**

- Clears all session data
- Redirects to login page
- Confirmation prompt

---

## 🐛 **Troubleshooting**

### **Issue 1: "Authentication Error" when clicking Gmail**

**Cause:** Not running on web server

**Fix:**
```bash
python3 -m http.server 8080
# Then open: http://localhost:8080/login.html
```

---

### **Issue 2: Can't access login page**

**Cause:** Opening file directly

**Fix:**
```
❌ file:///Users/you/mini-inbox/login.html
✅ http://localhost:8080/login.html
```

---

### **Issue 3: Stuck in redirect loop**

**Cause:** Session data corrupted

**Fix:**
1. Open browser console (F12)
2. Type: `localStorage.clear(); sessionStorage.clear();`
3. Press Enter
4. Refresh page

---

### **Issue 4: Gmail OAuth doesn't load real emails**

**Cause:** OAuth client ID not configured

**Fix:** This is a demo app. For production:
1. Create Google Cloud Project
2. Enable Gmail API
3. Create OAuth 2.0 credentials
4. Replace CLIENT_ID in gmail.js

---

## 📱 **Mobile Support**

All authentication pages are fully responsive:

- **Mobile** (< 640px): Single column, touch-friendly
- **Tablet** (640px - 1024px): Optimized layout
- **Desktop** (> 1024px): Full experience

---

## 🎨 **Design System Integration**

All authentication pages use the 2025 Modern Design System:

- **Login**: Cyan → Purple gradient
- **Signup**: Purple → Pink gradient
- **Glassmorphism**: Blurred backgrounds
- **Animations**: Smooth transitions
- **Accessibility**: WCAG AA compliant

---

## 🚀 **Quick Start Commands**

```bash
# Clone the repo (if needed)
git clone https://github.com/senus123/mini-inbox.git
cd mini-inbox
git checkout claude/boxpert-design-system-01MmbbwXKcpdxSmGn92FwG9C

# Start server
python3 -m http.server 8080

# Open in browser
open http://localhost:8080/login.html
# Or manually navigate to http://localhost:8080/login.html
```

---

## ✅ **Testing Checklist**

- [ ] Server running on localhost:8080
- [ ] Login page loads at /login.html
- [ ] Signup page loads at /signup.html
- [ ] Can create account
- [ ] Can login with credentials
- [ ] Redirects to main app after login
- [ ] Main app shows user name
- [ ] Logout button works
- [ ] Can't access main app without login

---

## 🔮 **Future Enhancements**

Possible additions (not included yet):

1. **Firebase Authentication** - Real backend
2. **Password Reset** - Forgot password flow
3. **Email Verification** - Verify email addresses
4. **Two-Factor Auth** - Extra security
5. **Social Logins** - More OAuth providers
6. **User Profiles** - Manage account settings

---

## 📞 **Need Help?**

If Gmail OAuth still doesn't work:

1. **Check you're using http://localhost**
2. **Verify server is running** (`python3 -m http.server 8080`)
3. **Try the demo login** (works without OAuth)
4. **Check browser console** for errors (F12)

---

**Last Updated:** November 2025
**Version:** 2.0.0
**Status:** ✅ Ready to use!
