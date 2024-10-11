import React, { useState, useEffect } from 'react';
import Auth from './assets/components/Auth';
import Quiz from './assets/components/Quiz';


const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setUserAuthenticated(true);
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem('user');
    setUserAuthenticated(false);
  };

  return (
    <div>
      {userAuthenticated ? (
        <Quiz logout={logout} />
      ) : (
        <Auth setUserAuthenticated={setUserAuthenticated} />
      )}
    </div>
  );
};

export default App;
