// Emergency.js
import React from 'react';
import axios from 'axios';
import './Emergency.css';

function Emergency() {
    
  const handleEmergencyClick = () => {
    axios.post('http://54.197.206.2/api/emergency_lockdown', { lockdown: true })
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
      })
      .catch(error => {
        console.error('Error al activar el bloqueo de emergencia:', error);
      });
  };

  const handleSwitchClick = () => {
    axios.post('http://54.197.206.2/api/emergency_lockdown', { lockdown: false })
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
      })
      .catch(error => {
        console.error('Error al desactivar el bloqueo de emergencia:', error);
      });
  };

  return (
    <div className="emergency">
        <div className='container'>
        <button className="emergency-button" onClick={handleEmergencyClick}>EMERGENCY</button>
        <button className="switch-button" onClick={handleSwitchClick}>TURN OFF</button>
        </div>
    </div>
  );
  
}

export default Emergency;