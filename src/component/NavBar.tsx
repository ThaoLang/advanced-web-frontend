"use client"
import React, { useState } from "react";
import Link from 'next/link'
import { FaBars, FaUser, FaGear, FaArrowRightFromBracket } from "react-icons/fa6";
import '../app/page.module.css'


export default function NavBar() {

	//Random profile avatar
	const imgSrc = `https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe`
	const user = {
		username: "Quang",
		email: "nmquang@gmail.com"
	}
	const [isLogin, setIsLogin] = useState(false);



	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start">
				<div className="dropdown">
					<label htmlFor="my-drawer" tabIndex={0} className="btn btn-ghost drawer-button">
						<FaBars />
					</label>
				</div>
				<Link href="/" className="btn btn-ghost normal-case text-xl">
					<img className="h-8 w-auto" src="https://bootstraplogos.com/wp-content/uploads/edd/2018/07/logo.png" alt=""></img>
					LightHub
				</Link>
				{/* TODO: implement Breadcrumb? */}
			</div>

			<div className="navbar-end">
				{/* <div className='relative inline-block rounded-2xl border-2 mr-5 hidden lg:flex'>
					<FaMagnifyingGlass className='absolute text-black mt-3 ml-3'/>
					<input className='rounded-2xl border-solid boder-2 w-60 h-10 text-black pl-10 text-sm ' type='text' placeholder='Search' />
				</div> */}
				{isLogin ?
					<>
						<button className="btn btn-ghost btn-circle">
							<div className="indicator">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
								<span className="badge badge-xs badge-primary indicator-item"></span>
							</div>
						</button>

						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
								<div className="w-10 rounded-full">
									<img src={imgSrc} />
								</div>
							</label>
							<ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box h-auto w-80 space-y-10">
								<li className="text-center font-bold text-lg font-sans">
									{user.email}
								</li>
								<li className="items-center">
									<label className="btn btn-ghost btn-circle avatar">
										<div className="w-24 rounded-full">
											<img src={imgSrc} />
										</div>
									</label>
								</li>
								<li className="text-center text-xl">
										Hi, {user.username}!
								</li>
								<li className="items-center">
									<Link href="/profile">
										<button className="btn border-1 border-black">Manage your LightHub account</button>
									</Link>
									<Link href="/" className="justify-between" passHref legacyBehavior>
										<button onClick={() => setIsLogin(false)}><FaArrowRightFromBracket />Logout</button>
									</Link>
								</li>
							</ul>
						</div>
					</>
					:
					<div>
						<Link href="/" passHref legacyBehavior>
							<button className="btn btn-ghost text-sm font-semibold leading-6 text-gray-900 border-black"
									onClick={() => setIsLogin(true)}>
								Log in
							</button>
						</Link>
					</div>
				}
			</div>
		</div>
	);
}
