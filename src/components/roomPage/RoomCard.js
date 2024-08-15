
import * as React from 'react';
import {  Button, Grid } from '@mui/material';
import ChangeRoomModal from './ChangeRoomModal'

export default function RoomCard({room, setRoom}) {

  const [showChangeRoomModal, setShowChangeRoomModal] = React.useState(false);
  const handleCloseChangeRoomModal = () => setShowChangeRoomModal(false);
  const handleShowChangeRoomModal = () => setShowChangeRoomModal(true);

    return(
        <Grid item xs={4}>
        <Button variant="outlined" onClick={handleShowChangeRoomModal}>Room:  {room.name}</Button>
        <ChangeRoomModal show={showChangeRoomModal} handleClose={handleCloseChangeRoomModal} handleShow={handleShowChangeRoomModal} roomId={room.id} setRoom={setRoom}/>
        </Grid>
    )

}