import React from 'react'

const Addpopup = ({ popup, setispopupopen, type }) => {
  return (
    popup && (
      <div className="fixed inset-0 flex items-center justify-center z-1001">
        <div className="absolute inset-0 bg-black opacity-50 z-1000"></div>

        <div className="absolute md:w-[30%] h-[60%] bg-[#efeff3] z-1001 rounded-lg overflow-hidden">
          <div className="flex justify-end p-4">
            <i
              className="fa fa-times text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
              onClick={() => setispopupopen(false)}
            ></i>
          </div>
          <div className="add-users-model p-6 space-y-6">
            <h1 className="text-center mb-4 text-2xl font-semibold text-black">
              Add {type}
            </h1>

            <div className="flex flex-col items-center space-y-4">
              <input
                type="text"
                className="p-3 w-[90%] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Name"
              />
              <input
                type="text"
                className="p-3 w-[90%] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
              <input
                type="password"
                className="p-3 w-[90%] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
              />

              <button className="w-[90%] rounded-lg border border-gray-300 p-3 border-2 border-green-300 hover:border-black hover:border-2 hover:bg-red-400">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Addpopup