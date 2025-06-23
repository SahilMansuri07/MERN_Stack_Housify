import React, { useState } from "react";

// Dummy Data
const featuredProperties = [
  {
    tag: "Featured",
    badgeColor: "bg-blue-500",
    title: "Luxury Villa",
    location: "Los Angeles, CA",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    beds: 4,
    baths: 3,
    sqft: 3200,
    price: "₹35,07,000",
    slides: 6,
    activeSlide: 6,
  },
  {
    tag: "New",
    badgeColor: "bg-blue-400",
    title: "Modern Apartment",
    location: "Manhattan, NY",
    img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
    beds: 2,
    baths: 1,
    sqft: 1100,
    price: "₹28,40,000",
    slides: 6,
    activeSlide: 6,
  },
  {
    tag: "Featured",
    badgeColor: "bg-blue-500",
    title: "Family House",
    location: "Brooklyn, NY",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    beds: 3,
    baths: 2,
    sqft: 1600,
    price: "₹54,27,500",
    slides: 6,
    activeSlide: 5,
  }
];

const features = [
  {
    icon: (
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-4">
        <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 17l6-6 4 4 6-6" />
        </svg>
      </span>
    ),
    title: "Accurate Price Prediction",
    desc: "Our AI-powered tool provides the most accurate home price predictions based on market trends and property features."
  },
  {
    icon: (
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-4">
        <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
    ),
    title: "Advanced Search",
    desc: "Find your perfect home with our advanced search filters that help you narrow down properties based on your preferences."
  },
  {
    icon: (
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-4">
        <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24">
          <path d="M12 2l9 4.5v11L12 22l-9-4.5v-11L12 2zm0 13a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </span>
    ),
    title: "Verified Listings",
    desc: "All our property listings are verified to ensure you get accurate information and a hassle-free buying experience."
  },
  {
    icon: (
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-4">
        <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <path d="M9 22V12h6v10" />
        </svg>
      </span>
    ),
    title: "Easy House Selling",
    desc: "List your property with our user-friendly selling platform and reach thousands of potential buyers quickly and efficiently."
  }
];

function PropertyCard({ tag, badgeColor, title, location, img, beds, baths, sqft, price, slides, activeSlide }) {
  return (
    <div className="bg-white rounded-xl shadow-md mb-8 mx-auto w-full max-w-xs transition hover:shadow-xl">
      <div className="relative">
        <img src={img} alt={title} className="w-full h-44 object-cover rounded-t-xl" />
        <span className={`absolute top-2 left-2 text-white text-xs px-3 py-1 rounded-full capitalize ${badgeColor}`}>
          {tag}
        </span>
        <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">{activeSlide}/{slides}</span>
        {/* Slider dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
          {[...Array(slides)].map((_, idx) => (
            <span
              key={idx}
              className={`block w-2 h-2 rounded-full ${idx + 1 === activeSlide ? "bg-blue-500" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
      <div className="p-4 pt-3">
        <h3 className="text-base font-semibold mb-0.5">{title}</h3>
        <div className="text-xs text-red-400 mb-2">
          location_on <span className="text-gray-700">{location}</span>
        </div>
        <div className="flex items-center text-xs text-gray-500 mb-2 space-x-3">
          <div>
            hotel
            <sup className="ml-0.5">{beds}</sup>
            <span className="ml-0.5 text-gray-400">Beds</span>
          </div>
          <div>
            bathtub
            <sup className="ml-0.5">{baths}</sup>
            <span className="ml-0.5 text-gray-400">Baths</span>
          </div>
          <div>
            straighten
            <sup className="ml-0.5">{sqft}</sup>
            <span className="ml-0.5 text-gray-400">sqft</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-blue-600 font-bold text-lg">{price}</span>
          <button className="border border-blue-600 text-blue-600 rounded px-3 py-1 text-sm font-semibold hover:bg-blue-50 transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  // Gradient overlay image for hero
  const heroBg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=80";
  const heroOverlay =
    "linear-gradient(rgba(38, 81, 166, 0.81), rgba(38, 81, 166, 0.81))";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header>
      
        <div
          className="relative h-[700px] flex flex-col justify-center items-center bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `${heroOverlay}, url('${heroBg}')`,
          }}>
          <h1 className="text-5xl font-extrabold text-white mb-4 text-center drop-shadow-lg">Find Your Dream Home</h1>
          <p className="text-lg text-white max-w-2xl text-center mb-2">
            Explore properties, predict prices, or sell your house with our user-friendly platform.
          </p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center" style={{ marginTop: "-40px" }}>
        <div className="bg-white rounded-xl shadow-lg px-6 py-4 flex flex-wrap gap-4 w-[90vw] max-w-4xl items-center z-10">
          <input
            className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="text"
            placeholder="Search by location, price, or property type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option>Property Type</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Villa</option>
            <option>Condo</option>
          </select>
          <select
            className="border rounded px-3 py-2"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option>Price Range</option>
            <option>0-30L</option>
            <option>30L-60L</option>
            <option>60L-1Cr</option>
            <option>1Cr+</option>
          </select>
          <select
            className="border rounded px-3 py-2"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          >
            <option>Bedrooms</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4+</option>
          </select>
          <button className="bg-blue-600 text-white px-7 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Search
          </button>
        </div>
      </div>

      <section className="max-w-7xl mx-auto mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Properties
          <span className="block w-24 h-1 bg-blue-600 mx-auto mt-2 rounded"></span>
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {featuredProperties.map((prop, i) => (
            <PropertyCard key={i} {...prop} />
          ))}
        </div>
      </section>
      {/* Why Choose Housify Section */}
     <section className="max-w-7xl mx-auto mt-20 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
        Why Choose <span className="text-blue-600">Housify</span>?
      </h2>
      <div className="w-32 h-1 bg-blue-500 rounded mx-auto mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
        {features.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:shadow-xl">
            {item.icon}
            <h3 className="font-bold text-xl mb-2 text-gray-900 text-center">{item.title}</h3>
            <p className="text-gray-500 text-center text-base">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

      {/* Featured Properties */}

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto mt-20 mb-10 px-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between px-8 py-10">
          <div>
            <h3 className="text-white text-3xl font-bold mb-2">Ready to find your next home?</h3>
            <p className="text-blue-100 mb-4">Sign up today and start your journey with Housify!</p>
          </div>
          <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg shadow hover:bg-blue-50 mt-4 md:mt-0">
            Get Started
          </button>
        </div>
      </section>

    </div>
  );
}