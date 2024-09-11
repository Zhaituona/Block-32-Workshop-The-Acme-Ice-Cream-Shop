const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

app.use(bodyParser.json());

// Routes
app.get('/api/flavors', async (req, res) => {
  const result = await pool.query('SELECT * FROM flavors');
  res.json(result.rows);
});

app.get('/api/flavors/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM flavors WHERE id = $1', [id]);
  if (result.rows.length > 0) {
    res.json(result.rows[0]);
  } else {
    res.status(404).send('Flavor not found');
  }
});

app.post('/api/flavors', async (req, res) => {
  const { name, is_favorite } = req.body;
  const result = await pool.query(
    'INSERT INTO flavors (name, is_favorite) VALUES ($1, $2) RETURNING *',
    [name, is_favorite]
  );
  res.status(201).json(result.rows[0]);
});

app.put('/api/flavors/:id', async (req, res) => {
  const { id } = req.params;
  const { name, is_favorite } = req.body;
  const result = await pool.query(
    'UPDATE flavors SET name = $1, is_favorite = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
    [name, is_favorite, id]
  );
  if (result.rows.length > 0) {
    res.json(result.rows[0]);
  } else {
    res.status(404).send('Flavor not found');
  }
});

app.delete('/api/flavors/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM flavors WHERE id = $1', [id]);
  res.status(204).send();
});

// Server listening
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
