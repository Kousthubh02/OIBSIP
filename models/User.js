const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

// Create an async function to ensure indexes
async function createIndexes() {
    try {
        // Ensure that all indexes defined in the User model are created
        await User.ensureIndexes();
        console.log('Indexes for User created successfully');
    } catch (error) {
        console.error('Error creating indexes:', error);
    }
}

// Call the async function to create indexes
createIndexes();

module.exports = User;
