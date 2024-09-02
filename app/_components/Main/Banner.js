"use client";
import Slider from "react-slick";
import Image from "next/image";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowRight from "@/public/svg/arrow-right.svg";
import arrowLeft from "@/public/svg/arrow-left.svg";

export default function Banner({ banners }) {
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 6000,
    arrows: false, 
    pauseOnHover: false,
  };

  return (
    <div className="relative w-full h-screen-minus-80">
      <Slider ref={sliderRef} {...settings}>
        {banners.map((banner) => (
          <div key={banner._id} className="relative w-full h-screen-minus-80">
            <Image
              src={banner.image}
              alt={banner.title}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-8">
              <h1 className="text-white text-4xl sm:text-3xl md:text-5xl font-bold">{banner.title}</h1>
              <p className="text-white text-lg mt-4 sm:text-base md:text-xl">{banner.subtitle}</p>
              <button className="mt-8 px-6 py-3 bg-second text-white text-lg font-semibold rounded">
                {banner.buttonText}
              </button>
            </div>
          </div>
        ))}
      </Slider>
      <div className="absolute bottom-10 right-32 sm:right-16 flex gap-4">
        <button
          className="text-white p-4 w-12 h-12 border border-white bg-black hover:bg-opacity-20 transition-all bg-opacity-40 rounded-full"
          onClick={() => sliderRef.current.slickPrev()}
        >
          <Image
            src={arrowLeft}
            width={100}
            height={100}
            alt="Arrow Left Icon"
            className="w-full h-full"
          />
        </button>
        <button
          className="text-white p-4 w-12 h-12 bg-black border hover:bg-opacity-20 transition-all border-white bg-opacity-40 rounded-full"
          onClick={() => sliderRef.current.slickNext()}
        >
          <Image
            src={arrowRight}
            width={100}
            height={100}
            alt="Arrow Right Icon"
            className="w-full h-full"
          />
        </button>
      </div>
    </div>
  );
}
