import React from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { AiFillMessage } from 'react-icons/ai';
import { useSelector } from 'react-redux';

function ChatIcon() {
  const location = useLocation();
  const { artistId } = useParams();
  const shouldShowChatIcon = !['/signup', '/login', '/chat'].includes(location.pathname);
  const userId = useSelector((state) => state.user.id);

  return (
    <div className="relative">
      {shouldShowChatIcon && !artistId && (
        <Link to={`/chat`} className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg" style={{ zIndex: 9999 }}>
          <AiFillMessage size={24} />
        </Link>
      )}

{shouldShowChatIcon && !artistId && (
  <div className="fixed bottom-16 right-24" style={{ zIndex: 9999 }}>
    <div className="chat chat-end">
      <div className="chat-bubble">Chat With ARTIST!</div>
    </div>
  </div>
)}


      <Outlet />
    </div>
  );
}

export default ChatIcon;
