import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { IoMdClose } from "react-icons/io";
import useTicketStore from "../store/useTicketStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function AgentPopup({ ticketId, assignedTo }) {
    // const { getAgentUsers, authAgent } = useAuthStore();
    const getAgentUsers = useAuthStore((s) => s.getAgentUsers);
    const authAgent = useAuthStore((s) => s.authAgent);
    const isLoadingAgent = useAuthStore((s) => s.isLoadingAgent);
    const [open, setopen] = useState(false);
    const assignedTicket = useTicketStore((s) => s.assignedTicket)
    const navigate = useNavigate()


    // useEffect(() => {
    //     if (authAgent.length > 0) return
    //     getAgentUsers();
    // }, []);

    const handlePopUp = async () => {
        try {
            if (authAgent.length === 0) {
                await getAgentUsers();
                console.log(authAgent);
            }
            setopen(true);
        } catch (error) {
            toast.error(error?.response?.data?.message || "faild to fatch data");
        }
    }


    const handleAssign = async (agentId) => {
        if (assignedTo) {
            toast.error("Ticket already assigned");
            return;
        }
        try {
            await assignedTicket(ticketId, agentId);
            toast.success("Ticket Assigned successfully");
            navigate("/")
            // console.log("agent id", agentId, "ticket id", ticketId );

            setopen(false)
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    // console.log("from popup", authAgent);

    // if (isLoadingAgent) {
    //     return (
    //         <div className="flex justify-center items-center h-40">
    //             <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
    //         </div>
    //     );
    // }

    return (
        <div className="text-white">
            <button onClick={handlePopUp}
                disabled={isLoadingAgent}
                className="w-full bg-black py-2 mt-5 hover:bg-zinc-950 cursor-pointer">
                {isLoadingAgent ? (
                    <div>
                        <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin inline mr-3" />
                        Agent...
                    </div>
                ) : (
                    "Agents"
                )}
            </button>

            {open && (
                <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-zinc-900 p-5 rounded w-80 relative">
                        <button
                            className="absolute top-2 right-2"
                            onClick={() => setopen(false)}>
                            <IoMdClose />
                        </button>

                        <h2 className="mb-3">Select Agent</h2>

                        <ul className="text-sm">
                            {authAgent.map((agent) => (
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

