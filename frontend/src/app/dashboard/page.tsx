"use client";

import React, { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";
import Sidebar from '../components/sidebar';
import Inventory from '../components/inventory';
import Footer from '../components/footer';

const Dashboard = () => {
  return (
    <div className="flex-grow p-4">
          <Inventory/>
        </div>
  );
};

export default Dashboard;
