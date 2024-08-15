import { MinChatUI } from '@minchat/reactui';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {  MessageHeader } from "@minchat/react-chat-ui";
import {userContext} from '../../state/userState';
import api from '../../api';

export default function Chat({
    // user,
    topicStatus,
    topicAuthorId,
    topicRespondeeId,
    topicId,
    chatId,
    userFingerprint
}){
    const user = React.useContext(userContext);

    const navigate = useNavigate();
    const onBack = (() => {
        console.log('pressed back')
        
        api.put(`/topics/${topicId}/cancel`)
            .then(response => {console.log(response.data)})
            .catch(error => {console.error("Error closing topic: ", error)})  
        navigate('/')      

    })

    const renderMessageListHeader = ({ heading, isMobile }) => {
        return <MessageHeader
          lastActive={void 0}
          mobileView={isMobile}
          showBack={isMobile}
          onBack={onBack}> {heading}</MessageHeader>
      };

    React.useEffect(() => {

        console.log("author: " + topicAuthorId + " respondee : " + topicRespondeeId + " user: " + user.user.id)
        if (topicStatus == "CLOSED" || (topicAuthorId && topicRespondeeId && user.user.id && topicAuthorId != user.user.id && topicRespondeeId != user.user.id)) {
            navigate(`/`)
        }
      }, [user, topicStatus, navigate, topicAuthorId, topicRespondeeId])

    return(
        <MinChatUI
                // startConversation={()=>  {topic.author_id == user.user.id ? String(topic.respondee_id): String(topic.author_id)}}
                // startConversation={}
                mobileView={false}
                theme='#6ea9d7'
                height='100vh'
                apiKey='CLZAZGJBC0C4T3MG9HNS2HVGT'
                user={{
                    username: userFingerprint,
                    name: userFingerprint,
                }}
                openChatId={chatId}
                renderMessageListHeader = {renderMessageListHeader}
            />
    )
}