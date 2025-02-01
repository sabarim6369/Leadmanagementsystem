  import React from 'react'
  import Sidebar from '../../../utils/sidebar'
  import Toolmodal from './popup/toolmodal'
  import Addpopup from './popup/addpopup'
  import { useState, useEffect } from 'react'
  import decodeToken from '../../../utils/jwtdecode'
  import axios from 'axios'
  import HashLoader from "react-spinners/HashLoader";
  import * as XLSX from "xlsx";
import ImportPopup from './popup/importpopup'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
  const Leads = () => {
    const [opentools, setopentools] = useState(false);
    const [popup, setispopupopen] = useState(false);
    const[loading1,setloading1]=useState(false);
    const [adminid, setadminid] = useState("");
    const [telecallerdata, settelecallerdata] = useState([]);
    const [selectedtelecaller, setselectedtelecaller] = useState(null);
    const options = ["Option 1", "Option 2", "Option 3"];
    const [type, settype] = useState("");
    const [importPopup, setImportPopup] = useState(false); 
    const[importedleaddata,setimportedleaddata]=useState([]);
    const[databasename,setdatabasename]=useState("");

    useEffect(() => {
      const fetchalltelecallers = async () => {
        setloading1(true);
        const token = localStorage.getItem("token");
        const tokenvalidation = decodeToken(token);
        const adminId = tokenvalidation.adminId;
        setadminid(adminId)
        
        const databaseName = tokenvalidation.databaseName;
        setdatabasename(databaseName)
        const response = await axios.get("http://localhost:8000/api/admin/getallleads ", { headers: { "database": databaseName } })
        console.log(response.data.allleads)
        setloading1(false);
        settelecallerdata(response.data.allleads)
      }
      fetchalltelecallers()
    }, [])

    const openmodel = () => {
      setopentools(!opentools);
    };

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
    const openImportPopup = () => {
      setopentools(false);
      setImportPopup(true);
    };
    const openassignleads = async () => {
      try {
          const response = await axios.put(
              "http://localhost:8000/api/admin/assignallleads", 
              {}, 
              { headers: { "database": databasename } }
          );
  
          toast.success(response.data.message || "Leads assigned successfully.");
          console.log(response);
      } catch (error) {
          toast.error(error.response?.data?.message || "Failed to assign leads.");
          console.error("Error:", error);
      }
  };
    const closeImportPopup = () => {
      setImportPopup(false);
    };
    const handleFileImport = async (allImportedData) => {
      console.log("Imported Leads:", allImportedData);
      try {
          const response = await axios.post(
              "http://localhost:8000/api/admin/addleads",
              { leadsData: allImportedData },
              {
                  headers: {
                      "database": databasename
                  }
              }
          );
  
          if (response.status === 201) {
              toast.success("Leads uploaded successfully!");
              closeImportPopup()
          } else {
              toast.error("Unexpected response from server.");
          }
  
      } catch (err) {
          console.error("Error uploading leads:", err);
  
          if (err.response) {
              toast.error(`Error: ${err.response.data.message || "Please try again."}`);
          } else if (err.request) {
              toast.error("Network error: No response received from the server.");
          } else {
              toast.error("Error uploading leads. Please try again.");
          }
      }
  
      setimportedleaddata((prevData) => [...prevData, ...allImportedData]);
  };
  
  
    
    
    

    if (loading1) {
      return (
        <div className="flex h-screen bg-gray-900">
          <div className="lg:w-[250px] w-0">
            <Sidebar />
          </div>
          <div className="flex-grow flex justify-center items-center">
            <HashLoader color="#36d7b7" size={100} />
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex h-screen bg-gray-900">
        <div className="lg:w-[250px] w-0">
          <Sidebar />
        </div>
        <div className="flex-grow p-4 md:p-6 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl text-white">Leads</h1>
            <div
              className="hidden sm:block text-white ml-auto mr-3 cursor-pointer"
              onClick={openmodel}
            >
              <i className="fa fa-bars"></i>
            </div>
            <div
              className="lg:hidden text-white ml-auto mr-3 cursor-pointer"
              onClick={openmodel}
            >
              <i className="fa fa-bars"></i>
            </div>
            <div className="">
              <Toolmodal
                opentools={opentools}
                add={add}
                openImportPopup={openImportPopup}
                openassignleads={openassignleads}
              />
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
                    {telecaller.status}
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
                    <p>+{telecaller.mobilenumber}</p>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <i className="fa fa-envelope text-blue-400 text-lg mr-2"></i>
                    <p>{telecaller.assignedTo?.email}</p>
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
                    <strong>Address:</strong>{" "}
                    {selectedtelecaller.address || "No address available"}
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

          <ImportPopup
            isOpen={importPopup}
            closePopup={closeImportPopup}
            handleFileImport={handleFileImport}
          />

          <Addpopup
            popup={popup}
            setispopupopen={setispopupopen}
            type={"Telecaller"}
            adminid={adminid}
          />
        </div>
        <ToastContainer position="top-center" />
      </div>
    );
  }

  export default Leads;
