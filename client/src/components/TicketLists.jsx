import useTicketStore from "../store/useTicketStore"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TicketLists = () => {
    const { isLoading, tickets } = useTicketStore();

    if (isLoading) return <AiOutlineLoading3Quarters className="animate-spin mr-2 text-gray-700 text-5xl" />
    // console.log("tickets:", tickets);

    return (
        <div className="text-white w-full">
            <div className="flex gap-1 mb-5">
                <h1 className="text-sm font-bold ">Total Tickets:</h1>
                <p className="text-sm font-bold">{tickets.length}</p>
                {/* <div className="">
                    <input type="search" placeholder="inter name" />
                </div> */}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead className="bg-zinc-900">
                        <tr>
                            <th className="px-4 py-2 border">No</th>
                            <th className="px-4 py-2 border">Title</th>
                            <th className="px-4 py-2 border">Description</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket, index) => (
                            < tr key={ticket.id} className="text-center" >
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{ticket.title}</td>
                                <td className="px-4 py-2 border">{ticket.description.split("").slice(0, 40).join("")}</td>
                                <td className="px-4 py-2 border">{ticket.status}</td>
                                <td className="px-4 py-2 border">{ticket.priority}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )

}
export default TicketLists