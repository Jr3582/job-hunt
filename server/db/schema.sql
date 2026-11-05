CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    company TEXT NOT NULL,
    job_title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'saved',
    description TEXT NOT NULL,
    url TEXT,
    location TEXT,
    applied_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);