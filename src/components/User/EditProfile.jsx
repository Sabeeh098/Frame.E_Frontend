/* eslint-disable react/prop-types */
import { useState } from "react";
import { userAxiosInstance } from "../../api/axios";

const EditProfile = ({ token, onRequestClose, onSave, profile }) => {

  const [name, setName] = useState(profile.userName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = () => {
    const  updatedProfile = {
        userName:name,
        email,
        phone,
        address,
        photo
    };
    console.log(updatedProfile)
    userAxiosInstance.post('/editProfile',updatedProfile,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    .then((response)=> {
        console.log(response.data)
        onSave(updatedProfile);
        onRequestClose()
    })
    .catch ((error) => {
        console.log("error Updating in profile",error)
    })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white p-8 w-1/2 rounded-lg">
        <h3 className="font-bold text-lg">Edit Profile</h3>
        <form>
          <div className="mt-4">
            <label htmlFor="name" className="block text-gray-600">
              Name:
            </label>
            <input
              className="w-full border rounded-md py-2 px-3"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-gray-600">
              Email:
            </label>
            <input
              className="w-full border rounded-md py-2 px-3"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="phone" className="block text-gray-600">
              Phone:
            </label>
            <input
              className="w-full border rounded-md py-2 px-3"
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="address" className="block text-gray-600">
              Address:
            </label>
            <input
              className="w-full border rounded-md py-2 px-3"
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="photo" className="block text-gray-600">
              Profile Photo:
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>
        </form>
        <div className="mt-4">
          <button className="btn bg-blue-500 text-white" onClick={handleSave}> Save </button>
          <button className="btn bg-red-500 text-white ml-2" onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
