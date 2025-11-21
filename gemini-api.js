// Gemini API Integration for Email Intelligence
// This connects to Google's Gemini API for real AI-powered analysis

class GeminiAIService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
    }

    // Analyze email using Gemini API
    async analyzeEmailWithGemini(email) {
        const prompt = `Analyze this email and provide insights in JSON format:

From: ${email.from} (${email.email})
Subject: ${email.subject}
Content: ${email.preview}

Please provide:
1. isHotLead (boolean) - Is this a potential sales lead?
2. priority (1-5) - How urgent/important is this email?
3. category (string) - sales, partnership, support, meeting, or general
4. sentiment (string) - positive, neutral, or negative
5. confidence (0-100) - Your confidence in the hot lead classification
6. urgency (string) - high, medium, or low
7. leadScore (0-100) - Overall lead quality score based on conversion likelihood
8. revenueOpportunity (object) - {
     hasOpportunity: boolean,
     signals: array of strings (e.g., "budget mentioned", "pricing inquiry"),
     estimatedValue: string (e.g., "high", "medium", "low", "unknown"),
     dealSize: string (e.g., "$5k-10k", "enterprise", "unknown")
   }

Return ONLY valid JSON, no markdown or code blocks.`;

        try {
            const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`Gemini API returned ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error('Invalid response structure from Gemini API');
            }

            const aiResponse = data.candidates[0].content.parts[0].text;

            // Clean up response (remove markdown code blocks if present)
            const cleanResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            // Parse JSON response
            const analysis = JSON.parse(cleanResponse);
            return analysis;
        } catch (error) {
            console.error('Gemini API error (analysis):', error.message);
            // Fallback to local AI service
            return null;
        }
    }

    // Generate email response using Gemini API
    async generateResponseWithGemini(email) {
        const prompt = `Generate a professional email response for this email:

From: ${email.from} (${email.email})
Subject: ${email.subject}
Content: ${email.preview}

Generate a response that:
1. Is professional and friendly
2. Addresses the sender's needs
3. Suggests next steps (meeting, call, etc.)
4. Is concise (under 200 words)

Return ONLY the email body text, no subject line or formatting.`;

        try {
            const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 500,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Gemini API returned ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error('Invalid response structure from Gemini API');
            }

            const responseBody = data.candidates[0].content.parts[0].text;

            return {
                subject: `Re: ${email.subject}`,
                body: responseBody.trim(),
                tone: 'professional',
                confidence: 95
            };
        } catch (error) {
            console.error('Gemini API error (response):', error.message);
            return null;
        }
    }

    // Summarize email content
    async summarizeEmail(email) {
        const prompt = `Summarize this email in 2-3 concise sentences. Focus on the key points and any action items.

From: ${email.from} (${email.email})
Subject: ${email.subject}
Content: ${email.preview}

Provide a clear, actionable summary.`;

        try {
            const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.5,
                        maxOutputTokens: 150,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Gemini API returned ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error('Invalid response structure from Gemini API');
            }

            return data.candidates[0].content.parts[0].text.trim();
        } catch (error) {
            console.error('Gemini API error (summary):', error.message);
            // Fallback summary
            return `${email.from} is reaching out regarding "${email.subject}". ${email.preview.substring(0, 100)}...`;
        }
    }

    // Suggest follow-up timing based on email context
    async suggestFollowUp(email, analysis) {
        const prompt = `Based on this email, suggest when to follow up if there's no response.

From: ${email.from}
Subject: ${email.subject}
Content: ${email.preview}
Priority: ${analysis.priority}/5
Urgency: ${analysis.urgency}
Category: ${analysis.category}

Provide:
1. followUpDays (number) - How many days to wait before following up (1-7)
2. reason (string) - Brief reason for this timing
3. shouldFollowUp (boolean) - Whether a follow-up is recommended

Return ONLY valid JSON, no markdown.`;

        try {
            const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 200,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Gemini API returned ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error('Invalid response structure from Gemini API');
            }

            const aiResponse = data.candidates[0].content.parts[0].text;
            const cleanResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            return JSON.parse(cleanResponse);
        } catch (error) {
            console.error('Gemini API error (follow-up):', error.message);
            // Fallback based on priority
            return {
                followUpDays: analysis.priority >= 4 ? 2 : analysis.priority >= 3 ? 3 : 5,
                reason: analysis.priority >= 4 ? 'High priority lead - follow up soon' : 'Standard follow-up timing',
                shouldFollowUp: analysis.isHotLead || analysis.priority >= 3
            };
        }
    }

    // Combined analysis and response generation
    async processEmail(email) {
        try {
            // Run analysis first to get priority/category data
            const analysis = await this.analyzeEmailWithGemini(email);
            const analysisData = analysis || this.getFallbackAnalysis(email);

            // Then run summary, response, and follow-up in parallel
            const [summary, response, followUp] = await Promise.all([
                this.summarizeEmail(email),
                this.generateResponseWithGemini(email),
                this.suggestFollowUp(email, analysisData)
            ]);

            return {
                analysis: analysisData,
                response: response || this.getFallbackResponse(email),
                summary: summary,
                followUp: followUp
            };
        } catch (error) {
            console.error('Error processing email:', error);
            const fallbackAnalysis = this.getFallbackAnalysis(email);
            return {
                analysis: fallbackAnalysis,
                response: this.getFallbackResponse(email),
                summary: `${email.from} is reaching out regarding "${email.subject}".`,
                followUp: {
                    followUpDays: 3,
                    reason: 'Standard follow-up timing',
                    shouldFollowUp: email.isLead
                }
            };
        }
    }

    // Fallback to local AI service if API fails
    getFallbackAnalysis(email) {
        const localAI = new AIEmailService();
        return localAI.analyzeEmail(email);
    }

    getFallbackResponse(email) {
        const localAI = new AIEmailService();
        return localAI.generateResponse(email);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GeminiAIService;
}
