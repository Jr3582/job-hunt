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
app.use(express.json());
const PORT = 3001;

app.get('/jobs', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
        res.json({ status: 'ok', jobs: result.rows});
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

app.post('/jobs', async(req, res) => {
    try{
        const body = req.body;
        const result = await pool.query(
            "INSERT INTO jobs (company, job_title, status, description, url, location, applied_date) VALUES ($1, $2, COALESCE($3, 'saved'), $4, $5, $6, $7) RETURNING *",
            [body.company, body.job_title, body.status, body.description, body.url, body.location, body.applied_date]
        );
        res.status(201).json({ status: 'ok', job: result.rows[0] })
    } catch(err) {
        res.status(400).json({ status: 'error', message: err.message })
    }
})

app.post('/echo', (req, res) => {
    const body = req.body;
    res.json(body);
});

app.get('/health', async(req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ status: 'ok', time: result.rows[0].now})
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
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