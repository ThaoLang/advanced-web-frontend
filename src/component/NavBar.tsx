import React from "react";
import { FaBars } from "react-icons/fa6";
import '../app/page.module.css'


export default function NavBar() {

	//Random profile avatar
	const imgId = Math.random() * 100;
	const imgSrc = `https://source.unsplash.com/random/200x200?sig=${imgId}`
	const isLogin = false;

	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start">
				<div className="dropdown">
					<label htmlFor="my-drawer" tabIndex={0} className="btn btn-ghost drawer-button">
						<FaBars/>
					</label>
				</div>
				<a className="btn btn-ghost normal-case text-xl">
					<img className="h-8 w-auto" src="https://bootstraplogos.com/wp-content/uploads/edd/2018/07/logo.png" alt=""></img>
					LightHub
				</a>
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
							<ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
								<li>
									<a className="justify-between">
										Profile
										<span className="badge">New</span>
									</a>
								</li>
								<li><a>Settings</a></li>
								<li><a>Logout</a></li>
							</ul>
						</div>
					</>
					:
					<div>
						<button className="btn btn-ghost text-sm font-semibold leading-6 text-gray-900">
							Log in
						</button>
					</div>
					
				}

			</div>
		</div>
	);
}
