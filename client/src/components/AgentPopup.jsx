import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { IoMdClose } from "react-icons/io";
import useTicketStore from "../store/useTicketStore";
import toast from "react-hot-toast";

function AgentPopup({ ticketId }) {
    const { getAgentUsers, authAgent, isLoading } = useAuthStore();
    const [open, setopen] = useState(false);
    const { assignedTicket } = useTicketStore()

    // useEffect(() => {
    //     if (authAgent.length > 0) return
    //     getAgentUsers();
    // }, []);

    const handlePopUp = async () => {
        try {
            if (authAgent.length === 0) {
                await getAgentUsers();
            }
            setopen(true);
        } catch (error) {
            error.error(error?.message || "faild to fatch data");
        }
    }

    const handleAssign = async (agentId) => {
        try {
            await assignedTicket(ticketId, agentId);
            // console.log("agent id", agentId, "ticket id", ticketId );
            toast.success("Ticket Assigned successfully")
            setopen(false)
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    // console.log("from popup", authAgent);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
            </div>
        );
    }

    return (
        <div className="text-white">
            <button onClick={handlePopUp} className="w-full bg-black py-2 mt-5 hover:bg-zinc-950 cursor-pointer">Agent</button>
            {open && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-zinc-900 p-5 rounded w-80 relative">
                        <button
                            className="absolute top-2 right-2"
                            onClick={() => setopen(false)}>
                            <IoMdClose />
                        </button>

                        <h2 className="mb-3">Select Agent</h2>

                        <ul className="text-sm">
                            {authAgent?.map((agent) => (
                                <li
                                    key={agent._id}
                                    onClick={() => handleAssign(agent._id)}
                                    className="hover:bg-zinc-800 cursor-pointer border-b border-zinc-700 p-2"
                                >
                                    {agent.name}
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            )}
        </div>
    )
}

export default AgentPopup;

