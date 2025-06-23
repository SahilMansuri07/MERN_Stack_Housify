import { useState } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
  FaLock,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Important to receive cookies from backend
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Login successful:", data);
        navigate("/"); // ✅ Redirect to home
      } else {
        console.error("❌ Login failed:", data.message || data.error);
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("❌ Error during login:", err);
      setError("Network error or server unavailable");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafe]">
      {/* Left Banner */}
     

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center  px-6 py-8">
        <div className="bg-white shadow-md rounded-xl w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-2">
            Housify
          </h1>
          <h2 className="text-3xl font-semibold text-center mb-1">
            Welcome Back
          </h2>
          <p className="text-sm text-center text-gray-500 mb-6">
            Login to your account to continue
          </p>

          {error && (
            <p className="text-center text-sm text-red-500 mb-4">{error}</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Email Address
              </label>
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
                  placeholder="Enter your password"
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

            {/* Remember Me */}
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="mt-1" />
                <label className="text-sm text-gray-600">Remember me</label>
              </div>
              <div className="text-sm text-blue-600 cursor-pointer hover:underline">
                <p>Forget password</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>

            {/* Divider */}
            <div className="text-center text-sm text-gray-500 mt-20 my-3">
              or Continue with
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-2">
              <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
                <FaGoogle className="text-red-500" /> Login with Google
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
                <FaFacebookF className="text-blue-600" /> Login with Facebook
              </button>
            </div>

            <p className="text-sm text-center text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link
                to="/user/signup"
                className="text-blue-600 font-medium hover:underline"
              >
                Register
              </Link>
            </p>

            <p className="text-xs text-center text-gray-400 mt-2">
              By logging in, you agree to our{" "}
              <span className="text-blue-600 hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-blue-600 hover:underline">
                Privacy Policy
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
