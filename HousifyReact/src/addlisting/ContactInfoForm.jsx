import React from "react";

function ContactInfoForm({ onBack, onNext }) {
  // Placeholder, add your contact fields as needed
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onNext();
      }}
    >
      <h2 className="text-xl font-bold text-[#1e293b] mb-6">Contact Info</h2>
      {/* Add your contact fields here */}
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
  <div className="flex flex-col w-full">
    {/* Name */}
    <label className="text-lg font-semibold text-gray-700 mb-1" htmlFor="name">
      Name
    </label>
    <input
      id="name"
      type="text"
      className="w-full border border-gray-300 rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your name"
    />

    {/* Email */}
    <label className="text-lg font-semibold text-gray-700 mb-1" htmlFor="email">
      Email
    </label>
    <input
      id="email"
      type="email"
      className="w-full border border-gray-300 rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your email"
    />

    {/* Contact Number */}
    <label className="text-lg font-semibold text-gray-700 mb-1" htmlFor="phone">
      Contact Number
    </label>
    <input
      id="phone"
      type="tel"
      className="w-full border border-gray-300 rounded-3xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter contact number"
    />
  </div>
</div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-[#e8eaf6] rounded font-semibold text-[#1e293b] hover:bg-gray-100 bg-white"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold shadow transition"
        >
          Continue to Preview & Submit
        </button>
      </div>
    </form>
  );
}

export default ContactInfoForm;