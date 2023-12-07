import { toast } from 'react-toastify';

import { useHttpClient } from '../../../useHttpClient';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';

import { setActiveChatId } from '../../../Redux/ChatSlice';

export default function DeleteDialog({ chatToDelete, setChatToDelete }) {

  const { fetch } = useHttpClient();

  return (
    <Dialog
      open={chatToDelete !== null}
      onClose={() => setChatToDelete(null)}
      sx={{
        '& .MuiDialog-paper': {
          background: '#1e1f22',
          color: '#ffffff',
          borderRadius: '1px'
        },
        background: 'rgba(62, 66, 97, 0.89)'
      }}
    >
      <DialogTitle>
        This chat and document history will be deleted permanently
      </DialogTitle>
      <DialogContent variant="subtitle1">
        Do you want to continue?
      </DialogContent>
      <DialogActions>
        <Button
          type="reset"
          color="secondary"
          variant="text"
          onClick={() => {
            setChatToDelete(null);
            dispatch(setActiveChatId(null));
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="error"
          variant="text"
          onClick={async () => {
            await fetch(`/api/chat/${chatToDelete}`, {
              method: 'DELETE'
            })
              .then(() => {
                dispatch(setActiveChatId(null));
                setChatToDelete(null);

                toast.success('Chat history deleted successfully');
              })
              .catch((error) => {
                console.error({ error });
                toast.error('Error deleting chat history');
              });
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
