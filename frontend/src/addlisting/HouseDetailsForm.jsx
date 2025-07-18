import { useState } from "react";

function HouseDetailsForm({ form, setForm, onNext }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
    console.log("House Details Submitted:", form);
  };

 const handleChange = (e) => {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
};
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-[#1e293b] mb-6">House Details</h2>
      {/* Listing Title */}
      <div className="mb-5">
        <label htmlFor="title" className="block font-medium text-[#1e293b] mb-1">
          Listing Title<span className="text-blue-600">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="e.g., Luxury 3BHK Apartment in Mumbai"
          required
          value={form.title}
          onChange={handleChange }
          className="w-full p-2 border border-[#e8eaf6] rounded focus:ring-2 focus:ring-blue-200 text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          Create a catchy title that highlights key features of your property
        </p>
      </div>
      {/* Description */}
      <div className="mb-5">
        <label htmlFor="description" className="block font-medium text-[#1e293b] mb-1">
          Description<span className="text-blue-600">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Provide a detailed description of your property..."
          required
          rows={4}
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border border-[#e8eaf6] rounded focus:ring-2 focus:ring-blue-200 text-sm resize-none"
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">
          Include details about the property, neighborhood, and special features
        </p>
      </div>
      {/* Price and Currency */}
      <div className="flex flex-col sm:flex-row gap-4 mb-5">
        <div className="flex-1">
          <label htmlFor="price" className="block font-medium text-[#1e293b] mb-1">
            Price (<span className="text-blue-600">₹</span>)<span className="text-blue-600">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="e.g., 5000000"
            required
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border border-[#e8eaf6] rounded focus:ring-2 focus:ring-blue-200 text-sm"
          />
        </div>
    
      </div>
      {/* Address */}
      <div className="mb-5">
        <label htmlFor="address" className="block font-medium text-[#1e293b] mb-1">
          Address<span className="text-blue-600">*</span>
        </label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Street address"
          required
          value={form.address}
            onChange={handleChange}
          className="w-full p-2 border border-[#e8eaf6] rounded focus:ring-2 focus:ring-blue-200 text-sm"
        />
      </div>
      {/* City, State, Zip */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="city" className="block font-medium text-[#1e293b] mb-1">
            City<span className="text-blue-600">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="e.g., Mumbai"
            required
            value={form.city}
            onChange={handleChange}
            className="w-full p-2 border border-[#e8eaf6] rounded focus:ring-2 focus:ring-blue-200 text-sm"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="state" className="block font-medium text-[#1e293b] mb-1">
            State<span className="text-blue-600">*</span>
          </label>
          <input
            type="text"
            id="state"
            name="state"
            placeholder="e.g., Maharashtra"
            required
            value={form.state}
            onChange={handleChange}
            className="w-full p-2 border border-[#e8eaf6] rounded focus:ring-2 focus:ring-blue-200 text-sm"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="zip" className="block font-medium text-[#1e293b] mb-1">
            PIN Code<span className="text-blue-600">*</span>
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            placeholder="e.g., 400001"
            required
            value={form.zip}
            onChange={handleChange}
            className="w-full p-2 border border-[#e8eaf6] rounded focus:ring-2 focus:ring-blue-200 text-sm"
          />
        </div>
      </div>
      <hr className="my-6" />
      <div className="flex justify-end">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold shadow transition"
        >
          Continue to Specifications
        </button>
      </div>
    </form>
  
  );
}

export default HouseDetailsForm;