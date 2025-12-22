import {NextRequest , NextResponse} from "next/server"
import ErrorHandler from "../../../../middlewares/error_handler"
import NextError from "../../../../utils/NextError"
import user from "../../../../models/User"
import connectDB from "../../../../lib/db_connect"
import PasswordValidator from "../../../../utils/passwordValidator"
import bcrypt from "bcryptjs"

export  async function POST(req){ // register the new user here

try{
    await connectDB();
const user_data=await req.json(); //  NextRequest is a class

 const is_correct=PasswordValidator(user_data.password);
 if(!is_correct){
    return ErrorHandler(new NextError(400, "Password not acceptable"));
 }
const salt=await bcrypt.genSalt(10);
const hashed_password=await bcrypt.hash(user_data.password , salt);

// You must read body from the request instance
console.log(user_data);
const is_exist=await user.findOne({email:user_data.email});

if(is_exist){
console.log("user already exist please login");
return ErrorHandler(new NextError(400,"user already register"));
// you can redirect to sigin page provided by next auth
}
const newuser=new user(user_data);
newuser.password=hashed_password;
console.log(newuser);

await newuser.save();
// the creation of jwt token and saving it in cookies is handle by next auth
return NextResponse.json(newuser); 

}
catch(error){
    console.log(error);
    return ErrorHandler(error);
}
}
