/* eslint-disable no-unused-vars */
import AdminSidebar from '../../components/layouts/AdminSidebar';
import AdminNav from '../../components/layouts/AdminNav';
import { useEffect, useState } from 'react';
import { Edit2, Trash2,RotateCcw  } from 'react-feather';
import { FaPlus } from 'react-icons/fa';
import AddProductModal from '../../components/Admin/AddProductModal';
import { adminAxiosInstance } from '../../api/axios';
import EditProductModal from '../../components/Admin/EditProductModal';



function Products() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleEditProduct = async (editedProduct) => {
    try {
      const response = await adminAxiosInstance.put(`/products/${editedProduct._id}`, editedProduct);

      if (response.status === 200) {
        // Update the edited product in the products state
        const updatedProducts = products.map((product) =>
          product._id === editedProduct._id ? editedProduct : product
        );

        setProducts(updatedProducts);
      } else {
        console.log("Error editing product");
      }
    } catch (error) {
      console.log('Error editing product', error);
    }
  }
  

const handleDelete = async (productId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");

  if (confirmDelete) {
    try {
      console.log(`Delete product with ID ${productId}`);
      const response = await adminAxiosInstance.delete(`/products/${productId}`);
      if (response.status === 200) {
        setProducts(products.filter((product) => product._id !== productId));
        fetchProducts();
      } else {
        console.log("Error Deleting Product");
      }
    } catch (error) {
      console.log("Error deleting product", error);
    }
  }
};


  const handleRecover = async (productId) => {
    try {
      // Make an Axios request to recover the product here
      // Update the `deleted` property for the product to false
    } catch (error) {
      console.log("Error recovering product", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAddProduct = (newProduct) => {
    // Implement the functionality to add a new product here
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
  };

  const fetchProducts = async () => {
    try {
        const response = await adminAxiosInstance.get('/products');
        setProducts(response.data)
    } catch (error){
        console.log("error Fetching Products",error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, []);
  

  return (
    <>
      <AdminNav />
      <AdminSidebar>
      <main className="flex-1 p-6">
          <h2 className="text-3xl font-semibold mb-4">Products</h2>
          <div className="container mx-auto p-4">
            <div className="mb-4">
              <button className="btn btn-dark" onClick={openModal}>
                <FaPlus className="me-1" />
                <span className="d-none d-sm-inline-block">Add Product</span>
              </button>
            </div>

            <AddProductModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onAddProduct={handleAddProduct}
            />

            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-slate-500 text-white">
                  <th className="py-2 border-b-2">No:</th>
                  <th className="py-2 border-b-2">Product Name</th>
                  <th className="py-2 border-b-2">Photo</th>
                  <th className="py-2 border-b-2">Category</th>
                  <th className="py-2 border-b-2">Price</th> {/* Add Price column */}
                  <th className="py-2 border-b-2">Quantity</th>
                  <th className="py-2 border-b-2">Status</th>
                  <th className="py-2 border-b-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-200">
                    <td className="py-2 border-b text-center">{index + 1}</td>
                    <td className="py-2 border-b text-center">{product.name}</td>
                    <td className="py-2 border-b text-center">
                      <img
                        src={product.photo}
                        alt={product.name}
                        className="w-12 h-12 mx-auto"
                      />
                    </td>
                    <td className="py-2 border-b text-center">{product.category}</td>
                    <td className="py-2 border-b text-center">{product.price}</td> {/* Display Price */}
                    <td className="py-2 border-b text-center">{product.quantity}</td>
                    <td
                      className={`py-2 border-b text-center ${
                        product.quantity > 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {product.quantity > 0 ? 'In Stock' : 'No Stock'}
                    </td>
                    <td className="py-2 border-b text-center">
                      <div className="flex justify-center items-center space-x-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => openEditModal(product)}
                        >
                          <Edit2 size={16} />
                        </button>
                        {product.deleted ? ( // Show the Recover icon if the product is deleted
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleRecover(product._id)}
                          >
                            <RotateCcw size={16} />
                          </button>
                        ) : (
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDelete(product._id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        {isEditModalOpen && 
      
      <EditProductModal
      product={editProduct}
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            onEditProduct={handleEditProduct}
            />
        }
      </AdminSidebar>
    </>
  );
}

export default Products;
