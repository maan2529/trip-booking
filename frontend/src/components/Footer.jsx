import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-gray-500 py-12  sm:px-8 w-full ">
      <div className="w-full mx-auto space-y-10 ">
        <div className="border-t border-gray-300"></div>

        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:items-start mx-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-3 text-left">
              <h3 className="text-black text-base font-semibold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#about" className="hover:text-gray-900 transition-colors duration-200">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#careers" className="hover:text-gray-900 transition-colors duration-200">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-gray-900 transition-colors duration-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3 text-left">
              <h3 className="text-black text-base font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#help" className="hover:text-gray-900 transition-colors duration-200">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#safety" className="hover:text-gray-900 transition-colors duration-200">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#guidelines" className="hover:text-gray-900 transition-colors duration-200">
                    Guidelines
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3 text-left">
              <h3 className="text-black text-base font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#privacy" className="hover:text-gray-900 transition-colors duration-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-gray-900 transition-colors duration-200">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-4">
            <p className="text-sm text-gray-400">Follow us</p>
            <div className="flex flex-wrap gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors duration-200">
                <FaFacebookF />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors duration-200">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors duration-200">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors duration-200">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 border-t border-gray-300 pt-6 text-center">
          © {new Date().getFullYear()} TravelGo Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
