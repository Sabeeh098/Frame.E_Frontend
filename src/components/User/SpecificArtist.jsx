import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";

import Navbar from "../layouts/Navbar";

const SpecificArtist = () => {
  const token = useSelector((state) => state.user.token);
  const [artist, setArtist] = useState(null);
  const location = useLocation();
  const stateArtistId = location.state?.id;

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await userAxiosInstance.get("/specificartist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const artistData = response.data.artist;

        const selectedArtist = artistData.find((a) => a._id === stateArtistId);

        if (selectedArtist) {
          setArtist(selectedArtist);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchArtistData();
  }, [stateArtistId, token]);

  console.log(artist);

  return (
    <>
      <Navbar />
      {artist && (
        <div className="w-full relative bg-white">
          <div className="w-full h-px absolute bg-neutral-200" />
          <div className="w-full p-4 text-center bg-gray-100">
            <img
              src={artist.profilePicture} // Add the artist's profile photo URL here
              alt={`${artist.name}'s Profile`}
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h1 className="text-3xl font-bold mt-2">{artist.name}</h1>
            <p className="text-gray-600">{artist.description}</p> {/* Artist description */}
          </div>
          <div className="w-full left-0 top-[200px] absolute flex flex-wrap justify-center gap-4 pt-10">
  {artist.posts.map((post, index) => (
    <div key={index} className="w-[30%] h-[200px] relative"> {/* Increased post card size and displayed 3 per line */}
      <div className="w-full h-full">
        <img className="w-full h-full object-cover" src={post.photo} alt={`Post ${index + 1}`} />
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-5 text-sm">
        {post.postName}
      </div>
      <button className="absolute bottom-2 right-2 px-4 py-2 bg-black text-white hover:bg-white hover:text-black transition duration-300 ease-in-out rounded-3xl">
        Buy Now
      </button>
    </div>
  ))}
</div>

        </div>
      )}
    </>
  );
};

export default SpecificArtist;
