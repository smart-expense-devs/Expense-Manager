import bcrypt from "bcryptjs"
import user from "../models/User"
import NextError from "../utils/NextError"
import connectDB from "../lib/db_connect"

export default async function AuthMiddleware(email,password){

try{
    await connectDB();
const this_user=await user.findOne({email:email});
if(!this_user){
    console.log("user not found , please register")
   throw new NextError(404, "User not found"); 
}
const is_correct=await bcrypt.compare(password,this_user.password);
if(!is_correct){
   throw new NextError(401, "Invalid credentials");
}
return this_user;
}
catch(error){
    console.log(error);
    throw new NextError(400, "Bad request");
}
}