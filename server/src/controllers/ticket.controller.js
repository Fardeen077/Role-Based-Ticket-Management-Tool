import { Ticket } from "../models/ticket.modle.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


//user only
const createTicket = asyncHandler(async (req, res) => {
    const { title, description, priority } = req.body;
    const newTicket = await Ticket.create({
        title,
        description,
        priority,
        createdBy: req.user._id,
    });

    return res.status(201).json(new ApiResponse(201, newTicket, "ticket created successfully"));
});

// agent or admin only
const updateTicketStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
        throw new ApiError(404, "Ticket not found");
    }
    if (ticket.status === "CLOSED") {
        throw new ApiError(400, "Close ticket cannot be updated");
    }
    ticket.status = status;
    await ticket.save();

    return res.status(200).json(new ApiResponse(201, ticket, "Ticket status updated successfully"));
});


export {
    createTicket,
    updateTicketStatus,
}