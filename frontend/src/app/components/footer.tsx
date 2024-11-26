"use client";
import React from 'react';

const Footer = () => {
    return(
        <footer className='p-4 bg-white '>
            <div className='p-3 font-nico text-blue-600 text-[24px]'>LookStock</div>
            <div className='p-3 flex justify-between text-[16px]'>
                <p>
                    Eficiencia y control: tu aliado confiable en gestión de inventarios.
                </p>
                <a href="">Github</a>
            </div>
            <div className='place-items-center justify-center'>
                <h2>2024 © ABMODEL</h2>
            </div>
        </footer>
    );
}
export default Footer;