import React, { useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useSelector } from 'react-redux';
import { Auth } from '@aws-amplify/auth'
import { Provider, useDispatch } from 'react-redux';

import DropFile from './Components/DropFile/DropFile.js'
import SignOut from './Components/SignOutButton/SignOutButton.js';
import { setUserInfo } from './Redux/UserSlice.js';

function App() {
  const dispatch = useDispatch()
  const activeChatId = useSelector((state) => state.chat.activeChatId);

  useEffect(() => {

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
  }, [dispatch])


  return (

    <div className="App">
        <p>
          Cadence
        </p>
      <DropFile/>
      <SignOut/>
    </div>
  );
}

export default withAuthenticator(App);
