// BuildingPlan.js
import React, { useState } from 'react';
import { useEffect } from 'react';
import Menu from './Menu'; 
import axios from 'axios';
import './BuildingPlan.css';

function BuildingPlan() {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState(null);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [lockdown, setLockdown] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://44.223.65.159:5000/api/emergency_lockdown') //ip publica de instancia servidor
        .then(response => {
          setLockdown(response.data.lockdown);
        })
        .catch(error => {
          console.error('Error al obtener el estado de bloqueo de emergencia:', error);
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDoorClick = (doorNumber, e) => {
    e.stopPropagation();
    if (selectedDoor === doorNumber) {
      setSelectedDoor(null);
    } else {
      setSelectedDoor(doorNumber);
      setLoading(true);
      setTimeout(fetchRecords, 1000); // Wait for 2 seconds before fetching records
    }
  };

  const fetchRecords = () => {
    axios.get('http://44.223.65.159:5000/api/show_records')
      .then(response => {
        const sortedRecords = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setRecords(sortedRecords);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los registros:', error);
      });
  };

  return (
    <div className='grid-container' onClick={() => setSelectedDoor(null)}>
      <Menu />
      {[...Array(12)].map((_, i) => (
        <div key={i} className='cell'>
          <button 
            className={`door ${lockdown ? 'door-lockdown' : ''}`} 
            onClick={(e) => handleDoorClick(i + 1, e)}
          >
            Door {i + 1}
          </button>
        </div>
      ))}
      {selectedDoor && (
        <div className='animated-div' onClick={(e) => e.stopPropagation()} style={{ overflow: 'auto' }}>
          <button onClick={() => setSelectedDoor(null)} style={{ float: 'right' }}>X</button>
          <h2>Access logs for door: {selectedDoor}</h2>
          {loading ? 'Cargando...' : records.map(record => (
            <div key={record._id} style={{ borderBottom: '1px solid black', padding: '10px' }}>
              <p>Card ID: {record.tarjeta_id}</p>
              <p>Type: {record.tipo_tarjeta}</p>
              <p>Time: {new Date(record.timestamp).toLocaleDateString()} {new Date(record.timestamp).toLocaleTimeString()}</p>
              <p>access: {record.access_result}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuildingPlan;