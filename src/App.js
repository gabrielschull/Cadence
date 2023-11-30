import React, { useEffect } from 'react';
import DropFile from './Components/DropFile/DropFile'
import { withAuthenticator } from '@aws-amplify/ui-react';
import SignOut from './Components/SignOutButton/SignOutButton';
import { Provider, useDispatch } from 'react-redux';
import { store } from './Redux/Store';
import { useSelector } from 'react-redux';
import { Auth } from '@aws-amplify/auth'
import { setUserInfo } from './Redux/UserSlice';
import { useSelector } from 'react-redux';

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
