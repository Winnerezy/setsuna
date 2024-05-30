import SideBar from "../../components/SideBar";

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
        <main className="flex w-full min-h-screen">
            {/* <SideBar/> */}
          {children}
        </main>
      </body>
    </html>
  );
}
