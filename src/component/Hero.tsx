import React from 'react';
import Link from 'next/link'

export default function Hero() {
    return (
        <div className="hero min-h-screen"
            style={{ backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-start text-neutral-content">
                <div className="flex flex-col text-center lg:text-start lg:jusitfy-center justify-start">
                    <h1 className="mb-5 text-4xl lg:text-6xl font-bold lg:w-3/5">Manage Teaching and Learning with <span className="text-yellow-400">LightHub</span></h1>
                    <p className="mb-5 text-lg lg:w-3/5">A cutting-edge online platform for seamless education, collaboration, and innovation. Join us in shaping a brighter future for education.</p>
                    <div className="flex lg:flex-row flex-col">
                        <Link href="/auth">
                            <button className="mb-5 lg:w-64 w-screen btn btn-info text-uppercase">Get Started</button>
                        </Link>
                        <Link href="/about">
                            <button className="mb-5 lg:ml-5 lg:w-36 w-screen btn btn-info text-uppercase">Learn more</button>
                        </Link>
                    </div>
                    <p className="mb-5 text-lg"><b>LightHub is free to try</b> for as long as you’d like.</p>
                </div>
            </div>
        </div>
    )
}