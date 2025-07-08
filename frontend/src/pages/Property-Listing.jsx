import React, { useState } from "react";
import {
  FaHeart,
  FaBath,
  FaBed,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaRoad,
} from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const properties = [
  {
    id: 1,
    type: "For Sale",
    price: "₹1.2 Cr",
    title: "Modern 3 BHK Apartment",
    location: "HSR Layout, Bangalore",
    size: "1,650 sq.ft",
    beds: 3,
    baths: 2,
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    road: null,
    approved: false,
  },
  {
    id: 2,
    type: "Premium",
    price: "₹3.5 Cr",
    title: "Luxury Villa with Garden",
    location: "Whitefield, Bangalore",
    size: "3,200 sq.ft",
    beds: 4,
    baths: 4,
    img: "https://images.unsplash.com/photo-1599423300746-b62533397364",
    road: null,
    approved: false,
  },
  {
    id: 3,
    type: "For Sale",
    price: "₹85 L",
    title: "Cozy 2 BHK Apartment",
    location: "Indira Nagar, Bangalore",
    size: "1,100 sq.ft",
    beds: 2,
    baths: 2,
    img: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1",
    road: null,
    approved: false,
  },
  {
    id: 4,
    type: "Premium",
    price: "₹4.2 Cr",
    title: "Penthouse with City View",
    location: "MG Road, Bangalore",
    size: "3,800 sq.ft",
    beds: 4,
    baths: 4.5,
    img: "https://images.unsplash.com/photo-1572120360610-d971b9b78847",
    road: null,
    approved: false,
  },
  {
    id: 5,
    type: "For Sale",
    price: "₹1.2 Cr",
    title: "Residential Plot",
    location: "Sarjapur Road, Bangalore",
    size: "2,400 sq.ft",
    beds: null,
    baths: null,
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    road: "30 ft Road",
    approved: true,
  },
  {
    id: 6,
    type: "For Sale",
    price: "₹1.8 Cr",
    title: "Independent House",
    location: "JP Nagar, Bangalore",
    size: "2,100 sq.ft",
    beds: 3,
    baths: 3,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    road: null,
    approved: false,
  },
];

const badgeColors = {
  "For Sale": "bg-blue-600",
  Premium: "bg-[#5C6BC0]",
};

const PropertyCard = ({ property }) => (
  <div className="bg-white shadow-[0_6px_24px_-8px_rgba(25,41,64,0.15)] rounded-xl overflow-hidden border border-[#e8eaf6] relative transition hover:shadow-lg w-[275px] mx-auto">
    <div className="relative">
      <img
        src={property.img}
        alt={property.title}
        className="w-full h-36 object-cover"
        draggable={false}
      />
      <span 
        className={`absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-semibold text-white ${
          badgeColors[property.type] || "bg-blue-600"
        }`}
      >
        {property.type}
      </span>
      <button className="absolute top-3 right-3 bg-white/90 rounded-full p-2 text-blue-600 hover:bg-blue-50 transition">
        <FaHeart className="text-lg" />
      </button>
    </div>
    <div className="p-4 pb-3">
      <h3 className="text-lg font-bold text-[#1a237e] mb-1">{property.price}</h3>
      <h2 className="text-base font-semibold mb-1">{property.title}</h2>
      <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
        <FaMapMarkerAlt className="text-blue-600" /> {property.location}
      </p>
      <div className="flex flex-wrap gap-3 text-xs text-[#1a237e] mb-2 border-b border-[#e8eaf6] pb-2">
        <span className="flex items-center gap-1">
          <FaRulerCombined className="text-blue-600" /> {property.size}
        </span>
        {property.beds && (
          <span className="flex items-center gap-1">
            <FaBed className="text-blue-600" /> {property.beds} Beds
          </span>
        )}
        {property.baths && (
          <span className="flex items-center gap-1">
            <FaBath className="text-blue-600" /> {property.baths} Baths
          </span>
        )}
        {property.road && (
          <span className="flex items-center gap-1">
            <FaRoad className="text-blue-600" /> {property.road}
          </span>
        )}
        {property.approved && (
          <span className="flex items-center gap-1">
            <FaCheckCircle className="text-blue-600" /> BBMP Approved
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
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [areaRange, setAreaRange] = useState([0, 5000]);
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState(null);

  // Padding for left and right for larger screens
  return (
    <div className="px-2 md:px-14 lg:px-28 py-4 md:py-10 bg-[#f5f7fa] min-h-screen">
      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-[#e8eaf6] h-fit md:sticky top-4 min-w-[260px] max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-[#1a237e]">Filter Properties</h2>
            <button className="text-xs font-semibold text-blue-600 hover:underline">
              Clear All
            </button>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1a237e] mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Enter city, locality or area"
              className="w-full p-2 border border-[#e8eaf6] rounded focus:ring-2 focus:ring-blue-200 text-sm"
            />
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-[#1a237e] text-sm mb-2">Property Type</h3>
            {["Apartment", "House", "Villa", "Plot"].map((type) => (
              <label key={type} className="flex items-center mb-2 text-sm">
                <input type="checkbox" className="mr-2 accent-blue-600" /> {type}
              </label>
            ))}
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-[#1a237e] text-sm mb-2">Price Range</h3>
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                className="w-1/2 p-1 border border-[#e8eaf6] rounded text-sm"
                placeholder="Min"
                value={priceRange[0]}
                onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                min={0}
              />
              <input
                type="number"
                className="w-1/2 p-1 border border-[#e8eaf6] rounded text-sm"
                placeholder="Max"
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                min={priceRange[0]}
              />
            </div>
            <div className="flex items-center gap-2 px-1">
              <input
                type="range"
                min={0}
                max={10000000}
                value={priceRange[0]}
                onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                className="w-full accent-blue-600"
              />
              <input
                type="range"
                min={0}
                max={10000000}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-[#1a237e] text-sm mb-2">Area (sq.ft)</h3>
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                className="w-1/2 p-1 border border-[#e8eaf6] rounded text-sm"
                placeholder="Min"
                value={areaRange[0]}
                onChange={e => setAreaRange([+e.target.value, areaRange[1]])}
                min={0}
              />
              <input
                type="number"
                className="w-1/2 p-1 border border-[#e8eaf6] rounded text-sm"
                placeholder="Max"
                value={areaRange[1]}
                onChange={e => setAreaRange([areaRange[0], +e.target.value])}
                min={areaRange[0]}
              />
            </div>
            <div className="flex items-center gap-2 px-1">
              <input
                type="range"
                min={0}
                max={5000}
                value={areaRange[0]}
                onChange={e => setAreaRange([+e.target.value, areaRange[1]])}
                className="w-full accent-blue-600"
              />
              <input
                type="range"
                min={0}
                max={5000}
                value={areaRange[1]}
                onChange={e => setAreaRange([areaRange[0], +e.target.value])}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-[#1a237e] text-sm mb-2">Bedrooms</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`border border-[#e8eaf6] px-3 py-1 rounded font-medium text-sm ${
                    bedrooms === num ? "bg-blue-600 text-white" : "bg-white hover:bg-blue-50"
                  }`}
                  onClick={() => setBedrooms(num)}
                >
                  {num}+
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Property Cards */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2">
        <button className="w-9 h-9 flex items-center justify-center rounded-full border border-[#e8eaf6] bg-white text-[#1a237e] hover:bg-blue-50">
          <IoIosArrowBack />
        </button>
        {[1, 2, 3, 4, 5, "...", 12].map((num, idx) => (
          <button
            key={idx}
            className={`w-9 h-9 flex items-center justify-center rounded-full border border-[#e8eaf6] bg-white text-[#1a237e] font-semibold ${
              num === page ? "bg-blue-600 text-white border-blue-600" : ""
            } ${num === "..." ? "cursor-default" : "hover:bg-blue-50"}`}
            onClick={() => typeof num === "number" && setPage(num)}
            disabled={num === "..."}
          >
            {num}
          </button>
        ))}
        <button className="w-9 h-9 flex items-center justify-center rounded-full border border-[#e8eaf6] bg-white text-[#1a237e] hover:bg-blue-50">
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}