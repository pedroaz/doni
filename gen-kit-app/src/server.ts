import express from 'express';
import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { startFlowServer } from '@genkit-ai/express';
import { streamFlow } from 'genkit/beta/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const ai = genkit({
    plugins: [googleAI()],
    model: googleAI.model('gemini-2.5-flash'),
});

const helloFlow = ai.defineFlow(
    {
        name: 'helloFlow',
        inputSchema: z.object({ name: z.string() }),
        streamSchema: z.string(),
        outputSchema: z.object({ greeting: z.string() }),
    },
    async (input, { sendChunk }) => {
        const { stream, response } = ai.generateStream({
            model: googleAI.model('gemini-2.5-flash'),
            prompt: `Say hello to ${input.name}.`,
        });

        let lastChunkText = '';
        for await (const chunk of stream) {
            sendChunk(chunk.text);
            lastChunkText = chunk.text;
        }

        return {
            greeting: lastChunkText
        };
    },
);

// Streaming endpoint
app.get('/stream', async (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    const result = helloFlow.stream({ name: 'Streaming User' });

    console.log(result.stream);

    // Process the stream chunks as they arrive
    for await (const chunk of result.stream) {
        console.log('Stream chunk:', chunk);
        res.write(typeof chunk === 'string' ? chunk : JSON.stringify(chunk) + '\n');

    }
    res.end('\n');
});

app.listen(PORT, () => {
    console.log(`Streaming server running on http://localhost:${PORT}`);
});

module.exports = app;
