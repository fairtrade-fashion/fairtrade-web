import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchProfileQuery } from "../api/profile.api";
import { toast } from "sonner";
import { removeToken } from "@/config/token";
import { setAuth } from "@/redux/slices/auth.slice";
import { useDispatch } from "react-redux";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: userProfile, error, isLoading } = useFetchProfileQuery();

  useEffect(() => {
    if (error) {
      if ("status" in error) {
        if (error.status === 401) {
          toast.error("Unauthorized. Redirecting to login.");
          navigate("/login");
        } else {
          toast.error("Failed to fetch profile.");
        }
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  }, [error, navigate]);

  const handleClick = () => {
    const phoneNumber = "+2347049877170";
    const message = "Hello, I have a complain!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    removeToken("isAuthenticated");
    dispatch(setAuth(false));
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-gray-800 border-solid"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return <p>No user profile found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-4 lg:mx-auto">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-center">
            <p className="text-lg text-gray-600">
              {userProfile.email || "No Email"}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4">
          <h3 className="text-xl font-semibold mb-4">Account Actions</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <button
              onClick={() => navigate("/cart")}
              className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
            >
              View Cart
            </button>
            <button
              onClick={handleClick}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Chat/Ask questions
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
