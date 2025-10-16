import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TourContext } from "../context/TourBookingContext";
import { toast } from "react-toastify";
import axiosInstance from "../axios/axios";
import Popup from "./Popup";


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/profile");
        if (response.data.success) {
          setUser(response?.data?.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleAdminClick = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      setShowAdminPopup(true);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(
        "/auth/logout",
        {}
      );


      if (response.status === 200) {
        toast.success("Logout successful!");
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Logout failed!");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] mx-auto flex items-center gap-4 px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white rounded-full p-2 text-lg">✈️</div>
          <h1 className="text-2xl font-semibold text-gray-800">Argo</h1>
        </div>

        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex space-x-10 text-gray-600 font-medium">
            <li>
              <Link
                to="/home"
                className={`${location.pathname === "/home" ? "text-blue-600" : "hover:text-blue-600"
                  }`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/my-bookings"
                className={`${location.pathname === "/my-bookings"
                    ? "text-blue-600"
                    : "hover:text-blue-600"
                  }`}
              >
                My Bookings
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                className={`${location.pathname === "/profile"
                    ? "text-blue-600"
                    : "hover:text-blue-600"
                  }`}
              >
                Profile
              </Link>
            </li>

            <li>
              <button
                onClick={handleAdminClick}
                className={`${location.pathname === "/admin"
                    ? "text-blue-600"
                    : "hover:text-blue-600"
                  }`}
              >
                Admin
              </button>
            </li>
          </ul>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button
            className="lg:hidden flex flex-col justify-center items-center gap-[6px] p-2 rounded-md border border-gray-200 text-gray-600"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <span className={`block h-[2px] w-5 bg-current transition-transform duration-300 ${isMenuOpen ? "translate-y-[8px] rotate-45" : ""
              }`}></span>
            <span className={`block h-[2px] w-5 bg-current transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"
              }`}></span>
            <span className={`block h-[2px] w-5 bg-current transition-transform duration-300 ${isMenuOpen ? "-translate-y-[8px] -rotate-45" : ""
              }`}></span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-12 h-12 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
              onMouseEnter={() => setShowDropdown(true)}
            />

            {showDropdown && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                onMouseLeave={() => setShowDropdown(false)}
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-sm">
          <ul className="flex flex-col px-6 py-4 space-y-4 text-gray-600 font-medium">
            <li>
              <Link
                to="/home"
                className={`${location.pathname === "/home" ? "text-blue-600" : "hover:text-blue-600"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/my-bookings"
                className={`${location.pathname === "/my-bookings"
                    ? "text-blue-600"
                    : "hover:text-blue-600"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                My Bookings
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                className={`${location.pathname === "/profile"
                    ? "text-blue-600"
                    : "hover:text-blue-600"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </li>

            <li>
              <button
                onClick={() => {
                  handleAdminClick();
                  setIsMenuOpen(false);
                }}
                className={`${location.pathname === "/admin"
                    ? "text-blue-600"
                    : "hover:text-blue-600"
                  } text-left`}
              >
                Admin
              </button>
            </li>
          </ul>
        </div>
      )}
      {showAdminPopup && (
        <Popup
          title="Admin Access Required"
          message="Do you have an admin account or want to open the admin panel?"
          confirmLabel="Proceed to Admin"
          cancelLabel="Cancel"
          onConfirm={() => {
            setShowAdminPopup(false);
            navigate("/signup", {
              state: {
                user: "admin"
              }
            });
          }}
          onCancel={() => setShowAdminPopup(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
