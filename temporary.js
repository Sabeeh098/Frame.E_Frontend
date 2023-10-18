import { useEffect, useState } from "react";
import { userAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ArtistList = () => {
  const navigate = useNavigate();
  const token = useSelector((state)=> state.user.token)
  const [artists,setArtists] = useState([]);

    console.log(artists)
    
  useEffect(()=> {
    userAxiosInstance.get('/artists',{headers:{
      Authorization: `Bearer ${token}`
    }})
    .then((response)=> {
      setArtists(response.data.artist);
    })
    .catch ((error)=>{
      console.log("error fetching",error);
    });
  },[])


  return (
    <div>
      {Array.isArray(artists) && artists.map((artist) => (
        <div key={artist.id} className="flex justify-center h-60 m-8 transition duration-500 ease-in transform hover:scale-105">
          <img className="w-1/4 border-dashed border-2 border-sky-500" src={artist.profilePicture} alt="Artist" />
          <div className="w-1/2 border-dashed border-gray-200 bg-white shadow-lg rounded p-4">
            <div className="font-bold text-xl mb-2">{artist.name}</div>
            <p className="text-gray-700 text-base">{artist.description}</p>
            <div className="pt-4">
            {Array.isArray(artist.artCategories) && artist.artCategories.map((art) => (
                <span key={art} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{art}</span>
                ))}
            </div>
            <div className="pt-4 flex justify-between">
              <span>Followers:</span>
             <p className="cursor-pointer underline" onClick={()=>navigate('/specificartist',{state:{id:artist._id}})}>More info..</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtistList;






import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";

import Navbar from "../layouts/Navbar";

const SpecificArtist = () => {
  const token = useSelector((state) => state.user.token);
  const [artists, setArtists] = useState([]);
  const location = useLocation();
  const stateArtistId = location.state?.id;

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await userAxiosInstance.get('/specificartist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const artistData = response.data.artist;
        
        // Filter the artist data based on artistId
        const selectedArtist = artistData.find((a) => a._id === stateArtistId);

        if (selectedArtist) {
          setArtists(selectedArtist);
        }
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchArtistData();
  }, [stateArtistId, token]);

  console.log(artists);

  return (
    <>
    <Navbar/>
      <div className="container mx-auto p-4">
        {/* Artist Details */}
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img
              className="w-96 h-56"
              src={artists.profilePicture}
              alt="Artist profile"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{artists.name}</h2>
            <h3>{artists.description}</h3>
            <div className="mt-4">
              {/* Art Categories */}
              <div  className="mb-2">
    <span className="text-primary font-semibold">Arts:</span> {artists.artCategories}
  </div>
              {/* Add more categories as needed */}
            </div>
          </div>
        </div>

        {/* Artist Posts */}
        <div className="flex flex-wrap justify-around">
          {Array.isArray(artists.posts) && artists.posts.map((post) => (
            <div key={post._id} className="w-48 h-44 bg-white m-3 rounded-md shadow-md">
              {/* Post Photo */}
              <img
                src={post.photo}
                alt="Post image"
                className="w-full h-full object-cover rounded-md"
              />

              {/* Post Name */}
              <h3 className="text-lg font-semibold mt-2">{post.postName}</h3>

              {/* Price */}
              <p className="text-gray-600 mt-1">₹{post.price}</p>

              {/* Buy Now Button */}
              <button className="bg-primary text-white mt-2 py-1 px-2 rounded-full hover:bg-primary-dark transition duration-300 ease-in-out">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SpecificArtist;
