// BuildingPlan.js
import React, { useState } from 'react';
import {ReactComponent as LockIcon} from './lock.svg';
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
      axios.get('http://54.197.206.2/api/emergency_lockdown')
        .then(response => {
          setLockdown(response.data.lockdown);
        })
        .catch(error => {
          console.error('Error al obtener el estado de bloqueo de emergencia:', error);
        });
    }, 1000); // Actualiza el estado de bloqueo cada segundo

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  const handleDoorClick = (doorNumber, e) => {
    e.stopPropagation();
    if (selectedDoor === doorNumber) {
      setSelectedDoor(null);
    } else {
      setSelectedDoor(doorNumber);
      setLoading(true);
      setTimeout(fetchRecords, 2000); // Wait for 2 seconds before fetching records
    }
  };

  const fetchRecords = () => {
    // Replace this with your actual backend call
    fetch('http://54.197.206.2:5000/api/show_records') //ip publica de instancia servidor
      .then(response => response.json())
      .then(data => {
        setRecords(data);
        setLoading(false);
      });
  };

  return (
    <div className='grid-container' onClick={() => setSelectedDoor(null)}>
      <Menu />
      {[...Array(12)].map((_, i) => (
        <div key={i} className='cell'>
          {lockdown && <LockIcon/>}
          <button className='door' onClick={(e) => handleDoorClick(i + 1, e)}>Door {i + 1}</button>
        </div>
      ))}
      {selectedDoor && (
        <div className='animated-div' onClick={(e) => e.stopPropagation()} style={{ overflow: 'auto' }}>
          <button onClick={() => setSelectedDoor(null)} style={{ float: 'right' }}>X</button>
          <h2>Registro de lecturas de puerta {selectedDoor}</h2>
          {loading ? 'Cargando...' : records.map(record => (
            <div key={record._id} style={{ borderBottom: '1px solid black', padding: '10px' }}>
              <p>Id de tarjeta: {record.tarjeta_id}</p>
              <p>Tipo de tarjeta: {record.tipo}</p>
              <p>Time: {new Date(record.time).toLocaleDateString()} {new Date(record.time).toLocaleTimeString()}</p>
              <p>Acceso: {record.access_result}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuildingPlan;