import { Ticket } from "../models/ticket.modle.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
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

const searchUsers = asyncHandler(async (req, res) => {
    const { query } = req.query;
    if (!query) {
        throw new ApiError(400, "Search query requried");
    }
    const users = await User.find({
        $or: [
            { name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
        ]
    }).select("name email");

    return res.status(200).json(new ApiResponse(200, users, "Users find successfully"));
});

const assignedTicket = asyncHandler(async (req, res) => {
    const { ticketId } = req.params;
    const { agentId } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (ticket) {
        throw new ApiError(404, "Ticket not found")
    }

    if (ticket.status === "CLOSED") {
        throw new ApiError(400, "Closed ticket cannot be assigned");
    }

    const agent = await User.findById(agentId);
    if (!agent) {
        throw new ApiError(404, "Agent not found");
    }

    if (agent.role !== "AGENT") {
        throw new ApiError(400, "User is not an agent");
    }

    ticket.assignedTo = agent._id
    ticket.status = "IN_PROGRESS"

    await ticket.save();

    return res.status(200).json(new ApiResponse(200, ticket, "Ticket assigned successfully"))
});

const getTicket = asyncHandler(async (req, res) => {
    const filter = {}

    if (req.user.role === "USER") {
        filter.createdBy = req.user._id;
    }

    if (req.query.status) {
        filter.status = req.query.status
    }

    if (req.query.priority) {
        filter.priority = req.query.priority
    }

    const tickets = await Ticket.find(filter)
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email");

    return res.status(200).json(new ApiResponse(200, {
        const: tickets.length,
        tickets
    }, "Tickets fetched successfully"));
});

export {
    createTicket,
    updateTicketStatus,
    getTicket,
    searchUsers,
    assignedTicket
}