import React from 'react'
import logo from '../assets/logo.png'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram, FaYoutube, FaTimes, FaBars } from "react-icons/fa";
import { useState } from 'react';
import { Link,NavLink } from 'react-router-dom'



const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <nav className="sticky top-2 z-50 bg-white shadow-md w-[90%] mx-auto border-2 border-transparent border-solid h-20 rounded-md flex justify-around items-center">
                <div className="logo-container">
                    <img  src={logo} alt="logo" className="h-20 w-[100px] scale-110" />
                </div>

                <ul className="hidden md:flex justify-center items-center gap-6 list-none font-bold text-[#2F5755]">
                    <li>
                        <NavLink to='/'>
                        Home
                      </NavLink>
                    </li>
                    <li>
                        <NavLink to='/registration'>
                        Registration
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/claim'>
                        Claim Prize
                        </NavLink>
                        </li>
                </ul>

                <div className="social-links flex justify-center items-center gap-3">
                    <Link to="https://www.facebook.com/zainverse621" target="_blank" rel="noreferrer">
                        <FaFacebook size={35} />
                    </Link>
                    <Link to="https://www.instagram.com/zainverse621" target="_blank" rel="noreferrer">
                        <FaInstagram size={35} />
                    </Link>
                    <Link to="https://www.youtube.com/@Zainverse621" target="_blank" rel="noreferrer">
                        <FaYoutube size={35} />
                    </Link>
                </div>

                <button
                    onClick={toggleMenu}
                    className="md:hidden text-[#2F5755] focus:outline-none"
                >
                    {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                </button>
            </nav>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                    onClick={closeMenu}
                ></div>
            )}

            <div
                className={`fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col items-start p-6 space-y-6">
                    {/* Close Button */}
                    <button
                        onClick={closeMenu}
                        className="self-end mb-4 text-[#2F5755] focus:outline-none"
                    >
                        <FaTimes size={28} />
                    </button>

                    {/* Menu Links */}
                    <NavLink
                        to='/'
                        onClick={closeMenu}
                        className="text-lg font-bold text-[#2F5755] hover:text-[#5A9690]"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to='/registration'
                        onClick={closeMenu}
                        className="text-lg font-bold text-[#2F5755] hover:text-[#5A9690]"
                    >
                        Registration
                    </NavLink>
                    <NavLink
                        to='/claim'
                        onClick={closeMenu}
                        className="text-lg font-bold text-[#2F5755] hover:text-[#5A9690]"
                    >
                        Claim Prize
                    </NavLink>

                </div>
            </div>

        </>
    )
}

export default Navbar
