import { Box, Grid } from '@mui/material'
import { useSelector } from 'react-redux';
//import Hero from './Upload/Hero.js';

export default function Home() {
    const activeChatId = useSelector((state) => state.chat.activeChatId);

    return ( 
        {/*
        <Grid container>
        <Grid item xl={12} lg={3} md={4}>
        <Box
        display = {{
          xl: 'block',
          lg: 'block',
          md: 'none',
          sm: 'none',
          xs: 'none'
        }}>
          CHAT HISTORY HERE
        </Box>
        </Grid>
         <Grid 
        item 
        xl={9} 
        lg={9} 
        md={12} 
        sm={12} 
        xs={12}
        sx= {{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
          height: '100vh'
        }}>
          {activeChatId ? <ChatContainer /> : <Hero />}
      </Grid>
    </Grid>
    */}
    )
}
