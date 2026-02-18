import toast from "react-hot-toast";
import useTicketStore from "../store/useTicketStore"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ticketsValidation } from "../validations/ticketsValidation";

const TicketsForm = () => {
  const navigate = useNavigate();
  const { createTicket } = useTicketStore();
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const handleTicketForm = async (e) => {
    e.preventDefault();
    const validation = ticketsValidation(ticket);
    if (!validation.ok) {
      toast.error(validation.message);
      return;
    }
    try {
      await createTicket(ticket);
      navigate("/");
      toast.success("Ticket create successfully")
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="w-full max-w-lg bg-zinc-900 text-white rounded-2xl shadow-xl p-8">

        <h1 className="text-2xl font-semibold mb-6">Create Ticket</h1>

        <form onSubmit={handleTicketForm} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Title"
            value={ticket.title}
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
          />

          <textarea
            placeholder="Description"
            value={ticket.description}
            onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
            rows={4}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500 resize-none"
          />

          <select
            value={ticket.priority}
            onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500">
            <option>PRIORITY</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIEM</option>
            <option value="HIGH">HIGH</option>
          </select>

          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg py-2 font-medium"
          >
            Submit Ticket
          </button>

        </form>
      </div>
    </div>
  );
};

export default TicketsForm;
