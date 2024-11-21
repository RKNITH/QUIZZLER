import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
        },
        result: {
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Report = mongoose.model("Report", reportSchema);

export default Report