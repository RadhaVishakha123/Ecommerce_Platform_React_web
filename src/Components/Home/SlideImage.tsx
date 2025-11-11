import { useState, useEffect } from "react";
import Electronic from "../../assets/Images/Electronic.jpeg";
import jewellary from "../../assets/Images/jewellary.jpeg";
import man from "../../assets/Images/man.jpeg";
import woman from "../../assets/Images/woman.jpeg";

export default function SlideImage() {
  const images: string[] = [woman, man, jewellary, Electronic];
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
  <div className="relative flex items-center justify-center w-full h-[22rem] md:h-[32rem] overflow-visible">
    {/* Slides */}
    {images.map((img, i) => {
      const offset = (i - currentIndex + images.length) % images.length;
      let transformStyle = "";
      let zIndex = 0;
      let opacity = 0.6;
      let scale = 0.8;
      let blur = "blur-sm";

      if (offset === 0) {
        transformStyle = "translateX(0)";
        zIndex = 10;
        opacity = 1;
        scale = 1;
        blur = "blur-0";
      } else if (offset === 1 || offset === images.length - 1) {
        transformStyle = `translateX(${offset === 1 ? "55%" : "-55%"})`;
        zIndex = 5;
        opacity = 0.8;
        scale = 0.9;
        blur = "blur-[1px]";
      } else {
        transformStyle = `translateX(${offset > 1 ? "120%" : "-120%"})`;
        opacity = 0;
      }

      return (
        <div
          key={i}
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${blur}`}
          style={{
            transform: `${transformStyle} scale(${scale})`,
            zIndex,
            opacity,
          }}
        >
          <img
            src={img}
            alt={`Slide ${i}`}
            className="w-[90%] md:w-[65%] h-[20rem] md:h-[26rem] object-contain rounded-3xl shadow-lg"
          />

          {offset === 0 && (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-black text-center pointer-events-none">
              <h1 className="text-3xl md:text-5xl font-bold mb-3">
                Style That Speaks for You
              </h1>
              <p className="text-lg md:text-xl max-w-xl">
                Discover the latest trends and timeless classics in one place
              </p>
            </div>
          )}
        </div>
      );
    })}

    {/* Navigation Buttons */}
    <button
      onClick={goPrev}
      className="absolute left-3 md:left-8 z-30 text-white bg-black/30 hover:bg-black/60 rounded-full p-3 transition"
    >
      &#10094;
    </button>
    <button
      onClick={goNext}
      className="absolute right-3 md:right-8 z-30 text-white bg-black/30 hover:bg-black/60 rounded-full p-3 transition"
    >
      &#10095;
    </button>

    {/* Dots Indicator */}
    <div className="absolute bottom-5 flex space-x-2 z-30">
      {images.map((_, i) => (
        <div
          key={i}
          className={`w-3 h-1 rounded-full transition-all duration-300 ${
            i === currentIndex ? "bg-black scale-110" : "bg-gray-400"
          }`}
        ></div>
      ))}
    </div>
  </div>
);


      

}
