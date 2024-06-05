import BottomeBar from "../components/BottomBar";
import SideBar from "../components/SideBar";
import { AuthProvider } from "../context/AuthContext";
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
        <AuthProvider>
        {children}
        </AuthProvider>
  );
}
