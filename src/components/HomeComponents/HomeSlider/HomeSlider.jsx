import React, { useEffect, useState } from "react";
import { useGetBannerQuery } from "../../../redux/services/banner/bannerApiServices";

const HomeSlider = () => {
  const { data: bannerData, isLoading } = useGetBannerQuery();
  const [current, setCurrent] = useState(0);

  const slides = bannerData?.data?.map((item) => item.imageUrl) || [];

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (isLoading) {
    return (
      <div className="w-full max-w-md h-28 bg-gray-200 animate-pulse rounded-md mx-auto mt-4" />
    );
  }

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden rounded-md relative mt-4">
      {/* Slider Track */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`banner-${index}`}
            className="w-full flex-shrink-0 object-cover aspect-[3/1]"
          />
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-purple-500 scale-125"
                : "bg-purple-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;