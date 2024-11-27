"use client";
import React, { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";

 export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    if (!user) {
      return <p>Loading...</p>;
    };

    return (
        <div className="m-0 p-0 bg-gray-100">
        <div className='flex h-screen'>
          <Sidebar/>
          <div className="flex-grow p-4 bg-gray-100">
            {children}
          </div>
        </div>
        <div><Footer/></div>
      </div>
    );
 }

 