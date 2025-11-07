import React from 'react'
import { useEffect } from 'react';
import RegistrationForm from '../components/RegistrationForm'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Registration = () => {

    useEffect(() => {
        document.title = "Zainverse - Registration";
    }, []);
    return (
        <>
            <div className="min-h-screen bg-[#2F5755] flex flex-col justify-between">

            <Navbar />
            <RegistrationForm />
            <Footer/>
            </div>
        </>
    )
}

export default Registration
