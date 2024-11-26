'use client';

import React from 'react';
import Sidebar from '../components/sidebar';
import Inventory from '../components/inventory';
import Footer from '../components/footer';

const Dashboard = () => {

  return (
    <div className="m-0 p-0 bg-gray-100">
      <div className='flex h-screen'>
        <Sidebar/>
        <div className="flex-grow p-4">
          <Inventory/>
        </div>
      </div>
      <div><Footer/></div>
    </div>
  );
};

export default Dashboard;
