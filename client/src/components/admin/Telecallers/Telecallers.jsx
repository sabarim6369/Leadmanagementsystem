import React from 'react'
import Sidebar from '../../../utils/sidebar'
import Toolmodal from '../Dashboard/popups/Toolmodal'
import Addpopup from '../Dashboard/popups/addpopup'
import { useState, useEffect } from 'react'
import decodeToken from '../../../utils/jwtdecode'
import axios from 'axios'

const Telecallers = () => {
  const [opentools, setopentools] = useState(false);
  const [popup, setispopupopen] = useState(false);
  const [telecallerdata, settelecallerdata] = useState([]);
  const [selectedtelecaller, setselectedtelecaller] = useState(null);
  const options = ["Option 1", "Option 2", "Option 3"];

  useEffect(() => {
    const fetchalltelecallers = async () => {
      const token = localStorage.getItem("token");

      const tokenvalidation = decodeToken(token);
      const adminId = tokenvalidation.adminId;
      const databaseName = tokenvalidation.databaseName;

      const response = await axios.get("http://localhost:8000/api/admin/getalltelecaller", { headers: { "database": databaseName } })
      console.log(response.data.alltelecallers)
      settelecallerdata(response.data.alltelecallers)
    }
    fetchalltelecallers()
  }, [])

  const openmodel = () => {
    setopentools(!opentools);
  };
      const [type, settype] = useState("");

  const add = async (data) => {
    console.log(data);
    setopentools(!opentools)
    if (data === "admin") {
      setispopupopen(true);
      settype("admin");
    } else {
      setispopupopen(true);
      settype("telecaller");
    }
  };

  const viewmore = (telecaller) => {
    setselectedtelecaller(telecaller);
  };

  const closeModal = () => {
    setselectedtelecaller(null);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="lg:w-[250px] w-0">
        <Sidebar />
      </div>
      <div className="flex-grow p-4 md:p-6 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl text-white">Telecallers</h1>
          <button
            className="hidden sm:block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg ml-auto"
            onClick={() => setispopupopen(true)}
          >
            Add Telecallers
          </button>
          <div
            className="lg:hidden text-white ml-auto mr-3 cursor-pointer"
            onClick={openmodel}
          >
            <i className="fa fa-bars"></i>
          </div>
          <div className="">
            <Toolmodal opentools={opentools} add={add} />
          </div>
        </div>

        <div className="flex mb-6">
          <div className="p-2 relative w-full max-w-[300px] md:max-w-[500px] md:ml-0">
            <i className="fa fa-search text-2xl text-white absolute left-4 top-1/2 transform -translate-y-1/2"></i>
            <input
              className="p-2 pl-12 rounded-xl bg-gray-700 text-white w-full"
              placeholder="Search here..."
            />
          </div>
          <div className="status flex items-center">
            <div className="p-2 ml-3 bg-blue-500 rounded-2xl">
              <select
                name=""
                id=""
                className="bg-transparent text-black outline-none"
              >
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {telecallerdata.map((telecaller, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">
                  {telecaller.username}
                </h2>
                <div className="px-2 py-1 bg-green-500 text-sm text-white rounded-lg">
                  {telecaller.status === "active" ? "Active" : "Inactive"}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300">
                  <i className="fa fa-map-marker-alt text-blue-400 text-lg mr-2"></i>
                  <p className="truncate max-w-[250px]">
                    {telecaller.address
                      ? telecaller.address
                      : "No address available"}
                  </p>
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fa fa-phone-alt text-blue-400 text-lg mr-2"></i>
                  <p>+{telecaller.number}</p>
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fa fa-envelope text-blue-400 text-lg mr-2"></i>
                  <p>{telecaller.email}</p>
                </div>
              </div>

              <button
                className="mt-auto py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={() => {
                  viewmore(telecaller);
                }}
              >
                View More
              </button>
            </div>
          ))}
        </div>

        {selectedtelecaller && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-2xl w-[60%] max-w-3xl shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        {selectedtelecaller.username}
      </h2>
      <div className="space-y-4">
        <p className="text-lg text-gray-600">
          <strong>Email:</strong> {selectedtelecaller.email}
        </p>
        <p className="text-lg text-gray-600">
          <strong>Phone:</strong> +{selectedtelecaller.number}
        </p>
        <p className="text-lg text-gray-600">
          <strong>Address:</strong> {selectedtelecaller.address || "No address available"}
        </p>
        <p className="text-lg text-gray-600">
          <strong>Status:</strong> {selectedtelecaller.status}
        </p>
        <p className="text-lg text-gray-600">
          <strong>Role:</strong> {selectedtelecaller.role}
        </p>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={closeModal}
          className="py-2 px-6 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


        <Addpopup
          popup={popup}
          setispopupopen={setispopupopen}
          type={"Telecaller"}
        />
      </div>
    </div>
  );
}

export default Telecallers;
