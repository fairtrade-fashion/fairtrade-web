import SubscribeNow from "@/domain/home/component/subscribe_now";
import { Link } from "react-router-dom";

export default function AppFooter() {
  const menuItems = [
    {
      name: "SHIRTS",
      link: "/shirts",
    },
    {
      name: "T_SHIRTS",
      link: "/t-shirts",
    },
    {
      name: "JACKETS",
      link: "/jackets",
    },
    {
      name: "SHORTS",
      link: "/shorts",
    },
    {
      name: "JEANS",
      link: "/jeans",
    },
    {
      name: "ACCESSORIES",
      link: "/accessoris",
    },
  ];
  return (
    <>
      <div>
        <SubscribeNow />
      </div>
      <footer className="text-gray-900 bg-white items-center my-4 md:my-10">
        <div className="md:container md:mx-auto px-4 md:px-10 py-5 pb-5 grid grid-cols-2 gap-16 lg:grid-cols-4 justify-between">
          <div className="w-28 md:w-40 h-8 md:h-16">
            <Link to="/home">
              <img
                className=""
                src="/src/assets/images/fair-trade-transparent.png"
                alt="Fair Trade Logo"
              />
            </Link>
            <div className="pt-1 md:pt-5">
              <h1 className="text-lg">
                Phone: <br />
                <a
                  href="tel:+2349156057436"
                  className="text-gray-500 text-base"
                >
                  +234 915 605 7436
                </a>
              </h1>

              <h1 className="md:text-lg">
                Email: <br />
                <a
                  href="mailto:fairtradecontacts@gmail.com"
                  className="text-gray-500 text-base"
                >
                  fairtradecontacts@gmail.com
                </a>
              </h1>
            </div>
            <div className="pt-5 flex"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Menu</h1>
            <ul className="font-medium mt-2 md:mt-8 md:text-lg">
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
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              Address:
              <p className="text-xs md:text-base font-normal mt-2 md:mt-8">
                Shop 123, Port-Hacort Road, Rivers State
              </p>
            </h1>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              Opening Hours:
              <p className="text-xs md:text-base font-normal mt-2 md:mt-8">
                Weekdays: 7am-7pm
              </p>
              <p className="text-xs md:text-base font-normal">
                Weekends: 9am-7pm
              </p>
            </h1>
          </div>
        </div>
      </footer>
      <div className="flex text-xs w-full py-4 items-center justify-center border-t-2 border-gray-800 text-gray-400">
        Copyright © 2023 FAIR TRADE. All Rights Reserved
      </div>
    </>
  );
}
