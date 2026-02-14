import {
    createTicketApi,
    updateStatusApi,
    assignedTicketApi,
    getTicketApi,
    searchUserApi,
    singleTicketApi
} from "../api/ticketsApi"
import { create } from 'zustand';

const initialState = {
    tickets: [],
    count: 0,
    isLoading: false,
    error: null,
    ticketDetail: null,
};

const useTicketStore = create((set) => ({
    ...initialState,

    createTicket: async (ticket) => {
        set({ isLoading: true, error: null });
        try {
            const res = await createTicketApi(ticket);
            set((state) => ({
                isLoading: false,
                tickets: [res.data, ...state.data,]
            }));
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || "Create ticket failed" });
        }
    },

    updateStatus: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await updateStatusApi(id);
            set((state) => ({
                isLoading: false,
                tickets: state.tickets.map((stateus) => stateus._id !== id)
            }));
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || "Update status falied" })
        }
    },

    assignedTicket: async (ticketId) => {
        set({ isLoading: true, error: null });
        try {
            const res = await assignedTicketApi(ticketId);
            set((state) => ({
                tickets: state.tickets.map((ticket) => ticket._id === ticketId ? res.data : ticket)
            }));
        } catch (error) {
            set({
                isLoading: false,
                error: error?.response?.data?.message || "Assign failed",
            })
        }
    },

    searchUser: async (query) => {
        set({ isLoading: true, error: null });
        // console.log("QUERY STORE:", query);
        try {
            const res = await searchUserApi(query);
            set({
                isLoading:
                    false,
                tickets: res.data || [],
                count: res.data.length || 0
            });
            // console.log("zustand tickets state", res.data);
            return res.data;
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || "Not found" })
        }
    },

    getTicket: async (filters = {}) => {
        set({ isLoading: true, error: null });
        try {
            const res = await getTicketApi(filters);
            set({
                isLoading: false,
                tickets: res.data.tickets,
                count: res.data.count,
            });
            console.log("tickets zustand", tickets);

            return res.data
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || "Failed to fetch tickets" })
        }
    },
    singleTicket: async (id) => {
        set({ isLoading: true })
        try {
            const res = await singleTicketApi(id);
            set({ ticketDetail: res.data, isLoading: false })
            console.log(ticketDetail);
            
            return res.data
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || "Failed to fetch ticket id" })
        }
    },
    resetTickets: () => set(initialState),
}));

export default useTicketStore;