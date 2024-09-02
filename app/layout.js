import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header/Header";
import Footer from "@/app/_components/Footer/Footer";
import ClientLayout from "./client-layout";
import clientPromise from "@/lib/mongodb";

// export const metadata = {
//   title: {
//     template: "%s",
//     default: "PREMIUM CONCEPT | Только лучшее для вашего дома | Ташкент",
//   },
//   description:
//     "PREMIUM CONCEPT | Плитки, сантехника, смесители, паркетная доска, мебель для ванной комнаты, душевые кабины, профили, полотенцесушители, коврики, мозаики",
// };

export default async function RootLayout({ children }) {
  // Получаем данные для SEO
  const client = await clientPromise;
  const db = client.db();
  const seoContent = await db.collection('content').findOne({ slug: 'home-page' });

  return (
    <html lang="en">
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/public/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/public/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/public/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/public/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="msapplication-TileImage" content="/public/mstile-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta charSet="utf-8" />
        <title>{seoContent?.seo?.title || metadata.title.default}</title>
        <meta
          name="description"
          content={seoContent?.seo?.description || metadata.description }
        />
        <meta name="keywords" content={seoContent?.seo?.keywords || ""} />
        <link rel="icon" href={seoContent?.seo?.icon || "/favicon.ico"} />
        <link rel="canonical" href={seoContent?.seo?.canonical || ""} />
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
