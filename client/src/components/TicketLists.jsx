import useTicketStore from "../store/useTicketStore"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TicketLists = () => {
    const { isLoading, tickets } = useTicketStore();

    if (isLoading) return <AiOutlineLoading3Quarters className="animate-spin mr-2 text-gray-700 text-5xl" />
    // console.log("tickets:", tickets);

    return (
        <div className="text-white w-full">
            <div className="flex flex-col gap-2 md:mb-10 md:mt-2 md:justify-between md:flex-row md:items-center">
                <h1 className="text-sm font-bold md:mb-10 mt-12 md:mt-1">Total Tickets: {tickets.length}</h1>
                <input type="search" placeholder="search" className="p-2 w-full md:w-64 border rounded md:mt-1" />
                <div className="gap-5 flex pr-10 p-2">
                    <p>filter1</p>
                    <p>filter2</p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full">
                <table className="min-w-[700px] w-full border">
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
                <div className="flex gap-10 justify-center items-center mt-5">
                    <button className=" bg-zinc-900 p-2 rounded cursor-pointer">next</button>
                    <button className=" bg-zinc-900 p-2 rounded cursor-pointer">prev</button>
                </div>
            </div>
        </div >
    )

}
export default TicketLists