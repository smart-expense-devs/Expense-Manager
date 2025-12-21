import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../../lib/db_connect"
import AuthMiddleware from "../../../../middlewares/next-auth-middleware"
const handler=NextAuth({
providers: [
  CredentialsProvider({
    name: "Email-Password",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "enter the email" },
      password: { label: "Password", type: "password" ,placeholder: "enter the password"}
    },
    async authorize(credentials, req) {
      try{
        await connectDB();
        const user= await AuthMiddleware(credentials.email,credentials.password);
        console.log(user)
        return user
      }
      
catch{
  return null;
}
    }
  }) 
],
secret: process.env.NEXTAUTH_SECRET,
})
export {handler as GET, handler as POST}
