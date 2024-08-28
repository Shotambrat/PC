import logo from "@/public/images/logo.png";
import Link from "next/link";
import Image from "next/image";
import facebook from "@/public/svg/facebook-svgrepo-com.svg";
import instagram from "@/public/svg/instagram-svgrepo-com.svg";
import telegram from "@/public/svg/telegram-fill-svgrepo-com.svg";

export default function Footer() {
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
              <li className="uppercase cursor-pointer">Главная</li>
              <li className="uppercase cursor-pointer whitespace-nowrap">
                О Компании
              </li>
              <li className="uppercase cursor-pointer">Продукция</li>
              <li className="uppercase cursor-pointer">Портфолио</li>
              <li className="uppercase cursor-pointer">События</li>
              <li className="uppercase cursor-pointer">Статьи</li>
              <li className="uppercase cursor-pointer">Контакты</li>
            </ul>
          </nav>
        </div>
        {/* Socials with horizontal lines */}
        <div className="flex items-center justify-center gap-8">
          <div className="h-[1px] bg-second flex-grow"></div>
          <div className="flex items-center gap-4">
            <Link href="https://www.facebook.com/premiumconceptuzbekistan/">
              <Image
                src={facebook}
                alt="Facebook"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
            <Link href="https://www.instagram.com/premium_concept_uz">
              <Image
                src={instagram}
                alt="Instagram"
                width={50}
                height={50}
                className="rounded-full"
              />
            </Link>
            <Link href="https://t.me/premium_concept_uzbekistan">
              <Image
                src={telegram}
                alt="Telegram"
                width={45}
                height={45}
                className="rounded-full"
              />
            </Link>
          </div>
          <div className="h-[1px] bg-second flex-grow"></div>
        </div>
        <div className="w-full flex justify-between gap-2 max-xl:flex-col text-white text-lg">
          <h3>© 2024 Premium Concept. All rights reserved.</h3>
          <div className="flex mdx:gap-8 gap-2 max-mdx:flex-col">
            <Link href={"/politika-konfidencialnosti/"}>
              Политика конфиденциальности
            </Link>
            <Link href={"/rekvizity/"}>Реквизиты</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
