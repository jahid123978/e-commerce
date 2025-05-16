// components/Breadcrumb.jsx
import Link from "next/link";
import React from "react";
import { FaHouse } from "react-icons/fa6";

const Breadcrumb = ({ items = [] }) => {
  const defaultItems = [
    { href: "/", label: "Home", icon: <FaHouse className="size-3 inline-block mr-1 mb-1" /> },
    { href: "/shop", label: "Shop" },
    { href: "/shop/all", label: "All Products" },
  ];
  const crumbs = items.length ? items : defaultItems;

  return (
    <nav
      aria-label="Breadcrumb"
      className="py-3 px-4 rounded-md text-sm sm:text-base font-sans tracking-wide text-gray-600"
    >
      <ol className="flex items-center space-x-2">
        {crumbs.map((item, idx) => (
          <li key={idx} className="flex items-center">
            <Link
              href={item.href}
              className={`transition-colors hover:text-gray-900 ${
                idx === crumbs.length - 1
                  ? 'text-gray-900 font-medium pointer-events-none'
                  : 'text-gray-600'
              }`}
            >
              {item.icon || null}
              <span className="font-sans">{item.label}</span>
            </Link>
            {idx < crumbs.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;