import React, { useEffect, useState } from 'react';
import { adminAxiosInstance } from '../../api/axios';

function ArtistTable() {
  const [artistData, setArtistData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // Set the number of artists per page
  const [activePage, setActivePage] = useState(1); // Track the active page separately

  useEffect(() => {
    fetchArtistDetails(page, pageSize);
    setActivePage(page); // Set the active page
  }, [page, pageSize]);

  const fetchArtistDetails = (page, pageSize) => {
    adminAxiosInstance.get(`/artists?page=${page}&pageSize=${pageSize}`,)
      .then((response) => {
        setArtistData(response.data.artistData);
      })
      .catch((error) => {
        console.log("Error fetching artists: ", error);
      });
  };

  const nextPage = () => {
    setPage(page + 1);
    setActivePage(page + 1); // Update the active page
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setActivePage(page - 1); // Update the active page
    }
  };

const handleBlock = (artistId) => {
  adminAxiosInstance.patch('/blockArtist',{artistId})
  .then(() => {
    const updatedArtistData = artistData.map((artist) => {
      if (artist._id === artistId){
        return {...artist, isBlocked: true};
      }
      return artist;
    })
    setArtistData(updatedArtistData);
  })
  .catch((err) => {
    console.log('Failed to block artist',err);
  })
}
 
const handleUnblock = (artistId) => {
  adminAxiosInstance.patch('/unblockArtist',{artistId})
  .then(() => {
    const updatedArtistData = artistData.map((artist) => {
      if (artist._id === artistId){
        return {...artist, isBlocked: false};
      }
      return artist;
    });
    setArtistData(updatedArtistData);
  })
  .catch((err) => {
    console.log('Failed to unblock artist', err);
  })
}
  return (
    <>
      <div className="overflow-x-auto border">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Arts</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {artistData.map((artist, index) => (
              <tr key={artist._id}>
              <td>
                <div className="flex items-center space-x-3 border-r-2">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={artist.profilePicture} alt="Artist Avatar" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{artist.name}</div>
                  </div>
                </div>
              </td>
              <td className='border-r-2'>
                {artist.artCategories.join(', ')}
                <span className="badge badge-ghost badge-sm">
                  {artist.profession}
                </span>
              </td>
              <td>
                {artist.isBlocked ? (
                  <button
                    onClick={() => handleUnblock(artist._id, false)} // Unblock
                    className="bg-green-500 text-white px-2 py-1 rounded-md"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlock(artist._id, true)} // Block
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
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={previousPage}
          disabled={page <= 1}
          className={`${
            page <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          } px-4 py-2 bg-blue-500 text-white rounded-md`}
        >
          Previous
        </button>
        {/* Render page buttons */}
        {Array.from({ length: Math.ceil(artistData.length / pageSize) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`${
              i + 1 === activePage ? 'bg-blue-600' : 'hover:bg-blue-600'
            } px-4 py-2 bg-blue-500 text-white rounded-md`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover-bg-blue-600"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default ArtistTable;
