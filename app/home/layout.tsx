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
          <main className="flex w-full min-h-screen">
            {/* <SideBar/> */}
            {children}
          </main>
        </PostProvider>
      </body>
    </html>
  );
}
