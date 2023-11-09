import React, { useEffect, useState } from "react";
import { adminAxiosInstance } from "../../api/axios";

function CommentsList() {
 const [postsWithComments, setPostsWithComments] = useState([])

 useEffect(() => {
   fetchPostswithComment()
 }, [])
 
 const fetchPostswithComment = async () => {
  try{
    const response = await adminAxiosInstance.get('/postComments');
        setPostsWithComments(response.data.postsWithComments);
  } catch (error) {
    console.error("Error fetching posts with comments", error);
  }
 }
  return (
    <>
      <div className="overflow-x-auto border">
        <table className="table">
          <thead>
            <tr>
              <th>Post</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {postsWithComments.map((post) => (
              post.comments.map((comment, index) => (
                <tr key={index}>
                  <td>{post.postName}</td>
                  <td>{comment.text}</td>
                  <td>
                    <button
                      onClick={() => deleteComment(post._id, comment._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CommentsList;
