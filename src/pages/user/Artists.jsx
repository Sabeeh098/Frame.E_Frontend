import React, { useState } from "react";
import ArtistList from "../../components/User/ArtistList";
import Navbar from "../../components/layouts/Navbar";
import { BiSearch } from "react-icons/bi";

function Artists() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar />
      <div>
        <div className="flex items-center p-3">
          <input
            className="border w-64 pl-5 h-12"
            type="text"
            placeholder="Search artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <BiSearch className="ml-2 text-gray-600 text-2xl" />
        </div>

        <ArtistList searchTerm={searchTerm} />
      </div>
    </>
  );
}

export default Artists;
