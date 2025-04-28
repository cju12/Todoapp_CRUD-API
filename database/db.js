import mongoose from "mongoose";

const connectToDB = async () => {
    await mongoose.connect(process.env.URI).then((res) => {
        console.log("MongoDB connected successfully");
    })
}

export default connectToDB; // connectToDB 함수를 exports 객체에 추가합니다.