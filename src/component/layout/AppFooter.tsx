
export default function AppFooter() {
  return (
    <>
      <footer className=" text-gray-900 bg-white items-center">
        <div className="container mx-auto px-40 py-5 pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between">
          <div className="w-40 h-16">
            <img
              className=""
              src="src/assets/images/fair-trade-transparent.png"
              alt="/"
            />
            <div className="pt-5">
              <h1>
                Phone: <span className="text-gray-500">sdfghjkl</span>
              </h1>
              <h1>
                Email: <span className="text-gray-500">sdfghjkl</span>
              </h1>
            </div>
            <div className="pt-5 flex"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Menu</h1>
            <ul className="text-gray-500 font-medium mt-10">
              <li>SHIRTS</li>
              <li>T-SHIRTS</li>
              <li>JACKETS</li>
              <li>SHORTS</li>
              <li>JEANS</li>
              <li>ACCESORIES</li>
              <li>CONTACT</li>
            </ul>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Address</h1>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Opening Hours</h1>
          </div>
        </div>
      </footer>
      <div className="flex w-full py-4 items-center justify-center border-t-2 border-gray-800 text-gray-400">
        Copyright © 2023 FAIR TRADE. All Rights Reserved
      </div>
    </>
  );
}
