import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

export default async function handler(req, res) {
    // CORS Bypass Headers taaki aapka frontend isse connect ho sake
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Testing ke liye base route
    if (req.method === 'GET') {
        return res.status(200).json({ message: "Official Agent Router Backend is Live 24/7 on Vercel!" });
    }

    if (req.method === 'POST') {
        try {
            const { prompt } = req.body;

            // Official Agent Router endpoint aur headers
            const response = await fetch('https://agentrouter.org/v1/messages', {
                method: 'POST',
                headers: {
                    'x-api-key': 'Sk-7eeoGOHiiviyMTB6Rxe87lOnB7rGgto8FR8JKmDztKpmriZX',
                    'anthropic-version': '2023-06-01',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'claude-3-5-sonnet',
                    max_tokens: 1024,
                    messages: [
                        { role: 'user', content: prompt }
                    ]
                })
            });

            const data = await response.json();
            return res.status(200).json(data);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
