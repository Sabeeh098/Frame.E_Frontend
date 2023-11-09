import React, { useState, useEffect } from "react";
import { artistAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function VisualArts() {
  const token = useSelector((state) => state.artist.token);
  const [visualArtsPosts, setVisualArtsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
 
const handleDelete = (postId) => {
  artistAxiosInstance.delete(`/deletepost/${postId}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response)=> {
    console.log("Post deleted",response.data)
    setVisualArtsPosts((prevPosts) => 
    prevPosts.filter((post) => post._id !== postId)
    );
    toast.success(response.data.message);
  })
  .catch((error) => {
    console.log('Error deleting the post', error);
  })
}

  useEffect(() => {
    artistAxiosInstance
      .get("/posts?category=Visual Arts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setVisualArtsPosts(response.data.categoryPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching visual arts posts:", error);
        setLoading(false);
      });
  }, [token]);

  const handleImageHover = (index) => {
    setHoveredIndex(index);
  };

  const handleImageLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 rounded-full animate-spin border-2 border-dashed border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 ml-24 pt-14">
          {visualArtsPosts.length > 0 ? (
            visualArtsPosts.map((post, index) => (
              <div
                key={index}
                className="relative w-full h-48 aspect-[1/1] bg-gray-200"
                onMouseEnter={() => handleImageHover(index)}
                onMouseLeave={handleImageLeave}
              >
                {hoveredIndex === index && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70">
                    <button className="text-white mx-2 hover:text-[#687fe5]">
                      Edit
                    </button>
                    <button className="text-white mx-2 hover:text-[#f01414]"
                     onClick={() => handleDelete(post._id)}>
                      
                      Delete
                    </button>
                  </div>
                )}
                <img
                  src={post?.photo}
                  alt={post?.postName}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">
              No Visual Arts posts available.
            </p>
          )}
        </div>
      )}

    </div>
    
  );
}

export default VisualArts;
