import { useEffect, useState } from "react";
import Addpost from "../../components/Artist/Addpost";
import NavbarArtist from "../../components/layouts/NavbarArtist";
import UpdateProfile from "../../components/Artist/UpdateProfile";
import axios from "axios";
import { useSelector } from "react-redux";

function Profile() {
  const token = useSelector((state) => state.artist.token);
  const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] =
    useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    description: "",
    arts:"",
    posts: [],
  });

  const openUpdateProfileModal = () => {
    setIsUpdateProfileModalOpen(true);
  };

  const closeUpdateProfileModal = () => {
    setIsUpdateProfileModalOpen(false);
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:4000/artist/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multiple/form-data",
        },
      });
      const { name, email, description, profilePicture, artCategories, posts } =
        response.data.artist;
      
      setProfile({
        name,
        email,
        description,
        profilePicture,
        artCategories,
        posts,
      });
    } catch (error) {
      console.log("Something Went Wrong", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [isUpdateProfileModalOpen,profile]);

  return (
    <div>
      <NavbarArtist />
      <div className="min-h-screen bg-gray-100 pt-8 flex row justify-center">
        <div className="mx-auto mt-5 p-10 h-64 w-1/4 bg-white rounded shadow-xl md:ml-40">
        {profile.name && ( 
            <>
              <img
                className="w-36 h-36 mx-auto mb-4 rounded-full"
                src={profile?.profilePicture}
                alt="Profile"
              />
              <h2 className="text-2xl font-semibold text-gray-800">
                {profile?.name}
              </h2>
              <p className="text-sm text-gray-500">{profile?.email}</p>
            </>
          )}
          <div className="pt-10">
            <button
              className="btn btn-wide bg-green-200"
              onClick={openUpdateProfileModal}
            >
              Edit your Profile
            </button>
          </div>
        </div>

        <div className="w-3/4 p-10">
          <h1 className="font-bold">About Me</h1>
          <p className="pt-3" style={{ wordBreak: "break-all" }}>
            {profile?.description}
          </p>
          <h1 className="pt-24 font-bold">Arts</h1>
         {/* Render artCategories with commas */}
<p className="pt-3" style={{ wordBreak: "break-all" }}>
{profile?.artCategories}
</p>

        </div>
      </div>
      <div className="flex justify-center items-center min-h-screen bg-white-800 text-white">
        <div className="w-full md:w-3/4 lg:w-1/2 xl:w-[623px] p-4 mt-[-400px] md:mt-0">
          <h1 className="text-2xl mb-4 text-black text-center">Recent Posts</h1>
          <div className="flex flex-col items-center justify-center relative">
          <div className="grid grid-cols-2 gap-4">
        {profile.posts.length > 0 ? (
          profile.posts.slice(-4).map((post, index) => (
            <div key={index}>
              <img
                src={post?.photo}
                alt={`Post ${index}`}
                className="w-full h-[200px] object-cover bg-black"
              />
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <Addpost token={token} />
            </div>
          </div>
        </div>
      </div>
      {/* Render the UpdateProfile component as a modal */}
      {isUpdateProfileModalOpen && (
        <UpdateProfile token={token} onClose={closeUpdateProfileModal} profile={profile} />
      )}
    </div>
  );
}

export default Profile;
