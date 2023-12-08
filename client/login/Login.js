import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../supabaseClient';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useDispatch } from 'react-redux';
import { setAuthState } from '../Redux/UserSlice'; 

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        supabaseClient.auth.onAuthStateChange((event, session) => {
        
        dispatch(setAuthState({ event, session }));

      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }

      if (session?.access_token) {
        navigate('/');
      }
    });
  }, [dispatch, navigate]);

  return (
<Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: {
          xl: 'calc(100% - 800px)',
          lg: '50%',
          md: '70%'
        },
        margin: 'auto',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          padding: '50px',
          borderRadius: '20px',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
          background: '#1e1e1e'
        }}
      >
        <Stack rowGap={1} margin="0px 0px 40px 0px">
          <Typography variant="h4" color="#fff">
            Cadence
          </Typography>
          <Typography variant="body2" color="#fff">
            AI-assisted client list queries
          </Typography>
        </Stack>
        <Auth
          supabaseClient={supabaseClient}
          redirectTo="chrome-extension://mibfjbpnkbdjbenoobgjapmjljjccpbd/sidebar.html"
          appearance={{
            theme: ThemeSupa,
            style: {
              input: {
                padding: '18px',
                color: 'white',
                borderRadius: '10px'
              },
              button: {
                padding: '14px',
                fontSize: '16px',
                fontWeight: '500',
                borderRadius: '20px',
                border: 'none',
                background: '#086bb1',
                margin: '10px 0px'
              },
              label: {
                fontWeight: '500'
              },
              loader: {
                width: '100%'
              }
            }
          }}
          theme="dark"
          providers={null}
        />
      </Box>
    </Container>
  );
}
