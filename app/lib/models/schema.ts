import { Schema, model, models } from 'mongoose';

const messageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    }
}, { timestamps: true });

export const Message =
  models.Message || model("Message", messageSchema);

const seminarSchema = new Schema({
    seminars: [
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            }
    }
    ],
}, { timestamps: true });

export const Seminar =
  models.Seminar || model("Seminar", seminarSchema);