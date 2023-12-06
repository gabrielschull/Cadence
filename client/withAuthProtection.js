import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from './supabaseClient';

export default function withAuthProtection(Component) {
  return function ProtectedRoute(props) {
    const authState = useSelector((state) => state.user.authState);
    const navigate = useNavigate();

    const validate = useCallback(async () => {
      await supabaseClient.auth
        .getUser()
        .then((user) => {
          if (user.error) {
            console.log('User not signed in - no supabase user available');
            navigate('/login');
          }
        })
    }, [authState, navigate]);

    useEffect(() => {
      validate();
    }, [validate]);

    return <Component {...props} />;
  };
}