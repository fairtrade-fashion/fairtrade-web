import { useState } from "react";
import { FaCartShopping, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp, IoPersonSharp } from "react-icons/io5";
import CartNotification from "../../domain/cart/cart_notification";
import { useFetchCategoryQuery } from "@/domain/categories/categories.api/category.api";
import { useGetOrCreateCartQuery } from "@/domain/cart/cart_api/cart.api";
import logo from "@/assets/images/Website-Logo.png"; 

export default function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data } = useFetchCategoryQuery();
  
  const { data: cartData } = useGetOrCreateCartQuery("");
  const cartItemCount = cartData?.items.length || 0;
  
  

  const menuIcons = [
    { icons: <GrInstagram />, link: "http://Instagram.com/fairrtradee" },
    {
      icons: <FaYoutube />,
      link: "https://youtube.com/@fairrtradee?si=FLwO4hd-W65hGqcu",
    },
    { icons: <FaXTwitter />, link: "https://x.com/faiirtradee?s=21" },
    {
      icons: (
        <Link to="/profile">
          <IoPersonSharp />
        </Link>
      ),
      link: "/profile",
    },
    {
      icons: (
        <Link to="/cart" className="relative">
          <FaCartShopping />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {cartItemCount}
            </span>
          )}
        </Link>
      ),
      link: "/cart",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto py-2 flex justify-between items-center">
          <Link to="/home">
            <img
              className="w-24 h-10 md:w-32 md:h-14"
              src={logo}
              alt="Fair Trade Logo"
            />
          </Link>

          {/* Hamburger Icon for mobile */}
          <div className="lg:hidden flex justify-center items-center gap-5 md:gap-8">
            <Link to="/cart" className="relative">
              <FaCartShopping size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu}>
              <GiHamburgerMenu className="text-3xl text-gray-700" />
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-10 xl:space-x-16 text-lg xl:text-xl font-medium">
            {data
              ?.filter((category) => category.parentId === null) // Only show parent categories
              .map((eachMenuItem) => (
                <li
                  key={eachMenuItem.id}
                  className="font-medium uppercase after:block after:bg-gold after:h-[2px] after:w-[0] hover:after:w-[35px] hover:text-gray-400 after:transition-all after:duration-700"
                >
                  <NavLink
                    to={`category/${eachMenuItem.name}/${eachMenuItem.id}`}
                    className={({ isActive }) =>
                      isActive
                        ? "after:block after:content-[''] after:bg-gray-800 after:h-[3px] after:w-[42.5px] text-gray-400"
                        : "after:block after:content-[''] after:bg-gray-800 after:h-[3px] after:w-[0] hover:after:w-[42.5px] hover:text-gray-400 after:transition-all after:duration-500"
                    }
                  >
                    {eachMenuItem.name}
                  </NavLink>
                </li>
              ))}
          </ul>

          <ul className="hidden lg:flex items-center space-x-5 text-xl font-medium">
            {menuIcons.map((eachMenuItem) => (
              <li
                key={eachMenuItem.link}
                className="font-medium hover:text-gray-400 after:transition-all after:duration-700"
              >
                <Link to={eachMenuItem.link} className="hover:text-gray-400">
                  {eachMenuItem.icons}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 z-50 bg-white transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu}>
              <IoCloseSharp className="text-3xl text-gray-700" />
            </button>
          </div>

          <div className="flex flex-col items-center capitalize mt-10 space-y-6">
            {data
              ?.filter((category) => category.parentId === null)
              .map((eachMenuItem) => (
                <Link
                  key={eachMenuItem.id}
                  to={`category/${eachMenuItem.name}/${eachMenuItem.id}`}
                  onClick={toggleMenu}
                  className="text-xl font-medium text-gray-700"
                >
                  {eachMenuItem.name}
                </Link>
              ))}
          </div>
          <div className="flex items-center justify-center gap-5 mt-10">
            {menuIcons.map((eachMenuItem) => (
              <Link
                key={eachMenuItem.link}
                to={eachMenuItem.link}
                onClick={toggleMenu}
                className="text-2xl font-medium text-gray-700"
              >
                {eachMenuItem.icons}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CartNotification />
    </>
  );
}
