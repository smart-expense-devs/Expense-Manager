import {NextRequest , NextResponse} from "next/server"
import user from "../../../../models/User";
import connectDB from "../../../../lib/db_connect"
import ErrorHandler from "../../../../middlewares/error_handler"

export default async function GET(req,{params}){
    
    try{
        await connectDB();
    const userid=params.userid;
    const existing_user=await user.findById(userid);
    return NextResponse.json(existing_user);
    }
    catch(error){
     console.log(error);
     return ErrorHandler(error);
    }
}
