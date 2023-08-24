import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [topics, setTopics] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Fetch topics from your backend API
    axios.get('/api/topics')
      .then(response => {
        setTopics(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <header>
        <h1>Quiz App</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            {}
          </ul>
        </nav>
        <button onClick={openPopup}>Login</button>
      </header>
      <main>
        <h2>Welcome to the Quiz App</h2>
        <ul>
          {topics.map(topic => (
            <li key={topic.id}>
              <Link to={`/quiz/${topic.id}`}>{topic.name}</Link>
            </li>
          ))}
        </ul>
      </main>
      {isPopupOpen && (
        <div className="popup">
          {}
          <button onClick={closePopup}>Close</button>
        </div>
      )}
      {}
    </div>
  );
}

export default Home;
