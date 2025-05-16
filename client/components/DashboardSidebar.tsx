import React from "react";
import { MdDashboard} from "react-icons/md";
import { FaTable, FaBagShopping } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const pathname = usePathname();
  
  // Sidebar navigation items
  const navItems = [
    { href: "/admin", icon: <MdDashboard />, text: "Dashboard" },
    { href: "/admin/orders", icon: <FaBagShopping />, text: "Customer information" },
    { href: "/admin/products", icon: <FaTable />, text: "Products" },

  ];

  return (
    <div className="w-[280px] min-h-screen bg-gradient-to-b from-blue-600 to-blue-700 border-r border-blue-500 shadow-xl flex flex-col">
      {/* Sidebar Header */}
      <div className="px-6 py-8 border-b border-blue-500">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="p-2 bg-white/10 rounded-lg">🚀</span>
          Admin Portal
        </h1>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            <div className={`
              flex items-center gap-4 px-4 py-3.5 rounded-xl
              transition-all duration-200
              ${pathname === item.href 
                ? "bg-white/10 text-white shadow-inner" 
                : "text-blue-100 hover:bg-white/5 hover:text-white"}
            `}>
              <span className={`text-xl ${pathname === item.href ? "text-blue-200" : ""}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.text}</span>
              {pathname === item.href && (
                <div className="ml-auto w-1.5 h-1.5 bg-blue-300 rounded-full" />
              )}
            </div>
          </Link>
        ))}
      </nav>

      {/* Footer Version */}
      <div className="px-4 py-6 border-t border-blue-500">
        <div className="text-center text-blue-200 text-sm">
          v1.0.0 • Dashboard
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;