const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        // username of the user, is required, must be unique, trims excess space 
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        // email of the user, is required, must be unique, 
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        //array of id values, references thought model
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
        //array of id values, references user model
        friends: [{ type: Schema.Types.ObjectId, ref: 'user' }]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

// a virtual called "friendCount", retrieves the length of the users friend array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;