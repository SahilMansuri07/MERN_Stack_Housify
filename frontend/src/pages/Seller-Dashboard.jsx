import { FaPlus, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function SellerDashboard(form) {
  console.log(form)
  return (
    <div className="bg-[#f5f9ff] min-h-screen py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#1e293b]">My Listings</h1>
          <p className="text-gray-500 mt-1">Manage your property listings</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Link to={'/add-props'}><button  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md inline-flex items-center shadow">
            <FaPlus className="mr-2" />
            Add New Listing
          </button>
            </Link>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option>All Listings</option>
              <option>Active</option>
              <option>Sold</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>

        {/* Empty Listings Box */}
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="text-4xl text-blue-600 mb-4">
            <FaHome />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">No Listings Yet</h2>
          <p className="text-gray-500 mt-2 mb-6">
            You haven’t added any property listings yet.
          </p>
          <Link to={'/add-props'}><button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold">
            Add Your First Listing
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
