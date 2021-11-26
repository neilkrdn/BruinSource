import logo from './logo.svg';
import React, {useEffect} from 'react';
import './App.css';
import axios from 'axios';

/*to-do

install react router and make header component + different pages
create server w/ heroku and place info into .env
figure out structure of stored data
*/


function App() {
  const values = {
    id: 1134,
    status: false,
    usename: 'myuser',
    password: 'testpass',
    email: 'howard',
    github: 'no',
    year_exp: 1,
    known_languages: ['javascript', 'python'],
    projects_worked: [1,3,]
  } 
  

  useEffect(() => {
    axios.post('/test', values)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }, )


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
