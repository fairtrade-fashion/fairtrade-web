import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { ArrowBigLeftDashIcon } from "lucide-react";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword: React.FC = () => {
  // Handle form submission
  const handleSubmit = (values: { email: string }) => {
    // Simulate sending reset link (replace with actual API call)
    console.log("Sending password reset link to", values.email);
    alert("A reset link has been sent to your email");
  };

  return (
    <div className="flex h-screen bg-gray-800 items-center justify-center">
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="hover:text-gray-50 flex gap-1 items-center rounded-lg border-2 hover:border-2 hover:bg-gray-800 hover:border-gray-50 px-2 text-gray-800 bg-gray-50 transition-all transform ease-in-out duration-500 text-lg font-semibold"
        >
          <ArrowBigLeftDashIcon /> Home
        </Link>
      </div>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to reset your password
          </p>
        </div>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="mt-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Reset Link
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
