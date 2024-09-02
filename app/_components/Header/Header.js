"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import location from "@/public/svg/location-pin-svgrepo-com.svg";
import phone from "@/public/svg/phone-svgrepo-com.svg";
import search from "@/public/svg/search-alt-2-svgrepo-com.svg";
import Carousel from "./Carousel";
import axios from "axios";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  console.log(menuItems)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const response = await axios.get('/api/content/header-navigation');
        setMenuItems(response.data.links || []);
      } catch (error) {
        console.error("Failed to load menu items", error);
      }
    }

    fetchMenuItems();
  }, []);

  return (
    <div className="w-full relative">
      <div className="w-full h-[80px] bg-main">
        <div className="w-full h-full mx-auto max-w-[1440px] px-2 items-center flex justify-between gap-6">
          <div className="h-full flex p-4">
            <Link href={"/"} className="h-full">
              <Image
                src={logo}
                alt="Logo of Premium Concept"
                className="h-full w-full object-contain"
                priority={true}
                quality={100}
                width={2000}
                height={1000}
              />
            </Link>
          </div>
          <nav className="hidden xld:flex w-full max-w-[900px] text-white">
            <ul className="flex w-full gap-2 justify-between">
              {menuItems.map((item) => (
                <li key={item.slug} className="uppercase text-lg whitespace-nowrap hover:text-second transition-all duration-150 cursor-pointer">
                  <Link href={item.url}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="h-full flex gap-4 items-center">
            <Link
              href=""
              className="h-12 w-12 p-2 rounded-full border-2 border-white max-mdx:hidden"
            >
              <Image
                src={search}
                alt="Search Icon"
                className="h-full w-full object-contain"
                quality={100}
                width={50}
                height={50}
              />
            </Link>
            <Link
              href={"/locations"}
              className="h-12 w-12 p-2 rounded-full border-2 border-white max-mdx:hidden"
            >
              <Image
                src={location}
                alt="Location Icon"
                className="h-full w-full object-contain"
                quality={100}
                width={50}
                height={50}
              />
            </Link>
            <Link
              href="tel:+998712562903"
              className="h-12 w-12 p-2 rounded-full bg-second border-2 border-second"
            >
              <Image
                src={phone}
                alt="Phone Icon"
                className="h-full w-full object-contain"
                quality={100}
                width={50}
                height={50}
              />
            </Link>
            <div className="xld:hidden flex items-center">
              <button
                className="text-white focus:outline-none"
                onClick={toggleMenu}
              >
                {/* Иконка бургер-меню */}
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Боковое меню */}
      <div
        className={`fixed top-0 right-0 w-[250px] h-full bg-main text-white z-20 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          className="text-white p-4 focus:outline-none absolute top-4 right-4"
          onClick={toggleMenu}
        >
          {/* Иконка закрытия меню */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <nav className="p-4 top-0">
          <div className="h-[70px] flex gap-4 items-center">
            <Link
              href=""
              className="relative h-12 w-12 p-2 rounded-full border-2 border-white"
            >
              <Image
                src={search}
                alt="Search Icon"
                className="h-full w-full object-contain"
                quality={100}
                width={50}
                height={50}
              />
            </Link>
            <Link
              href={"/locations"}
              className="h-12 w-12 p-2 rounded-full border-2 border-white"
            >
              <Image
                src={location}
                alt="Location Icon"
                className="h-full w-full object-contain"
                quality={100}
                width={50}
                height={50}
              />
            </Link>
          </div>
          <ul className="flex flex-col gap-6 mt-8">
            {menuItems.map((item) => (
              <li key={item.slug} className="uppercase cursor-pointer">
                <Link href={item.url}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Ваш слайдер или карусель */}
      <div className="w-full absolute left-0 z-[10] bg-main text-white py-1 overflow-hidden">
        <Carousel />
      </div>
    </div>
  );
}
