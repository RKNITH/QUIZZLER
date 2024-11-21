import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        totalMarks: {
            type: Number,
            required: true,
        },
        passingMarks: {
            type: Number,
            required: true,
        },
        questions: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Question',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Exam = mongoose.model('Exam', examSchema);

export default Exam;
