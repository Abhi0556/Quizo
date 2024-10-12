import React, { useState } from 'react';

const Auth = ({ setUserAuthenticated }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();

    if (isSignup) {
      const user = { username, password };
      
      sessionStorage.setItem(username, JSON.stringify(user));

      alert('Account created successfully! Please login.');
      setIsSignup(false); 
      setUsername(''); 
      setPassword(''); 
    } else {
      
      const storedUser = sessionStorage.getItem(username);
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === password) {
          setUserAuthenticated(true);
        } else {
          alert('Invalid password. Please try again.');
        }
      } else {
        alert('User does not exist. Please sign up.');
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-between w-1/2 bg-gray-100 p-8">
        <div className="flex items-start">
        <img
            src="../../../src/logo.jpg" 
            alt="Quizo Logo"
            className="w-30 h-20 items-center"
          />

          <h1 className="text-4xl font-bold ml-4 text-black">Quizo</h1>
        </div>
      </div>

    
      <div className="flex flex-col justify-center items-center w-1/2 bg-white p-8">
        <h2 className="text-3xl font-bold text-black mb-6">Welcome to Quizo</h2>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-lg text-light-gray mb-1" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg text-light-gray mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handleAuth}
            className="w-full p-2 bg-[#7A83F5] text-white rounded hover:bg-[#6c7cfa]"
          >
            {isSignup ? 'Signup' : 'Login'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignup(!isSignup);
              setUsername(''); 
              setPassword(''); 
            }}
            className="w-full mt-4 text-black hover:underline"
          >
            {isSignup ? 'Already have an account? Login' : 'Don’t have an account? Signup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
