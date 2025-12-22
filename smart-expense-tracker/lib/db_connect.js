import mongoose from "mongoose"
const MONGO_URL=process.env.ATLAS_URL
export default async function connectDB(){
   if(mongoose.connection.readyState >=1)return;
   await mongoose.connect(MONGO_URL);
}