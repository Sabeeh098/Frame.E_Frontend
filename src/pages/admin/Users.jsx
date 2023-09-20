import  { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import AdminSidebar from '../../components/layouts/AdminSidebar';
import AdminNav from '../../components/layouts/AdminNav';

function Users() {
   
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch user data
    axios
      .get('http://localhost:4000/admin/users') // Replace with the correct URL
      .then((response) => {
        // Handle the response data here
        const users = response.data.userData;
        setUserData(users);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <>
    <AdminNav/>
    <AdminSidebar>
    <main className="flex-1 p-6">
          <h2 className="text-3xl font-semibold mb-4">users</h2>
          {/* Add your admin panel content here */}
       
    <div>
  <div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Favorite Color</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((user, index) => (
          <tr key={user._id}>
            <th>{index + 1}</th>
            <td>{user.userName}</td>
            <td>{user.email}</td>
            <td>{user.favoriteColor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
        </main>
    </AdminSidebar>
  

 
  </>
  );
}

export default Users;
