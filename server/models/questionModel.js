import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    correctOption: {
        type: String,
        required: true,
    },
    options: {
        type: Object,
        required: true,
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
    },
}, {
    timestamps: true,
});

const Question = mongoose.model("Question", questionSchema);
export default Question