import React from 'react';
import NavbarArtist from '../../components/layouts/NavbarArtist';
import Orders from '../../components/Artist/Orders';

function OrdersPage() {
  return (
    <div>
      <NavbarArtist />
    <div className="flex flex-col h-screen justify-start items-center">
      <Orders />
    </div>
    </div>
  );
}

export default OrdersPage;
