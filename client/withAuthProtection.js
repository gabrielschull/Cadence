import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabaseClient } from './supabaseClient'

export default function withAuthProtection (Component) {
  return function ProtectedRoute (props) {
    const navigate = useNavigate()

    const validate = useCallback(async () => {
      await supabaseClient.auth
        .getUser()
        .then((user) => {
          if (user.error) {
            console.log('User not signed in - no supabase user available')
            navigate('/login')
          }
        })
    }, [navigate])

    useEffect(() => {
      validate()
    }, [validate])

    return <Component {...props} />
  }
}
