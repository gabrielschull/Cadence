import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Provider, useDispatch } from 'react-redux';

import Home from './chat/components/Home'
import SignOut from './signout/SignOutButton';
import Search from './search/components/Search';
import { setUserInfo } from './Redux/UserSlice';

function App() {
  const dispatch = useDispatch()

  /* useEffect(() => {

    const fetchUser = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser()
        const userData = {
          email: userInfo.attributes.email,
        }

        dispatch(setUserInfo(userData))
        console.log('user info:', userData)
      } catch (error) {
        console.log('error fetching user info:', error)
      }
    }
    console.log('auth passed: signed in')
    fetchUser()
  }, [dispatch]) */


  return (

    <div className="App">
      <Home/>
      <Search/>
      <SignOut/>
    </div>
  );
}

export default App;
