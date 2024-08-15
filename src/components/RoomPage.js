import * as React from 'react';
import { Typography, Grid, Stack, Fab } from '@mui/material';
import RoomCard from './roomPage/RoomCard';
import TopicList from './roomPage/TopicList';
import CreateTopicModal from './roomPage/CreateTopicModal';
import AddIcon from '@mui/icons-material/Add';
import { userContext } from '../state/userState';
import api from '../api';

export default function RoomPage() {
    const [room, setRoom] = React.useState({});
    const [showCreateTopicModal, setShowCreateTopicModal] = React.useState(false);
    const handleCloseCreateTopicModal = () => setShowCreateTopicModal(false);
    const handleShowCreateTopicModal = () => setShowCreateTopicModal(true);


    React.useEffect(() => {
        if (!room.id) {
            api.get('/rooms')
          .then(response => {
            setRoom(response.data[0]);
          })
          .catch(error => {
            console.error('Error fetching room data:', error);
          });
        }
        
      }, [room.id]);


    return (
        <Stack spacing={4}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="h2"> SecretTalks.app </Typography>
                <Typography variant="subtitle1" gutterBottom> Safespace to find an anomyous partner </Typography>
            </Grid>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <RoomCard room={room} setRoom={setRoom} />

            </Grid>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
            <TopicList roomId={room.id} />
            </Grid>
            {/* <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                User_id: {user.user.id}<br />
                User fingerprint: {user.user.fingerprint}<br />
                User minchat_id: {user.user.minchat_id}
            </Grid> */}
            <Fab variant="extended" sx={{
                position: 'absolute', bottom: 32,
                right: 32
            }} onClick={handleShowCreateTopicModal}>
                <AddIcon sx={{ mr: 1 }} />
                Create topic
            </Fab>
            <CreateTopicModal show={showCreateTopicModal} handleClose={handleCloseCreateTopicModal} handleShow={handleShowCreateTopicModal} roomId={room.id} />

        </Stack>

    )

};