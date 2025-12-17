import { useState } from 'react';
import axios from 'axios';
import './Forms.css';

const TicketForm = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [tracker, setTracker] = useState('Bug');
  const [prioridad, setPrioridad] = useState('Normal');
  const [status, setStatus] = useState('Nueva');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { subject, description, tracker, prioridad, status };

    try {
      await axios.post('http://localhost:4000/crearticket', body);
      setMessage('Ticket creado correctamente');
      setSubject('');
      setDescription('');
    } catch (err) {
      setMessage(' Error al crear ticket');
    }
  };

  return (
    <div className="ticket-container">
      <h2>Crear ticket</h2>

      <form className="ticket-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Asunto</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Ej: Error en login"
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe el problema..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tracker</label>
            <select value={tracker} onChange={(e) => setTracker(e.target.value)}>
              <option value="Bug">Bug</option>
              <option value="Tarea">Tarea</option>
            </select>
          </div>

          <div className="form-group">
            <label>Prioridad</label>
            <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
              <option value="Normal">Normal</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Nueva">Nueva</option>
              <option value="En Curso">En Curso</option>
              <option value="Cerrada">Cerrada</option>
            </select>
          </div>
        </div>

        <button type="submit">Crear ticket</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default TicketForm;