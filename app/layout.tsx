import { usePathname, useRouter } from "next/navigation";
import BottomeBar from "../components/BottomBar";
import SideBar from "../components/SideBar";
import { AuthProvider } from "../context/AuthContext";
import { PostProvider } from "../context/PostContext";
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

  // const pathname = usePathname()
  // const { user } = useContext(AuthContext)

  // if(!user){
  //   router.push('/sign-in')
  // }

  return (
    <html lang="en">
    <body>
      {/* { pathname=== '/sign-in' || pathname === '/sign-up' ? 
      <main className="flex flex-col w-full">
        { children }
      </main>
      :  */}
      <AuthProvider>   
      <PostProvider>
        <div className="flex w-full">
          <SideBar/>
           <main className="flex flex-col w-full">
              {children}
              <BottomeBar/>
          </main>   
        </div>
      </PostProvider>
    </AuthProvider> 
    </body>
  </html>
  );
}
