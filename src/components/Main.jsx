import React from 'react'
const Main = () => {
  return (
    <div className="flex justify-center m-[15px]">
       <div className='m-2 h-[600px] w-[300px] border-b-black bg-blue-300 border-3 rounded-2xl '>
           <div className='flex justify-center'> <video src="./src/assets/Animation.webm" autoPlay loop muted playsInline className="h-50 w-auto"></video></div>
           <div className="flex items-center p-2 space-x-2 w-full max-w-md mx-auto mt-4">
      <input
    type="text"
    placeholder="Enter your task..."
    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    type="submit"
    className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
  >
    +
  </button>
      </div>
      <div className="flex items-center justify-between bg-white shadow-md p-2 mx-10 rounded-md w-full max-w-auto mx-auto mt-4">
  {/* Left: Checkbox and text */}
  <div className="flex items-center space-x-3">
    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
    <span className="text-lg text-gray-800">Sample Task</span>
  </div>

  {/* Right: Edit and Delete buttons */}
  <div className="flex items-center space-x-2">
    <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer">
      ✏️ 
    </button>
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer">
      🗑️
    </button>
  </div>
</div>

      </div>
     
    </div>
  )
}

export default Main
