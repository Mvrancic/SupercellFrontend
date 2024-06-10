import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PrisonLogs.css';



function PrisonLogs() {
    const [cards, setCards] = useState([]);
    const [showCards, setShowCards] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get('http://107.20.128.254:5000/api/show_cards')
        .then(response => {
          setCards(response.data);
        })
        .catch(error => {
          console.error('Error al obtener las tarjetas:', error);
        });
    }, []);
  
    return (
      <div>
        <div className='header'>
            <h1>Prison Logs</h1>
        </div>
        <div className='goBack'>
            <button onClick={() => navigate('/')}>Go Back</button>
        </div>
        <div className='cards'>
            <button onClick={() => setShowCards(!showCards)}>Cards</button>
        </div>
        {showCards && cards.map(card => (
          <div key={card._id}>
            <p>ID: {card.tarjeta_id}</p>
            <p>Type: {card.tipo}</p>
          </div>
        ))}
      </div>
    );
  }
  export default PrisonLogs;