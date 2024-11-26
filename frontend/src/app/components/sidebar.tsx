"use client";
import React from 'react';

const Sidebar = () => {
    return(
        <div className="relative w-[75px] h-[100vh] bg-white items-center justify-center flex flex-col">
            <nav className='flex-grow text-xl'>
                <ul className='list-none'>
                    <li className='flex justify-center items-center'>
                        1
                    </li>
                    <li className='flex justify-center items-center'>
                        2
                    </li>
                    <li className='flex justify-center items-center'>
                        3
                    </li>
                </ul>
            </nav>
        </div>
    );
}
export default Sidebar;
