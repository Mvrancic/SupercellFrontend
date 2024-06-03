import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [lecturas, setLecturas] = useState([]);

  useEffect(() => {
    axios.get('http://54.227.53.250:5000/api') //ip publica de instancia servidor
      .then(response => {
        setLecturas(response.data);
        console.log(response.data);
        console.log(lecturas);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Lecturas RFID</h1>
      <ul>
        {lecturas.map(lectura => (
          <li key={lectura._id}>{lectura.tarjeta_id}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;