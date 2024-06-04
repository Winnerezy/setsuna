import BottomeBar from "../components/BottomBar";
import SideBar from "../components/SideBar";
import "./globals.css";

export const metadata = {
  title: "Setsuna",
  description: "Setsuna",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
