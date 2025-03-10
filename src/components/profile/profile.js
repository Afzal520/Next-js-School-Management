import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GrLanguage } from "react-icons/gr";
import { IoMdNotifications } from "react-icons/io";

export default function Profile() {
    const {data:session,status} = useSession()
    console.log(session)
    const router = useRouter()
    return (
        <div className="fixed top-0 left-56 mb-14 w-[calc(100%-14rem)]    bg-white border-b z-50">
            <div className="flex justify-between items-center p-3">
                <div>
                    <input type="search" placeholder="Search" className="border p-2 px-4 rounded" />
                </div>
                <div className="flex gap-3 items-center space-x-4">
                    <div className="w-10 h-10 text-center content-center bg-blue-100 rounded-full">
                        <GrLanguage className="inline text-2xl" />
                    </div>
                    <div className="w-10 h-10  text-center content-center bg-blue-100 rounded-full">
                        <IoMdNotifications className="text-2xl inline " />
                    </div>
                    <div className="flex gap-4 items-center space-x-2">
                        <div  className="">
                            <img className="w-10 h-10 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" />
                        </div>
                        <div>
                            <p className="text-xl font-bold">{session?.user?.name}</p>
                            <p className="text-blue-300">{session?.user?.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}