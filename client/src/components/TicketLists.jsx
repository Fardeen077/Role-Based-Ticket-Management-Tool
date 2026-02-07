import useTicketStore from "../store/useTicketStore"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TicketLists = () => {
    const { isLoading, tickets } = useTicketStore();

    if (isLoading) return <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin inline mr-2 text-gray-700 " />
    // console.log("tickets:", tickets);

    return (
        <div className="bg-white grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map(ticket => (
                <div key={ticket._id} className="flex flex-col">
                    <p>{ticket.title}</p>
                    <p>{ticket.description}</p>
                    <p>{ticket.priority}</p>
                </div>
            ))}
        </div>
    )
}
export default TicketLists