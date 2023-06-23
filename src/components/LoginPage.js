import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';


const API_ENDPOINT = 'http://148.251.225.118:3200/api/login';

function LoginPage({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(API_ENDPOINT, {
        username,
        password,
      });

      const userData = response.data.user_data;
      handleLogin(userData);
    } catch (error) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={handleUsernameChange}
          />
        </div><br></br>
        <div>
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
          />
        </div><br></br>
        <Button type="submit" variant="contained" fullWidth>
          Log in
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
