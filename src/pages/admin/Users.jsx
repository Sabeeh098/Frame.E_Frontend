import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/layouts/AdminSidebar';
import AdminNav from '../../components/layouts/AdminNav';
import { adminAxiosInstance } from '../../api/axios';

function Users() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/users')
      .then((response) => {
        const users = response.data.userData;
        setUserData(users);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleBlockUser = (userId) => {
    adminAxiosInstance
      .patch('/block', { userId })
      .then(() => {
        
        const updatedUserData = userData.map((user) => {
          if (user._id === userId) {
            return { ...user, isActive : true };
          }
          return user;
        });
        setUserData(updatedUserData);
      })
      .catch((error) => {
        console.error('Error blocking user:', error);
      });
  };

  const handleUnblockUser = (userId) => {
    adminAxiosInstance
      .patch('/unblock', { userId })
      .then(() => {
     
        const updatedUserData = userData.map((user) => {
          if (user._id === userId) {
            return { ...user, isActive: false };
          }
          return user;
        });
        setUserData(updatedUserData);
      })
      .catch((error) => {
        console.error('Error unblocking user:', error);
      });
  };

  return (
    <>
      <AdminNav />
      <AdminSidebar>
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-semibold mb-4">Users</h2>
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => (
                    <tr key={user._id}>
                      <th>{index + 1}</th>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isActive ? (
                          <button
                            onClick={() => handleUnblockUser(user._id)}
                            className="bg-green-500 text-white px-2 py-1 rounded-md"
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBlockUser(user._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded-md"
                          >
                            Block
                          </button>
                        )}
                      </td>
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
