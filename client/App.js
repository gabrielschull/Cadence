import { useSelector } from 'react-redux'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './chat/components/Home'
import SignOut from './signout/SignOutButton'
import Search from './search/components/Search'
import Login from './login/Login'
import ProfileSetup from './profile/ProfileSetup'
import withAuthProtection from './withAuthProtection'
import ChatWrapper from './chat/chatWrapper'

function App () {
  const ProtectedProfileSetup = withAuthProtection(ProfileSetup)
  const ProtectedHomePage = withAuthProtection(HomePage)

  function HomePage () {
    const authState = useSelector((state) => state.user.authState)
    console.log('authState', authState)
    const userInfo = useSelector((state) => state.user.user)
    console.log('userInfo', userInfo)

    return (
      <>
      <ChatWrapper>
      <Home/>
      <Search/>
      <SignOut/>
      </ChatWrapper>
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
  )
}

export default App
