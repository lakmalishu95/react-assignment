import React, { useState } from 'react';
import { BrowserRouter as Router, Route,Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ReportPage from './components/ReportPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            {isLoggedIn ? <Redirect to="/report" /> : <LoginPage handleLogin={handleLogin} />}
          </Route>
          <Route path="/report">
            {!isLoggedIn ? <Redirect to="/login" /> : <ReportPage />}
          </Route>
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
