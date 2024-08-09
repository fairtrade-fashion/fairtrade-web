const tshirtCard = [
  {
    image: "/src/assets/images/BlackLogo.png",
    hoverImage: "/src/assets/images/BlackLogo2.png",
    content: "Content for the first image",
    name: "solomandaras",
    amount: "₦5000",
  },
  {
    image: "/src/assets/images/BlackLogo.png",
    hoverImage: "/src/assets/images/BlackLogo2.png",
    content: "Content for the second image",
    name: "solomandaras",
    amount: "₦5000",
  },
  {
    image: "/src/assets/images/BlackLogo.png",
    hoverImage: "/src/assets/images/BlackLogo2.png",
    content: "Content for the third image",
    name: "solomandaras",
    amount: "₦5000",
  },
  {
    image: "/src/assets/images/BlackLogo.png",
    hoverImage: "/src/assets/images/BlackLogo2.png",
    content: "Content for the fourth image",
    name: "solomandaras",
    amount: "₦5000",
  },
  {
    image: "/src/assets/images/BlackLogo.png",
    hoverImage: "/src/assets/images/BlackLogo2.png",
    content: "Content for the third image",
    name: "solomandaras",
    amount: "₦5000",
  },
  {
    image: "/src/assets/images/BlackLogo.png",
    hoverImage: "/src/assets/images/BlackLogo2.png",
    content: "Content for the fourth image",
    name: "solomandaras",
    amount: "₦5000",
  },
];

export default function ShopShirt() {
  return (
    <>
      <h1 className="text-center text-3xl font-semibold text-gray-800 mt-16">
        Shop Shirt
      </h1>
      <div className="grid grid-cols-2 my-10 px-2 md:px-10 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
        {tshirtCard.map((item, index) => (
          <div key={index} className="">
            <div className="relative group">
              <img
                src={item.image}
                alt="T-shirt"
                className="w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                <img
                  src={item.hoverImage}
                  alt="T-shirt Hover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute w-full h-1/5 bg-yellow-200 bottom-0 p-4 text-green-500 text-center justify-center">
                  {item.content}
                </div>
              </div>
            </div>
            <div className="text-red-500 text-lg items-center justify-center text-center">
              <p>{item.name}</p>
              <span className="border-t border-gray-500">{item.amount}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="items-center justify-center text-center">
        <button className="px-5 py-3 font-semibold text-xl border-[3px] border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800 bg-gradient-to-r from-white via-white to-white bg-[size:_100%] hover:from-gray-600 hover:to-black hover:bg-[position:_100%_100%] transition-all duration-500">
          View More
        </button>
      </div>
    </>
  );
}
