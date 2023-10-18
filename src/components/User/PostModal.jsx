import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function PostModal({ post, closeModal }) {
 
  return (
   
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
      {console.log(post)}
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-3/4 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-close absolute top-0 right-0 cursor-pointer p-4" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} className="text-gray-700 text-2xl" />
        </div>
        <div className="modal-content py-4 text-left px-6">
          <h2 className="text-2xl font-semibold mb-2">{post.postName}</h2>
          <p className="text-gray-700 text-base mb-2">By {post?.artist?.name}</p>
          <img src={post.photo} alt={post.postName} className="w-full h-48 object-cover mb-4" />
          <p className="text-gray-700 text-base mb-4">{post.description}</p>
          <p className="text-gray-700 text-base mb-4">Likes: {post.likes}</p>
          <p className="text-gray-700 text-base">Comments:</p>
          
          <div className="comment-section mb-4">
  {post?.comments?.map((comment, index) => (
    <div key={comment._id}>
     <p>User: {comment.user.userName}</p>
      <p>Text: {comment.text}</p>
      <p>ID: {comment._id}</p>
    </div>
  ))}
</div>
        </div>
      </div>

    </div>
  );
}

export default PostModal;
