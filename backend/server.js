import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

const __dirname = path.resolve();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    // serve index.html for all routes to support client-side routing on refresh
    app.get('*', (_req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}


app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});