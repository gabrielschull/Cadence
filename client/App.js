import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Provider, useDispatch } from 'react-redux';
import { MemoryRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Home from './chat/components/Home'
import SignOut from './signout/SignOutButton';
import Search from './search/components/Search';
import Login from './login/Login';
import ProfileSetup from './profile/ProfileSetup';
import withAuthProtection from './withAuthProtection';


function App() {
  
  const ProtectedProfileSetup = withAuthProtection(ProfileSetup);
  const ProtectedHomePage = withAuthProtection(HomePage);

  function HomePage() {

    const authState = useSelector((state) => state.user.authState);
    console.log('authState', authState)
    const userInfo = useSelector((state) => state.user.user);
    console.log('userInfo', userInfo)
    
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
          <Route path='profile-setup' element={<ProtectedProfileSetup/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedHomePage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
