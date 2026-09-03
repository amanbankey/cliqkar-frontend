import React, { useState } from "react";
import {
  FiUsers,
  FiShield,
  FiSlash,
  FiUser,
  FiMail,
  FiPhone,
  FiPlus,
  FiMoreVertical,
  FiEye,
  FiTrash2,
  FiTrendingUp,
} from "react-icons/fi";

const initialCustomers = [
  {
    id: "CLQ-8801",
    name: "Deepak Kumawat",
    initials: "DK",
    email: "deepakkumawat44711@gmail.com",
    phone: "+91 90012 91792",
    region: "India",
    language: "EN",
    status: "Active",
  },
  {
    id: "CLQ-8802",
    name: "Nikhlesh Hirani",
    initials: "NH",
    email: "yashhirani2929@gmail.com",
    phone: "+91 63775 24508",
    region: "India",
    language: "EN",
    status: "Blocked",
  },
  {
    id: "CLQ-8803",
    name: "Naveen",
    initials: "N",
    email: "info.vivantravels@gmail.com",
    phone: "+91 87642 32996",
    region: "India",
    language: "EN",
    status: "Active",
  },
  {
    id: "CLQ-8804",
    name: "Srinivas Kiran V",
    initials: "SK",
    email: "vadlamudisrinivaskiran967...",
    phone: "+91 91333 22713",
    region: "India",
    language: "EN",
    status: "Active",
  },
  {
    id: "CLQ-8805",
    name: "Hitesh Jangir",
    initials: "HJ",
    email: "hiteshjangir542@gmail.com",
    phone: "+91 76658 90598",
    region: "India",
    language: "EN",
    status: "Active",
  },
  {
    id: "CLQ-8806",
    name: "Jayesh",
    initials: "J",
    email: "jayesh@gmail.com",
    phone: "+91 96020 84730",
    region: "India",
    language: "EN",
    status: "Active",
  },
];

const statCards = [
  { icon: FiUsers, iconBg: "bg-indigo-50", iconColor: "text-indigo-500", label: "Total Registered", value: "23", growth: "4.2%" },
  { icon: FiShield, iconBg: "bg-emerald-50", iconColor: "text-emerald-500", label: "Active Users", value: "22", dot: "bg-emerald-500" },
  { icon: FiSlash, iconBg: "bg-red-50", iconColor: "text-red-500", label: "Suspended / Blocked", value: "1", dot: "bg-red-500" },
];

const CustomerList = () => {
  const [searchForm, setSearchForm] = useState({ name: "", email: "", number: "" });
  const [customers, setCustomers] = useState(initialCustomers);
  const [openMenu, setOpenMenu] = useState(null);

  const handleChange = (e) => {
    setSearchForm({ ...searchForm, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/customers/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchForm),
      });
      const data = await response.json();
      if (data?.customers) setCustomers(data.customers);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const handleReset = () => {
    setSearchForm({ name: "", email: "", number: "" });
    setCustomers(initialCustomers);
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
    setOpenMenu(null);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Operations <span className="mx-1">›</span>
            <span className="text-blue-600 font-medium">Customer List</span>
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Customer List</h1>
          <p className="text-sm text-gray-500 mt-1">Manage client accounts, verification states, and direct actions.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0B1120] text-white text-sm font-semibold px-4 py-2.5 rounded-xl h-fit">
          <FiPlus size={16} /> Add New Customer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {statCards.map(({ icon: Icon, iconBg, iconColor, label, value, growth, dot }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
            <div className={`w-11 h-11 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`${iconColor} text-lg`} />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{label}</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">{value}</span>
                {growth && (
                  <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                    <FiTrendingUp size={9} />
                    {growth}
                  </span>
                )}
                {dot && <span className={`w-2 h-2 rounded-full ${dot}`} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
            <FiUser className="text-gray-400 flex-shrink-0" size={16} />
            <input
              type="text"
              name="name"
              value={searchForm.name}
              onChange={handleChange}
              placeholder="Search by Name"
              className="w-full text-sm text-gray-700 focus:outline-none"
            />
          </div>
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
            <FiMail className="text-gray-400 flex-shrink-0" size={16} />
            <input
              type="text"
              name="email"
              value={searchForm.email}
              onChange={handleChange}
              placeholder="Search by Email"
              className="w-full text-sm text-gray-700 focus:outline-none"
            />
          </div>
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
            <FiPhone className="text-gray-400 flex-shrink-0" size={16} />
            <input
              type="text"
              name="number"
              value={searchForm.number}
              onChange={handleChange}
              placeholder="Search by Number"
              className="w-full text-sm text-gray-700 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg">
              Search
            </button>
            <button type="button" onClick={handleReset} className="border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-lg">
              Reset
            </button>
          </div>
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">SL</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">CUSTOMER NAME</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">CONTACT DETAILS</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">REGION</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">LANGUAGE</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">ACCOUNT STATUS</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, i) => (
                <tr key={customer.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-4 text-sm text-gray-600">{i + 1}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {customer.initials}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-400">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
                      <FiMail size={12} className="text-gray-400" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <FiPhone size={12} className="text-gray-400" />
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-gray-700">🇮🇳 {customer.region}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">{customer.language}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`flex items-center gap-1.5 w-fit text-xs font-semibold px-2.5 py-1 rounded-full ${
                        customer.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${customer.status === "Active" ? "bg-emerald-500" : "bg-red-500"}`} />
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === customer.id ? null : customer.id)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <FiMoreVertical size={18} />
                    </button>
                    {openMenu === customer.id && (
                      <div className="absolute right-4 top-10 z-10 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50">
                          <FiEye size={13} /> View
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                        >
                          <FiTrash2 size={13} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">Showing 1-6 of 23 customers</p>
          <div className="flex items-center gap-2">
            <button className="border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg">Previous</button>
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 text-xs font-semibold rounded-lg ${
                  page === 1 ? "bg-[#0B1120] text-white" : "border border-gray-200 text-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;