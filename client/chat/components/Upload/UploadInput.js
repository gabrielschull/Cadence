import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'

const StyledBox = styled(Box)({
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '10px',
  padding: '10px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: 'black',
    color: 'white'
  }
})

export default function UploadInput ({ getInputProps }) {
  return (
    <>
      <input {...getInputProps()} />
      <StyledBox>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: {
              xl: '30px',
              lg: '24px',
              md: '20px',
              sm: '20px',
              xs: '20px'
            }
          }}
        >
          chat with your client list or document in real time
        </Typography>
        <Typography
          sx={{
            padding: '10px 0px',
            fontSize: {
              xl: '20px',
              lg: '16px',
              md: '14px',
              sm: '14px',
              xs: '14px'
            }
          }}
        >
          Go ahead! Ask Cadence!
        </Typography>
      </StyledBox>
    </>
  )
}
