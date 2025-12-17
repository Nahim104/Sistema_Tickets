import React, { useState } from 'react';
import axios from 'axios';

const TicketForm = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [tracker, setTracker] = useState('Bug');
  const [prioridad, setPrioridad] = useState('Normal');
  const [status, setStatus] = useState('Nueva');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      subject,
      description,
      tracker,
      prioridad,
      status
    };

    try {
      const res = await axios.post('http://localhost:4000/crearticket', body);
      console.log('Ticket creado:', res.data);
      setMessage('✅ Ticket creado correctamente');
      setSubject('');
      setDescription('');
    } catch (err) {
      console.error('Error:', err);
      setMessage('❌ Error al crear ticket');
    }
  };

  return (
    <div className="card">
      <h2>Crear ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>Asunto</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Ej: Error en login"
          required
        />

        <label>Descripción</label>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe el problema..."
        />

        <label>Tracker</label>
        <select value={tracker} onChange={(e) => setTracker(e.target.value)}>
          <option value="Bug">Bug</option>
          <option value="Tarea">Tarea</option>
        </select>

        <label>Prioridad</label>
        <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
          <option value="Normal">Normal</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
        </select>

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Nueva">Nueva</option>
          <option value="En Curso">En Curso</option>
          <option value="Cerrada">Cerrada</option>
        </select>

        <button type="submit">Enviar</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default TicketForm;