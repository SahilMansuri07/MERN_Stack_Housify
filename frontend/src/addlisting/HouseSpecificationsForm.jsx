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

function HouseSpecificationsForm({ form, setForm, onBack, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
    console.log("House Specifications Submitted:", form);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFeature = (feature) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features?.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...(prev.features || []), feature],
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-[#1e293b] mb-6">House Specifications</h2>

      {/* Bedrooms, Bathrooms, Sqft */}
      <div className="flex flex-col md:flex-row gap-4 mb-5">
        <div className="flex-1">
          <label className="block font-medium text-[#1e293b] mb-1">
            Bedrooms<span className="text-blue-600">*</span>
          </label>
          <select
            required
            name="bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            className="w-full p-2 border border-[#e8eaf6] rounded text-sm"
          >
            <option value="">Select</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option value={n} key={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block font-medium text-[#1e293b] mb-1">
            Bathrooms<span className="text-blue-600">*</span>
          </label>
          <select
            required
            name="bathrooms"
            value={form.bathrooms}
            onChange={handleChange}
            className="w-full p-2 border border-[#e8eaf6] rounded text-sm"
          >
            <option value="">Select</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option value={n} key={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block font-medium text-[#1e293b] mb-1">
            Square Footage<span className="text-blue-600">*</span>
          </label>
          <input
            type="number"
            name="sqft"
            placeholder="e.g., 1500"
            required
            value={form.sqft}
            onChange={handleChange}
            className="w-full p-2 border border-[#e8eaf6] rounded text-sm"
          />
        </div>
      </div>

      {/* Property Type & Year Built */}
      <div className="flex flex-col md:flex-row gap-4 mb-5">
        <div className="flex-1">
          <label className="block font-medium text-[#1e293b] mb-1">
            Property Type<span className="text-blue-600">*</span>
          </label>
          <select
            required
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
            className="w-full p-2 border border-[#e8eaf6] rounded text-sm"
          >
            <option value="">Select</option>
            {propertyTypes.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block font-medium text-[#1e293b] mb-1">Year Built</label>
          <input
            type="number"
            name="yearBuilt"
            placeholder="e.g., 2010"
            value={form.yearBuilt}
            onChange={handleChange}
            className="w-full p-2 border border-[#e8eaf6] rounded text-sm"
          />
        </div>
      </div>

      {/* Features */}
      <div className="mb-7">
        <label className="block font-medium text-[#1e293b] mb-2">Additional Features</label>
        <div className="flex flex-wrap gap-2">
          {featuresList.map((feature) => (
            <button
              key={feature}
              type="button"
              onClick={() => toggleFeature(feature)}
              className={`px-3 py-1 rounded border text-sm ${
                form.features?.includes(feature)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-[#e8eaf6] text-[#1e293b] hover:bg-blue-50"
              }`}
            >
              {feature}
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
