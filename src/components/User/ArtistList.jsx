import { useEffect, useState } from "react";
import { userAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ArtistList = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);
  const [artists, setArtists] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  useEffect(() => {
    userAxiosInstance
      .get("/artists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setArtists(response.data.artist);
        console.log("artists data", response.data.artist);
      
      })
      .catch((error) => {
        console.log("error fetching", error);
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
  
  

  return (
    <div className="relative">
      <div
        className={`absolute inset-0 backdrop-filter backdrop-blur-sm transition-opacity duration-300 ${
          hoveredIndex !== null ? "opacity-50" : "opacity-100"
        }`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pt-6 justify-center items-center mx-auto max-w-6xl">
        {artists.map((artist, index) => (
          <div
            key={artist._id}
            className="relative bg-white rounded-md shadow-md cursor-pointer transition-transform ease-in duration-300 hover:scale-110"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
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
              {/* Add more artist information here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
