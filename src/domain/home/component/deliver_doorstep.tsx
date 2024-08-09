
export default function DeliverDoorstep() {
  return (
    <>
      <div className="relative h-[50vh] w-full mt-16 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        >
          <source src="src/assets/videos/customer.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl md:text-4xl font-bold">
            Deliver To Your Door Step
          </h1>
          <button className="mt-8 px-12 py-3 text-lg bg-white hover:bg-transparent border-4 border-white hover:border-4 hover:border-white hover:text-white text-black font-bold rounded-md transition-all duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
}
