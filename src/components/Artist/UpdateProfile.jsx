/* eslint-disable react/prop-types */
import { useState } from "react";
import { artistAxiosInstance } from "../../api/axios";

function UpdateProfile({ onClose, token , profile}) {

  const [name, setName] = useState(profile.name);
  
  const [email, setEmail] = useState(profile.email);

  const [description, setDescription] = useState(profile.description);

  const [photo, setPhoto] = useState(null);
 
  const [artCategories, setArtCategories] = useState(profile.artCategories || []);
  const [newCategory, setNewCategory] = useState("");
  
  const handleCategoryAdd = () => {
    if (newCategory.trim() !== "") {
      setArtCategories([...artCategories, newCategory]);
      setNewCategory("");
    }
  };

  const handleCategoryRemove = (index) => {
    const updatedCategories = [...artCategories];
    updatedCategories.splice(index, 1);
    setArtCategories(updatedCategories);
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", description);
    if(photo){
      formData.append("profilePicture",photo)
    }
   
    formData.append("artCategories", JSON.stringify(artCategories));
    try {
    
   
      await artistAxiosInstance.post("/editprofile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
         
        },
      });

      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white p-8 w-1/2">
        <h3 className="font-bold text-lg">Update Your Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="name" className="block text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              // placeholder={profile.name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md py-2 px-3"
              
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-gray-600">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md py-2 px-3"
              
             
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="description" className="block text-gray-600">
              Describe About You:
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md py-2 px-3"

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
          <div className="mt-4">
            <label className="block text-gray-600">Art Categories:</label>
            <div className="flex flex-wrap gap-2">
            {artCategories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 px-2 py-1 rounded-md"
                >
                  {category}
                  <button
                    type="button"
                    className="text-red-500 ml-2"
                    onClick={() => handleCategoryRemove(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e)=> setNewCategory(e.target.value)}
                className="w-full border rounded-md py-2 px-3"
                placeholder="Add an art category"
            
              />
              <button
                type="button"
                className="btn bg-blue-500 text-white mt-2"
                onClick={handleCategoryAdd} 
              >
                Add Category
              </button>
            </div>
          </div>
          <div className="mt-4">
            <button type="submit" className="btn bg-blue-500 text-white">
              Save
            </button>
            <button
              type="button"
              className="btn bg-red-500 text-white ml-2"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
