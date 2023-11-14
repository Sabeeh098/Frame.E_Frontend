import React from 'react'
import ChatPage from '../../components/ChatPage'
import { WebSocketProvider , socketConnection} from '../../context/ChatContext'


function ChattingPage() {
  return (
    <>
    <WebSocketProvider value={socketConnection}>
    <ChatPage senderRole={"User"}/>
    </WebSocketProvider>
    </>
  )
}

export default ChattingPage