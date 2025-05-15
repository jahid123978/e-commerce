import { navigation } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-12">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Social */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">ShopNest</h2>
          <p className="text-gray-400">Your one-stop shop for quality products and deals.</p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-white transition">
              <FaFacebookF />
            </Link>
            <Link href="#" className="hover:text-white transition">
              <FaTwitter />
            </Link>
            <Link href="#" className="hover:text-white transition">
              <FaInstagram />
            </Link>
            <Link href="#" className="hover:text-white transition">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        {/* Links Sections */}
        {Object.entries(navigation).map(([section, items]) => (
          <div key={section}>
            <h3 className="text-lg font-semibold text-white mb-4 capitalize">{section}</h3>
            <ul className="space-y-2">
              {items.map(item => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="text-gray-400 hover:text-white transition text-sm">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="md:col-span-4 lg:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
          <form className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-100 sm:flex-1 px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="mt-2 sm:mt-0 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ShopNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
