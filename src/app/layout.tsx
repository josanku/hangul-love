import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TrackView from "@/components/TrackView";

export const metadata: Metadata = {
  metadataBase: new URL("https://hangul.love"),
  title: {
    default: "Hangul Love — 한글을 읽고 배우고 즐기다",
    template: "%s · Hangul Love",
  },
  description:
    "『한글정음』과 『HANGUL, The Cosmic Philosophy』 두 권의 책을 무료로 읽고, 아시므로 59초 만에 원리를 깨우치고, 한글아트와 내 한글이름까지 — 한글을 사랑하는 모든 것.",
  keywords: [
    "한글", "Hangul", "훈민정음", "Hunminjeongeum", "한글정음",
    "King Sejong", "learn Korean", "Korean alphabet", "한글아트", "hangul art",
  ],
  openGraph: {
    title: "Hangul Love",
    description: "Read two books free, learn Hangul in 59 seconds, enjoy it as art.",
    url: "https://hangul.love",
    siteName: "Hangul Love",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <LangProvider>
          <TrackView />
          <Nav />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
