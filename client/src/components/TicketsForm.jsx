const TicketsForm = ({ handleTicketForm }) => {
  return (
    <div className="flex justify-center mt-12">
      <div className="w-full max-w-lg bg-zinc-900 text-white rounded-2xl shadow-xl p-8">

        <h1 className="text-2xl font-semibold mb-6">Create Ticket</h1>

        <form onSubmit={handleTicketForm} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Title"
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
          />

          <textarea
            placeholder="Description"
            rows={4}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500 resize-none"
          />

          <select className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500">
            <option>Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
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
