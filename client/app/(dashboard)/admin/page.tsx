"use client";
import { DashboardSidebar, StatsElement } from "@/components";
import React from "react";
import { FaArrowUp, FaUsers, FaShoppingCart, FaChartLine } from "react-icons/fa";

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
      <DashboardSidebar />
      
      <div className="flex flex-col items-center ml-5 gap-6 w-full p-6 max-xl:ml-0 max-xl:px-4 max-xl:py-6">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="text-sm text-gray-500">Last updated: 2 hours ago</div>
        </div>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                <p className="text-2xl font-bold text-gray-800 mt-1">2,845</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaShoppingCart className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
                <p className="text-2xl font-bold text-gray-800 mt-1">1,234</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaChartLine className="text-purple-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Conversion Rate</h3>
                <p className="text-2xl font-bold text-gray-800 mt-1">68.2%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visitors Card */}
        <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Today Visitors</h4>
              <p className="text-4xl font-bold mb-2">1,200</p>
              <div className="flex items-center gap-2 text-sm bg-white/10 px-3 py-1 rounded-full">
                <FaArrowUp className="text-green-300" />
                <span className="text-green-300 font-medium">12.5% Increase</span>
                <span className="text-white/70">from last month</span>
              </div>
            </div>
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-white/10 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <span className="text-2xl font-bold">📈</span>
                  <p className="text-xs mt-1">Live Traffic</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Content Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            {/* Add activity timeline here */}
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            {/* Add charts here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;