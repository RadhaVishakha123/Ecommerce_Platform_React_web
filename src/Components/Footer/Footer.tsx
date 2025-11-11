import { NavLink } from "react-router-dom"
export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 px-8 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 3h18l-2 13H5L3 3z" />
              <path d="M9 21h6" />
            </svg>
            <span className="text-xl font-semibold text-gray-800">KickKart</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Making your shopping experience smooth, fast, and enjoyable.
            Discover amazing products at great prices — anytime, anywhere.
          </p>
        </div>

        {/* Middle: Quick Links */}
        <div>
          <h2 className="text-gray-800 font-semibold mb-3 text-lg">Quick Links</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><NavLink
    to="/Home"
    className={({ isActive }) =>
      `hover:text-blue-600 cursor-pointer transition ${
        isActive ? "text-blue-800 font-semibold" : "text-gray-700"
      }`
    }
  >Home</NavLink></li>
            <li> <NavLink
    to="/Orders"
    className={({ isActive }) =>
      `hover:text-blue-600 cursor-pointer transition ${
        isActive ? "text-blue-800 font-semibold" : "text-gray-700"
      }`
    }
  >Orders</NavLink></li>
            <li> <NavLink
    to="/Contact"
    className={({ isActive }) =>
      `hover:text-blue-600 cursor-pointer transition ${
        isActive ? "text-blue-800 font-semibold" : "text-gray-700"
      }`
    }
  >Contact</NavLink></li>
          </ul>
        </div>

        {/* Right: Social + Contact */}
        <div>
          <h2 className="text-gray-800 font-semibold mb-3 text-lg">Follow Us</h2>
          <div className="flex gap-4 mb-4">
            {/* Facebook */}
            <a href="#" className="text-gray-500 hover:text-blue-600 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 16.99 22 12z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="text-gray-500 hover:text-pink-600 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" className="text-gray-500 hover:text-sky-500 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.23 4.23 0 0 0 1.86-2.33 8.39 8.39 0 0 1-2.68 1.03 4.18 4.18 0 0 0-7.12 3.82A11.87 11.87 0 0 1 3.15 4.6a4.18 4.18 0 0 0 1.29 5.58 4.17 4.17 0 0 1-1.9-.52v.05a4.19 4.19 0 0 0 3.35 4.1 4.25 4.25 0 0 1-1.89.07 4.19 4.19 0 0 0 3.9 2.9A8.39 8.39 0 0 1 2 19.54a11.83 11.83 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.36 8.36 0 0 0 22.46 6z" />
              </svg>
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} KickKart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
