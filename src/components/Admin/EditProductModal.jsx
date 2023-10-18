/* eslint-disable react/prop-types */
import { useState } from 'react';
import { adminAxiosInstance } from '../../api/axios';

function EditProductModal({ product, onClose, onEditProduct }) {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleSave = async() => {
    try{
        const response = await adminAxiosInstance.put(`/products/${product._id}`,editedProduct);
        
        if(response.status === 200){
            onEditProduct(editedProduct);
            onClose()
        }else {
            console.log("error Editting Product")
        }
    } catch (error){
        console.log('errorrr',error)
    }
  };

  return (
    <>
 <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="bg-white p-4 py-8 rounded shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <h2 className="text-2xl font-semibold text-center mb-4">Edit Product</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedProduct.name}
                onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                className="border rounded-md py-2 px-3 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-600">
                Category:
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={editedProduct.category}
                onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                className="border rounded-md py-2 px-3 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-600">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={editedProduct.quantity}
                onChange={(e) => setEditedProduct({ ...editedProduct, quantity: e.target.value })}
                className="border rounded-md py-2 px-3 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={editedProduct.price}
                onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                className="border rounded-md py-2 px-3 w-full"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="btn btn-light ml-4"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProductModal;
