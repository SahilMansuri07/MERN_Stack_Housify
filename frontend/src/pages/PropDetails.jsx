import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaBath, FaBed, FaRulerCombined, FaMapMarkerAlt,
  FaCheckCircle, FaRoad
} from "react-icons/fa";

function PropDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/listing/${id}`);
        const data = await res.json();
        setProperty(data);
        console.log("Fetched property:", data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-blue-700 font-semibold">Loading property...</div>;
  }

  if (!property) {
    return <div className="p-8 text-center text-red-500 font-semibold">Property not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image Section */}
        <div>
          <img
            src={property.images?.[0] || "https://via.placeholder.com/800x600"}
            alt={property.title}
            className="w-full h-[400px] object-cover rounded-lg shadow"
          />
          <div className="grid grid-cols-3 gap-2 mt-4">
            {property.images?.slice(1).map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-full h-24 object-cover rounded"
                alt={`extra-img-${i}`}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div>
          <h1 className="text-2xl font-bold text-[#1a237e] mb-2">{property.title}</h1>
          <p className="text-gray-500 flex items-center gap-2 mb-4">
            <FaMapMarkerAlt className="text-blue-600" />
            {property.city}, {property.state}
          </p>

          <h2 className="text-xl font-semibold text-[#1a237e] mb-4">₹{property.price?.toLocaleString()}</h2>

          <div className="flex flex-wrap gap-4 mb-4 text-[#1a237e]">
            <div className="flex items-center gap-1"><FaRulerCombined /> {property.squareFootage} sq.ft</div>
            <div className="flex items-center gap-1"><FaBed /> {property.bedrooms} Beds</div>
            <div className="flex items-center gap-1"><FaBath /> {property.bathrooms} Baths</div>
            {property.road && <div className="flex items-center gap-1"><FaRoad /> {property.road}</div>}
            {property.approved && <div className="flex items-center gap-1"><FaCheckCircle className="text-green-600" /> Approved</div>}
          </div>

          <p className="text-sm text-gray-600 mb-6">{property.description || "No description available."}</p>

          <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropDetails;
