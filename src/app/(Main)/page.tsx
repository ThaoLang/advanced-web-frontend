import Image from 'next/image'
import styles from './page.module.css'
import Hero from '@/component/Hero'

export default function Home() {
  const line = `test${process.env.DB_HOST}`;
  return (
    <div className="bg-white">
      <Hero />
      <div className="flex flex-col w-5/6 mx-auto">
        <div className="mt-10 lg:w-3/4 mx-auto text-center">
          <div className="text-5xl"><b>Why <span className="text-yellow-400">LightHub?</span></b></div>
          <p className="mt-5 text-lg lg:text-xl">At LightHub, we believe in the transformative power of education.
            We've created a platform that goes beyond traditional learning, providing an immersive
            and collaborative environment for students and educators alike.</p>
        </div>

        <div className="divider lg:hidden"></div>

        <div className="lg:mt-20 lg:flex-row flex flex-col lg:justify-center space-x-4">
          <div className="lg:mt-10 mx-10 lg:w-1/2">
            <div className="text-3xl lg:text-5xl"><b>A new era of education</b></div>
            <p className="mt-5 text-lg lg:text-xl">Join LightHub and embark on
              a journey where learning knows no bounds. Sign up now and experience education reimagined.</p>
          </div>
          <div className="lg:w-1/2">
            <img className="rounded-xl w-screen" src="https://corp.kaltura.com/wp-content/uploads/2021/11/shutterstock_1760879942.jpg"></img>
          </div>
        </div>

        <div className="divider lg:hidden"></div>

        <div className="lg:mt-20 lg:flex-row flex flex-col lg:justify-center space-x-4">
          <div className="lg:w-1/2">
            {/* Image */}
            <img className="rounded-xl w-screen" src="https://www.graduateprogram.org/wp-content/uploads/2020/07/July-9-Online-Courses-for-Teachers-this-Summer_web-1024x683.jpg.webp"></img>
          </div>
          <div className="lg:mt-10 mx-10 lg:w-1/2 text-right">
            <div className="text-3xl lg:text-5xl"><b>For Educators</b></div>
            <p className="mt-5 text-lg lg:text-xl">LightHub is not just a platform; it's a community of educators
              shaping the future of learning. Join us in revolutionizing education one lesson at a time.
              Explore our educator-specific features and bring your teaching to new heights.</p>
          </div>
        </div>

        <div className="divider lg:hidden"></div>

        <div className="lg:mt-20 lg:flex-row flex flex-col lg:justify-center space-x-4">
          <div className="lg:mt-10 mx-10 lg:w-1/2">
            <div className="text-3xl lg:text-5xl"><b>For Students</b></div>
            <p className="mt-5 text-lg lg:text-xl">Your learning adventure begins here. Dive into a world of
              possibilities, connect with peers, and explore subjects in ways you never imagined.
              LightHub is your portal to a brighter future.</p>
          </div>
          <div className="lg:w-1/2">
            {/* Image */}
            <img className="rounded-xl w-screen" src="https://www.westend61.de/images/0001481557pw/boys-looking-at-laptop-while-e-learning-in-living-room-VABF04028.jpg"></img>
          </div>
        </div>
      </div>
      <div className="mt-20 text-center bg-[#365338]">
        <div className="h-10"></div>  {/* Why i can't use mt-10??? */}
        <div className="text-4xl lg:text-5xl text-white"><b>See all you can accomplish with <span className="text-yellow-400">  LightHub</span></b></div>
        <div className="mt-10 flex lg:flex-row flex-col lg:justify-center">
          <button className="mb-5 lg:w-80 btn btn-info text-uppercase">Get Started</button>
          <button className="mb-5 lg:w-80 lg:ml-5 btn btn-info text-uppercase ">Learn more</button>
        </div>
        <div className="h-10"></div>  {/* Why i can't use mt-10??? */}
      </div>
      <div className="text-center underline">
        <h1>The value of customKey is: {process.env.DB_HOST} {line}</h1>
      </div>
    </div>
  )
}
