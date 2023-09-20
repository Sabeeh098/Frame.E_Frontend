import React from 'react';
import NavbarArtist from '../../components/layouts/NavbarArtist';
import backgroundImage from '../../assets/esy-044857857-transformed.jpeg';

function ArtistHome() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Adjust this based on your design needs
    backgroundPosition: 'center', // Adjust this based on your design needs
    height: '50vh', // Set the height to 50% of the viewport height
    // Add more CSS properties as needed to style your background
  };

  return (
    <div style={backgroundStyle}>
      <NavbarArtist />
      <div>
        Welcome Artist
      </div>
    </div>
  );
}

export default ArtistHome;
