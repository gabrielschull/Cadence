import { Box, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import Hero from './Upload/Hero.js'
import ChatContainer from './ChatElements/ChatContainer.js'
import History from './ChatHistory/history.js'

export default function Home () {
  const activeChatId = useSelector((state) => state.chat.activeChatId)

  return (

        <Grid container sx = {{
          bgcolor: 'white',
          borderBottom: '2px solid black'
        }}>
        <Grid
        sx = {{
          textAlign: 'center',
          bgcolor: '#8a6d9e',
          borderRight: '1px solid black',
          '&:hover': {
            bgcolor: '#937ca3'
          }
        }}
        item xl={12} lg={3} md={4}>
        <Box
        display = {{
          xl: 'block',
          lg: 'block',
          md: 'none',
          sm: 'none',
          xs: 'none'
        }}>
          <History/>
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

  )
}
