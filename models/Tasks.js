import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        unique: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    unfinishedWork: {
        type: String,
        required: true
    },
    finishedWork: {
        type: String
    },
    completionStatus: {
        type: String
    }
});

const Tasks = mongoose.model('task', UserSchema);

export default Tasks;