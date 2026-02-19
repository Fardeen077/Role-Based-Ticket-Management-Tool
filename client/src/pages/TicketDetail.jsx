import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useTicketStore from '../store/useTicketStore';
import AgentPopup from '../components/AgentPopup';
import useAuthStore from '../store/useAuthStore';
import { statusColor, priorityColor } from '../utils/ticketColors.js';

function TicketDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { singleTicket, ticketDetail } = useTicketStore();

    const authUser = useAuthStore((state) => state.authUser);

    useEffect(() => {
        if (id) {
            singleTicket(id)
            // console.log(id);   
        }
    }, []);
    // console.log(ticketDetail?.assignedTo?.name);

    // console.log(authUser, "ticket admin");

    // console.log("Ticket for delatiticket", tickets);
    // console.log("id", id);
    return (
        <div className="max-w-3xl mx-auto bg-zinc-900 text-white p-6 rounded-xl shadow">
            <div className='text-white md:mt-5 mt-20 '>
                <button onClick={() => navigate("/")}>
                    - Back
                </button>

                <h1 className="text-2xl font-bold mb-6">Ticket Details</h1>
                <div className='flex flex-col gap-2 '>
                    <div className="mb-5">
                        <p className="text-sm text-zinc-400">Title</p>
                        <h2 className="text-xl font-semibold">{ticketDetail?.title}</h2>
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                        <p className="text-sm text-zinc-400">Description</p>
                        <p className="mt-1 leading-relaxed text-zinc-200 whitespace-pre-wrap">
                            {ticketDetail?.description}
                        </p>
                    </div>

                    {/* Assigned */}
                    <div className="mb-5 flex justify-between">
                        <p className="text-sm text-zinc-400">Assigned To</p>
                        <p>{ticketDetail?.assignedTo?.name || "Unassigned"}</p>
                    </div>

                    {/* Priority */}
                    <div className="mb-5 flex justify-between">
                        <p className="text-sm text-zinc-400">Priority</p>
                        <span className={`px-2 py-1 rounded ${priorityColor[ticketDetail?.priority]} text-sm`}>
                            {ticketDetail?.priority}
                        </span>
                    </div>

                    {/* Status */}
                    <div className='flex justify-between'>
                        <p className="text-sm text-zinc-400">Status</p>
                        <span className={`px-2 py-1 rounded ${statusColor[ticketDetail?.status] || "bg-zinc-500"
                            } text-sm`}>
                            {ticketDetail?.status}
                        </span>
                    </div>

                </div>
                {/* only admin allow to show Agent list */}
                {authUser.role === "ADMIN" && (
                    <AgentPopup ticketId={id} />
                )}
            </div>
        </div >
    );
};

export default TicketDetail;