// AI Service for Email Intelligence
// This simulates AI-powered email analysis and response generation

class AIEmailService {
    constructor() {
        this.hotLeadKeywords = [
            'demo', 'meeting', 'call', 'discuss', 'interested', 'pricing', 
            'partnership', 'opportunity', 'proposal', 'budget', 'purchase',
            'buy', 'invest', 'contract', 'deal', 'schedule', 'available',
            'urgent', 'asap', 'important', 'priority', 'deadline'
        ];

        this.categories = {
            sales: ['demo', 'pricing', 'purchase', 'buy', 'quote', 'proposal'],
            partnership: ['partnership', 'collaborate', 'together', 'joint', 'alliance'],
            support: ['help', 'issue', 'problem', 'bug', 'error', 'not working'],
            meeting: ['meeting', 'call', 'schedule', 'available', 'calendar'],
            feedback: ['feedback', 'review', 'opinion', 'thoughts', 'suggestion']
        };
    }

    // Analyze email and return AI insights
    analyzeEmail(email) {
        const text = `${email.subject} ${email.preview}`.toLowerCase();
        
        return {
            isHotLead: this.detectHotLead(text),
            confidence: this.calculateConfidence(text),
            priority: this.calculatePriority(text),
            category: this.categorizeEmail(text),
            sentiment: this.analyzeSentiment(text),
            urgency: this.detectUrgency(text),
            suggestedResponse: this.generateResponse(email)
        };
    }

    // Detect if email is a hot lead
    detectHotLead(text) {
        const matches = this.hotLeadKeywords.filter(keyword => text.includes(keyword));
        return matches.length >= 2; // At least 2 keywords = hot lead
    }

    // Calculate confidence score (0-100)
    calculateConfidence(text) {
        const matches = this.hotLeadKeywords.filter(keyword => text.includes(keyword));
        const score = Math.min(100, matches.length * 20 + 20);
        return score;
    }

    // Calculate priority (1-5, 5 being highest)
    calculatePriority(text) {
        let score = 1;
        
        if (text.includes('urgent') || text.includes('asap')) score += 2;
        if (text.includes('important') || text.includes('priority')) score += 1;
        if (text.includes('demo') || text.includes('meeting')) score += 1;
        if (text.includes('pricing') || text.includes('purchase')) score += 1;
        
        return Math.min(5, score);
    }

    // Categorize email
    categorizeEmail(text) {
        let bestCategory = 'general';
        let maxMatches = 0;

        for (const [category, keywords] of Object.entries(this.categories)) {
            const matches = keywords.filter(keyword => text.includes(keyword)).length;
            if (matches > maxMatches) {
                maxMatches = matches;
                bestCategory = category;
            }
        }

        return bestCategory;
    }

    // Analyze sentiment (positive, neutral, negative)
    analyzeSentiment(text) {
        const positiveWords = ['great', 'excellent', 'love', 'interested', 'excited', 'looking forward'];
        const negativeWords = ['issue', 'problem', 'disappointed', 'concern', 'unhappy'];

        const positiveCount = positiveWords.filter(word => text.includes(word)).length;
        const negativeCount = negativeWords.filter(word => text.includes(word)).length;

        if (positiveCount > negativeCount) return 'positive';
        if (negativeCount > positiveCount) return 'negative';
        return 'neutral';
    }

    // Detect urgency level
    detectUrgency(text) {
        if (text.includes('urgent') || text.includes('asap') || text.includes('immediately')) {
            return 'high';
        }
        if (text.includes('soon') || text.includes('this week')) {
            return 'medium';
        }
        return 'low';
    }

    // Generate AI response draft
    generateResponse(email) {
        const analysis = {
            text: `${email.subject} ${email.preview}`.toLowerCase(),
            from: email.from
        };

        // Detect intent and generate appropriate response
        if (analysis.text.includes('demo') || analysis.text.includes('meeting')) {
            return this.generateMeetingResponse(email);
        }
        
        if (analysis.text.includes('pricing') || analysis.text.includes('quote')) {
            return this.generatePricingResponse(email);
        }
        
        if (analysis.text.includes('partnership') || analysis.text.includes('collaborate')) {
            return this.generatePartnershipResponse(email);
        }
        
        if (analysis.text.includes('help') || analysis.text.includes('issue')) {
            return this.generateSupportResponse(email);
        }

        return this.generateGeneralResponse(email);
    }

    generateMeetingResponse(email) {
        return {
            subject: `Re: ${email.subject}`,
            body: `Hi ${email.from.split(' ')[0]},

Thank you for reaching out! I'd be happy to schedule a meeting with you.

I have the following times available this week:
• Tuesday, 2:00 PM - 2:30 PM
• Wednesday, 10:00 AM - 10:30 AM  
• Thursday, 3:00 PM - 3:30 PM

Please let me know which time works best for you, and I'll send over a calendar invite with a video meeting link.

Looking forward to connecting!

Best regards,
[Your Name]`,
            tone: 'professional',
            confidence: 95
        };
    }

    generatePricingResponse(email) {
        return {
            subject: `Re: ${email.subject}`,
            body: `Hi ${email.from.split(' ')[0]},

Thank you for your interest in our services!

I'd be happy to discuss pricing options that fit your needs. Our plans are flexible and scale with your team size.

Could we schedule a quick 15-minute call to understand your requirements better? This will help me provide you with the most accurate pricing and recommendations.

I'm available:
• This week: Tuesday-Thursday afternoons
• Next week: Monday-Friday mornings

What works best for you?

Best regards,
[Your Name]`,
            tone: 'sales',
            confidence: 90
        };
    }

    generatePartnershipResponse(email) {
        return {
            subject: `Re: ${email.subject}`,
            body: `Hi ${email.from.split(' ')[0]},

Thank you for reaching out about a potential partnership opportunity!

We're always interested in exploring collaborations that create mutual value. I'd love to learn more about what you have in mind.

Would you be available for a brief introductory call next week? I'd like to understand:
• Your partnership vision
• How our organizations might complement each other
• Potential next steps

Please share your availability, and I'll coordinate accordingly.

Looking forward to the conversation!

Best regards,
[Your Name]`,
            tone: 'collaborative',
            confidence: 88
        };
    }

    generateSupportResponse(email) {
        return {
            subject: `Re: ${email.subject}`,
            body: `Hi ${email.from.split(' ')[0]},

Thank you for contacting us. I'm sorry to hear you're experiencing an issue.

I'd like to help resolve this as quickly as possible. To better assist you, could you please provide:
• A brief description of what you're trying to do
• What's happening instead
• Any error messages you're seeing

Once I have these details, I'll investigate and get back to you with a solution.

Thank you for your patience!

Best regards,
[Your Name]
Support Team`,
            tone: 'supportive',
            confidence: 85
        };
    }

    generateGeneralResponse(email) {
        return {
            subject: `Re: ${email.subject}`,
            body: `Hi ${email.from.split(' ')[0]},

Thank you for your email!

I appreciate you taking the time to reach out. I'd be happy to help with your inquiry.

Could you provide a bit more detail about what you're looking for? This will help me give you the most relevant information.

I look forward to hearing from you!

Best regards,
[Your Name]`,
            tone: 'friendly',
            confidence: 75
        };
    }

    // Get AI insights summary for dashboard
    getInsightsSummary(emails) {
        const analyzed = emails.map(email => ({
            ...email,
            ai: this.analyzeEmail(email)
        }));

        return {
            totalEmails: emails.length,
            hotLeads: analyzed.filter(e => e.ai.isHotLead).length,
            highPriority: analyzed.filter(e => e.ai.priority >= 4).length,
            avgConfidence: Math.round(
                analyzed.reduce((sum, e) => sum + e.ai.confidence, 0) / emails.length
            ),
            categories: this.getCategoryCounts(analyzed),
            urgentEmails: analyzed.filter(e => e.ai.urgency === 'high').length
        };
    }

    getCategoryCounts(analyzedEmails) {
        const counts = {};
        analyzedEmails.forEach(email => {
            const cat = email.ai.category;
            counts[cat] = (counts[cat] || 0) + 1;
        });
        return counts;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIEmailService;
}
