import React, { useEffect, useState } from "react";
import { userAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const ArtistList = ({ searchTerm }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(artists)
  const createChat = async (artistId) => {
    navigate(`/chat/${artistId}`);
    await userAxiosInstance.post(
      "/createChat",
      { artistId, userId, senderRole : 'User' },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res)=> {
      if(res.status ===200 ){
        console.log("okay")
      }
    })
  };

  useEffect(() => {
    setLoading(true);

    userAxiosInstance
      .get("/artists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setArtists(response.data.artist);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching", error);
        setLoading(false);
      });
  }, [token]);

  const isUserFollowingArtist = (artist) => {
    return artist.followers.includes(userId);
  };

  const handleFollowClick = (artistId, index) => {
    if (!isUserFollowingArtist(artists[index])) {
      setArtists((prevArtists) => {
        const updatedArtists = [...prevArtists];
        updatedArtists[index].followers.push(userId);
        return updatedArtists;
      });
    }
  };

  const handleUnfollowClick = (artistId, index) => {
    if (isUserFollowingArtist(artists[index])) {
      setArtists((prevArtists) => {
        const updatedArtists = [...prevArtists];
        const userIndex = updatedArtists[index].followers.indexOf(userId);
        if (userIndex !== -1) {
          updatedArtists[index].followers.splice(userIndex, 1);
        }
        return updatedArtists;
      });
    }
  };

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      {loading ? (
        <div className="flex justify-center items-center h-36">
          <FaSpinner className="animate-spin text-blue-500 text-4xl" />
        </div>
      ) : filteredArtists.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          No matching artists found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pt-6 justify-center items-center mx-auto max-w-6xl">
          {filteredArtists.map((artist, index) => (
            <div
              key={artist._id}
              className="relative bg-white rounded-md shadow-md cursor-pointer transition-transform ease-in duration-300 hover:scale-110"
            >
              <img
                src={artist.profilePicture}
                alt={artist.name}
                className="w-full h-44 object-cover rounded-t-md"
                onClick={() =>
                  navigate("/specificartist", { state: { id: artist._id } })
                }
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{artist.name}</h2>
                  <button
                    className="px-1"
                    onClick={() => createChat(artist._id)}
                  >
                    Send Message
                  </button>
                  {isUserFollowingArtist(artist) ? (
                    <button
                      className="bg-gray-300 text-black text-sm py-1 px-2 rounded-full"
                      onClick={() => handleUnfollowClick(artist._id, index)}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      className="bg-black text-white text-sm py-1 px-2 rounded-full hover:bg-white hover:text-black transition duration-300"
                      onClick={() => handleFollowClick(artist._id, index)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtistList;
