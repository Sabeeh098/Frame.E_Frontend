import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { artistAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import { UserAPI, artistAPI } from "../../constants/api";

function ChatPage({ senderRole }) {
  const token = useSelector((state) => state.artist.token);
  const artistId = useSelector((state) => state.artist.id);
  const [inboxChats, setInboxChats] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(artistAPI);
    setSocket(newSocket);
    newSocket.on("error", (error) => {
      console.log(error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

   useEffect(() => {
    if (socket && selectedChat) {
      socket.emit("join_room", selectedChat._id, artistId);
      socket.on("message_response", (newMessage) => {
        // Add the new message to the chat interface
        setAllMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [selectedChat, socket, artistId]);

  useEffect(() => {
    async function fetchChat() {
      await artistAxiosInstance.get(
        `/fetchChats?artistId=${artistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => {
        setInboxChats(res.data.chatList);
      });
    }
    fetchChat();
  }, [token, artistId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const newMessageData = {
        chatId: selectedChat._id,
        content: newMessage,
        senderRole,
        senderId: { _id: artistId },
        time: new Date(),
      };
      socket.emit(`send_message`, newMessageData, selectedChat._id);
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  const openChatBox = (selectedChat) => {
    setSelectedChat(selectedChat);

    artistAxiosInstance.get(`/openChat?chatId=${selectedChat._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setAllMessages(res.data.allMessages);
    });
  };

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
                  key={chat.id}
                  className={`flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition ${
                    selectedChat.user?.userName === chat.user?.userName
                      ? 'bg-gray-100'
                      : ''
                  }`}
                  onClick={() => openChatBox(chat)}
                >
                  <div className="flex ml-2">
                    <img
                      src={chat.user?.photo}
                      width="40"
                      height="40"
                      className="rounded-full"
                      alt="Profile Picture"
                    />
                    <div className="flex flex-col ml-2">
                      <span className="font-medium text-black">
                        {chat.user?.userName}
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
              src={selectedChat.user?.photo}
              alt="ffr"
              className="w-12 h-12 rounded-full mr-2"
            />
            <h1 className="text-2xl font-semibold">
              Chat with {selectedChat.user?.userName}
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
                  message.senderType === "User" ? "chat-start" : "chat-end"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        message.senderType === "User"
                          ? selectedChat.user?.photo
                          : message.senderType === "Artist"
                          ? selectedChat.artist?.profilePicture
                          : ""
                      }
                      alt="Profile Picture"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {message.senderType === "User"
                    ? selectedChat.user?.userName
                    : message.senderType === "Artist"
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
