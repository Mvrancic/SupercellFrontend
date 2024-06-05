import React, { useState } from 'react';
import axios from 'axios';
import './BuildingPlan.css';

const BuildingPlan = () => {
  const [newCardId, setNewCardId] = useState('');
  const [tipoTarjeta, setTipoTarjeta] = useState('1'); // Estado para el tipo de tarjeta
  const [loading, setLoading] = useState(false); // Estado para indicar que se está cargando el ID de la tarjeta
  const [waitingForCard, setWaitingForCard] = useState(true); // Estado para indicar que se está esperando que el usuario pase la tarjeta

  const capturarIdTarjeta = async () => {
    try {
      // Realizar una solicitud al backend para obtener el último ID registrado
      const response = await axios.get('http://52.90.222.249:5000/api/ultimo_id_tarjeta');
      if (response.data && response.data.ultimo_id_tarjeta) {
        setNewCardId(response.data.ultimo_id_tarjeta);
        setWaitingForCard(false); // Cambiar estado para dejar de esperar la tarjeta
      } else {
        console.error('No se pudo obtener el ID de la tarjeta desde el servidor.');
        // Puedes manejar aquí lo que sucede si no se encuentra el ID de tarjeta
      }
      // Desactivar el estado de carga
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener el ID de la tarjeta:', error);
    }
  };

  const handleReadyClick = () => {
    // Activar la búsqueda del ID de tarjeta cuando el usuario está listo
    setLoading(true); // Activar el estado de carga
    capturarIdTarjeta();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Objeto con los datos de la nueva tarjeta RFID
    const nuevaTarjeta = {
      tarjeta_id: newCardId,
      tipo: tipoTarjeta === '1' ? 'staff' : 'prisionero', // Convertir tipoTarjeta a 'staff' o 'prisionero'
      acceso: 'pendiente', // Ajusta según tus necesidades iniciales
      lector_id: 'RFID-1', // Ajusta el ID del lector según tu configuración
      timestamp: new Date().toISOString() // Timestamp actual en formato ISO
    };

    // Llama al backend para agregar la nueva tarjeta RFID
    axios.post('http://52.90.222.249:5000/api/agregar_tarjeta', nuevaTarjeta)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        // Limpiar el formulario después de agregar la tarjeta
        setNewCardId('');
        setWaitingForCard(true); // Volver a mostrar el mensaje inicial
      })
      .catch(error => {
        console.error('Error al agregar tarjeta:', error);
      });
  };

  return (
    <div className="building">
      {/* Mensaje inicial para solicitar pasar la tarjeta por el lector RFID */}
      {waitingForCard ? (
        <div>
          <p>Por favor, pase la tarjeta por el lector RFID...</p>
          <button onClick={handleReadyClick}>Listo</button>
        </div>
      ) : (
        // Formulario para agregar nueva tarjeta
        <div className="add-card-form">
          <h2>Agregar Nueva Tarjeta RFID</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="card-id-field">
              <p>ID de Tarjeta RFID: {newCardId ? newCardId : '...'}</p>
            </div>
            <label htmlFor="tipoTarjeta">Tipo de Tarjeta:</label>
            <select
              id="tipoTarjeta"
              name="tipoTarjeta"
              value={tipoTarjeta}
              onChange={(e) => setTipoTarjeta(e.target.value)}
            >
              <option value="1">Staff (Tipo 1)</option>
              <option value="2">Prisionero (Tipo 2)</option>
            </select>
            <button type="submit">Agregar Tarjeta</button>
          </form>
        </div>
      )}
      {loading && (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default BuildingPlan;
