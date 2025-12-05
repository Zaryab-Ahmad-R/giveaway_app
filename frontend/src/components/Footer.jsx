import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className='bg-[#5A9690] w-full md:h-15 md:mt-2.5 mt-3 flex items-center justify-center'>
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
                    <Link to="https://www.tiktok.com/@zainverse621?_r=1&_t=ZN-91yaczARnuQ" target="_blank" rel="noreferrer">
                        <FaTiktok size={35} />
                    </Link>
                </div>
            </footer>
        </>
    )
}

export default Footer
