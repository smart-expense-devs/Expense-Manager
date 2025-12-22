import {NextResponse} from "next/server"

export default function ErrorHandler(err){
let {statusCode=500,message="something went wrong"}=err
  return NextResponse.json(
    { message },
    { status: statusCode }
  );
}