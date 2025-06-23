import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ Important
      },
      body: JSON.stringify(formData), // ✅ Convert to JSON string
    });

    const data = await response.json();
    if(!response.ok) {
      throw new Error(data.message || "Signup failed");
    }
    navigate("/user/login"); // Redirect to login page on success

  } catch (err) {
    console.error("❌ Signup error:", err);
  }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f9fafe]">
     
      

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#f9fafe] px-6 py-8">
        <div className="bg-white shadow-md rounded-xl w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-2">
            Housify
          </h1>
          <h2 className="text-xl font-semibold text-center mb-1">
            Create an Account
          </h2>
          <p className="text-sm text-center text-gray-500 mb-6">
            Sign up for free and start exploring
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block mb-1 text-sm font-medium">Full Name</label>
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="pl-10 pr-10 w-full border border-gray-300 rounded-md py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                  required
                />
                <div
                  className="absolute top-3 right-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <input type="checkbox" required className="mt-1" />
              <label className="text-sm text-gray-600">
                I agree to the Terms and Conditions
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>

            {/* Social Sign Up */}
            <div className="text-center text-sm text-gray-500 my-3">or sign up with</div>

            <div className="flex flex-col gap-2">
              <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
                <FaGoogle className="text-red-500" /> Sign up with Google
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
                <FaFacebookF className="text-blue-600" /> Sign up with Facebook
              </button>
            </div>

            {/* Login Link */}
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/user/login" className="text-blue-600 font-medium hover:underline">
                Login
              </Link>
            </p>

            {/* Terms Footer */}
            <p className="text-xs text-center text-gray-400 mt-2">
              By signing up, you agree to our{" "}
              <span className="text-blue-600 hover:underline">Terms of Service</span> and{" "}
              <span className="text-blue-600 hover:underline">Privacy Policy</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
