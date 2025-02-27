import { useState } from "react"
import { useRouter } from "next/router"
export default function Register() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const formData = {
        fullName,
        email,
        password
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json()
            console.log(result)
            if (result.ok) {
                console.log("Something Went Wrong")
            }
            else {
                console.log("hello login")
                router.replace("/login")
            }
        } catch (error) {
            console.log("error")
        }
    }
    return (
        <div>

            <div className="flex flex-col h-screen justify-center items-center">
                <h1 className="text-2xl font-bold mt-5 text-center">Welcome Create Your School Account</h1>
                <div className="h-96 w-96 bg-white shadow-lg mt-6">
                    <h1></h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col p-6 mt-4">
                            <label className="font-bold mt-3" htmlFor="name">
                                Enter Admin Name
                            </label>
                            <input onChange={(e)=>setFullName(e.target.value)} className="border p-2 rounded" type="text" placeholder="Enter Admin Name" />
                            <label className="font-bold mt-3" htmlFor="name">
                                Email
                            </label>
                            <input onChange={(e)=>setEmail(e.target.value)} className="border rounded p-2 " type="text" placeholder="Enter E-mail" />
                            <label className="font-bold mt-3" htmlFor="name">
                                Password
                            </label>
                            <input onChange={(e)=>setPassword(e.target.value)} className="border p-2 rounded" type="password" placeholder="Password" />
                           
                            <div className="mt-3">
                                <button className="bg-blue-500 p-2 w-full text-white rounded">Register</button>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <p>Aready an account </p>
                                <p className="text-blue-400">Login</p>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>

    )
}
