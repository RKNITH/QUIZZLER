import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('DB Connected'))
        .catch(err => {
            console.error('DB Connection Error:', err);
            process.exit(1);
        });


}