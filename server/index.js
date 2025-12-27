import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Gemini AI
const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
    console.error('ERROR: GEMINI_API_KEY not found in environment variables');
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: geminiApiKey });

// Middleware
app.use(express.json({ limit: '10mb' }));

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
};
app.use(cors(corsOptions));

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
});
app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * POST /api/gemini/tips
 * Generate cooking tips for a recipe
 */
app.post('/api/gemini/tips', async (req, res) => {
    try {
        const { title, ingredients } = req.body;

        if (!title || !ingredients) {
            return res.status(400).json({ error: 'Missing required fields: title, ingredients' });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Act as a warm, professional chef who specializes in family heirlooms. 
                 Provide 3 short, expert tips for making "${title}" perfectly. 
                 Context ingredients: ${ingredients.join(', ')}.
                 Also, suggest one "Nan's Secret Twist" (a modern or unique ingredient addition) that would elevate this specific dish.
                 Format the output with clear headers.`,
        });

        res.json({
            tips: response.text || "I couldn't come up with any specific tips right now, dear."
        });
    } catch (error) {
        console.error('Gemini tips error:', error);
        res.status(500).json({
            error: 'Failed to generate cooking tips',
            message: error.message?.includes('not found') ? 'API configuration error' : 'AI service unavailable'
        });
    }
});

/**
 * POST /api/gemini/search
 * Search for ingredient substitutions
 */
app.post('/api/gemini/search', async (req, res) => {
    try {
        const { title, query } = req.body;

        if (!title || !query) {
            return res.status(400).json({ error: 'Missing required fields: title, query' });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `I'm cooking "${title}" and I need help with: ${query}. Provide ingredient substitutions or advice.`,
            config: {
                tools: [{ googleSearch: {} }]
            }
        });

        const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        res.json({
            text: response.text || "I couldn't find an answer.",
            links: links
        });
    } catch (error) {
        console.error('Gemini search error:', error);
        res.status(500).json({
            error: 'Failed to search substitutions',
            message: 'AI service unavailable'
        });
    }
});

/**
 * POST /api/gemini/image
 * Generate recipe image
 */
app.post('/api/gemini/image', async (req, res) => {
    try {
        const { title, description, imageSize = '1K' } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Missing required field: title' });
        }

        const prompt = `Gourmet food photography of ${title}. ${description || ''}. 8k, natural lighting, rustic kitchen setting.`;

        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: { parts: [{ text: prompt }] },
            config: { imageConfig: { aspectRatio: "16:9", imageSize: imageSize } },
        });

        let base64Image = undefined;
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    base64Image = part.inlineData.data;
                    break;
                }
            }
        }

        if (base64Image) {
            res.json({ imageUrl: `data:image/png;base64,${base64Image}` });
        } else {
            res.status(500).json({ error: 'No image returned from AI service' });
        }
    } catch (error) {
        console.error('Gemini image error:', error);
        res.status(500).json({
            error: 'Failed to generate image',
            message: error.message?.includes('not found') ? 'API configuration error' : 'AI service unavailable'
        });
    }
});

/**
 * POST /api/gemini/audio
 * Generate recipe audio narration
 */
app.post('/api/gemini/audio', async (req, res) => {
    try {
        const { title, ingredients, instructions } = req.body;

        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ error: 'Missing required fields: title, ingredients, instructions' });
        }

        const textToRead = `Recipe for ${title}. Ingredients: ${ingredients.join('. ')}. Method: ${instructions.join('. ')}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Read this recipe naturally and warmly: ${textToRead}` }] }],
            config: {
                responseModalities: ["AUDIO"],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

        if (base64Audio) {
            res.json({ audio: base64Audio });
        } else {
            res.status(500).json({ error: 'No audio returned from AI service' });
        }
    } catch (error) {
        console.error('Gemini audio error:', error);
        res.status(500).json({
            error: 'Failed to generate audio',
            message: 'AI service unavailable'
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Backend API proxy running on http://localhost:${PORT}`);
    console.log(`📡 Accepting requests from: ${corsOptions.origin}`);
    console.log(`🔑 Gemini API Key: ${geminiApiKey ? '✓ Configured' : '✗ Missing'}`);
});
