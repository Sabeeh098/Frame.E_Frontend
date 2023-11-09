import { useSelector } from "react-redux";
import { artistAxiosInstance } from "../../api/axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import VisualArts from "./VisualArts";
import Crafts from "./Crafts";
import FineArts from "./FineArts";
import Drawing from "./Drawing";


function Recentpost() {
  const [profile, setProfile] = useState({
    name: "",
  });
  console.log(profile);
  const token = useSelector((state) => state.artist.token);
  const [activeLink, setActiveLink] = useState('VisualArts'); 

  
const [showVisualArts, setShowVisualArts] = useState(true);
const [showCrafts, setShowCrafts] = useState(false);
const [showFineArts, setShowFineArts] = useState(false);
const [showDrawing, setShowDrawing] = useState(false);

const toggleVisualArts = () => {
  setActiveLink('VisualArts');
  setShowVisualArts(true);
  setShowCrafts(false);
  setShowFineArts(false);
  setShowDrawing(false);
};

const toggleCrafts = () => {
  setActiveLink('Crafts');
  setShowVisualArts(false);
  setShowCrafts(true);
  setShowFineArts(false);
  setShowDrawing(false);
};

const toggleFineArts = () => {
  setActiveLink('FineArts');
  setShowVisualArts(false);
  setShowCrafts(false);
  setShowFineArts(true);
  setShowDrawing(false);
};

const toggleDrawing = () => {
  setActiveLink('Drawing');
  setShowVisualArts(false);
  setShowCrafts(false);
  setShowFineArts(false);
  setShowDrawing(true);
};

  
  const fetchProfile = async () => {
    try {
      const response = await artistAxiosInstance.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multiple/form-data",
        },
      });
      const { name } = response.data.artist;

      setProfile({ name });
    } catch (error) {
      console.log("Something Went Wrong", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="w-full md:w-[90%] flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-[300px] h-auto md:h-screen bg-white border border-r-4">
        <div className="p-4">
          <div className="text-violet-300 text-[26px] font-normal font-['Roboto'] leading-loose mb-4">
            {profile.name}
          </div>
          <div className="text-neutral-700 text-xl font-normal font-['Roboto'] mt-16 mb-4 justify-center space-y-11">
          <div className="flex justify-center leading-[18.20px]">
  <Link
  onClick={toggleVisualArts}
  className={`mr-2 mb-4 hover:bg-gray-100 hover:shadow-lg cursor-pointer rounded px-9 py-2 ${
    activeLink === 'VisualArts' ? 'bg-gray-300' : ''
  }`}
>
  Visual Arts
</Link>

</div>

<div className="flex justify-center leading-[18.20px]">
  <Link
    onClick={toggleCrafts}
    className={`mr-2 mb-4 hover:bg-gray-100 hover:shadow-lg cursor-pointer rounded px-9 py-2 ${
      activeLink === 'Crafts' ? 'bg-gray-300' : ''
    }`}
  >
    Crafts
  </Link>
</div>
<div className="flex justify-center leading-[18.20px]">
  <Link
    onClick={toggleFineArts}
    className={`mr-2 mb-4 hover:bg-gray-100 hover:shadow-lg cursor-pointer rounded px-9 py-2 ${
      activeLink === 'FineArts' ? 'bg-gray-300' : ''
    }`}
  >
    Fine Arts
  </Link>
</div>
<div className="flex justify-center leading-[18.20px]">
  <Link
    onClick={toggleDrawing}
    className={`mr-2 mb-4 hover:bg-gray-100 hover:shadow-lg cursor-pointer rounded px-9 py-2 ${
      activeLink === 'Drawing' ? 'bg-gray-300' : ''
    }`}
  >
    Drawing
  </Link>
</div>






  
</div>

        </div>
      </div>

       {/* Main Content */}
       <div className="w-full md:flex-grow">
        {/* Place your main content here */}
        {showVisualArts && <VisualArts />}
{showCrafts && <Crafts />}
{showFineArts && <FineArts />}
{showDrawing && <Drawing />}


      </div>
    </div>
  );
}

export default Recentpost;
