import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useTicketStore from '../store/useTicketStore';
import AgentPopup from '../components/AgentPopup';
import useAuthStore from '../store/useAuthStore';

function TicketDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { singleTicket, ticketDetail } = useTicketStore();
    // const singleTicket = useTicketStore((st) => st.singleTicket);
    // const ticketDetail = useTicketStore((st) => st.ticketDetail);

    const authUser = useAuthStore((state) => state.authUser);

    useEffect(() => {
        if (id) {
            singleTicket(id)
            // console.log(id);   
        }
    }, []);
    console.log(authUser, "ticket admin");


    // console.log("Ticket for delatiticket", tickets);
    // console.log("id", id);
    return (
        <div className='text-white md:mt-5 mt-20'>
            <button onClick={() => navigate("/")}>
                - Back
            </button>

            <div className='flex flex-col gap-5'>
                <h1>{ticketDetail?.title}</h1>
                <h1>{ticketDetail?.description}</h1>
                <h1>{ticketDetail?.assignedTo?.name || "Unassigned"}</h1>
                <h1>{ticketDetail?.priority}</h1>
                <h1>{ticketDetail?.status}</h1>

                {authUser?.role === "ADMIN" && (
                    <button className='bg-zinc-900 p-2 rounded cursor-pointer w-20'>Assigned</button>
                )}
            </div>
            {authUser.role === "ADMIN" && <AgentPopup />}
        </div>
    )
}

export default TicketDetail