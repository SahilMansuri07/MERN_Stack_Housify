import React, { useState} from "react";
import { useAuth } from "../context/AuthContext"; // adjust the path if needed
import { useNavigate } from "react-router-dom";

function PreviewSubmitForm({ form, onBack }) {
  const { auth } = useAuth(); // 👈 get token from context
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {


    setMessage("");
    setError("");

    if (!auth.token) {
      setError("⚠️ You must be logged in to submit a listing.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`, // 🔐 using context token
        },
        body: JSON.stringify({
          ...form,
          images: form.images.map((img) =>
            typeof img === "string" ? img : img.url
          ),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("✅ Listing submitted successfully!");
        setError("");
        console.log("Submitted:", result);
        navigate("/")
      } else {
        const errData = await response.json();
        setError(errData.message || "❌ Failed to submit listing.");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Something went wrong while submitting the listing.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1e293b] mb-6">
        Preview & Submit
      </h2>

      {/* Messages */}
      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}
      {error && <p className="mb-4 text-red-600 font-medium">{error}</p>}

      {/* House Details */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h3 className="text-lg font-semibold text-blue-700 mb-4">
          🏡 House Details
        </h3>
        <p>
          <strong className="text-gray-700">Title:</strong> {form.title}
        </p>
        <p>
          <strong className="text-gray-700">Description:</strong>{" "}
          {form.description}
        </p>
        <p>
          <strong className="text-gray-700">Price:</strong> ₹{form.price}
        </p>
        <p>
          <strong className="text-gray-700">Address:</strong> {form.address},{" "}
          {form.city}, {form.state} - {form.pinCode}
        </p>
      </div>

      {/* Specifications */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h3 className="text-lg font-semibold text-blue-700 mb-4">
          📐 Specifications
        </h3>
        <p>
          <strong className="text-gray-700">Bedrooms:</strong> {form.bedrooms}
        </p>
        <p>
          <strong className="text-gray-700">Bathrooms:</strong> {form.bathrooms}
        </p>
        <p>
          <strong className="text-gray-700">Square Footage:</strong>{" "}
          {form.squareFootage} sq ft
        </p>
        <p>
          <strong className="text-gray-700">Property Type:</strong>{" "}
          {form.propertyType}
        </p>
        <p>
          <strong className="text-gray-700">Year Built:</strong>{" "}
          {form.yearBuilt}
        </p>
        <p>
          <strong className="text-gray-700">Features:</strong>{" "}
          {form.features?.join(", ")}
        </p>
      </div>

      {/* Images */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h3 className="text-lg font-semibold text-blue-700 mb-4">
          🖼️ Uploaded Images
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {form.images?.length > 0 ? (
            form.images.map((img, idx) => (
              <img
                key={idx}
                src={typeof img === "string" ? img : img.url}
                alt={`Property ${idx}`}
                className="w-full h-24 object-cover rounded border"
              />
            ))
          ) : (
            <p className="text-sm text-gray-500 col-span-full">
              No images uploaded.
            </p>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
        <h3 className="text-lg font-semibold text-blue-700 mb-4">
          📞 Contact Info
        </h3>
        <p>
          <strong className="text-gray-700">Name:</strong> {form.contactName}
        </p>
        <p>
          <strong className="text-gray-700">Email:</strong> {form.contactEmail}
        </p>
        <p>
          <strong className="text-gray-700">Phone:</strong> {form.contactPhone}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-[#1e293b] hover:bg-gray-100"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition"
        >
          Submit Listing
        </button>
      </div>
    </div>
  );
}

export default PreviewSubmitForm;
