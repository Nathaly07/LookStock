"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinkd= [
    {href: '/dashboard/', label: 'Inventario',   icon: '../icons/Folder.svg'},
    // {href: '/dashboard/stockControl', label: 'Stock Control',   icon: '../icons/Bag.svg'},
    {href: '/dashboard/chat', label: 'Chat',   icon: '../icons/Chat.svg'}
];
const Sidebar = () => {
    return(
        <div className="relative w-[91px] h-[100vh] bg-white items-center justify-center flex-col p-0">
        <nav className="flex-grow flex flex-col justify-center items-center">
            <ul className="list-none p-4 space-y-4">
            {navLinkd.map((link, index) => (
                <li
                key={index}
                className="flex flex-col items-center hover:bg-blue-500 rounded-xl p-2 text-center group"
                >
                <Link
                    href={link.href}
                    className="flex flex-col items-center space-y-1"
                >
                    <Image
                    src={link.icon}
                    alt={`${link.label} icon`}
                    width={24}
                    height={24}
                    className="group-hover:filter group-hover:invert"
                    />
                    <span className="text-[12px] break-words leading-tight group-hover:text-white">
                    {link.label}
                    </span>
                </Link>
                </li>
            ))}
            </ul>
        </nav>
        </div>
    );
}
export default Sidebar;
