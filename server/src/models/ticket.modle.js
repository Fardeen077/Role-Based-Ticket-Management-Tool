import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000,
        trim: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assignedTo: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null,
    },
    priority: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH"],
        default: "LOW",
    },
    status: {
        type: String,
        enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
        default: "OPEN",
    },

}, { timestamps: true });

export const Ticket = mongoose.model("Ticket", ticketSchema);