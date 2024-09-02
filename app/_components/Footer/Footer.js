"use client";

import logo from "@/public/images/logo.png";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [footernav, setFooternav] = useState([]);

  useEffect(() => {
    async function fetchFooterContent() {
      try {
        const response = await axios.get('/api/content/footer-social');
        const navResponse = await axios.get('/api/content/footer-navigation');
        setFooternav(navResponse.data?.links || [])
        setSocialLinks(response.data?.socialLinks || []);
      } catch (error) {
        console.error("Failed to load footer content", error);
      }
    }

    fetchFooterContent();
  }, []);

  return (
    <footer className="w-full bg-main">
      <div className="w-full max-w-[1440px] px-2 mx-auto py-6 flex flex-col gap-4">
        <div className="w-full flex flex-col mdl:flex-row gap-12 items-center justify-between">
          <div className="h-full flex p-4">
            <Link href={"/"} className="h-[60px]">
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
          <nav className="w-full max-w-full text-white">
            <ul className="xl:flex w-full grid slg:grid-cols-3 mdl:grid-cols-2 grid-cols-2 mdx:grid-cols-3 gap-2 xl:justify-between">
              {footernav.map((link, index) => (
                <li key={index} className="uppercase cursor-pointer">
                  <Link href={link.url}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center justify-center gap-8">
          <div className="h-[1px] bg-second flex-grow"></div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <Link key={index} href={social.url}>
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </Link>
            ))}
          </div>
          <div className="h-[1px] bg-second flex-grow"></div>
        </div>
        <div className="w-full flex justify-between gap-2 max-xl:flex-col text-white text-lg">
          <h3>© 2024 Premium Concept. All rights reserved.</h3>
          <div className="flex mdx:gap-8 gap-2 max-mdx:flex-col">
            <a>Политика конфидентиальности</a>
            <a>Реквезиты</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
