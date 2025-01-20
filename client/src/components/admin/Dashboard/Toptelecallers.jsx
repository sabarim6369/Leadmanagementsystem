import React from 'react'

const Toptelecallers = () => {
  return (
    <div className="w-full lg:w-[70%] bg-gray-700 rounded-2xl p-4">
            <h1 className="text-white font-bold text-xl mb-4">Top telecallers</h1>
            <div className="overflow-x-auto">
              <div className="overflow-y-auto max-h-64 scrollbar-none">
                <table className="table-auto w-full text-left text-white">
      <thead className='sticky top-0 bg-gray-700'>
        <tr className="border-b border-gray-600">
          <th className="py-3 px-4">#</th>
          <th className="py-3 px-4">Name</th>
          <th className="py-3 px-4">Insights</th>
          <th className="py-3 px-4 text-center">Calls</th>
        </tr>
      </thead>
      <tbody>
  <tr className="border-b border-gray-600">
    <td className="py-3 px-4">01</td>
    <td className="py-3 px-4">James</td>
    <td className="py-3 px-4"><div className="h-2 bg-white rounded"><div className="bg-blue-700 h-full w-[60%]"></div></div></td>
    <td className="py-3 px-4 text-center">
      <span className="text-black rounded px-2 py-1 border-2 border-red-500 bg-neutral-800 text-red-500 shadow-md w-max rounded text-center">46%</span>
    </td>
  </tr>
  <tr className="border-b border-gray-600">
    <td className="py-3 px-4">01</td>
    <td className="py-3 px-4">James</td>
    <td className="py-3 px-4"><div className="h-2 bg-white rounded"><div className="bg-blue-700 h-full w-[50%]"></div></div></td>
    
    <td className="py-2 px-4 text-center">
      <span className="px-2 py-1 border-2 border-amber-500 bg-neutral-800 text-amber-500 shadow-md w-max rounded text-center">46%</span>
    </td>
  </tr>
  <tr className="border-b border-gray-600">
    <td className="py-3 px-4">02</td>
    <td className="py-3 px-4">Emma</td>
    <td className="py-3 px-4"><div className="h-2 bg-white rounded"><div className="bg-blue-700 h-full w-[40%]"></div></div></td>
    <td className="py-3 px-4 text-center">
      <span className="border-2 border-blue-700 bg-neutral-800 text-blue-700 shadow-md w-max text-center rounded px-2 py-1">50%</span>
    </td>
  </tr>
  <tr className="border-b border-gray-600">
    <td className="py-4 px-4">02</td>
    <td className="py-4 px-4">Emma</td>
    <td className="py-4 px-4"><div className="h-2 bg-white rounded"><div className="bg-blue-700 h-full w-[30%]"></div></div></td>
    <td className="py-4 px-4 text-center">
      <span className="border-2 border-pink-500 bg-neutral-800 text-pink-500 shadow-md w-max rounded px-2 py-1">50%</span>
    </td>
  </tr>
  <tr className="border-b border-gray-600">
    <td className="py-3 px-4">01</td>
    <td className="py-3 px-4">James</td>
    <td className="py-3 px-4"><div className="h-2 bg-white rounded"><div className="bg-blue-700 h-full w-[60%]"></div></div></td>
    <td className="py-3 px-4 text-center">
      <span className="text-black rounded px-2 py-1 border-2 border-red-500 bg-neutral-800 text-red-500 shadow-md w-max rounded text-center">46%</span>
    </td>
  </tr>
  <tr className="border-b border-gray-600">
    <td className="py-3 px-4">01</td>
    <td className="py-3 px-4">James</td>
    <td className="py-3 px-4"><div className="h-2 bg-white rounded"><div className="bg-blue-700 h-full w-[50%]"></div></div></td>
    
    <td className="py-2 px-4 text-center">
      <span className="px-2 py-1 border-2 border-amber-500 bg-neutral-800 text-amber-500 shadow-md w-max rounded text-center">46%</span>
    </td>
  </tr>
  <tr className="border-b border-gray-600">
    <td className="py-3 px-4">02</td>
    <td className="py-3 px-4">Emma</td>
    <td className="py-3 px-4"><div className="h-2 bg-white rounded"><div className="bg-blue-700 h-full w-[40%]"></div></div></td>
    <td className="py-3 px-4 text-center">
      <span className="border-2 border-blue-700 bg-neutral-800 text-blue-700 shadow-md w-max text-center rounded px-2 py-1">50%</span>
    </td>
  </tr>
  <tr className="border-b border-gray-600">
    <td className="py-3 px-4">02</td>
    <td className="py-3 px-4">Emma</td>
    <td className="py-3 px-4"><div className="h-2 bg-white rounded"><div className="bg-blue-700 h-full w-[30%]"></div></div></td>
    <td className="py-3 px-4 text-center">
      <span className="border-2 border-pink-500 bg-neutral-800 text-pink-500 shadow-md w-max rounded px-2 py-1">50%</span>
    </td>
  </tr>
  
</tbody>

    </table>
              </div>
            </div>
          </div>
  )
}

export default Toptelecallers