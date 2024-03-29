import { useEffect, useState } from "react";
import { userAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";

function Storeproducts() {
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const [products, setProducts] = useState([]);
  const [userAddress, setUserAddress] = useState("");
  const [quantities, setQuantities] = useState({}); // Use an object to store quantity for each product
console.log(products)
  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };


  const handleBuyNowClick = async (product) => {
    try {
      const selectedQuantity = quantities[product._id] || 1;
      const totalPrice = product.price * selectedQuantity;
  
      const orderData = {
        price: totalPrice,
        id: userId,
        // token :token,
        productId: product._id,
        address: userAddress,
        quantity: selectedQuantity,
      };
      console.log(orderData)

     userAxiosInstance.post('/order', orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      
      .then((res) => {
        window.location.href = res.data.url ? res.data.url : null;
      })
    } catch (error) {
      console.error("Error creating the order", error);
    }
  };
  const fetchProducts = async () => {
    try{
      const response = await userAxiosInstance.get('/store',{
        headers : {
          Authorization: `Bearer ${token}`
        }
      })
      setProducts(response.data.products)
    } catch (error){
      
      console.log("error in fetching products",error)
    }
  }

  const fetchUserDetails = async () => {
    try {
      const response = await userAxiosInstance.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserAddress(response.data.user.address); // Set the user's address in the state.
    } catch (error) {
      console.error("Error getting user details", error);
    }
  }
  useEffect(()=> {
    fetchProducts()
    fetchUserDetails()
  },[token])

  return (
    <div className="flex flex-wrap justify-center">
      {products.map((product) => (
        <div key={product._id} className="relative m-5 w-full md:w-1/2 max-w-xs flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <div className="w-full h-52">
  <img
    className="object-cover w-full h-full"
    src={product.photo}
    alt="product image"
  />
</div>
          <div className="mt-4 px-5 pb-5">
            <a href="#">
              <h5 className="text-xl tracking-tight text-slate-900">
                {product.name}
              </h5>
            </a>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-3xl font-bold text-slate-900">
                  ₹ {product.price}
                </span>
              </p>
              <label className="text-sm">
                Quantity:
                <input
                  type="number"
                  min="1"
                  value={quantities[product._id] || 1} // Use the quantity from state
                  onChange={(e) =>
                    handleQuantityChange(product._id, e.target.value)
                  }
                  className="ml-2 border border-gray-300 rounded-md p-1 text-center w-12"
                />
              </label>
            </div>
            <a
  href="#"
  onClick={() => handleBuyNowClick(product)}
  className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
>
  BUY NOW
</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Storeproducts;
