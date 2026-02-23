import useTicketStore from "../store/useTicketStore"
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useShallow } from "zustand/shallow";
import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/useAuthStore";
import { useEffect, useState } from "react";

const TicketLists = () => {
    const { tickets, getTicket, searchUser } = useTicketStore(useShallow((s) => ({
        tickets: s.tickets,
        getTicket: s.getTicket,
        searchUser: s.searchUser,
    })));
    //     // const tickets = useTicketStore((s) => s.tickets);
    // const getTicket = useTicketStore((s) => s.getTicket);
    // const searchUser = useTicketStore((s) => s.searchUser);

    const authUser = useAuthStore((s) => s.authUser);
    const [query, setQueary] = useState("");
    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        status: "",
        priority: ""
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim() !== "") {
                searchUser(query)
                return;
            }

            if (filter.status || filter.priority) {
                getTicket(filter);
                return
            }
            getTicket({});
            // console.log(getTicket);

        }, 500);

        return () => clearTimeout(timer);
    }, [query, filter]);


    const handleDatileTicketpage = async (id) => {
        try {
            navigate(`/ticketdetail/${id}`)
        } catch (error) {
            error(error?.response?.data?.message);
        }
    }
    // console.log(tickets);
    // console.log(authUser);

    // if (isLoading) return <AiOutlineLoading3Quarters className="animate-spin mr-2 text-gray-700 text-5xl" />
    // console.log("tickets from ticket list:", tickets);

    return (
        <div className="text-white w-full">
            <div className="flex flex-col gap-2 md:mb-10 md:mt-2 md:justify-between md:flex-row md:items-center">
                <h1 className="text-sm font-bold md:mb-10 mt-12 md:mt-1">Total Tickets: {tickets.length}</h1>
                {authUser.role === "ADMIN" && (
                    <>
                        <input type="search" placeholder="search"
                            value={query}
                            onChange={(e) => setQueary(e.target.value)}
                            className="p-2 w-full md:w-64 border rounded md:mt-1" />

                        <div className="gap-5 flex pr-10 p-2 text-cente">
                            <select
                                className="bg-black"
                                value={filter.priority}
                                onChange={(e) =>
                                    setFilter(prev => ({ ...prev, priority: e.target.value }))
                                }
                            >
                                <option value="">PRIORITY</option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                            </select>

                            <select
                                className="bg-black"
                                value={filter.status}
                                onChange={(e) =>
                                    setFilter(prev => ({ ...prev, status: e.target.value }))
                                }
                            >
                                <option value="">STATUS</option>
                                <option value="OPEN">OPEN</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="CLOSE">CLOSE</option>
                            </select>
                        </div>
                    </>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full">
                <table className="table-fixed w-full border">
                    <thead className="bg-zinc-900">
                        <tr>
                            <th className="w-16 px-4 py-2 border">No</th>
                            <th className="w-40 px-4 py-2 border">Username</th>
                            <th className="w-52 px-4 py-2 border">Title</th>
                            <th className="w-75 px-4 py-2 border">Description</th>
                            <th className="w-32 px-4 py-2 border">Status</th>
                            <th className="w-28 px-4 py-2 border">Priority</th>
                            <th className="w-40 px-4 py-2 border">Assigned</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket, index) => (
                            < tr key={ticket._id} className="text-center" >
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{ticket.createdBy?.name}</td>
                                <td className="px-4 py-2 border">{ticket.title.split("").slice(0, 25).join("")}</td>
                                <td className="px-4 py-2 border cursor-pointer" onClick={() => handleDatileTicketpage(ticket._id)}>
                                    <span className="hover:text-blue-500 cursor-pointer underline max-w-75">
                                        {ticket.description.split("").slice(0, 40).join("")}
                                    </span></td>
                                <td className="px-4 py-2 border">{ticket.status}</td>
                                <td className="px-4 py-2 border">{ticket.priority}</td>
                                <td className="px-4 py-2 border">{ticket.assignedTo?.name || "Unassigned"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {tickets.length === 0 && (
                    <div className="text-4xl flex justify-center mt-5 overflow-hidden">
                        Not found
                    </div>
                )}
            </div>
        </div >
    )

}
export default TicketLists