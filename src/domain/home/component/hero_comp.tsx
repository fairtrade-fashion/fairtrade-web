export default function HeroComp() {
  return (
    <>
      <div className="relative h-screen md:h-[70vh] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="src/assets/videos/shopping.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            WELCOME TO FAIR TRADE
          </h1>
          <button className="mt-8 text-lg px-16 py-4 bg-white hover:bg-transparent border-4 border-white hover:border-4 hover:border-white hover:text-white text-black font-bold rounded-md transition-all duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
}
