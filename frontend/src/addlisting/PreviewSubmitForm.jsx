import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Adjust if needed
import { useNavigate } from "react-router-dom";

function PreviewSubmitForm({ form, onBack }) {
  const { auth } = useAuth();
  const token = auth?.token;
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = "http://localhost:3000/api/listing/create";

 const handleSubmit = async () => {
  const formData = new FormData();

  Object.entries(form).forEach(([key, value]) => {
    if (key !== "images") {
      formData.append(key, value);
    }
  });

  // Only append files (skip URLs)
  form.images?.forEach((img) => {
    if (img.file) {
      formData.append("images", img.file);
    }
  });
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // DO NOT manually set 'Content-Type'!
      },
      body: formData,
    });
    console.log("Response:", res);
    console.log("Response status:", res.status);
    console.log("Response headers:", res.headers.get("Content-Type"));
    const data = await res.json();
    console.log(data)

    if (res.ok) {
      setMessage("Listing created successfully!");
      setError("");
      setTimeout(() => navigate("/"), 1000);
    } else {
      setError(data.message || "Something went wrong.");
      setMessage("");
    }
  } catch (err) {
    setError("Network error. Try again.");
    setMessage("");
    console.error("Error:", err.message);
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
      <Section title="🏡 House Details">
        <Detail label="Title" value={form.title} />
        <Detail label="Description" value={form.description} />
        <Detail label="Price" value={`₹${form.price}`} />
        <Detail
          label="Address"
          value={`${form.address}, ${form.city}, ${form.state} - ${form.pinCode}`}
        />
      </Section>

      {/* Specifications */}
      <Section title="📐 Specifications">
        <Detail label="Bedrooms" value={form.bedrooms} />
        <Detail label="Bathrooms" value={form.bathrooms} />
        <Detail label="Square Footage" value={`${form.squareFootage} sq ft`} />
        <Detail label="Property Type" value={form.propertyType} />
        <Detail label="Year Built" value={form.yearBuilt} />
        <Detail label="Features" value={form.features?.join(", ")} />
      </Section>

      {/* Images */}
      <Section title="🖼️ Uploaded Images">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {form.images?.length > 0 ? (
            form.images.map((img, idx) => {
              const imageUrl =
                typeof img === "string"
                  ? img
                  : img.url || URL.createObjectURL(img.file);
              return (
                <img
                  key={idx}
                  src={imageUrl}
                  alt={`Property ${idx}`}
                  className="w-full h-24 object-cover rounded border"
                />
              );
            })
          ) : (
            <p className="text-sm text-gray-500 col-span-full">
              No images uploaded.
            </p>
          )}
        </div>
      </Section>

      {/* Contact Info */}
      <Section title="📞 Contact Info">
        <Detail label="Name" value={form.contactName} />
        <Detail label="Email" value={form.contactEmail} />
        <Detail label="Phone" value={form.contactPhone} />
      </Section>

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

// Reusable components
const Section = ({ title, children }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
    <h3 className="text-lg font-semibold text-blue-700 mb-4">{title}</h3>
    {children}
  </div>
);

const Detail = ({ label, value }) => (
  <p>
    <strong className="text-gray-700">{label}:</strong> {value}
  </p>
);

export default PreviewSubmitForm;
