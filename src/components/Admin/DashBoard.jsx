import React, { useEffect, useState } from "react";
import { FaUserAlt, FaUserTie, FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import { adminAxiosInstance } from "../../api/axios";

function Dashboard() {
  const [userCount,setUserCount] = useState(0);
  const [artistCount,setArtistCount] = useState(0);

  useEffect(() => {
    adminAxiosInstance.get('/statistics')
    .then((res) => {
      setUserCount(res.data.usersCount);
    });
    adminAxiosInstance.get('/statistics')
    .then((res) => {
      setArtistCount(res.data.artistsCount);
    })
  }, [])
  
  return (
    <div className="flex flex-wrap -m-4">
      <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-3xl text-gray-800">
            <FaUserAlt />
          </div>
          <div className="text-lg font-semibold text-gray-600 mt-2">
            Total Users
          </div>
          <div className="text-2xl text-gray-800 mt-2">{userCount}</div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-3xl text-gray-800">
            <FaUserTie />
          </div>
          <div className="text-lg font-semibold text-gray-600 mt-2">
            Total Artists
          </div>
          <div className="text-2xl text-gray-800 mt-2">{artistCount}</div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-3xl text-gray-800">
            <FaShoppingCart />
          </div>
          <div className="text-lg font-semibold text-gray-600 mt-2">Orders</div>
          <div className="text-2xl text-gray-800 mt-2">500</div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-3xl text-gray-800">
            <FaRupeeSign />
          </div>
          <div className="text-lg font-semibold text-gray-600 mt-2">Sales</div>
          <div className="text-2xl text-gray-800 mt-2">$10,000</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
