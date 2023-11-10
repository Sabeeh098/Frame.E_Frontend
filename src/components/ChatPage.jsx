import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { userAxiosInstance } from "../api/axios";
import { io } from 'socket.io-client';
import { UserAPI } from "../constants/api";


function ChatPage({ senderRole }) {
  const userId = useSelector((state) => state.user.id);
  const { artistId } = useParams();

  const [chattedList, setChattedList] = useState([]);
 
  const token = useSelector((state) => state.user.token);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState({});
  const [inboxChats,setInboxChats] = useState([])
  const [allMessages,setAllMessages] = useState([])
  const [isChatOpen,setIsChatOpen] = useState(false)
  const [previousChat, setPreviousChat] = useState([]);
  const [socket,setSocket] = useState(null)
  const navigate = useNavigate();
  const location = useLocation();
  const artistName = location.state ? location.state.artistName : "";
  const artistProfilePicture = location.state ? location.state.artistPhoto : "";

  useEffect(() => {
    const newSocket = io(UserAPI)
    console.log(newSocket)
    setSocket(newSocket);
    newSocket.on("error",(error) =>{
      console.log(error)
    }) ;
    return () => {
      newSocket.disconnect()
    };
  }, [UserAPI])
  
  useEffect(() => {
    if (socket && selectedChat) {
      socket.emit("join_room", selectedChat._id);
      socket.on("message_response", (newMessage) => {
        setAllMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [selectedChat, socket, userId]);



  const sendMessage = async (e) => {
    e.preventDefault()
    try {
    
      const newMessageData = {
        chatId : selectedChat._id,
        content: newMessage,
        senderRole,
        senderId:{_id:userId},
        time:new Date(),
      }
      socket.emit(`send_message`,newMessageData,selectedChat._id)
      setNewMessage('');
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    async function fetchChat() {
      await userAxiosInstance.get(
        `/fetchChats?artistId=${artistId}&userId=${userId}&senderRole=${senderRole}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => {
        setInboxChats(res.data.chatList)
      });
    }
    fetchChat();
  }, [senderRole]);
  

  const openChatBox = (selectedChat) => {

    setSelectedChat(selectedChat);
    setIsChatOpen(true);
      userAxiosInstance.get(`/openChat?chatId=${selectedChat._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {
        setAllMessages(res.data.allMessages);
      })
    
  }


  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300">
  {/* Sidebar Header */}
  <header className="p-4 border-b border-gray-300 bg-indigo-600 text-white">
    <h1 className="text-2xl font-semibold">Chats</h1>
  </header>
  
  <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
  <div className="w-full p-4">
    <ul>
      {inboxChats.map((chat) => (
        <li
          key={chat._id} // Provide a unique key for each item
          className={`flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition ${
            selectedChat.artist?.name === chat.artist?.name
              ? 'bg-gray-100'
              : ''
          }`}
          onClick={() => openChatBox(chat)}
        >
          <div className="flex ml-2">
            <img
              src={chat.artist?.profilePicture}
              width="40"
              height="40"
              className="rounded-full"
              alt="Profile Picture"
            />
            <div className="flex flex-col ml-2">
              <span className="font-medium text-black">
                {chat.artist?.name}
              </span>
              <span className="text-sm text-gray-400 truncate w-32">
                {chat.lastMessage}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-300">{chat.lastMessageTime}</span>
            <i className="fa fa-star text-green-400"></i>
          </div>
        </li>
      ))}
    </ul>
  </div>


    </div>
</div>


      {/* Main Chat Area */}
      <div className="flex-1">
        {/* Chat Header */}
        <header className="p-4 border-b border-gray-300 bg-indigo-600 text-white">
          <div className="flex items-center">
            
              <img
                src={selectedChat.artist?.profilePicture}
                alt={artistName}
                className="w-12 h-12 rounded-full mr-2"
              />
          
            <h1 className="text-2xl font-semibold">
              Chat with {selectedChat.artist?.name}
            </h1>
          </div>
        </header>

 
  {/* Chat Messages */}
          <div className="h-screen overflow-y-auto p-4 pb-36">
          {allMessages.length > 0 ? (
            allMessages.map((message, index) => (
              <div
                key={index}
                className={`chat ${
                  message.senderType === "Artist" ? "chat-start" : "chat-end"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        message.senderType === "Artist"
                          ? selectedChat.artist?.profilePicture
                          : message.senderType === "User"
                          ? selectedChat.user?.photo
                          : ""
                      }
                      alt="Profile Picture"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {message.senderType === "Artist"
                    ? selectedChat.artist?.name
                    : message.senderType === "User"
                    ? "You"
                    : ""}
                  <time className="text-xs opacity-50">{message.time}</time>
                </div>
                <div className="chat-bubble">{message.content}</div>
                <div className="chat-footer opacity-50">
                  {message.senderType === "User"
                    ? "Delivered"
                    : message.senderType === "Artist"
                    ? "Seen at " + message.time
                    : ""}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-24">
              <p className="text-gray-400">
                Please tap on any chat to start sending messages.
              </p>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
          <div className="flex items-center">
            <input
              type="text"
              value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
            />
           <button
      className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
      onClick={sendMessage}
    >
      Send
    </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ChatPage;
