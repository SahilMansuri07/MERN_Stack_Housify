import React from "react";

const propertyTypes = [
  "Apartment",
  "Villa",
  "Plot",
  "Independent House",
  "Duplex",
  "Penthouse",
];
const featuresList = [
  "Garden",
  "Swimming Pool",
  "Garage",
  "Balcony",
  "Air Conditioning",
  "Gym",
  "Security",
  "Parking",
];

function HouseSpecificationsForm({ specs, setSpecs, onBack, onNext }) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onNext();
      }}
    >
      <h2 className="text-xl font-bold text-[#1e293b] mb-6">House Specifications</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-5">
        {/* Bedrooms */}
        <div className="flex-1">
          <label className="block font-medium text-[#1e293b] mb-1">Bedrooms<span className="text-blue-600">*</span></label>
          <select
            required
            value={specs.bedrooms}
            onChange={e => setSpecs(prev => ({ ...prev, bedrooms: e.target.value }))}
            className="w-full p-2 border border-[#e8eaf6] rounded text-sm"
          >
            <option value="">Select</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <option value={n} key={n}>{n}</option>
            ))}
          </select>
        </div>
        {/* Bathrooms */}
        <div className="flex-1">
          <label className="block font-medium text-[#1e293b] mb-1">Bathrooms<span className="text-blue-600">*</span></label>
          <select
            required
            value={specs.bathrooms}
            onChange={e => setSpecs(prev => ({ ...prev, bathrooms: e.target.value }))}
            className="w-full p-2 border border-[#e8eaf6] rounded text-sm"
          >
            <option value="">Select</option>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <option value={n} key={n}>{n}</option>
            ))}
          </select>
        </div>
        {/* Square Footage */}
        <div className="flex-1">
          <label className="block font-medium text-[#1e293b] mb-1">Square Footage<span className="text-blue-600">*</span></label>
          <input
            type="number"
            placeholder="e.g., 1500"
            required
            value={specs.sqft}
            onChange={e => setSpecs(prev => ({ ...prev, sqft: e.target.value }))}
            className="w-full p-2 border border-[#e8eaf6] rounded text-sm"
          />
        </div>
      </div>
      {/* Property Type & Year Built */}
      <div className="flex flex-col md:flex-row gap-4 mb-5">
        <div className="flex-1">
          <label className="block font-medium text-[#1e293b] mb-1">Property Type<span className="text-blue-600">*</span></label>
          <select
            required
            value={specs.propertyType}
            onChange={e => setSpecs(prev => ({ ...prev, propertyType: e.target.value }))}
            className="w-full p-2 border border-[#e8eaf6] rounded text-sm"
          >
            <option value="">Select</option>
            {propertyTypes.map(type => (
              <option value={type} key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block font-medium text-[#1e293b] mb-1">Year Built</label>
          <input
            type="number"
            placeholder="e.g., 2010"
            value={specs.yearBuilt}
            onChange={e => setSpecs(prev => ({ ...prev, yearBuilt: e.target.value }))}
            className="w-full p-2 border border-[#e8eaf6] rounded text-sm"
          />
        </div>
      </div>
      {/* Additional Features */}
      <div className="mb-7">
        <label className="block font-medium text-[#1e293b] mb-2">Additional Features</label>
        <div className="flex flex-wrap gap-2">
          {featuresList.map(f => (
            <button
              type="button"
              key={f}
              onClick={() => {
                setSpecs(prev => ({
                  ...prev,
                  features: prev.features.includes(f)
                    ? prev.features.filter(feat => feat !== f)
                    : [...prev.features, f],
                }));
              }}
              className={
                "px-3 py-1 rounded border text-sm " +
                (specs.features.includes(f)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-[#e8eaf6] text-[#1e293b] hover:bg-blue-50")
              }
            >
              {f}
            </button>
          ))}
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
          Continue to Images
        </button>
      </div>
    </form>
  );
}

export default HouseSpecificationsForm;