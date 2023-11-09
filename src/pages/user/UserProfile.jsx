import { useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import { userAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";
import EditProfile from "../../components/User/EditProfile";

function UserProfile() {
  const token = useSelector((state) => state.user.token);
  const [isProfileAvailable, setIsProfileAvailable] = useState(false);
  const [profile, setProfile] = useState([]);
  const fetchProfile = async () => {
    try {
      console.log("token;", token);
      const response = await userAxiosInstance.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
     
      console.log("ividee");
      const {userName,email,photo,address,phone} = response.data.user;

      setProfile(response.data.user);
      setIsProfileAvailable(true);
    } catch (error) {
      console.log("Something Went Wrong", error);
      setIsProfileAvailable(false);
    }
  };

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  return (
    <>
    <div className="bg-gray-100">
      <Navbar />
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden">
                {isProfileAvailable ? (
                  <img
                    className="h-auto w-full mx-auto"
                    src={profile.photo}
                    alt="Profile"
                  />
                ) : (
                  <p>Please update your profile</p>
                )}
              </div>
              <div className="flex items-center justify-between mt-4">
                <h1 className="text-gray-900 font-bold text-xl leading-8 uppercase">
                  {isProfileAvailable ? profile.userName : "User Name"}
                </h1>
                <button className="flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white" onClick={openEditProfileModal} >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        </button>
                  
              </div>
            </div>
          </div>

          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                  {/* Replace this with your icon component */}
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <div className="px-4 py-2">
                      {isProfileAvailable ? profile.userName : "User Name"}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">
                      {isProfileAvailable ? `+91 ${profile.phone}` : "+91 Contact Number"}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Address</div>
                    <div className="px-4 py-2">
                      {isProfileAvailable ? profile.address : "Address"}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">
                      {isProfileAvailable ? (
                        <a className="text-blue-800" href={`mailto:${profile.email}`}>
                          {profile.email}
                        </a>
                      ) : (
                        "Email Address"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4"></div>

            <div className="bg-white p-3 hover:shadow mt-4">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span>
                  {/* Replace this with your icon component */}
                  <i className="far fa-file-alt"></i>
                </span>
                <span className="tracking-wide font-extrabold">ORDERS</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border">
                    <th className="p-2">Customer</th>
                    <th className="p-2">Order Details</th>
                    <th className="p-2">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border text-center">
                      <p>Name of item</p>
                    </td>
                    <td className="p-2 border text-center">
                      <p className="text-gray-700">sgsdbgj</p>
                    </td>
                    <td className="p-2 border text-center">
                      <p>hai</p>
                    </td>
                  </tr>
                  {/* Add more rows for additional orders if needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    {isEditProfileModalOpen && (
      <EditProfile
        isOpen={isEditProfileModalOpen}
        onRequestClose={closeEditProfileModal}
        token={token}
        onSave={() => {
          fetchProfile();
        }}
        profile={profile}
      />
    )}
  </>
  );
}
export default UserProfile;
