import * as React from 'react';
import Box from '@mui/material/Box';
import { Stack, TextField, Modal } from '@mui/material';
import Button from '@mui/material/Button';
import api from '../../api';
import {userContext} from '../../state/userState';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  

const CreateTopicModal = (props) => {
  const navigate = useNavigate();
  const {show, handleClose, handleShow, roomId} = props
  const [caption, setCaption] = React.useState('')
  const user = React.useContext(userContext);

  const createTopic = () => {
    
    handleClose()
    api.post(`/rooms/${roomId}/topics`, {caption: caption, user_id: String(user.user.id), minchat_id: user.user.minchat_id  })
      .then(response => {
        // handleClose()
        navigate(`/chat/${response.data.id}`)
      })
      .catch(error => {
        console.log('Failed to create topic:' + error );
      });
  };

    return (
      <>
        <Modal
        open={show}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      > 
      <div>
       
      <Box sx={style}>
      <Stack spacing={2}>
        <h2 id="child-modal-title">Create your own topic</h2>
        {/* <input hidden value={roomId} readOnly/> */}
        <TextField id="standard-basic" label="Type your caption" variant="standard" size="small" margin='normal' fullWidth inputProps={{ maxLength: 40 }} 
        onChange={(event) => {
          setCaption(event.target.value);
        }}
        />
        
        <Button variant="outlined" margin='normal' className='m-1' onClick={createTopic}>Start topic</Button>
        </Stack>
        </Box>
        

      </div>


      </Modal>
      </>
  );
};

export default CreateTopicModal;
