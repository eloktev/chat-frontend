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
    maxWidth: '80vw',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const CreateTopicModal = (props) => {
  const navigate = useNavigate();
  const {show, handleClose, handleShow, roomId} = props
  const [topicExists, setTopicExists] = React.useState(false)
  const [tooShort, setTooShort] = React.useState(false)
  const [nonLatin, setNonLatin] = React.useState(false)
  const [caption, setCaption] = React.useState('')
  const user = React.useContext(userContext);


  const updateCaption = e => {
    if (e.target.value) {
    setCaption(e.target.value)
    console.log('Checking caption: ' + e.target.value)
    if (e.target.value.length <= 5) {
        setTooShort(true)
    } else {
      setTooShort(false)
      if (/^[a-zA-Z0-9?. ]+$/.test(e.target.value)) {
        setNonLatin(false)
        api.post(`/rooms/${roomId}/topics/caption`, {caption: e.target.value})
        .then(response => {
          if (response.data) {
            setTopicExists(true)
          } else {
            setTopicExists(false)
          }
        })
        .catch(error => {
          console.log('Failed to validate topic:' + error );
        });
      }
      else {
        setNonLatin(true)
      }
      
      
    }
    }
    
  }

  const createTopic = () => {
    
    // handleClose()
    api.post(`/rooms/${roomId}/topics`, {caption: caption, user_id: String(user.user.id), minchat_id: user.user.minchat_id  })
      .then(response => {
        handleClose()
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
        <TextField 
        required
          id="standard-basic" 
          label="Type your caption" 
          variant="standard" 
          size="small" margin='normal' fullWidth 
          inputProps={{ maxLength: 40}} 
          error={topicExists || tooShort || nonLatin}
          onChange={updateCaption}
          helperText={nonLatin ? "Let's speak English" : tooShort ? "Caption is too short" : topicExists ? "Topic already exists" : ""}
   
        />
        
        <Button disabled={topicExists || tooShort || nonLatin} variant="outlined" margin='normal' className='m-1' onClick={createTopic} sx={{width:200, margin:'auto'}}>Start topic</Button>
        </Stack>
        </Box>
        

      </div>


      </Modal>
      </>
  );
};

export default CreateTopicModal;
