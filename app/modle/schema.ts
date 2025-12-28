import mongoose from "mongoose";

/* =======================
   User Schema
======================= */
const UserSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true, // hashed password
        },
    },
    {
        timestamps: true,
        collection: "users",
    }
);

/* =======================
   Result Schema
======================= */
const ResultSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        roll: {
            type: String,
            required: true,
            unique: true,
        },
        result: {
            type: String,
            required: true,
        },
        certificateUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: "results",
    }
);

/* =======================
   Contact Message Schema
======================= */
const ContactMessageSchema = new mongoose.Schema(
    {
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
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        collection: "contact_messages",
    }
);

/* =======================
   Enrollment Schema
======================= */
const EnrollmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        collection: "enrollments",
    }
);

/* =======================
   Free Seminar Schema
======================= */
const FreeSeminarSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: null,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: "free_seminars",
    }
);

/* =======================
   Export Models
======================= */
export const User = mongoose.model("User", UserSchema);

export const Result = mongoose.model("Result", ResultSchema);

export const ContactMessage = mongoose.model("ContactMessage", ContactMessageSchema);

export const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

export const FreeSeminar = mongoose.model("FreeSeminar", FreeSeminarSchema);
