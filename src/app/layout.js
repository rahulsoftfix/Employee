import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import "./menu.css";
import "./style.css";
import CompanyWrapper from "@/Context/CompanyContext";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Quickbid",
  description: "Quickbid, a complete tender solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CompanyWrapper>{children}</CompanyWrapper>
      </body>
    </html>
  );
}
