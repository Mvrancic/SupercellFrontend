import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './BuildingPlan.css';

const BuildingPlan = () => {
  const [activeRoom, setActiveRoom] = useState(null);
  const [lecturas, setLecturas] = useState([]);

  useEffect(() => {
    axios.get('http://52.90.222.249:5000/api') //ip publica de instancia servidor
      .then(response => {
        setLecturas(response.data);
        console.log(response.data);
        console.log(lecturas);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleRoomClick = (roomId) => {
    if (activeRoom === roomId) {
      setActiveRoom(null); // Ocultar registros si se hace clic en la misma puerta nuevamente
    } else {
      setActiveRoom(roomId);
    }
  };

  const rooms = [
    { id: 'cell1', name: 'Cell 1' },
    { id: 'cell2', name: 'Cell 2' },
    // Añade más habitaciones según sea necesario
  ];

  return (
    <div className="building">
      {rooms.map((room) => (
        <div key={room.id} className="room" onClick={() => handleRoomClick(room.id)}>
          {room.name}
          <div className="door"></div>
        </div>
      ))}
      {activeRoom && (
        <div className="info-box">
          <h2>Door Logs for {activeRoom}</h2>
          <div id="log-content">
            {activeRoom === 'cell1' && lecturas.length > 0 ? (
              lecturas.sort((a, b)=> new Date(b.timestamp) - new Date(a.timestamp))
              .map((lectura, index) => {
                const date = new Date(lectura.timestamp);
                const formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
                const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                return (
                  <div key={index}>
                    <p>Card ID: {lectura.tarjeta_id}</p>
                    <p>Time: {formattedTime}, Date: {formattedDate}</p>
                    <p>Access: {lectura.acceso}</p>
                    <hr />
                  </div>
                );
              })
            ) : (
              <p>No logs available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildingPlan;
