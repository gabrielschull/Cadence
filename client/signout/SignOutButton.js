import { supabaseClient } from '../supabaseClient'
import { signOut } from '../Redux/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveChatId } from '../Redux/ChatSlice'

function SignOut () {
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.user.authState)

  const handleSignOut = async () => {
    if (authState.event === 'SIGNED_IN') {
      const { error } = await supabaseClient.auth.signOut()
      if (error) {
        console.log('Error signing out:', error)
      } else {
        dispatch(setActiveChatId(null))
        dispatch(signOut())
      }
    }
  }
  return (

          <div><button onClick = {handleSignOut} style = {{ margin: '30px' }}>Sign Out</button></div>

  )
}

export default SignOut
