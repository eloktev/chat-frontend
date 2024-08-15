import * as React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import api from '../../api';
import { getAnalytics, logEvent } from "firebase/analytics";
import {userContext} from '../../state/userState';
import {app} from '../../firebase'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function ChangeRoomModal(props) {
    const [rooms, setRooms] = React.useState([]);
    const {show, handleClose, handleShow, roomId, setRoom} = props
    const user = React.useContext(userContext);
    const analytics = getAnalytics(app);
    React.useEffect(() => {
        api.get(`/rooms`)
          .then(response => {
            setRooms(response.data);
          })
          .catch(error => {
            console.error('Error fetching rooms data:', error);
          });
    },[])

    return (
        <Modal
        open={show}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      > 
      <Box sx={style}>
        <Box
            sx={{
                display: 'flex',
                '& > *': {
                    m: 1,
                },
            }}
        >
            <ButtonGroup
                orientation="vertical"
                aria-label="Vertical button group"
                variant="text"
            >
                 {rooms.map((room) => (
                    room.id === roomId ? 
                        <Button key="room.id" disabled>{room.name}</Button>
                    :
                        <Button key="room.id" onClick={() => {
                            logEvent(analytics, 'room_switch', {from: roomId, to: room.id, user: user.user.id});
                            setRoom(room);
                            handleClose();
                          }} >{room.name}</Button>
                    
                    
                ))}
                
            </ButtonGroup>
        </Box>
        </Box>
        </Modal>
    )
}