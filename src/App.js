import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


const App = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [joke, setJoke] = useState('');
  const [dogImage, setDogImage] = useState('');
  const [quote, setQuote] = useState('');
  const [users, setUsers] = useState([]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

 
  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      setJoke(`${response.data.setup} - ${response.data.punchline}`);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  const fetchDogImage = async () => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random');
      setDogImage(response.data.message);
    } catch (error) {
      console.error('Error fetching dog image:', error);
    }
  };

  const fetchQuote = async () => {
    try {
      const response = await axios.get('http://api.quotable.io/quotes/random');
      
      
      const randomQuote = response.data[0]; 
      setQuote(`${randomQuote.content} - ${randomQuote.author}`);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };
  
  

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api?results=10');
      setUsers(response.data.results);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Fun API Integrations</h1>
      <input type="date" value={selectedDate} onChange={handleDateChange} />

      <div className="button-container">
        <button onClick={fetchJoke}>Get Random Joke</button>
        <button onClick={fetchDogImage}>Get Random Dog Image</button>
        <button onClick={fetchQuote}>Get Random Quote</button>
        <button onClick={fetchUsers}>Get Random Users</button>
      </div>

      <div className="content-container">
        {joke && (
          <div className="card">
            <h2>Joke</h2>
            <p>{joke}</p>
          </div>
        )}

        {dogImage && (
          <div className="image-container">
            <h2>Dog Image</h2>
            <img src={dogImage} alt="A random dog" />
          </div>
        )}

        {quote && (
          <table className="quote-table">
            <thead>
              <tr>
                <th>Quote</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{quote.split(' - ')[0]}</td>
                <td>{quote.split(' - ')[1]}</td>
              </tr>
            </tbody>
          </table>
        )}

        {users.length > 0 && (
          <div>
            <h2>User Information</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Picture</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{`${user.name.first} ${user.name.last}`}</td>
                    <td>{user.email}</td>
                    <td>{`${user.location.city}, ${user.location.country}`}</td>
                    <td>
                      <img src={user.picture.thumbnail} alt={`${user.name.first}'s thumbnail`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
