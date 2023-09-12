import { connectMongoDB } from "@/lib/mongodb";
import User from '@/models/user'
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
// import { useRouter } from "next/router";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("signIn callback triggered");
      if (account.provider === "google") {
        const { email } = user;
        try {
          await connectMongoDB();
          const userExists = await User.findOne({ email });
          console.log(userExists);

          if (!userExists) {
            // console.log("User Not exists")
            // const res = await fetch("http://localhost:3000/api/user", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({
            //     email,
            //   }),

            // });

            // if (res.ok) {
            //   console.log("USER EXISTS");
            //   return user;
            // }
           
            console.log("User not exists "); // Perform client-side redirect
          }
        } catch (error) {
          console.log(error);
        }
      }

      return user;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
