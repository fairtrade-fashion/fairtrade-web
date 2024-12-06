import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import backgroundImage from "@/assets/images/BlackLogo.png";
import { ArrowBigLeftDashIcon } from "lucide-react";
import { useRegisterMutation } from "../api/register.api";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react"; // Importing icons

const SignupPage: React.FC = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  type APiDataError = {
    status: string;
    message: string;
  };
  type APIERROR = {
    data: APiDataError;
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const result = await register(values).unwrap();
      toast.success("Registration successful! Welcome aboard.");
      console.log("Registration successful:", result);
      navigate("/login"); // Navigate to login page on success
    } catch (error: unknown) {
      if (error && typeof error === "object" && "data" in error) {
        const apiError = error as APIERROR;
        toast.error("An error occurred during registration.", {
          description: apiError.data.message,
        });
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-800 lg:bg-gray-50">
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
        <div className="bg-white w-full max-w-md shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Create an Account
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="w-full px-4 py-2 border rounded-md border-gray-300"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-4 py-2 border rounded-md border-gray-300"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4 relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 border rounded-md border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-8 right-3 text-gray-500"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4 relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-4 py-2 border rounded-md border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-8 right-3 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
