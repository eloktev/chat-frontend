

import * as React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import api from '../../api';
import Topic from './Topic'

export default function TopicList({roomId}) {
    const [topicList, setTopicList] = React.useState([]);


    React.useEffect(() => {
        api.get(`/rooms/${roomId}/topics`)
          .then(response => {
            setTopicList(response.data);
          })
          .catch(error => {
            console.error('Error fetching topics data:', error);
          });
    }, [roomId, topicList])


    return(
        <Box sx={{
            maxWidth: 600,
          }}>
            <Grid container rowSpacing={1}>
                {topicList.length === 0 ?
                <Typography variant="h5"> Nothing here. Be the first to start a topic or change a room </Typography>
                :
                topicList.map((topic) => (
                    <Grid item xs="auto" key={topic.id}>
                        <Topic  topic={topic}/>
                    </Grid>
                ))}
                </Grid>
        </Box>
    )
}