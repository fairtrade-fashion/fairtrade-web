// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useFetchProfileQuery } from "../api/profile.api";
// import { toast } from "sonner";
// import { removeToken } from "@/config/token";
// import { setAuth } from "@/redux/slices/auth.slice";
// import { useDispatch } from "react-redux";
// import { Loader } from "@/components/common/loader";

// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { data: userProfile, error, isLoading } = useFetchProfileQuery();

//   useEffect(() => {
//     if (error) {
//       if ("status" in error) {
//         if (error.status === 401) {
//           toast.error("Unauthorized. Redirecting to login.");
//           navigate("/login");
//         } else {
//           toast.error("Failed to fetch profile.");
//         }
//       } else {
//         toast.error("An unknown error occurred.");
//       }
//     }
//   }, [error, navigate]);

//   const handleClick = () => {
//     const phoneNumber = "+2347049877170";
//     const message = "Hello, I have a complain!";
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     removeToken("isAuthenticated");
//     dispatch(setAuth(false));
//     navigate("/login");
//   };

//   if (isLoading) {
//     return (<Loader />
//     );
//   }

//   if (!userProfile) {
//     return <p>No user profile found.</p>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-4 lg:mx-auto">
//         <div className="flex flex-col md:flex-row md:items-center">
//           <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-center">
//             <p className="text-lg text-gray-600">
//               {userProfile.email || "No Email"}
//             </p>
//           </div>
//         </div>

//         <div className="mt-8 border-t border-gray-200 pt-4">
//           <h3 className="text-xl font-semibold mb-4">Account Actions</h3>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
//             <button
//               onClick={() => navigate("/order")}
//               className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//             >
//               View Order
//             </button>
//             <button
//               onClick={() => navigate("/cart")}
//               className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-900"
//             >
//               View Cart
//             </button>
//             <button
//               onClick={handleClick}
//               className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//             >
//               Chat/Ask questions
//             </button>
//             <button
//               onClick={handleLogout}
//               className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, MessageCircle, ShoppingBag, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";

import { useFetchProfileQuery } from "../api/profile.api";
// import { removeToken } from "../config/token";
// import { setAuth } from "../redux/slices/auth.slice";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { removeToken } from "@/config/token";
import { setAuth } from "@/redux/slices/auth.slice";

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

  const handleWhatsAppChat = () => {
    const phoneNumber = "+2347049877170";
    const message = "Hello, I have a question!";
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
    return <ProfileSkeleton />;
  }

  if (!userProfile) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Profile Not Found</CardTitle>
          <CardDescription>We couldn't find your user profile.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => navigate("/login")}>Return to Login</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-16 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${userProfile.email}&background=random&color=fff&size=200`}
                alt={userProfile.name}
              />
              <AvatarFallback>
                {userProfile.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{userProfile.name || "User"}</CardTitle>
              <CardDescription>
                {userProfile.email || "No Email"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={() => navigate("/order")} className="w-full">
              <ShoppingBag className="mr-2 h-4 w-4" /> View Orders
            </Button>
            <Button onClick={() => navigate("/cart")} className="w-full">
              <ShoppingCart className="mr-2 h-4 w-4" /> View Cart
            </Button>
            <Button
              onClick={handleWhatsAppChat}
              className="w-full"
              variant="secondary"
            >
              <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
            </Button>
            <Button
              onClick={handleLogout}
              className="w-full"
              variant="destructive"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
