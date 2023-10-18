/* eslint-disable react/prop-types */
import { useState } from 'react';
import { adminAxiosInstance } from '../../api/axios';


function AddProductModal({ isOpen, onClose, onAddProduct }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    quantity: 0,
    price: 0, 
    photo: null,
  });
  
  const [errors, setErrors] = useState({ name: '', category: '', photo: '' });

  const handleAddProduct = async () => {
    try {
      // Validation
      if (!newProduct.name) {
        setErrors({ ...errors, name: 'Name is required' });
        return;
      }
      if (!newProduct.category) {
        setErrors({ ...errors, category: 'Category is required' });
        return;
      }
      if (!newProduct.photo) {
        setErrors({ ...errors, photo: 'Photo is required' });
        return;
      }
      if (newProduct.price <= 0) {
        setErrors({ ...errors, price: 'Price must be greater than 0' });
        return;
      }
      const response = await adminAxiosInstance.post('/products', newProduct);

      if (response.status === 201) {
        onAddProduct(response.data);
        setNewProduct({
          name: '',
          category: '',
          quantity: 0,
          photo: null,
        });
        setErrors({ name: '', category: '', photo: '' });
        onClose();
      } else {
        console.log('Error Adding Product');
      }
    } catch (error) {
      console.log('Error Adding Product', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewProduct({ ...newProduct, photo: event.target.result });
      setErrors({ ...errors, photo: '' }); // Clear photo error when a file is selected
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  return isOpen ? (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="bg-white p-4 py-8 rounded shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Product</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={(e) => {
                setNewProduct({ ...newProduct, name: e.target.value });
                setErrors({ ...errors, name: '' }); // Clear name error when input changes
              }}
              className="border rounded-md py-2 px-3 w-full"
            />
            {errors.name && <div className="text-red-500">{errors.name}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={newProduct.category}
              onChange={(e) => {
                setNewProduct({ ...newProduct, category: e.target.value });
                setErrors({ ...errors, category: '' }); // Clear category error when input changes
              }}
              className="border rounded-md py-2 px-3 w-full"
            />
            {errors.category && <div className="text-red-500">{errors.category}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-600">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              className="border rounded-md py-2 px-3 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-600">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border rounded-md py-2 px-3 w-full"
            />
            {errors.price && <div className="text-red-500">{errors.price}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-600">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded-md py-2 px-3 w-full"
            />
            {errors.photo && <div className="text-red-500">{errors.photo}</div>}
          </div>
          <div className="flex justify-center mt-4">
            <button type="button" className="btn btn-dark" onClick={handleAddProduct}>
              Add Product
            </button>
            <button className="btn btn-light ml-4" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default AddProductModal;
