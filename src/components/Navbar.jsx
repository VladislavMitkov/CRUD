import React from "react";

import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="text-white h-[70px] w-screen z-10  drop-shadow-lg border-gray-200 px-2 sm:px-4 py-2.5  bg-gray-800">
        <div className="flex px-2 w-full space-x-[440px]">
          <div className="flex">
            <h1 className="text-3xl font-bold sm:text-4xl">CRUD.</h1>
          </div>
          <div className="items-center flex justify-center">
            <div className="">
              <ul className="flex space-x-11">
                <li>
                  <Link to="/">
                    <button className=" hover:scale-[1.5] transition duration-500 ease-in-out">
                      HOME
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/create">
                    <button className=" hover:scale-[1.5] transition duration-500 ease-in-out">
                      CREATE USER
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
