const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const REDMINE_URL = 'http://localhost:3000'; // Ajusta según tu servidor
const API_KEY = 'd132df6bbdfdde59ffd983f39569588fda398be6';

const headers = {
  'X-Redmine-API-Key': API_KEY,
  'Content-Type': 'application/json'
};

// GET todos los tickets
app.get('/tickets', async (req, res) => {
  const response = await axios.get(`${REDMINE_URL}/issues.json`, { headers });
  res.json(response.data);
});

// POST nuevo ticket
app.post('/tickets', async (req, res) => {
  const response = await axios.post(`${REDMINE_URL}/issues.json`, { issue: req.body }, { headers });
  res.json(response.data);
});

// PUT actualizar ticket
app.put('/tickets/:id', async (req, res) => {
  const response = await axios.put(`${REDMINE_URL}/issues/${req.params.id}.json`, { issue: req.body }, { headers });
  res.json(response.data);
});

// DELETE eliminar ticket
app.delete('/tickets/:id', async (req, res) => {
  const response = await axios.delete(`${REDMINE_URL}/issues/${req.params.id}.json`, { headers });
  res.json({ success: true });
});

app.listen(3000, () => console.log('Backend corriendo en puerto 3000'));
