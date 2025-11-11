import { useEffect, useRef, useState } from "react";
import useAuth from "../Context/AuthContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useSearch from "../Context/SearchContext";
import { FaUser, FaShoppingCart, FaBox, FaSignOutAlt } from "react-icons/fa";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    CurrentUserLogindata,
    Logout,
    openProfile,
    closeProfile,
    IsProfileopen,
  } = useAuth();
  const { SearchTerm, setSearchTerm,setdebouncedSearch } = useSearch();
  useEffect(()=>{
    const timer=setTimeout(() => {
      setdebouncedSearch(SearchTerm)
    }, 1000);// wait 1000ms after typing stops
    return ()=>clearTimeout(timer)//cleanup if user types again quickly
  },[SearchTerm])
  
  const navigate = useNavigate();
  const MenuRef = useRef<HTMLDivElement>(null);
  function LogoutHandle() {
    Logout();
    navigate("/");
  }
  function ProfileHandle() {
    openProfile();
    setIsMenuOpen(false);
  }
  function SearchHandler(e: any) {
    navigate("/Home");
    setSearchTerm(e.target.value);
  }
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (MenuRef.current && !MenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      //The component unmounts (is removed from the screen), or
      //The useEffect re-runs (when its dependencies change).
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);
  return (
    <>
      <header className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center relative">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 3h18l-2 13H5L3 3z" />
            <path d="M9 21h6" />
          </svg>
          <span className="text-2xl font-semibold text-gray-800 tracking-wide">
            KickKart
          </span>
        </div>

        {/* Middle: Search */}
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
            />
          </svg>
          <input
            type="text"
            value={SearchTerm}
            onChange={(e) => SearchHandler(e)}
            placeholder="Search products..."
            className="bg-transparent outline-none text-gray-700 w-full"
          />
        </div>

        {/* Right: User Icon */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 focus:outline-none"
          >
            {/* SVG Avatar Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#4b5563"
              className="border border-gray-300 rounded-full p-1 hover:bg-gray-200"
            >
              <path
                d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 
              17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306
              q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720
              q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
              />
            </svg>
            <span className="text-gray-800 font-medium">
              {CurrentUserLogindata?.Username}
            </span>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
  <div
    ref={MenuRef}
    className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
  >
    <ul className="flex flex-col py-2 text-gray-700">
      {/* Profile */}
      <li
        onClick={ProfileHandle}
        className="px-4 py-2 hover:bg-gray-100 flex items-center gap-3 cursor-pointer transition"
      >
        <FaUser className="text-blue-600" />
        <span>Profile</span>
      </li>

      {/* Cart */}
      <li className="px-4 py-2 hover:bg-gray-100">
        <NavLink
          to="/AddCart"
          onClick={() => setIsMenuOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 transition ${
              isActive
                ? "text-blue-800 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }`
          }
        >
          <FaShoppingCart className="text-blue-600" />
          <span>Cart</span>
        </NavLink>
      </li>

      {/* Orders */}
      <li className="px-4 py-2 hover:bg-gray-100">
        <NavLink
          to="/Orders"
          onClick={() => setIsMenuOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 transition ${
              isActive
                ? "text-blue-800 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }`
          }
        >
          <FaBox className="text-blue-600" />
          <span>Orders</span>
        </NavLink>
      </li>

      {/* Logout */}
      <li
        onClick={LogoutHandle}
        className="px-4 py-2 hover:bg-gray-100 flex items-center gap-3 cursor-pointer text-red-600 transition"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </li>
    </ul>
  </div>
)}

        </div>
      </header>
      {/* {IsProfileopen && (
        <div className="fixed inset-0 z-1 bg-black/40 flex justify-center items-center h-screen">
          <div className="bg-white p-6 rounded-xl shadow-2xl relative ">
            <button
              onClick={closeProfile}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <UserPersonlDetails />
          </div>
        </div>
      )} */}
    </>
  );
}
