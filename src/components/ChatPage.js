import api from '../api';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import {userContext} from '../state/userState';
import Chat from './chat/Chat';


function ChatPage() {
    const user = React.useContext(userContext);
    const {topicId} = useParams();
    const [topic,setTopic] = React.useState({})

    React.useEffect(() => {

        api.get(`/topics/${topicId}`)
        .then(response => {
            setTopic(response.data)
            console.log(response.data)

            if (user.user.id && response.data.author_id != user.user.id && response.data.respondee_id == null) {
                api.put(`/topics/${topicId}/add_respondee?respondee_id=${user.user.id}`)
                .then(response =>{
                    console.log(response.data)
                })
                .catch(error =>
                    console.error('Error setting respondee:', error)
                )
            }
        })
        .catch(error => {
          console.error('Error fetching topic data:', error);
        });

    }, [user.user.id, topicId]);
    return (

        <Chat
            // user = {user.user}
            topicStatus = {topic.status}
            topicAuthorId = {topic.author_id}
            topicRespondeeId = {topic.respondee_id}
            topicId={topic.id}
            chatId={topic.chat_id}
            userFingerprint={user.user.fingerprint}
        />
    )
};

export default ChatPage;