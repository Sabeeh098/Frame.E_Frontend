import React, { useEffect, useState } from 'react';
import { userAxiosInstance } from '../../api/axios';

function PaymentModal({token,show, onHide, onSelectPayment, onSelectAddress,price,postId, }) {
  const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');
    const [profile, setProfile] = useState([])
   

    // console.log(profile._id);
    
    const handleSelectPayment = () => {
      try{

        userAxiosInstance.post('/payment',{ price,
          id: profile._id,
          postId: [{ post: postId }],
          artistId: pay.artistId, 
          address: profile.address},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          window.location.href = res.data.url ? res.data.url : null;
        })
      } catch (error){
        console.log("Errrrrror",error)
      }
        // onSelectPayment(paymentMethod);
        // onSelectAddress(address);
        // onHide();
    };
  const fetchProfile = async () => {
    try {
      console.log("token;", token);
      const response = await userAxiosInstance.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
     
      const {userName,email,photo,address,phone} = response.data.user;
      console.log(response.data.user)

      setProfile(response.data.user);
      
    } catch (error) {
      console.log("Something Went Wrong", error);
     
    }
  };
  useEffect(()=> {
    fetchProfile()
  },[])


  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${show ? '' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <h2 className="text-xl font-semibold">Payment Method</h2>
          <div className="mt-4">
            <label className="block text-gray-700">Select a payment method:</label>
            <div className="mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  value="cash-on-delivery"
                  checked={paymentMethod === 'cash-on-delivery'}
                  onChange={() => setPaymentMethod('cash-on-delivery')}
                />
                <span className="ml-2">Cash on Delivery</span>
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  value="pay-online"
                  checked={paymentMethod === 'pay-online'}
                  onChange={() => setPaymentMethod('pay-online')}
                />
                <span className="ml-2">Pay Online</span>
              </label>
            </div>
          </div>
        </div>
        <div className="modal-content py-4 text-left px-6">
          <h2 className="text-xl font-semibold">Select Address</h2>
          <div className="mt-4">
            <label className="block text-gray-700">Select an address:</label>
            <div className="mt-2">
              <select
                className="form-select h-8 text-blue-600"
                value={profile.address}
                onChange={(e) => setProfile(e.target.value)}
              >
                <option value={profile.address}>{profile.address}</option>
                <option value="work">Work</option>
              </select>
            </div>
          </div>
        </div>
       
      <div className="mt-4 pl-5 pb-5">
        <button
          className="bg-blue-500 text-white px-9 py-1 rounded-md hover:bg-blue-600"
          onClick={()=> handleSelectPayment()}
        >
          Select
        </button>
      </div>
      </div>
    </div>
  );
}

export default PaymentModal;
