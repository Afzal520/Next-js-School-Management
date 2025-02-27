import { Sidebar } from "@/components/SideBar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        {children}
      </div>
    </div>
  );
}