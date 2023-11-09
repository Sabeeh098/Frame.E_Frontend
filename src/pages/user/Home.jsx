import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faPaperPlane,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { userAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";
import Navbar from "../../components/layouts/Navbar";
import PostModal from "../../components/User/PostModal";
import { Link } from "react-router-dom";
import PaymentModal from "../../components/User/PaymentModal";

function Home() {
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);

  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [likedPost, setLikedPost] = useState([]);
  const [openCommentBoxes, setOpenCommentBoxes] = useState({});
  const [commentText, setCommentText] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pay, setPay] = useState({
    price: "",
    postId: "",
  });
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (price, postId) => {
    setPay({ price: price, postId: postId });
    setShowModal(true);
  };

  useEffect(() => {
    fetchPosts();
    fetchLikedPosts();
  }, []);

  const fetchLikedPosts = async () => {
    try {
      const response = await userAxiosInstance.get("/likedposts", userId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLikedPost(response.data.likedPosts);
    } catch (error) {
      console.log("Error in fetching liked posts", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await userAxiosInstance.get("/home");
      setPosts(response.data.artistpost);
    } catch (error) {
      console.log("Error in fetching posts", error);
    }
  };

  const likeOrUnlikePost = async (postId) => {
    try {
      if (likedPost.includes(postId)) {
        await userAxiosInstance.post(
          "/unlike",
          { postId, userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLikedPost((prevLiked) => prevLiked.filter((id) => id !== postId));
      } else {
        await userAxiosInstance.post(
          "/like",
          { postId, userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLikedPost((prevLiked) => [...prevLiked, postId]);
      }
    } catch (error) {
      console.log("Error in liking/unliking post", error);
    }
  };

  const toggleCommentBox = (postId) => {
    setOpenCommentBoxes((prevOpenBoxes) => ({
      ...prevOpenBoxes,
      [postId]: !prevOpenBoxes[postId],
    }));
  };

  const goToPreviousPost = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  const goToNextPost = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const addComment = async (postId) => {
    try {
      if (!commentText) {
        console.log("Please add a comment");
      }
      const response = await userAxiosInstance.post(
        "/addComment",
        { postId, userId, text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Comment added successfully");
        setCommentText("");
      } else {
        console.error("Error adding comment", response.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const openPostModal = (post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const closePostModal = () => {
    setSelectedPost(null);
    setShowPostModal(false);
  };

  const currentPost = posts[currentPostIndex];

  return (
    <>
      {showModal && (
        <PaymentModal
          show={showModal}
          price={pay.price}
          postId={pay.postId}
          onHide={handleCloseModal}
          token={token}
          // onSelectPaymentMethod={handlePaymentMethodSelection}
        />
      )}
      <Navbar />
      <div className="w-full h-auto bg-neutral-100 justify-start items-start flex flex-col md:flex-row gap-5 p-5">
        <div className="w-full md:w-[50%] flex flex-col justify-start items-start">
          <div className="w-full h-full bg-neutral-200 flex justify-center items-center">
            <img
              className="w-2/4 h-2/4 object-contain"
              src="https://i.pinimg.com/564x/14/ce/5e/14ce5e867add3a47452596cd9d27fdcc.jpg"
              alt="Placeholder"
            />
          </div>
        </div>
        <div className="w-full md:w-[50%] flex flex-col justify-start items-start md:items-center">
          <div className="w-full h-full bg-white flex justify-center items-center">
            <div className="w-full h-auto relative">
              <div className="h-12 pr-[88px] left-0 top-[123px] absolute flex flex-col justify-start items-start">
                <div className="text-black text-4xl md:text-5xl font-normal font-['Inter'] leading-[48px]">
                  Find the art you love
                </div>
              </div>
              <div className="pr-[13px] left-0 top-[191px] absolute flex justify-start items-center md:items-start">
                <div className="text-neutral-500 text-xl md:text-2xl font-normal font-['Inter'] leading-loose">
                  Discover incredible artworks and explore your passion for
                  creativity with us.
                  <br />
                </div>
              </div>
              <div className="h-[50px] md:h-[60px] left-0 top-[327px] absolute flex flex-col justify-start items-center">
                <div className="w-full md:w-auto h-auto px-4 md:px-8 py-2 md:py-3 rounded-full border border-black flex justify-center items-center">
                  <div className="text-center text-black text-base md:text-lg font-normal font-['Inter'] leading-none">
                    Start Looking
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-8 ml-0">
        <h1 className="text-4xl font-bold mb-8">Discover Amazing Art</h1>
        <div className="flex items-center justify-center relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-black-500 text-6xl cursor-pointer"
              onClick={goToPreviousPost}
            />
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon
              icon={faAngleRight}
              className="text-black-500 text-6xl cursor-pointer"
              onClick={goToNextPost}
            />
          </div>
          {currentPost && (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={currentPost.photo}
                alt={currentPost.postName}
                className="w-full h-96 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">
                  {currentPost.postName}
                </h2>
                <p className="text-gray-600">By {currentPost?.artist?.name}</p>
                <div className="mt-2 flex items-center">
                  <p className="text-lg font-semibold text-green-500">
                    ₹ {currentPost.price}
                  </p>
                  {/* <button onClick={handleShowModal}></button> */}
                  {/* <p>Selected Payment Method: {selectedPaymentMethod || 'None selected'}</p> */}
                  <button
                    className="ml-4 bg-blue-500 text-white px-3 py-1 rounded-md"
                    onClick={() =>
                      handleShowModal(currentPost.price, currentPost._id)
                    }
                  >
                    Buy Now
                  </button>
                </div>
              
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-[1269px] mx-4 md:mx-auto mt-4">
          <div className="flex flex-wrap justify-between -mx-4">
            {posts.map((post) => (
              <div className="w-1/3 p-4" key={post._id}>
                <div
                  className="max-w-sm rounded overflow-hidden shadow-lg"
                  style={{ height: "400px" }}
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={post.photo}
                    alt={post.postName}
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                      {post.postName}
                    </div>
                    <p className="text-gray-700 text-base">
                      By {post?.artist?.name}
                    </p>
                    <p className="text-gray-700 text-base">₹ {post?.price}</p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${
                        likedPost.includes(post._id)
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => likeOrUnlikePost(post._id)}
                    >
                      <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                    </span>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${
                        openCommentBoxes[post._id]
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => toggleCommentBox(post._id)}
                    >
                      <FontAwesomeIcon icon={faComment} className="text-2xl" />
                    </span>
                    <button
                      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 bg-gray-200 text-gray-700`}
                      onClick={() => openPostModal(post)}
                    >
                      View Details
                    </button>
                    <button
                      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 bg-green-500 text-white`}
                      onClick={() => handleShowModal(post.price, post._id)}
                    >
                      Buy Now
                    </button>
                   
                  </div>
                  {openCommentBoxes[post._id] && (
                    <div className="px-6 flex items-center">
                      <input
                        type="text"
                        placeholder="Type a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-2 px-3"
                      />
                      <button
                        className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                        onClick={() => addComment(post._id, commentText)}
                      >
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conditionally render the PostModal */}
      {showPostModal && selectedPost && (
        <PostModal post={selectedPost} closeModal={closePostModal} />
      )}
    </>
  );
}

export default Home;
