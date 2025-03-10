import { Sidebar } from "@/components/SideBar";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  const {data: session,status} = useSession()
 
  return (
    <div className="flex">
      <Sidebar session={session} />
      <div className="flex-grow p-4">
        {children}
      </div>
    </div>
  );
}