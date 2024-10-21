
export default function SubscribeNow() {
  return (
    <section>
      <div className="bg-black text-gray-50 items-center justify-center text-center">
        <div className="container text-center grid grid-cols-1 h-[32vh] md:h-[25vh] lg:grid-cols-3 justify-between items-center">
          <div className="text-xl md:text-3xl font-medium">
            Never miss our updates about <br /> new arrivals and special offers
          </div>
          <div className="md:flex">
            <input
              className="bg-transparent border-2 md:px-20 md:py-4 border-gray-300 p-2 text-gray-300"
              type="text"
              placeholder="Enter your email here*"
            />
            <div>
              <button className="hidden md:block bg-gray-50 text-gray-800 text-lg w-40 py-4  font-semibold p-2 hover:scale-95 transition-all duration-700">
                Subscribe Now
              </button>
            </div>
          </div>
          <div>
            <button className="md:hidden bg-gray-50 text-gray-800 text-lg font-semibold p-2 hover:scale-105 transition-all duration-300">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
