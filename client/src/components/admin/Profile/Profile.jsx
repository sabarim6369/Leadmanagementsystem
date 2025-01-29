import React, { useState,useEffect } from "react";
import Sidebar from "../../../utils/sidebar";

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex h-screen">
      <div className="lg:w-[250px] w-0">
        <Sidebar />
      </div>

      <div className="flex-grow p-6 flex flex-col space-y-6">
        <h1 className="text-white text-2xl font-bold">Telecaller Profile</h1>

        <div className="w-full bg-[#1f1f1f] h-[30%] rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-full border-4 border-yellow-400 flex items-center justify-center">
              <i className="fa fa-user text-4xl text-white"></i>
            </div>
            <div className="text-white">
              <h2 className="text-xl font-bold">Name name</h2>
              <p>701086XXXX</p>
              <p>Kinathukadavu, Coimbatore</p>
            </div>
          </div>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg">Edit</button>
        </div>

        <div className="flex flex-grow space-x-4">
          <div className="w-1/2 bg-[#1f1f1f] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-bold">Caller History</h2>
              <div className="relative inline-block w-24">
                <button
                  onClick={toggleDropdown}
                  className="bg-[#242424] text-white w-full h-10 rounded flex items-center justify-between px-3"
                >
                  <span>Year</span>
                  <i className="fa fa-chevron-down text-white"></i>
                </button>

                {dropdownOpen && (
                  <ul className="absolute bg-[#242424] text-white rounded shadow-md mt-1 w-full z-10">
                    <li className="px-3 py-2 hover:bg-gray-600 cursor-pointer">2022</li>
                    <li className="px-3 py-2 hover:bg-gray-600 cursor-pointer">2023</li>
                    <li className="px-3 py-2 hover:bg-gray-600 cursor-pointer">2024</li>
                  </ul>
                )}
              </div>
            </div>

            <table className="w-full text-white">
              <thead>
                <tr>
                  <th className="text-left py-2">#</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, date: "Nov 12", time: "1 hr 10 min" },
                  { id: 2, date: "Nov 15", time: "2 hr 10 min" },
                  { id: 3, date: "Nov 19", time: "2 hr 50 min" },
                  { id: 4, date: "Nov 25", time: "1 hr 40 min" },
                  { id: 5, date: "Nov 28", time: "1 hr 10 min" },
                  { id: 6, date: "Dec 12", time: "40 min 14 sec" },
                  { id: 7, date: "Dec 25", time: "1 hr 1 min" },
                ].map((row) => (
                  <tr key={row.id} className="border-b border-gray-600">
                    <td className="py-2">{row.id}</td>
                    <td className="py-2">{row.date}</td>
                    <td className="py-2">
                      <div className="bg-blue-500 text-white text-center px-2 py-1 rounded">
                        {row.time}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col flex-grow space-y-4">
            <div className="flex-grow bg-[#1f1f1f] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-4">Status</h2>
              <div className="h-full flex items-center justify-center">
                <div className="w-full h-32 bg-gray-800 rounded flex items-end justify-around p-2">
                  <div className="bg-red-500 w-8 h-24"></div>
                  <div className="bg-green-500 w-8 h-16"></div>
                  <div className="bg-blue-500 w-8 h-20"></div>
                  <div className="bg-yellow-500 w-8 h-12"></div>
                </div>
              </div>
            </div>

            <div className="flex-grow bg-[#1f1f1f] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-4">Total Calls</h2>
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center relative">
                  <div className="w-20 h-20 bg-[#1f1f1f] rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">56</span>
                  </div>
                </div>
                <div className="text-white flex justify-between w-full px-4">
                  <span>Answered</span>
                  <span>Not Answered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
