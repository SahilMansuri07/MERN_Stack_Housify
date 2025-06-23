import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2d3e50] text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Housify</h2>
          <p className="text-sm text-gray-400">
            Your trusted partner in finding the perfect home.
          </p>
        </div>

        {/* Footer Columns */}
        <div>
          <h3 className="text-white font-semibold mb-3 border-b-2 border-blue-500 w-max">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Properties</a></li>
            <li><a href="#" className="hover:text-white">Price Prediction</a></li>
            <li><a href="#" className="hover:text-white">Sell Your House</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 border-b-2 border-blue-500 w-max">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Buying Guides</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Help Center</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 border-b-2 border-blue-500 w-max">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-3 border-b-2 border-blue-500 w-max">
            Connect With Us
          </h3>
          <div className="flex space-x-3 mb-6">
            <a href="#" className="text-gray-300 hover:text-white bg-gray-600 p-2 rounded-full">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-300 hover:text-white bg-gray-600 p-2 rounded-full">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-300 hover:text-white bg-gray-600 p-2 rounded-full">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-300 hover:text-white bg-gray-600 p-2 rounded-full">
              <FaLinkedinIn />
            </a>
          </div>

          <h3 className="text-white font-semibold mb-2 border-b-2 border-blue-500 w-max">
            Subscribe to Our Newsletter
          </h3>
          <form className="flex mt-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-3 py-2 rounded-l-md w-full text-sm text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-600 pt-4 text-center text-sm text-gray-400">
        &copy; 2023 Housify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
