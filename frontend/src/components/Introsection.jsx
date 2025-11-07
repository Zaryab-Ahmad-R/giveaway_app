import React from 'react'
import Navbar from './Navbar'
import SplitText from './SplitText'

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const Introsection = () => {
  return (
    <div>
      <Navbar />
      <section className="text-center py-10 md:mt-6 mt-9 text-[#E0D9D9]">
        <div>
          <SplitText
            text="Welcome to Zainverse!"
            className="text-5xl font-bold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            tag='h2'
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </div>
        {/* <TextType
          text={[" I’m Zain Ahmad, and I run the Zainverse. Join my giveaways by registering below — one entry per phone number! "]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          initialDelay={1200}
          className='text-lg text-[#E0D9D9] max-w-2xl mx-auto'
          cursorCharacter="|"
        /> */}
      </section>
    </div>
  )
}

export default Introsection
