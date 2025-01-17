import React from 'react';
import Sidebar from '../../utils/sidebar';
const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="lg:w-[250px] w-0">
        <Sidebar />
      </div>

      <div className="flex-grow  p-6 overflow-auto">

      <div className="p-2 relative w-[500px]">
  <i className="fa fa-search text-2xl text-white absolute left-4 top-1/2 transform -translate-y-1/2"></i>
  <input
    className="p-2 pl-12 rounded-xl bg-gray-700 text-white w-full"
    placeholder="Search here..."
  />
</div>
<div className="w-full bg-gray-700 pt-5 mt-5 rounded-2xl pl-8 pb-5 pr-5">
<h3 className="text-white text-xl font-bold inline">Today's Calls</h3>
<h4 className='text-white mt-2 inlin'>Call summary</h4>
<div className="flex justify-between">
  <div className="mt-5 rounded-2xl w-[23%] h-52 bg-black"></div>
  <div className="mt-5 rounded-2xl w-[23%] h-52 bg-black"></div>
  <div className="mt-5 rounded-2xl w-[23%] h-52 bg-black"></div>
  <div className="mt-5 rounded-2xl w-[23%] h-52 bg-black"></div>
</div>
</div>
<div className="flex flex-row  w-full mt-4 gap-x-4">
  <div className="w-[70%]  bg-gray-700 rounded-2xl p-4">
    <h1 className="text-white font-bold text-xl mb-4">Top telecallers</h1>
    <div className='overflow-y-auto max-h-64 scrollbar-none'>
    <table className="table-auto w-full text-left text-white">
      <thead className='sticky top-0 bg-gray-700'>
        <tr className="border-b border-gray-600">
          <th className="py-2 px-4">#</th>
          <th className="py-2 px-4">Name</th>
          <th className="py-2 px-4">Insights</th>
          <th className="py-2 px-4 text-center">Calls</th>
        </tr>
      </thead>
      <tbody>
  <tr className="border-b border-gray-600">
    <td className="py-2 px-4">01</td>
    <td className="py-2 px-4">James</td>
    <td className="py-2 px-4"><div className="h-2 bg-white rounded"><div className="bg-blue-700 h-full w-[60%]"></div></div></td>
    <td className="py-2 px-4 text-center">
      <span className="bg-blue-200 text-black rounded px-2 py-1 ">46%</span>
    </td>
  </tr>
  <tr className="border-b border-gray-600">
    <td className="py-2 px-4">01</td>
    <td className="py-2 px-4">James</td>
    <td className="py-2 px-4"><div className="h-2 bg-white rounded"><div className="bg-blue-700 h-full w-[50%]"></div></div></td>
    
    <td className="py-2 px-4 text-center">
      <span className="bg-blue-200 text-black rounded px-2 py-1">46%</span>
    </td>
  </tr>
  <tr className="border-b border-gray-600">
    <td className="py-2 px-4">02</td>
    <td className="py-2 px-4">Emma</td>
    <td className="py-2 px-4"><div className="h-2 bg-white rounded"><div className="bg-blue-700 h-full w-[40%]"></div></div></td>
    <td className="py-2 px-4 text-center">
      <span className="bg-blue-200 text-black rounded px-2 py-1">50%</span>
    </td>
  </tr>
  <tr className="border-b border-gray-600">
    <td className="py-2 px-4">02</td>
    <td className="py-2 px-4">Emma</td>
    <td className="py-2 px-4"><div className="h-2 bg-white rounded"><div className="bg-blue-700 h-full w-[30%]"></div></div></td>
    <td className="py-2 px-4 text-center">
      <span className="bg-blue-200 text-black rounded px-2 py-1">50%</span>
    </td>
  </tr>
  <tr className="border-b border-gray-600">
    <td className="py-2 px-4">02</td>
    <td className="py-2 px-4">Emma</td>
    <td className="py-2 px-4"><div className="h-2 bg-white rounded"><div className="bg-blue-700 h-full w-[20%]"></div></div></td>
    <td className="py-2 px-4 text-center">
      <span className="bg-blue-200 text-black rounded px-2 py-1">50%</span>
    </td>
  </tr>
  <tr className="border-b border-gray-600">
    <td className="py-2 px-4">03</td>
    <td className="py-2 px-4">Liam</td>
    <td className="py-2 px-4"><div className="h-2 bg-white rounded"><div className="bg-blue-700 h-full w-[10%]"></div></div></td>
    <td className="py-2 px-4 text-center">
      <span className="bg-blue-200 text-black rounded px-2 py-1">30%</span>
    </td>
  </tr>
</tbody>

    </table>
    </div>
  </div>

  <div className="flex-grow bg-gray-700 rounded-2xl ">
    <div><h1 className="text-white text-xl font-bold m-2">Fulfilment</h1></div>
  </div>
</div>
<div className="flex h-[50%] w-full gap-x-4 mt-4">
  <div className='w-[30%] h-full bg-gray-700 rounded-2xl'>
    <h1 className="text-white text-xl font-bold m-2">Lead Status</h1>
  </div>
  <div className='flex-wrap w-full h-full bg-gray-700 rounded-2xl'>
    <h1 className="text-white font-bold text-xl m-2">Call Insights</h1>
  </div>
</div>

      </div>
    </div>
  );
};

export default Dashboard;
