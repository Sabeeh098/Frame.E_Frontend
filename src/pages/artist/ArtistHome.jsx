
import Recentpost from '../../components/Artist/Recentpost';
import NavbarArtist from '../../components/layouts/NavbarArtist';
// import backgroundImage from '../../assets/esy-044857857-transformed.jpeg';

function ArtistHome() {


  return (
    <div >
      <NavbarArtist />
      <div>
        
        <Recentpost/>
      </div>
    </div>
  );
}

export default ArtistHome;
