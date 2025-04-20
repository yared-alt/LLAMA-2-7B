import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";
import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const MODEL_PATH = process.env.SPATH || "./models/llama-2-7b-chat.Q4_K_M.gguf";
const CPU_THREADS = parseInt(process.env.CPU_THREADS) || 4;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

let model, context, session;

async function initializeModel() {
    try {
        const absolutePath = path.resolve(MODEL_PATH);
        if (!fs.existsSync(absolutePath)) {
            throw new Error(`Model not found at ${absolutePath}`);
        }

        console.log("Loading model...");
        model = new LlamaModel({
            modelPath: absolutePath,
            gpuLayers: 0,
        });

        context = new LlamaContext({
            model,
            threads: CPU_THREADS,
            batchSize: 256,
        });

        session = new LlamaChatSession({
            context,
            systemPrompt: "You are a helpful AI assistant."
        });
        console.log("Model loaded successfully!");
    } catch (error) {
        console.error("Initialization error:", error);
        process.exit(1);
    }
}

app.post('/generate', async (req, res) => {
    if (!session) {
        return res.status(503).json({ error: "Model is still loading" });
    }

    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        console.time("Inference");
        const response = await session.prompt(prompt);
        console.timeEnd("Inference");
        
        res.json({
            prompt,
            response,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Generation error:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

app.get('/health', (req, res) => {
    res.json({
        status: session ? "ready" : "loading",
        model: path.basename(MODEL_PATH),
        threads: CPU_THREADS
    });
});

initializeModel().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});