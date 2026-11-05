require('dotenv').config();
const express = require('express');

const { Pool } = require('pg');

/*
POOL: A pool opens a few connections and keeps them ready to reuse.
*/
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})


const app = express();
const PORT = 3001;

app.get('/health', async(req, res) => {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'ok', time: result.rows[0].now})
});

app.get('/hello', (req, res) => {
    res.json({ message : "hi Jimmy" })
})

app.get('/time', (req, res) => {
    const time = new Date()
    res.json({ time: time })
})

app.get('/greet/:name', (req, res) => {
    const name = req.params.name
    res.json({ message: `hi ${name}`})
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})