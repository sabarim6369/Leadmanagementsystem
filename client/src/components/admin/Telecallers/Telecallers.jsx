import React from 'react'
import Sidebar from '../../../utils/sidebar'
import Toolmodal from '../Dashboard/popups/Toolmodal'
import Addpopup from '../Dashboard/popups/addpopup'
import { useState } from 'react'
const Telecallers = () => {
    const [opentools, setopentools] = useState(false);
    const [popup, setispopupopen] = useState(false);
    const options = ["Option 1", "Option 2", "Option 3"];

      const [type, settype] = useState("");
      const openmodel = () => {
        setopentools(!opentools);
      };
    const add = async(data) => {
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
  return (
    <div className="flex h-screen bg-gray-900">
      <div className="lg:w-[250px] w-0">
        <Sidebar />
      </div>
      <div className="flex-grow p-4 md:p-6 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl text-white">Telecallers</h1>
          <button className="hidden sm:block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg ml-auto" onClick={()=>setispopupopen(true)}>
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
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Sabari</h2>
                <div className="px-2 py-1 bg-green-500 text-sm text-white rounded-lg">
                  Active
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300">
                  <i className="fa fa-map-marker-alt text-blue-400 text-lg mr-2"></i>
                  <p>Kinathukadavu, Coimbatore</p>
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fa fa-phone-alt text-blue-400 text-lg mr-2"></i>
                  <p>+91 98765 43210</p>
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fa fa-envelope text-blue-400 text-lg mr-2"></i>
                  <p>sabari@example.com</p>
                </div>
              </div>

              {/* Button */}
              <button className="mt-auto py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                View More
              </button>
            </div>
          ))}
        </div>
        <Addpopup
        popup={popup} setispopupopen={setispopupopen} type={"Telecaller"}
        />

      </div>
    </div>
  );
}

export default Telecallers

// // Telecallers.jsx
// import React, { useState } from "react";
// import Sidebar from "../../../utils/sidebar";
// import Toolmodal from "../Dashboard/popups/Toolmodal";
// import SearchAndFilter from "./SearchandFilter";
// import TelecallerCard from "./Telecallercard";

// const Telecallers = () => {
//   const [opentools, setopentools] = useState(false);
//   const [popup, setispopupopen] = useState(false);
//   const options = ["Option 1", "Option 2", "Option 3"];

//   const [type, settype] = useState("");
//   const openmodel = () => {
//     setopentools(!opentools);
//   };

//   const add = async (data) => {
//     console.log(data);
//     setopentools(!opentools);
//     if (data === "admin") {
//       setispopupopen(true);
//       settype("admin");
//     } else {
//       setispopupopen(true);
//       settype("telecaller");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-900">
//       <div className="lg:w-[250px] w-0">
//         <Sidebar />
//       </div>
//       <div className="flex-grow p-4 md:p-6 overflow-auto">
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-3xl text-white">Telecallers</h1>
//           <button className="hidden sm:block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg ml-auto">
//             Add Telecallers
//           </button>
//           <div
//             className="lg:hidden text-white ml-auto mr-3 cursor-pointer"
//             onClick={openmodel}
//           >
//             <i className="fa fa-bars"></i>
//           </div>
//           <Toolmodal opentools={opentools} add={add} />
//         </div>

//         <SearchAndFilter options={options} />

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {[...Array(5)].map((_, index) => (
//             <TelecallerCard
//               key={index}
//               name="Sabari"
//               location="Kinathukadavu, Coimbatore"
//               phone="+91 98765 43210"
//               email="sabari@example.com"
//               status="Active"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Telecallers;
