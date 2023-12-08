import { History, MarkChatRead } from '@mui/icons-material';
import { Box, Icon, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FeatureBox = styled(Box)({
  backgroundColor: 'black',
  padding: '10px',
  boxShadow: '0px -1px 11px 0px rgb(148 ,164, 255, 0.19)',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  width: '220px',
  margin: '20px 30px',
  color: 'white',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: 'white',
    color: 'black',
  },
});

export default function FeatureCards() {
  const features = [
    {
      title: 'Chat',
      description: 'Chat with client lists or documents and return to it anytime',
      icon: MarkChatRead
    },
    {
      title: 'History',
      description: 'View your chat history with your document',
      icon: History
    }
  ];

  return (
    <>
      {features.map((feature, index) => (
        <FeatureBox
          key={index}
        >
          <Icon component={feature.icon} />
          <Typography variant="h6">{feature.title}</Typography>
          <Typography>{feature.description}</Typography>
        </FeatureBox>
      ))}
    </>
  );
}