import mongoose from mongoose;

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Eh']
    },
    profilePicture: {
        type: String,
        default: '/avatar.png'
    },
});

const User = mongoose.model('User', userSchema);

export default User;