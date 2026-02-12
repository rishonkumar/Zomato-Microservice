import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: "Zomato_Clone"
        })
        console.log("Connected to monogodb")
    } catch (e) {
        console.log(e)
    }
}

export default connectDb