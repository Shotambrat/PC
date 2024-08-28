"use client";
import { useEffect, useRef } from "react";

export default function Carousel() {
  const carouselData = [
    "№1 в сегменте премиум в Узбекистане",
    "№1 в сегменте премиум в Узбекистане",
    "№1 в сегменте премиум в Узбекистане",
    "№1 в сегменте премиум в Узбекистане",
    "№1 в сегменте премиум в Узбекистане",
    "№1 в сегменте премиум в Узбекистане",
    "№1 в сегменте премиум в Узбекистане",
    "№1 в сегменте премиум в Узбекистане",
    "№1 в сегменте премиум в Узбекистане",
    "№1 в сегменте премиум в Узбекистане",
    "№1 в сегменте премиум в Узбекистане",
    "№1 в сегменте премиум в Узбекистане",
    "№1 в сегменте премиум в Узбекистане",
  ];

  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    let scrollAmount = 0;

    const animateMarquee = () => {
      scrollAmount -= 1; // Скорость прокрутки
      if (Math.abs(scrollAmount) >= marquee.scrollWidth / 2) {
        scrollAmount = 0;
        marquee.appendChild(marquee.firstElementChild);
      }
      marquee.style.transform = `translateX(${scrollAmount}px)`;
      requestAnimationFrame(animateMarquee);
    };

    animateMarquee();
  }, []);

  return (
    <div
      ref={marqueeRef}
      className="flex whitespace-nowrap gap-4"
      style={{ willChange: "transform" }}
    >
      {carouselData.map((item, index) => (
        <h1 key={index} className="mx-4">
          {item}
        </h1>
      ))}
    </div>
  );
}
