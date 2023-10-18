import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { artistAxiosInstance } from "../../api/axios";


// eslint-disable-next-line react/prop-types
function Addpost({token}) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: null, // File input
    price: "",
  });
  // const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
    // navigate("/artist/posts");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    console.log(files,'====');

    if (name == "photo" && files.length > 0) {
      const selectedFile = files[0];
      const reader = new FileReader();

      reader.readAsDataURL(selectedFile);

      reader.onload = () => {
        setFormData({
          ...formData,
          [name]: reader.result,
        });
      };
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Send the postData object as the request data
      console.log(formData,'==========');
      const response = await artistAxiosInstance.post("/profile", {postName:formData.name,price:formData.price,description:formData.description,photo:formData.photo}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        console.log("Post Created Successfully");
        closeModal();
        setFormData({
          name: "",
          description: "",
          photo: null,
          price: "",
        });
      } else {
        console.error("Error creating artist post:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating artist post:", error);
    }
  };

  return (
    <>
   <button
  className="bg-slate-500 text-white active:bg-pink-600 font-bold uppercase text-sm w-20 h-20 flex items-center justify-center rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
  type="button"
  onClick={openModal}
>
  <FontAwesomeIcon icon={faPlus} />
</button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-5 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add Post</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 text-black"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 text-black"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Photo
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handleInputChange}
                  // Hide the file input visually
                />
              
                
             
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 text-black"
                />
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Addpost;
