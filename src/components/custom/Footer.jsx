import React from "react";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-700 py-8 px-10 transition duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between">
        {/* Contact Form */}
        <div className="mx-auto md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Contact Us
          </h2>
          <form>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 mb-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring focus:ring-indigo-500 dark:focus:ring-indigo-400 transition duration-300"
            />
            <textarea
              placeholder="Your message"
              className="w-full px-4 py-2 mb-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring focus:ring-indigo-500 dark:focus:ring-indigo-400 transition duration-300"
            ></textarea>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-500 dark:bg-indigo-600 text-white rounded-md hover:bg-indigo-600 dark:hover:bg-indigo-700 transition duration-300"
            >
              Send
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300"
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
        <p>&copy; 2024 Ori assia. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
