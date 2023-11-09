import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function PostModal({ post, closeModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
      <div className="modal-container grid grid-cols-1 md:grid-cols-2 gap-4 bg-white w-11/12 md:w-3/4 lg:w-2/4 mx-2 md:mx-auto rounded-lg shadow-lg z-50 overflow-hidden">
        <div className="modal-image md:col-span-1">
          <img src={post.photo} alt={post.postName} className="w-full object-cover" />
        
        </div>
        <div className="modal-content md:col-span-1 p-4">
          <div className="modal-header flex justify-between items-center bg-gray-100 p-2">
            <h2 className="text-lg md:text-xl font-black">{post.postName}</h2>
            <div className="cursor-pointer" onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} className="text-gray-600 text-2xl" />
            </div>
          </div>
          <div className="modal-description p-2">
            <p className="text-gray-700 text-sm md:text-base mb-2">{post.description}</p>
            <p className="text-gray-700 text-sm md:text-base font-extrabold">By {post?.artist?.name}</p>
          </div>
          <div className="modal-comments p-2">
            <div className="text-gray-700 text-sm md:text-base mb-2 font-semibold">Comments:</div>
            <div className="comment-section space-y-2" style={{ maxHeight: "300px", overflowY: "auto" }}>
              {post?.comments?.map((comment, index) => (
                <div key={comment._id} className="comment p-2 bg-gray-100 rounded-lg">
                  <p className="text-gray-700 text-sm md:text-base font-semibold">{comment.user.userName}</p>
                  <p className="text-gray-700 text-sm md:text-base">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
