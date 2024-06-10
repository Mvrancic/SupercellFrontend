import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cards.css';


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
      const response = await axios.get('http://44.223.65.159:5000/api/ultimoId'); //ip publica de instancia servidor
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
      tipo: tipoTarjeta === '1' ? 'Type 1 (staff)' : 'Type 2 (prisoner)', 
    };

    // Llama al backend para agregar la nueva tarjeta RFID
    axios.post('http://44.223.65.159:5000/api/agregar_tarjeta', nuevaTarjeta) //ip publica de instancia servidor
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
        <div className='goBack'>
          <button onClick={() => navigate('/')}>Go Back</button>
        </div>
      {waitingForCard ? (
        <div>
          <div className="header1">
          <p>Please, swipe your card through the RFID reader...</p>
          </div>
          <div className="done">
          <button onClick={handleReadyClick} disabled={loading}>Done</button>
          </div>
          {loading && <p>loading...</p>}
        </div>
      ) : (
        <div className="add-card-form">
          <h2>Add new card</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="card-id-field">
              <p>Card ID: {newCardId ? newCardId : '...'}</p>
            </div>
            <label htmlFor="tipoTarjeta">Type:</label>
            <select
              id="tipoTarjeta"
              name="tipoTarjeta"
              value={tipoTarjeta}
              onChange={(e) => setTipoTarjeta(e.target.value)}
            >
              <option value="1">Staff (Type 1)</option>
              <option value="2">Prisoner (Type 2)</option>
            </select>
            <button type="submit">Add new card</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewCard;
