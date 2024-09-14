
export default function SubscribeNow() {
  return (
    <section>
        <div className="bg-black text-gray-50">
          <div className="lg:hidden container h-[32vh] md:h-[25vh] justify-center text-center items-center">
            <div className="text-xl pt-8 md:text-3xl font-medium">
              Never miss our updates about new arrivals and special
              offers
            </div>
            <div className="gap-2 pt-4 md:pt-5">
              <input
                className="bg-transparent border-2 px-4 text-center py-3 md:py-5 border-gray-300 p-2 text-gray-300"
                type="text"
                placeholder="Enter your email here*"
              />
              <button className="bg-gray-50 py-2 md:py-5 mt-4 text-gray-800 text-lg font-semibold px-6 hover:scale-95 transition-all duration-700">
                Subscribe Now
              </button>
            </div>
          </div>
          <div className="hidden lg:flex container h-[25vh] justify-between items-center">
            <div className="text-3xl font-medium">
              Never miss our updates about <br /> new arrivals and special
              offers
            </div>
            <div className="flex gap-2">
              <input
                className="bg-transparent border-2 px-52 py-5 border-gray-300 p-2 text-gray-300"
                type="text"
                placeholder="Enter your email here*"
              />
              <button className="bg-gray-50 text-gray-800 text-lg font-semibold px-6 hover:scale-95 transition-all duration-700">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
    </section>
  );
}
