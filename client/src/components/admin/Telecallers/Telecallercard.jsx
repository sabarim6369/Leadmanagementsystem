import React from "react";
const TelecallerCard = ({ name, location, phone, email, status }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">{name}</h2>
        <div className={`px-2 py-1 text-sm text-white rounded-lg ${status === "Active" ? "bg-green-500" : "bg-red-500"}`}>
          {status}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-300">
          <i className="fa fa-map-marker-alt text-blue-400 text-lg mr-2"></i>
          <p>{location}</p>
        </div>
        <div className="flex items-center text-gray-300">
          <i className="fa fa-phone-alt text-blue-400 text-lg mr-2"></i>
          <p>{phone}</p>
        </div>
        <div className="flex items-center text-gray-300">
          <i className="fa fa-envelope text-blue-400 text-lg mr-2"></i>
          <p>{email}</p>
        </div>
      </div>

      {/* Button */}
      <button className="mt-auto py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300">
        View More
      </button>
    </div>
  );
};
export default TelecallerCard