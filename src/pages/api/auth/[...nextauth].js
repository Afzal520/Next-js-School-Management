import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Login from "@/service/authenication";
import connectToDB from "@/config/mongoose";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                await connectToDB();

                const { email, password } = credentials;

                const result = await Login(email, password);

                if (result.success) {
                    return {
                        id: result.user._id.toString(),
                        email: result.user.email,
                        name: result.user.fullName,
                        role:result.user.role
                    };
                } else {
                    throw new Error(result.message || "Invalid credentials");
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role
            }
            return token;
        },
        async session({ session, token }) {

            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.role = token.role
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});