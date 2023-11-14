import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { userAxiosInstance } from "../api/axios";
import { io } from 'socket.io-client';
import { UserAPI } from "../constants/api";
import { socketConnection } from "../context/ChatContext";

function Spinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="py-2 text-blue-600">
        <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path
            d="M4.93 4.93l4.24 4.24m6.36 14.14l4.24-4.24"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>
      </div>
    </div>
  );
}

function ChatPage({ senderRole }) {
  const userId = useSelector((state) => state.user.id);
  const { artistId } = useParams();

  const [chattedList, setChattedList] = useState([]);
  const token = useSelector((state) => state.user.token);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState({});
  const [inboxChats, setInboxChats] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const navigate = useNavigate();
  const location = useLocation();
  const artistName = location.state ? location.state.artistName : "";
  const artistProfilePicture = location.state ? location.state.artistPhoto : "";
  const chatContainerRef = useRef(null);

  const timeFormat = (timeStamp) => {
    const messageTime = new Date(timeStamp);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return messageTime.toLocaleTimeString(undefined, options);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [allMessages]);

  useEffect(() => {
    async function fetchChat() {
      try {
        setIsLoading(true);
        const res = await userAxiosInstance.get(
          `/fetchChats?artistId=${artistId}&userId=${userId}&senderRole=${senderRole}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInboxChats(res.data.chatList);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchChat();
  }, [senderRole, artistId, userId, token]);

  useEffect(() => {
    if (socketConnection && selectedChat) {
      socketConnection.emit("join_room", { room: selectedChat._id });
    }
  }, [selectedChat]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    const newMessageData = {
      content: newMessage,
      chatId: selectedChat._id,
      senderId: { _id: userId },
      senderType: senderRole,
      createdAt: new Date(),
    };

    setAllMessages((prevMessages) => [
      ...prevMessages,
      newMessageData,
    ]);

    socketConnection.emit(`send_message`, newMessageData);
    setNewMessage("");
  };

  useEffect(() => {
    if (socketConnection && selectedChat) {
      socketConnection.on("message_response", (data) => {
        setAllMessages((prevChats) => [...prevChats, data]);
      });
    }
  }, [socketConnection]);

  const openChatBox = (selectedChat) => {
    setSelectedChat(selectedChat);
    setIsChatOpen(true);
    userAxiosInstance
      .get(`/openChat?chatId=${selectedChat._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
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
            {isLoading ? (
              // Display spinner while loading
              <Spinner />
            ) : (
              <ul>
                {inboxChats.map((chat) => (
                  <li
                    key={chat._id}
                    className={`flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition ${
                      selectedChat.artist?.name === chat.artist?.name ? 'bg-gray-100' : ''
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
                        <span className="font-medium text-black">{chat.artist?.name}</span>
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
            )}
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
            <h1 className="text-2xl font-semibold">Chat with {selectedChat.artist?.name}</h1>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="h-screen overflow-y-auto p-4 pb-36" ref={chatContainerRef}>
          {allMessages.length > 0 ? (
            allMessages.map((message, index) => (
              <div
                key={index}
                className={`chat ${
                  message.senderType === "Artist" ? "chat-start" : "chat-end"
                }`}
              >
                <div className="chat-image avatar mb-5">
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
                  <time className="text-xs opacity-50">{timeFormat(message.createdAt)}</time>
                </div>
                <div className="chat-bubble mb-5">{message.content}</div>
                <div className="chat-footer opacity-50">
                  {/* No conditional rendering for "Delivered" or "Seen at" */}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-24">
              <p className="text-gray-400">Please tap on any chat to start sending messages.</p>
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
