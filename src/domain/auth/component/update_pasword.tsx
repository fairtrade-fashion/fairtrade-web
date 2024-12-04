import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ArrowBigLeftDashIcon } from "lucide-react";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const UpdatePassword: React.FC = () => {
  const handleSubmit = (values: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    // Simulate updating password (replace with actual API call)
    console.log("Updating password to", values.newPassword);
    alert("Your password has been updated");
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
            Update Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Update your existing password
          </p>
        </div>

        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6">
              <div>
                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Old Password
                </label>
                <Field
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  placeholder="Old Password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
                <ErrorMessage
                  name="oldPassword"
                  component="p"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <Field
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="New Password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
                <ErrorMessage
                  name="newPassword"
                  component="p"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm New Password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? "Updating..." : "Update Password"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdatePassword;
