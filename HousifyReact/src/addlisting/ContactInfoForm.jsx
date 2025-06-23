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