import logo from './logo.svg';
import React, {useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Login from './Login.js';
import {deleteUser, insertUser} from './backend-calls'

/*to-do
install react router and make header component + different pages
*/
 
  /* FORMAT TO INSERT A USER
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
  */

function App() {
  useEffect(() => {
    insertUser()
    axios.post('/getuserinfo', {username: 'myuser'} )
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;