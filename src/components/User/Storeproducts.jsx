import { useEffect, useState } from "react";
import { userAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";

function Storeproducts() {
  const token = useSelector((state) => state.user.token);
  const [products, setProducts] = useState([]);
  console.log(products)
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
  useEffect(()=> {
    fetchProducts()
  },[token])

  return (
    <div className="flex flex-wrap justify-center">
      {products.map((product) => (
        <div key={product._id} className="relative m-5 w-full md:w-1/2 max-w-xs flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <img
            className="object-cover"
            src={product.photo}
            alt="product image"
          />
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
            </div>
            <a
              href="#"
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
