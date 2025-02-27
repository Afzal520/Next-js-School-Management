import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res.error) {
            console.log("error", res.error);
        } else {
            router.replace("/");
        }
        console.log(res);
    };

    return (
        <div>
            <div className="flex flex-col h-screen justify-center items-center">
                <h1 className="text-2xl font-bold mt-5 text-center">Welcome Create Your School Account</h1>
                <div className="h-96 w-96 bg-white shadow-lg mt-6">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col p-6 mt-4">
                            <label className="font-bold mt-3" htmlFor="email">
                                Email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                className="border rounded p-2"
                                type="text"
                                placeholder="E-mail"
                                id="email"
                                value={email}
                            />

                            <label className="font-bold mt-3" htmlFor="password">
                                Password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className="border p-2 rounded"
                                type="password"
                                placeholder="Password"
                                id="password"
                                value={password}
                            />

                            <div className="mt-3">
                                <button className="bg-blue-500 p-2 w-full text-white rounded">Login</button>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <p>Already have an account?</p>
                                <p className="text-blue-400 cursor-pointer" onClick={() => router.push("/register")}>Register</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}