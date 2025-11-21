import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Total Products", value: 3, link: "/admin/products" },
    { title: "Total Orders", value: 2, link: "/admin/orders" },
    { title: "Total Customers", value: 20, link: "/admin/users" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold">{stat.title}</h2>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
            <button
              onClick={() => navigate(stat.link)}
              className="mt-4 px-3 py-1 bg-blue-600 text-white rounded"
            >
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
