import mongoose from "mongoose";

const userSchema =mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    highestscore: {
        type: Number,
        default: 0
    },
    scores: {
        type: [Number],
        default: []
    },
});

const User = mongoose.model('User', userSchema);

export default User;
