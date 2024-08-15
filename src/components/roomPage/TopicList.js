

import * as React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import api from '../../api';
import Topic from './Topic'

export default function TopicList({ roomId }) {
  const [topicList, setTopicList] = React.useState([]);


  React.useEffect(() => {
    if (roomId) {
    api.get(`/rooms/${roomId}/topics`)
      .then(response => {
        setTopicList(response.data);
      })
      .catch(error => {
        console.error('Error fetching topics data:', error);
      });
    }
  }, [roomId])


  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 100 }}
    >
      <Grid item xs={3}>
        <Grid container rowSpacing={1} justifyContent='center' alignItems='center'>
          {topicList.length === 0 ?
            <Typography variant="h5" sx={{textAlign:'center'}}> Nothing here. Be the first to start a topic or change a room </Typography>
            :
            topicList.map((topic) => (
              <Grid item xs="auto" key={topic.id}>
                <Topic topic={topic} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  )
}