# AI Features - Gemini Integration Guide

## 🤖 AI-Powered Email Features

Your Mini-InboXpert now includes powerful AI features:

### Features Included:
1. **Smart Email Classification** - Automatically detects hot leads with confidence scores
2. **Priority Scoring** - Ranks emails by importance (1-5 scale)
3. **Auto-Categorization** - Classifies emails (Sales, Partnership, Support, Meeting, General)
4. **Sentiment Analysis** - Detects positive, neutral, or negative tone
5. **Auto-Draft Responses** - AI-generated professional email replies
6. **Urgency Detection** - Identifies urgent emails

## 🚀 Quick Start (Local AI - No Setup Required)

The app works out of the box with **simulated AI** - no API key needed!

Just open `dashboard.html` and click any email to see:
- AI insights badges
- Auto-generated response draft
- Meeting scheduler

## 🌟 Upgrade to Real AI (Gemini API)

For **real AI-powered analysis** using Google's Gemini model:

### Step 1: Get Your API Key
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Step 2: Configure
Open `config.js` and update:

```javascript
const CONFIG = {
    GEMINI_API_KEY: 'YOUR_ACTUAL_API_KEY_HERE',  // Paste your key
    USE_GEMINI_API: true,  // Change to true
    GEMINI_MODEL: 'gemini-pro',
};
```

### Step 3: Test
1. Refresh `dashboard.html`
2. Click any email
3. Look for "🤖 AI Insights (Powered by Gemini)" in the popup
4. Check console for: "✅ Using Gemini API for AI analysis"

## 📊 AI Insights Explained

When you click an email, you'll see:

### Priority Badges
- 🔥 **High Priority** (4-5) - Urgent, important emails
- ⚡ **Medium Priority** (3) - Worth attention soon
- (No badge for low priority 1-2)

### Category Badge
- 📁 **Sales** - Pricing, demos, purchases
- 📁 **Partnership** - Collaboration opportunities
- 📁 **Support** - Help requests, issues
- 📁 **Meeting** - Schedule requests
- 📁 **General** - Other emails

### Confidence Score
- ✓ **60-100%** - High confidence in classification
- Lower scores suggest uncertain classification

### Sentiment
- 😊 **Positive** - Enthusiastic, interested
- 😐 **Neutral** - Factual, informational
- 😟 **Negative** - Complaints, concerns

## 💡 Using Auto-Draft Responses

1. Click any email
2. Scroll to "✨ AI-Generated Response Draft"
3. Review the suggested response
4. Click "📋 Copy to Clipboard" to use it
5. Or click "✏️ Edit Draft" to customize

The AI generates context-aware responses based on:
- Email content and tone
- Sender's intent (demo request, pricing inquiry, etc.)
- Professional best practices

## 🔧 Troubleshooting

### "Using local AI simulation" in console
- Your API key isn't configured yet
- Check `config.js` has correct key and `USE_GEMINI_API: true`

### API Errors
- Verify your API key is valid
- Check internet connection
- The app will automatically fall back to local AI if Gemini fails

### No AI insights showing
- Check browser console for errors
- Ensure all script files are loaded (`ai-service.js`, `gemini-api.js`, `config.js`)

## 📝 Files Overview

- `ai-service.js` - Local AI simulation (keyword-based)
- `gemini-api.js` - Real Gemini API integration
- `config.js` - API key configuration
- `dashboard.html` - Main dashboard with AI features

## 🎯 Next Steps

1. Test with local AI first
2. Get Gemini API key for production use
3. Customize response templates in `ai-service.js`
4. Adjust classification keywords for your business

## 💰 Gemini API Pricing

- **Free tier**: 60 requests per minute
- Very affordable for small-medium usage
- Check: https://ai.google.dev/pricing

Enjoy your AI-powered inbox! 🚀
