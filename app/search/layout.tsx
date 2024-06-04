import BottomeBar from "../../components/BottomBar";
import SideBar from "../../components/SideBar";
import { Header } from "../../components/ui/Header";
import { PostProvider } from "../../context/PostContext";

export const metadata = {
  title: "Search",
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
        <PostProvider>
          <SideBar/>
          <main className="flex flex-col">
          {children}
          <BottomeBar/>
          </main>   

        </PostProvider>
      </body>
    </html>
  );
}
