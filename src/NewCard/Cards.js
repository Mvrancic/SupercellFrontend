import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const NewCard = () => {
  const [newCardId, setNewCardId] = useState('');
  const [tipoTarjeta, setTipoTarjeta] = useState('1'); // Estado para el tipo de tarjeta
  const [loading, setLoading] = useState(false); // Estado para indicar que se está cargando el ID de la tarjeta
  const [waitingForCard, setWaitingForCard] = useState(true); // Estado para indicar que se está esperando que el usuario pase la tarjeta
  const navigate = useNavigate();

  const capturarIdTarjeta = async () => {
    setLoading(true); // Activar el estado de carga al inicio de la solicitud
    try {
      // Realizar una solicitud al backend para obtener el último ID registrado
      const response = await axios.get('http://54.197.206.2:5000/api/ultimoId'); //ip publica de instancia servidor
      if (response.data && response.data.tarjeta_id) {
        setNewCardId(response.data.tarjeta_id);
        setWaitingForCard(false); // Cambiar estado para dejar de esperar la tarjeta
      } else {
        console.error('No se pudo obtener el ID de la tarjeta desde el servidor.');
      }
    } catch (error) {
      console.error('Error al obtener el ID de la tarjeta:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReadyClick = () => {
    // Activar la búsqueda del ID de tarjeta cuando el usuario está listo
    capturarIdTarjeta();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Objeto con los datos de la nueva tarjeta RFID
    const nuevaTarjeta = {
      tarjeta_id: newCardId,
      tipo: tipoTarjeta === '1' ? 'Tipo 1 (staff)' : 'Tipo 2 (prisionero)', 
    };

    // Llama al backend para agregar la nueva tarjeta RFID
    axios.post('http://54.197.206.2/api/agregar_tarjeta', nuevaTarjeta) //ip publica de instancia servidor
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        setNewCardId('');
        setWaitingForCard(true); 
      })
      .catch(error => {
        console.error('Error al agregar tarjeta:', error);
      });
  };

  return (
    <div className="building">
              <button onClick={() => navigate('/')}>DONE</button>

      {waitingForCard ? (
        <div>
          <p>Por favor, pase la tarjeta por el lector RFID...</p>
          <button onClick={handleReadyClick} disabled={loading}>Listo</button>
          {loading && <p>Cargando...</p>}
        </div>
      ) : (
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
    </div>
  );
};

export default NewCard;
