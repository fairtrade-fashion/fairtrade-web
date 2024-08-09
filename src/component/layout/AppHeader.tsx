import { FaFacebookSquare } from "react-icons/fa";
import { FaCartShopping, FaSnapchat, } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";

export default function AppHeader() {
  const menuItems = [
    {
      name: "SHIRTS",
      link: "/home",
    },
    {
      name: "T_SHIRTS",
      link: "/about_us",
    },
    {
      name: "JACKETS",
      link: "/services",
    },
    {
      name: "SHORTS",
      link: "#",
    },
    {
      name: "JEANS",
      link: "#",
    },
    {
      name: "ACCESORIES",
      link: "/contact_us",
    },
  ];

  const menuIcons = [
    {
      icons: <FaFacebookSquare />,
      link: "",
    },
    {
      icons: <GrInstagram />,
      link: "",
    },
    {
      icons: <FaSnapchat />,
      link: "/services",
    },
    {
      icons: <FaCartShopping />,
      link: "#",
    },
  ];
  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto py-5 xl:py-7 flex justify-between">
          <img
            className="w-40 h-12"
            src="/src/assets/images/fair-trade-transparent.png"
            alt="/"
          />
          <ul className="hidden md:flex items-center space-x-10 xl:space-x-16 text-lg xl:text-xl my-2 font-medium">
            {menuItems.map((eachMenuItem) => (
              <li
                key={eachMenuItem.link}
                className="font-medium after:block after:bg-gold after:h-[2px] after:w-[0] hover:after:w-[35px] hover:text-gray-400 after:transition-all after:duration-700"
              >
                <a href={eachMenuItem.link} className="hover:text-gray-400">
                  {eachMenuItem.name}
                </a>
              </li>
            ))}
          </ul>
          <ul className="hidden md:flex items-center space-x-5 text-xl my-2 font-medium">
            {menuIcons.map((eachMenuItem) => (
              <li
                key={eachMenuItem.link}
                className="font-medium hover:text-gray-400 after:transition-all after:duration-700"
              >
                <a href={eachMenuItem.link} className="hover:text-gray-400">
                  {eachMenuItem.icons}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
