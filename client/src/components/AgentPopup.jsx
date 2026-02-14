import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";

function AgentPopup() {
    const { getAgentUsers } = useAuthStore();
    const authAgent = useAuthStore((state)=> state.authAgent)

    useEffect(() => {
        getAgentUsers();
    }, []);
    console.log("from popup", authAgent);

    return (
        <div className="text-white">
            {authAgent?.map((list) => (
                <ul key={list._id}>
                    <li>
                        {list.name}
                    </li>
                </ul>
            ))}

        </div>
    )
}

export default AgentPopup;

