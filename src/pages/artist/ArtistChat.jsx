
import React from 'react'
import ArtistChatting from '../../components/Artist/ArtistChatting'
import { WebSocketProvider , socketConnection} from '../../context/ChatContext'


function ArtistChat() {
  return (
    <>
    <WebSocketProvider value={socketConnection}>
    <ArtistChatting senderRole={'Artist'} />
    </WebSocketProvider>
    </>
  )
}

export default ArtistChat









