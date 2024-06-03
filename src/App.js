import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [lecturas, setLecturas] = useState([]);

  useEffect(() => {
    axios.get('http://54.221.128.114:5000/api')
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