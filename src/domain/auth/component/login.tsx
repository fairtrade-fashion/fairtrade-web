import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { useLoginMutation } from "@/domain/auth/api/login.api";
import { ArrowBigLeftDashIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "@/assets/images/BlackLogo.png";
import { LoginValue } from "@/models/request/login_value.model";
import { LoginRoot } from "@/models/response/login.model";
import { setAuth } from "@/redux/slices/auth.slice";
import { useDispatch } from "react-redux";

interface ApiError {
  data?: {
    message?: string;
  };
  status?: number;
}

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = async (values: LoginValue) => {
    console.log("Submitting form with values:", values);
    try {
      const response: LoginRoot = await login(values).unwrap();
      if (response.access_token) {
        console.log("Login successful", response);
        localStorage.setItem("access_token", response.access_token);
        dispatch(setAuth(true));
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
      const apiError = error as ApiError;
      let errorMessage = "Login failed";
      if (apiError.data) {
        errorMessage = apiError.data.message || "An error occurred";
      } else if (apiError.status === 401) {
        errorMessage = "Invalid credentials";
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-screen bg-gray-800 lg:bg-gray-50">
      <div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gray-800 opacity-60" />
        <div className="p-4">
          <Link
            to="/"
            className="hover:text-gray-50 flex gap-1 items-center rounded-lg border-2 w-28 hover:border-2 hover:bg-gray-800 hover:border-gray-50 px-2 text-gray-800 bg-gray-50 transition-all transform ease-in-out duration-500 text-lg font-semibold"
          >
            <ArrowBigLeftDashIcon /> Home
          </Link>
        </div>
      </div>

      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back! Please enter your credentials.
            </p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="text-gray-800">
                      Email address
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email address"
                      className="block w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-sm mt-2"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="password" className="text-gray-800">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      className="block w-full px-3 py-2 border rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-9"
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500 text-sm mt-2"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      id="remember-me"
                      name="rememberMe" // Changed to follow camelCase convention
                      type="checkbox"
                      className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-blue-600">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-gray-500 text-white py-2 rounded-md"
                >
                  {isSubmitting || isLoading ? "Signing in..." : "Sign in"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don’t have an account?
              <Link to="/signup" className="text-indigo-600">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
