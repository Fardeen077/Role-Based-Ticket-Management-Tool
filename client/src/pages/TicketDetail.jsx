import React, { useEffect } from 'react'
import { getTicketApi } from '../api/ticketsApi'
import { useParams, useNavigate } from 'react-router-dom'
import useTicketStore from '../store/useTicketStore';

function TicketDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { singleTicket, tickets } = useTicketStore();
    useEffect(() => {
        if (id) {
            singleTicket(id)
        }
    }, [id, singleTicket])
    console.log("Ticket for delatiticket", tickets);
    console.log("id", id);
    return (
        <div className='text-white'>
            <button onClick={() => navigate("/")}>
                - Back
            </button>

            <h1>{tickets.title}</h1>
            <h1>{tickets.description}</h1>
        </div>
    )
}

export default TicketDetail