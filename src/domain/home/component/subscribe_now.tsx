
export default function SubscribeNow() {
  return (
    <section>
      <div className="mt-16">
        <div className="bg-black text-gray-50">
          <div className="flex container h-[30vh] justify-between items-center">
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
              <button className="bg-gray-50 text-gray-800 text-lg font-semibold px-6 hover:scale-95 transition-all duration-700">Subscribe Now</button>
            </div>
          </div>
        </div>
        {/* Other main content goes here */}
      </div>
    </section>
  );
}
