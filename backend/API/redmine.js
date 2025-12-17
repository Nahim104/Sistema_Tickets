const express = require('express');
const axios = require('axios'); 
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors()); //para conectarse con los servidores de diferentes puertos

app.use(express.urlencoded({ extended: true })); // para los formularios

const API_KEY = 'd132df6bbdfdde59ffd983f39569588fda398be6';
const REDMINE_URL = 'http://localhost:3000';

const headers = {
  'X-Redmine-API-Key': API_KEY,
  'Content-Type': 'application/json'
};


const statusList={

  "Nueva": 3,
  "En Curso": 4,
  "Cerrada": 5
}

const TrackerList={
    "Bug": 5,
    "Tarea": 6
}

const PrioridadList={

    "Normal": 1,
    "Alta": 2,
    "Media": 3
}

// Endpoint para crear ticket
app.post('/crearticket', async (req, res) => {
  const { project_id, subject, description, tracker, prioridad, status } = req.body;

    const tracker_id = TrackerList[tracker];
    const priority_id = PrioridadList[prioridad];
    const status_id = statusList[status];

  if (!subject || !tracker_id || !priority_id || !status_id) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const response = await axios.post(
      `${REDMINE_URL}/issues.json`,
      {
        issue: {
          project_id: project_id || "sistema-tickets",
          subject,
          description,
          tracker_id,
          priority_id,
          status_id
        }
      },
      { headers }
    );

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => console.log('Backend corriendo en puerto 4000'));

