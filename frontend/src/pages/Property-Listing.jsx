import React, { useState, useEffect } from "react";
import {
  FaHeart, FaBath, FaBed, FaRulerCombined, FaMapMarkerAlt,
  FaCheckCircle, FaRoad
} from "react-icons/fa";

const badgeColors = {
  "For Sale": "bg-blue-600",
  Premium: "bg-[#5C6BC0]",
};

const PropertyCard = ({ property }) => (
  <div className="bg-white shadow rounded-xl overflow-hidden border border-[#e8eaf6] w-[275px] mx-auto">
    <div className="relative">
      <img
        src={property.images?.[0] || "https://via.placeholder.com/800x600"}
        alt={property.title}
        className="w-full h-36 object-cover"
        draggable={false}
      />
      <span className={`absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-semibold text-white ${badgeColors[property.type] || "bg-blue-600"}`}>
        {property.type || "For Sale"}
      </span>
      <button className="absolute top-3 right-3 bg-white/90 rounded-full p-2 text-blue-600 hover:bg-blue-50 transition">
        <FaHeart className="text-lg" />
      </button>
    </div>
    <div className="p-4 pb-3">
      <h3 className="text-lg font-bold text-[#1a237e] mb-1">₹{property.price?.toLocaleString()}</h3>
      <h2 className="text-base font-semibold mb-1">{property.title}</h2>
      <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
        <FaMapMarkerAlt className="text-blue-600" /> {property.city}, {property.state}
      </p>
      <div className="flex flex-wrap gap-3 text-xs text-[#1a237e] mb-2 border-b border-[#e8eaf6] pb-2">
        <span className="flex items-center gap-1">
          <FaRulerCombined className="text-blue-600" /> {property.squareFootage} sq.ft
        </span>
        {property.bedrooms > 0 && (
          <span className="flex items-center gap-1">
            <FaBed className="text-blue-600" /> {property.bedrooms} Beds
          </span>
        )}
        {property.bathrooms > 0 && (
          <span className="flex items-center gap-1">
            <FaBath className="text-blue-600" /> {property.bathrooms} Baths
          </span>
        )}
        {property.road && (
          <span className="flex items-center gap-1">
            <FaRoad className="text-blue-600" /> {property.road}
          </span>
        )}
        {property.approved && (
          <span className="flex items-center gap-1">
            <FaCheckCircle className="text-blue-600" /> Approved
          </span>
        )}
      </div>
      <button className="w-full bg-[#2962ff] text-white py-2 rounded-lg font-semibold mt-2 shadow hover:bg-[#0039cb] transition text-sm">
        View Details
      </button>
    </div>
  </div>
);

export default function PropertyListing() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/listing/list");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProperties(data);
        } else {
          console.error("API response is not an array:", data);
          setProperties([]);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Frontend filtering
  const filtered = properties.filter((p) => {
    return (
      p.price >= priceRange[0] &&
      p.price <= priceRange[1] &&
      (!location || p.city.toLowerCase().includes(location.toLowerCase())) &&
      (!bedrooms || p.bedrooms === parseInt(bedrooms))
    );
  });

  return (
    <div className="px-2 md:px-14 lg:px-28 py-4 md:py-10 bg-[#f5f7fa] min-h-screen">
      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 h-fit">
          <h3 className="text-lg font-bold text-[#1a237e] mb-4">Filters</h3>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
              placeholder="Enter city"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Bedrooms</label>
            <select
              className="w-full border rounded px-2 py-1 text-sm"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((b) => (
                <option key={b} value={b}>{b}+</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                className="w-1/2 border rounded px-2 py-1 text-sm"
                placeholder="Min"
              />
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                className="w-1/2 border rounded px-2 py-1 text-sm"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        {/* Property Cards */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center text-[#1a237e] font-semibold col-span-3">Loading properties...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-[#1a237e] font-semibold col-span-3">No properties found.</p>
          ) : (
            filtered.map((property) => (
              <PropertyCard key={property._id || property.id} property={property} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
