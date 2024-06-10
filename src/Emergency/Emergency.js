// Emergency.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Emergency.css';

function Emergency() {
  const navigate = useNavigate();
  const handleEmergencyClick = () => {
    axios.post('http://34.227.111.125:5000/api/emergency_lockdown', { lockdown: true })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error al establecer el estado de bloqueo de emergencia:', error);
  });
  };

  const handleSwitchClick = () => {
    axios.post('http://34.227.111.125:5000/api/emergency_lockdown', { lockdown: false })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error al establecer el estado de bloqueo de emergencia:', error);
  });
  };

  return (
    <div className="emergency">
      <div className='done-button'>
      <button onClick={() => navigate('/')}>DONE</button>
      </div>
        <div className='container'>
        <button className="emergency-button" onClick={handleEmergencyClick}>EMERGENCY</button>
        <button className="switch-button" onClick={handleSwitchClick}>TURN OFF</button>
        </div>
    </div>
  );
  
}

export default Emergency;