import React from "react";

function PreviewSubmitForm({ details, specs, images, onBack }) {
  // Placeholder, add your preview & submit logic as needed
  return (
    <div>
      <h2 className="text-xl font-bold text-[#1e293b] mb-6">Preview & Submit</h2>
      {/* You can add your preview & submit logic here. For now just dummy. */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-[#e8eaf6] rounded font-semibold text-[#1e293b] hover:bg-gray-100 bg-white"
        >
          Back
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold shadow transition"
        >
          Submit Listing
        </button>
      </div>
    </div>
  );
}

export default PreviewSubmitForm;