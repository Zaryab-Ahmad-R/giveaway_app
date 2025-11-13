import React from 'react'
import { useEffect } from 'react';
import Introsection from "../components/Introsection";
import SplitText from '../components/SplitText';
import Footer from '../components/Footer';
import InstaSwiper from '../components/InstaSwiper';


const Home = () => {


  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };


  useEffect(() => {
    document.title = "Zainverse - Home";
  }, []);

  return (
    <div className="min-h-screen bg-[#2F5755] flex flex-col justify-between">

      <div>
        <Introsection />
        <div className="aim-container flex justify-center mt-3 md:mt-6">
          <div className="aim-content md:w-[95%] w-full md:h-110 h-auto md:flex-row bg-[#5A9690]  mt-3 outline-none flex flex-col">
            <div className="aim-heading md:w-[40%] h-full flex justify-center items-center mt-2.5">
              <SplitText
                text="What Inspired These Giveaways"
                className="md:text-5xl text-3xl font-bold text-center text-[#E0D9D9]"
                delay={400}
                duration={0.1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                tag='h1'
                onLetterAnimationComplete={handleAnimationComplete}
              />
            </div>
            <div className="aim-video md:w-[60%] w-full flex justify-center items-center mt-2.5">
              <iframe width="800" height="400" src="https://www.youtube.com/embed/bwb0qcnpmUU?si=gsOjc4Qo6dYahab_" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>

        <section>
          <div className="top1 flex justify-center items-center md:mt-6 ">
            <div className="top bg-[#5A9690] w-full md:w-[50%] mt-7 flex justify-center items-center md:h-20 md:rounded-2xl mb-3" >
              <h1 className='text-[#E0D9D9] md:text-4xl text-3xl  text-center font-bold'>Our Giveaways So Far</h1>
            </div>
          </div>
          <div className="giveaways md:mt-4 flex justify-center items-center mx-auto">
            <InstaSwiper />
          </div>
        </section>

      </div>

      <Footer />

    </div>
  )
}

export default Home
