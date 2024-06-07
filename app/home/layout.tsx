import BottomeBar from "../../components/BottomBar";
import SideBar from "../../components/SideBar";
import { PostProvider } from "../../context/PostContext";

export const metadata = {
  title: "Home",
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
          <div className="flex w-full">
          <SideBar/>
          <main className="flex flex-col w-full">
          {children}
          <BottomeBar/>
          </main>   
          </div>


        </PostProvider>
      </body>
    </html>
  );
}
