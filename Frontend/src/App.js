import React from 'react';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {!isLoggedIn ? (
        <Login />
      ) : (
        <>
          <Header />
          <Dashboard />
        </>
      )}
    </div>
  );
}

export default App;