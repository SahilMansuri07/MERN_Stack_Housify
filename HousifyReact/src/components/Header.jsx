import { useState } from "react";
import {
  FaBars,
  FaHome,
  FaBuilding,
  FaTag,
  FaEnvelope,
  FaUser,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust path if needed

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  console.log("Header rendered with role:", auth.role, "and username:", auth.username);
  console.log("Header rendered with token:", auth.token);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-[#f9fafe] shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Housify
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center space-x-6 text-[15px] font-medium">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-md border-b-2 border-blue-500 shadow-sm"
          >
            <FaHome /> Home
          </Link>
          {auth.role === "buyer" && (
            <Link
              to="/properties"
              className="flex items-center gap-2 text-gray-800 hover:text-blue-600"
            >
              <FaBuilding /> Browse Properties
            </Link>
          )}
          {auth.role === "seller" && (
            <Link
              to="/my-listing"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <FaTag /> Sell Your House
            </Link>
          )}

          <Link
            to="/contact"
            className="flex items-center gap-2 text-gray-800 hover:text-blue-600"
          >
            <FaEnvelope /> Contact Us
          </Link>

          <div className="flex items-center gap-3 ml-6 border p-2 bg-white  rounded-md">
            {auth.token ? (
              <>
                <div><FaUser/></div>
                <span className="text-blue-600 font-semibold">
                  Hi, {auth.username || "User"}
                </span>
               
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 border border-red-600 text-red-600 px-4 py-1.5 rounded-md hover:bg-red-50"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/user/login"
                  className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-50"
                >
                  <FaUser /> Login
                </Link>
                <Link
                  to="/user/signup"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700"
                >
                  <FaPlus /> Signup
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Hamburger Menu */}
        <div
          className="sm:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars className="text-xl text-blue-600" />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white px-4 pb-4">
          <ul className="space-y-3 text-[15px] font-medium">
            <li>
              <Link to="/" className="flex items-center gap-2 text-blue-600">
                <FaHome /> Home
              </Link>
            </li>
            {auth.role === "buyer" && (
              <li>
                <Link
                  to="/properties"
                  className="flex items-center gap-2 text-gray-800"
                >
                  <FaBuilding /> Browse Properties
                </Link>
              </li>
            )}
            {auth.role === "seller" && (
              <li>
                <Link
                  to="/my-listing"
                  className="flex items-center gap-2 text-blue-600"
                >
                  <FaTag /> Sell Your House
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/contact"
                className="flex items-center gap-2 text-gray-800"
              >
                <FaEnvelope /> Contact Us
              </Link>
            </li>
            {auth.token ? (
              <>
                <li className="text-blue-600">Hi, {auth.username}</li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 border border-red-600 text-red-600 px-4 py-1.5 rounded-md w-full"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/user/login"
                    className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-1.5 rounded-md"
                  >
                    <FaUser /> Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/signup"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-md"
                  >
                    <FaPlus /> Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
