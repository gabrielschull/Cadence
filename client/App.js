import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Provider, useDispatch } from 'react-redux';
import { MemoryRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Home from './chat/components/Home'
import SignOut from './signout/SignOutButton';
import Search from './search/components/Search';
import Login from './login/Login';
import withAuthProtection from './withAuthProtection';


function App() {
  
  const ProtectedHomePage = withAuthProtection(HomePage);

  function HomePage() {

    const authState = useSelector((state) => state.user.authState);
    console.log('authState', authState)
    
    return (
      <>
      <Home/>
      <Search/>
      <SignOut/>
      </>
    )
  }

  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedHomePage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
