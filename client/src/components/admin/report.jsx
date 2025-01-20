import Sidebar from "../../utils/sidebar";
import { useState,useEffect } from "react";
const Report = () => {
  const [rows,setrows]=useState([]);
  useEffect(()=>{
    const array=Array(20).fill(null);
    setrows(array);
  },[])
  return (
    <>
      <div className="flex h-screen">
        <div className="lg:w-[250px] w-0">
          <Sidebar />
        </div>

        <div className="flex-grow p-6 overflow-auto">
          <div className="p-2 relative w-full max-w-md mb-8">
            <i className="fa fa-search text-2xl text-white absolute left-4 top-1/2 transform -translate-y-1/2"></i>
            <input
              className="p-3 pl-12 rounded-xl bg-gray-700 text-white w-full"
              placeholder="Search here..."
            />
          </div>

          <div className="text-white text-2xl ml-3 mb-4">Caller's List</div>

          <div className="overflow-auto max-h-[570px] scrollbar-none">
            <table className="table-auto text-white w-full text-left mt-5">
              <thead className="sticky top-0 bg-custom-gray">
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Insights</th>
                  <th className="py-2 px-4">Calls</th>
                  <th className="py-2 px-4">Caller Type</th>
                  <th className="py-2 px-4">View Data</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((_, index) => (
                  <tr key={index} className="border-b border-gray-600">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">James</td>
                    <td className="py-2 px-4">
                      <div className="w-2/3 bg-gray-500 h-2">
                        <div className="bg-blue-600 h-full w-[46%]"></div>
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="pt-1 pb-1 pl-3 pr-3 border-2 border-amber-500 bg-neutral-800 text-amber-500 shadow-md w-max rounded text-center">
                        46%
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="pt-1 pb-1 pl-4 pr-4 border-2 border-red-500 bg-neutral-800 text-red-500 shadow-md w-max rounded text-center">
                        Hard
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="pt-1 pb-1 pl-4 pr-4 border-2 border-blue-500 bg-neutral-800 text-blue-500 shadow-md w-max rounded text-center cursor-pointer hover:bg-red-700">
                        View
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
