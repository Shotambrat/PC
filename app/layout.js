import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header/Header";
import Footer from "@/app/_components/Footer/Footer";
import ClientLayout from "./client-layout";
import Head from "next/head";

export const metadata = {
  title: {
    template: "%s",
    default: "PREMIUM CONCEPT | Только лучшее для вашего дома | Ташкент",
  },
  description:
    "PREMIUM CONCEPT | Плитки, сантехника, смесители, паркетная доска, мебель для ванной комнаты, душевые кабины, профили, полотенцесушители, коврики, мозаики",
};

export default function RootLayout({ children, seo }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta charSet="utf-8" />
        <title>{seo?.title || metadata.title.default}</title>
        <meta
          name="description"
          content={seo?.description || metadata.description}
        />
        <meta name="keywords" content={seo?.keywords || ""} />
        <link rel="icon" href={seo?.icon || "/favicon.ico"} />
        <link rel="canonical" href={seo?.canonical || ""} />
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
        />
        <meta http-equiv="X-Content-Type-Options" content="nosniff" />
        <meta http-equiv="X-Frame-Options" content="DENY" />
      </Head>
      <body>
        <ClientLayout>
          <Header />
          <main className="w-full bg-white relative">{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
