const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        //id of the reaction
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        //content of the reaction, is required, max amount of characters set to 280, 
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        //user who made the reaction
        username: {
            type: String,
            ref: 'user',
            required: true
        },
        //time created, default value current time
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleString() // local time zone
        }
    },
     {
        toJSON: {
            getters: true,
        },
        id: false,
     }
);

module.exports = reactionSchema;