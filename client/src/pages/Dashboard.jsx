import { useEffect } from "react";
import TicketLists from "../components/TicketLists";
import useTicketStore from "../store/useTicketStore";
function Dashboard() {
  const {getTicket} = useTicketStore();

  useEffect(() => {
    getTicket();
    console.log("useEffect fired");
  }, [getTicket])

  return (
    <div>
      <TicketLists />
    </div>
  )
}
export default Dashboard;