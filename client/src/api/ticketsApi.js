import axiosInstance from "./axiosInstance";

const createTicketApi = async (ticket) => {
    const res = await axiosInstance.post("/tickets/", ticket);
    return res.data;
}

const searchUserApi = async (query) => {
    const res = await axiosInstance.get("/tickets/search-users", {
        params: { query }
    });
    return res.data
}

const assignedTicketApi = async (ticketId) => {
    const res = await axiosInstance.patch(`/tickets/${ticketId}/assigned`, ticketId);
    return res.data;
}

const updateStatusApi = async (id) => {
    const res = await axiosInstance.patch(`/tickets/${id}/update-status`, id);
    return res.data;
}

const getTicketApi = async (filters) => {
    const res = await axiosInstance.get("/tickets/getTickets", {
        params: filters
    })
    return res.data;
}
export {
    createTicketApi,
    updateStatusApi,
    assignedTicketApi,
    getTicketApi,
    searchUserApi,
}