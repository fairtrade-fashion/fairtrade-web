import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/config/store";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-4 lg:mx-auto">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="relative flex-shrink-0">
            <img
              src={user.profilePicture || "/default-profile.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
            <button
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600"
              onClick={toggleEdit}
            >
              <FaCamera />
            </button>
          </div>

          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold">
              {user.name || "No Name"}
            </h2>
            <p className="text-lg text-gray-600">
              {user.email || "No Email"}
            </p>
            <p className="text-gray-500">
              {user.address || "No address provided"}
            </p>
            {isEditing && (
              <div className="mt-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={() => {
                    // Handle profile picture update logic here
                  }}
                  className="hidden"
                  id="profile-picture-upload"
                />
                <label
                  htmlFor="profile-picture-upload"
                  className="cursor-pointer text-blue-500 hover:underline"
                >
                  Change Profile Picture
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4">
          <h3 className="text-xl font-semibold mb-4">Account Actions</h3>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <button
              onClick={() => navigate("/order-history")}
              className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
            >
              View Order History
            </button>
            <button
              onClick={() => navigate("/saved-items")}
              className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
            >
              View Saved Items
            </button>
            <button
              onClick={() => navigate("/account-settings")}
              className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
            >
              Account Settings
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
